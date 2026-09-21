# dsh-ui-beautify

> 给 DeepSeek Harness（DSH）的 Web 界面换一套更顺眼的外观：配色预设、整页背景图，外加一个让其他插件接入 **DSH 官方右侧栏**的统一入口。所有改动都保存在浏览器本地，随时可以一键还原。

## 它做什么

**外观美化**：内置四套配色预设（默认 / 深海蓝 / 暖沙 / 松石绿），浅色与深色模式各有适配，切换时不只是换背景和气泡，连 DSH 界面里的蓝色强调元素（文件夹图标、加载动画、标签高亮、链接等）也会一起换成预设色；此外可以上传一张本地图片作为整页背景，插件会自动把它压缩到最长边 2560px 以内、并为上层文字加上可读遮罩，侧边栏与主区都会显示。

**插件面板入口**：向本插件注册界面的其他插件会出现在 **DSH 官方右侧栏**里——注册成它的标签页（服务名 `sidebarPanel`，见 [`docs/plugin-panel-integration.md`](docs/plugin-panel-integration.md)）。标签条、增删、横向溢出、浮动、分屏、每会话独立状态全部由官方负责；本插件只提供统一的注册入口与标签正文的布局契约，**不接管任何列几何**。

**记忆与撤销**：配色与背景图保存在浏览器 `localStorage` 里，刷新页面或重启 DSH 都会自动恢复；「重置全部」随时可以回到出厂状态，卸载插件后所有注入的样式都会被移除。

## 安装

前置要求是 DSH **`0.1.5-rc.2`** 及以上（本插件针对带官方右侧栏的 Web 客户端编写），官方安装方式还需要 [pnpm](https://pnpm.io/zh/)（`npm install -g pnpm`）。

```bash
# 发布态（推荐：钉死提交，避免 install 时回退到旧版本）
dsh plugin --profile web add github:Zalpha263/dsh-ui-beautify#<完整40位commit>

# 开发态（本地源码目录）
dsh plugin --profile web add file:<你的源码路径>

# 升级与卸载
dsh plugin --profile web install     # 改过 profile 里钉住的提交号后重装
dsh plugin --profile web remove dsh-ui-beautify
```

装完**重启 DSH**，打开「设置 → UI设置」即可使用；升级时把 profile 的 `package.json` 里钉住的提交号改成新提交（无 BOM 保存）再执行 `install`，然后重启或硬刷新。

## 使用说明

所有开关都集中在「设置 → **UI设置**」（外观美化与布局设置已合并到同一页）：

| 区域 | 控件 | 作用 |
|------|------|------|
| 外观美化 | 配色预设 | 一键切换整套配色，点「默认」还原 DSH 原生蓝 |
| 外观美化 | 选择图片 / 清除 | 上传本地图片作为全页背景，或移除背景图 |
| 外观美化 | 重置全部 | 恢复默认外观并清除已保存的外观设置 |

> 「UI设置」里现在只有外观美化。3.0.0 起卡片布局引擎整体移除（见更新日志），所以布局模式、恢复默认布局这类控件也随之消失。

> 设置保存在浏览器 `localStorage`：刷新页面、重启 DSH 都会自动恢复，清除浏览器站点数据会重置。插件面板的标签状态由官方右侧栏按会话保存。

## 常见问题

| 问题 | 原因与解决 |
|------|-----------|
| 「设置」里没有「UI设置」 | 安装后没有重启 DSH（插件在启动时加载），重启后再看 |
| 卡片布局 / 布局模式去哪了？ | 3.0.0 起整体移除。它在拖动「卡片」时要改写官方 AppFrame 的 `grid-template-columns`，而那正是官方右侧栏通过 `ctx.layout.openRightbar()` 申领的资源；两边互相覆盖就是之前"面板与侧边栏冲突"的根因，所以这个玩法被放弃 |
| 插件面板去哪了？ | 2.0.0 起它不再是独立面板：插件注册的界面成了官方右侧栏的标签页，在右侧栏「开始」页的入口胶囊里点开 |
| 换浏览器 / 清缓存后设置不见了 | 设置存在浏览器 `localStorage`，这是预期行为 |
| 卸载后还有样式残留 | 插件样式随插件注入并在卸载时移除，仍有残留请硬刷新（Ctrl+F5） |
| 其他插件更新 / 热重载后界面异常 | v1.15.1 已修复：宿主热重载会替换框架节点，引擎现在会自动识别并重新接管，最迟 1 秒内恢复；若仍异常请硬刷新并反馈 |
| 从 1.x 升到 2.0.0 后磁盘上的旧布局数据 | 旧状态里的 `dock` / `pluginPanel` / `panels` 字段不再读取（也不再写回），下一次保存即从存储中消失，不影响加载 |

## 兼容性

本插件面向 DSH **`0.1.5-rc.2`** 的 Web 界面（Windows / Linux / macOS）编写，依赖官方右侧栏标签系统（`sidebar-right` 的 `sidebarRightTabs` / `sidebar.right.pane.tab`）。用户气泡走宿主 token `--dsw-specific-bubble`，只有会话发送按钮与侧边栏淡出层仍按当前客户端产物的哈希类名覆盖（`.uV2eYG_primary` / `.bhn1Oq_fade`，二者在 0.1.5-rc.2 仍然存在），**DSH 大版本升级后建议在「外观美化」里复核这两处**；布局引擎按宿主稳定的 `data-slot` 锚点与两列网格交互，并在每次操作前重新定位宿主框架，因此任意插件热重载导致的宿主重渲染都能自愈。背景图以压缩后的 data URL 存在浏览器 `localStorage`（约 5MB 配额内），超大图片上传时会自动压缩。

## 开发者

单文件实现，Host 半区 `lib/index.js` 是空壳（仅用于注册），全部逻辑在 `lib/client.js`；这是手写的 `__ModuleLoader__.load` 格式，不是构建产物，改完**刷新页面即可生效**。调色板在 `PRESETS` 常量里；`SHEET` 只保留标签正文的布局契约（`.dsh-sidebar-panel-host`）：`width:100% / min-width:0 / flex:auto / overflow:hidden / display:flex / flex-direction:column / container-type:inline-size`。三个 effect 分别是外观清理、`ctx.provide('sidebarPanel')`、以及把已注册面板绑到官方右侧栏的 `bindPanelHost`。

**插件接入规范**：[`docs/plugin-panel-integration.md`](docs/plugin-panel-integration.md) 是 `sidebarPanel` 服务（`apiVersion = 1`）的完整契约，包含最小骨架、面板定义字段、API 表、`mount` 生命周期、与官方右侧栏的关系、反模式清单与自测清单；`package.json` 的 `files` 已包含 `docs`，文档随包发布。改这个 API 时必须同步更新它——消费方要用 cordis 的可选依赖写法 `ctx.inject(['sidebarPanel'], (c) => { const s = c.get('sidebarPanel'); const d = s.registerPanel(def); return () => d() })`（注意回调必须是箭头函数），既不要把 `sidebarPanel` 写进 `inject: [...]`，也不要用 `ctx.get('sidebarPanel')` 做身份比对。

## 更新日志

### v3.0.1
- **修复：目标面板里的用户气泡不跟随配色预设。** 预设原来只按 chat 包的哈希类名 `.Sixlwa_bubble` 覆盖气泡底色，而 0.1.5-rc.2 把用户气泡收进宿主 token `--dsw-specific-bubble`，chat 与 goal 两个包共用它。现在预设把该 token 一并写入覆盖，目标面板的气泡也跟随预设；同时去掉一处会在宿主重建后失效的哈希类名依赖（发送按钮无对应 token，保留类名覆盖）。
- **修复：`SHEET` 样式在卸载 / 热重载后残留。** 面板正文布局契约（`.dsh-sidebar-panel-host` 与 `@container dshpanel`）的 disposer 从未被调用，每次重载都会在 `<head>` 留下一个样式节点。现在随外观清理一起释放。
- **修复：背景图超出 `localStorage` 配额时的回退路径自相矛盾。** 旧实现先把【旧背景】写回存储（屏幕上是新图、存储里是旧图），压缩成功后只改内存里的 `bg.dataUrl` 而不重建 CSS，于是屏幕与存储长期不一致、刷新后突然变样；异步回调还会读取可变的 `bg`。现在压缩成功后重新走 `setBackgroundFromDataUrl` 重建 CSS 并持久化，并在回调里确认背景仍是同一张图。
- 说明：本插件无宿主依赖（Host 半区为空壳），因此不需要 peer 声明；兼容面为 0.1.5-rc.2。

### v3.0.0
- **破坏性变更：卡片布局引擎整体移除。** 侧栏 / 对话区 / 停靠卡的拖动、吸附、浮动、缩放，布局模式开关，以及卡片的持久化状态全部删除。`lib/client.js` 从 117,362 字节降到 32,618 字节（2176 → 638 行）。
- **原因**：把某个区域当"卡片"停靠，就必须改写官方 `AppFrame` 的 `grid-template-columns`；而那正是官方右侧栏通过 `ctx.layout.openRightbar(track, fullscreen)` 申领的同一份资源。两套系统互相覆盖，就是此前"插件面板与侧边栏严重冲突"的根因。用户侧的决定是放弃这个玩法，改为后续用其他方式做美化——**移除它让冲突面归零**，而不是继续和官方协调列几何。
- 随之移除的还有：`LAYOUT_DEFAULTS` / `layoutState` / `mergeLayoutState` / `applyLayout` / `applyClassicLayout` / `removeAll` / `tagColumns` / `cardRect` / `effectiveSide*` / 五个拖拽会话与全部拖拽手势 / `Chrome` 覆盖层 / 调试几何探针 / 帧发现与自愈生命周期（`findFrame` / `rearm` / `healthCheck` / `waitFrame`）/ 布局设置组 `SettingsPanel`，以及卡片专用的 CSS 与常量（`CARD_KEYS`、`frameColumn`、`CONV_MIN_W`、`FLOAT_MIN_W/H`、`SIDEBAR_RAIL`、`ZONE_*` 等）。
- **保留**：外观美化（配色预设、整页背景图、`Panel`）、`sidebarPanel` 服务及其标签正文布局契约、以及三个 effect。**「UI设置」现在只显示外观美化**——布局组随卡片引擎一起去掉了。
- 保留 `bindPanelHost` 是刻意的：它看起来像"宿主相关"，但其实是**服务自身的绑定器**。面板可能在官方右侧栏加载完成之前就注册，没有它那些面板永远不会绑上（这一点是契约测试抓出来的——删掉它后 `calls.types` 为空）。
- 若你此前用过卡片模式，浏览器里遗留的 `dsh.layout-studio:state` 不再被读取，也不影响加载；可自行清除。

### v2.0.2
- **修复：卡片模式拖不动 / 界面卡死。** 根因是 v2.0.0 清理自研面板宿主时，把 `beginDrag()` / `endDrag()` 连同宿主一起删掉了 —— 但这两个函数是**所有拖拽共用**的（卡片拖出、边缘缩放、手柄拖动），它们只负责给框架打上 `data-vsc-dragging`（SHEET 用它关闭拖拽期间的过渡）。删除定义后 `startDragSession` 每次调用都抛 `ReferenceError`，而且是在 `e.preventDefault()` **之前**抛的，于是浏览器原生拖拽接管了指针，表现就是"卡片拖不动、整个界面像卡死"。
- 修复：`clampFloat()` 仍遍历 `'dock'` 卡（该卡已不存在）→ 拖动卡片脱离时抛 `Cannot read properties of undefined (reading 'fw')`。
- 修复：`tagColumns()` / `raiseCard()` / `onCardPointerDown()` / `reconcileEvictions()` / `setDock()` 仍硬编码三卡索引，全部改走 `CARD_KEYS` + `frameColumn()`。
- 新增回归测试：`_test_card_engine.mjs` 在沙箱里加载真实产物、渲染 chrome 覆盖层、**真的派发一次 pointerdown → pointermove → pointerup**，断言 `data-vsc-dragging` 按预期置位/清除且全程零错误。该测试已验证能捕获上面这个 bug（移除修复后即失败）。

### v2.0.1
- 修复：插件面板挂到官方右侧栏后**布局错乱**。宿主现在统一给出标签正文的布局契约 —— 容器 `.dsh-sidebar-panel-host` 带 `width:100% / min-width:0 / flex:auto / overflow:hidden / display:flex / flex-direction:column`。其中 `min-width:0` 是关键：flex 项默认 `min-width:auto`，长文件名会把树行撑宽并让祖先出现横向滚动；`display:flex` 则让插件根节点的 `height:100%` 有确定的父高度，面板不再塌成内容高度。
- 新增：宿主用 `ResizeObserver` 量**面板自身**宽度，`<420px` 时加 `data-dsh-narrow`，并提供 `@container dshpanel` 容器查询；同时给面板内带 `.fexp-panel` 的元素补 `.fexp-narrow`，让按窗口宽度判断紧凑模式的早期消费方无需改造即可生效。
- 说明：右侧栏宽度**不是固定值** —— 官方列几何首开默认占 frame 的 45%、下限 300px，窗口小于 768px 时自动全屏。旧的 400/560px 假设不再成立，接入规范已补上这节契约表。

### v2.0.0
- **破坏性变更**：`dock` 服务（API v2）与自研「插件面板」宿主整体移除，改为把插件面板注册成 **DSH 官方右侧栏的标签页**。新服务名为 `sidebarPanel`（`apiVersion = 1`），面板定义新增 `entry`（引导页入口胶囊）与 `render`（React 面板），`mount` 继续支持纯 DOM 插件。
- **修复**：与官方侧边栏的严重冲突。根因是本插件自 1.12.0 起把面板渲染进第三列并覆盖宿主 `grid-template-columns`（`data-vsc-pp3` + `--vsc-pp-cols`），而 DSH 0.1.5-rc.1 起该轨道的正式主人是官方右侧栏（自有展开 / 浮动 / 分屏 / 几何持久化）。现在插件不再写任何列几何。
- **修复**：删除对 `layoutSvc.closeDetails()` 的调用 —— 该动词在 0.1.5-rc.1 的 `ILayout` 上已不存在，原调用是失效的。
- **变更**：卡片引擎从三卡收缩为两卡（侧栏 + 对话区）。第三张「停靠卡」随插件面板宿主一起移除，吸附加的五个区域、浮动、缩放、双击复位等玩法全部保留；右侧栏交还官方。
- **变更**：布局持久化不再读写 `dock` / `pluginPanel` / `panels` / `panelSeq`；旧字段在下一次保存时自动从 `localStorage` 消失。
- **变更**：设置面板里的「插件面板 打开 / 关闭」开关移除（面板不再由本插件开关），相关提示文案同步更新。
- **变更**：删除会话标题栏的「🧩 插件面板」入口按钮 —— 官方右侧栏自己的标签条与「开始」引导页就是入口。
- 清理：随宿主一起删除的还有芯片行 / 打开顺序标签条 / 浮动窗 / 经典模式右侧停靠与拖拽手势、以及它们专用的约 20 条 CSS 规则与常量（`PANEL_BTN`、`CloseIcon`、`FloatIcon`、`FLOAT_WINDOW_STYLE`）。`lib/client.js` 由 160KB 降到 114KB。

### v1.15.1
- 修复：宿主热重载会替换整个框架节点，而布局引擎的观察者仍挂在旧节点上，导致尺寸丢失、覆盖层与插件面板不再渲染（表现为「更新任意插件后 ui-beautify 整体消失」）；现在引擎会识别节点更换并自动重新接管，另有每秒一次的轻量体检兜底。

### v1.15.0
- 新增：插件面板标签按打开顺序排列，重新打开排到末尾，关闭当前标签后焦点交给左邻，刷新后顺序保持。
- 新增：`dock` API 升到 v2 —— `apiVersion` / `has` / `active` / `focusPanel`，重复注册改为「刷新定义」且返回的 disposer 一定可用。
- 变更：标签条与滚动条之间留出固定间距，并改用宿主统一的 8px 主题滚动条。
- 修复：芯片行溢出时芯片被上下裁切。
- 新增：[`docs/plugin-panel-integration.md`](docs/plugin-panel-integration.md) 接入规范。

### v1.14.0
- 新增：标签条改为单行横向滚动，不再随插件数量换行；最左侧常驻 `▾`「全部已打开插件」菜单，标签标题限宽省略。

### v1.13.2
- 修复：`dock` 服务从未真正对外提供（原调用被宿主拒绝），改用正式契约 `ctx.provide`，下游插件的面板集成自此可用。

### v1.13.1
- 修复：任意插件热重载后，引擎写入已失效节点导致的面板消失与布局错乱；门户注入增加连接校验。

### v1.13.0
- 变更：适配 DSH 0.1.2-rc.1 —— 迁移失效的样式选择器、移除已失效的「消息时间悬停」扩展、清理幽灵依赖声明。
- 修复：宿主重挂载后拖动状态残留导致抓手条消失；标题栏拖动监听缺 `pointercancel` 兜底。

### v1.12.14
- 修复：会话区停靠左 / 右侧时最小宽度提升到 480px，头部按钮行与输入工具行不再重叠。

### v1.12.13
- 修复：中间栏吸附右侧时的缩放与溢出问题，停靠把手贴合卡片真实边缘。

### v1.12.9
- 修复：缩放上限溢出；被挤成浮动的卡片在区域空出后自动回位。

### v1.12.8
- 新增：会话区 480px 保底；侧栏拖窄到 240px 以下折叠成图标栏。

### v1.12.7
- 变更：两侧卡片缩放下限恢复 120px，停靠卡拖窄到 140px 以下关闭。

### v1.12.6
- 新增：会话区 320px 保底，防止被两侧卡片挤没（v1.12.8 提高到 480）。

### v1.12.4
- 修复：恢复默认布局后插件面板状态自愈。

### v1.12.3
- 修复：经典模式切换残留导致中间列卡死。

### v1.12.2
- 变更：浮动停靠卡最小宽度 360 → 280。

### v1.12.0
- 新增：经典三栏插件面板（作为右侧列渲染、可拖宽、可拖出浮动）与 8 向缩放手柄。

### v1.11.1
- 修复：插件面板因图标组件 props 解构错误而崩溃。

### v1.11.0
- 变更：清理重构，抽出共享过渡常量。

### v1.10.x
- 变更：面板细节打磨（关闭按钮尺寸、列表与关闭交互、对话框圆角）。

### v1.9.x
- 变更：界面归一化到 DSH 设计系统与 Apple HIG，设置窗口置顶、浮动卡点击置前。

### v1.8.x
- 新增：统一的插件面板（启动器 + 标签页宿主，卡片与经典两种模式共用）。

### v1.7.x
- 新增：五区域通用吸附，任意卡片都能停靠到上 / 下 / 左 / 中 / 右。

### v1.6.0
- 修复：停靠位置白名单、右停靠错位、框架重挂载自愈。

### v1.5.x
- 变更：接缝线体系与观感修正。

### v1.4.x
- 新增：卡片布局引擎上线（三卡停靠 / 浮动 / 标签面板宿主）。

### v1.3.x
- 新增：设置记忆完善（背景图持久化、配额超限自动降质、全局强调色）。

### v1.2.0
- 新增：支持官方 bundle 安装方式。

### v1.1.x
- 修复：背景图持久化（自动压缩上传、切换预设不再覆盖、重启不丢失）。

### v1.0.0
- 初版：配色预设 + 整页背景图 + 全部可撤销。

## License

MIT
