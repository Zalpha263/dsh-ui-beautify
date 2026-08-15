# dsh-ui-beautify

> 给 DeepSeek Harness（DSH）Web UI 换一套好看的外观：一键切换配色预设、设置整页背景图，全部可撤销、可记忆。

## ✨ 功能特性

- **配色预设**：默认 / 深海蓝 / 暖沙 / 松石绿 四套配色一键切换，覆盖主区域、侧边栏、文字颜色、消息气泡与发送按钮（浅色/深色模式各一套值）。
- **全局强调色跟随**：工作区文件夹图标、会话加载螺旋、「对话 / 轨迹」标签高亮、Deep Diving 状态流光、超链接、轨迹时间线等所有蓝色系元素，都会随预设变成对应强调色。
- **整页背景图**：选择本地图片作为整个 Web UI 的背景（侧边栏与主区都显示），自带半透明可读遮罩；上传时自动压缩。
- **互不干扰**：设好背景图后切换配色预设**不会**覆盖图片；图片只由「清除」移除。
- **全部可撤销**：「清除」「重置全部」即时还原；卸载插件后不留任何残留样式。
- **设置自动记忆**：配色与背景图保存在浏览器本地，重启 DSH 后自动恢复。

## 安装

### 前置要求

- DSH `0.1.0-rc.6`（本插件针对该版本的 Web 客户端编写，见「兼容性」）
- 官方安装方式需要 [pnpm](https://pnpm.io/zh/)（`npm install -g pnpm`）

### 官方方式（推荐）

```bash
dsh plugin --profile web add github:Zalpha263/dsh-ui-beautify
```

- 发布到 npm 后可直接：`dsh plugin --profile web add dsh-ui-beautify`
- 装完**重启 DSH**，然后打开「设置 → 外观美化」即可使用
- 升级 / 卸载：`dsh plugin --profile web update/remove dsh-ui-beautify`

<details>
<summary>旧版手动安装（仅 v1.2 之前使用，已不推荐）</summary>

DSH 旧版本没有 `dsh plugin` 流程，需要把本包复制到两处并手工注册：

1. 复制包到 profile 目录：`$DSH_HOME/profiles/<profile>/node_modules/dsh-ui-beautify`
2. 复制包到 dsh 安装目录：`<npmRoot>/@deepseek-ai/dsh/node_modules/dsh-ui-beautify`
3. 在 `$DSH_HOME/profiles/<profile>/cordis.patch.yml` 追加注册行：

```yaml
- insert:
    - id: ui-beautify
      name: dsh-ui-beautify
```

4. 重启 DSH。
</details>

## 使用说明

打开「设置 → 外观美化」：

| 控件 | 作用 |
|------|------|
| 配色预设（默认 / 深海蓝 / 暖沙 / 松石绿） | 一键切换整套配色；点「默认」还原 |
| 选择图片 / 已设置（点击更换） | 上传本地图片作为全页背景（自动压缩，带可读遮罩） |
| 清除 | 移除背景图（不影响配色预设） |
| 重置全部 | 恢复默认外观，并清除已保存的设置 |

> 提示：配色预设不仅改变背景与气泡，还会把 DSH 界面中的蓝色强调元素（如「对话 / 轨迹」高亮、超链接、文件夹图标、Deep Diving 状态）统一成预设的强调色；点「默认」即可恢复 DSH 原生蓝色。

设置保存在浏览器 `localStorage` 中：刷新页面、重启 DSH 都会自动恢复；清除浏览器站点数据会重置。

## 卸载

```bash
dsh plugin --profile web remove dsh-ui-beautify
```

重启 DSH 后插件不再加载，页面样式全部还原，无残留。

## 常见问题（FAQ）

| 问题 | 原因与解决 |
|------|-----------|
| 装完「设置」里没有「外观美化」 | 安装后未重启 DSH（插件在启动时加载）；重启后再看 |
| 重启后背景图消失了 | 旧版本（< v1.1.2）的大图会超出浏览器存储配额被丢弃；**升级到 v1.1.2+ 后重新上传一次图片**（上传时自动压缩，不会再丢） |
| 切换配色预设把背景图盖住了 | v1.1.1 已修复；确认安装 v1.1.1+，重新设置一次背景图即可 |
| 换了浏览器 / 清了缓存，设置不见了 | 设置存在浏览器 `localStorage`，换浏览器或清除站点数据会丢失（预期行为） |
| 卸载后还有样式残留 | 插件样式随插件注入并在卸载时移除；仍有残留请硬刷新（Ctrl+F5） |

## 兼容性

- 目标版本：DSH `0.1.0-rc.6`，Web 界面（Windows / Linux / macOS）
- 部分样式选择器（消息气泡、发送按钮、侧边栏淡出层等）针对该版本的客户端产物编写，**DSH 大版本升级后可能失效**，升级后请在「外观美化」里复核效果
- 背景图以压缩后的 data URL 存在浏览器 `localStorage`（约 5MB 配额内）；超大图片上传时会自动压缩到最长边 ≤2560px

## 开发者

- 单文件实现：`lib/client.js`（Host 半区 `lib/index.js` 为空壳，仅用于注册）
- 调色板在 `lib/client.js` 的 `PRESETS` 常量中，改完**刷新页面即可生效**，无需构建
- 本包是手写 loader 格式（`__ModuleLoader__.load`），不是 tsdown 产物
- 修改提交后，已安装用户通过 `dsh plugin --profile web update dsh-ui-beautify` 升级

## 版本历史

- **v1.3.2**：修复「重启 DSH / 重载插件后背景图片丢失」——插件卸载清理时不再写入 localStorage（`clearBackgroundImage` 增加持久化开关，仅用户主动「清除 / 重置」才写存储）；恢复顺序改为先恢复背景图再应用预设，避免覆盖。
- **v1.3.1**：修复「会话列表加载螺旋仍为蓝色」——会话行左侧的进行中状态动画（StateDot）直接引用静态 token `--dsw-static-deepseek-450`，现一并纳入预设覆盖。
- **v1.3.0**：全局强调色跟随预设——工作区文件夹图标、「对话 / 轨迹」标签高亮、Deep Diving 状态流光、超链接、轨迹时间线等蓝色元素统一变为预设强调色（浅色/深色模式均生效）。
- **v1.2.0**：支持 dsh 官方 bundle 安装（`dsh.bundle.patch` + 自带 `cordis.patch.yml`），`dsh plugin --profile web add github:Zalpha263/dsh-ui-beautify` 一键安装，不再需要手动两份副本。
- **v1.1.2**：修复「重启后背景图片消失」——大图 base64 超出 localStorage 配额被静默丢弃；上传时自动压缩（最长边 ≤2560px，JPEG 0.85），保存失败时输出控制台警告。
- **v1.1.1**：修复「设置背景图片后切换配色预设会覆盖图片」——预设应用后重新注册背景遮罩 token，图片仅由「清除」移除。
- **v1.1.0**：设置自动记忆，重启后自动恢复。
- **v1.0.0**：初始版本——配色预设（默认 / 深海蓝 / 暖沙 / 松石绿）+ 整页背景图 + 全部可撤销。

## License

MIT
