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
		 * gradient over a custom sidebar/background. Selectors are pinned to
		 * the shipped 0.1.2-rc.1 client bundles — verified against the
		 * installed dsh-client-ui-workspace at 0.1.2-rc.1 (the hash was
		 * re-generated since 0.1.0-rc.7), revisit after a DSH upgrade.
		 */
		const FADE_KILL_CSS = [
			".bhn1Oq_fade{background:none !important;}",
			"[data-slot=\"sidebar.workspaces\"] > * > :last-child > :last-child{background:none !important;}"
		].join("\n");

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

			/* Preset surfaces. Selectors pinned to the shipped 0.1.2-rc.1
			   client bundles (verified against the installed host): the user
			   bubble is `_bubble` of the MessageItem css-module in
			   dsh-client-ui-chat (hash re-generated since 0.1.0-rc.6:
			   gdEzaW_bubble -> Sixlwa_bubble); the composer primary button
			   `uV2eYG_primary` in dsh-client-ui-conversation is unchanged. */
			function presetCss(id) {
				const b = PRESETS[id].bubble;
				const bt = PRESETS[id].button;
				return ".Sixlwa_bubble{background:" + b.light + " !important;}" +
					"body[data-ds-dark-theme] .Sixlwa_bubble{background:" + b.dark + " !important;}" +
					".uV2eYG_primary{background:" + bt.light + " !important;}" +
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
				const payload = { preset: state.preset, bg: bg === null ? null : bg.dataUrl };
				if (tryPersist(payload)) return;
				console.warn("[dsh-ui-beautify] background image too large for localStorage; trying to downscale…");
				const old = loadState();
				if (old && typeof old.bg === "string" && old.bg !== payload.bg) {
					tryPersist({ preset: state.preset, bg: old.bg });
				}
				if (bg !== null && typeof bg.dataUrl === "string" && bg.dataUrl.length > 200000) {
					downscaleImage(bg.dataUrl, 1400, 0.72).then(function (smaller) {
						if (typeof smaller !== "string" || smaller === bg.dataUrl) return;
						if (tryPersist({ preset: state.preset, bg: smaller })) {
							bg.dataUrl = smaller;
							console.warn("[dsh-ui-beautify] background image downscaled to fit localStorage");
						}
					}).catch(function () {});
				}
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
					presetTokenDisposer = theme.overrideTokens("beautify-preset", PRESETS[id].tokens);
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
					FADE_KILL_CSS
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

			/* ==================================================================
			 * 卡片布局引擎 (v1.4 新增)
			 * ================================================================== */

			/* ---------- persistence ---------- */
			const LAYOUT_STORAGE_KEY = 'dsh.layout-studio:state'
			const LAYOUT_DEFAULTS = {
				mode: 'card',
				sidebar: { dock: 'left', width: 280, height: 260, fx: 80, fy: 60, fw: 340, fh: 640 },
				conversation: { dock: 'center', width: 640, height: 260, fx: 120, fy: 60, fw: 640, fh: 520 },
				dock: { dock: 'right', open: false, width: 400, height: 260, fx: 160, fy: 80, fw: 560, fh: 420 },
				/* v1.8: the unified plugin panel (launcher + tabbed host). In card mode
				   it occupies the dock card; in classic mode it renders as a right-docked
				   overlay that can detach into a floating window. */
				pluginPanel: { open: false, float: false, width: 400, fx: 140, fy: 80, fw: 560, fh: 420 },
				panels: {},
				/* v1.15.0: 单调递增的「打开序号」计数器。标签顺序 = 打开顺序（先开的在
				   左），而不是注册顺序；每个面板的序号存在 panels[id].order 里，
				   计数器本身单独持久化，保证刷新后顺序不变、重开的面板排在末尾。 */
				panelSeq: 0
			}
			function loadLayoutState() {
				try { const raw = localStorage.getItem(LAYOUT_STORAGE_KEY); return raw === null ? null : JSON.parse(raw) } catch (e) { return null }
			}
			/* every card may dock to any of the five regions (top/bottom/left/center/right) or float */
			const DOCK_POSITIONS = ['left', 'center', 'right', 'top', 'bottom', 'float']
			function mergeLayoutState(saved) {
				const base = JSON.parse(JSON.stringify(LAYOUT_DEFAULTS))
				if (saved && typeof saved === 'object') {
					if (saved.mode === 'card' || saved.mode === 'classic') base.mode = saved.mode
					else if (saved.mode === 'vscode') base.mode = 'card'
					const pick = function (src, dst, keys) {
						if (!src || typeof src !== 'object') return
						for (const k of keys) if (typeof src[k] === 'number') dst[k] = Math.round(src[k])
						/* whitelist the dock position: a corrupted/stale persisted value would
						   otherwise leave the card in an unmapped state */
						if (typeof src.dock === 'string' && DOCK_POSITIONS.includes(src.dock)) dst.dock = src.dock
					}
					pick(saved.sidebar, base.sidebar, ['width', 'height', 'fx', 'fy', 'fw', 'fh'])
					pick(saved.conversation, base.conversation, ['width', 'height', 'fx', 'fy', 'fw', 'fh'])
					pick(saved.dock, base.dock, ['width', 'height', 'fx', 'fy', 'fw', 'fh'])
					if (saved.dock && typeof saved.dock.open === 'boolean') base.dock.open = saved.dock.open
					if (saved.pluginPanel && typeof saved.pluginPanel === 'object') {
						const pp = saved.pluginPanel
						base.pluginPanel.open = pp.open === true
						base.pluginPanel.float = pp.float === true
						for (const k of ['width', 'fx', 'fy', 'fw', 'fh']) {
							if (typeof pp[k] === 'number') base.pluginPanel[k] = Math.round(pp[k])
						}
						base.pluginPanel.width = Math.min(2000, Math.max(240, base.pluginPanel.width))
					}
					if (saved.panels && typeof saved.panels === 'object') {
						for (const id of Object.keys(saved.panels)) {
							const p = saved.panels[id]
							if (p && typeof p === 'object') {
								const row = {
									open: p.open === true,
									float: p.float === true,
									x: typeof p.x === 'number' ? Math.round(p.x) : 140,
									y: typeof p.y === 'number' ? Math.round(p.y) : 80,
									w: typeof p.w === 'number' ? Math.round(p.w) : 560,
									h: typeof p.h === 'number' ? Math.round(p.h) : 420
								}
								/* v1.15.0: 打开序号（标签顺序的唯一依据）。旧版状态没有这个
								   字段 —— 保持 undefined，首次打开时补号，渲染阶段排在已编号
								   面板之前（等价于旧版的注册顺序）。 */
								if (typeof p.order === 'number' && Number.isFinite(p.order) && p.order >= 0) row.order = Math.floor(p.order)
								base.panels[id] = row
							}
						}
					}
				}
				/* v1.15.0: 计数器必须大于现存最大序号，否则刷新后新开的号会与旧号
				   撞车（同号时退化为注册顺序）。 */
				let maxOrder = 0
				for (const id of Object.keys(base.panels)) {
					const o = base.panels[id].order
					if (typeof o === 'number' && o > maxOrder) maxOrder = o
				}
				if (saved && typeof saved === 'object' && typeof saved.panelSeq === 'number' && Number.isFinite(saved.panelSeq)) {
					maxOrder = Math.max(maxOrder, Math.floor(saved.panelSeq))
				}
				base.panelSeq = maxOrder
				return base
			}
			const layoutState = mergeLayoutState(loadLayoutState())
			function saveLayoutState() {
				/* v1.15.0: 本 fiber 已被卸载（热重载/停用）时禁止再写持久化 —— 旧实例
				   的 layoutState 是快照，写回去会把新实例已经加载/修改的状态覆盖掉
				   （典型症状：ui-beautify 热重载后，消费方在旧实例里注销面板导致新实例
				   刚恢复的「面板已打开」被抹掉）。 */
				if (disposed) return
				try { localStorage.setItem(LAYOUT_STORAGE_KEY, JSON.stringify(layoutState)) } catch (e) { console.warn('[dsh-ui-beautify] layout persist failed', e) }
			}

			/* ---------- css ---------- */
			const SHEET = [
				'[data-vsc-layout]{grid-template-columns:var(--vsc-cols,280px minmax(480px,1fr))!important;grid-template-rows:var(--vsc-rows,minmax(0,1fr))!important}',
				/* v1.12.11: ALWAYS disable the frame's grid transition. The
				   official AppFrame animates grid-template-columns over 0.3s,
				   so right after applyLayout() stamps --vsc-cols the layout is
				   still mid-animation and cardRect()/getBoundingClientRect()
				   reads the OLD track widths (conversation was minmax(0,1fr),
				   spanning to the right edge) — grab strips and resize handles
				   render one column off until the first drag forces
				   transition:none via data-vsc-dragging. Pinning it off keeps
				   every chrome element aligned from the first frame. */
				'[data-vsc-layout]{transition:none!important}',
				'[data-vsc-layout] [data-vsc-card]{min-width:0;min-height:0}',
				'[data-vsc-layout] [data-vsc-card="sidebar"]{grid-column:var(--vsc-sb-col,1);grid-row:var(--vsc-sb-row,1 / -1)}',
				'[data-vsc-layout] [data-vsc-card="conversation"]{grid-column:var(--vsc-cv-col,2);grid-row:var(--vsc-cv-row,1)}',
				'[data-vsc-layout] [data-vsc-card="dock"]{grid-column:var(--vsc-dk-col,auto);grid-row:var(--vsc-dk-row,auto)}',
				/* v1.8.2/v1.8.6: the dock card is the positioning anchor for the
				   plugin panel (portaled inside it as an inset:0 layer). z-index:0
				   makes the docked card a STACKING CONTEXT so the panel's internal
				   z-index (21) cannot escape above the overlay layer (20) or other
				   cards — dragging any card over the panel keeps the dragged card
				   on top. The float rule below (position:absolute + z-index:19,
				   higher specificity) still wins when the card is floated. */
				'[data-vsc-layout] [data-vsc-card="dock"]{position:relative;z-index:0}',
				/* v1.8.6: the card being dragged is raised above every surface
				   except the drop-zone hints (40) — it must never slide under the
				   plugin panel or another floated card mid-drag. */
				'[data-vsc-layout] [data-vsc-card][data-vsc-dragtop]{z-index:35!important}',
				/* v1.8.9: the settings modal renders inside the sidebar card; a
				   floated sidebar card (z-19 stacking context) traps the fixed
				   z-1000 modal, so sibling floated cards (z-19, later DOM order)
				   paint over the settings window. Lift the floated sidebar card
				   above every surface while settings is open. */
				'[data-vsc-layout][data-vsc-settings-open] [data-vsc-card="sidebar"][data-vsc-float]{z-index:40!important}',
				/* v1.10.0: docked cards keep their inner surfaces' native radii
				   (composer card 22px, stats popup 12px) and instead clip them
				   at the card boundary — the composer keeps its rounded dialog
				   look on top while its bottom corners stay square against the
				   card edge; floating cards keep their own 12px radius (rule
				   above) and already clip via overflow:hidden. */
				'[data-vsc-layout] [data-vsc-card="conversation"]:not([data-vsc-float]){overflow:hidden!important}',
				/* v1.9.0: 0.2s morph between docked (square card corners, no
				   shadow) and floating (12px, lv3 shadow); instant while
				   dragging. */
				'[data-vsc-layout] [data-vsc-card]{transition:border-radius var(--ds-transition-duration) var(--ds-ease-in-out),box-shadow var(--ds-transition-duration) var(--ds-ease-in-out)!important}',
				'[data-vsc-layout][data-vsc-dragging] [data-vsc-card]{transition:none!important}',
				/* card border system (v1.6.1): every card may dock to any region, so the divider
				   is edge-driven — applyLayout stamps each docked card with data-vsc-edge (the
				   side facing its neighbour) and these rules paint exactly ONE 1px border-l3
				   there. Non-edge borders (incl. shipped sidebar/details borders) are cleared
				   first; floating cards keep their own full border via the float rule. */
				'[data-vsc-layout] [data-vsc-card][data-vsc-edge]{border:none!important}',
				'[data-vsc-layout] [data-vsc-card][data-vsc-edge="right"]{border-right:1px solid var(--dsw-alias-border-l3)!important}',
				'[data-vsc-layout] [data-vsc-card][data-vsc-edge="left"]{border-left:1px solid var(--dsw-alias-border-l3)!important}',
				'[data-vsc-layout] [data-vsc-card][data-vsc-edge="bottom"]{border-bottom:1px solid var(--dsw-alias-border-l3)!important}',
				'[data-vsc-layout] [data-vsc-card][data-vsc-edge="top"]{border-top:1px solid var(--dsw-alias-border-l3)!important}',
				/* conversation card docked OUTSIDE the center slot (v1.7.4): the conversation
				   surface is bg-base like the main area, so a docked conversation would show
				   no color step at the seam. Tint its surface 25% toward the sidebar fill and
				   let the conversation root stay transparent so the tint shows through — the
				   seam then reads the same as every other docked card. Center-slot (edge
				   "none") and floating cards keep their regular look. */
				'[data-vsc-layout] [data-vsc-card="conversation"]:not([data-vsc-float])[data-vsc-edge]:not([data-vsc-edge="none"]){background-color:color-mix(in srgb, var(--dsw-specific-sidebar-fill) 25%, var(--dsw-alias-bg-base))!important}',
				'[data-vsc-layout] [data-vsc-card="conversation"]:not([data-vsc-float])[data-vsc-edge]:not([data-vsc-edge="none"]) [data-slot="conversation"] > *{background:transparent!important}',
				/* card surface language (v1.5.6): the dock card uses the SIDEBAR fill token, not
				   bg-base — sidebar-fill vs bg-base is the exact color contrast that makes the
				   sidebar seam readable, so the dock/conversation junction gets the same visible
				   step. The card paints the fill (single layer — the shipped DetailsPanel is
				   hidden in card mode since v1.8: the dock card belongs to the plugin panel,
				   tool details are covered by the trajectory view), and the l3 dividers stay
				   on top of it. Float state keeps its own glass surface. */
				'[data-vsc-layout] [data-vsc-card="dock"]:not([data-vsc-float]){background-color:var(--dsw-specific-sidebar-fill)!important}',
				/* v1.8: the native details panel is gone from the dock card — the plugin
				   panel owns that surface. Hidden entirely (not just transparent) so the
				   shipped "详情" header and empty hint never paint through. */
				'[data-vsc-layout] [data-vsc-card="dock"] [data-slot="details"] > *{display:none!important}',
				/* grid junction: gap pinned to 0 always (a top/bottom docked card may occupy any
				   region); the composer flush rule applies whenever a bottom region exists
				   (frame data-vsc-dock-bottom, stamped by applyLayout) */
				'[data-vsc-layout]{gap:0!important;align-content:stretch!important}',
				'[data-vsc-layout][data-vsc-dock-bottom] [data-slot="conversation"] > *{flex:1!important;min-height:0!important}',
				'[data-vsc-layout] [data-vsc-card][data-vsc-hidden]{display:none!important}',
				'[data-vsc-layout] [data-vsc-card][data-vsc-float]{position:absolute!important;z-index:19;border:1px solid var(--dsw-alias-border-l2);border-radius:12px;box-shadow:var(--dsw-shadow-lv3);overflow:hidden;box-sizing:border-box;padding-top:20px}',
				'[data-vsc-layout] [data-vsc-card][data-vsc-float]::before{content:"";position:absolute;inset:0;z-index:-1;backdrop-filter:blur(12px);background:color-mix(in srgb, var(--dsw-alias-bg-base) 74%, transparent)}',
				'[data-vsc-layout] [data-vsc-card="sidebar"][data-vsc-float]::before{background:color-mix(in srgb, var(--dsw-specific-sidebar-fill) 74%, transparent)}',
				'[data-vsc-layout] [data-vsc-card="sidebar"][data-vsc-float]{left:var(--vsc-sb-x,80px);top:var(--vsc-sb-y,60px);width:var(--vsc-sb-w,340px);height:var(--vsc-sb-h,640px);background:transparent!important}',
				'[data-vsc-layout] [data-vsc-card="conversation"][data-vsc-float]{left:var(--vsc-cv-x,120px);top:var(--vsc-cv-y,60px);width:var(--vsc-cv-w,640px);height:var(--vsc-cv-h,520px)}',
				'[data-vsc-layout] [data-vsc-card="dock"][data-vsc-float]{left:var(--vsc-dk-x,160px);top:var(--vsc-dk-y,80px);width:var(--vsc-dk-w,560px);height:var(--vsc-dk-h,420px)}',
				/* native column drag handles only (v1.7.9): the AppFrame's two resize
				   handles carry data-side="sidebar"/"details" — hide them in card mode so
				   they don't fight our docked resize handles. The rule was previously the
				   bare [data-side], which ALSO matched every Tooltip bubble
				   (data-side="top"/"right"/"bottom"/"left") — hiding ALL tooltips in card
				   mode (stats-line full-text hover, message action hints, button hints…).
				   Narrow to the two handle values. */
				'[data-vsc-layout] [data-side="sidebar"], [data-vsc-layout] [data-side="details"]{display:none!important}',
				'[data-vsc-layout] [data-vsc-card="sidebar"] [data-slot="sidebar"] > *{width:100%!important}',
				'[data-vsc-layout] [data-vsc-card="conversation"][data-vsc-float] [data-slot="conversation"] > *{background:transparent!important}',
				'[data-vsc-layout] [data-vsc-card="dock"][data-vsc-float] [data-slot="details"] > *{display:none!important}',
				'[data-vsc-grab]{position:absolute;cursor:grab;pointer-events:auto;background:transparent;z-index:31}',
				'[data-vsc-grab]:hover{background:color-mix(in srgb, var(--dsw-alias-brand-primary) 18%, transparent)}',
				'[data-vsc-grab]:after{content:"";position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:48px;height:4px;border-radius:2px;background:var(--dsw-alias-border-l3);opacity:0;transition:opacity 150ms ease}',
				'[data-vsc-grab]:hover:after{opacity:1}',
				/* v1.8.4: plugin-panel drag strip — same affordance as the card grab
				   strips (hover reveals the 48x4 bar), rendered inside the panel so
				   it works in both modes and cannot be covered by the panel layer.
				   v1.8.5: hover also tints the strip like the card grab strips. */
				'[data-vsc-ppstrip]{flex:none;height:12px;cursor:grab;position:relative;touch-action:none;user-select:none}',
				'[data-vsc-ppstrip]:hover{background:color-mix(in srgb, var(--dsw-alias-brand-primary) 18%, transparent)}',
				'[data-vsc-ppstrip]:after{content:"";position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:48px;height:4px;border-radius:2px;background:var(--dsw-alias-border-l3);opacity:0;transition:opacity 150ms ease;pointer-events:none}',
				'[data-vsc-ppstrip]:hover:after{opacity:1}',
				'[data-vsc-zone]{position:absolute;border:2px dashed var(--dsw-alias-brand-primary);background:color-mix(in srgb, var(--dsw-alias-brand-primary) 12%, transparent);border-radius:10px;pointer-events:none;z-index:40;display:flex;align-items:center;justify-content:center;color:var(--dsw-alias-label-secondary);font-size:12px}',
				'[data-vsc-zone][data-hot]{background:color-mix(in srgb, var(--dsw-alias-brand-primary) 30%, transparent);border-style:solid;color:var(--dsw-alias-label-primary)}',
				'[data-vsc-ftop]{position:absolute;cursor:grab;pointer-events:auto;background:transparent;z-index:34}',
				'[data-vsc-ftop]:after{content:"";position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:48px;height:4px;border-radius:2px;background:var(--dsw-alias-border-l3);opacity:0;transition:opacity 150ms ease}',
				'[data-vsc-ftop]:hover:after{opacity:1}',
				'[data-vsc-fclose]{position:absolute;width:22px;height:22px;border:none;background:transparent;color:var(--dsw-alias-label-secondary);cursor:pointer;border-radius:6px;font-size:13px;line-height:1;opacity:.6;pointer-events:auto;z-index:34}',
				'[data-vsc-fclose]:hover{opacity:1;background:var(--dsw-alias-interactive-bg-hover)}',
				/* v1.8: session-header "插件面板" entry (mirrors the file-explorer
				   button language: transparent capsule, active tint) */
				/* v1.10.0: mirror the shipped session-log button (pill 18, l2
				   border, 32px, 13/400/20); the open state uses the same subtle
				   interactive-bg-hover language as the rest of the UI */
				'.ubeautify-ppentry{display:inline-flex;align-items:center;justify-content:center;gap:4px;height:32px;padding:6px 12px;min-width:0;border:1px solid var(--dsw-alias-border-l2);border-radius:18px;background:transparent;color:var(--dsw-alias-label-primary);font-size:13px;font-weight:400;line-height:20px;cursor:pointer;flex-shrink:1;transition:background var(--ds-transition-duration) var(--ds-ease-in-out),border-color var(--ds-transition-duration) var(--ds-ease-in-out)}',
				'.ubeautify-ppentry:hover{background:var(--dsw-alias-interactive-bg-hover)}',
				'.ubeautify-ppentry.ubeautify-ppon{background:var(--dsw-alias-interactive-bg-hover)}',
				/* dock card bottom-docked: flush the composer against the panel (shipped input bar has 8px bottom padding) */
				'[data-vsc-layout][data-vsc-dock-bottom] [data-slot="conversation.composer.bar"] > *{padding-bottom:0!important}',
				/* composer seat color (v1.7.6) — NO mask (v1.7.7): the native fade ends at
				   FULL bg-base, which over the root's 85% tint (background image) double-
				   stacks to ~98% — a dark slab beside the 85% chat surface. End at 60% of
				   the tint instead (~93% combined) so the composer reads as the same
				   surface, slightly more solid for legibility; with an opaque bg the end is
				   fully opaque either way, so the native appearance is unchanged. The
				   v1.7.5/v1.7.6 mask is REMOVED: a mask on the seat clips everything that
				   overflows the seat's border box — the command menu (/ candidates) and the
				   permission-select popup both open ABOVE the input card via inline
				   absolute positioning, so the mask cut them into fragments (menu appeared
				   missing, selector cut off). Native popup behavior is restored; the 8px
				   scrollbar-gutter strip beside the fade is accepted for now. */
				'[data-vsc-layout] [data-phase="active"] [data-composer-seat]{background:linear-gradient(180deg, transparent 0px, color-mix(in srgb, var(--dsw-alias-bg-base) 60%, transparent) 36px)!important}',
				/* v1.13.0 起移除：宿主导入 data-actions-reveal 原生机制，不再需要。 */
				/* v1.9.0: accessibility — visible focus ring (2px brand outline
				   + 2px offset) on every plugin-owned control. v1.12.1: NOT
				   scoped to [data-vsc-layout] — the dock host also renders in
				   classic three-column mode and in float windows. */
				'[data-vsc-dhost] button:focus-visible,[data-vsc-pfloat] button:focus-visible,[data-vsc-ppfloat] button:focus-visible,[data-vsc-pplist] button:focus-visible,[data-vsc-pptabs] button:focus-visible,[data-vsc-pptmore]:focus-visible,.ubeautify-ppentry:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px}',
				/* v1.9.0: reduced-motion — kill transitions inside plugin-owned
				   containers only (the core UI keeps its own behavior) */
				'@media (prefers-reduced-motion: reduce){[data-vsc-dhost] *,[data-vsc-pfloat] *,[data-vsc-ppfloat] *,[data-vsc-pplist] *,[data-vsc-pptabs] *,[data-vsc-pptmore],.ubeautify-ppentry{transition:none!important}}',
				/* v1.9.2/v1.10.0: tab close/float targets — 20px hit areas with hover feedback */
				'[data-vsc-tabx]{display:inline-flex;align-items:center;justify-content:center;width:20px;height:20px;border-radius:6px;opacity:.7;cursor:pointer}',
				'[data-vsc-tabx]:hover{opacity:1;background:var(--dsw-alias-interactive-bg-hover)}',
				/* v1.14.0: 标签条单行滚动 —— 溢出时横向滚动，并把过滚动限制在标签条内部。
				   v1.15.0: 删掉本插件自造的 6px 滚动条样式，改用宿主全局的
				   `::-webkit-scrollbar{width:8px;height:8px}` + `--dsh-scrollbar-thumb`
				   主题色 —— 与芯片行、与宿主其它滚动区完全一致；标签条自身用
				   padding-bottom:var(--dsh-scrollbar-width,8px) 把滚动条与标签分开。 */
				'[data-vsc-pptabs]{overscroll-behavior-x:contain;scroll-padding-right:8px}',
				/* v1.10.3: compact header close — 22x22 borderless icon button (the
				   30px PANEL_BTN silhouette made the close look oversized even
				   with a smaller icon) */
				'[data-vsc-hdrx]{display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;padding:0;border:none;background:transparent;border-radius:6px;color:var(--dsw-alias-label-secondary);cursor:pointer;transition:background var(--ds-transition-duration) var(--ds-ease-in-out),color var(--ds-transition-duration) var(--ds-ease-in-out)}',
				'[data-vsc-hdrx]:hover{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}',
				/* v1.12.0: classic-mode three-column plugin panel — the panel opens
				   as the THIRD grid column (frame.children[2], the official
				   details column element) instead of a floating overlay, so the
				   docked panel gets the exact same surface language as card mode.
				   Active only while data-vsc-pp3 is stamped (classic mode +
				   panel open + docked); mutually exclusive with data-vsc-layout. */
				'[data-vsc-pp3]{grid-template-columns:var(--vsc-pp-cols,280px minmax(480px,1fr) 400px)!important}',
				'[data-vsc-pp3][data-vsc-dragging]{transition:none!important}',
				'[data-vsc-pp3] [data-slot="details"] > *{display:none!important}',
				/* v1.12.1: the panel column must also be the positioning anchor for
				   the inset:0 dhost layer, exactly like the card-mode dock card
				   (position:relative + z-index:0 creates the stacking context that
				   keeps the panel's internal z-21 below the shell overlay layer) —
				   without it the dhost filled the WHOLE frame and blocked
				   sidebar/conversation interaction. */
				'[data-vsc-pp3] [data-vsc-ppcol]{position:relative!important;z-index:0!important;background:var(--dsw-specific-sidebar-fill)!important;border-left:1px solid var(--dsw-alias-border-l3)!important}',
				/* classic three-column resize handle — mirrors the official
				   AppFrame handle (8px hit area, hover-revealed 12x32 pill)
				   without pinning the shipped hashed class name; sits inside
				   the panel column (overflow:hidden clips a -4px overhang). */
				'[data-vsc-pphand]{position:absolute;left:0;top:0;bottom:0;width:8px;cursor:col-resize;z-index:30;touch-action:none;pointer-events:auto}',
				'[data-vsc-pphand]:after{content:"";box-sizing:border-box;background:var(--dsw-alias-button-floating-fill);border:1px solid var(--dsw-alias-border-l2-darkmode-thin);opacity:0;width:12px;height:32px;transition:opacity var(--ds-transition-duration-slow,var(--ds-transition-duration)) var(--ds-ease-in-out),background var(--ds-transition-duration-slow,var(--ds-transition-duration)) var(--ds-ease-in-out);border-radius:10px;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}',
				'[data-vsc-pphand]:hover:after,[data-vsc-pphand][data-dragging]:after{opacity:1;background:var(--dsw-alias-button-floating-hover);border-color:var(--dsw-alias-border-l3)}'
			].join('\n')
			const cssDisposer = insertCss(SHEET)

			/* ---------- shared helpers ---------- */
			const cardPrefix = (card) => card === 'sidebar' ? 'sb' : card === 'conversation' ? 'cv' : 'dk'
			/* v1.12.2: dock float min width 360 -> 280 — the floated card (with
			   the plugin panel inside) can shrink more compactly; the launcher
			   row scrolls horizontally when narrow. */
			const FLOAT_MIN_W = { sidebar: 264, conversation: 480, dock: 280 }
			const FLOAT_MIN_H = { sidebar: 240, conversation: 320, dock: 240 }
			const SIDEBAR_RAIL = 56
			/* v1.12.8: the center column (conversation) keeps at least this much —
			   the official header button row and composer tool row need ~480px to
			   render without overlap. Every layout stamp floors the center/free
			   track at CONV_MIN_W, and side-card growth caps at frame - CONV_MIN_W. */
			const CONV_MIN_W = 480
			/* v1.12.14: docked left/right min width per card. The conversation
			   surface needs CONV_MIN_W so its session-header button row and
			   composer tool row render without overlap when docked to a side
			   (the center-slot floor only protects it while docked center).
			   The sidebar keeps 120 so the <240px squeeze-to-collapse gesture
			   survives; the dock card keeps 120 so the <140px squeeze-to-close
			   survives. Applied as a SOFT floor: a too-narrow frame (window −
			   opposite card < 480) lets it yield rather than overflow. */
			const DOCK_MIN_W = { conversation: CONV_MIN_W }
			/* Shared control transition (official duration + easing curve). */
			const UI_TRANSITION = 'background var(--ds-transition-duration) var(--ds-ease-in-out), border-color var(--ds-transition-duration) var(--ds-ease-in-out), color var(--ds-transition-duration) var(--ds-ease-in-out)'
			const PANEL_BTN = { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 4, height: 30, minWidth: 30, padding: '0 10px', borderRadius: 8, border: '1px solid var(--dsw-alias-border-l2)', background: 'transparent', color: 'var(--dsw-alias-label-secondary)', fontSize: 13, lineHeight: 1, cursor: 'pointer', transition: UI_TRANSITION }
			/* v1.10.0: stroke close / float icons — text glyphs (×, ⧉) render
			   off-center in the current font; 16-viewBox SVGs with round caps
			   center perfectly and inherit the text color.
			   v1.11.1: these are FUNCTION COMPONENTS — React calls them with the
			   props object, so the argument is destructured. A bare `size`
			   parameter received { size: N } and rendered
			   width/height="[object Object]", which Chromium rejects with
			   "Error: <svg> attribute height: Expected length" and crashes the
			   whole panel render (classic AND card mode). */
			function CloseIcon({ size = 12 }) {
				return React.createElement('svg', { width: size, height: size, viewBox: '0 0 16 16', fill: 'none', 'aria-hidden': true, style: { display: 'block' } },
					React.createElement('path', { d: 'M4 4 L12 12 M12 4 L4 12', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round' }))
			}
			function FloatIcon({ size = 12 }) {
				return React.createElement('svg', { width: size, height: size, viewBox: '0 0 16 16', fill: 'none', 'aria-hidden': true, style: { display: 'block' } },
					React.createElement('path', { d: 'M3.5 3.5 H7.5 V7.5 H3.5 Z M8.5 8.5 H12.5 V12.5 H8.5 Z', stroke: 'currentColor', strokeWidth: 1.4, strokeLinejoin: 'round' }))
			}
			/* v1.8.8: shared floating-window chrome (plugin float windows and the
			   classic plugin-panel float) — kept in one place so the glass look
			   stays consistent. */
			const FLOAT_WINDOW_STYLE = { position: 'absolute', zIndex: 22, display: 'flex', flexDirection: 'column', overflow: 'hidden', pointerEvents: 'auto', background: 'color-mix(in srgb, var(--dsw-alias-bg-base) 88%, transparent)', backdropFilter: 'blur(12px)', border: '1px solid var(--dsw-alias-border-l2)', borderRadius: 12, boxShadow: 'var(--dsw-shadow-lv3)', boxSizing: 'border-box' }

			function clamp(v, min, max) { return Math.min(max, Math.max(min, Math.round(v))) }
			/* five universal dock regions — any card may dock to any of them. Edge hit-testing
			   is vertical-first (top/bottom before left/right); the center region is the middle
			   rectangle; anything else stays floating.
			   v1.8.7: all five regions shrunk by 10 percentage points — edge bands 18%→8%,
			   center x[38%,62%]→[43%,57%], y[34%,66%]→[39%,61%] — applied identically to the
			   hit test (zoneFor) and the visible hint (zoneRect) so they stay in sync. */
			const ZONE_EDGE = 0.08
			const ZONE_CENTER = { x0: 0.43, x1: 0.57, y0: 0.39, y1: 0.61 }
			/* v1.12.10: pointer must travel at least this many px from the
			   press point before the dock zone is evaluated — prevents a grab
			   started inside a zone band (e.g. the top 8%) from instantly
			   showing the full-width hint. */
			const DRAG_ZONE_DEADZONE = 10
			const ZONE_LABELS = { top: '停靠顶部', bottom: '停靠底部', left: '停靠左侧', right: '停靠右侧', center: '回到中间' }
			function zoneFor(x, y, w, h) {
				if (y < h * ZONE_EDGE) return 'top'
				if (y > h * (1 - ZONE_EDGE)) return 'bottom'
				if (x < w * ZONE_EDGE) return 'left'
				if (x > w * (1 - ZONE_EDGE)) return 'right'
				if (x >= w * ZONE_CENTER.x0 && x <= w * ZONE_CENTER.x1 && y >= h * ZONE_CENTER.y0 && y <= h * ZONE_CENTER.y1) return 'center'
				return null
			}
			function zoneRect(id, w, h) {
				switch (id) {
					case 'top': return { left: 0, top: 0, width: w, height: h * ZONE_EDGE }
					case 'bottom': return { left: 0, top: h * (1 - ZONE_EDGE), width: w, height: h * ZONE_EDGE }
					case 'left': return { left: 0, top: 0, width: w * ZONE_EDGE, height: h }
					case 'right': return { left: w * (1 - ZONE_EDGE), top: 0, width: w * ZONE_EDGE, height: h }
					default: return { left: w * ZONE_CENTER.x0, top: h * ZONE_CENTER.y0, width: w * (ZONE_CENTER.x1 - ZONE_CENTER.x0), height: h * (ZONE_CENTER.y1 - ZONE_CENTER.y0) }
				}
			}
			/* live rect of a card, relative to the frame (used by chrome handles, grab strips
			   and the dock host — always matches the actual grid placement) */
			function cardRect(key) {
				/* v1.15.1: 渲染路径（抓手条 / 停靠条）专用 —— 用 renderFrame() 而不是
				   resolveFrame()，避免在 React 渲染期间 rearm→notify。 */
				const f = renderFrame()
				if (f === null) return null
				const idx = key === 'sidebar' ? 0 : key === 'conversation' ? 1 : 2
				const el = f.children[idx]
				if (el === undefined) return null
				const fr = f.getBoundingClientRect()
				const r = el.getBoundingClientRect()
				if (r.width <= 0 || r.height <= 0) return null
				return { left: Math.round(r.left - fr.left), top: Math.round(r.top - fr.top), width: Math.round(r.width), height: Math.round(r.height) }
			}

			/* ---------- panel registry (ctx.dock) ---------- */
			const panelDefs = new Map()
			let activePanel = null
			/* v1.8: the plugin panel is the launcher + tabbed host. `panelVisible`
			   means at least one plugin panel is open (docked); the dock card /
			   classic overlay shows when the plugin panel itself is open OR any
			   plugin panel is open (opening a plugin implies opening the panel). */
			function panelVisible() {
				for (const id of panelDefs.keys()) {
					const p = layoutState.panels[id]
					if (p !== undefined && p.open && !p.float) return true
				}
				return false
			}
			function pluginPanelOpen() {
				return layoutState.pluginPanel.open || panelVisible()
			}
			/* v1.15.0: 标签顺序 = 打开顺序（先打开的靠左），不再是注册顺序。
			   每个面板的打开序号存在 layoutState.panels[id].order（持久化），排序规则：
			   ① 有序号的按序号升序；② 没有序号的（旧版 localStorage 恢复出来的、
			   或从未打开过的）按注册顺序排在有序号的前面 —— 与旧版观感一致，首次
			   打开后即补号。关闭标签不清除序号（其余标签的相对顺序不变），重新打开
			   会重新取号，因此「关掉再开」排到末尾；浮动 / 回停靠不取号，面板留在
			   原来的位置。 */
			function dockedInOpenOrder() {
				const rows = []
				let i = 0
				for (const id of panelDefs.keys()) {
					const p = layoutState.panels[id]
					if (p !== undefined && p.open && !p.float) rows.push({ id: id, i: i, order: typeof p.order === 'number' ? p.order : -1 })
					i++
				}
				rows.sort(function (a, b) {
					if (a.order !== b.order) return a.order - b.order
					return a.i - b.i
				})
				return rows.map(function (row) { return row.id })
			}
			function nextPanelOrder() {
				const seq = typeof layoutState.panelSeq === 'number' && Number.isFinite(layoutState.panelSeq) ? Math.floor(layoutState.panelSeq) : 0
				layoutState.panelSeq = seq + 1
				return layoutState.panelSeq
			}
			function ensureActive() {
				if (activePanel !== null) {
					const p = layoutState.panels[activePanel]
					if (p !== undefined && p.open && !p.float) return
				}
				/* 兜底选择：标签顺序里最左边的那个（= 最早打开且仍打开的面板） */
				const list = dockedInOpenOrder()
				activePanel = list.length > 0 ? list[0] : null
			}
			/* v1.15.0: 关闭当前激活标签时，激活它左边的邻居（没有左边就取右边），
			   与浏览器的标签关闭行为一致；由 closePanel 在改写状态之前调用。 */
			function activeAfterClosing(id) {
				const list = dockedInOpenOrder()
				const idx = list.indexOf(id)
				if (idx < 0) return null
				if (idx > 0) return list[idx - 1]
				return list.length > 1 ? list[idx + 1] : null
			}
			function closeDock() {
				for (const id of [...panelDefs.keys()]) {
					const p = layoutState.panels[id]
					if (p !== undefined) p.open = false
				}
				activePanel = null
				if (!collapsedDetails && layoutSvc !== undefined) layoutSvc.closeDetails()
				layoutState.dock.open = false
				layoutState.pluginPanel.open = false
				layoutState.pluginPanel.float = false
				saveLayoutState()
				applyLayout()
				notify()
			}
			/* ---------- v1.9.1: floating-card raise order ---------- */
			/* Floating cards share z-19 (DOM order decides stacking); clicking or
			   dragging a floating card raises it to 19 while the other floats drop
			   to 18, so the most recently touched card sits on top. Inline z-index
			   stays <= 19 on purpose: the drag/resize/close chrome lives in the
			   overlay layer (z-20) and a raised card must never cover its own
			   handles. Session-only state (never persisted). */
			let raisedCard = null
			function raiseCard(key) {
				if (raisedCard === key) return
				raisedCard = key
				if (resolveFrame() === null) return
				const keys = ['sidebar', 'conversation', 'dock']
				for (let i = 0; i < 3; i++) {
					const el = frame.children[i]
					if (el === undefined || el === null) continue
					const k = keys[i]
					if (layoutState[k].dock !== 'float') { el.style.zIndex = ''; continue }
					el.style.zIndex = k === key ? '19' : '18'
				}
			}
			function onCardPointerDown(e) {
				if (resolveFrame() === null || layoutState.mode !== 'card') return
				const keys = ['sidebar', 'conversation', 'dock']
				for (let i = 0; i < 3; i++) {
					const el = frame.children[i]
					if (el === undefined || el === null) continue
					if (el.hasAttribute('data-vsc-float') && el.contains(e.target)) { raiseCard(keys[i]); return }
				}
			}
			/* v1.12.4: read-or-create the persisted state row for a REGISTERED
			   panel. A missing row must never orphan the panel — the four dock
			   actions used to silently return on undefined (e.g. after
			   恢复默认布局 wiped layoutState.panels to {}). */
			function panelState(id) {
				let p = layoutState.panels[id]
				if (p === undefined && panelDefs.has(id)) {
					p = layoutState.panels[id] = { open: false, float: false, x: 140, y: 80, w: 560, h: 420 }
				}
				return p
			}
			/* v1.15.0: 注销一个面板（registerPanel 返回的 disposer 与内部路径共用）。
			   只在该 id 仍指向调用方注册的那个 def 时执行，避免「旧句柄误删后来者」。 */
			function unregisterPanel(id, def) {
				if (def !== undefined && panelDefs.get(id) !== def) return
				const p = layoutState.panels[id]
				if (p !== undefined) p.open = false
				panelDefs.delete(id)
				/* v1.8.8: drop the persisted panel state too, so uninstalled
				   plugins don't leave stale localStorage entries behind */
				delete layoutState.panels[id]
				ensureActive()
				saveLayoutState()
				applyLayout()
				notify()
			}
			const dockApi = {
				/* v1.15.0: dock API 版本号，供消费方做特性探测（focusPanel / has /
				   重复注册刷新语义）。消费方应写成 `dock.apiVersion >= 2` 之类的判断，
				   而不是靠 API 名字猜行为。 */
				apiVersion: 2,
				/* v1.15.0: 注册面板。相比旧版有两处**向后兼容的加强**：
				   ① 同一 id 重复注册不再返回空函数，而是把注册**刷新**成新的 def
				      （title / icon / mount 生效，open / float / 打开序号 / 窗口几何
				      全部保留），并返回一个真正可用的 disposer —— 旧实现返回 no-op，
				      导致「先注册新的、再丢弃旧句柄」的插件永远无法注销自己的面板；
				   ② disposer 带身份校验：只有当该 id 仍指向自己注册的那个 def 时才
				      注销，避免旧句柄误删后来者。
				   def 形状：{ id, title, icon?, mount(el) -> dispose? }。 */
				registerPanel(def) {
					if (def === null || typeof def !== 'object') throw new TypeError('dock.registerPanel(def): def 必须是对象')
					if (typeof def.id !== 'string' || def.id === '') throw new TypeError('dock.registerPanel(def): def.id 必须是非空字符串（它同时是持久化键，必须跨版本稳定）')
					if (typeof def.mount !== 'function') throw new TypeError('dock.registerPanel(def): def.mount(el) 必须是函数')
					const dispose = function () { unregisterPanel(def.id, def) }
					if (panelDefs.has(def.id)) {
						/* 刷新已有注册：不动打开状态 / 打开序号 / 窗口几何 */
						panelDefs.set(def.id, def)
						notify()
						return dispose
					}
					panelDefs.set(def.id, def)
					panelState(def.id)
					/* v1.12.12: ALWAYS re-render after a registration. The old
					   guard only notified when the newly created panel state was
					   already open — which is never true right after
					   panelState() initializes it to { open:false }. A plugin
					   registering while the dock host is already open (e.g.
					   file-explorer's dock service picked up after the panel
					   first rendered) therefore left the chip list stale until
					   some unrelated interaction forced a re-render — the
					   "操作一次插件面板才出现" bug. */
					notify()
					if (layoutState.panels[def.id].open) { ensureActive(); applyLayout(); }
					return dispose
				},
				openPanel(id) {
					const p = panelState(id)
					if (p === undefined) return
					/* v1.15.0: 只有「关闭 → 打开」才取新的打开序号（打开即排到标签
					   末尾）；对已打开的面板重复调用是幂等的，不改变它的位置。 */
					const wasOpen = p.open === true
					p.open = true
					if (!wasOpen || typeof p.order !== 'number') p.order = nextPanelOrder()
					layoutState.pluginPanel.open = true
					ensureActive()
					saveLayoutState()
					applyLayout()
					notify()
				},
				/* v1.15.0: 打开并切换到这个面板（芯片行 / 溢出菜单点击用）。
				   openPanel 保留「只打开、不抢焦点」的旧语义，供 file-explorer
				   之类的状态同步调用，所以焦点切换单独一个动词。 */
				focusPanel(id) {
					if (!panelDefs.has(id)) return
					const p = panelState(id)
					if (p === undefined) return
					if (p.open !== true) dockApi.openPanel(id)
					if (p.float !== true && activePanel !== id) { activePanel = id; notify() }
				},
				closePanel(id) {
					const p = panelState(id)
					if (p === undefined) return
					/* v1.15.0: 关闭当前激活标签时先把焦点交给它的邻居（左邻优先，
					   没有左邻取右邻），与浏览器标签行为一致 */
					if (activePanel === id) activePanel = activeAfterClosing(id)
					p.open = false
					ensureActive()
					/* v1.10.0: closing the last docked plugin keeps the panel open
					   showing the empty state — only the panel × (closeDock)
					   closes the whole panel */
					saveLayoutState()
					applyLayout()
					notify()
				},
				floatPanel(id) {
					const p = panelState(id)
					if (p === undefined) return
					p.float = true
					layoutState.pluginPanel.open = true
					ensureActive()
					saveLayoutState()
					applyLayout()
					notify()
				},
				dockPanel(id) {
					const p = panelState(id)
					if (p === undefined) return
					p.float = false
					layoutState.pluginPanel.open = true
					ensureActive()
					saveLayoutState()
					applyLayout()
					notify()
				},
				/* v1.7.10: read-side + subscription extensions so panel consumers
				   (e.g. dsh-file-explorer) can integrate with the dock host.
				   mode() — 'card' | 'classic'; isOpen(id) — live open state;
				   subscribe(fn) — fires on every engine notify (open/close/
				   float/dock/mode transitions). All additive: the pre-existing
				   API is unchanged and older consumers keep working. */
				mode() {
					return layoutState.mode
				},
				isOpen(id) {
					const p = layoutState.panels[id]
					return p !== undefined && p.open
				},
				/* v1.15.0: 该 id 是否已注册（消费方注册前自检 / 冲突排查用） */
				has(id) {
					return panelDefs.has(id)
				},
				/* v1.15.0: 当前激活（正在显示）的标签 id，没有则 null —— 供面板
				   自己判断「我是不是当前可见的那个」 */
				active() {
					const p = activePanel !== null ? layoutState.panels[activePanel] : undefined
					return p !== undefined && p.open && !p.float ? activePanel : null
				},
				subscribe(fn) {
					return subscribe(fn)
				}
			}

			/* ---------- frame / columns ---------- */
			let frame = null
			let disposed = false
			let mo = null
			let ro = null
			let settingsMo = null
			let settingsTimer = null
			let healthTimer = null
			let settingsOpen = false
			let collapsedSidebar = false
			let collapsedDetails = false
			let geom = { w: 0, h: 0 }
			const layoutSvc = ctx.get('layout')

			function updateSettingsState() {
				/* v1.8.1: self-heal — if the app frame was replaced wholesale (React
				   remount) while we were not looking, re-locate it; otherwise the
				   dock host keeps measuring a detached element and the plugin panel
				   would not render until a drag forces a refresh. */
				if (frame !== null && !document.contains(frame)) {
					teardown()
					init()
					return
				}
				const seat = document.querySelector('[data-slot="sidebar.settings"]')
				let open = false
				/* v1.9.1: SettingsRoot renders a Fragment — the trigger button FIRST,
				   then the fixed overlay modal — so firstElementChild is always the
				   trigger (position static) and the old check never detected the
				   modal. Scan every direct child for the position:fixed overlay. */
				if (seat !== null) {
					for (const el of seat.children) {
						if (!(el instanceof HTMLElement)) continue
						try {
							if (window.getComputedStyle(el).position === 'fixed') { open = true; break }
						} catch (e) { /* keep scanning */ }
					}
				}
				/* v1.8.9: mirror the settings-open state onto the frame so CSS can
				   lift the floated sidebar card (its stacking context traps the
				   fixed settings modal) above every other surface. */
				if (frame !== null) frame.toggleAttribute('data-vsc-settings-open', open)
				if (open !== settingsOpen) {
					settingsOpen = open
					notify()
				}
			}
			function watchSettings() {
				const seat = document.querySelector('[data-slot="sidebar.settings"]')
				if (seat === null) return false
				settingsMo = new MutationObserver(updateSettingsState)
				settingsMo.observe(seat, { childList: true, subtree: false })
				if (settingsTimer === null) settingsTimer = window.setInterval(updateSettingsState, 400)
				updateSettingsState()
				return true
			}
			let settingsAttempts = 0
			function waitSettings() {
				if (disposed) return
				if (watchSettings()) return
				settingsAttempts += 1
				if (settingsAttempts > 120) return
				setTimeout(waitSettings, 250)
			}

			function findFrame() {
				const root = document.querySelector('[data-slot="root"]')
				return root !== null && root.firstElementChild !== null ? root.firstElementChild : null
			}
			/* v1.13.1: the frame node is OWNED by the host — any plugin's hot
			   reload (HMR "rebuilt" frame) can re-render the shell and replace or
			   detach it. Every engine entry point re-resolves through
			   resolveFrame() instead of trusting the cached reference: measuring
			   a detached element is exactly how the dock host ends up rendering
			   at zero rects (panel "gone") or the layout looks crashed after an
			   unrelated plugin update. */
			function frameIsLive() {
				return frame !== null && frame.isConnected === true
			}
			/* v1.15.1: 宿主重渲染会**替换整个框架节点**（不只是它的子节点）。旧的
			   ResizeObserver / MutationObserver 仍然盯着那个被摘除的节点：它的尺寸
			   变成 0 且再也不会变化，于是 `geom` 永久停在 {0,0}；而 Chrome / DockHost
			   的渲染门 `geom.w <= 0` 直接 return null —— 引擎"活着但什么都不画"
			   （症状：更新任意插件后 ui-beautify 的覆盖层与插件面板整体消失，而
			   `data-vsc-layout`、注入的样式、持久化状态全都还在）。
			   修复：记住观察者当前挂在哪个节点上（observedFrame），一旦
			   resolveFrame() 解析出的节点换了身份，就断开旧观察者、按新节点重新测量
			   并重新武装（rearm）。 */
			let observedFrame = null
			function measure() {
				if (frame === null) { geom = { w: 0, h: 0 }; return geom }
				const rect = frame.getBoundingClientRect()
				geom = { w: Math.round(rect.width), h: Math.round(rect.height) }
				return geom
			}
			/* 渲染期专用：只更新引用、只读尺寸，绝不 notify()（渲染期间 setState 会触发
			   React "cannot update a component while rendering"）。观察者的重新武装交给
			   resolveFrame()（事件/定时器路径）与 healthCheck。 */
			function renderFrame() {
				if (!frameIsLive()) frame = findFrame()
				return frame
			}
			function renderGeom() {
				if (geom.w > 0 && geom.h > 0 && frameIsLive()) return geom
				if (renderFrame() !== null) measure()
				return geom
			}
			/* 把观察者/监听/测量全部重新挂到 `node` 上。只在框架身份变化时调用。 */
			function rearm(node) {
				if (mo !== null) { try { mo.disconnect() } catch (err) {} mo = null }
				if (ro !== null) { try { ro.disconnect() } catch (err) {} ro = null }
				if (observedFrame !== null) { try { observedFrame.removeEventListener('pointerdown', onCardPointerDown, true) } catch (err) {} }
				observedFrame = node
				frame = node
				measure()
				tagColumns()
				syncCollapsed()
				applyLayout()
				watch()
				if (settingsMo === null) waitSettings()
				notify()
			}
			function resolveFrame() {
				if (!frameIsLive()) frame = findFrame()
				/* disposed 之后绝不 rearm：teardown() 会把 observedFrame 清空，
				   若不拦住，removeAll() 里的这次解析会重新武装观察者并在卸载过程中
				   再跑一遍 applyLayout/notify。 */
				if (!disposed && frame !== null && frame !== observedFrame) rearm(frame)
				return frame
			}
			function setVar(name, value) { if (frame !== null) frame.style.setProperty(name, value) }
			function removeVar(name) { if (frame !== null) frame.style.removeProperty(name) }
			function tagColumns() {
				if (resolveFrame() === null) return
				const els = [frame.children[0], frame.children[1], frame.children[2]]
				const cards = ['sidebar', 'conversation', 'dock']
				for (let i = 0; i < 3; i++) {
					const el = els[i]
					if (el === undefined) continue
					if (el.dataset.vscCard === undefined) el.dataset.vscCard = cards[i]
				}
			}

			/* ---------- layout application ---------- */
			/* v1.8: the dock card is owned by the plugin panel — the native details
			   column state no longer drives its visibility in card mode. */
			function dockVisible() {
				return layoutState.dock.open || pluginPanelOpen()
			}
			/* v1.12.0: classic-mode three-column plugin panel. The official
			   AppFrame is already a three-track grid (sidebar | center | details);
			   while the plugin panel is open + docked we take over the third
			   track (frame.children[2], the details column element) as the panel
			   column: stamp the frame so CSS can override the core's inline
			   grid-template-columns, resolve the LIVE sidebar track from that
			   inline style (the core re-renders it on every store change), and
			   close the native details panel so it cannot fight for the third
			   track (it stays closed after the panel closes — user's choice). */
			function sidebarTrack() {
				try {
					const inline = frame.style.gridTemplateColumns
					if (typeof inline === 'string' && inline.length > 0) {
						const first = inline.trim().split(/\s+/)[0]
						if (/^\d+px$/.test(first)) return first
					}
				} catch (e) { /* fall through to the default */ }
				return '280px'
			}
			/* ---------- effective-size constraints (v1.12.13) ----------
			   The grid's fixed tracks must never overflow the frame. The stored
			   width (layoutState) is a PREFERENCE: every applyLayout computes
			   an effective width = min(preference, available) WITHOUT mutating
			   the stored value, so growing the window later restores the
			   preference automatically. The center/free track keeps its
			   CONV_MIN_W floor only while a card actually OCCUPIES the center —
			   an empty middle (e.g. the conversation snapped right while the
			   sidebar stays left) must not hold 480px hostage; the docked side
			   card may use that space up to its effective cap. The moment
			   another card snaps into the center, the floor comes back and the
			   side cards are re-constrained (per-card cap = frame − other side
			   cards − 480), so the center occupant always gets >= 480px. */
			function centerOccupied() {
				const dVis = dockVisible()
				for (const k of ['sidebar', 'conversation', 'dock']) {
					if (k === 'dock' && !dVis) continue
					if (layoutState[k].dock === 'center') return true
				}
				return false
			}
			const storedW = (k) => (k === 'sidebar' && collapsedSidebar ? SIDEBAR_RAIL : layoutState[k].width)
			/** Effective widths for the fixed left/right-docked cards. Returns
			 *  { list, widths } index-aligned; values are the stored preference
			 *  clamped to the frame budget (never mutates layoutState). */
			function effectiveSideWidths(W) {
				const list = []
				const dVis = dockVisible()
				for (const k of ['sidebar', 'conversation', 'dock']) {
					if (k === 'dock' && !dVis) continue
					const d = layoutState[k].dock
					if (d === 'left' || d === 'right') list.push(k)
				}
				if (list.length === 0) return { list: list, widths: [] }
				const centerFloor = centerOccupied() ? CONV_MIN_W : 0
				const budget = Math.max(0, W - centerFloor)
				const eff = list.map(storedW)
				const raw = (W <= 0) ? eff.slice() : null
				for (let pass = 0; pass < 6; pass++) {
					let changed = false
					for (let i = 0; i < list.length; i++) {
						if (list[i] === 'sidebar' && collapsedSidebar) continue /* rail is fixed at SIDEBAR_RAIL */
						let others = 0
						for (let j = 0; j < list.length; j++) if (j !== i) others += eff[j]
						/* v1.12.14: soft per-card floor — the conversation keeps
						   at least CONV_MIN_W as long as the frame budget allows,
						   and yields (down to 120) when the window is too
						   narrow; the cap stays budget − other cards. */
						const cap = Math.max(120, budget - others)
						const floor = Math.min(DOCK_MIN_W[list[i]] || 120, cap)
						const v = Math.min(Math.max(eff[i], floor), cap)
						if (v !== eff[i]) { eff[i] = v; changed = true }
					}
					if (!changed) break
				}
				let total = eff.reduce(function (s, v) { return s + v }, 0)
				if (total > budget && budget > 0) {
					/* degenerate: everything at its 120px floor and the grid
					   would still spill — shrink proportionally (keeps >= 80px)
					   so the frame stops overflowing. */
					const scale = budget / total
					for (let i = 0; i < list.length; i++) {
						if (list[i] === 'sidebar' && collapsedSidebar) continue
						eff[i] = Math.max(80, Math.round(eff[i] * scale))
					}
				}
				return raw === null ? { list: list, widths: eff } : { list: list, widths: raw }
			}
			/** Effective heights for fixed top/bottom-docked cards — same
			 *  policy as effectiveSideWidths; the main row keeps 120px
			 *  headroom (the historical resize cap) shared by both cards. */
			function effectiveSideHeights(H) {
				const list = []
				const dVis = dockVisible()
				for (const k of ['sidebar', 'conversation', 'dock']) {
					if (k === 'dock' && !dVis) continue
					const d = layoutState[k].dock
					if (d === 'top' || d === 'bottom') list.push(k)
				}
				if (list.length === 0) return { list: list, heights: [] }
				const budget = Math.max(0, H - 120)
				const eff = list.map(function (k) { return layoutState[k].height })
				const raw = (H <= 0) ? eff.slice() : null
				for (let pass = 0; pass < 6; pass++) {
					let changed = false
					for (let i = 0; i < list.length; i++) {
						let others = 0
						for (let j = 0; j < list.length; j++) if (j !== i) others += eff[j]
						const v = Math.min(eff[i], Math.max(120, budget - others))
						if (v !== eff[i]) { eff[i] = v; changed = true }
					}
					if (!changed) break
				}
				let total = eff.reduce(function (s, v) { return s + v }, 0)
				if (total > budget && budget > 0) {
					const scale = budget / total
					for (let i = 0; i < list.length; i++) eff[i] = Math.max(80, Math.round(eff[i] * scale))
				}
				return raw === null ? { list: list, heights: eff } : { list: list, heights: raw }
			}
			function applyClassicLayout() {
				if (resolveFrame() === null) return
				const on = pluginPanelOpen() && !layoutState.pluginPanel.float
				if (!on) {
					if (frame.hasAttribute('data-vsc-pp3')) {
						frame.removeAttribute('data-vsc-pp3')
						const col = frame.children[2]
						if (col !== undefined && col !== null) col.removeAttribute('data-vsc-ppcol')
						removeVar('--vsc-pp-cols')
					}
					return
				}
				if (!collapsedDetails && layoutSvc !== undefined) layoutSvc.closeDetails()
				frame.setAttribute('data-vsc-pp3', '')
				const col = frame.children[2]
				if (col !== undefined && col !== null) col.setAttribute('data-vsc-ppcol', '')
				/* v1.12.13: the panel track uses the effective width — the stored
				   preference may exceed frame − sidebar − CONV_MIN_W after a
				   window shrink; capping the STAMP (not the state) keeps the
				   grid inside the frame and restores the preference on grow. */
				const W = Math.round(frame.getBoundingClientRect().width)
				const sbW = collapsedSidebar ? SIDEBAR_RAIL : parseFloat(sidebarTrack()) || 280
				const ppW = W > 0 ? Math.min(layoutState.pluginPanel.width, Math.max(240, W - sbW - CONV_MIN_W)) : layoutState.pluginPanel.width
				setVar('--vsc-pp-cols', sidebarTrack() + ' minmax(' + CONV_MIN_W + 'px,1fr) ' + ppW + 'px')
			}
			function applyLayout() {
				if (resolveFrame() === null) return
				if (layoutState.mode !== 'card') {
					/* v1.12.3: ALWAYS removeAll() first — switching from card mode
					   leaves data-vsc-layout / --vsc-* / data-vsc-card behind, which
					   kept the card grid alive in classic mode (center column stuck
					   at the card width, core resize handles hidden by the
					   [data-vsc-layout] [data-side] rules). Classic mode then
					   re-stamps the three-column panel when it is open. */
					removeAll()
					if (layoutState.mode === 'classic') applyClassicLayout()
					notify()
					return
				}
				frame.setAttribute('data-vsc-layout', '')
				/* mode switch from classic with the panel open: clear the
				   three-column markers so the two grid overrides cannot conflict */
				frame.removeAttribute('data-vsc-pp3')
				const prevCol = frame.children[2]
				if (prevCol !== undefined && prevCol !== null) prevCol.removeAttribute('data-vsc-ppcol')
				removeVar('--vsc-pp-cols')
				const sb = layoutState.sidebar
				const cv = layoutState.conversation
				const dk = layoutState.dock
				const sbF = sb.dock === 'float'
				const cvF = cv.dock === 'float'
				const dkF = dk.dock === 'float'
				const dVis = dockVisible()

				const sbEl = frame.children[0]
				const cvEl = frame.children[1]
				const dkEl = frame.children[2]
				if (sbEl) { sbEl.dataset.vscCard = 'sidebar'; sbEl.toggleAttribute('data-vsc-float', sbF); sbEl.toggleAttribute('data-vsc-hidden', false) }
				if (cvEl) { cvEl.dataset.vscCard = 'conversation'; cvEl.toggleAttribute('data-vsc-float', cvF); cvEl.toggleAttribute('data-vsc-hidden', false) }
				if (dkEl) {
					dkEl.dataset.vscCard = 'dock'
					dkEl.toggleAttribute('data-vsc-float', dkF)
					dkEl.toggleAttribute('data-vsc-hidden', !dVis)
				}

				/* --- five-region slot solver ---
				   top/bottom cards span the full width in their own row; left/center/right
				   cards share the main row. The dock card only claims a slot while visible. */
				const slots = { top: null, bottom: null, left: null, center: null, right: null }
				const isF = { sidebar: sbF, conversation: cvF, dock: dkF }
				for (const name of ['sidebar', 'conversation', 'dock']) {
					if (isF[name]) continue
					if (name === 'dock' && !dVis) continue
					const pos = layoutState[name].dock
					if (pos === 'float') continue
					slots[pos] = name
				}
				const colOf = {}
				const rowOf = {}
				const cols = []
				/* v1.12.13: effective (frame-constrained) side sizes. The stored
				   width stays as the preference; the grid stamps the effective
				   value so fixed tracks + the CONV_MIN_W/0 floor never exceed
				   the frame. */
				const frRect = frame.getBoundingClientRect()
				const W = Math.round(frRect.width)
				const H = Math.round(frRect.height)
				const effSide = effectiveSideWidths(W)
				const effVert = effectiveSideHeights(H)
				const effW = {}
				for (let i = 0; i < effSide.list.length; i++) effW[effSide.list[i]] = effSide.widths[i]
				const effH = {}
				for (let i = 0; i < effVert.list.length; i++) effH[effVert.list[i]] = effVert.heights[i]
				const sideW = (k) => effW[k] !== undefined ? effW[k] : storedW(k)
				const sideH = (k) => effH[k] !== undefined ? effH[k] : layoutState[k].height
				/* v1.12.13: the free track keeps the CONV_MIN_W floor only while
				   a card OCCUPIES the center; an empty middle must not hold
				   480px hostage (the conversation snapped right can use it up
				   to its effective cap). */
				const centerOn = centerOccupied()
				const freeCol = centerOn ? 'minmax(' + CONV_MIN_W + 'px,1fr)' : 'minmax(0px,1fr)'
				if (slots.left) { cols.push(sideW(slots.left) + 'px'); colOf[slots.left] = cols.length }
				if (slots.center) { cols.push(freeCol); colOf[slots.center] = cols.length }
				/* free middle track sits BETWEEN the side cards — a lone
				   right-docked card gets [free, fixed] so it truly docks right
				   (the old fallback appended the free track AFTER the fixed
				   one, placing the card in the leftmost column). */
				else if (slots.left !== null || slots.right !== null) cols.push(freeCol)
				if (slots.right) { cols.push(sideW(slots.right) + 'px'); colOf[slots.right] = cols.length }
				if (cols.length === 0) cols.push(freeCol)

				const rows = []
				let mainRow = 1
				if (slots.top) { rows.push(sideH(slots.top) + 'px'); rowOf[slots.top] = 1; mainRow = 2 }
				rows.push('minmax(0,1fr)')
				for (const k of [slots.left, slots.center, slots.right]) {
					if (k !== null) rowOf[k] = mainRow
				}
				if (slots.bottom) { rows.push(sideH(slots.bottom) + 'px'); rowOf[slots.bottom] = rows.length }

				const cardCol = (k) => {
					if (isF[k]) return 'auto'
					if (slots.top === k || slots.bottom === k) return '1 / -1'
					return colOf[k] !== undefined ? String(colOf[k]) : 'auto'
				}
				const cardRow = (k) => (isF[k] || rowOf[k] === undefined) ? 'auto' : String(rowOf[k])
				const edgeOf = (k) => {
					if (isF[k]) return null
					if (k === 'dock' && !dVis) return null
					const dock = layoutState[k].dock
					if (dock === 'left') return 'right'
					if (dock === 'right') return 'left'
					if (dock === 'top') return 'bottom'
					if (dock === 'bottom') return 'top'
					/* center slot: no divider, but still stamp 'none' so shipped borders
					   (sidebar border-right, details border-left) are cleared — otherwise a
					   center-docked sidebar/dock keeps a stray native line on its right edge */
					return 'none'
				}
				const applyEdge = (el, k) => {
					if (el === undefined) return
					const e = edgeOf(k)
					if (e === null) el.removeAttribute('data-vsc-edge')
					else el.setAttribute('data-vsc-edge', e)
				}
				applyEdge(sbEl, 'sidebar'); applyEdge(cvEl, 'conversation'); applyEdge(dkEl, 'dock')

				frame.toggleAttribute('data-vsc-dock-bottom', slots.bottom !== null)

				setVar('--vsc-cols', cols.join(' '))
				setVar('--vsc-rows', rows.join(' '))
				setVar('--vsc-sb-col', cardCol('sidebar')); setVar('--vsc-sb-row', cardRow('sidebar'))
				setVar('--vsc-cv-col', cardCol('conversation')); setVar('--vsc-cv-row', cardRow('conversation'))
				setVar('--vsc-dk-col', cardCol('dock')); setVar('--vsc-dk-row', cardRow('dock'))
				setVar('--vsc-sb-x', sb.fx + 'px'); setVar('--vsc-sb-y', sb.fy + 'px'); setVar('--vsc-sb-w', (sbF && collapsedSidebar ? SIDEBAR_RAIL : sb.fw) + 'px'); setVar('--vsc-sb-h', sb.fh + 'px')
				setVar('--vsc-cv-x', cv.fx + 'px'); setVar('--vsc-cv-y', cv.fy + 'px'); setVar('--vsc-cv-w', cv.fw + 'px'); setVar('--vsc-cv-h', cv.fh + 'px')
				setVar('--vsc-dk-x', dk.fx + 'px'); setVar('--vsc-dk-y', dk.fy + 'px'); setVar('--vsc-dk-w', dk.fw + 'px'); setVar('--vsc-dk-h', dk.fh + 'px')
				notify()
			}
			function removeAll() {
				if (resolveFrame() === null) return
				frame.removeAttribute('data-vsc-layout')
				frame.removeAttribute('data-vsc-pp3')
				frame.removeAttribute('data-vsc-dock-bottom')
				frame.removeAttribute('data-vsc-dragging')
				frame.removeAttribute('data-vsc-settings-open')
				const names = ['--vsc-cols', '--vsc-rows', '--vsc-sb-col', '--vsc-sb-row', '--vsc-cv-col', '--vsc-cv-row', '--vsc-dk-col', '--vsc-dk-row',
					'--vsc-sb-x', '--vsc-sb-y', '--vsc-sb-w', '--vsc-sb-h', '--vsc-cv-x', '--vsc-cv-y', '--vsc-cv-w', '--vsc-cv-h', '--vsc-dk-x', '--vsc-dk-y', '--vsc-dk-w', '--vsc-dk-h', '--vsc-pp-cols']
				for (const n of names) removeVar(n)
				for (let i = 0; i < 3; i++) {
					const el = frame.children[i]
					if (el !== undefined) {
						el.removeAttribute('data-vsc-card')
						el.removeAttribute('data-vsc-float')
						el.removeAttribute('data-vsc-hidden')
						el.removeAttribute('data-vsc-edge')
						el.removeAttribute('data-vsc-ppcol')
						/* v1.9.1: drop any inline raise z-index */
						el.style.zIndex = ''
					}
				}
				raisedCard = null
			}

			function syncCollapsed() {
				if (resolveFrame() === null) return
				const cs = frame.hasAttribute('data-sidebar-collapsed')
				const cd = frame.hasAttribute('data-details-collapsed')
				const changed = cs !== collapsedSidebar || cd !== collapsedDetails
				collapsedSidebar = cs
				collapsedDetails = cd
				if (changed) applyLayout()
			}

			/* ---------- v1.13.0 起移除：宿主导入 data-actions-reveal 原生机制，不再需要。 ---------- */

			/* ---------- drag: shared session helper (v1.8.8) ---------- */
			/* Every drag (card resize, card dock, plugin-panel edge/float, plugin
			   float) runs through startDragSession: window pointer listeners +
			   rAF throttle + the frame dragging marker + a cleanup registry.
			   The registry lets teardown() abort any in-flight drag when the
			   plugin unloads, so no window listener or marker can leak. */
			let dragState = null
			const activeDrags = new Set()
			function startDragSession(opts) {
				if (resolveFrame() === null) return null
				beginDrag()
				const read = opts.read
				const onStep = opts.onStep
				const onUp = opts.onUp
				const onEsc = opts.onEsc
				const onCleanup = opts.onCleanup
				let latest = opts.initial
				let raf = null
				let settled = false
				function settle() {
					if (settled) return
					settled = true
					window.removeEventListener('pointermove', move)
					window.removeEventListener('pointerup', up)
					window.removeEventListener('pointercancel', up)
					if (onEsc !== undefined) window.removeEventListener('keydown', esc)
					if (raf !== null) { cancelAnimationFrame(raf); raf = null }
					endDrag()
					if (onCleanup !== undefined) { try { onCleanup() } catch (err) {} }
					activeDrags.delete(settle)
				}
				function move(ev) { latest = read(ev); if (raf === null) raf = requestAnimationFrame(step) }
				function step() {
					raf = null
					try { onStep(latest) } catch (err) { console.error('[dsh-ui-beautify] drag step failed:', err); settle() }
				}
				function up() {
					/* apply the final (possibly un-flushed) position exactly once */
					if (raf !== null) { cancelAnimationFrame(raf); raf = null; try { onStep(latest) } catch (err) {} }
					settle()
					try { onUp(latest) } catch (err) { console.error('[dsh-ui-beautify] drag up failed:', err) }
				}
				function esc(ev) {
					if (onEsc !== undefined && onEsc(ev)) settle()
				}
				window.addEventListener('pointermove', move)
				window.addEventListener('pointerup', up)
				window.addEventListener('pointercancel', up)
				if (onEsc !== undefined) window.addEventListener('keydown', esc)
				activeDrags.add(settle)
				return settle
			}

			/* ---------- drag: resize ---------- */
			/* docked resize kinds: '<cardKey>-<side>' where side is the dragged edge of a
			   docked card (left/right grow width, top/bottom grow height) */
			/* v1.12.9: total width of the fixed columns OPPOSITE the resized card
			   (docked left/right, non-float). The growth cap must leave room for
			   them PLUS the center floor, otherwise the grid overflows the frame
			   (frame - CONV_MIN_W alone forgot the opposite column: sidebar 280 +
			   center 480 + card(frame-480) = frame + 280 → overflow).
			   v1.12.13: the opposite widths are the EFFECTIVE (frame-constrained)
			   ones — the stored preference may exceed the visible track after a
			   window shrink, and capping against it would under-estimate the
			   growth room. The center floor is dynamic: 480 only while a card
			   occupies the center (an empty middle frees the space). */
			function oppositeSideWidth(card, rect) {
				const W = Math.round(rect.width)
				const eff = effectiveSideWidths(W)
				let total = 0
				for (let i = 0; i < eff.list.length; i++) {
					if (eff.list[i] !== card) total += eff.widths[i]
				}
				return total
			}
			function applyDockedResize(kind, p, startX, startY, base, rect) {
				const dash = kind.indexOf('-')
				const card = kind.slice(0, dash)
				const side = kind.slice(dash + 1)
				const c = layoutState[card]
				if (side === 'left' || side === 'right') {
					/* v1.12.7: the docked min width back to the v1.12.4 floor is
					   120 for the sidebar/dock cards — the v1.12.5 per-card raise
					   (dock 280) blocked squeezing the plugin panel, which users
					   rely on (and the squeeze gestures: sidebar <240 collapses,
					   dock <140 closes).
					   v1.12.14: the conversation card keeps CONV_MIN_W instead —
					   its header button row / composer tool row overlap below
					   480px. The min yields to the frame budget (min(designMin,
					   maxW)) so a narrow window never deadlocks the drag or
					   overflows the grid. */
					const centerFloor = centerOccupied() ? CONV_MIN_W : 0
					const maxW = Math.max(120, rect.width - oppositeSideWidth(card, rect) - centerFloor)
					const minW = Math.min(DOCK_MIN_W[card] || 120, maxW)
					const w = clamp(side === 'right' ? base.s + (p.x - startX) : base.s + (startX - p.x), minW, maxW)
					c.width = w
				} else {
					/* v1.12.7: min height back to the v1.12.4 floor (120). */
					const minH = 120
					/* v1.12.13: height cap = frame − the other top/bottom cards'
					   effective heights (the main row keeps 120px headroom). */
					const effV = effectiveSideHeights(Math.round(rect.height))
					let otherH = 0
					for (let i = 0; i < effV.list.length; i++) {
						if (effV.list[i] !== card) otherH += effV.heights[i]
					}
					const maxH = Math.max(minH, rect.height - otherH - 120)
					const h = clamp(side === 'bottom' ? base.s + (p.y - startY) : base.s + (startY - p.y), minH, maxH)
					c.height = h
				}
				applyLayout()
			}
			function applyFloatResize(card, dir, p, startX, startY, base, rect) {
				const minW = (card === 'sidebar' && collapsedSidebar) ? SIDEBAR_RAIL : FLOAT_MIN_W[card]
				const minH = FLOAT_MIN_H[card]
				const dx = p.x - startX
				const dy = p.y - startY
				let fx = base.fx, fy = base.fy, fw = base.fw, fh = base.fh
				if (dir.includes('e')) fw = clamp(base.fw + dx, minW, Math.max(minW, rect.width - base.fx))
				if (dir.includes('w')) {
					fw = clamp(base.fw - dx, minW, base.fx + base.fw)
					fx = base.fx + base.fw - fw
				}
				if (dir.includes('s')) fh = clamp(base.fh + dy, minH, Math.max(minH, rect.height - base.fy))
				if (dir.includes('n')) {
					fh = clamp(base.fh - dy, minH, base.fy + base.fh)
					fy = base.fy + base.fh - fh
				}
				layoutState[card].fx = fx
				layoutState[card].fy = fy
				layoutState[card].fw = fw
				layoutState[card].fh = fh
				const pfx = cardPrefix(card)
				setVar('--vsc-' + pfx + '-x', fx + 'px')
				setVar('--vsc-' + pfx + '-y', fy + 'px')
				setVar('--vsc-' + pfx + '-w', fw + 'px')
				setVar('--vsc-' + pfx + '-h', fh + 'px')
			}
			function startDrag(kind, card, e) {
				if (resolveFrame() === null) return
				raiseCard(card)
				e.preventDefault()
				e.stopPropagation()
				const startX = e.clientX
				const startY = e.clientY
				const floatResize = kind.startsWith('float-')
				const side = floatResize ? '' : kind.slice(kind.indexOf('-') + 1)
				/* v1.12.13: the resize base is the card's ACTUAL current size
				   (live DOM rect), not the stored preference — after a window
				   shrink the effective width is smaller than the stored width,
				   and a stale base would make the card jump on the first move
				   (640 stored vs 440 visible: edge at 440 but width 640). */
				let baseS = 0
				if (!floatResize) {
					const r = cardRect(card)
					if (r !== null) {
						baseS = side === 'left' || side === 'right' ? r.width : r.height
					} else {
						baseS = side === 'left' || side === 'right'
							? (card === 'sidebar' && collapsedSidebar ? SIDEBAR_RAIL : layoutState[card].width)
							: layoutState[card].height
					}
				}
				const base = {
					s: baseS,
					fx: layoutState[card].fx, fy: layoutState[card].fy,
					fw: (card === 'sidebar' && collapsedSidebar ? SIDEBAR_RAIL : layoutState[card].fw), fh: layoutState[card].fh
				}
				function applyDrag(p) {
					const rect = frame.getBoundingClientRect()
					if (floatResize) applyFloatResize(card, kind.slice(6), p, startX, startY, base, rect)
					else applyDockedResize(kind, p, startX, startY, base, rect)
					notify()
				}
				startDragSession({
					initial: { x: startX, y: startY },
					read: (ev) => ({ x: ev.clientX, y: ev.clientY }),
					onStep: applyDrag,
					onUp: function () {
						/* the session already applied the final position (helper) */
						/* legacy squeeze behaviors, preserved per card role:
						   sidebar squeezed to a rail collapses it; a dock card squeezed away closes it */
						if (!floatResize && card === 'sidebar' && side === 'right' && layoutState.sidebar.width < 240) {
							layoutState.sidebar.width = 280
							if (layoutSvc !== undefined) { if (!collapsedSidebar) layoutSvc.toggleSidebar() }
							else { collapsedSidebar = true; applyLayout() }
						}
						/* v1.12.7: squeeze-to-close restored (v1.12.4 behavior) —
						   the docked min width is 120 again, so dragging the dock
						   card below 140 and releasing closes it, exactly as before
						   v1.12.5 removed the gesture. */
						if (!floatResize && card === 'dock' && side === 'left' && layoutState.dock.width < 140) {
							layoutState.dock.width = 400
							/* v1.8: squeezing the dock card away closes the plugin panel too */
							layoutState.pluginPanel.open = false
							layoutState.pluginPanel.float = false
							if (layoutSvc !== undefined) { if (!collapsedDetails) layoutSvc.closeDetails(); layoutState.dock.open = false }
							else { collapsedDetails = true; applyLayout() }
						}
						if (floatResize && card === 'sidebar' && collapsedSidebar && layoutSvc !== undefined) {
							layoutSvc.toggleSidebar()
						}
						saveLayoutState()
						applyLayout()
						notify()
					}
				})
			}
			function resetWidth(key, side) {
				const c = layoutState[key]
				if (side === 'left' || side === 'right') c.width = LAYOUT_DEFAULTS[key].width
				else c.height = LAYOUT_DEFAULTS[key].height
				applyLayout()
				saveLayoutState()
			}

			/* ---------- drag: dock (detach / follow / drop) ---------- */
			function startDockDrag(card, e) {
				if (resolveFrame() === null) return
				raiseCard(card)
				e.preventDefault()
				e.stopPropagation()
				const c = layoutState[card]
				const idx = card === 'sidebar' ? 0 : card === 'conversation' ? 1 : 2
				if (c.dock !== 'float') {
					/* v1.8.8: record the card rect FRAME-RELATIVE (same convention as
					   cardRect) — viewport coordinates would offset the float
					   position whenever the frame is not at the viewport origin. */
					const fr = frame.getBoundingClientRect()
					const el = frame.children[idx]
					const rect = el !== undefined ? el.getBoundingClientRect() : null
					if (rect !== null && rect.width > 0) {
						c.fx = Math.round(rect.left - fr.left)
						c.fy = Math.round(rect.top - fr.top)
						c.fw = Math.round(rect.width)
						c.fh = Math.round(rect.height)
					}
					c.dock = 'float'
					clampFloat()
					applyLayout()
				}
				dragState = {
					card: card,
					startX: e.clientX,
					startY: e.clientY,
					zone: null,
					f0: { fx: c.fx, fy: c.fy }
				}
				/* v1.12.9: the user took this card by hand — it no longer counts
				   as an evicted card waiting to return to a freed region. */
				evictFrom.delete(card)
				/* v1.8.6: raise the dragged card above every surface (z-35) so it
				   never slides under the plugin panel or another floated card. */
				const dragEl = frame.children[idx]
				if (dragEl !== undefined && dragEl !== null) dragEl.setAttribute('data-vsc-dragtop', '')
				notify()
				startDragSession({
					initial: { x: e.clientX, y: e.clientY },
					read: (ev) => ({ x: ev.clientX, y: ev.clientY }),
					onStep: function (p) {
						const rect = frame.getBoundingClientRect()
						const w = rect.width
						const h = rect.height
						/* v1.12.10: drag-start threshold — until the pointer has
						   moved at least DRAG_ZONE_DEADZONE px from the press
						   point, the zone is forced to null so a grab started
						   near a region edge (e.g. the conversation card's top
						   strip, which sits inside the top 8% band) cannot
						   instantly light up the full-width top/bottom hint and
						   appear to "bleed" across the left column. The zone
						   starts counting only after real movement. */
						const dx0 = p.x - dragState.startX
						const dy0 = p.y - dragState.startY
						const zone = (dx0 * dx0 + dy0 * dy0) < DRAG_ZONE_DEADZONE * DRAG_ZONE_DEADZONE
							? null
							: zoneFor(p.x - rect.left, p.y - rect.top, w, h)
						if (zone !== dragState.zone) {
							dragState.zone = zone
							notify()
						}
						if (layoutState[card].dock === 'float') {
							const dx = p.x - dragState.startX
							const dy = p.y - dragState.startY
							layoutState[card].fx = clamp(dragState.f0.fx + dx, 0, Math.max(0, w - layoutState[card].fw))
							layoutState[card].fy = clamp(dragState.f0.fy + dy, 0, Math.max(0, h - layoutState[card].fh))
							const pfx = cardPrefix(card)
							setVar('--vsc-' + pfx + '-x', layoutState[card].fx + 'px')
							setVar('--vsc-' + pfx + '-y', layoutState[card].fy + 'px')
							notify()
						}
					},
					onUp: function () {
						const z = dragState.zone
						if (z !== null) setDock(card, z)
						else if (layoutState[card].dock === 'float') saveLayoutState()
						dragState = null
						notify()
					},
					onEsc: function (ev) {
						if (ev.key !== 'Escape') return false
						if (layoutState[card].dock === 'float') {
							layoutState[card].fx = dragState.f0.fx
							layoutState[card].fy = dragState.f0.fy
							const pfx = cardPrefix(card)
							setVar('--vsc-' + pfx + '-x', layoutState[card].fx + 'px')
							setVar('--vsc-' + pfx + '-y', layoutState[card].fy + 'px')
						}
						dragState = null
						notify()
						return true
					},
					onCleanup: function () {
						if (dragEl !== undefined && dragEl !== null) dragEl.removeAttribute('data-vsc-dragtop')
					}
				})
			}

			/* v1.12.9: eviction memory — when a docked card claims a region, the
			   previous occupant is squeezed to float and remembered; the moment
			   the region frees up again, the evicted card returns automatically.
			   Memory is in-process only (never persisted); taking a card by hand
			   (startDockDrag) clears its memory so deliberate floats are never
			   pulled back. */
			const evictFrom = new Map()
			function reconcileEvictions() {
				for (const card of ['sidebar', 'conversation', 'dock']) {
					const from = evictFrom.get(card)
					if (from === undefined) continue
					if (layoutState[card].dock !== 'float') {
						evictFrom.delete(card)
						continue
					}
					const occupied = ['sidebar', 'conversation', 'dock'].some((k) =>
						k !== card && layoutState[k].dock === from)
					if (!occupied) {
						layoutState[card].dock = from
						evictFrom.delete(card)
					}
				}
			}
			function setDock(card, dock) {
				const c = layoutState[card]
				if (dock !== 'float') {
					/* one region holds one card: the previous occupant floats away —
					   remember who was evicted so it can return when the region
					   frees up (v1.12.9). */
					for (const other of ['sidebar', 'conversation', 'dock']) {
						if (other !== card && layoutState[other].dock === dock) {
							evictFrom.set(other, dock)
							layoutState[other].dock = 'float'
						}
					}
				}
				c.dock = dock
				if (dock === 'float' && (c.fx === 0 && c.fy === 0)) { c.fx = 80 + (card === 'dock' ? 80 : 0); c.fy = 60 }
				clampFloat()
				reconcileEvictions()
				applyLayout()
				saveLayoutState()
				notify()
			}
			function clampFloat() {
				if (geom.w <= 0) return
				for (const card of ['sidebar', 'conversation', 'dock']) {
					const c = layoutState[card]
					c.fw = clamp(c.fw, FLOAT_MIN_W[card], Math.max(FLOAT_MIN_W[card], geom.w - 60))
					c.fh = clamp(c.fh, FLOAT_MIN_H[card], Math.max(FLOAT_MIN_H[card], geom.h - 60))
					c.fx = clamp(c.fx, 0, Math.max(0, geom.w - c.fw))
					c.fy = clamp(c.fy, 0, Math.max(0, geom.h - c.fh))
				}
			}

			/* ---------- drag: panel float (direct DOM, zero lag) ---------- */
			function startPanelFloatMove(id, e) {
				e.preventDefault()
				e.stopPropagation()
				const box = e.currentTarget.closest('[data-vsc-pfloat]')
				if (box === null) return
				const p = layoutState.panels[id]
				if (p === undefined) return
				const startX = e.clientX
				const startY = e.clientY
				const o = { x: p.x, y: p.y }
				startDragSession({
					initial: { x: startX, y: startY },
					read: (ev) => ({ x: ev.clientX, y: ev.clientY }),
					onStep: function (pt) {
						const rect = frame.getBoundingClientRect()
						p.x = clamp(o.x + (pt.x - startX), 0, Math.max(0, rect.width - p.w))
						p.y = clamp(o.y + (pt.y - startY), 0, Math.max(0, rect.height - p.h))
						box.style.left = p.x + 'px'
						box.style.top = p.y + 'px'
					},
					onUp: function () { saveLayoutState(); notify() }
				})
			}
			/* v1.12.0: direction-aware resize for plugin float windows — 8 handles
			   matching the plugin-panel float chrome (n/s/e/w strips + corners),
			   so e.g. a floated file-explorer tab can be resized from any edge.
			   Direct DOM writes per frame; persisted on release. */
			function startPanelFloatResize(id, dir, e) {
				e.preventDefault()
				e.stopPropagation()
				const box = e.currentTarget.closest('[data-vsc-pfloat]')
				if (box === null) return
				const p = layoutState.panels[id]
				if (p === undefined) return
				const startX = e.clientX
				const startY = e.clientY
				const o = { x: p.x, y: p.y, w: p.w, h: p.h }
				startDragSession({
					initial: { x: startX, y: startY },
					read: (ev) => ({ x: ev.clientX, y: ev.clientY }),
					onStep: function (pt) {
						const rect = frame.getBoundingClientRect()
						const dx = pt.x - startX
						const dy = pt.y - startY
						let x = o.x, y = o.y, w = o.w, h = o.h
						if (dir.includes('e')) w = clamp(o.w + dx, 240, Math.max(240, rect.width - o.x))
						if (dir.includes('w')) {
							w = clamp(o.w - dx, 240, o.x + o.w)
							x = o.x + o.w - w
						}
						if (dir.includes('s')) h = clamp(o.h + dy, 200, Math.max(200, rect.height - o.y))
						if (dir.includes('n')) {
							h = clamp(o.h - dy, 200, o.y + o.h)
							y = o.y + o.h - h
						}
						p.x = x; p.y = y; p.w = w; p.h = h
						box.style.left = x + 'px'
						box.style.top = y + 'px'
						box.style.width = w + 'px'
						box.style.height = h + 'px'
					},
					onUp: function () { saveLayoutState(); notify() }
				})
			}

			/* ---------- engine store ---------- */
			const listeners = new Set()
			function notify() { for (const fn of [...listeners]) fn() }
			function subscribe(fn) { listeners.add(fn); return function () { listeners.delete(fn) } }

			/* ---------- debug geometry probe (temporary, v1.4.7) ---------- */
			/* Enable with localStorage['dsh.layout-studio:debug']='1': paints 1px outlines
			   (conversation red / composer seat yellow / dock card green) and shows a readout of
			   their rects plus the gap pixels at the junction. Remove after diagnosis. */
			let probeTimer = null
			let probeEl = null
			function debugEnabled() {
				try { return localStorage.getItem('dsh.layout-studio:debug') === '1' } catch (e) { return false }
			}
			function clearProbeStyles() {
				if (resolveFrame() === null) return
				for (let i = 0; i < 3; i++) {
					const el = frame.children[i]
					if (el !== undefined) el.style.outline = ''
				}
				const seat = document.querySelector('[data-composer-seat]')
				if (seat !== null) seat.style.outline = ''
			}
			function probeTick() {
				const on = debugEnabled() && frame !== null && layoutState.mode === 'card' && !settingsOpen
				if (!on) {
					if (probeEl !== null) { probeEl.remove(); probeEl = null }
					clearProbeStyles()
					/* v1.8.8: the 500ms probe interval only runs while the debug
					   switch is on — zero idle cost otherwise. Enabling the switch
					   mid-session requires a refresh (the debug workflow sets
					   localStorage and reloads anyway). */
					if (probeTimer !== null) { window.clearInterval(probeTimer); probeTimer = null }
					return
				}
				const cvEl = frame.children[1]
				const dkEl = frame.children[2]
				const seat = document.querySelector('[data-composer-seat]')
				const cv = cvEl !== undefined && cvEl !== null ? cvEl.getBoundingClientRect() : null
				const dk = dkEl !== undefined && dkEl !== null ? dkEl.getBoundingClientRect() : null
				const st = seat !== null ? seat.getBoundingClientRect() : null
				const lines = []
				if (cv !== null) lines.push('cv   ' + Math.round(cv.top) + '..' + Math.round(cv.bottom))
				if (dk !== null) lines.push('dk   ' + Math.round(dk.top) + '..' + Math.round(dk.bottom))
				if (st !== null) lines.push('seat ' + Math.round(st.top) + '..' + Math.round(st.bottom))
				if (cv !== null && dk !== null) lines.push('gap cv-bottom -> dk-top = ' + (Math.round(dk.top) - Math.round(cv.bottom)) + 'px')
				if (cv !== null && st !== null) lines.push('gap seat-bottom -> cv-bottom = ' + (Math.round(cv.bottom) - Math.round(st.bottom)) + 'px')
				const scrollEl = document.querySelector('[data-conversation-scroll]')
				if (scrollEl !== null) lines.push('gutter ' + (scrollEl.offsetWidth - scrollEl.clientWidth) + 'px')
				/* stats line (composer.dock) tooltip diagnostics: the full-text tooltip only
				   shows when the line is truncated (scrollWidth > clientWidth); report the
				   truncation state and, while hovered, the tooltip's computed style/text.
				   v1.13.0: the old hashed class anchor ([class*="FJxK0a_root"]) no longer
				   exists in the shipped bundles — anchor on the stable slot element. */
				const statsEl = document.querySelector('[data-slot="conversation.composer.dock"]')
				if (statsEl !== null) {
					const sr = statsEl.getBoundingClientRect()
					lines.push('stats @' + Math.round(sr.left) + ',' + Math.round(sr.top) + ' ' + Math.round(sr.width) + 'x' + Math.round(sr.height) + ' sw' + statsEl.scrollWidth + (statsEl.scrollWidth > statsEl.clientWidth ? ' TRUNC' : ''))
				}
				const tip = document.querySelector('[role="tooltip"]')
				if (tip !== null) {
					const tr = tip.getBoundingClientRect()
					const cs = getComputedStyle(tip)
					lines.push('tooltip @' + Math.round(tr.left) + ',' + Math.round(tr.top) + ' ' + Math.round(tr.width) + 'x' + Math.round(tr.height))
					lines.push('tip-css ' + cs.position + ' ' + cs.display + ' op' + cs.opacity + ' z' + cs.zIndex)
					const par = tip.parentElement
					lines.push('tip-id ' + String(tip.className).slice(0, 20) + ' par ' + String(par !== null ? (par.className || par.tagName) : '').slice(0, 24))
					lines.push('tip-txt ' + String(tip.textContent || '').slice(0, 20))
				}
				/* hover-chain diagnostics: report the deepest hovered element and whether
				   any plugin chrome (grab/handle/float-top/zone) intercepts the hover. */
				const chain = document.querySelectorAll(':hover')
				if (chain.length > 0) {
					const deep = chain[chain.length - 1]
					let name = ''
					try { name = String(deep.className || deep.tagName) } catch (e) { name = String(deep.tagName) }
					lines.push('hover-deep ' + name.slice(0, 44))
					let blocked = false
					for (const el of chain) {
						if (el.hasAttribute('data-vsc-grab') || el.hasAttribute('data-vsc-handle') || el.hasAttribute('data-vsc-ftop') || el.hasAttribute('data-vsc-zone')) { blocked = true; break }
					}
					if (blocked) lines.push('!! HOVER INTERCEPTED BY CHROME !!')
				}
				if (cvEl !== undefined && cvEl !== null) cvEl.style.outline = '1px solid #ff4d4f'
				if (dkEl !== undefined && dkEl !== null) dkEl.style.outline = '1px solid #52c41a'
				if (seat !== null) seat.style.outline = '1px solid #faad14'
				if (probeEl === null) {
					probeEl = document.createElement('div')
					probeEl.style.cssText = 'position:fixed;left:10px;bottom:10px;z-index:9999;background:rgba(0,0,0,.82);color:#fff;font:11px/1.7 Consolas,monospace;padding:6px 10px;border-radius:6px;pointer-events:none;white-space:pre'
					document.body.appendChild(probeEl)
				}
				probeEl.textContent = lines.join('\n')
			}

			/* ---------- chrome (overlay) ---------- */
			function useEngine() {
				const [, setV] = React.useState(0)
				React.useEffect(function () { return subscribe(function () { setV(function (v) { return v + 1 }) }) }, [])
			}

			function pushDockedHandles(parts) {
				const dVis = dockVisible()
				const specs = [
					{ key: 'sidebar' }, { key: 'conversation' }, { key: 'dock' }
				]
				for (const s of specs) {
					const c = layoutState[s.key]
					if (c.dock === 'float') continue
					if (s.key === 'dock' && !dVis) continue
					let style = null
					let side = null
					/* v1.12.13: place every handle on the card's ACTUAL grid rect
					   (cardRect reads the live DOM, same source as the grab
					   strips). The old math assumed the card sat flush at
					   `stored width` from the frame edge — wrong whenever the
					   grid was constrained or overflowed (e.g. the conversation
					   snapped right with the sidebar left: its real left edge
					   sat ~200px right of the drawn handle, so the left edge
					   could not be resized). */
					const r = cardRect(s.key)
					if (r !== null) {
						if (c.dock === 'left') { style = { left: Math.max(0, r.left + r.width - 4), top: r.top, height: r.height, width: 8, cursor: 'col-resize' }; side = 'right' }
						else if (c.dock === 'right') { style = { left: Math.max(0, r.left - 4), top: r.top, height: r.height, width: 8, cursor: 'col-resize' }; side = 'left' }
						else if (c.dock === 'top') { style = { left: r.left, width: r.width, top: Math.max(0, r.top + r.height - 4), height: 8, cursor: 'row-resize' }; side = 'bottom' }
						else if (c.dock === 'bottom') { style = { left: r.left, width: r.width, top: Math.max(0, r.top - 4), height: 8, cursor: 'row-resize' }; side = 'top' }
					}
					if (style === null) continue
					const kind = s.key + '-' + side
					parts.push(React.createElement('div', {
						key: 'h-' + kind, 'data-vsc-handle': kind,
						style: Object.assign({ position: 'absolute', zIndex: 30, touchAction: 'none', pointerEvents: 'auto' }, style),
						onPointerDown: function (e) { startDrag(kind, s.key, e) },
						onDoubleClick: function () { resetWidth(s.key, side) }
					}))
				}
			}

			function pushGrabStrips(parts) {
				if (dragState !== null) return
				const dVis = dockVisible()
				for (const key of ['sidebar', 'conversation', 'dock']) {
					const c = layoutState[key]
					if (c.dock === 'float') continue
					if (key === 'dock' && !dVis) continue
					/* v1.12.11: the dock card's grab strip is redundant — the
					   plugin panel renders its own 12px drag strip (data-vsc-ppstrip)
					   at the top of the card whenever it is docked, and both strips
					   call startDockDrag('dock'). Rendering the outer 10px grab
					   strip on top of it produced TWO overlapping hover highlights
					   of different sizes on the panel header. Skip it; the ppstrip
					   already covers the same gesture. */
					if (key === 'dock') continue
					const r = cardRect(key)
					if (r === null) continue
					parts.push(React.createElement('div', {
						key: 'grab-' + key, 'data-vsc-grab': '',
						style: { left: r.left, top: r.top, width: r.width, height: 10 },
						onPointerDown: function (e) { startDockDrag(key, e) }
					}))
				}
			}

			function pushFloatChrome(parts) {
				const dVis = dockVisible()
				for (const card of ['sidebar', 'conversation', 'dock']) {
					const c = layoutState[card]
					if (c.dock !== 'float') continue
					if (card === 'dock' && !dVis) continue
					const pfx = cardPrefix(card)
					const vx = 'var(--vsc-' + pfx + '-x)'
					const vy = 'var(--vsc-' + pfx + '-y)'
					const vw = 'var(--vsc-' + pfx + '-w)'
					const vh = 'var(--vsc-' + pfx + '-h)'
					parts.push(React.createElement('div', {
						key: 'ftop-' + card, 'data-vsc-ftop': '',
						style: { left: vx, top: 'calc(' + vy + ' + 4px)', width: vw, height: 16 },
						onPointerDown: function (e) { startDockDrag(card, e) }
					}))
					if (card === 'dock') {
						parts.push(React.createElement('button', {
							key: 'fcl-' + card, type: 'button', 'data-vsc-fclose': '',
							style: { left: 'calc(' + vx + ' + ' + vw + ' - 26px)', top: 'calc(' + vy + ' + 3px)' },
							onClick: function () { closeDock() }
						}, React.createElement(CloseIcon, { size: 11 })))
					}
					const dirs = [
						['n', 'n-resize', 'calc(' + vx + ' + 12px)', 'calc(' + vy + ' - 3px)', 'calc(' + vw + ' - 24px)', '6px'],
						['s', 's-resize', 'calc(' + vx + ' + 12px)', 'calc(' + vy + ' + ' + vh + ' - 3px)', 'calc(' + vw + ' - 24px)', '6px'],
						['e', 'e-resize', 'calc(' + vx + ' + ' + vw + ' - 3px)', 'calc(' + vy + ' + 12px)', '6px', 'calc(' + vh + ' - 24px)'],
						['w', 'w-resize', 'calc(' + vx + ' - 3px)', 'calc(' + vy + ' + 12px)', '6px', 'calc(' + vh + ' - 24px)'],
						['nw', 'nwse-resize', 'calc(' + vx + ' - 6px)', 'calc(' + vy + ' - 6px)', '12px', '12px'],
						['ne', 'nesw-resize', 'calc(' + vx + ' + ' + vw + ' - 6px)', 'calc(' + vy + ' - 6px)', '12px', '12px'],
						['sw', 'nesw-resize', 'calc(' + vx + ' - 6px)', 'calc(' + vy + ' + ' + vh + ' - 6px)', '12px', '12px'],
						['se', 'nwse-resize', 'calc(' + vx + ' + ' + vw + ' - 6px)', 'calc(' + vy + ' + ' + vh + ' - 6px)', '12px', '12px']
					]
					for (const d of dirs) {
						parts.push(React.createElement('div', {
							key: 'frs-' + card + '-' + d[0], 'data-vsc-handle': 'frs',
							style: { position: 'absolute', left: d[2], top: d[3], width: d[4], height: d[5], cursor: d[1], zIndex: 33, touchAction: 'none', pointerEvents: 'auto' },
							onPointerDown: function (e) { startDrag('float-' + d[0], card, e) }
						}))
					}
				}
			}

			function pushZones(parts) {
				/* the hint only appears once the pointer is actually over a region, and only
				   for that one region — no full-screen zone overlays while dragging */
				if (dragState === null || dragState.zone === null) return
				const z = zoneRect(dragState.zone, geom.w, geom.h)
				/* v1.8.7: PORTAL the hint to the frame (page-level z-40) instead of the
				   overlay layer — the dragged card rides at z-35 above the whole layer,
				   so the drop hints would otherwise render underneath the card. */
				parts.push(ReactDom.createPortal(
					React.createElement('div', {
						key: 'zone-hot', 'data-vsc-zone': '', 'data-hot': '',
						style: { left: z.left, top: z.top, width: z.width, height: z.height },
						children: ZONE_LABELS[dragState.zone]
					}),
					frame
				))
			}

			function Chrome() {
				useEngine()
				if (renderFrame() === null || layoutState.mode !== 'card' || settingsOpen) return null
				/* v1.15.1: 用 renderGeom()（缓存优先、为 0 才现场量活框架）替代裸 geom，
				   避免宿主替换框架节点后覆盖层永久不再渲染 */
				if (renderGeom().w <= 0) return null
				const parts = []
				pushDockedHandles(parts)
				pushGrabStrips(parts)
				pushFloatChrome(parts)
				pushZones(parts)
				return React.createElement(React.Fragment, null, ...parts)
			}

			/* ---------- dock host (panels) ---------- */
			function PanelMount({ def }) {
				const ref = React.useRef(null)
				React.useEffect(function () {
					const el = ref.current
					if (el === null) return
					let dispose = null
					try { dispose = def.mount(el) } catch (err) { console.error('[dsh-ui-beautify] panel mount failed:', err) }
					return function () {
						if (typeof dispose === 'function') { try { dispose() } catch (err) {} }
						el.textContent = ''
					}
				}, [def])
				return React.createElement('div', { ref: ref, style: { flex: 1, overflow: 'auto', minHeight: 0 } })
			}

			function PanelFloat({ id, def }) {
				const p = layoutState.panels[id]
				/* v1.12.0: full 8-direction resize handles, matching the plugin-
				   panel float chrome — a floated plugin tab (e.g. file-explorer)
				   can be resized from any edge/corner, not just the se corner. */
				const dirs = [
					['n', 'n-resize', '12px', '-3px', 'calc(100% - 24px)', '6px'],
					['s', 's-resize', '12px', 'calc(100% - 3px)', 'calc(100% - 24px)', '6px'],
					['e', 'e-resize', 'calc(100% - 3px)', '12px', '6px', 'calc(100% - 24px)'],
					['w', 'w-resize', '-3px', '12px', '6px', 'calc(100% - 24px)'],
					['nw', 'nwse-resize', '-6px', '-6px', '12px', '12px'],
					['ne', 'nesw-resize', 'calc(100% - 6px)', '-6px', '12px', '12px'],
					['sw', 'nesw-resize', '-6px', 'calc(100% - 6px)', '12px', '12px'],
					['se', 'nwse-resize', 'calc(100% - 6px)', 'calc(100% - 6px)', '12px', '12px']
				]
				return React.createElement('div', {
					'data-vsc-pfloat': '',
					style: Object.assign({ left: p.x, top: p.y, width: p.w, height: p.h }, FLOAT_WINDOW_STYLE),
					children: [
						React.createElement('div', {
							key: 'bar',
							style: { display: 'flex', alignItems: 'center', gap: 6, padding: '8px 12px', fontSize: 14, color: 'var(--dsw-alias-label-secondary)', cursor: 'grab', borderBottom: '1px solid var(--dsw-alias-border-l1)', flex: 'none' },
							onPointerDown: function (e) { startPanelFloatMove(id, e) }
						},
							React.createElement('span', { style: { flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: 'var(--dsw-alias-label-primary)' } }, def.title),
							React.createElement('button', { type: 'button', style: PANEL_BTN, onPointerDown: function (e) { e.stopPropagation() }, onClick: function () { dockApi.dockPanel(id) } }, '回停靠'),
							React.createElement('button', { type: 'button', 'data-vsc-hdrx': '', onPointerDown: function (e) { e.stopPropagation() }, onClick: function () { dockApi.closePanel(id) } }, React.createElement(CloseIcon, { size: 12 }))
						),
						React.createElement(PanelMount, { key: 'body', def: def }),
						dirs.map(function (d) {
							return React.createElement('div', {
								key: 'rsz-' + d[0],
								style: { position: 'absolute', left: d[2], top: d[3], width: d[4], height: d[5], cursor: d[1], zIndex: 33, touchAction: 'none', pointerEvents: 'auto' },
								onPointerDown: function (e) { startPanelFloatResize(id, d[0], e) }
							})
						})
					]
				})
			}

			/* ---------- dock host: unified plugin panel (v1.8) ---------- */
			/* The plugin panel is the launcher + tabbed host. In card mode it
			   overlays the dock card; in classic mode it is a right-docked overlay
			   that can detach into a floating window. Everything below is shared. */
			/* v1.8.2: every plugin-panel drag marks the frame as dragging (same
			   signal startDrag uses), so the grid transition is disabled and other
			   plugins (file-explorer) can pause mid-drag tree rebuilds. */
			function beginDrag() {
				if (frame !== null) frame.setAttribute('data-vsc-dragging', '')
			}
			function endDrag() {
				if (frame !== null) frame.removeAttribute('data-vsc-dragging')
			}
			/* v1.12.0: classic three-column panel width drag — updates the
			   --vsc-pp-cols grid track live (like the card resize handles) and
			   persists the width on release. Range: 240 .. frame - sidebar -
			   CONV_MIN_W (the conversation column keeps >=480px; v1.12.9 adds
			   the sidebar term so the grid never overflows). */
			function startClassicPanelResize(e) {
				if (resolveFrame() === null) return
				e.preventDefault()
				e.stopPropagation()
				const pp = layoutState.pluginPanel
				const startX = e.clientX
				/* v1.12.13: the base is the ACTUAL column width (live rect), not the
				   stored preference — applyClassicLayout caps the track at
				   frame − sidebar − CONV_MIN_W, so a stale base would jump. */
				let base = pp.width
				const col = frame.children[2]
				if (col !== undefined && col !== null) {
					const cr = col.getBoundingClientRect()
					if (cr.width > 0) base = Math.round(cr.width)
				}
				startDragSession({
					initial: startX,
					read: (ev) => ev.clientX,
					onStep: function (x) {
						const rect = frame.getBoundingClientRect()
						const sbW = collapsedSidebar ? SIDEBAR_RAIL : layoutState.sidebar.width
						const maxW = Math.max(240, Math.round(rect.width) - sbW - CONV_MIN_W)
						pp.width = clamp(base + (startX - x), 240, maxW)
						applyClassicLayout()
					},
					onUp: function () { saveLayoutState(); notify() }
				})
			}
			function startPluginPanelFloatMove(e) {
				if (resolveFrame() === null) return
				const t = e.target
				if (t && t.closest && t.closest('button')) return
				e.preventDefault()
				e.stopPropagation()
				const box = e.currentTarget.closest('[data-vsc-ppfloat]')
				if (box === null) return
				const pp = layoutState.pluginPanel
				const startX = e.clientX
				const startY = e.clientY
				const o = { x: pp.fx, y: pp.fy }
				startDragSession({
					initial: { x: startX, y: startY },
					read: (ev) => ({ x: ev.clientX, y: ev.clientY }),
					onStep: function (pt) {
						const rect = frame.getBoundingClientRect()
						pp.fx = clamp(o.x + (pt.x - startX), 0, Math.max(0, rect.width - pp.fw))
						pp.fy = clamp(o.y + (pt.y - startY), 0, Math.max(0, rect.height - pp.fh))
						box.style.left = pp.fx + 'px'
						box.style.top = pp.fy + 'px'
					},
					onUp: function () { saveLayoutState(); notify() }
				})
			}
			/* direction-aware resize for the floating plugin panel — the same math
			   as the card float resize (applyFloatResize), direct DOM writes per
			   frame. dir is a combination of n/s/e/w. */
			function startPluginPanelFloatResizeDir(e, dir) {
				if (resolveFrame() === null) return
				e.preventDefault()
				e.stopPropagation()
				const box = e.currentTarget.closest('[data-vsc-ppfloat]')
				if (box === null) return
				const pp = layoutState.pluginPanel
				const startX = e.clientX
				const startY = e.clientY
				const o = { fx: pp.fx, fy: pp.fy, fw: pp.fw, fh: pp.fh }
				startDragSession({
					initial: { x: startX, y: startY },
					read: (ev) => ({ x: ev.clientX, y: ev.clientY }),
					onStep: function (pt) {
						const rect = frame.getBoundingClientRect()
						const dx = pt.x - startX
						const dy = pt.y - startY
						let fx = o.fx, fy = o.fy, fw = o.fw, fh = o.fh
						if (dir.includes('e')) fw = clamp(o.fw + dx, 240, Math.max(240, rect.width - o.fx))
						if (dir.includes('w')) {
							fw = clamp(o.fw - dx, 240, o.fx + o.fw)
							fx = o.fx + o.fw - fw
						}
						if (dir.includes('s')) fh = clamp(o.fh + dy, 200, Math.max(200, rect.height - o.fy))
						if (dir.includes('n')) {
							fh = clamp(o.fh - dy, 200, o.fy + o.fh)
							fy = o.fy + o.fh - fh
						}
						pp.fx = fx; pp.fy = fy; pp.fw = fw; pp.fh = fh
						box.style.left = fx + 'px'
						box.style.top = fy + 'px'
						box.style.width = fw + 'px'
						box.style.height = fh + 'px'
					},
					onUp: function () { saveLayoutState(); notify() }
				})
			}
			/* classic-mode docked header drag → detach into a floating window */
			function startPluginPanelDetach(e) {
				if (resolveFrame() === null) return
				const t = e.target
				if (t && t.closest && t.closest('button')) return
				e.preventDefault()
				e.stopPropagation()
				const pp = layoutState.pluginPanel
				const fr = frame.getBoundingClientRect()
				pp.fx = Math.max(0, Math.round(fr.width - pp.width))
				pp.fy = 0
				pp.fw = pp.width
				pp.fh = Math.round(fr.height)
				pp.float = true
				saveLayoutState()
				/* v1.12.0: clear the three-column state — the panel leaves the
				   third track and becomes a floating window */
				applyLayout()
				notify()
				const startX = e.clientX
				const startY = e.clientY
				const o = { x: pp.fx, y: pp.fy }
				startDragSession({
					initial: { x: startX, y: startY },
					read: (ev) => ({ x: ev.clientX, y: ev.clientY }),
					onStep: function (pt) {
						const rect = frame.getBoundingClientRect()
						pp.fx = clamp(o.x + (pt.x - startX), 0, Math.max(0, rect.width - pp.fw))
						pp.fy = clamp(o.y + (pt.y - startY), 0, Math.max(0, rect.height - pp.fh))
						const box = document.querySelector('[data-vsc-ppfloat]')
						if (box !== null) { box.style.left = pp.fx + 'px'; box.style.top = pp.fy + 'px' }
					},
					onUp: function () { saveLayoutState(); notify() }
				})
			}

			/* launcher + tabs + content body, shared by the docked and floated forms */
			function DockPanelBody({ showHeader }) {
				useEngine()
				const [overflowOpen, setOverflowOpen] = React.useState(false)
				const [query, setQuery] = React.useState('')
				const pp = layoutState.pluginPanel
				/* v1.15.0: 芯片行按注册顺序（= 可用插件清单，顺序稳定好找），
				   标签行按打开顺序（dockedInOpenOrder）。 */
				const ids = [...panelDefs.keys()]
				const docked = dockedInOpenOrder()
				const active = activePanel !== null && docked.includes(activePanel) ? activePanel : (docked.length > 0 ? docked[0] : null)
				/* v1.14.0：标签条溢出检测 —— 标签条由「换行」改为「单行滚动 + 溢出跳转菜单」。
				   `▾` 常驻可见（与芯片行「···」一致），因此不存在显示/隐藏导致的宽度
				   抖动；溢出状态只用来决定「激活标签是否需要自动滚入视野」。 */
				const tabsRef = React.useRef(null)
				const [tabsOverflow, setTabsOverflow] = React.useState(false)
				const [tabsMenuOpen, setTabsMenuOpen] = React.useState(false)
				React.useEffect(function () {
					const el = tabsRef.current
					if (el === null) { setTabsOverflow(false); return }
					const measure = function () {
						/* 面板刚打开或处于隐藏态时 clientWidth 为 0，不能据此判定溢出 */
						if (el.clientWidth <= 0) { setTabsOverflow(false); return }
						setTabsOverflow(el.scrollWidth > el.clientWidth + 1)
					}
					measure()
					if (typeof ResizeObserver !== 'function') {
						window.addEventListener('resize', measure)
						return function () { window.removeEventListener('resize', measure) }
					}
					const ro = new ResizeObserver(measure)
					ro.observe(el)
					return function () { ro.disconnect() }
				}, [docked.length, active, layoutState.mode])
				/* 溢出时把激活标签滚进视野（只动标签条自身的 scrollLeft，
				   不用 scrollIntoView —— 后者会连带滚动祖先容器） */
				React.useEffect(function () {
					if (!tabsOverflow) { setTabsMenuOpen(false); return }
					const el = tabsRef.current
					if (el === null) return
					const node = el.querySelector('[data-vsc-tab-active]')
					if (node === null) return
					if (node.offsetLeft < el.scrollLeft) el.scrollLeft = node.offsetLeft
					else if (node.offsetLeft + node.offsetWidth > el.scrollLeft + el.clientWidth) el.scrollLeft = node.offsetLeft + node.offsetWidth - el.clientWidth
				}, [active, tabsOverflow])
				const body = []
				if (showHeader) {
					/* v1.8.3: dragging the panel header floats the panel in BOTH
					   modes — classic detaches the plugin panel itself, card mode
					   detaches the dock card (startDockDrag), so the panel top
					   behaves exactly like every other card's grab strip. A 4px
					   movement threshold keeps a plain click on the title from
					   accidentally floating the card. */
					const isClassic = layoutState.mode !== 'card'
					const dragPanel = function (e) {
						if (isClassic) startPluginPanelDetach(e)
						else startDockDrag('dock', e)
					}
					/* v1.8.4: dedicated 12px drag strip above the header with the
					   hover bar hint (like the card grab strips). It drags
					   immediately; the header below keeps its 4px threshold. */
					const headerDrag = function (e) {
						const t = e.target
						if (t && t.closest && t.closest('button')) return
						const startX = e.clientX
						const startY = e.clientY
						function move(ev) {
							if (Math.hypot(ev.clientX - startX, ev.clientY - startY) <= 4) return
							window.removeEventListener('pointermove', move)
							window.removeEventListener('pointerup', up)
							if (isClassic) startPluginPanelDetach(ev)
							else startDockDrag('dock', ev)
						}
						function up() {
							window.removeEventListener('pointermove', move)
							window.removeEventListener('pointerup', up)
							window.removeEventListener('pointercancel', up)
						}
						window.addEventListener('pointermove', move)
						window.addEventListener('pointerup', up)
						window.addEventListener('pointercancel', up)
					}
					body.push(React.createElement('div', {
						key: 'strip',
						'data-vsc-ppstrip': '',
						title: '拖动此区域可浮动',
						onPointerDown: dragPanel
					}))
					body.push(React.createElement('div', {
						key: 'bar',
						style: { display: 'flex', alignItems: 'center', gap: 6, padding: '8px 12px', fontSize: 14, color: 'var(--dsw-alias-label-secondary)', cursor: 'grab', userSelect: 'none', borderBottom: '1px solid var(--dsw-alias-border-l1)', flex: 'none' },
						onPointerDown: headerDrag,
						title: '拖动标题栏可浮动'
					},
						React.createElement('span', { style: { flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: 'var(--dsw-alias-label-primary)' } }, '🧩 插件面板'),
						isClassic && React.createElement('button', { type: 'button', style: PANEL_BTN, onPointerDown: function (e) { e.stopPropagation() }, onClick: function () { layoutState.pluginPanel.float = true; saveLayoutState(); applyLayout(); notify() } }, React.createElement(FloatIcon, { size: 14 }), '浮动'),
						React.createElement('button', { type: 'button', 'data-vsc-hdrx': '', onPointerDown: function (e) { e.stopPropagation() }, onClick: function () { closeDock() } }, React.createElement(CloseIcon, { size: 12 }))
					))
				}
				/* plugin launcher list: one row of chips by default, drag the splitter
				   taller to switch to a wrapping grid with vertical scroll */
				const chips = ids.map(function (id) {
					const def = panelDefs.get(id)
					const p = layoutState.panels[id]
					if (def === undefined) return null
					const on = p !== undefined && p.open
					return React.createElement('button', {
						key: id, type: 'button',
						style: { display: 'inline-flex', alignItems: 'center', gap: 6, height: 30, padding: '0 12px', borderRadius: 8, cursor: 'pointer', fontSize: 14, lineHeight: 1.5, whiteSpace: 'nowrap', flex: 'none', border: '1px solid ' + (on ? 'var(--dsw-alias-border-l2)' : 'var(--dsw-alias-border-l1)'), background: on ? 'var(--dsw-alias-interactive-bg-hover)' : 'transparent', color: on ? 'var(--dsw-alias-label-primary)' : 'var(--dsw-alias-label-secondary)', transition: UI_TRANSITION },
						title: (on ? '关闭' : '打开') + ' ' + def.title,
						/* v1.15.0: 打开时顺带切到这个面板（旧行为只打开、不切焦点） */
						onClick: function () { on ? dockApi.closePanel(id) : dockApi.focusPanel(id) }
					},
					/* v1.9.2: fixed 18x18 flex box centers the emoji glyph against
					   the text baseline (a bare fontSize lets the emoji line box
					   sit high and misalign with the CJK title) */
						React.createElement('span', { style: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 18, height: 18, fontSize: 14, lineHeight: 1, flex: 'none' } }, def.icon || '🧩'),
						React.createElement('span', { style: { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', minWidth: 0, maxWidth: 160 } }, def.title),
						React.createElement('span', { style: { fontSize: 11, opacity: .85 } }, on ? '●' : '○')
					)
				})
				const popover = overflowOpen ? React.createElement('div', {
					style: { position: 'absolute', right: 6, top: 42, zIndex: 5, minWidth: 220, maxHeight: 280, overflowY: 'auto', padding: 6, display: 'flex', flexDirection: 'column', gap: 4, background: 'var(--dsw-alias-bg-layer-1)', border: '1px solid var(--dsw-alias-border-l2)', borderRadius: 12, boxShadow: 'var(--dsw-shadow-lv2)' }
				},
					React.createElement('input', {
						type: 'text', value: query, placeholder: '搜索插件…',
						style: { boxSizing: 'border-box', width: '100%', padding: '4px 8px', fontSize: 14, borderRadius: 8, border: '1px solid var(--dsw-alias-border-l2)', outline: 'none', background: 'transparent', color: 'var(--dsw-alias-label-primary)', marginBottom: 8 },
						onChange: function (ev) { setQuery(ev.target.value) }
					}),
					ids.filter(function (id) {
						const def = panelDefs.get(id)
						return def !== undefined && (query === '' || def.title.toLowerCase().includes(query.toLowerCase()))
					}).map(function (id) {
						const def = panelDefs.get(id)
						const p = layoutState.panels[id]
						const on = p !== undefined && p.open
						return React.createElement('button', {
							key: id, type: 'button',
							style: { display: 'flex', alignItems: 'center', gap: 6, padding: '5px 8px', borderRadius: 8, cursor: 'pointer', fontSize: 14, border: 'none', background: 'transparent', color: 'var(--dsw-alias-label-primary)', textAlign: 'left', transition: 'background var(--ds-transition-duration) var(--ds-ease-in-out)' },
							onClick: function () { setOverflowOpen(false); setQuery(''); on ? dockApi.closePanel(id) : dockApi.focusPanel(id) }
						},
							React.createElement('span', { style: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 18, height: 18, fontSize: 14, lineHeight: 1, flex: 'none' } }, def.icon || '🧩'),
							React.createElement('span', { style: { flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }, def.title),
							React.createElement('span', { style: { fontSize: 11, opacity: .85 } }, on ? '● 已打开' : '○ 未打开')
						)
					})
				) : null
				body.push(React.createElement('div', {
					key: 'list',
					'data-vsc-pplist': '',
					/* v1.10.0: fixed single-line launcher row (no height splitter);
					   overflow scrolls horizontally */
					/* v1.15.0: height → minHeight —— 芯片行溢出时横向滚动条会占掉
					   8px，固定 48px 会把 30px 的芯片裁掉上下各 3px（宿主的全局
					   滚动条是 8px 高）。改为 minHeight 后行高随滚动条增长，芯片
					   不再被裁，且与标签行同样是「留白 8px」。 */
					style: { flex: 'none', minHeight: 48, display: 'flex', flexDirection: 'column', position: 'relative' }
				},
					React.createElement('div', {
						style: { flex: 1, minHeight: 0, display: 'flex', alignItems: 'center', flexWrap: 'nowrap', overflowX: 'auto', overflowY: 'hidden', gap: 6, padding: '8px 12px' }
					},
						...chips,
						React.createElement('button', { key: 'more', type: 'button', style: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', height: 30, minWidth: 30, padding: '0 7px', borderRadius: 8, cursor: 'pointer', fontSize: 14, lineHeight: 1.5, border: '1px solid var(--dsw-alias-border-l1)', background: 'transparent', color: 'var(--dsw-alias-label-secondary)', transition: UI_TRANSITION }, title: '全部插件', onClick: function () { setOverflowOpen(!overflowOpen) } }, '···'),
						popover
					)
				))
				/* tabs for open (docked) plugins — v1.14.0: 单行不换行 + 横向滚动；
				   宽度不够时最左侧 `▾` 展开全部已打开插件（切换 / 浮动 / 关闭）。
				   标签本体行为不变：点击切换激活，[data-vsc-tabx] 关闭与浮动。 */
				if (docked.length > 0) {
					const tabs = docked.map(function (id) {
						const on = id === active
						const def = panelDefs.get(id)
						if (def === undefined) return null
						return React.createElement('span', {
							key: id,
							'data-vsc-tab-active': on ? '' : undefined,
							style: { display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 8px', fontSize: 13, cursor: 'pointer', borderRadius: 8, flex: '0 0 auto', color: on ? 'var(--dsw-alias-label-primary)' : 'var(--dsw-alias-label-secondary)', background: on ? 'var(--dsw-alias-interactive-bg-hover)' : 'transparent', border: '1px solid ' + (on ? 'var(--dsw-alias-border-l2)' : 'transparent'), transition: UI_TRANSITION },
							onClick: function () { activePanel = id; notify() }
						},
							React.createElement('span', { style: { maxWidth: 132, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }, def.title),
							React.createElement('span', { 'data-vsc-tabx': '', title: '关闭', onClick: function (ev) { ev.stopPropagation(); dockApi.closePanel(id) } }, React.createElement(CloseIcon, { size: 10 })),
							React.createElement('span', { 'data-vsc-tabx': '', title: '浮动', onClick: function (ev) { ev.stopPropagation(); dockApi.floatPanel(id) } }, React.createElement(FloatIcon, { size: 11 }))
						)
					})
					const menuRows = docked.map(function (id) {
						const def = panelDefs.get(id)
						if (def === undefined) return null
						const on = id === active
						return React.createElement('div', {
							key: id,
							style: { display: 'flex', alignItems: 'center', gap: 6, padding: '5px 8px', borderRadius: 8, cursor: 'pointer', fontSize: 14, color: 'var(--dsw-alias-label-primary)', background: on ? 'var(--dsw-alias-interactive-bg-hover)' : 'transparent', transition: UI_TRANSITION },
							onClick: function () { activePanel = id; setTabsMenuOpen(false); notify() }
						},
							React.createElement('span', { style: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 18, height: 18, fontSize: 14, lineHeight: 1, flex: 'none' } }, def.icon || '🧩'),
							React.createElement('span', { style: { flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }, def.title),
							React.createElement('span', { 'data-vsc-tabx': '', title: '浮动', onClick: function (ev) { ev.stopPropagation(); dockApi.floatPanel(id) } }, React.createElement(FloatIcon, { size: 11 })),
							React.createElement('span', { 'data-vsc-tabx': '', title: '关闭', onClick: function (ev) { ev.stopPropagation(); dockApi.closePanel(id) } }, React.createElement(CloseIcon, { size: 10 }))
						)
					})
					body.push(React.createElement('div', {
						key: 'tabs',
						'data-vsc-pptabsrow': '',
						/* v1.15.0: alignItems 改为 flex-start —— 滚动条出现/消失时标签
						   条高度会变（+8px），居中会让标签上下漂移；顶对齐后标签位置
						   恒定，`▾` 也按同一基线对齐。 */
						style: { display: 'flex', alignItems: 'flex-start', gap: 4, padding: '5px 12px', borderBottom: '1px solid var(--dsw-alias-border-l1)', flex: 'none', position: 'relative' }
					},
						/* v1.14.0: ▾ 放在标签条最前面（与芯片行「···」置顶的用法一致，
						   面板拖窄时也不必先滑到最右才能点到） */
						React.createElement('button', {
							type: 'button',
							'data-vsc-pptmore': '',
							title: '全部已打开插件',
							'aria-expanded': tabsMenuOpen ? 'true' : 'false',
							/* v1.15.0: 28x28 与标签同高，顶部对齐 */
							style: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flex: 'none', alignSelf: 'flex-start', width: 28, height: 28, padding: 0, borderRadius: 8, border: '1px solid var(--dsw-alias-border-l1)', background: tabsMenuOpen ? 'var(--dsw-alias-interactive-bg-hover)' : 'transparent', color: 'var(--dsw-alias-label-secondary)', fontSize: 12, lineHeight: 1, cursor: 'pointer', transition: UI_TRANSITION },
							onClick: function () { setTabsMenuOpen(!tabsMenuOpen) }
						}, '▾'),
						React.createElement('div', {
							ref: tabsRef,
							'data-vsc-pptabs': '',
							/* v1.15.0: paddingBottom = 宿主滚动条宽度 —— 横向滚动条画在
							   内边距里，于是标签底部与滚动条之间恒定留出 8px（与芯片行
							   一致），不再紧贴；`scrollbarGutter:'stable'` 让轨道常驻，
							   溢出与否行高不变（宿主不支持时退化为溢出时才增高 8px）。 */
							style: { flex: 1, minWidth: 0, display: 'flex', alignItems: 'flex-start', gap: 4, flexWrap: 'nowrap', overflowX: 'auto', overflowY: 'hidden', paddingBottom: 'var(--dsh-scrollbar-width, 8px)', scrollbarGutter: 'stable' }
						}, ...tabs),
						tabsMenuOpen ? React.createElement('div', {
							key: 'tabsmenu',
							/* v1.15.0: top 改为行底（行高随滚动条变化，固定 38px 会压住标签） */
							style: { position: 'absolute', left: 8, top: 'calc(100% - 4px)', zIndex: 5, minWidth: 220, maxWidth: 'calc(100% - 16px)', maxHeight: 280, overflowY: 'auto', padding: 6, display: 'flex', flexDirection: 'column', gap: 4, background: 'var(--dsw-alias-bg-layer-1)', border: '1px solid var(--dsw-alias-border-l2)', borderRadius: 12, boxShadow: 'var(--dsw-shadow-lv2)' }
						}, ...menuRows) : null
					))
				}
				/* active plugin content (or empty hint) */
				if (active !== null) {
					body.push(React.createElement(PanelMount, { key: 'content', def: panelDefs.get(active) }))
				} else {
					body.push(React.createElement('div', { key: 'empty', style: { flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--dsw-alias-label-tertiary)', fontSize: 14, textAlign: 'center', padding: '0 16px' } },
						ids.length === 0 ? '暂无插件 — 插件注册后自动出现在这里' : '从上方列表选择插件打开'
					))
				}
				return React.createElement('div', { style: { display: 'flex', flexDirection: 'column', height: '100%', width: '100%', minHeight: 0 } }, ...body)
			}

			/* floating form of the plugin panel itself (classic mode detach) */
			function PluginPanelFloat() {
				useEngine()
				const pp = layoutState.pluginPanel
				/* v1.8.1: full 8-direction resize handles, matching the card float
				   chrome (n/s/e/w strips + four corners) */
				const dirs = [
					['n', 'n-resize', '12px', '-3px', 'calc(100% - 24px)', '6px'],
					['s', 's-resize', '12px', 'calc(100% - 3px)', 'calc(100% - 24px)', '6px'],
					['e', 'e-resize', 'calc(100% - 3px)', '12px', '6px', 'calc(100% - 24px)'],
					['w', 'w-resize', '-3px', '12px', '6px', 'calc(100% - 24px)'],
					['nw', 'nwse-resize', '-6px', '-6px', '12px', '12px'],
					['ne', 'nesw-resize', 'calc(100% - 6px)', '-6px', '12px', '12px'],
					['sw', 'nesw-resize', '-6px', 'calc(100% - 6px)', '12px', '12px'],
					['se', 'nwse-resize', 'calc(100% - 6px)', 'calc(100% - 6px)', '12px', '12px']
				]
				return React.createElement('div', {
					'data-vsc-ppfloat': '',
					style: Object.assign({ left: pp.fx, top: pp.fy, width: pp.fw, height: pp.fh }, FLOAT_WINDOW_STYLE),
					children: [
						React.createElement('div', {
							key: 'bar',
							style: { display: 'flex', alignItems: 'center', gap: 6, padding: '8px 12px', fontSize: 14, color: 'var(--dsw-alias-label-secondary)', cursor: 'grab', borderBottom: '1px solid var(--dsw-alias-border-l1)', flex: 'none' },
							onPointerDown: function (e) { startPluginPanelFloatMove(e) }
						},
							React.createElement('span', { style: { flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: 'var(--dsw-alias-label-primary)' } }, '🧩 插件面板'),
							React.createElement('button', { type: 'button', style: PANEL_BTN, onPointerDown: function (e) { e.stopPropagation() }, onClick: function () { layoutState.pluginPanel.float = false; saveLayoutState(); applyLayout(); notify() } }, '回停靠'),
							React.createElement('button', { type: 'button', 'data-vsc-hdrx': '', onPointerDown: function (e) { e.stopPropagation() }, onClick: function () { closeDock() } }, React.createElement(CloseIcon, { size: 12 }))
						),
						React.createElement(DockPanelBody, { key: 'body', showHeader: false }),
						dirs.map(function (d) {
							return React.createElement('div', {
								key: 'rsz-' + d[0],
								style: { position: 'absolute', left: d[2], top: d[3], width: d[4], height: d[5], cursor: d[1], zIndex: 33, touchAction: 'none', pointerEvents: 'auto' },
								onPointerDown: function (e) { startPluginPanelFloatResizeDir(e, d[0]) }
							})
						})
					]
				})
			}

			function DockHost() {
				useEngine()
				if (settingsOpen) return null
				/* v1.15.1: 渲染期不做会 notify 的 resolveFrame()（那会 rearm→notify 递归）；
				   用 renderFrame() 只更新引用，renderGeom() 缓存为 0 时现场量活框架。 */
				if (renderFrame() === null) return null
				if (renderGeom().w <= 0) return null
				const parts = []
				const isCard = layoutState.mode === 'card'
				const pp = layoutState.pluginPanel
				if (isCard) {
					/* card mode: the plugin panel is PORTALED inside the dock card
					   (frame.children[2]) as an inset:0 layer. v1.8.2: the panel then
					   rides the card natively — grid resize, drag, five-region
					   docking and floating all move it with zero React positioning
					   per frame (no more lag on the dock-card handle), and the
					   card's own surface (sidebar-fill docked / glass float with
					   radius) shows through, so docked and floating looks match the
					   other cards exactly. */
					if (pluginPanelOpen() && !pp.float) {
						const dkEl = frame.children[2]
						/* v1.13.1: portaling into a DETACHED host column drops the
						   panel silently (zero-rect render); skip until the node is
						   actually in the document — next engine tick picks it up. */
						if (dkEl !== undefined && dkEl !== null && dkEl.isConnected === true) {
							const floated = layoutState.dock.dock === 'float'
							parts.push(ReactDom.createPortal(
								React.createElement('div', {
									key: 'dhost',
									'data-vsc-dhost': '',
									style: { position: 'absolute', inset: 0, zIndex: 21, display: 'flex', flexDirection: 'column', overflow: 'hidden', pointerEvents: 'auto', boxSizing: 'border-box', ...(floated ? { paddingTop: 20 } : {}) },
									children: React.createElement(DockPanelBody, { key: 'body', showHeader: !floated })
								}),
								dkEl
							))
						}
					}
				} else if (pp.open && !pp.float) {
					/* v1.12.0: classic mode — the plugin panel is the THIRD GRID
					   COLUMN (portal into frame.children[2], the official details
					   column element), the same surface as the card-mode docked
					   panel: applyClassicLayout stamps data-vsc-pp3 + --vsc-pp-cols
					   to make the grid track, the native details content is hidden
					   by CSS, and the left-edge pill handle (data-vsc-pphand)
					   resizes the column. The strip/header drag floats the panel
					   (startPluginPanelDetach); 回停靠 returns it to the column. */
					const col = frame.children[2]
					if (col !== undefined && col !== null && col.isConnected === true) {
						parts.push(ReactDom.createPortal(
							React.createElement('div', {
								key: 'dhost-classic',
								'data-vsc-dhost': '',
								style: { position: 'absolute', inset: 0, zIndex: 21, display: 'flex', flexDirection: 'column', overflow: 'hidden', pointerEvents: 'auto', boxSizing: 'border-box' },
								children: [
									React.createElement('div', { key: 'resize', 'data-vsc-pphand': '', title: '拖动调整宽度', onPointerDown: function (e) { startClassicPanelResize(e) } }),
									React.createElement(DockPanelBody, { key: 'body', showHeader: true })
								]
							}),
							col
						))
					}
				}
				for (const id of panelDefs.keys()) {
					const p = layoutState.panels[id]
					if (p === undefined || !p.open || !p.float) continue
					parts.push(React.createElement(PanelFloat, { key: 'pfloat-' + id, id: id, def: panelDefs.get(id) }))
				}
				if (!isCard && pp.open && pp.float) {
					parts.push(React.createElement(PluginPanelFloat, { key: 'ppfloat' }))
				}
				return parts.length > 0 ? React.createElement(React.Fragment, null, ...parts) : null
			}

			/* header utilities entry: one "插件面板" toggle in every mode */
			function PluginPanelEntry() {
				useEngine()
				const isCard = layoutState.mode === 'card'
				const on = isCard ? pluginPanelOpen() : layoutState.pluginPanel.open
				function toggle() {
					if (on) closeDock()
					else {
						layoutState.pluginPanel.open = true
						saveLayoutState()
						applyLayout()
						notify()
					}
				}
				return React.createElement('button', {
					type: 'button',
					className: 'ubeautify-ppentry' + (on ? ' ubeautify-ppon' : ''),
					onClick: toggle,
					title: '插件面板'
				}, '🧩 插件面板')
			}

			/* ---------- settings: layout group ---------- */
			function SettingsPanel() {
				useEngine()
				const base = { padding: '20px 8px', borderTop: '1px solid var(--dsw-alias-border-l1)', marginTop: 12, paddingTop: 24, color: 'var(--dsw-alias-label-primary)' }
				const h3 = { margin: '0 0 8px', fontSize: 16, fontWeight: 600 }
				const p = { margin: '0 0 24px', color: 'var(--dsw-alias-label-secondary)', fontSize: 14 }
				const labelStyle = { display: 'block', marginBottom: 8, color: 'var(--dsw-alias-label-secondary)', fontSize: 14 }
				const rowStyle = { display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }
				const pill = function (active) {
					return {
						padding: '6px 14px', borderRadius: 999, cursor: 'pointer', fontSize: 14,
						border: active ? '1px solid var(--dsw-static-neutral-bluish-400)' : '1px solid var(--dsw-alias-border-l2)',
						background: active ? 'var(--dsw-alias-bg-module-platform)' : 'transparent',
						color: 'var(--dsw-alias-label-primary)'
					}
				}
				const ghost = { padding: '6px 14px', borderRadius: 8, cursor: 'pointer', fontSize: 14, border: '1px solid var(--dsw-alias-border-l2)', background: 'transparent', color: 'var(--dsw-alias-label-secondary)' }
				function setMode(m) {
					layoutState.mode = m
					/* the classic-mode float window has no place in card mode — the
					   plugin panel docks into the dock card there */
					if (m === 'card') layoutState.pluginPanel.float = false
					saveLayoutState()
					applyLayout()
					notify()
				}
				function resetLayout() {
					const fresh = JSON.parse(JSON.stringify(LAYOUT_DEFAULTS))
					fresh.mode = layoutState.mode
					Object.assign(layoutState.sidebar, fresh.sidebar)
					Object.assign(layoutState.conversation, fresh.conversation)
					Object.assign(layoutState.dock, fresh.dock)
					Object.assign(layoutState.pluginPanel, fresh.pluginPanel)
					layoutState.panels = fresh.panels
					/* v1.15.0: 打开序号计数器一并归零（面板状态行已被清空） */
					layoutState.panelSeq = 0
					/* v1.12.4: registered panels keep their default state rows —
					   wiping panels orphans every registered panel (openPanel
					   silently returned on the missing row) */
					for (const id of panelDefs.keys()) panelState(id)
					activePanel = null
					saveLayoutState()
					applyLayout()
					notify()
				}
				return React.createElement('div', { style: base },
					React.createElement('h3', { style: h3 }, '布局'),
					React.createElement('p', { style: p }, '卡片模式：拖住卡片顶栏即脱离为浮动窗口，拖到上/下/左/右边缘或中间区域吸附回位（每张卡可停靠任意区域）；手柄拖拽调宽/调高，双击重置；状态自动记忆。'),
					React.createElement('div', { style: { marginBottom: 18 } },
						React.createElement('span', { style: labelStyle }, '布局模式'),
						React.createElement('div', { style: rowStyle },
							React.createElement('button', { type: 'button', style: pill(layoutState.mode === 'classic'), onClick: function () { setMode('classic') } }, '经典'),
							React.createElement('button', { type: 'button', style: pill(layoutState.mode === 'card'), onClick: function () { setMode('card') } }, '卡片')
						)
					),
					React.createElement('div', { style: { marginBottom: 18 } },
						React.createElement('span', { style: labelStyle }, '插件面板（插件列表 + 标签页宿主）'),
						React.createElement('div', { style: rowStyle },
							React.createElement('button', { type: 'button', style: pill(layoutState.pluginPanel.open), onClick: function () { layoutState.pluginPanel.open = true; saveLayoutState(); applyLayout(); notify() } }, '打开'),
							React.createElement('button', { type: 'button', style: pill(!layoutState.pluginPanel.open), onClick: function () { closeDock() } }, '关闭')
						)
					),
					React.createElement('button', { type: 'button', style: ghost, onClick: resetLayout }, '恢复默认布局')
				)
			}

			/* ---------- combined "UI设置" section ---------- */
			function UiSettingsPanel() {
				return React.createElement("div", null,
					React.createElement(Panel),
					React.createElement(SettingsPanel)
				)
			}

			/* ---------- lifecycle ---------- */
			function watch() {
				mo = new MutationObserver(function (muts) {
					for (const m of muts) {
						if (m.type === 'attributes') {
							if (m.attributeName === 'data-sidebar-collapsed' || m.attributeName === 'data-details-collapsed') syncCollapsed()
							/* v1.12.0: the core rewrites the inline grid (sidebar/detail
							   widths) on every drag — re-resolve the sidebar track while
							   the classic three-column panel is live, so the panel
							   column follows the new sidebar width. */
							else if (m.attributeName === 'style' && layoutState.mode === 'classic' && frame !== null && frame.hasAttribute('data-vsc-pp3')) applyClassicLayout()
						} else if (m.type === 'childList') {
							if (frame !== null && !document.contains(frame)) {
								teardown()
								init()
								return
							}
							/* the frame survived but its column nodes were replaced (React remount):
							   re-tag and re-apply so the new children get their card roles again.
							   v1.12.0: classic-mode three-column panel re-stamps too —
							   closeDetails() re-renders the frame while the panel is open. */
							if (frame !== null) {
								if (frame.hasAttribute('data-vsc-layout')) { tagColumns(); applyLayout() }
								else applyLayout()
							}
						}
					}
				})
				mo.observe(frame, { attributes: true, childList: true, subtree: false })
				ro = new ResizeObserver(function () {
					/* v1.15.1: 若宿主已把框架换成新节点，这里观察到的旧节点会报 0×0；
					   resolveFrame() 会借这次回调把观察者重新武装到活节点上（并重测），
					   因此不能用 measure() 之外的路径写 geom。 */
					measure()
					applyLayout()
				})
				ro.observe(frame)
				/* v1.9.1: click-to-front — pointerdown anywhere inside a floating
				   card raises it above the other floating cards */
				frame.addEventListener('pointerdown', onCardPointerDown, true)
				/* v1.8.8: the debug probe interval only starts when enabled */
				if (debugEnabled() && probeTimer === null) probeTimer = window.setInterval(probeTick, 500)
			}
			function teardown() {
				if (frame !== null) frame.removeEventListener('pointerdown', onCardPointerDown, true)
				if (mo !== null) { mo.disconnect(); mo = null }
				if (ro !== null) { ro.disconnect(); ro = null }
				if (settingsMo !== null) { settingsMo.disconnect(); settingsMo = null }
				if (settingsTimer !== null) { window.clearInterval(settingsTimer); settingsTimer = null }
				if (probeTimer !== null) { window.clearInterval(probeTimer); probeTimer = null }
				if (healthTimer !== null) { window.clearInterval(healthTimer); healthTimer = null }
				if (probeEl !== null) { probeEl.remove(); probeEl = null }
				clearProbeStyles()
				/* v1.13.0: an in-flight drag settled here leaves dragState stale,
				   which would disable every card grab strip after a self-heal
				   re-init (pushGrabStrips bails while dragState !== null). */
				dragState = null
				observedFrame = null
				removeAll()
			}
			function init() {
				frame = findFrame()
				if (frame === null) return false
				/* v1.15.1: 统一走 rearm —— 它会重新测量、重新武装观察者并重放布局 */
				observedFrame = null
				rearm(frame)
				if (healthTimer === null) healthTimer = window.setInterval(healthCheck, 1000)
				return true
			}
			/* v1.15.1: 兜底自愈。宿主替换框架节点时，旧 ResizeObserver 不会为新节点
			   再触发（旧节点尺寸恒为 0），MutationObserver 观察的是框架**自身子节点**、
			   对"框架被摘除/替换"完全无感。每秒做一次极轻量的体检：节点不在了就
			   重新定位并重新武装；geom 还是 0 就重测并重放布局。正常路径只做一次
			   isConnected 判断，零开销。 */
			function healthCheck() {
				if (disposed) return
				const node = resolveFrame()
				if (node === null) return
				if (geom.w > 0 && geom.h > 0) return
				measure()
				if (geom.w > 0 && geom.h > 0) { tagColumns(); applyLayout(); notify() }
			}
			let attempts = 0
			function waitFrame() {
				/* v1.8.8: stop retrying once the plugin is unloaded (the pending
				   timeouts would otherwise keep probing a dead context) */
				if (disposed) return
				if (init()) return
				attempts += 1
				if (attempts > 120) { console.warn('[dsh-ui-beautify] layout frame not found — engine disabled') ; return }
				setTimeout(waitFrame, 250)
			}
			waitFrame()

			/* ---------- effects ---------- */
			ctx.effect(function appearanceCleanup() {
				return function dispose() {
					if (presetTokenDisposer) { presetTokenDisposer(); presetTokenDisposer = null; }
					if (presetCssDisposer) { presetCssDisposer(); presetCssDisposer = null; }
					clearBackgroundImage(false);
					settingsRestoreDisposer();
				};
			});
			ctx.effect(function provideDock() {
				/* v1.13.1: 外部插件拿到的是守护式 dynamic ctx——仅放行
				   CTX_VERBS（effect/on/once/provide/超时族），`reflect` 不在其列，
				   原 `ctx.reflect.provide('dock', …)` 会被 rejectGuard 拒绝、dock
				   服务实际不存在（file-explorer/billing 的坞面板集成静默失效）。
				   改为正式契约 `ctx.provide`（cordis 同名语义，见安装版
				   cordis/lib/index.js provide(name, value, check)）。 */
				return ctx.provide('dock', dockApi)
			})
			ctx.effect(function registerChrome() {
				return slots.inject('shell.overlay', function () {
					return slots.register(
						{ name: 'shell.overlay', id: 'layout-studio-chrome', order: 30 },
						function () { return React.createElement(Chrome) }
					)
				})
			})
			ctx.effect(function registerDockHost() {
				return slots.inject('shell.overlay', function () {
					return slots.register(
						{ name: 'shell.overlay', id: 'layout-studio-dockhost', order: 29 },
						function () { return React.createElement(DockHost) }
					)
				})
			})
			ctx.effect(function registerPluginPanelEntry() {
				return slots.inject('conversation.session.header.utilities', function () {
					return slots.register(
						{ name: 'conversation.session.header.utilities', id: 'plugin-panel-entry', order: 20, label: '插件面板' },
						function () { return React.createElement(PluginPanelEntry) }
					)
				})
			})
			ctx.effect(function registerUiSettings() {
				return slots.inject('settings.section', function () {
					return slots.register(
						{ name: 'settings.section', id: 'ui-settings', order: 5, label: 'UI设置' },
						function () { return React.createElement(UiSettingsPanel) }
					);
				});
			});
			ctx.effect(function layoutCleanup() {
				return function dispose() {
					disposed = true
					/* v1.8.8: abort any in-flight drag (window listeners, dragging
					   marker, dragtop) before tearing the engine down */
					for (const settle of [...activeDrags]) { try { settle() } catch (err) {} }
					teardown()
					cssDisposer()
				}
			})
		}

		const inject = ["theme", "slots"];

		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});
