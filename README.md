# dsh-ui-beautify

给 DSH 的 Web 界面换一套更顺眼的外观：配色预设、整页背景图。设置由 DSH 宿主持久化（桌面版重启也不丢），随时可以一键还原。

## 能做什么

- **配色预设**：内置四套（默认 / 深海蓝 / 暖沙 / 松石绿），浅色与深色各有适配。切换时不只是换背景和气泡，DSH 界面里的蓝色强调元素（文件夹图标、加载动画、标签高亮、链接等）也会一起换成预设色。
- **整页背景图**：上传一张本地图片，插件自动压缩到最长边 2560px 以内，并给上层文字加可读遮罩；侧边栏与主区都会显示。
- **随时还原**：配色与背景图写进 DSH 宿主（`<DSH_HOME>/storages/dsh-ui-beautify/state.json`），浏览器 `localStorage` 只是首屏缓存，刷新或重启 DSH 都会自动恢复；「重置全部」回到出厂状态，卸载插件后注入的样式会被移除。

## 使用说明

所有开关都在 **设置 → UI设置**：

| 区域 | 控件 | 作用 |
| --- | --- | --- |
| 外观美化 | 配色预设 | 一键切换整套配色；点「默认」还原 DSH 原生蓝 |
| 外观美化 | 选择图片 / 清除 | 上传本地图片作为全页背景，或移除背景图 |
| 外观美化 | 重置全部 | 恢复默认外观并清除已保存的设置 |

> 3.0.0 起移除了卡片布局引擎，所以「UI设置」里只剩外观美化，布局模式、恢复默认布局这类控件随之消失。

## 安装

要求：DSH `>=0.2.0-rc.1 <0.3.0-0`（`engines.dsh`；上界 `-0` 显式排除 0.3.0 预发布 已声明，同时保留 `@deepseek-ai/dsh-typert-protocol` 的 `peerDependencies`，因为 `0.2.0-rc.2` 的兼容检查只认 peer）与 [pnpm](https://pnpm.io/zh/)。

已核对宿主（静态契约核对，安装后仍需在目标宿主冒烟）：**`0.2.0-rc.2`**（web 宿主 / npm 全局 CLI）与 **`0.2.1-rc.1`**（桌面应用内建运行时，含 Host 持久化）。两个版本都不需要构建、不需要 `npm install`。

```bash
# 发布态：钉死提交，最稳定
dsh plugin --profile web add github:Zalpha263/dsh-ui-beautify#<40位commit>

# 开发态：裸目录路径 = link:（源码即部署，改完不用重装）
dsh plugin --profile web add D:/path/to/dsh-ui-beautify

# 升级与卸载
dsh plugin --profile web install
dsh plugin --profile web remove dsh-ui-beautify
```

装完**重启 DSH**，打开「设置 → UI设置」即可。改完源码只需刷新页面（无构建步骤；Host 半区是普通 ESM，重启 DSH 生效）。

**桌面版（DeepSeek Harness 桌面应用）**：`desktop` profile 由桌面应用独占，`dsh plugin --profile desktop ...` 会被 CLI 直接拒绝（`profile "desktop" is managed exclusively by the Electron application`）。请在桌面应用侧边栏的**插件**页里用**绝对路径**添加本插件目录（或 GitHub 仓库地址），装完重启应用生效。桌面应用自带 Node / pnpm 运行时并走应用内更新（不依赖 npm 全局安装），它的 DSH 版本可能与全局 CLI 不同（实测桌面 `0.2.1-rc.1`、web 宿主 `0.2.0-rc.2`），本插件对两者都通过兼容检查。

## 常见问题

| 问题 | 原因与解决 |
| --- | --- |
| 「设置」里没有「UI设置」 | 安装后没有重启 DSH；重启后再看 |
| 卡片布局 / 布局模式去哪了？ | 3.0.0 起整体移除：拖卡片要改写官方 AppFrame 的列宽，而那正是官方右侧栏申领的资源，两边互相覆盖就是过去「面板与侧边栏冲突」的根因 |
| `sidebarPanel` 服务去哪了？ | 4.0.0 起整体移除。插件面板本来就注册在**官方**右侧栏上（`sidebarRightTabs` + `sidebar.right.pane.tab`），中间那层适配只会造成「关掉本插件，别的插件就没右侧栏入口」。第三方插件请直接对接官方服务，见 `@deepseek-ai/dsh-client-ui-sidebar-right` 的 README「扩展席位」 |
| 换浏览器 / 清缓存后设置不见了 | 不会：设置由宿主持久化，换浏览器或清缓存后从宿主重新读回。只有在宿主侧也没有存过（旧宿主 / 旧 host 半区）时才退回浏览器 `localStorage`，那种情况下换浏览器确实会丢 |
| 桌面版重启后设置丢了 | 4.2.0 已修（宿主以 `--port 0` 启动、origin 每次都变，纯 localStorage 存不住）。确认用的是 4.2.0 且 DSH 版本 ≥ `0.2.0-rc.1`；旧版本只能靠浏览器 `localStorage` |
| 面板上出现「保存到 DSH 宿主失败…」 | 宿主侧写盘出错（权限/磁盘），设置仍写进了浏览器缓存；按提示检查 `DSH_HOME` 目录 |
| 卸载后还有样式残留 | 先硬刷新（Ctrl+F5） |

## 兼容性

面向 DSH `0.2.0` 系列的 Web 界面编写，**4.0.0 起不再触碰右侧栏**（面板注册服务已移除，本插件只做配色与背景图）。

全部外观效果都通过官方主题服务 `ctx.theme.overrideTokens()` 写入，而且**只占一层**（source `beautify`）：用户气泡走 `--dsw-specific-bubble`；发送按钮走 `--dsw-alias-button-info-fill` **与 `--dsw-alias-button-info-hover`**（会话主按钮是 `fill` + `:hover:not(:disabled){hover}`；只写 fill 时亮色模式下悬停会跳回上游浅蓝，暖沙/松石绿预设会直接「悬停变蓝」）；侧边栏底色走 `--dsw-specific-sidebar-fill`；列表底部淡出层用 `span[class*="_fade"]` 子串选择器清掉。

**不要写整串 CSS 模块哈希类名**。v4.1.0 的更新日志曾写「`.uV2eYG_primary` / `.bhn1Oq_fade` 在 0.2.0-rc.2 里都不存在」——**这是错的**：两者在 rc.2 都存在（`.uV2eYG_primary` 是会话主按钮、`.bhn1Oq_fade` 是侧栏淡出层），是 `0.2.1-rc.1` 把它们改了名（`.RlGAzG_primary` / `_9lTDKa_fade`）。会变的只是哈希前缀，所以淡出层规则只匹配 `_fade` 后缀，发送按钮则完全靠 token。这条是硬约束：**升级 DSH 后若某处外观不再跟随预设，先查是不是又去写了哈希类名**。

风险登记（v4.2.0）：预设共写入 16 个 token —— `TOKEN_CATALOGUE` 里的 **15 个**（7 个在官方 14 token 目录内 + 8 个内部变量）加每个预设自己的 `--dsw-specific-bubble`。8 个内部变量是：`--dsw-alias-state-business-primary/-tertiary`、`--dsw-alias-brand-primary-new-colorprimary-new-color`、`--dsw-alias-label-primary-bluish`、`--dsw-alias-button-info-fill`、`--dsw-alias-button-info-hover`、`--dsw-static-deepseek-500/-450`。`overrideTokens()` 不校验名字所以今天有效，但它们不在公开面上，**每次 DSH 升级都要复核**（清单与判据见 `lib/client.js` 的 `TOKEN_CATALOGUE` 注释）。

相比 v4.1.0 的 17 项登记：删掉 **2** 个在 0.2.1 主界面没有消费者的 token（`--dsw-static-deepseek-200` 只喂一个没人用的气泡高亮；`--dsw-specific-sidebar-nav-item-active-accent` 只被 user-questions 的选项徽标消费，对侧栏无效），新增 **1** 个 hover token。

> 注意：`--dsw-alias-label-primary` 被改成预设深色会影响 40+ 包的文字色，**包括设置面板本身** —— v4.1.0 删掉 `SETTINGS_RESTORE_CSS` 之后，面板不再保持官方原色，面板文案也已照实改写。

持久化：Host 半区把状态写到 `<DSH_HOME>/storages/dsh-ui-beautify/state.json`（`DSH_HOME` 取环境变量，未设置时 `~/.dsh`；原子写、上限 8 MiB）。浏览器启动时先读 `localStorage` 拿首屏（`:preset` 与 `:bg` 两个 key，切预设不重写图片），再用宿主值覆盖 —— **宿主是权威**，因为桌面版 origin 会变；每次保存 300 ms 防抖写宿主。宿主没有 `loadClientState`/`saveClientState`（旧 host 半区）时静默回落到 localStorage。

背景图以 data URL 存在状态里（宿主 8 MiB 上限，浏览器缓存约 5 MB 配额）：最长边压到 2560px，**PNG 优先**（保留透明，带透明区的截图不会变黑底），PNG 仍超限才转 JPEG；原图本来就小且不需要缩放时直接用原图，不重编码。

## 开发者

两个半区都是手写源码、没有构建步骤：

| 文件 | 职责 |
| --- | --- |
| `lib/index.js` | Host 半区：`TypertRemoteService`（服务名/命名空间 `uiBeautify`）+ `loadClientState` / `saveClientState` |
| `lib/state-store.js` | Host 侧状态文件：`<DSH_HOME>/storages/dsh-ui-beautify/state.json`，原子写、损坏返回 null、8 MiB 上限。不依赖 cordis，可被 node:test 直接 import |
| `lib/client.js` | 浏览器半区：手写 `__ModuleLoader__.load` bundle（不是构建产物），调色板在 `PRESETS`、token 名单在 `TOKEN_CATALOGUE` |
| `test/state.test.mjs` | `node:test`，覆盖预设数据形状、hover 关系、fade 选择器、单层合并、宿主持久化与 state-store |

`lib/client.js` 里所有外观状态都走两个函数：`applyPreset(id)` 与 `applyBackground(dataUrl)`，它们各自 `applyAppearance()` 一次 —— `appearanceTokens()` 把预设层与背景遮罩层合成**一张表**，交给一次 `theme.overrideTokens("beautify", tokens)`；`persist === false` 的调用只改内存与屏幕（启动恢复、宿主回灌用）。

测试（不要用 `npm test`，某些沙箱里子进程管道会 EPERM）：

```bash
node test/state.test.mjs
node --check lib/index.js
node --check lib/state-store.js
node --check lib/client.js
```

## 更新日志

### v4.2.0
- **Host 持久化（修桌面版重启丢设置）**：桌面宿主以 `--port 0` 启动、监听端口每次重启由 OS 分配，GUI origin 随之改变，而 `localStorage` 按 origin 隔离 —— v4.1.0「刷新或重启都会自动恢复」的承诺在桌面版上不成立。新增 Host 半区：`TypertRemoteService`（`uiBeautify`）+ `loadClientState` / `saveClientState` + `lib/state-store.js`（`<DSH_HOME>/storages/dsh-ui-beautify/state.json`，原子写、损坏返回 null、8 MiB 上限）。浏览器启动先读 `localStorage` 拿首屏，再用宿主值覆盖（**宿主权威**），每次保存 300 ms 防抖写宿主；宿主没有这两个方法时静默回退到 localStorage。宿主首次为空时把缓存灌进去，升级不丢设置。
- **淡出层修复**：`FADE_KILL_CSS` 改为 `span[class*="_fade"]` 子串匹配。v4.1.0 的结构式选择器少算一层（命中的 `div.treeBody` 自己没有 background，整条规则是 no-op），被删掉的哈希规则又只在 `0.2.0-rc.2` 有效 —— 结果是两个运行时都不再清除淡出层。会变的是哈希前缀，`_fade` 后缀跨构建稳定，所以只匹配后缀。
- **发送按钮悬停**：每套预设补 `--dsw-alias-button-info-hover`（浅色主题比 fill 浅一档、深色主题深一档，照抄官方 light fill=deepseek-500/hover=400、dark fill=400/hover=500 的关系），不再出现暖沙/松石绿悬停变蓝。
- **文档纠错**：v4.1.0 更新日志与文件头「两个哈希类在 `0.2.0-rc.2` 里都不存在」是错的（rc.2 存在、`0.2.1-rc.1` 改名）；面板文案不再宣称「设置窗口保持官方外观」（`SETTINGS_RESTORE_CSS` 已在 4.1.0 删除，预设 token 会渗进设置面板）。
- **去重 token**：三份一模一样的 16 键 token 表合成一份 `TOKEN_CATALOGUE`（15 token）+ 每预设覆盖值；删掉 2 个在 0.2.1 主界面没有消费者的 token。
- **结构**：预设层 + 背景层合并成一次 `overrideTokens`（同一 source，壁纸遮罩不再依赖调用顺序）；`localStorage` 拆成 `:preset` / `:bg` 两个 key，切预设不再重写整张背景图；图片编码改为 PNG 优先/保留透明、超限才 JPEG、小图不重编码；缓存或宿主保存失败在面板上可见；新增 `test/state.test.mjs`（21 条）。

### v4.1.0
- 删除两个哈希类覆盖（`.uV2eYG_primary`、`.bhn1Oq_fade`）：整串哈希类名无法跨构建依赖。**更正**：两者在 `0.2.0-rc.2` 里都存在，是 `0.2.1-rc.1` 把它们改了名（`.RlGAzG_primary` / `_9lTDKa_fade`）；本条目原文写「在 rc.2 里都不存在」，是错误记录（v4.2.0 更正，并让淡出层改用 `_fade` 子串匹配）。
- 发送按钮改由官方 token `--dsw-alias-button-info-fill` 驱动（各预设已写入），不再写类名。
- 删除 `SETTINGS_RESTORE_CSS`：其目标 `[data-slot="sidebar.settings"]` 不是设置面板（面板被 portal 到 body），规则打不到。
- 删除 `ctx.get("theme")` / `ctx.get("slots")` 死守卫（`inject` 已保证就绪）；面板文案去掉写死的 v1.9.0。
- 新增 locale 元数据；`files` 去掉已不存在的 `docs`。
- 文件头新增「未公开 token 清单 + 每次升级复核」风险登记。

### v4.0.0
- **破坏性变更：移除 `sidebarPanel` 服务与整套面板宿主机制** —— `registerPanel` / `has` / `openPanel` / `focusPanel` / `closePanel` / `isOpen`，面板正文的 CSS 契约（`.dsh-sidebar-panel-host` 与 `@container dshpanel`），标签类型绑定与重绑（`bindPanelToHost` / `syncPanels` / `panelSeatAlive` / `internal/service` 监听 + 1s 轮询），以及 `ctx.provide('sidebarPanel')`。
- 原因：这一层适配把「插件面板」和「ui-beautify 是否安装」绑在了一起 —— 关掉本插件，其他插件的面板就没有右侧栏入口。官方服务由 `@deepseek-ai/dsh-web-app` 的 `ui-sidebar-right` 行**始终提供**，中间层没有存在价值；消费方请改为直接调 `ctx.sidebarRightTabs.register({...})` + `ctx.slots.register({ name: 'sidebar.right.pane.tab', key: id }, Body)`。
- 本插件现在**只保留配色预设与整页背景图**：不再触碰右侧栏、不再提供任何跨插件服务。
- 删除文档：`docs/plugin-panel-integration.md`（`sidebarPanel` 契约）。

### v3.0.4
- **适配桌面版（文档级，无代码改动）**：本插件**不声明 `peerDependencies`**（v4.2.0 起已声明 `engines.dsh` 与 `peerDependencies`），而桌面版的兼容检查（`evaluatePluginCompatibility`）在没有该字段时直接返回 undefined → 两个宿主（web `0.1.7-rc.2`、桌面 `0.2.0-rc.1`）都通过，不存在「静默跳过」问题。
- 走廊核对（`0.1.7-rc.1 → 0.1.7-rc.2 → 0.2.0-rc.1`）：`theme` 服务的成员集未变（仅注入的 CSS 文本有增补，含 `html[data-platform=darwin]` 的桌面菜单色）；`slots.inject` / `slots.register` 未变；`sidebarRight` / `sidebarRightTabs` 的提供方 `dsh-client-ui-sidebar-right` 的 `lib/index.js` 逐字节相同、无公开成员被移除；本插件自提供的 `sidebarPanel` 插件间契约不受宿主影响。
- 哈希类名覆盖改为**实测取证**（先前草案里写的「本走廊内未失效」是错误措辞：走廊比对集只含 20 个包，而这两个类名所属的 `dsh-client-ui-conversation` / `dsh-client-ui-workspace` **不在其中**，无法从比对结果推断）：在 `0.2.0-rc.1` 宿主上抓取 boot manifest 广告的全部 83 个客户端产物，`.uV2eYG_primary` 仍出现在 `dsh-client-ui-conversation` 的产物（rev `cf69ca49decf`）、`.bhn1Oq_fade` 仍出现在 `dsh-client-ui-workspace` 的产物（rev `1a8f018dea37`）。
- 桌面版安装方式：`desktop` profile 由桌面应用独占，`dsh plugin --profile desktop ...` 会被 CLI 拒绝；请在桌面应用的**插件**页用**绝对路径**添加本插件目录。

### v3.0.3
- 迁移：对齐 DSH `0.1.7-rc.1`（自 `0.1.7-alpha.2`）。纯客户端插件，逐项复核 rc.1 产物：`slots.inject` / `slots.register`、`theme` 服务未变；`sidebarRight` / `sidebarRightTabs`（**是服务不是 slot**，由官方 `dsh-client-ui-sidebar-right` 提供）未变；本插件自己 `ctx.provide('sidebarPanel')` 的插件间契约不受宿主影响。
- 复核哈希类名覆盖：`.uV2eYG_primary`（官方 `dsh-client-ui-conversation`）与 `.bhn1Oq_fade`（官方 `dsh-client-ui-workspace`）在 **rc.1 产物中仍然存在**，发送按钮与侧栏淡出层两处覆盖继续有效；`--dsw-specific-bubble` 同样仍在。
- 未采用：rc.1 新增的 12 个 `--dsw-alias-file-diff-*` CSS 变量（纯加法，与本插件无关）。
- 验证：隔离 `DSH_HOME` 冷启动 rc.1 → 模块已注册、客户端产物 HTTP 200 且含 `__ModuleLoader__.load`。

### v3.0.2
- 修复：DSH 0.1.7 新增的「插件」管理页整页没有底色，铺了背景图时卡片与文字直接压在原图上、无法辨读。宿主的中列（`.pI_x6G_centerCol`）不画底，每个 `main` 槽页面需自绘，而该页（`PluginManagerPage` 的 `.X_2TxG_page`）没有任何 `background`。现按对话页同一个 token 给它补面（`[data-plugin-panel]{background:var(--dsw-alias-bg-base)}`），随背景图一起注入与卸载。

### v3.0.1
- 修复：目标面板里的用户气泡不跟随配色预设（改用宿主 token `--dsw-specific-bubble`，chat 与 goal 共用），并去掉一处会在宿主重建后失效的哈希类名依赖。
- 修复：`SHEET` 样式在卸载 / 热重载后残留；背景图超出 `localStorage` 配额时的回退路径不再自相矛盾（过去会把旧背景写回存储、屏幕与存储长期不一致）。

### v3.0.0
- 破坏性变更：卡片布局引擎整体移除（侧栏 / 对话区 / 停靠卡的拖动、吸附、浮动、缩放与布局模式开关全部删除），`lib/client.js` 从 117KB 降到 32KB；设置里只剩外观美化。

### v2.x 及更早
- **v2.0.2**：修复卡片模式拖不动 / 界面卡死（`beginDrag` / `endDrag` 被误删导致 `ReferenceError`，且发生在 `preventDefault` 之前）。
- **v2.0.1**：插件面板挂到官方右侧栏后的布局错乱（宿主统一给出 `.dsh-sidebar-panel-host` 布局契约）；按面板自身宽度做响应式。
- **v2.0.0**：`dock`（v2）与自研面板宿主整体移除，改为注册成官方右侧栏标签页（新服务 `sidebarPanel`，`apiVersion = 1`）；修复与官方侧边栏的列宽冲突。
- **v1.15.1**：修复宿主热重载后布局引擎失效（表现为「更新任意插件后 ui-beautify 整体消失」）。
- **v1.14–v1.15**：插件面板标签按打开顺序排列、横向滚动标签条；`dock` API 升 v2。
- **v1.13.x**：改用正式契约 `ctx.provide` 对外提供面板服务；修复热重载后的面板消失与拖拽状态残留。
- **v1.12.x**：卡片布局引擎的几何打磨（列宽保底、缩放下限、溢出与回位）。
- **v1.8–v1.11**：统一的插件面板（启动器 + 标签页宿主）、五区域吸附、界面归一化到 DSH 设计系统与 Apple HIG。
- **v1.4–v1.7**：卡片布局引擎上线、接缝线体系、停靠位置白名单与框架重挂载自愈。
- **v1.0–v1.3**：配色预设 + 整页背景图（自动压缩、持久化）+ 官方 bundle 安装支持。

## License

MIT
