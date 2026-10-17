// dsh-ui-beautify — 状态层测试（零依赖，node:test）
//
// 直接运行：node test/state.test.mjs
// （不要用 `npm test`：某些沙箱里子进程管道会 EPERM，所以 README 也让人直接跑 node）
//
// 覆盖：
//   ① bundle 注册与导出（id / inject / apply）
//   ② 预设数据形状：15 个目录 token × 3 套预设都有 light/dark，且没有漏写/多写
//   ③ 发送按钮 hover 与 fill 的关系（P1-b 的回归点）
//   ④ 淡出层选择器是子串匹配、不含整串哈希类名（P1-a 的回归点）
//   ⑤ 预设层 + 背景层合并成一次 overrideTokens（结构 6 的回归点）
//   ⑥ 宿主持久化：缓存首屏、宿主覆盖缓存、防抖保存、旧 key 迁移、无宿主时静默回退
//   ⑦ 宿主 state-store 往返 / 缺失 / 损坏 / 上限 / 原子写
//   ⑧ 面板点击（切预设只写预设 key）与「宿主就绪前用户已改外观」的竞态
//   ⑨ 图片编码：PNG 优先 / 保留透明 / 超限才 JPEG / 小图不重编码

import test, { after } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import {
  MAX_STATE_BYTES,
  readState,
  stateFile,
  writeState
} from '../lib/state-store.js'

const here = path.dirname(fileURLToPath(import.meta.url))
const SOURCE = await fs.readFile(path.join(here, '..', 'lib', 'client.js'), 'utf8')

/* ============================ 桩 ============================ */

function makeElement(tag) {
  return {
    tagName: tag,
    children: [],
    attributes: {},
    textContent: '',
    appendChild(child) {
      child.parentNode = this
      this.children.push(child)
      return child
    },
    removeChild(child) {
      const index = this.children.indexOf(child)
      if (index >= 0) this.children.splice(index, 1)
      child.parentNode = null
    },
    setAttribute(name, value) {
      this.attributes[name] = value
    }
  }
}

function makeLocalStorage(seed) {
  const data = new Map(Object.entries(seed || {}))
  return {
    data,
    getItem(key) {
      return data.has(key) ? data.get(key) : null
    },
    setItem(key, value) {
      data.set(key, String(value))
    },
    removeItem(key) {
      data.delete(key)
    }
  }
}

/**
 * 载入 bundle：顶层执行 `__ModuleLoader__.load` 注册 entry，再调 factory 取导出。
 * 与 billing 的 client-smoke 同一套路（bundle 是手写、无 import）。
 */
function loadBundle(options) {
  const settings = options || {}
  let entry = null
  const timers = []
  const canvases = []
  const window = {
    __ModuleLoader__: { load(value) { entry = value } },
    localStorage: settings.localStorage || makeLocalStorage(),
    setTimeout(fn, ms) {
      timers.push({ fn, ms })
      return timers.length
    },
    clearTimeout() {}
  }
  const document = {
    head: makeElement('head'),
    contains() { return true },
    createElement(tag) {
      const element = makeElement(tag)
      if (tag === 'canvas') {
        element.getContext = () => ({ drawImage() {} })
        element.toDataURL = (type) => (settings.toDataURL ? settings.toDataURL(type, element) : `data:${type};base64,AAAA`)
        canvases.push(element)
      }
      return element
    },
    createTextNode(text) { return { nodeType: 3, textContent: text, parentNode: null } }
  }
  const React = {
    createElement(type, props, ...children) { return { type, props: props || {}, children } },
    useState: (value) => [value, () => {}],
    useRef: () => ({ current: null }),
    useEffect: () => {}
  }
  // eslint-disable-next-line no-new-func
  new Function('window', 'document', 'React', SOURCE)(window, document, React)
  assert.ok(entry !== null, 'bundle 未调用 __ModuleLoader__.load')
  const exported = entry.factory((name) => (name === 'react' ? React : {}))
  return { entry, exported, window, timers, document, canvases }
}

function makeCtx(options) {
  const settings = options || {}
  const overrides = []
  const mounts = []
  const disposers = []
  const registrations = []
  const ctx = {
    theme: {
      overrideTokens(source, tokens) {
        const record = { source, tokens }
        overrides.push(record)
        return function () { record.disposed = true }
      }
    },
    slots: {
      inject(name, callback) {
        void name
        callback()
        return () => {}
      },
      register(spec, body) {
        registrations.push({ spec, body })
        return () => {}
      }
    },
    remote: {
      $mount(contribution) {
        mounts.push(contribution)
        return settings.mount ? settings.mount(contribution) : Promise.resolve(() => {})
      }
    },
    get(key) {
      return settings.services ? settings.services[key] : undefined
    },
    effect(fn) {
      const dispose = fn()
      if (typeof dispose === 'function') disposers.push(dispose)
    }
  }
  return { ctx, overrides, mounts, disposers, registrations }
}

/** 让 Promise 链跑完（$mount → load → merge）。 */
async function settle() {
  for (let index = 0; index < 8; index += 1) await Promise.resolve()
  await new Promise((resolve) => setImmediate(resolve))
}

/** 粗略亮度（够用来断言「浅色主题更浅、深色主题更深」）。 */
function brightness(hex) {
  const value = hex.replace('#', '')
  const r = parseInt(value.slice(0, 2), 16)
  const g = parseInt(value.slice(2, 4), 16)
  const b = parseInt(value.slice(4, 6), 16)
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

/** 深度遍历 React 桩造出来的元素树（数组子节点也要展开）。 */
function walkElements(node, out) {
  const list = out || []
  if (Array.isArray(node)) {
    for (const item of node) walkElements(item, list)
    return list
  }
  if (node === null || typeof node !== 'object') return list
  list.push(node)
  for (const child of node.children || []) walkElements(child, list)
  return list
}

/** 在元素树里找文案为 label 的按钮（面板里的预设 / 清除 / 重置按钮）。 */
function findButton(tree, label) {
  const hit = walkElements(tree).find((node) => node.type === 'button' && node.children.includes(label))
  assert.ok(hit, `面板上找不到按钮「${label}」`)
  return hit
}

function deferred() {
  let resolve
  let reject
  const promise = new Promise((res, rej) => { resolve = res; reject = rej })
  return { promise, resolve, reject }
}

/** 渲染注册到 settings.section 的面板组件（React 桩不渲染，这里手动调一次）。 */
function renderPanel(harness) {
  const registration = harness.registrations[0]
  const element = registration.body()
  assert.equal(typeof element.type, 'function', '槽位正文应返回一个组件元素')
  return element.type(element.props)
}

/* ============================ ① 导出 ============================ */

test('bundle 注册 id 与 inject；apply 可调用', () => {
  const { entry, exported } = loadBundle()
  assert.equal(entry.id, 'dsh-ui-beautify')
  assert.deepEqual(exported.inject, ['theme', 'slots', 'remote'])
  assert.equal(typeof exported.apply, 'function')
  assert.equal(typeof exported.__internals.appearanceTokens, 'function')
})

/* ==================== ② 预设数据形状（15 token） ==================== */

test('TOKEN_CATALOGUE 是 15 个 token（7 公开 / 8 内部）', () => {
  const { __internals } = loadBundle().exported
  const tokens = __internals.TOKEN_CATALOGUE.map((entry) => entry.token)
  assert.equal(tokens.length, 15)
  assert.equal(new Set(tokens).size, 15, 'token 名不能重复')
  assert.equal(__internals.TOKEN_CATALOGUE.filter((entry) => entry.open).length, 7)
  /* v4.2.0 删掉的两个无消费者 token 不能回来 */
  assert.ok(!tokens.includes('--dsw-static-deepseek-200'))
  assert.ok(!tokens.includes('--dsw-specific-sidebar-nav-item-active-accent'))
  /* P1-b 新增的 hover token 必须在目录里 */
  assert.ok(tokens.includes('--dsw-alias-button-info-hover'))
})

test('三套预设逐 token 都有 { light, dark } 字符串，且键集合与目录一致', () => {
  const { __internals } = loadBundle().exported
  for (const id of ['ocean', 'sand', 'teal']) {
    const preset = __internals.PRESETS[id]
    const valueIds = Object.keys(preset.values).sort()
    const catalogueIds = __internals.TOKEN_CATALOGUE.map((entry) => entry.id).sort()
    assert.deepEqual(valueIds, catalogueIds, `${id} 的 token 值与目录必须一一对应`)

    const tokens = __internals.presetTokens(id)
    for (const entry of __internals.TOKEN_CATALOGUE) {
      const pair = tokens[entry.token]
      assert.ok(pair, `${id} 缺少 ${entry.token}`)
      assert.equal(typeof pair.light, 'string', `${id} ${entry.token} 缺 light`)
      assert.equal(typeof pair.dark, 'string', `${id} ${entry.token} 缺 dark`)
      assert.match(pair.light, /^(#[0-9a-f]{6}|rgba?\()/i)
      assert.match(pair.dark, /^(#[0-9a-f]{6}|rgba?\()/i)
    }
    /* 15 个目录 token + 用户气泡 = 16 个写入键 */
    assert.equal(Object.keys(tokens).length, 16)
    assert.ok(tokens[__internals.BUBBLE_TOKEN], `${id} 缺用户气泡 token`)
  }
})

/* ==================== ③ 发送按钮 hover（P1-b） ==================== */

test('发送按钮 hover 与 fill 明显区分，明暗关系与官方一致', () => {
  const { __internals } = loadBundle().exported
  const fillToken = '--dsw-alias-button-info-fill'
  const hoverToken = '--dsw-alias-button-info-hover'
  for (const id of ['ocean', 'sand', 'teal']) {
    const tokens = __internals.presetTokens(id)
    const fill = tokens[fillToken]
    const hover = tokens[hoverToken]
    assert.ok(fill && hover, `${id} 必须同时写 fill 与 hover`)
    assert.notEqual(hover.light, fill.light, `${id} 浅色 hover 不能等于 fill`)
    assert.notEqual(hover.dark, fill.dark, `${id} 深色 hover 不能等于 fill`)
    /* 官方关系：light hover 更浅一档（deepseek-400 > 500），dark hover 更深一档。 */
    assert.ok(brightness(hover.light) > brightness(fill.light), `${id} 浅色 hover 应比 fill 浅`)
    assert.ok(brightness(hover.dark) < brightness(fill.dark), `${id} 深色 hover 应比 fill 深`)
  }
})

/* ==================== ④ 淡出层选择器（P1-a） ==================== */

test('淡出层用 span[class*="_fade"] 子串匹配，不写整串哈希类名', () => {
  const { __internals } = loadBundle().exported
  const css = __internals.FADE_KILL_CSS
  assert.match(css, /\[data-slot="sidebar\.workspaces"\]/)
  assert.match(css, /span\[class\*="_fade"\]/)
  assert.match(css, /background:\s*none\s*!important/)
  /* 0.2.0-rc.2 的 bhn1Oq_fade 与 0.2.1-rc.1 的 _9lTDKa_fade 都是「哈希前缀 + _fade」，
     写死任何一个整串哈希都会在另一次构建里失效。 */
  assert.ok(!/bhn1Oq/.test(css), '不应写死 rc.2 的哈希类名')
  assert.ok(!/_9lTDKa/.test(css), '不应写死 0.2.1 的哈希类名')
  assert.ok(!/[>]\s*:last-child\s*>\s*:last-child/.test(css), '不应再回到少一层的结构选择器')
})

/* ==================== ⑤ override 合并 ==================== */

test('appearanceTokens：默认预设不写层，预设与背景合成一张表', () => {
  const { __internals } = loadBundle().exported
  const ocean = __internals.presetTokens('ocean')

  const none = __internals.appearanceTokens('default', false)
  assert.deepEqual(none, {})

  const presetOnly = __internals.appearanceTokens('ocean', false)
  assert.deepEqual(presetOnly, ocean)
  assert.notEqual(presetOnly, ocean, '每次都要给新对象，避免调用方改坏常量')

  const merged = __internals.appearanceTokens('ocean', true)
  assert.equal(Object.keys(merged).length, 16)
  for (const key of Object.keys(ocean)) assert.ok(key in merged, `合并后丢了 ${key}`)
  /* 背景遮罩层必须在同一张表里后写，覆盖预设的底色（壁纸下要半透明）。 */
  assert.deepEqual(merged['--dsw-alias-bg-base'], __internals.BG_TOKENS['--dsw-alias-bg-base'])
  assert.deepEqual(merged['--dsw-specific-sidebar-fill'], __internals.BG_TOKENS['--dsw-specific-sidebar-fill'])

  const unknown = __internals.appearanceTokens('nope', true)
  assert.deepEqual(Object.keys(unknown).sort(), Object.keys(__internals.BG_TOKENS).sort())
})

test('apply：一次 overrideTokens 落地预设 + 背景，来源只有一个', () => {
  const localStorage = makeLocalStorage({
    'dsh-ui-beautify:preset': 'sand',
    'dsh-ui-beautify:bg': 'data:image/png;base64,AAAA'
  })
  const { exported } = loadBundle({ localStorage })
  const harness = makeCtx()
  exported.apply(harness.ctx)

  assert.equal(harness.overrides.length, 1, '预设层与背景层必须合成一次调用')
  const record = harness.overrides[0]
  assert.equal(record.source, 'beautify')
  assert.equal(Object.keys(record.tokens).length, 16)
  assert.equal(record.tokens['--dsw-alias-button-info-fill'].light, '#b45309')
  assert.deepEqual(record.tokens['--dsw-alias-bg-base'], { light: 'rgba(247,249,252,0.85)', dark: 'rgba(12,18,30,0.85)' })

  assert.equal(harness.registrations.length, 1)
  const spec = harness.registrations[0].spec
  assert.equal(spec.name, 'settings.section')
  assert.equal(spec.id, 'ui-settings')
  assert.equal(spec.label, 'UI设置')
  assert.equal(typeof harness.registrations[0].body, 'function')

  for (const dispose of harness.disposers) dispose()
  assert.equal(record.disposed, true, '卸载后 token 层必须被移除')
})

test('apply：空缓存不写任何 token 层', () => {
  const { exported } = loadBundle()
  const harness = makeCtx()
  exported.apply(harness.ctx)
  assert.equal(harness.overrides.length, 0)
  for (const dispose of harness.disposers) dispose()
})

/* ==================== 图片编码（PNG 优先 / 保留透明） ==================== */

test('encodeBackground：小图不重编码，缩放图先出 PNG，PNG 超限才 JPEG', () => {
  const limit = 2 * 1024 * 1024
  const small = 'data:image/png;base64,SMALL'
  const huge = `data:image/png;base64,${'A'.repeat(limit + 16)}`

  {
    const { exported, canvases } = loadBundle()
    /* 尺寸已经在 2560 以内、原图也不大：原样返回，画质与透明都不动。 */
    assert.equal(exported.__internals.encodeBackground({ width: 1200, height: 800 }, small, 2560, 0.85, limit), small)
    assert.equal(canvases.length, 0, '不该为了重编码建 canvas')
  }

  {
    const { exported, canvases } = loadBundle()
    /* 原图太大：画到 canvas（最长边 2560），PNG 结果够小 → 用 PNG，透明保住。 */
    const result = exported.__internals.encodeBackground({ width: 4000, height: 2000 }, huge, 2560, 0.85, limit)
    assert.equal(result, 'data:image/png;base64,AAAA')
    assert.equal(canvases.length, 1)
    assert.equal(canvases[0].width, 2560)
    assert.equal(canvases[0].height, 1280)
  }

  {
    /* PNG 仍然超限：退回 JPEG（这里只有 JPEG 的结果够小）。 */
    const bigPng = `data:image/png;base64,${'B'.repeat(limit + 16)}`
    const { exported } = loadBundle({
      toDataURL(type) { return type === 'image/png' ? bigPng : 'data:image/jpeg;base64,SMALL' }
    })
    assert.equal(
      exported.__internals.encodeBackground({ width: 4000, height: 2000 }, huge, 2560, 0.72, limit),
      'data:image/jpeg;base64,SMALL'
    )
  }
})

/* ==================== ⑥ 宿主持久化 ==================== */

test('apply：挂载 uiBeautify 贡献（两个方法、参数名与 host 对齐）', async () => {
  const { exported } = loadBundle()
  const harness = makeCtx()
  exported.apply(harness.ctx)
  await settle()

  assert.equal(harness.mounts.length, 1)
  const contribution = harness.mounts[0]
  assert.equal(contribution.package, 'dsh-ui-beautify')
  const methods = contribution.descriptors.map((descriptor) => descriptor.method)
  assert.deepEqual(methods, ['loadClientState', 'saveClientState'])
  for (const descriptor of contribution.descriptors) {
    assert.equal(descriptor.service, 'uiBeautify')
    assert.equal(descriptor.namespace, 'uiBeautify')
    assert.equal(descriptor.invocation.kind, 'direct')
    assert.equal(descriptor.result.mode, 'strict')
    assert.equal(typeof descriptor.result.create, 'function')
  }
  const [load, save] = contribution.descriptors
  assert.deepEqual(load.parameters, [])
  assert.equal(save.parameters.length, 1)
  /* host 方法签名是 saveClientState(state)，wire 名必须逐字相同 */
  assert.equal(save.parameters[0].name, 'state')
  assert.equal(save.parameters[0].wire, 'state')
  assert.equal(save.parameters[0].source, 'json')
  assert.equal(save.parameters[0].codec.mode, 'strict')

  for (const dispose of harness.disposers) dispose()
})

test('apply：宿主有值时覆盖缓存（宿主权威）', async () => {
  const localStorage = makeLocalStorage({ 'dsh-ui-beautify:preset': 'ocean' })
  const { exported } = loadBundle({ localStorage })
  const host = { state: { preset: 'teal', bg: null } }
  const harness = makeCtx({
    services: {
      'remote.uiBeautify': {
        loadClientState: () => Promise.resolve({ ok: true, value: host }),
        saveClientState: () => Promise.resolve({ ok: true, value: { ok: true } })
      }
    }
  })
  exported.apply(harness.ctx)
  /* 首屏是缓存（ocean） */
  assert.equal(harness.overrides.length, 1)
  assert.equal(harness.overrides[0].tokens['--dsw-alias-button-info-fill'].light, '#2563eb')

  await settle()
  /* 宿主回来之后被 teal 覆盖，并回写缓存 */
  const last = harness.overrides[harness.overrides.length - 1]
  assert.equal(last.tokens['--dsw-alias-button-info-fill'].light, '#0d9488')
  assert.equal(localStorage.getItem('dsh-ui-beautify:preset'), 'teal')
  for (const dispose of harness.disposers) dispose()
})

test('apply：旧 key（{preset,bg}）迁移成两个新 key 并删除', () => {
  const localStorage = makeLocalStorage({
    'dsh-ui-beautify:state': JSON.stringify({ preset: 'sand', bg: 'data:image/png;base64,BBBB' })
  })
  const { exported } = loadBundle({ localStorage })
  const harness = makeCtx()
  exported.apply(harness.ctx)

  assert.equal(localStorage.getItem('dsh-ui-beautify:preset'), 'sand')
  assert.equal(localStorage.getItem('dsh-ui-beautify:bg'), 'data:image/png;base64,BBBB')
  assert.equal(localStorage.getItem('dsh-ui-beautify:state'), null)
  assert.equal(harness.overrides.length, 1)
  for (const dispose of harness.disposers) dispose()
})

test('apply：宿主无值时把缓存灌进宿主（防抖 300ms 后调用 saveClientState）', async () => {
  const localStorage = makeLocalStorage({ 'dsh-ui-beautify:preset': 'sand' })
  const { exported, timers } = loadBundle({ localStorage })
  const saved = []
  const harness = makeCtx({
    services: {
      'remote.uiBeautify': {
        loadClientState: () => Promise.resolve({ ok: true, value: { state: null } }),
        saveClientState: (payload) => {
          saved.push(payload)
          return Promise.resolve({ ok: true, value: { ok: true } })
        }
      }
    }
  })
  exported.apply(harness.ctx)
  await settle()

  assert.equal(saved.length, 0, '保存必须防抖，不能在启动时立刻发 RPC')
  assert.equal(timers.length, 1)
  assert.equal(timers[0].ms, 300)
  timers[0].fn()
  await settle()
  assert.deepEqual(saved, [{ preset: 'sand', bg: null }])
  for (const dispose of harness.disposers) dispose()
})

test('apply：命名空间缺方法 / $mount 失败时静默回退到 localStorage', async () => {
  const localStorage = makeLocalStorage({ 'dsh-ui-beautify:preset': 'ocean' })

  const noMethods = makeCtx({ services: { 'remote.uiBeautify': { saveClientState() {} } } })
  loadBundle({ localStorage }).exported.apply(noMethods.ctx)
  await settle()
  assert.equal(noMethods.overrides.length, 1, '缺方法不影响本地外观')

  const failing = makeCtx()
  failing.ctx.remote.$mount = () => Promise.reject(new Error('old host'))
  loadBundle({ localStorage }).exported.apply(failing.ctx)
  await settle()
  assert.equal(failing.overrides.length, 1)

  for (const dispose of noMethods.disposers) dispose()
  for (const dispose of failing.disposers) dispose()
})

test('面板：点预设按钮切换外观并只写预设 key', () => {
  const localStorage = makeLocalStorage()
  const { exported } = loadBundle({ localStorage })
  const harness = makeCtx()
  exported.apply(harness.ctx)

  const panel = renderPanel(harness)
  findButton(panel, '暖沙').props.onClick()
  assert.equal(harness.overrides.length, 1)
  assert.equal(harness.overrides[0].source, 'beautify')
  assert.equal(harness.overrides[0].tokens['--dsw-alias-button-info-fill'].light, '#b45309')
  assert.equal(localStorage.getItem('dsh-ui-beautify:preset'), 'sand')
  assert.equal(localStorage.getItem('dsh-ui-beautify:bg'), null, '切预设不该碰背景图')

  findButton(panel, '默认').props.onClick()
  assert.equal(localStorage.getItem('dsh-ui-beautify:preset'), null, '默认预设不占缓存')
  for (const dispose of harness.disposers) dispose()
})

test('apply：宿主就绪前用户已改外观 → 以本地为准并推给宿主', async () => {
  const localStorage = makeLocalStorage()
  const { exported, timers } = loadBundle({ localStorage })
  const gate = deferred()
  const saved = []
  const harness = makeCtx({
    mount: () => gate.promise,
    services: {
      'remote.uiBeautify': {
        loadClientState: () => Promise.resolve({ ok: true, value: { state: { preset: 'ocean' } } }),
        saveClientState: (payload) => {
          saved.push(payload)
          return Promise.resolve({ ok: true, value: { ok: true } })
        }
      }
    }
  })
  exported.apply(harness.ctx)

  /* 宿主 RPC 还没回来，用户先点了「松石绿」 */
  findButton(renderPanel(harness), '松石绿').props.onClick()
  gate.resolve(() => {})
  await settle()

  const last = harness.overrides[harness.overrides.length - 1]
  assert.equal(last.tokens['--dsw-alias-button-info-fill'].light, '#0d9488', '宿主旧值不能盖掉用户刚做的选择')
  assert.equal(saved.length, 0, '保存仍然要防抖')
  assert.equal(timers.length, 1)
  timers[0].fn()
  await settle()
  assert.deepEqual(saved, [{ preset: 'teal', bg: null }])
  for (const dispose of harness.disposers) dispose()
})

/* ==================== ⑦ state-store ==================== */

const previousHome = process.env.DSH_HOME
const tempRoot = await fs.mkdtemp(path.join(os.tmpdir(), 'dsh-ui-beautify-test-'))
process.env.DSH_HOME = tempRoot

after(async () => {
  await fs.rm(tempRoot, { recursive: true, force: true })
  if (previousHome === undefined) delete process.env.DSH_HOME
  else process.env.DSH_HOME = previousHome
})

test('state-store：文件位置是 <DSH_HOME>/storages/<plugin>/state.json', () => {
  assert.equal(
    stateFile('dsh-ui-beautify'),
    path.join(tempRoot, 'storages', 'dsh-ui-beautify', 'state.json')
  )
})

test('state-store：往返一致，写入是原子的（不留 .tmp）', async () => {
  const value = { preset: 'teal', bg: 'data:image/png;base64,' + 'A'.repeat(1024) }
  await writeState('roundtrip', value)
  assert.deepEqual(await readState('roundtrip'), value)

  const dir = path.join(tempRoot, 'storages', 'roundtrip')
  const entries = await fs.readdir(dir)
  assert.deepEqual(entries, ['state.json'], '写完只应有 state.json，临时文件必须已被 rename')
})

test('state-store：缺失 / 损坏 / 非对象都返回 null', async () => {
  assert.equal(await readState('missing'), null)

  const broken = path.join(tempRoot, 'storages', 'broken')
  await fs.mkdir(broken, { recursive: true })
  await fs.writeFile(path.join(broken, 'state.json'), '{ not json', 'utf8')
  assert.equal(await readState('broken'), null)

  const array = path.join(tempRoot, 'storages', 'array')
  await fs.mkdir(array, { recursive: true })
  await fs.writeFile(path.join(array, 'state.json'), '[1,2,3]', 'utf8')
  assert.equal(await readState('array'), null)
})

test('state-store：拒绝非对象 / 非无损 JSON / 超上限，且不写坏文件', async () => {
  await assert.rejects(() => writeState('reject', []), /JSON 对象/)
  await assert.rejects(() => writeState('reject', null), /JSON 对象/)
  await assert.rejects(() => writeState('reject', { preset: Number.NaN }), /无损 JSON/)
  await assert.rejects(() => writeState('reject', { preset: 'ocean', bg: undefined }), /无损 JSON/)
  await assert.rejects(
    () => writeState('reject', { bg: 'x'.repeat(MAX_STATE_BYTES + 8) }),
    /超过/
  )
  assert.equal(await readState('reject'), null, '被拒绝的写入不能在磁盘上留下文件')
})

test('state-store：覆盖写会整体替换旧内容', async () => {
  await writeState('overwrite', { preset: 'ocean', bg: null })
  await writeState('overwrite', { preset: 'sand', bg: null })
  assert.deepEqual(await readState('overwrite'), { preset: 'sand', bg: null })
})
