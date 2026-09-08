# 插件面板接入规范（`dock` 服务契约 v2）

> 面向：任何想把界面挂到 DSH Web「插件面板」里的外部插件。
> 适用版本：`dsh-ui-beautify` ≥ **1.15.0**（`dock.apiVersion === 2`）。
> 目的：让「新插件接入插件面板」变成一次复制粘贴，而不是一次考古。

插件面板（🧩 插件面板）是 `dsh-ui-beautify` 提供的一个**统一宿主**：它把所有已注册插件的
界面收进同一张停靠卡（卡片模式）或右侧第三列（经典模式），并负责芯片行（可用插件清单）、
标签行（已打开插件）、打开/关闭/浮动/回停靠、以及这些状态的持久化。插件本身不关心布局，
只需要向宿主**注册一个面板**并提供一段 `mount(el)` 渲染函数。

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
    const PANEL_ICON = '🧩'

    /* 面板内容：宿主给一个可滚动的空容器 el，你往里渲染；返回清理函数。 */
    function mountPanel(el) {
      const box = document.createElement('div')
      box.textContent = 'Hello from my plugin'
      el.appendChild(box)
      return () => { el.textContent = '' }   // 必须返回清理函数（见 §3.3）
    }

    function apply(ctx) {
      /* dock 是【可选】服务：ui-beautify 没装 / 还没加载 / 正在热重载，都不能报错。 */
      const fiber = ctx.inject(['dock'], (dockCtx) => {
        const dispose = dockCtx.dock.registerPanel({
          id: PANEL_ID, title: PANEL_TITLE, icon: PANEL_ICON, mount: mountPanel
        })
        /* 返回的函数会在 dock 消失（ui-beautify 卸载/热重载）时被调用；
           dock 重新出现时 cordis 会再跑一遍本回调 —— 无需轮询、无需身份比对。 */
        return () => { try { dispose() } catch (err) {} }
      })
      ctx.effect(() => () => { try { fiber.dispose() } catch (err) {} })
    }

    exports.apply = apply
    exports.inject = ['slots', 'remote']    // 不要在这里写 'dock'（见 §2.1）
    return module.exports
  }
})
```

要点：

- `ctx.inject(['dock'], cb)` 是 **cordis 的可选依赖**：`dock` 不在时回调不执行（插件本体照常
  加载），`dock` 出现时执行，消失时自动清理，再次出现时重新执行。这正是「ui-beautify 热重载
  后我的面板要回来」所需要的行为。
- ⚠️ **回调必须是箭头函数**（`(dockCtx) => { … }`）。cordis 用 `isConstructor(cb)` 区分
  「类插件」与「函数插件」：普通 `function (dockCtx) { … }` 会被 `new` 调用，**返回的清理函数
  被直接丢弃** —— dock 消失或你的插件卸载时注册会泄漏在宿主里（面板残留、标签关不掉），
  而且不报任何错。`async` 函数与生成器函数同样安全（它们没有 `prototype`）。
- **不要**再给 `ctx.inject` 包一层 `ctx.effect(() => () => fiber.dispose())`：子纤维的生命周期
  已经挂在你的插件纤维上，额外包一层既多余、又容易在「回调被当成类插件」时把问题藏得更深。
- 如果 `ctx.inject` 不可用（见 §2.2 的守护 ctx），退化为「事件 + 兜底轮询」的绑定器（§2.3）。
- 注册**不等于**打开：注册后面板只是出现在芯片行，打开与否由用户点击（或你显式调用
  `openPanel` / `focusPanel`）决定。

---

## 2. 拿到 `dock` 服务的三种写法

### 2.1 推荐：`ctx.inject(['dock'], cb)`（可选依赖）

| 写法 | 结果 |
|---|---|
| `ctx.inject(['dock'], cb)` | ✅ 回调在 `dock` 可用时执行、不可用时清理；插件本体不被阻塞 |
| `exports.inject = ['slots', 'remote', 'dock']` | ❌ 硬依赖：没装 ui-beautify 时**整个插件被 cordis 挂起**，连槽位/远程命名空间都不注册 |
| `ctx.get('dock')` 只用一次 | ⚠️ 只在 ui-beautify 已加载时有效；加载顺序反过来就永远拿不到 |

### 2.2 谁会被「守护 ctx」限制

- **profile 安装的插件**（`dsh plugin --profile web add …`，即本仓库的使用方式）走的是浏览器端
  真正的 cordis，`ctx.inject` / `ctx.on` / `ctx.provide` / `ctx.get` / `ctx.effect` 全部可用。
- **运行时动态包**（由 agent 通过 cordis 工具加载、代码以字符串下发，走
  `@deepseek-ai/dsh-cordis-client-runner`）拿到的是守护式 facade：只放行
  `effect / on / once / provide / 超时族 / get` 与 `inject` 中声明过的服务，
  **`ctx.inject` 本身不在白名单里**（调用会抛 `dynamic ctx does not expose "inject"`）。
- 因此：**先试 `ctx.inject`，抛错再退化**。不要写 `ctx.reflect.provide(...)`（facade 下没有
  `reflect`），也不要依赖 `ctx.get('dock')` 的**对象身份**做变更检测。

### 2.3 退化绑定器（动态包 / 需要同时支持两者时）

```js
function bindDock(ctx, def) {
  let dispose = null, bound = false, boundTo = null, stopped = false
  const unbind = () => { if (dispose) { try { dispose() } catch (e) {} } dispose = null; bound = false; boundTo = null }
  const sync = () => {
    if (stopped) return
    const d = ctx.get('dock')
    if (d === undefined || d === null || typeof d.registerPanel !== 'function') { unbind(); return }
    /* 已绑定、且当前 host 里确实还有我们的面板 → 幂等跳过（重复事件、轮询都无害）。
       `has()` 是语义检查，比对象身份可靠；极旧 host 没有 has 时退化为身份比较。 */
    if (bound) {
      const alive = typeof d.has === 'function' ? d.has(def.id) : d === boundTo
      if (alive) return
      unbind()                       // host 被换掉了：先撤销旧注册，再注册到新 host
    }
    try { dispose = d.registerPanel(def); bound = true; boundTo = d } catch (err) { console.error(err); dispose = null; bound = false }
  }
  sync()                             // ① 先试一次（dock 可能已经在了）
  const off = ctx.on('internal/service', (name) => { if (name === 'dock') sync() })  // ② dock 变化时同步
  const timer = window.setInterval(sync, 1000)                                        // ③ 兜底：加载顺序竞态
  ctx.effect(() => () => { stopped = true; off(); window.clearInterval(timer); unbind() })
}
```

关键点是 `sync()` **幂等**：它只做「没绑定就绑定、绑定了但不是当前 host 的就重绑」，所以重复事件、
轮询、事件顺序颠倒都不会导致面板被反复注销重注册（那会让用户正在看的面板莫名关闭）。

`internal/service` 是 cordis 的内置事件：`ctx.provide(name, value)` 在**注册与注销时**都会
emit 它，参数为 `(name, value)`（注销时 `value` 为 `undefined`）。它在 provider 的 fiber 从
LOADING 变 ACTIVE 之后触发，因此回调里 `ctx.get('dock')` 一定拿得到新服务。两个必须注意的点：

1. **同一次注册可能 emit 多次** —— cordis 在 fiber 状态迁移时会再次通知该 fiber 提供的服务
   （实测一次 `provide` 会收到 2 个 `on`）。所以绑定器必须**幂等**（已绑定就跳过），
   不要假设「一个事件 = 一次变更」；用 §2.3 里的 `bound` 标志即可。
2. **事件是全局的** —— 任何服务的注册/注销都会走它，必须先 `name === 'dock'` 过滤。

---

## 3. 契约参考

### 3.1 `registerPanel(def)` —— 面板定义

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `id` | `string` | ✅ | 面板唯一标识，**同时是持久化键**。要求：非空、小写、带插件名前缀（`my-plugin`），**跨版本永不修改** —— 改 id 等于清空用户的开合状态与浮动窗口几何。 |
| `title` | `string` | ✅ | 标签与芯片上的显示名。建议中文 2–6 字（标签标题超过 132px 会省略号截断）。 |
| `icon` | `string` | ➖ | 单个 emoji（默认 `🧩`）。 |
| `mount` | `(el) => (() => void) \| void` | ✅ | 渲染函数，见 §3.3。 |

返回：**disposer 函数**，调用即注销该面板（关闭并从芯片行、持久化里移除）。

行为要点：

- **注册 ≠ 打开**：注册只让面板出现在芯片行；`open` 由用户点击或 `openPanel/focusPanel` 决定。
- **同一 id 重复注册 = 刷新定义**（v1.15.0 起）：`title/icon/mount` 更新为新值，
  `open / float / 打开顺序 / 窗口几何` **全部保留**，返回的 disposer 依然有效。
- **disposer 带身份校验**：只有当该 id 仍指向你注册的那份 def 时才注销 —— 旧句柄不会误删
  后来接管的注册。想「重新注册」时直接再调一次 `registerPanel` 即可，不必先 dispose。
- **id 冲突**：后注册者接管（last writer wins）。请用带插件名的 id 避免撞名。
- `def` 校验失败会**抛 `TypeError`**（缺 id / 缺 mount），便于在开发期立刻发现。

### 3.2 完整 API（`dock.apiVersion === 2`）

| 成员 | 说明 |
|---|---|
| `apiVersion` | `2`。消费方用 `dock.apiVersion >= 2` 做特性探测，不要靠 API 名猜行为。 |
| `registerPanel(def)` | 注册/刷新面板，返回 disposer。 |
| `openPanel(id)` | 打开（从关闭态打开会取新的**打开序号**，即排到标签末尾）。**不改变当前激活标签**（保持旧语义，供状态同步调用）。 |
| `focusPanel(id)` | 打开并**切换到**该面板（芯片行/菜单点击用）。已打开且已激活时为 no-op；浮动态不抢焦点。 |
| `closePanel(id)` | 关闭该面板（面板本身不消失，只是回到芯片行的「未打开」态）。 |
| `floatPanel(id)` / `dockPanel(id)` | 脱离成浮动窗口 / 回停靠。**不改变打开序号**（面板留在原来的标签位置）。 |
| `isOpen(id)` | 是否处于打开态（含浮动态）。 |
| `has(id)` | 该 id 是否已注册。 |
| `active()` | 当前激活（正在显示）的标签 id，没有则 `null`。面板可据此判断「我是不是当前可见的」。 |
| `mode()` | `'card'`（卡片模式）或 `'classic'`（经典三列）。 |
| `subscribe(fn)` | 订阅引擎变化（打开/关闭/浮动/回停靠/模式切换），返回退订函数。用于把自己的按钮高亮与宿主状态对齐。 |

### 3.3 `mount(el)` 的生命周期（最容易踩）

- 宿主把面板内容渲染在一个 **`flex:1; overflow:auto; minHeight:0`** 的容器里，`el` 就是这个容器；
  它已经带滚动，面板不要重复套一层全高滚动区（需要贴底布局时给内部元素 `height:100%`）。
- **每次切换标签都会先 unmount 上一个面板、再 mount 新面板**：卸载时会调用你返回的清理函数，
  并把容器 `textContent` 清空。所以 `mount` 必须「可重复调用、状态自己持有、DOM 全部重建」，
  不能假设自己的 DOM 一直活着。
- **必须返回清理函数**（或在内部用 `ctx.effect` 登记）：定时器、全局监听、`body` 级浮层、
  自建 React root 都要在那里释放。返回非函数、非空值会抛错。
- **不要在 `mount` 里改引擎状态**（`openPanel/closePanel/floatPanel` 等）：`mount` 由 React 的
  effect 调用，此时改状态会触发引擎重渲染，可能把刚挂上的面板再卸一次。这类动作只放在
  用户手势（按钮点击）里。
- 同一时刻一个面板只存在一份：停靠态渲染在插件面板里，浮动态渲染在独立浮窗里，二者互斥。

### 3.4 标签顺序与焦点语义（v1.15.0 起）

- **标签顺序 = 打开顺序**（先打开的靠左），与插件注册顺序无关。
- **关闭标签**：该标签消失，其余标签的相对顺序不变；若关掉的是当前激活标签，焦点交给它的
  **左邻**（没有左邻则取右邻），都没有就进入空态。
- **重新打开**：取一个新的打开序号 → 排到**最末尾**（与浏览器标签一致）。
- **浮动 / 回停靠**：面板仍算「打开」，序号不变，回停靠后回到原来的标签位置。
- **芯片行顺序 = 注册顺序**（这是「可用插件清单」，顺序稳定才好找）。
- 顺序持久化在 `localStorage['dsh.layout-studio:state']`（`panels[id].order` + 顶层
  `panelSeq` 计数器），刷新页面后保持；旧版本遗留的状态没有 `order`，会按注册顺序排在前，
  首次打开后自动补号。

### 3.5 持久化结构（消费方只需知道两件事）

```jsonc
{
  "panels": {
    "my-plugin": { "open": true, "float": false, "order": 3, "x": 140, "y": 80, "w": 560, "h": 420 }
  },
  "panelSeq": 3,          // 单调递增的打开序号计数器
  "pluginPanel": { "open": true, "float": false /* … */ }
}
```

1. `id` 是这份状态的键 —— **改 id 就丢状态**。
2. 不要自己写这两个键：面板的开合/浮动/几何/顺序一律通过 dock API 操作。
3. 宿主在被卸载（热重载/停用）后**不会再写这份存储**，所以消费方在旧实例上执行注销不会
   覆盖新实例已经恢复的状态 —— 但消费方仍应尽快用幂等 `sync()` 重绑，别让面板长时间缺席。

---

## 4. 生命周期时序

```
① 页面加载
   profile bundle 顺序 … → dsh-ui-beautify 加载 → ctx.provide('dock', dockApi)
   → provider fiber 变 ACTIVE → cordis emit internal/service('dock', dockApi)
   → 你的 ctx.inject(['dock'], cb) 回调执行（或退化绑定器收到事件）
   → dock.registerPanel(def) → 芯片行出现你的插件（未打开）

② 用户点击芯片
   focusPanel(id) → panels[id].open = true、order = ++panelSeq、激活该标签
   → DockPanelBody 渲染 PanelMount → mount(el) 被调用

③ 用户切换标签
   上一个面板 unmount（调用你的清理函数）→ 新面板 mount(el)

④ 用户点击标签的 ×
   closePanel(id) → open = false → 面板 unmount；序号保留但重开会重新取号

⑤ 用户点面板 ×（关闭整个插件面板）
   closeDock() → 所有面板 open = false，标签行消失（芯片行仍在）

⑥ ui-beautify 热重载 / 卸载
   旧 fiber 销毁 → dock 注销（internal/service 再次 emit，value = undefined）
   → 你的注册随旧 host 一起作废 → 你返回的清理函数被执行
   → 新 fiber provide 新的 dock → 你的回调再跑一次 → 面板回到芯片行
```

---

## 5. 反模式清单（都是真实踩过的）

| ❌ 错误写法 | 症状 | ✅ 正确做法 |
|---|---|---|
| 注册成功后**再也不复查** dock | ui-beautify 热重载/重装后，你的面板从插件面板消失（只剩别的插件） | `ctx.inject(['dock'], cb)`，或监听 `internal/service` 重绑 |
| 在轮询里**无条件重注册**（或 dispose 后立刻重注册） | 旧版会重置 `open` 状态 → 标签闪烁/面板自动关闭；新版虽已幂等刷新，但仍是无效开销 | 用 §2.3 的**幂等 `sync()`**（`d.has(id)` 检查后再决定是否注册） |
| 用 `ctx.get('dock') !== 上次的值` 判断服务是否更换 | 在守护 ctx 下每次 `get` 都是新 Proxy，判断恒为真 → 每轮都注销重注册；在 profile ctx 下当前虽成立，但这不是契约 | 用 `ctx.inject` 或 `internal/service` 事件 |
| `exports.inject = [..., 'dock']` | ui-beautify 未安装时插件被挂起，连槽位都不注册 | 可选服务用 `ctx.inject(['dock'], cb)` |
| `ctx.reflect.provide('dock', …)` / 依赖 `ctx.reflect` | 动态包 facade 下抛错 | 只用 `ctx.provide` / `ctx.inject` / `ctx.on` / `ctx.effect` / `ctx.get` |
| `mount` 里不返回清理函数 | 切标签后定时器/监听/浮层泄漏，面板越切越卡 | 返回清理函数，或内部 `ctx.effect` 登记 |
| `ctx.inject(['dock'], function (c) { … return cleanup })` | 回调被 cordis 当成类插件 `new` 了一次，**返回的清理函数被丢弃**：dock 消失/插件卸载后注册泄漏（面板残留） | 用箭头函数：`ctx.inject(['dock'], (c) => { … return cleanup })` |
| `mount` 里调用 `openPanel/closePanel` | 引擎重渲染期间自我卸载 | 只放在用户手势里 |
| 面板 DOM 直接挂到 `document.body` | 宿主重挂载后残留、层级错乱 | 只渲染进 `mount` 给的 `el` |
| 改 `id` 来「修 bug」 | 用户的开合状态与浮动窗口位置被清空 | id 一次定终身；要改语义就换新 id 并做迁移 |
| 在 `registerPanel` 前后假设「注册即打开」 | 面板没显示，误以为注册失败 | 注册后按需 `openPanel` / `focusPanel` |

---

## 6. 自测清单

接入完成后，用浏览器实测这几条（全部通过才算接好）：

1. **首屏**：刷新页面，插件出现在芯片行，面板未被强制打开。
2. **打开/切换**：点击芯片 → 面板出现且内容渲染；再开第二个插件 → 标签行出现两个标签，
   顺序为「先打开的靠左」，点标签能切换内容。
3. **关闭**：标签 × 关闭 → 标签消失、面板回到「未打开」；关掉当前激活标签时焦点落在左邻。
4. **重开顺序**：把关闭的那个再打开 → 它排到标签末尾。
5. **浮动/回停靠**：标签的 ⧉ → 变成浮动窗口；「回停靠」→ 回到原来的标签位置。
6. **热重载**：修改 ui-beautify 的 `lib/client.js`（或重装）→ 面板应自动回到芯片行，
   不需要刷新页面、不需要重启 `dsh web`。
7. **插件卸载**：禁用/卸载你的插件 → 芯片与标签都消失，`localStorage` 里不留 `panels[id]` 残行。
8. **持久化**：刷新页面 → 打开的面板、标签顺序、浮动窗口几何全部保持。
9. **窄面板**：把插件面板拖到最窄 → 芯片行/标签行横向滚动，滚动条与内容之间有留白，
   芯片与标签不被裁切。
10. **无 ui-beautify**：临时移除 ui-beautify → 插件本体正常加载，只是没有插件面板集成，
    控制台不报错。

---

## 7. 版本与兼容约定

> 参考实现：`dsh-deepseek-billing` v0.1.22 与 `dsh-file-explorer` v1.10.2 均已按本规范接入
> （可选依赖 + 箭头函数回调 + 守护 ctx 的幂等退化绑定器），可以直接对照它们的 `apply`。

- `dock.apiVersion` 是**能力号**，只在出现不兼容变更时递增；新增动词/字段不会改它。
  消费方按 `>= N` 探测，不要按名字猜。
- 面板状态（`open/float/order/几何`）永远由宿主持有并持久化；插件不得直接写
  `localStorage['dsh.layout-studio:state']`。
- ui-beautify 未安装时：`ctx.inject(['dock'], cb)` 永不执行，插件其余功能必须照常工作 ——
  所有面板集成代码都应放在那个回调里，或先做 `typeof d.registerPanel === 'function'` 守卫。
- 本规范随 `docs/` 一起发布（`package.json` 的 `files` 已包含 `docs`）。
