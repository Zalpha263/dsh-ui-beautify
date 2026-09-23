window.__ModuleLoader__.load({
	id: "dsh-ui-beautify",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		const React = require("react");
		const ReactDom = require("react-dom");

		/** Package-owned <style> host — mirrors the dynamic `styles.insert` contract (insert returns a disposer). */
		let styleEl = null;
		function insertCss(css) {
			if (styleEl === null || !document.contains(styleEl)) {
				styleEl = document.createElement("style");
				styleEl.setAttribute("data-plugin-css", "dsh-ui-beautify");
				document.head.appendChild(styleEl);
			}
			const node = document.createTextNode(css);
			styleEl.appendChild(node);
			return function dispose() {
				if (node.parentNode === styleEl) styleEl.removeChild(node);
			};
		}

		const PRESETS = {
			ocean: {
				tokens: {
					"--dsw-alias-bg-base": { light: "#f4f7fc", dark: "#0f172a" },
					"--dsw-alias-bg-layer-1": { light: "#ffffff", dark: "#1e293b" },
					"--dsw-alias-border-l1": { light: "#dce3f0", dark: "#334155" },
					"--dsw-alias-brand-primary": { light: "#2563eb", dark: "#3b82f6" },
					"--dsw-alias-label-primary": { light: "#1e3a8a", dark: "#bfdbfe" },
					"--dsw-alias-state-success-primary": { light: "#059669", dark: "#34d399" },
					"--dsw-specific-sidebar-fill": { light: "#dbe7f7", dark: "#15233f" },
					"--dsw-alias-state-business-primary": { light: "#2563eb", dark: "#3b82f6" },
					"--dsw-alias-state-business-tertiary": { light: "#dbe9fb", dark: "#1e3350" },
					"--dsw-alias-brand-primary-new-colorprimary-new-color": { light: "#2563eb", dark: "#3b82f6" },
					"--dsw-alias-label-primary-bluish": { light: "#1e3a8a", dark: "#bfdbfe" },
					"--dsw-alias-button-info-fill": { light: "#2563eb", dark: "#1d4ed8" },
					"--dsw-specific-sidebar-nav-item-active-accent": { light: "#dbe9fb", dark: "#1e3350" },
					"--dsw-static-deepseek-500": { light: "#2563eb", dark: "#3b82f6" },
					"--dsw-static-deepseek-450": { light: "#2563eb", dark: "#3b82f6" },
					"--dsw-static-deepseek-200": { light: "#dbe9fb", dark: "#1e3350" }
				},
				bubble: { light: "#dbe9fb", dark: "#1e3350" },
				button: { light: "#2563eb", dark: "#1d4ed8" }
			},
			sand: {
				tokens: {
					"--dsw-alias-bg-base": { light: "#fbf7f0", dark: "#1c1917" },
					"--dsw-alias-bg-layer-1": { light: "#ffffff", dark: "#292524" },
					"--dsw-alias-border-l1": { light: "#e7ddd0", dark: "#44403c" },
					"--dsw-alias-brand-primary": { light: "#b45309", dark: "#f59e0b" },
					"--dsw-alias-label-primary": { light: "#5b4636", dark: "#f0e6d3" },
					"--dsw-alias-state-success-primary": { light: "#15803d", dark: "#4ade80" },
					"--dsw-specific-sidebar-fill": { light: "#f2e6d5", dark: "#33291e" },
					"--dsw-alias-state-business-primary": { light: "#b45309", dark: "#f59e0b" },
					"--dsw-alias-state-business-tertiary": { light: "#f3e6d3", dark: "#3d3123" },
					"--dsw-alias-brand-primary-new-colorprimary-new-color": { light: "#b45309", dark: "#f59e0b" },
					"--dsw-alias-label-primary-bluish": { light: "#5b4636", dark: "#f0e6d3" },
					"--dsw-alias-button-info-fill": { light: "#b45309", dark: "#b45309" },
					"--dsw-specific-sidebar-nav-item-active-accent": { light: "#f3e6d3", dark: "#3d3123" },
					"--dsw-static-deepseek-500": { light: "#b45309", dark: "#f59e0b" },
					"--dsw-static-deepseek-450": { light: "#b45309", dark: "#f59e0b" },
					"--dsw-static-deepseek-200": { light: "#f3e6d3", dark: "#3d3123" }
				},
				bubble: { light: "#f3e6d3", dark: "#3d3123" },
				button: { light: "#b45309", dark: "#b45309" }
			},
			teal: {
				tokens: {
					"--dsw-alias-bg-base": { light: "#f0faf9", dark: "#042f2e" },
					"--dsw-alias-bg-layer-1": { light: "#ffffff", dark: "#134e4a" },
					"--dsw-alias-border-l1": { light: "#d2e8e5", dark: "#115e59" },
					"--dsw-alias-brand-primary": { light: "#0d9488", dark: "#2dd4bf" },
					"--dsw-alias-label-primary": { light: "#134e4a", dark: "#ccfbf1" },
					"--dsw-alias-state-success-primary": { light: "#059669", dark: "#34d399" },
					"--dsw-specific-sidebar-fill": { light: "#d4ece7", dark: "#0b3d38" },
					"--dsw-alias-state-business-primary": { light: "#0d9488", dark: "#2dd4bf" },
					"--dsw-alias-state-business-tertiary": { light: "#d9f0ec", dark: "#1d4a46" },
					"--dsw-alias-brand-primary-new-colorprimary-new-color": { light: "#0d9488", dark: "#2dd4bf" },
					"--dsw-alias-label-primary-bluish": { light: "#134e4a", dark: "#ccfbf1" },
					"--dsw-alias-button-info-fill": { light: "#0d9488", dark: "#0f766e" },
					"--dsw-specific-sidebar-nav-item-active-accent": { light: "#d9f0ec", dark: "#1d4a46" },
					"--dsw-static-deepseek-500": { light: "#0d9488", dark: "#2dd4bf" },
					"--dsw-static-deepseek-450": { light: "#0d9488", dark: "#2dd4bf" },
					"--dsw-static-deepseek-200": { light: "#d9f0ec", dark: "#1d4a46" }
				},
				bubble: { light: "#d9f0ec", dark: "#1d4a46" },
				button: { light: "#0d9488", dark: "#0f766e" }
			}
		};

		const BG_TOKENS = {
			"--dsw-alias-bg-base": { light: "rgba(247,249,252,0.85)", dark: "rgba(12,18,30,0.85)" },
			"--dsw-specific-sidebar-fill": { light: "rgba(238,243,250,0.80)", dark: "rgba(15,23,42,0.80)" }
		};

		/**
		 * Neutralizes the workspace session-list bottom fade (`.bhn1Oq_fade`,
		 * was `.qDHVXG_fade`), which would otherwise paint a visible white
		 * gradient over a custom sidebar/background. The hashed selector is
		 * still current in dsh-client-ui-workspace 0.1.5-rc.2; the structural
		 * `[data-slot="sidebar.workspaces"]` rule below is the stable fallback.
		 */
		const FADE_KILL_CSS = [
			".bhn1Oq_fade{background:none !important;}",
			"[data-slot=\"sidebar.workspaces\"] > * > :last-child > :last-child{background:none !important;}"
		].join("\n");

		/**
		 * Give the plugin panel the surface every other page paints for itself.
		 *
		 * The wallpaper goes on `[data-slot=root] > *` — the layout frame
		 * (dsh-client-ui-layout `.pI_x6G_frame`), which also carries
		 * `background:var(--dsw-alias-bg-base)`. So every layer between the frame
		 * and the text has to paint its own: the sidebar column does
		 * (`--dsw-specific-sidebar-fill`) and so does the conversation page
		 * (`.wSkVaW_root{background:var(--dsw-alias-bg-base)}`). The layout's
		 * center column (`.pI_x6G_centerCol`) paints nothing, so any `main`-slot
		 * page that skips its own background shows the raw wallpaper.
		 *
		 * 0.1.7 added exactly such a page: dsh-client-ui-plugin-manager mounts
		 * PluginManagerPage into `main`, and its `.X_2TxG_page` rule declares no
		 * `background` at all — with a wallpaper set, the panel's cards and text
		 * sit directly on the image. Paint the same token the conversation page
		 * uses; BG_TOKENS already carries the 0.85 alpha, so the two pages match.
		 *
		 * `[data-plugin-panel]` is the page's own stable hook
		 * (`PluginPanel` renders `"data-plugin-panel": true`), not a hashed
		 * CSS-module class. No `!important`: the host rule wins if upstream ever
		 * ships a surface for this page, and nothing competes with it today.
		 * Scoped to the wallpaper by living in setBackgroundFromDataUrl's bundle,
		 * so it is disposed with the image.
		 */
		const PANEL_SURFACE_CSS = "[data-plugin-panel]{background:var(--dsw-alias-bg-base);}";

		const LABELS = { default: "默认", ocean: "深海蓝", sand: "暖沙", teal: "松石绿" };
		const PRESET_IDS = ["default", "ocean", "sand", "teal"];
		const STORAGE_KEY = "dsh-ui-beautify:state";

		/**
		 * 设置面板（modal）作用域内的全部受预设影响的 token 固定为出厂默认值，
		 * 使「配色预设」只影响主界面，不改变设置窗口的字体/颜色/高亮等任何观感。
		 * 值来源：dsh-client-ui-theme/lib/styles/design-platform.css（浅色/深色）。
		 */
		const SETTINGS_RESTORE_CSS = [
			"[data-slot=\"sidebar.settings\"]{--dsw-alias-bg-base:var(--dsw-static-neutral-bluish-00);--dsw-alias-bg-layer-1:var(--dsw-static-neutral-bluish-00);--dsw-alias-border-l1:rgba(0,0,0,.04);--dsw-alias-label-primary:var(--dsw-static-neutral-bluish-1000);--dsw-specific-sidebar-fill:var(--dsw-static-neutral-bluish-50);--dsw-alias-brand-primary:var(--dsw-static-neutral-bluish-1000);--dsw-alias-brand-primary-new-colorprimary-new-color:rgb(65,118,230);--dsw-alias-button-info-fill:var(--dsw-static-deepseek-500);--dsw-alias-label-primary-bluish:var(--dsw-static-blue-900);--dsw-alias-state-business-primary:var(--dsw-static-deepseek-500);--dsw-alias-state-business-tertiary:var(--dsw-static-deepseek-100);--dsw-specific-sidebar-nav-item-active-accent:var(--dsw-static-deepseek-100);--dsw-alias-state-success-primary:var(--dsw-static-green-500);--dsw-static-deepseek-500:rgb(65,118,230);--dsw-static-deepseek-450:rgb(86,134,254);--dsw-static-deepseek-200:rgb(211,226,255)}",
			"body[data-ds-dark-theme] [data-slot=\"sidebar.settings\"]{--dsw-alias-bg-base:var(--dsw-static-neutral-bluish-950);--dsw-alias-bg-layer-1:var(--dsw-static-neutral-bluish-875);--dsw-alias-border-l1:rgba(255,255,255,.06);--dsw-alias-label-primary:var(--dsw-static-neutral-bluish-50);--dsw-specific-sidebar-fill:var(--dsw-static-neutral-bluish-900);--dsw-alias-brand-primary:var(--dsw-static-neutral-bluish-50);--dsw-alias-brand-primary-new-colorprimary-new-color:var(--dsw-static-deepseek-450);--dsw-alias-button-info-fill:var(--dsw-static-deepseek-400);--dsw-alias-label-primary-bluish:var(--dsw-static-neutral-bluish-50);--dsw-alias-state-business-primary:var(--dsw-static-deepseek-400);--dsw-alias-state-business-tertiary:var(--dsw-static-deepseek-800);--dsw-specific-sidebar-nav-item-active-accent:var(--dsw-static-neutral-bluish-800)}"
		].join("\n");

		function apply(ctx) {
			const theme = ctx.get("theme");
			const slots = ctx.get("slots");
			if (theme === undefined || slots === undefined) return;
			/* 注：引擎状态（含 `disposed`）全部声明在下面的 apply 闭包里，每次 apply
			   都是新闭包、天然复位，无需在此重置。 */

			/* ==================================================================
			 * 外观美化 (原有功能)
			 * ================================================================== */
			let state = { preset: "default" };
			let presetTokenDisposer = null;
			let presetCssDisposer = null;
			let bg = null;

			/* Preset surfaces. v3.0.1: the user bubble is driven by the host token
			   `--dsw-specific-bubble` (read by dsh-client-ui-chat AND
			   dsh-client-ui-goal in 0.1.5-rc.2), written through overrideTokens in
			   applyPreset below — no hashed chat class needed. The composer primary
			   button has no token of its own, so it stays a class override:
			   `.uV2eYG_primary` in dsh-client-ui-conversation (verified current in
			   0.1.5-rc.2). */
			function presetCss(id) {
				const bt = PRESETS[id].button;
				return ".uV2eYG_primary{background:" + bt.light + " !important;}" +
					"body[data-ds-dark-theme] .uV2eYG_primary{background:" + bt.dark + " !important;}";
			}

			/** Best-effort storage write; returns true on success. */
			function tryPersist(payload) {
				try {
					localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
					return true;
				} catch (error) {
					return false;
				}
			}

			function saveState() {
				const current = bg === null ? null : bg.dataUrl;
				const payload = { preset: state.preset, bg: current };
				if (tryPersist(payload)) return;
				console.warn("[dsh-ui-beautify] background image too large for localStorage; trying to downscale…");
				/* v3.0.1: 超限时不再把【旧背景】写回（那会让存储值与屏幕上的新图不一致），
				   而是压缩当前图；成功后重新走 setBackgroundFromDataUrl（它会重建 CSS
				   并再次持久化），而不是只改 bg.dataUrl——后者会让屏幕继续显示原图、
				   存储却是小图，刷新后突然变样。异步回调里先确认 bg 仍是同一张图。 */
				if (bg === null || typeof current !== "string" || current.length <= 200000) return;
				downscaleImage(current, 1400, 0.72).then(function (smaller) {
					if (typeof smaller !== "string" || smaller === current) return;
					if (bg === null || bg.dataUrl !== current) return;
					if (tryPersist({ preset: state.preset, bg: smaller })) {
						setBackgroundFromDataUrl(smaller);
						console.warn("[dsh-ui-beautify] background image downscaled to fit localStorage");
					}
				}).catch(function () {});
			}

			function loadState() {
				try {
					const raw = localStorage.getItem(STORAGE_KEY);
					return raw === null ? null : JSON.parse(raw);
				} catch (error) { return null; }
			}

			function restoreState() {
				const saved = loadState();
				if (saved === null) return;
				if (typeof saved.bg === "string" && saved.bg !== "") {
					setBackgroundFromDataUrl(saved.bg);
				}
				if (saved.preset === "default" || (typeof saved.preset === "string" && PRESETS[saved.preset])) {
					applyPreset(saved.preset);
				}
			}

			function applyPreset(id) {
				if (presetTokenDisposer) { presetTokenDisposer(); presetTokenDisposer = null; }
				if (presetCssDisposer) { presetCssDisposer(); presetCssDisposer = null; }
				state.preset = id;
				if (id !== "default" && PRESETS[id]) {
					const preset = PRESETS[id];
					/* v3.0.1: 用户气泡由宿主 token 驱动（chat 与 goal 共用），把预设的
					   bubble 值并入 token 覆盖，两个包的气泡才会一起跟随预设。 */
					const tokens = Object.assign({}, preset.tokens);
					tokens["--dsw-specific-bubble"] = preset.bubble;
					presetTokenDisposer = theme.overrideTokens("beautify-preset", tokens);
					presetCssDisposer = insertCss(presetCss(id));
				}
				applyBackgroundMask();
				saveState();
			}

			function applyBackgroundMask() {
				if (bg === null) return;
				if (bg.tokenDisposer) { bg.tokenDisposer(); bg.tokenDisposer = null; }
				bg.tokenDisposer = theme.overrideTokens("beautify-bg", BG_TOKENS);
			}

			function clearBackgroundImage(persist) {
				if (bg !== null) {
					if (bg.cssDisposer) bg.cssDisposer();
					if (bg.tokenDisposer) bg.tokenDisposer();
					bg = null;
				}
				if (persist !== false) saveState();
			}

			function setBackgroundFromDataUrl(dataUrl) {
				clearBackgroundImage(false);
				const css = [
					"[data-slot=root] > *{background-image:url(\"" + dataUrl + "\") !important;background-size:cover !important;background-position:center !important;}",
					"[data-slot=sidebar] > *{background:transparent !important;}",
					FADE_KILL_CSS,
					PANEL_SURFACE_CSS
				].join("\n");
				const cssDisposer = insertCss(css);
				const tokenDisposer = theme.overrideTokens("beautify-bg", BG_TOKENS);
				bg = { dataUrl: dataUrl, cssDisposer: cssDisposer, tokenDisposer: tokenDisposer };
				saveState();
			}

			function downscaleImage(dataUrl, maxSize, quality) {
				maxSize = maxSize || 2560;
				quality = quality === void 0 ? 0.85 : quality;
				return new Promise(function (resolve, reject) {
					const img = new Image();
					img.onload = function () {
						try {
							const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
							const w = Math.max(1, Math.round(img.width * scale));
							const h = Math.max(1, Math.round(img.height * scale));
							const canvas = document.createElement("canvas");
							canvas.width = w;
							canvas.height = h;
							const ctx2d = canvas.getContext("2d");
							if (ctx2d === null) throw new Error("canvas 2d context unavailable");
							ctx2d.drawImage(img, 0, 0, w, h);
							resolve(canvas.toDataURL("image/jpeg", quality));
						} catch (err) { reject(err); }
					};
					img.onerror = function () { reject(new Error("image decode failed")); };
					img.src = dataUrl;
				});
			}

			function setBackgroundImage(file) {
				const reader = new FileReader();
				reader.onload = function () {
					const original = String(reader.result);
					downscaleImage(original).then(
						function (compressed) { setBackgroundFromDataUrl(compressed); },
						function () { setBackgroundFromDataUrl(original); }
					);
				};
				reader.readAsDataURL(file);
			}

			function resetAll() {
				applyPreset("default");
				clearBackgroundImage();
			}

			restoreState();

			const settingsRestoreDisposer = insertCss(SETTINGS_RESTORE_CSS);

			function Panel() {
				const [presetId, setPresetId] = React.useState(state.preset);
				const [bgOn, setBgOn] = React.useState(bg !== null);
				const fileRef = React.useRef(null);

				const base = { padding: "20px 8px", color: "var(--dsw-alias-label-primary)" };
				const h3 = { margin: "0 0 8px", fontSize: 16, fontWeight: 600 };
				const p = { margin: "0 0 24px", color: "var(--dsw-alias-label-secondary)", fontSize: 14 };
				const labelStyle = { display: "block", marginBottom: 8, color: "var(--dsw-alias-label-secondary)", fontSize: 14 };
				const rowStyle = { display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" };
				const pill = function (active) {
					return {
						padding: "6px 14px", borderRadius: 999, cursor: "pointer", fontSize: 14,
						border: active ? "1px solid var(--dsw-static-neutral-bluish-400)" : "1px solid var(--dsw-alias-border-l2)",
						background: active ? "var(--dsw-alias-bg-module-platform)" : "transparent",
						color: "var(--dsw-alias-label-primary)"
					};
				};
				const ghost = { padding: "6px 14px", borderRadius: 8, cursor: "pointer", fontSize: 14, border: "1px solid var(--dsw-alias-border-l2)", background: "transparent", color: "var(--dsw-alias-label-secondary)" };

				function group(label, options, current, onPick) {
					return React.createElement("div", { style: { marginBottom: 18 } },
						React.createElement("span", { style: labelStyle }, label),
						React.createElement("div", { style: rowStyle },
							options.map(function (opt) {
								return React.createElement("button", {
									key: opt, type: "button", style: pill(current === opt),
									onClick: function () { onPick(opt); }
								}, LABELS[opt]);
							})
						)
					);
				}

				function onFile(e) {
					const file = e.target.files && e.target.files[0];
					if (file) { setBackgroundImage(file); setBgOn(true); }
					e.target.value = "";
				}

				return React.createElement("div", { style: base },
					React.createElement("h3", { style: h3 }, "外观美化"),
					React.createElement("p", { style: p }, "v1.9.0：UI 规范化——字号对齐系统 14px 阶梯、间距 8pt 网格、吸附直角/悬浮 12px 圆角、阴影与色彩全部 token 化、焦点可见、支持减弱动态效果。"),
					group("配色预设", PRESET_IDS, presetId, function (id) { applyPreset(id); setPresetId(id); }),
					React.createElement("div", { style: { marginBottom: 18 } },
						React.createElement("span", { style: labelStyle }, "背景图片（侧边栏+主区都显示，带可读遮罩）"),
						React.createElement("input", { type: "file", accept: "image/*", ref: fileRef, style: { display: "none" }, onChange: onFile }),
						React.createElement("div", { style: rowStyle },
							React.createElement("button", { type: "button", style: pill(bgOn), onClick: function () { if (fileRef.current) fileRef.current.click(); } }, bgOn ? "已设置（点击更换）" : "选择图片"),
							React.createElement("button", { type: "button", style: ghost, onClick: function () { clearBackgroundImage(); setBgOn(false); } }, "清除")
						)
					),
					React.createElement("button", { type: "button", style: ghost, onClick: function () { resetAll(); setPresetId("default"); setBgOn(false); } }, "重置全部")
				);
			}

			/* ---------- css ---------- */
			const SHEET = [
				/* ============================================================
				   v2.0.1: 标签正文的宿主布局契约
				   ------------------------------------------------------------
				   面板渲染在官方右侧栏的 pane body 里
				   (.P3OORG_panelBody{flex:auto;min-height:0;display:flex})，宽度由
				   右侧栏列几何决定（首开 = frame 的 45%，下限 300px），与旧宿主的
				   宽度无关。这里由宿主统一给出契约，插件只需在自己的根节点上填内容：
				   · width:100%/flex:auto —— 撑满 pane body，不靠内容自然宽度；
				   · min-width:0 —— flex 项默认 min-width:auto，长文件名会把整行
				     撑宽并让祖先出现横向滚动；
				   · overflow:hidden —— 兜住越界内容，绝不向外挤；
				   · display:flex/column —— 让插件的 height:100% 有确定的父高度
				     （block 父级下 height:100% 解析为 auto，面板会塌成内容高度）；
				   · container-type:inline-size —— 插件按**面板自身宽度**做响应式。 */
				'.dsh-sidebar-panel-host{box-sizing:border-box;width:100%;min-width:0;min-height:0;flex:auto;display:flex;flex-direction:column;overflow:hidden;container-type:inline-size;container-name:dshpanel}',
				'@container dshpanel (max-width: 420px){.dsh-sidebar-panel-host{font-size:13px}}',
			].join('\n')
			const cssDisposer = insertCss(SHEET)

			/* ==================================================================
			 * v2.0.0 · 插件面板 → DSH 官方右侧栏标签页
			 * ==================================================================
			 * 旧版（≤1.15.x）自带一个「插件面板」宿主，并把面板渲染进自研的
			 * 第三列网格。DSH 0.1.5-rc.1 起第三列的正式主人是官方右侧栏
			 * （dsh-client-ui-sidebar-right），宿主与它抢同一段 grid 模板 ——
			 * 这就是面板与侧边栏冲突的根因。
			 *
			 * 现在改为：把每个插件面板注册成官方右侧栏的一个「页标签类型」。
			 * 标签条、增删、横向溢出、浮动、分屏、每会话独立状态、撤销重做、
			 * 引导页胶囊全部由官方 dockkit 负责，本插件不再碰任何列几何。
			 * ================================================================== */

			/* 面板定义表：id → 定义。注册表本身与宿主生命周期无关，宿主
			   （官方右侧栏）可以晚到、消失、热重载后再回来。 */
			const panelDefs = new Map()
			const panelBound = new Map()
			let panelHost = null
			let panelStopped = false
			/* v2.0.0: panelVisible / pluginPanelOpen / dockedInOpenOrder /
			   nextPanelOrder / ensureActive / activeAfterClosing / closeDock lived
			   here. They all described the plugin panel's own tab strip and its
			   open-order bookkeeping — the official right Sidebar owns both now,
			   so the whole group is deleted rather than adapted. */
			/* 引导页胶囊的图标。官方按 IconProps（{size, className}）渲染它，
			   所以这里只吃 size/className，不接受 React 的 ref。 */
			function PanelEntryIcon(props) {
				const size = props !== null && props !== undefined && typeof props.size === 'number' ? props.size : 24
				return React.createElement('span', {
					className: props === null || props === undefined ? undefined : props.className,
					'aria-hidden': true,
					style: { fontSize: Math.round(size * 0.9), lineHeight: 1 }
				}, '🧩')
			}
			/* 挂载壳。v2.0.1：容器是 dsh-sidebar-panel-host，宿主已给它
			   width:100%/min-width:0/flex:auto/overflow:hidden/display:flex/
			   flex-direction:column 与 container-type:inline-size（见 SHEET）。
			   窄面板标记由 ResizeObserver 量**面板自身**宽度驱动。 */
			function PanelMountBody(props) {
				const def = props.def
				const boxRef = React.useRef(null)
				React.useEffect(function () {
					const host = boxRef.current
					if (host === null) return undefined
					let cleanup = null
					if (typeof def.render !== 'function' && typeof def.mount === 'function') {
						try { cleanup = def.mount(host) } catch (err) { console.error('[dsh-ui-beautify] panel mount failed:', def.id, err) }
					}
					let ro = null
					try {
						const applyNarrow = function (w) {
							const narrow = w > 0 && w < 420
							host.toggleAttribute('data-dsh-narrow', narrow)
							const inner = host.querySelector('.fexp-panel')
							if (inner !== null && inner !== undefined) inner.classList.toggle('fexp-narrow', narrow)
						}
						ro = new ResizeObserver(function (entries) {
							for (const entry of entries) {
								const w = entry.contentRect !== undefined ? entry.contentRect.width : host.getBoundingClientRect().width
								applyNarrow(w)
							}
						})
						ro.observe(host)
						applyNarrow(host.getBoundingClientRect().width)
					} catch (err) { ro = null }
					return function () {
						if (ro !== null) { try { ro.disconnect() } catch (err) {} }
						if (typeof cleanup === 'function') { try { cleanup() } catch (err) {} }
					}
				}, [def])
				if (typeof def.render === 'function') return def.render()
				return React.createElement('div', { ref: boxRef, className: 'dsh-sidebar-panel-host', 'data-dsh-panel-id': def.id })
			}
			function makePanelBody(def) {
				return function PanelBodyRegistration() { return React.createElement(PanelMountBody, { def: def }) }
			}
			function makePanelTitle(def) {
				return function PanelTitleRegistration() { return def.title }
			}
			/* 把一个面板登记进官方右侧栏。先正文后类型：slots.register 在槽位尚未
			   声明时会抛错（官方右侧栏是独立包，加载顺序可能更晚），而标签类型注册
			   在另一个服务上、失败无法回滚；正文先行则让失败发生在无副作用的一侧。 */
			function bindPanelToHost(id, def) {
				try {
					const tabs = ctx.get('sidebarRightTabs')
					const slots = ctx.get('slots')
					if (tabs === undefined || tabs === null || typeof tabs.register !== 'function') return null
					if (slots === undefined || slots === null || typeof slots.register !== 'function') return null
					const disposeBody = slots.register({ name: 'sidebar.right.pane.tab', key: id }, makePanelBody(def))
					let disposeTitle = null
					try { disposeTitle = slots.register({ name: 'sidebar.right.pane.tab.title', key: id }, makePanelTitle(def)) } catch (err) { disposeTitle = null }
					const typeDef = {
						id: id,
						kind: id,
						priority: 'extension',
						title: function () { return def.title }
					}
					if (def.entry !== null && typeof def.entry === 'object') {
						typeDef.guide = [{
							order: def.entry.order === undefined ? 100 : def.entry.order,
							title: function () { return def.entry.title === undefined ? def.title : def.entry.title },
							description: function () { return def.entry.description === undefined ? '' : def.entry.description },
							icon: PanelEntryIcon
						}]
					}
					let disposeType = null
					try {
						disposeType = tabs.register(typeDef)
					} catch (err) {
						if (typeof disposeTitle === 'function') { try { disposeTitle() } catch (e2) {} }
						if (typeof disposeBody === 'function') { try { disposeBody() } catch (e2) {} }
						return null
					}
					return function () {
						if (typeof disposeType === 'function') { try { disposeType() } catch (err) {} }
						if (typeof disposeTitle === 'function') { try { disposeTitle() } catch (err) {} }
						if (typeof disposeBody === 'function') { try { disposeBody() } catch (err) {} }
					}
				} catch (err) { return null }
			}
			function unbindPanels() {
				for (const entry of [...panelBound.values()]) { try { entry() } catch (err) {} }
				panelBound.clear()
			}
			/* 回读注册表判断座位是否还在：热重载会撤掉再重建槽位声明，那一刻挂在
			   声明下的注册被一并释放，而服务实例可能没换、我们手里的 disposer 也还在。 */
			function panelSeatAlive(id) {
				try {
					const slots = ctx.get('slots')
					if (slots === undefined || slots === null) return false
					if (typeof slots.entriesOfSlot === 'function') {
						return slots.entriesOfSlot('sidebar.right.pane.tab').some(function (entry) {
							return entry !== null && entry !== undefined && entry.options !== undefined && entry.options.key === id
						})
					}
					return true
				} catch (err) { return true }
			}
			function syncPanels() {
				if (panelStopped) return
				const tabs = ctx.get('sidebarRightTabs')
				if (tabs === undefined || tabs === null || typeof tabs.register !== 'function') {
					if (panelBound.size > 0) unbindPanels()
					panelHost = null
					return
				}
				if (panelHost !== tabs) { unbindPanels(); panelHost = tabs }
				for (const [id, def] of panelDefs) {
					if (panelBound.has(id)) {
						if (panelSeatAlive(id)) continue
						const stale = panelBound.get(id)
						if (typeof stale === 'function') { try { stale() } catch (err) {} }
						panelBound.delete(id)
					}
					const dispose = bindPanelToHost(id, def)
					if (dispose !== null) panelBound.set(id, dispose)
				}
			}
			/* ---------- 对外服务 ---------- */
			const sidebarPanelApi = {
				apiVersion: 1,
				registerPanel(def) {
					if (def === null || typeof def !== 'object') throw new TypeError('sidebarPanel.registerPanel(def): def 必须是对象')
					if (typeof def.id !== 'string' || def.id === '') throw new TypeError('sidebarPanel.registerPanel(def): def.id 必须是非空字符串（同时是标签 kind 与持久化键，必须跨版本稳定）')
					if (typeof def.mount !== 'function' && typeof def.render !== 'function') throw new TypeError('sidebarPanel.registerPanel(def): def.mount(el) 或 def.render() 必须提供其一')
					if (typeof def.title !== 'string' || def.title === '') throw new TypeError('sidebarPanel.registerPanel(def): def.title 必须是非空字符串')
					panelDefs.set(def.id, def)
					const previous = panelBound.get(def.id)
					if (previous !== undefined) { try { previous() } catch (err) {} panelBound.delete(def.id) }
					syncPanels()
					return function () {
						if (panelDefs.get(def.id) !== def) return
						panelDefs.delete(def.id)
						const dispose = panelBound.get(def.id)
						if (dispose !== undefined) { try { dispose() } catch (err) {} panelBound.delete(def.id) }
					}
				},
				has(id) { return panelDefs.has(id) },
				openPanel(id) {
					if (!panelDefs.has(id)) return false
					try {
						const right = ctx.get('sidebarRight')
						if (right === undefined || right === null || typeof right.openTab !== 'function') return false
						right.openTab(id)
						return true
					} catch (err) { return false }
				},
				focusPanel(id) { return sidebarPanelApi.openPanel(id) },
				closePanel(id) {
					try {
						const right = ctx.get('sidebarRight')
						if (right === undefined || right === null) return false
						const active = typeof right.active === 'function' ? right.active() : undefined
						if (active === undefined || active === null || active.kind !== id) return false
						if (typeof right.close !== 'function') return false
						right.close(active.id)
						return true
					} catch (err) { return false }
				},
				isOpen() {
					try {
						const right = ctx.get('sidebarRight')
						return right !== undefined && right !== null && typeof right.isExpanded === 'function' && right.isExpanded() === true
					} catch (err) { return false }
				}
			}
			/* ---------- combined "UI设置" section ---------- */
			/* v3.0.0: card mode is gone, so this section shows the appearance panel
			   only — the layout group (mode switch + reset) went with the card engine. */
			function UiSettingsPanel() {
				return React.createElement("div", null,
					React.createElement(Panel)
				)
			}
			/* ---------- effects ---------- */
			ctx.effect(function appearanceCleanup() {
				return function dispose() {
					if (presetTokenDisposer) { presetTokenDisposer(); presetTokenDisposer = null; }
					if (presetCssDisposer) { presetCssDisposer(); presetCssDisposer = null; }
					clearBackgroundImage(false);
					settingsRestoreDisposer();
					/* v3.0.1: 面板正文的宿主布局规则也必须随纤维卸载，否则 HMR /
					   卸载后 `.dsh-sidebar-panel-host` 与 @container 规则会一直留在 head。 */
					if (typeof cssDisposer === "function") cssDisposer();
				};
			});
			ctx.effect(function provideSidebarPanel() {
				/* The panel-registration service every UI plugin consumes. Provided
				   through the formal `ctx.provide` contract (cordis semantics): a
				   guarded/dynamic ctx has no `reflect`, so `ctx.provide` is the only
				   surface that reaches consumers.
				   v2.0.0 renamed this from `dock`: the old service mounted panels into
				   this plugin's own third column, which the official right Sidebar
				   owns; this one registers them as its tabs. Both names are
				   deliberately NOT served at once — a consumer that still asks for
				   `dock` falls back to its own standalone UI exactly as if
				   ui-beautify were not installed. */
				return ctx.provide('sidebarPanel', sidebarPanelApi)
			})
			ctx.effect(function bindPanelHost() {
				/* Bind each registered panel to the official right Sidebar. Idempotent, and
				   re-run on every service/declaration change: `ctx.get`'s identity is never
				   used for change detection (a guarded ctx returns a fresh Proxy per call),
				   so syncPanels() decides from liveness instead. */
				syncPanels()
				let off = null
				try {
					off = ctx.on('internal/service', function (name) { if (name === 'sidebarRightTabs' || name === 'sidebarRight') syncPanels() })
				} catch (err) { off = null }
				/* Late-binding safety net: the official Sidebar is a separate package with
				   its own load order, and a DECLARATION can arrive without a service event. */
				const timer = window.setInterval(syncPanels, 1000)
				return function dispose() {
					panelStopped = true
					if (off !== null) { try { off() } catch (err) {} }
					window.clearInterval(timer)
					unbindPanels()
				}
			})
			ctx.effect(function registerUiSettings() {
				return slots.inject('settings.section', function () {
					return slots.register(
						{ name: 'settings.section', id: 'ui-settings', order: 5, label: 'UI设置' },
						function () { return React.createElement(UiSettingsPanel) }
					);
				});
			});
		}

		const inject = ["theme", "slots"];

		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});
