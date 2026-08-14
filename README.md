# dsh-ui-beautify

DeepSeek Harness（DSH）Web UI 外观美化插件（Client 端持久插件）。

名字即功能：**dsh**（DeepSeek Harness）+ **ui**（界面）+ **beautify**（美化）。

- 兼容性：DSH `0.1.0-rc.6`（部分选择器针对该版本的客户端产物，升级后需复核，见「已知说明」）
- 许可：MIT

## 功能

- **配色预设**：默认 / 深海蓝 / 暖沙 / 松石绿 —— 一键切换整套配色，覆盖主区域、侧边栏、文字颜色（浅色/深色模式各一套值）。
- **消息气泡 & 发送按钮**：跟随预设配色。
- **整页背景图**：选择本地图片作为整个 Web UI 的背景（侧边栏与主区都显示），自带半透明可读遮罩。
- **全部可撤销**：「清除」「重置全部」即时还原；插件卸载后不留任何残留样式。

## 安装

> 重要：DSH 用**两个不同的解析锚点**加载插件包——**宿主行导入**从 **profile 目录**解析，**client 半区扫描**（`dsh-client-modules`）从 **dsh 安装目录**解析。所以本包需要**两份副本**（必须保持同步），缺一份都会导致加载失败（见「排错」）。

### 1. 找到两个目标目录

```bash
# dsh 安装目录：全局 node_modules 下的 @deepseek-ai/dsh
npm root -g
# 例如输出 C:\Users\<你>\AppData\Roaming\npm\node_modules
# 则 dsh 安装目录 = <npmRoot>/@deepseek-ai/dsh

# profile 目录：$DSH_HOME/profiles/web
# Windows 默认 $DSH_HOME = C:\Users\<你>\.dsh
```

### 2. 复制两份副本

```powershell
# Windows（把 <…> 换成实际路径）
Copy-Item -Recurse -Force .\dsh-ui-beautify "<npmRoot>\@deepseek-ai\dsh\node_modules\dsh-ui-beautify"
Copy-Item -Recurse -Force .\dsh-ui-beautify "$env:USERPROFILE\.dsh\profiles\web\node_modules\dsh-ui-beautify"
```

```bash
# Linux/macOS
cp -r ./dsh-ui-beautify "<npmRoot>/@deepseek-ai/dsh/node_modules/dsh-ui-beautify"
cp -r ./dsh-ui-beautify "$HOME/.dsh/profiles/web/node_modules/dsh-ui-beautify"
```

### 3. 在 profile 补丁里注册插件

编辑 `$DSH_HOME/profiles/web/cordis.patch.yml`（Windows 下为
`C:\Users\<你>\.dsh\profiles\web\cordis.patch.yml`），**追加**：

```yaml
- insert:
    - id: ui-beautify
      name: dsh-ui-beautify
```

### 4. 重启 DSH

用你平时的方式重启（如 `dsh web`），然后打开「设置 → 外观美化」即可使用。

## 使用

- **配色预设**：点「深海蓝 / 暖沙 / 松石绿」立即生效；点「默认」还原。
- **背景图片**：点「选择图片」选本地图片 → 整个界面透出背景图；「清除」还原。
- **重置全部**：一键回到默认外观。

## 排错

| 现象 | 原因 | 解决 |
|------|------|------|
| 启动报错 `Cannot find package 'dsh-ui-beautify' imported from <profile目录>` | 缺 **profile 目录**副本（宿主行导入锚点） | 补上 `<profile目录>/node_modules/dsh-ui-beautify` |
| 能启动，但「设置」里没有「外观美化」 | 缺 **dsh 安装目录**副本（client 扫描锚点，静默跳过不报错），或 `cordis.patch.yml` 里的注册行被移除 | ①补上 `<dsh安装>/node_modules/dsh-ui-beautify`；②确认 `cordis.patch.yml` 里有 `ui-beautify` 行；③重启 |
| 改代码后不生效 | 两份副本没同步 / 没重启 | 把 `lib/` 同步到两份副本后重启 |

## 已知说明

- **选择状态会记忆（v1.1+）**：配色预设与背景图保存在浏览器 `localStorage` 中，重启 DSH 后自动恢复。
  - 背景图以 data URL 存储，受浏览器存储配额限制（一般约 5MB）；图片过大时自动降级为「只记住配色、不记图片」。
  - 「重置全部」会清除已保存的设置。
- 背景图使用浏览器 objectURL，仅当前页面会话有效；换图/清除会释放旧图。
- 工作区会话列表底部的淡出层（`.qDHVXG_fade`）、消息气泡（`.gdEzaW_bubble`）、发送按钮（`.uV2eYG_primary`）的选择器针对 DSH `0.1.0-rc.6` 的客户端产物；**DSH 大版本升级后需复核**（代码中已注释）。
- 修改代码后需把 `lib/` 同步到两份副本；`dsh` 升级（重新 npm install）会清空其 node_modules，需重新复制 dsh 安装目录那份。

## 卸载

1. 从 `cordis.patch.yml` 删除 `ui-beautify` 那两行。
2. 删除两份 `dsh-ui-beautify` 目录副本。
3. 重启 DSH。

## 开发 / 修改

直接编辑 `lib/client.js`（调色板在 `PRESETS` 常量里），保存后重启 DSH 生效；
无需构建（本包是手写 loader 格式，非 tsdown 产物）。改完记得同步两份副本。

