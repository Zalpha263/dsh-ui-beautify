# 插件面板接入规范（`sidebarPanel` 服务契约 v1）

> 面向：任何想把界面挂到 DSH Web「右侧栏插件标签页」里的外部插件。
> 适用版本：`dsh-ui-beautify` ≥ **2.0.0**（`sidebarPanel.apiVersion === 1`）。
> 目的：让「新插件接入右侧栏」变成一次复制粘贴，而不是一次考古。

---

## 0. 为什么要改（v2.0.0 的重大变更）

≤ 1.15.x 的 `dsh-ui-beautify` 自带一个「插件面板」宿主：自研的芯片行 + 打开顺序标签条 +
浮动窗 + 停靠拖拽，并把面板渲染进它**自己的第三列网格**（`data-vsc-pp3` +
`--vsc-pp-cols` 覆盖宿主的 `grid-template-columns`，同时 `layoutSvc.closeDetails()` 关掉
原生第三列）。

DSH **0.1.5-rc.1** 起，第三列的正式主人是官方右侧栏
（`dsh-client-ui-sidebar-right`）：它有自己的展开/收起、标签条、浮动、分屏、几何与
每会话持久化，并通过 `ctx.layout.openRightbar()` 向 AppFrame 报告自己的轨道。两个
系统抢同一段 grid 模板 —— **这就是「插件面板与官方侧边栏严重冲突」的根因**。
另外 `ILayout.closeDetails()` 在 0.1.5-rc.1 已被删除，那条调用是失效的。

v2.0.0 的做法：**把插件面板注册成官方右侧栏的一个「页标签类型」**。标签条、增删、
横向溢出、浮动、分屏、每会话独立状态、撤销重做、引导页胶囊全部由官方 `dockkit`
负责，`dsh-ui-beautify` 不再碰任何列几何。

对外服务从 `dock`（v1/v2）**改名为 `sidebarPanel`（v1）**。旧名不再提供 —— 找不到服务
的消费方会走「没装 ui-beautify」的降级路径，这是刻意设计：两个名字同时存在会让插件
同时往两套 UI 里注册。

---

## 1. 30 秒版：最小可复制骨架

```js
/* client half —— 位于 window.__ModuleLoader__.load({ id, factory }) 的 factory 内 */
window.__ModuleLoader__.load({
  id: 'my-plugin',
  factory: (require) => {
    const module = { exports: {} }
    const exports = module.exports

    const PANEL_ID = 'my-plugin'          // 稳定、唯一、跨版本不变（见 §3.1）
    const PANEL_TITLE = '我的插件'

    /* 面板内容：宿主给你一个已经撑满标签正文区的容器 el，你往里渲染；返回清理函数。 */
    function mountPanel(el) {
      const box = document.createElement('div')
      box.textContent = 'Hello from my plugin'
      el.appendChild(box)
      return () => { el.textContent = '' }
    }

    function apply(ctx) {
      /* sidebarPanel 是【可选】服务：ui-beautify 没装 / 还没加载 / 正在热重载，
         都不能报错。没有它时插件必须照常工作（走自己的降级 UI）。 */
      const fiber = ctx.inject(['sidebarPanel'], (sideCtx) => {
        const side = sideCtx.get('sidebarPanel')
        if (side === undefined || side === null || typeof side.registerPanel !== 'function') return
        const dispose = side.registerPanel({
          id: PANEL_ID,
          title: PANEL_TITLE,
          icon: '🧩',
          entry: { title: PANEL_TITLE, description: '一句话说明这个面板做什么', order: 100 },
          mount: mountPanel
        })
        return () => { try { dispose() } catch (err) {} }
      })
      ctx.effect(() => () => { try { fiber.dispose() } catch (err) {} })
    }

    exports.apply = apply
    exports.inject = ['slots']    // 不要在这里写 'sidebarPanel'（见 §2.1）
    return module.exports
  }
})
```

要点：

- `ctx.inject(['sidebarPanel'], cb)` 是 **cordis 的可选依赖**：服务不在时回调不执行
  （插件本体照常加载），出现时执行，消失时自动清理，再次出现时重新执行。
- ⚠️ **回调必须是箭头函数**。cordis 用 `isConstructor(cb)` 区分「类插件」与「函数插件」：
  普通 `function (c) { … }` 会被 `new` 调用，**返回的清理函数被直接丢弃** —— 服务消失后
  注册泄漏在宿主里，且不报任何错。
- **不要**再把 `ctx.provide('sidebarPanel', …)` 当作消费方接口 —— 那是
  `dsh-ui-beautify` 自己提供服务的写法。
- 注册 ≠ 打开：注册只让面板成为右侧栏的一个标签类型（并出现在「开始」引导页上）。

---

## 2. 拿到 `sidebarPanel` 的三种写法

### 2.1 推荐：`ctx.inject(['sidebarPanel'], cb)`（可选依赖）

| 写法 | 结果 |
|---|---|
| `ctx.inject(['sidebarPanel'], cb)` | ✅ 服务可用时执行、不可用时清理；插件本体不被阻塞 |
| `exports.inject = ['slots', 'sidebarPanel']` | ❌ 硬依赖：没装 ui-beautify 时**整个插件被挂起**，连槽位都不注册 |
| 只用一次 `ctx.get('sidebarPanel')` | ⚠️ 只在 ui-beautify 已加载时有效；加载顺序反过来就永远拿不到 |

### 2.2 谁会被「守护 ctx」限制

- **profile 安装的插件**走浏览器端真正的 cordis，`ctx.inject` / `ctx.on` / `ctx.provide` /
  `ctx.get` / `ctx.effect` 全部可用。
- **运行时动态包**（agent 通过 cordis 工具加载，走
  `@deepseek-ai/dsh-cordis-client-runner`）拿到守护式 facade：只放行
  `effect / on / once / provide / 超时族 / get` 与 `inject` 中声明过的服务，
  **`ctx.inject` 本身不在白名单里**。
- 因此：**先试 `ctx.inject`，抛错再退化**；退化用 `ctx.get` + `internal/service` 事件
  + 1s 兜底轮询的**幂等**绑定器（`dsh-deepseek-billing` 的 `bindDockFallback` 是现成范例）。
  幂等的判据用 `side.has(id)`，**不要**用对象身份比较（守护 ctx 下每次 `get` 都是新 Proxy）。

```js
function bindSidebarPanel(ctx, def, onBound) {
  let dispose = null, bound = false, stopped = false
  const unbind = () => { if (dispose !== null) { try { dispose() } catch (e) {} } dispose = null; bound = false }
  const sync = () => {
    if (stopped) return
    const s = ctx.get('sidebarPanel')
    if (s === undefined || s === null || typeof s.registerPanel !== 'function') { unbind(); return }
    if (bound) { const alive = typeof s.has === 'function' ? s.has(def.id) : true; if (alive) return; unbind() }
    try { dispose = s.registerPanel(def); bound = true; if (onBound) onBound(true) } catch (err) { console.error(err); dispose = null; bound = false }
  }
  sync()
  const off = ctx.on('internal/service', (name) => { if (name === 'sidebarPanel') sync() })
  const timer = window.setInterval(sync, 1000)
  ctx.effect(() => () => { stopped = true; off(); window.clearInterval(timer); unbind() })
}
```

`internal/service` 是 cordis 内置事件：`ctx.provide(name, value)` 在**注册与注销时**都会
emit 它（注销时 `value` 为 `undefined`）。同一次注册可能 emit 多次，所以 `sync()` 必须幂等。

---

## 3. 契约参考

### 3.1 `registerPanel(def)` —— 面板定义

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `id` | `string` | ✅ | 面板唯一标识，**同时是标签类型 kind 与持久化键**。要求：非空、带插件名前缀（`my-plugin`）、**跨版本永不修改** —— 改 id 等于换了一个标签类型，用户已打开的标签会变成孤儿。 |
| `title` | `string` | ✅ | 标签芯片与引导页上的显示名。 |
| `icon` | `string` | ➖ | 装饰用（emoji 即可）。当前引导页统一画 🧩，此字段保留给后续版本。 |
| `entry` | `{title?, description?, order?}` | ➖ | 有它才在右侧栏「开始」引导页上出现入口胶囊。`order` 升序，越小越靠前（官方文件浏览器是 10，建议插件用 100+）。 |
| `render` | `() => ReactElement` | ✅/➖ | React 面板，与 `mount` **二选一**。 |
| `mount` | `(el) => (() => void) \| void` | ✅/➖ | 纯 DOM 面板，与 `render` 二选一。 |

返回：**disposer 函数**，调用即注销该标签类型。同一 `id` 重复调用 = 刷新定义（返回新的
disposer），旧的 disposer 不会误删后来者。

校验失败会抛 `TypeError`（缺 id / 缺 title / 既没有 render 也没有 mount），便于开发期立刻发现。

### 3.2 完整 API（`sidebarPanel.apiVersion === 1`）

| 成员 | 说明 |
|---|---|
| `apiVersion` | `1`。消费方用 `sidebarPanel.apiVersion >= 1` 做特性探测，不要靠 API 名猜行为。 |
| `registerPanel(def)` | 注册 / 刷新面板，返回 disposer。 |
| `has(id)` | 该 id 是否已注册。 |
| `openPanel(id)` | 在当前会话的右侧栏里打开或聚焦该标签（同时展开列）。**返回 `false`** 表示当前没有挂载的会话 seat 或服务缺失 —— 官方对「没有 session 可作用」是 fail loudly，这里吞掉异常并返回布尔值。 |
| `focusPanel(id)` | 与 `openPanel` 等价（保留给旧调用点）。 |
| `closePanel(id)` | 关闭该标签（仅当它是当前激活标签时生效），返回是否关闭。 |
| `isOpen()` | 右侧栏当前是否展开。**只读**，不改变列几何。 |

### 3.3 `mount(el)` / `render()` 的生命周期

- 面板正文由**官方右侧栏**渲染在 `_.P3OORG_panelBody{flex:auto;min-height:0;display:flex}`
  里。宿主给你的 `el` 是一个类名为 **`dsh-sidebar-panel-host`** 的容器，它已经带好了
  这条**布局契约**（v2.0.1 起）：

  | 属性 | 值 | 为什么 |
  |---|---|---|
  | `width` / `flex` | `100%` / `flex:auto` | 撑满 pane body，**不靠内容自然宽度** |
  | `min-width` | `0` | flex 项默认 `min-width:auto`，长文件名会把整行撑宽并让祖先出现横向滚动 |
  | `overflow` | `hidden` | 兜住越界内容，绝不让面板把侧边栏挤宽 |
  | `display` / `flex-direction` | `flex` / `column` | 让插件根节点的 `height:100%` 有确定的父高度（block 父级下 `height:100%` 会解析为 `auto`，面板塌成内容高度） |
  | `container-type` | `inline-size` | 插件可以按**面板自身宽度**做响应式，而不是按窗口宽度 |

- **宽度不是固定的**：右侧栏的宽度来自官方列几何求解，**首开默认占 frame 的 45%、下限
  300px**（`layout` 的 `RIGHTBAR_MIN` / `RIGHTBAR_DEFAULT_RATIO`），窗口小于 768px 时官方
  会自动全屏。所以面板宽度在 300px ~ 全屏之间变化，**不要按旧的 400/560px 假设写死布局**。

- **窄面板标记**：宿主的 `ResizeObserver` 量的是**面板自身**宽度，`< 420px` 时给容器加
  `data-dsh-narrow` 属性。面板可以直接吃它：

  ```css
  [data-dsh-narrow] .my-row { /* 收字号、隐藏次要列 */ }
  /* 或者用宿主提供的容器查询 */
  @container dshpanel (max-width: 420px) { /* … */ }
  ```

  兼容说明：宿主还会给面板内带 `.fexp-panel` 类的元素补 `.fexp-narrow`，这是为了让
  早期按「窗口宽度」判断紧凑模式的消费方（file-explorer）不用改造就生效。

- **面板身份标记**：容器上带 `data-dsh-panel-id="<你的 id>"`。官方标签条已经在显示标题
  和关闭按钮，所以如果你的面板自己还画了标题栏 / 关闭按钮，在宿主里就是重复的一份 ——
  需要的话可以据此隐藏（纯 CSS 也行：`[data-dsh-panel-id] .my-titlebar { display:none }`）。
  注意 `render()` 型面板拿不到这个容器，需要自行处理。

- **每次标签切换/会话切换都会卸载再挂载**：卸载时调用你返回的清理函数。所以
  `mount` 必须「可重复调用、状态自己持有、DOM 全部重建」。

- **必须返回清理函数**（或在内部用 `ctx.effect` 登记）：定时器、全局监听、自建 React root
  都在那里释放。

- 标签的**开合、浮动、分屏、几何、每会话状态**全部由官方负责并持久化。插件不要自己写
  `localStorage`、不要自己画浮动窗、更不要碰 `grid-template-columns`。

### 3.4 与官方右侧栏其它标签的关系

- 右侧栏是**每会话**的：同一插件在不同会话里可以各自开着自己的标签。
- 引导页规则（官方 `defaultSeed`）：**全系统引导入口恰好只有 1 个**时，新会话的列直接
  种成那个类型；**0 个或多个**时显示「开始」引导页。所以接入插件会让默认视图从「文件」
  变成「开始」引导页 —— 这是官方多入口时的既定设计。
- 打开入口有三个，都归官方：引导页胶囊、标签条上的 `+`（列出所有 page 类型）、以及
  插件自己调用 `openPanel(id)`。

---

## 4. 反模式清单

| ❌ 错误写法 | 症状 | ✅ 正确做法 |
|---|---|---|
| 继续用 `ctx.get('dock')` / `dock.registerPanel` | 服务不存在 → 面板永远不出现（或走降级 UI） | 改用 `sidebarPanel` |
| 注册成功后**再也不复查** | ui-beautify 热重载/重装后面板从右侧栏消失 | `ctx.inject(['sidebarPanel'], cb)` 或监听 `internal/service` 重绑 |
| 用对象身份判断服务是否更换 | 守护 ctx 下每次 `get` 都是新 Proxy → 每轮都注销重注册 | 用 `side.has(id)` 做幂等判据 |
| `exports.inject = [..., 'sidebarPanel']` | 没装 ui-beautify 时插件被挂起 | 可选服务用 `ctx.inject` |
| `mount` 里不返回清理函数 | 切标签后定时器/监听泄漏 | 返回清理函数 |
| `ctx.inject(['sidebarPanel'], function (c) { … })` | 回调被 `new`，清理函数被丢弃 → 注册泄漏 | 用箭头函数 |
| 自己改 `grid-template-columns` / 盖 `data-vsc-pp3` | 与官方右侧栏抢轨道（v1.x 的老毛病） | 交给官方，插件只注册标签 |
| 改 `id` 来「修 bug」 | 用户已开的标签变孤儿、状态丢失 | id 一次定终身 |
| 假设「注册即打开」 | 面板没显示，误以为注册失败 | 引导页/标签条点开，或显式 `openPanel` |

---

## 5. 自测清单

1. **引导页**：刷新页面 → 右侧栏「开始」页上出现你的入口胶囊（不是自动开成标签）。
2. **打开**：点胶囊 → 右侧栏出现你的标签，正文渲染正常。
3. **并存**：与官方「文件」标签并排；点标签能切换；标签条溢出时可横向滚动。
4. **浮动 / 分屏**：标签菜单里的浮动、分屏由官方提供，行为与官方标签一致。
5. **每会话**：切到另一个会话 → 各自独立的标签状态。
6. **热重载**：修改 ui-beautify 的 `lib/client.js`（或重装）→ 标签自动回到右侧栏，
   不需要刷新页面。
7. **卸载**：禁用/卸载你的插件 → 标签与引导页胶囊一起消失。
8. **无 ui-beautify**：临时移除 ui-beautify → 插件本体正常加载，走自己的降级 UI，
   控制台不报错。

---

## 6. 版本与兼容约定

> 参考实现：`dsh-file-explorer` 与 `dsh-deepseek-billing` 均已按本规范接入
> （可选依赖 + 箭头函数回调 + 守护 ctx 的幂等退化绑定器），可以直接对照它们的 `apply`。

- `sidebarPanel.apiVersion` 是**能力号**，只在出现不兼容变更时递增；新增动词/字段不会改它。
  消费方按 `>= N` 探测。
- 面板的**打开状态、浮动、几何、标签顺序**永远由官方右侧栏持有并持久化；
  插件不得直接写任何 `localStorage` 键。
- ui-beautify 未安装时：`ctx.inject(['sidebarPanel'], cb)` 永不执行，插件其余功能必须
  照常工作 —— 所有面板集成代码都应放在那个回调里，或先做
  `typeof side.registerPanel === 'function'` 守卫。
- 本规范随 `docs/` 一起发布（`package.json` 的 `files` 已包含 `docs`）。

---

## 7. 实机验证清单（改完必须实测）

静态检查（`node --check`、契约冒烟测试）只能保证接线正确，**观感与宿主行为必须用浏览器实测**。
本仓库的安装方式是 Junction（`~/.dsh/profiles/web/node_modules/dsh-ui-beautify` →
本目录），所以仓库工作区**就是运行中的副本**，改完刷新页面即可生效。

改完 `lib/client.js` 后按顺序做这 9 步：

| # | 操作 | 期望 |
|---|---|---|
| 1 | 硬刷新页面（Ctrl+F5） | 右侧栏不再被插件的样式/网格覆盖；左侧栏、对话区、右侧栏三段都正常 |
| 2 | 切到「经典」模式再切回「卡片」 | 两种模式都不残留第三方网格；刷新后状态保持 |
| 3 | 卡片模式：拖动左侧栏卡片顶栏 | 卡片脱离成浮动窗，落到上/下/左/中/右能吸附回位，`Esc` 取消 |
| 4 | 展开右侧栏（对话区右上角的镜像按钮） | 出现「开始」引导页，页面上有**多个**入口胶囊（官方的「工作区文件」+ 各插件的入口） |
| 5 | 点插件入口胶囊 | 右侧栏出现该插件的标签，与「文件」标签并排；正文渲染完整（不是空白/不是"nothing can view this"） |
| 6 | 标签菜单里试**浮动**，再**回停靠** | 官方浮动窗出现、几何可拖、回停靠后回到原标签位 |
| 7 | 切换会话 | 每个会话各自独立的标签状态；切回来时之前开的标签还在 |
| 8 | 改动 `lib/client.js` 触发 ui-beautify 热重载 | 标签自动回到右侧栏（不需要刷新页面，不需要重启 `dsh web`）；若 1 秒内没回来即为自愈逻辑失效 |
| 9 | 临时禁用 ui-beautify（改 profile 的 `cordis.patch.yml`） | 下游插件（文件浏览器 / 峰谷计费）回到各自的降级 UI：标题栏按钮 / 独立浮动卡，控制台不报错 |

补充说明：

- 若第 4 步**完全没有出现引导页**（右侧栏直接开成「文件」标签），说明插件没注册进去 ——
  检查控制台是否有 `sidebarPanel` 相关错误，以及 `ctx.sidebarRightTabs` 是否真的可用。
- 若第 8 步标签没回来，说明 `panelSeatAlive()` 的自愈没生效（宿主可能换了槽位声明却没换
  服务实例），此时应能在 1 秒内看到重新注册。
- **不要**为了让第 5 步好看而让插件去写 `grid-template-columns` —— 那正是 1.15.x 与官方
  右侧栏冲突的根因。
