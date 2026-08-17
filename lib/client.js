window.__ModuleLoader__.load({
	id: "dsh-ui-beautify",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		const React = require("react");

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
		 * Neutralizes the workspace session-list bottom fade (`.qDHVXG_fade`),
		 * which would otherwise paint a visible white gradient over a custom
		 * sidebar/background. Selectors are pinned to the shipped 0.1.0-rc.6
		 * client bundles; revisit after a DSH upgrade.
		 */
		const FADE_KILL_CSS = [
			".qDHVXG_fade{background:none !important;}",
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

			/* ==================================================================
			 * 外观美化 (原有功能)
			 * ================================================================== */
			let state = { preset: "default" };
			let presetTokenDisposer = null;
			let presetCssDisposer = null;
			let bg = null;

			function presetCss(id) {
				const b = PRESETS[id].bubble;
				const bt = PRESETS[id].button;
				return ".gdEzaW_bubble{background:" + b.light + " !important;}" +
					"body[data-ds-dark-theme] .gdEzaW_bubble{background:" + b.dark + " !important;}" +
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

				const base = { padding: "16px 4px", color: "var(--dsw-alias-label-primary)" };
				const h3 = { margin: "0 0 6px", fontSize: 16, fontWeight: 600 };
				const p = { margin: "0 0 18px", color: "var(--dsw-alias-label-secondary)", fontSize: 12 };
				const labelStyle = { display: "block", marginBottom: 8, color: "var(--dsw-alias-label-secondary)", fontSize: 12 };
				const rowStyle = { display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" };
				const pill = function (active) {
					return {
						padding: "6px 14px", borderRadius: 999, cursor: "pointer", fontSize: 13,
						border: active ? "1px solid var(--dsw-static-neutral-bluish-400)" : "1px solid var(--dsw-alias-border-l2)",
						background: active ? "var(--dsw-alias-bg-module-platform)" : "transparent",
						color: "var(--dsw-alias-label-primary)"
					};
				};
				const ghost = { padding: "6px 14px", borderRadius: 8, cursor: "pointer", fontSize: 13, border: "1px solid var(--dsw-alias-border-l2)", background: "transparent", color: "var(--dsw-alias-label-secondary)" };

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
					React.createElement("p", { style: p }, "v1.7.9：修复卡片模式所有悬停提示被隐藏（统计行全文、按钮提示等恢复原生），设置自动记忆，全局强调色（文件夹、加载螺旋、标签高亮、Deep Diving、超链接等）跟随预设。"),
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
				pluginPanel: { open: false, float: false, width: 400, fx: 140, fy: 80, fw: 560, fh: 420, listHeight: 40 },
				panels: {}
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
						for (const k of ['width', 'fx', 'fy', 'fw', 'fh', 'listHeight']) {
							if (typeof pp[k] === 'number') base.pluginPanel[k] = Math.round(pp[k])
						}
						base.pluginPanel.width = Math.min(2000, Math.max(240, base.pluginPanel.width))
						base.pluginPanel.listHeight = Math.min(260, Math.max(36, base.pluginPanel.listHeight))
					}
					if (saved.panels && typeof saved.panels === 'object') {
						for (const id of Object.keys(saved.panels)) {
							const p = saved.panels[id]
							if (p && typeof p === 'object') {
								base.panels[id] = {
									open: p.open === true,
									float: p.float === true,
									x: typeof p.x === 'number' ? Math.round(p.x) : 140,
									y: typeof p.y === 'number' ? Math.round(p.y) : 80,
									w: typeof p.w === 'number' ? Math.round(p.w) : 560,
									h: typeof p.h === 'number' ? Math.round(p.h) : 420
								}
							}
						}
					}
				}
				return base
			}
			const layoutState = mergeLayoutState(loadLayoutState())
			function saveLayoutState() {
				try { localStorage.setItem(LAYOUT_STORAGE_KEY, JSON.stringify(layoutState)) } catch (e) { console.warn('[dsh-ui-beautify] layout persist failed', e) }
			}

			/* ---------- css ---------- */
			const SHEET = [
				'[data-vsc-layout]{grid-template-columns:var(--vsc-cols,280px minmax(0,1fr))!important;grid-template-rows:var(--vsc-rows,minmax(0,1fr))!important}',
				'[data-vsc-layout][data-vsc-dragging]{transition:none!important}',
				'[data-vsc-layout] [data-vsc-card]{min-width:0;min-height:0}',
				'[data-vsc-layout] [data-vsc-card="sidebar"]{grid-column:var(--vsc-sb-col,1);grid-row:var(--vsc-sb-row,1 / -1)}',
				'[data-vsc-layout] [data-vsc-card="conversation"]{grid-column:var(--vsc-cv-col,2);grid-row:var(--vsc-cv-row,1)}',
				'[data-vsc-layout] [data-vsc-card="dock"]{grid-column:var(--vsc-dk-col,auto);grid-row:var(--vsc-dk-row,auto)}',
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
				'[data-vsc-layout] [data-vsc-card][data-vsc-float]{position:absolute!important;z-index:19;border:1px solid var(--dsw-alias-border-l2);border-radius:12px;box-shadow:0 8px 32px rgba(0,0,0,.16);overflow:hidden;box-sizing:border-box;padding-top:20px}',
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
				'[data-vsc-zone]{position:absolute;border:2px dashed var(--dsw-alias-brand-primary);background:color-mix(in srgb, var(--dsw-alias-brand-primary) 12%, transparent);border-radius:10px;pointer-events:none;z-index:40;display:flex;align-items:center;justify-content:center;color:var(--dsw-alias-label-secondary);font-size:12px}',
				'[data-vsc-zone][data-hot]{background:color-mix(in srgb, var(--dsw-alias-brand-primary) 30%, transparent);border-style:solid;color:var(--dsw-alias-label-primary)}',
				'[data-vsc-ftop]{position:absolute;cursor:grab;pointer-events:auto;background:transparent;z-index:34}',
				'[data-vsc-ftop]:after{content:"";position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:48px;height:4px;border-radius:2px;background:var(--dsw-alias-border-l3);opacity:0;transition:opacity 150ms ease}',
				'[data-vsc-ftop]:hover:after{opacity:1}',
				'[data-vsc-fclose]{position:absolute;width:22px;height:22px;border:none;background:transparent;color:var(--dsw-alias-label-secondary);cursor:pointer;border-radius:6px;font-size:13px;line-height:1;opacity:.6;pointer-events:auto;z-index:34}',
				'[data-vsc-fclose]:hover{opacity:1;background:var(--dsw-alias-interactive-bg-hover)}',
				/* v1.8: session-header "插件面板" entry (mirrors the file-explorer
				   button language: transparent capsule, active tint) */
				'.ubeautify-ppentry{display:inline-flex;align-items:center;justify-content:center;gap:6px;height:32px;padding:0 10px;border:none;background:transparent;border-radius:6px;color:inherit;cursor:pointer;font-size:14px;line-height:1;flex-shrink:1}',
				'.ubeautify-ppentry:hover{background:rgba(127,127,127,.16)}',
				'.ubeautify-ppentry.ubeautify-ppon{background:rgba(90,140,255,.28)}',
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
				/* message time-details reveal extension (v1.7.8): the native rule only fades
				   the time row in while hovering [data-time-hover-root] — the user bubble
				   row and the turn tail below each assistant reply. Hovering the assistant
				   message TEXT (a sibling above the tail) triggers nothing. The JS
				   delegation below stamps data-vsc-time-reveal on the root that belongs to
				   the hovered text, so the time details appear for the whole message. */
				'[data-vsc-layout] [data-vsc-time-reveal] :is([class*="timeStart"],[class*="timeEnd"]){opacity:1!important}'
			].join('\n')
			const cssDisposer = insertCss(SHEET)

			/* ---------- shared helpers ---------- */
			const cardPrefix = (card) => card === 'sidebar' ? 'sb' : card === 'conversation' ? 'cv' : 'dk'
			const FLOAT_MIN_W = { sidebar: 264, conversation: 480, dock: 360 }
			const FLOAT_MIN_H = { sidebar: 240, conversation: 320, dock: 240 }
			const SIDEBAR_RAIL = 56
			const PANEL_BTN = { border: '1px solid var(--dsw-alias-border-l2)', background: 'transparent', color: 'var(--dsw-alias-label-secondary)', borderRadius: 6, fontSize: 11, padding: '1px 7px', cursor: 'pointer', lineHeight: 1.5 }

			function clamp(v, min, max) { return Math.min(max, Math.max(min, Math.round(v))) }
			/* five universal dock regions — any card may dock to any of them. Edge hit-testing
			   is vertical-first (top/bottom before left/right); the center region is the middle
			   rectangle; anything else stays floating. */
			const ZONE_EDGE = 0.18
			const ZONE_LABELS = { top: '停靠顶部', bottom: '停靠底部', left: '停靠左侧', right: '停靠右侧', center: '回到中间' }
			function zoneFor(x, y, w, h) {
				if (y < h * ZONE_EDGE) return 'top'
				if (y > h * (1 - ZONE_EDGE)) return 'bottom'
				if (x < w * ZONE_EDGE) return 'left'
				if (x > w * (1 - ZONE_EDGE)) return 'right'
				if (x >= w * 0.38 && x <= w * 0.62 && y >= h * 0.34 && y <= h * 0.66) return 'center'
				return null
			}
			function zoneRect(id, w, h) {
				switch (id) {
					case 'top': return { left: 0, top: 0, width: w, height: h * ZONE_EDGE }
					case 'bottom': return { left: 0, top: h * (1 - ZONE_EDGE), width: w, height: h * ZONE_EDGE }
					case 'left': return { left: 0, top: 0, width: w * ZONE_EDGE, height: h }
					case 'right': return { left: w * (1 - ZONE_EDGE), top: 0, width: w * ZONE_EDGE, height: h }
					default: return { left: w * 0.38, top: h * 0.34, width: w * 0.24, height: h * 0.32 }
				}
			}
			/* live rect of a card, relative to the frame (used by chrome handles, grab strips
			   and the dock host — always matches the actual grid placement) */
			function cardRect(key) {
				if (frame === null) return null
				const idx = key === 'sidebar' ? 0 : key === 'conversation' ? 1 : 2
				const el = frame.children[idx]
				if (el === undefined) return null
				const fr = frame.getBoundingClientRect()
				const r = el.getBoundingClientRect()
				if (r.width <= 0 || r.height <= 0) return null
				return { left: Math.round(r.left - fr.left), top: Math.round(r.top - fr.top), width: Math.round(r.width), height: Math.round(r.height) }
			}
			/* v1.8.1: deterministic dock-card rect derived from LAYOUT STATE rather
			   than a live DOM measurement. After a mode round-trip the grid can be
			   mid-transition or the measurement window can return zero — the plugin
			   panel must never be unrendered because of that. Edge-docked positions
			   are pure math; center/float try the live rect first and fall back to
			   the right region as a best effort. */
			function dockRegionRect() {
				if (frame === null) return null
				const dk = layoutState.dock
				if (dk.dock === 'center' || dk.dock === 'float') {
					const r = cardRect('dock')
					if (r !== null) return r
				}
				const fr = frame.getBoundingClientRect()
				const fw = Math.round(fr.width)
				const fh = Math.round(fr.height)
				if (fw <= 0 || fh <= 0) return null
				const cw = dk.width
				const ch = dk.height
				switch (dk.dock) {
					case 'left': return { left: 0, top: 0, width: cw, height: fh }
					case 'top': return { left: 0, top: 0, width: fw, height: ch }
					case 'bottom': return { left: 0, top: fh - ch, width: fw, height: ch }
					case 'right':
					default: return { left: Math.max(0, fw - cw), top: 0, width: cw, height: fh }
				}
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
			function ensureActive() {
				if (activePanel !== null) {
					const p = layoutState.panels[activePanel]
					if (p !== undefined && p.open && !p.float) return
				}
				activePanel = null
				for (const id of panelDefs.keys()) {
					const p = layoutState.panels[id]
					if (p !== undefined && p.open && !p.float) { activePanel = id; return }
				}
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
			const dockApi = {
				registerPanel(def) {
					if (panelDefs.has(def.id)) return function () {}
					panelDefs.set(def.id, def)
					if (layoutState.panels[def.id] === undefined) {
						layoutState.panels[def.id] = { open: false, float: false, x: 140, y: 80, w: 560, h: 420 }
					}
					if (layoutState.panels[def.id].open) { ensureActive(); applyLayout(); notify() }
					return function () {
						const p = layoutState.panels[def.id]
						if (p !== undefined) p.open = false
						panelDefs.delete(def.id)
						ensureActive()
						saveLayoutState()
						applyLayout()
						notify()
					}
				},
				openPanel(id) {
					const p = layoutState.panels[id]
					if (p === undefined) return
					p.open = true
					layoutState.pluginPanel.open = true
					ensureActive()
					saveLayoutState()
					applyLayout()
					notify()
				},
				closePanel(id) {
					const p = layoutState.panels[id]
					if (p === undefined) return
					p.open = false
					ensureActive()
					/* closing the last docked plugin also closes the whole panel —
					   same semantics as the panel × (nothing left to show) */
					if (!panelVisible()) layoutState.pluginPanel.open = false
					saveLayoutState()
					applyLayout()
					notify()
				},
				floatPanel(id) {
					const p = layoutState.panels[id]
					if (p === undefined) return
					p.float = true
					layoutState.pluginPanel.open = true
					ensureActive()
					saveLayoutState()
					applyLayout()
					notify()
				},
				dockPanel(id) {
					const p = layoutState.panels[id]
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
				subscribe(fn) {
					return subscribe(fn)
				}
			}

			/* ---------- frame / columns ---------- */
			let frame = null
			let mo = null
			let ro = null
			let settingsMo = null
			let settingsTimer = null
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
				if (seat !== null && seat.firstElementChild !== null) {
					try { open = window.getComputedStyle(seat.firstElementChild).position === 'fixed' } catch (e) { open = false }
				}
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
				if (watchSettings()) return
				settingsAttempts += 1
				if (settingsAttempts > 120) return
				setTimeout(waitSettings, 250)
			}

			function findFrame() {
				const root = document.querySelector('[data-slot="root"]')
				return root !== null && root.firstElementChild !== null ? root.firstElementChild : null
			}
			function setVar(name, value) { if (frame !== null) frame.style.setProperty(name, value) }
			function removeVar(name) { if (frame !== null) frame.style.removeProperty(name) }
			function tagColumns() {
				if (frame === null) return
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
			function applyLayout() {
				if (frame === null) return
				if (layoutState.mode !== 'card') { removeAll(); notify(); return }
				frame.setAttribute('data-vsc-layout', '')
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
				const railW = (k) => (k === 'sidebar' && collapsedSidebar ? SIDEBAR_RAIL : layoutState[k].width)
				if (slots.left) { cols.push(railW(slots.left) + 'px'); colOf[slots.left] = cols.length }
				if (slots.center) { cols.push('minmax(0,1fr)'); colOf[slots.center] = cols.length }
				else if (slots.left && slots.right) cols.push('minmax(0,1fr)') /* free middle column keeps the right card on the right */
				if (slots.right) { cols.push(railW(slots.right) + 'px'); colOf[slots.right] = cols.length }
				if (cols.length === 0) cols.push('minmax(0,1fr)')
				/* a lone fixed column (e.g. only the dock card docked left while the others
				   float) must leave a free track so the card does not sit in a sliver of
				   the frame with the rest empty */
				if (cols.length === 1 && !cols[0].includes('1fr')) cols.push('minmax(0,1fr)')

				const rows = []
				let mainRow = 1
				if (slots.top) { rows.push(layoutState[slots.top].height + 'px'); rowOf[slots.top] = 1; mainRow = 2 }
				rows.push('minmax(0,1fr)')
				for (const k of [slots.left, slots.center, slots.right]) {
					if (k !== null) rowOf[k] = mainRow
				}
				if (slots.bottom) { rows.push(layoutState[slots.bottom].height + 'px'); rowOf[slots.bottom] = rows.length }

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
				if (frame === null) return
				frame.removeAttribute('data-vsc-layout')
				frame.removeAttribute('data-vsc-dock-bottom')
				frame.removeAttribute('data-vsc-dragging')
				const names = ['--vsc-cols', '--vsc-rows', '--vsc-sb-col', '--vsc-sb-row', '--vsc-cv-col', '--vsc-cv-row', '--vsc-dk-col', '--vsc-dk-row',
					'--vsc-sb-x', '--vsc-sb-y', '--vsc-sb-w', '--vsc-sb-h', '--vsc-cv-x', '--vsc-cv-y', '--vsc-cv-w', '--vsc-cv-h', '--vsc-dk-x', '--vsc-dk-y', '--vsc-dk-w', '--vsc-dk-h']
				for (const n of names) removeVar(n)
				for (let i = 0; i < 3; i++) {
					const el = frame.children[i]
					if (el !== undefined) {
						el.removeAttribute('data-vsc-card')
						el.removeAttribute('data-vsc-float')
						el.removeAttribute('data-vsc-bottom')
						el.removeAttribute('data-vsc-hidden')
						el.removeAttribute('data-vsc-edge')
					}
				}
			}

			function syncCollapsed() {
				if (frame === null) return
				const cs = frame.hasAttribute('data-sidebar-collapsed')
				const cd = frame.hasAttribute('data-details-collapsed')
				const changed = cs !== collapsedSidebar || cd !== collapsedDetails
				collapsedSidebar = cs
				collapsedDetails = cd
				if (changed) applyLayout()
			}

			/* ---------- message time-details hover extension (v1.7.8) ---------- */
			/* The native [data-time-hover-root]:hover reveal only fires over the user
			   bubble row and the turn tail below each assistant reply — hovering the
			   assistant message text (a sibling above the tail) triggers nothing. This
			   delegation stamps data-vsc-time-reveal on the root that belongs to the
			   hovered text (the root containing the target, else the first root after it
			   in the same turn block), so the time row appears for the whole message. */
			let timeReveal = null
			function onTimeOver(e) {
				const t = e.target
				if (!(t instanceof Element) || frame === null || !frame.hasAttribute('data-vsc-layout')) return
				const scroll = t.closest('[data-conversation-scroll]')
				if (scroll === null) return
				let host = t
				while (host !== null && host !== scroll && !host.querySelector('[data-time-hover-root]')) host = host.parentElement
				if (host === null || host === scroll) return
				const roots = host.querySelectorAll('[data-time-hover-root]')
				if (roots.length === 0) return
				let target = null
				for (const r of roots) {
					if (r.contains(t)) { target = r; break }
					if (r.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING) { target = r; break }
				}
				if (target === null) target = roots[roots.length - 1]
				if (timeReveal !== target) {
					if (timeReveal !== null) timeReveal.removeAttribute('data-vsc-time-reveal')
					timeReveal = target
					target.setAttribute('data-vsc-time-reveal', '')
				}
			}
			function onTimeOut(e) {
				if (timeReveal === null) return
				const rt = e.relatedTarget
				if (rt instanceof Element && timeReveal.contains(rt)) return
				timeReveal.removeAttribute('data-vsc-time-reveal')
				timeReveal = null
			}
			function attachTimeReveal() {
				detachTimeReveal()
				if (frame === null) return
				frame.addEventListener('pointerover', onTimeOver)
				frame.addEventListener('pointerout', onTimeOut)
			}
			function detachTimeReveal() {
				if (frame !== null) {
					frame.removeEventListener('pointerover', onTimeOver)
					frame.removeEventListener('pointerout', onTimeOut)
				}
				if (timeReveal !== null) {
					timeReveal.removeAttribute('data-vsc-time-reveal')
					timeReveal = null
				}
			}

			/* ---------- drag: resize ---------- */
			/* docked resize kinds: '<cardKey>-<side>' where side is the dragged edge of a
			   docked card (left/right grow width, top/bottom grow height) */
			function applyDockedResize(kind, p, startX, startY, base, rect) {
				const dash = kind.indexOf('-')
				const card = kind.slice(0, dash)
				const side = kind.slice(dash + 1)
				const c = layoutState[card]
				if (side === 'left' || side === 'right') {
					const minW = 120
					const maxW = Math.min(520, Math.max(minW, rect.width - 160))
					const w = clamp(side === 'right' ? base.s + (p.x - startX) : base.s + (startX - p.x), minW, maxW)
					c.width = w
				} else {
					const minH = 120
					const maxH = Math.min(480, Math.max(minH, rect.height - 160))
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
				if (frame === null) return
				e.preventDefault()
				e.stopPropagation()
				frame.setAttribute('data-vsc-dragging', '')
				const startX = e.clientX
				const startY = e.clientY
				const floatResize = kind.startsWith('float-')
				const side = floatResize ? '' : kind.slice(kind.indexOf('-') + 1)
				const base = {
					s: floatResize ? 0 : (side === 'left' || side === 'right'
						? (card === 'sidebar' && collapsedSidebar ? SIDEBAR_RAIL : layoutState[card].width)
						: layoutState[card].height),
					fx: layoutState[card].fx, fy: layoutState[card].fy,
					fw: (card === 'sidebar' && collapsedSidebar ? SIDEBAR_RAIL : layoutState[card].fw), fh: layoutState[card].fh
				}
				let latest = { x: startX, y: startY }
				let raf = null
				function move(ev) {
					latest = { x: ev.clientX, y: ev.clientY }
					if (raf === null) raf = requestAnimationFrame(step)
				}
				function step() {
					raf = null
					applyDrag(latest)
				}
				function applyDrag(p) {
					const rect = frame.getBoundingClientRect()
					if (floatResize) applyFloatResize(card, kind.slice(6), p, startX, startY, base, rect)
					else applyDockedResize(kind, p, startX, startY, base, rect)
					notify()
				}
				function up() {
					window.removeEventListener('pointermove', move)
					window.removeEventListener('pointerup', up)
					window.removeEventListener('pointercancel', up)
					if (raf !== null) { cancelAnimationFrame(raf); raf = null }
					applyDrag(latest)
					/* legacy squeeze behaviors, preserved per card role:
					   sidebar squeezed to a rail collapses it; a dock card squeezed away closes it */
					if (!floatResize && card === 'sidebar' && side === 'right' && layoutState.sidebar.width < 140) {
						layoutState.sidebar.width = 280
						if (layoutSvc !== undefined) { if (!collapsedSidebar) layoutSvc.toggleSidebar() }
						else { collapsedSidebar = true; applyLayout() }
					}
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
					frame.removeAttribute('data-vsc-dragging')
				}
				window.addEventListener('pointermove', move)
				window.addEventListener('pointerup', up)
				window.addEventListener('pointercancel', up)
			}
			function resetWidth(key, side) {
				const c = layoutState[key]
				if (side === 'left' || side === 'right') c.width = LAYOUT_DEFAULTS[key].width
				else c.height = LAYOUT_DEFAULTS[key].height
				applyLayout()
				saveLayoutState()
			}

			/* ---------- drag: dock (detach / follow / drop) ---------- */
			let dragState = null
			function startDockDrag(card, e) {
				if (frame === null) return
				e.preventDefault()
				e.stopPropagation()
				const c = layoutState[card]
				if (c.dock !== 'float') {
					const idx = card === 'sidebar' ? 0 : card === 'conversation' ? 1 : 2
					const el = frame.children[idx]
					const rect = el !== undefined ? el.getBoundingClientRect() : null
					if (rect !== null && rect.width > 0) {
						c.fx = Math.round(rect.left)
						c.fy = Math.round(rect.top)
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
				frame.setAttribute('data-vsc-dragging', '')
				let latest = { x: e.clientX, y: e.clientY }
				let raf = null
				notify()
				function move(ev) {
					latest = { x: ev.clientX, y: ev.clientY }
					if (raf === null) raf = requestAnimationFrame(step)
				}
				function step() {
					raf = null
					const rect = frame.getBoundingClientRect()
					const w = rect.width
					const h = rect.height
					const zone = zoneFor(latest.x - rect.left, latest.y - rect.top, w, h)
					if (zone !== dragState.zone) {
						dragState.zone = zone
						notify()
					}
					if (layoutState[card].dock === 'float') {
						const dx = latest.x - dragState.startX
						const dy = latest.y - dragState.startY
						layoutState[card].fx = clamp(dragState.f0.fx + dx, 0, Math.max(0, w - layoutState[card].fw))
						layoutState[card].fy = clamp(dragState.f0.fy + dy, 0, Math.max(0, h - layoutState[card].fh))
						const p = cardPrefix(card)
						setVar('--vsc-' + p + '-x', layoutState[card].fx + 'px')
						setVar('--vsc-' + p + '-y', layoutState[card].fy + 'px')
						notify()
					}
				}
				function finish() {
					window.removeEventListener('pointermove', move)
					window.removeEventListener('pointerup', up)
					window.removeEventListener('pointercancel', up)
					window.removeEventListener('keydown', esc)
					if (raf !== null) { cancelAnimationFrame(raf); raf = null }
				}
				function up() {
					finish()
					const z = dragState.zone
					if (z !== null) setDock(card, z)
					else if (layoutState[card].dock === 'float') saveLayoutState()
					dragState = null
					notify()
					frame.removeAttribute('data-vsc-dragging')
				}
				function esc(ev) {
					if (ev.key !== 'Escape') return
					frame.removeAttribute('data-vsc-dragging')
					if (layoutState[card].dock === 'float') {
						layoutState[card].fx = dragState.f0.fx
						layoutState[card].fy = dragState.f0.fy
						const p = cardPrefix(card)
						setVar('--vsc-' + p + '-x', layoutState[card].fx + 'px')
						setVar('--vsc-' + p + '-y', layoutState[card].fy + 'px')
					}
					finish()
					dragState = null
					notify()
				}
				window.addEventListener('pointermove', move)
				window.addEventListener('pointerup', up)
				window.addEventListener('pointercancel', up)
				window.addEventListener('keydown', esc)
			}

			function setDock(card, dock) {
				const c = layoutState[card]
				if (dock !== 'float') {
					/* one region holds one card: the previous occupant floats away */
					for (const other of ['sidebar', 'conversation', 'dock']) {
						if (other !== card && layoutState[other].dock === dock) layoutState[other].dock = 'float'
					}
				}
				c.dock = dock
				if (dock === 'float' && (c.fx === 0 && c.fy === 0)) { c.fx = 80 + (card === 'dock' ? 80 : 0); c.fy = 60 }
				clampFloat()
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
				let latest = { x: startX, y: startY }
				let raf = null
				function move(ev) {
					latest = { x: ev.clientX, y: ev.clientY }
					if (raf === null) raf = requestAnimationFrame(step)
				}
				function step() {
					raf = null
					const rect = frame.getBoundingClientRect()
					p.x = clamp(o.x + (latest.x - startX), 0, Math.max(0, rect.width - p.w))
					p.y = clamp(o.y + (latest.y - startY), 0, Math.max(0, rect.height - p.h))
					box.style.left = p.x + 'px'
					box.style.top = p.y + 'px'
				}
				function up() {
					window.removeEventListener('pointermove', move)
					window.removeEventListener('pointerup', up)
					window.removeEventListener('pointercancel', up)
					if (raf !== null) { cancelAnimationFrame(raf); raf = null }
					step()
					saveLayoutState()
					notify()
				}
				window.addEventListener('pointermove', move)
				window.addEventListener('pointerup', up)
				window.addEventListener('pointercancel', up)
			}
			function startPanelFloatResize(id, e) {
				e.preventDefault()
				e.stopPropagation()
				const box = e.currentTarget.closest('[data-vsc-pfloat]')
				if (box === null) return
				const p = layoutState.panels[id]
				if (p === undefined) return
				const startX = e.clientX
				const startY = e.clientY
				const o = { w: p.w, h: p.h }
				let latest = { x: startX, y: startY }
				let raf = null
				function move(ev) {
					latest = { x: ev.clientX, y: ev.clientY }
					if (raf === null) raf = requestAnimationFrame(step)
				}
				function step() {
					raf = null
					const rect = frame.getBoundingClientRect()
					p.w = clamp(o.w + (latest.x - startX), 320, Math.max(320, rect.width - p.x))
					p.h = clamp(o.h + (latest.y - startY), 200, Math.max(200, rect.height - p.y))
					box.style.width = p.w + 'px'
					box.style.height = p.h + 'px'
				}
				function up() {
					window.removeEventListener('pointermove', move)
					window.removeEventListener('pointerup', up)
					window.removeEventListener('pointercancel', up)
					if (raf !== null) { cancelAnimationFrame(raf); raf = null }
					step()
					saveLayoutState()
					notify()
				}
				window.addEventListener('pointermove', move)
				window.addEventListener('pointerup', up)
				window.addEventListener('pointercancel', up)
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
				if (frame === null) return
				for (let i = 0; i < 3; i++) {
					const el = frame.children[i]
					if (el !== undefined) el.style.outline = ''
				}
				const seat = document.querySelector('[data-composer-seat]')
				if (seat !== null) seat.style.outline = ''
				for (const el of document.querySelectorAll('[data-time-hover-root]')) el.style.outline = ''
			}
			function probeTick() {
				const on = debugEnabled() && frame !== null && layoutState.mode === 'card' && !settingsOpen
				if (!on) {
					if (probeEl !== null) { probeEl.remove(); probeEl = null }
					clearProbeStyles()
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
				const sb = document.querySelector('[data-conversation-scroll]')
				if (sb !== null) lines.push('gutter ' + (sb.offsetWidth - sb.clientWidth) + 'px')
				/* stats line (composer.dock) tooltip diagnostics: the full-text tooltip only
				   shows when the line is truncated (scrollWidth > clientWidth); report the
				   truncation state and, while hovered, the tooltip's computed style/text. */
				const statsEl = document.querySelector('[class*="FJxK0a_root"]')
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
				/* message time-details hover reveal diagnostics (temporary): the native
				   [data-time-hover-root]:hover rule fades the time row in; report the
				   row count, the current hover chain, and whether our chrome intercepts. */
				const troots = document.querySelectorAll('[data-time-hover-root]')
				lines.push('time-roots ' + troots.length)
				troots.forEach(function (el, i) {
					el.style.outline = i === 0 ? '1px solid #52c41a' : '1px solid rgba(82,196,26,.35)'
				})
				const chain = document.querySelectorAll(':hover')
				let inRoot = false
				for (const el of chain) {
					if (el.hasAttribute && el.hasAttribute('data-time-hover-root')) { inRoot = true; break }
				}
				lines.push('hover-in-root ' + (inRoot ? 'YES' : 'no'))
				let flipped = false
				troots.forEach(function (el) {
					const span = el.querySelector('[class*="timeStart"], [class*="timeEnd"]')
					if (span !== null && getComputedStyle(span).opacity !== '0') flipped = true
				})
				lines.push('time-flipped ' + (flipped ? 'YES' : 'no'))
				const tspan = document.querySelector('[data-time-hover-root] [class*="timeStart"], [data-time-hover-root] [class*="timeEnd"]')
				if (tspan !== null) lines.push('time-opacity ' + getComputedStyle(tspan).opacity)
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
				const w = geom.w
				const h = geom.h
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
					if (c.dock === 'left') { const cw = s.key === 'sidebar' && collapsedSidebar ? SIDEBAR_RAIL : c.width; style = { left: Math.max(0, cw - 4), top: 0, bottom: 0, width: 8, cursor: 'col-resize' }; side = 'right' }
					else if (c.dock === 'right') { const cw = s.key === 'sidebar' && collapsedSidebar ? SIDEBAR_RAIL : c.width; style = { left: Math.max(0, w - cw - 4), top: 0, bottom: 0, width: 8, cursor: 'col-resize' }; side = 'left' }
					else if (c.dock === 'top') { style = { left: 0, right: 0, top: Math.max(0, c.height - 4), height: 8, cursor: 'row-resize' }; side = 'bottom' }
					else if (c.dock === 'bottom') { style = { left: 0, right: 0, top: Math.max(0, h - c.height - 4), height: 8, cursor: 'row-resize' }; side = 'top' }
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
						}, '×'))
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
				parts.push(React.createElement('div', {
					key: 'zone-hot', 'data-vsc-zone': '', 'data-hot': '',
					style: { left: z.left, top: z.top, width: z.width, height: z.height },
					children: ZONE_LABELS[dragState.zone]
				}))
			}

			function Chrome() {
				useEngine()
				if (frame === null || layoutState.mode !== 'card' || geom.w <= 0 || settingsOpen) return null
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
				return React.createElement('div', {
					'data-vsc-pfloat': '',
					style: { position: 'absolute', left: p.x, top: p.y, width: p.w, height: p.h, zIndex: 22, display: 'flex', flexDirection: 'column', overflow: 'hidden', pointerEvents: 'auto', background: 'color-mix(in srgb, var(--dsw-alias-bg-base) 88%, transparent)', backdropFilter: 'blur(12px)', border: '1px solid var(--dsw-alias-border-l2)', borderRadius: 12, boxShadow: '0 8px 32px rgba(0,0,0,.16)', boxSizing: 'border-box' },
					children: [
						React.createElement('div', {
							key: 'bar',
							style: { display: 'flex', alignItems: 'center', gap: 6, padding: '5px 8px', fontSize: 12, color: 'var(--dsw-alias-label-secondary)', cursor: 'grab', borderBottom: '1px solid var(--dsw-alias-border-l1)', flex: 'none' },
							onPointerDown: function (e) { startPanelFloatMove(id, e) }
						},
							React.createElement('span', { style: { flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: 'var(--dsw-alias-label-primary)' } }, def.title),
							React.createElement('button', { type: 'button', style: PANEL_BTN, onPointerDown: function (e) { e.stopPropagation() }, onClick: function () { dockApi.dockPanel(id) } }, '回停靠'),
							React.createElement('button', { type: 'button', style: PANEL_BTN, onPointerDown: function (e) { e.stopPropagation() }, onClick: function () { dockApi.closePanel(id) } }, '×')
						),
						React.createElement(PanelMount, { key: 'body', def: def }),
						React.createElement('div', {
							key: 'se',
							style: { position: 'absolute', right: 0, bottom: 0, width: 14, height: 14, cursor: 'nwse-resize', zIndex: 2 },
							onPointerDown: function (e) { startPanelFloatResize(id, e) }
						})
					]
				})
			}

			/* ---------- dock host: unified plugin panel (v1.8) ---------- */
			/* The plugin panel is the launcher + tabbed host. In card mode it
			   overlays the dock card; in classic mode it is a right-docked overlay
			   that can detach into a floating window. Everything below is shared. */
			/* v1.8.1: resizing writes the DOM directly during the drag (like the
			   card resize handles, which update CSS vars per frame) and only
			   refreshes React state on release — no per-frame re-render lag. */
			function startPluginPanelResize(e) {
				if (frame === null) return
				e.preventDefault()
				e.stopPropagation()
				const box = e.currentTarget.closest('[data-vsc-dhost]')
				if (box === null) return
				const pp = layoutState.pluginPanel
				const startX = e.clientX
				const base = pp.width
				let latest = startX
				let raf = null
				function move(ev) { latest = ev.clientX; if (raf === null) raf = requestAnimationFrame(step) }
				function step() {
					raf = null
					const fr = frame.getBoundingClientRect()
					const maxW = Math.max(240, Math.round(fr.width * 0.5))
					const w = clamp(base + (startX - latest), 240, maxW)
					pp.width = w
					box.style.left = Math.max(0, Math.round(fr.width) - w) + 'px'
					box.style.width = w + 'px'
				}
				function up() {
					window.removeEventListener('pointermove', move)
					window.removeEventListener('pointerup', up)
					window.removeEventListener('pointercancel', up)
					if (raf !== null) { cancelAnimationFrame(raf); raf = null }
					step()
					saveLayoutState()
					notify()
				}
				window.addEventListener('pointermove', move)
				window.addEventListener('pointerup', up)
				window.addEventListener('pointercancel', up)
			}
			function startListResize(e) {
				e.preventDefault()
				e.stopPropagation()
				const box = e.currentTarget.closest('[data-vsc-pplist]')
				if (box === null) return
				const pp = layoutState.pluginPanel
				const startY = e.clientY
				const base = pp.listHeight
				let latest = startY
				let raf = null
				function move(ev) { latest = ev.clientY; if (raf === null) raf = requestAnimationFrame(step) }
				function step() {
					raf = null
					const h = clamp(base + (latest - startY), 36, 260)
					pp.listHeight = h
					box.style.height = h + 'px'
				}
				function up() {
					window.removeEventListener('pointermove', move)
					window.removeEventListener('pointerup', up)
					window.removeEventListener('pointercancel', up)
					if (raf !== null) { cancelAnimationFrame(raf); raf = null }
					step()
					saveLayoutState()
					notify()
				}
				window.addEventListener('pointermove', move)
				window.addEventListener('pointerup', up)
				window.addEventListener('pointercancel', up)
			}
			function startPluginPanelFloatMove(e) {
				if (frame === null) return
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
				let latest = { x: startX, y: startY }
				let raf = null
				function move(ev) { latest = { x: ev.clientX, y: ev.clientY }; if (raf === null) raf = requestAnimationFrame(step) }
				function step() {
					raf = null
					const rect = frame.getBoundingClientRect()
					pp.fx = clamp(o.x + (latest.x - startX), 0, Math.max(0, rect.width - pp.fw))
					pp.fy = clamp(o.y + (latest.y - startY), 0, Math.max(0, rect.height - pp.fh))
					box.style.left = pp.fx + 'px'
					box.style.top = pp.fy + 'px'
				}
				function up() {
					window.removeEventListener('pointermove', move)
					window.removeEventListener('pointerup', up)
					window.removeEventListener('pointercancel', up)
					if (raf !== null) { cancelAnimationFrame(raf); raf = null }
					step()
					saveLayoutState()
					notify()
				}
				window.addEventListener('pointermove', move)
				window.addEventListener('pointerup', up)
				window.addEventListener('pointercancel', up)
			}
			/* v1.8.1: direction-aware resize for the floating plugin panel — the
			   same math as the card float resize (applyFloatResize), direct DOM
			   writes per frame. dir is a combination of n/s/e/w. */
			function startPluginPanelFloatResizeDir(e, dir) {
				if (frame === null) return
				e.preventDefault()
				e.stopPropagation()
				const box = e.currentTarget.closest('[data-vsc-ppfloat]')
				if (box === null) return
				const pp = layoutState.pluginPanel
				const startX = e.clientX
				const startY = e.clientY
				const o = { fx: pp.fx, fy: pp.fy, fw: pp.fw, fh: pp.fh }
				let latest = { x: startX, y: startY }
				let raf = null
				function move(ev) { latest = { x: ev.clientX, y: ev.clientY }; if (raf === null) raf = requestAnimationFrame(step) }
				function step() {
					raf = null
					const rect = frame.getBoundingClientRect()
					const dx = latest.x - startX
					const dy = latest.y - startY
					let fx = o.fx, fy = o.fy, fw = o.fw, fh = o.fh
					if (dir.includes('e')) fw = clamp(o.fw + dx, 320, Math.max(320, rect.width - o.fx))
					if (dir.includes('w')) {
						fw = clamp(o.fw - dx, 320, o.fx + o.fw)
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
				}
				function up() {
					window.removeEventListener('pointermove', move)
					window.removeEventListener('pointerup', up)
					window.removeEventListener('pointercancel', up)
					if (raf !== null) { cancelAnimationFrame(raf); raf = null }
					step()
					saveLayoutState()
					notify()
				}
				window.addEventListener('pointermove', move)
				window.addEventListener('pointerup', up)
				window.addEventListener('pointercancel', up)
			}
			/* classic-mode docked header drag → detach into a floating window */
			function startPluginPanelDetach(e) {
				if (frame === null) return
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
				notify()
				const startX = e.clientX
				const startY = e.clientY
				const o = { x: pp.fx, y: pp.fy }
				let latest = { x: startX, y: startY }
				let raf = null
				function move(ev) { latest = { x: ev.clientX, y: ev.clientY }; if (raf === null) raf = requestAnimationFrame(step) }
				function step() {
					raf = null
					const rect = frame.getBoundingClientRect()
					pp.fx = clamp(o.x + (latest.x - startX), 0, Math.max(0, rect.width - pp.fw))
					pp.fy = clamp(o.y + (latest.y - startY), 0, Math.max(0, rect.height - pp.fh))
					const box = document.querySelector('[data-vsc-ppfloat]')
					if (box !== null) { box.style.left = pp.fx + 'px'; box.style.top = pp.fy + 'px' }
				}
				function up() {
					window.removeEventListener('pointermove', move)
					window.removeEventListener('pointerup', up)
					window.removeEventListener('pointercancel', up)
					if (raf !== null) { cancelAnimationFrame(raf); raf = null }
					step()
					saveLayoutState()
					notify()
				}
				window.addEventListener('pointermove', move)
				window.addEventListener('pointerup', up)
				window.addEventListener('pointercancel', up)
			}

			/* launcher + tabs + content body, shared by the docked and floated forms */
			function DockPanelBody({ showHeader }) {
				useEngine()
				const [overflowOpen, setOverflowOpen] = React.useState(false)
				const [query, setQuery] = React.useState('')
				const pp = layoutState.pluginPanel
				const ids = [...panelDefs.keys()]
				const docked = []
				for (const id of ids) {
					const p = layoutState.panels[id]
					if (p !== undefined && p.open && !p.float) docked.push(id)
				}
				const active = activePanel !== null && docked.includes(activePanel) ? activePanel : (docked.length > 0 ? docked[0] : null)
				const multiLine = pp.listHeight > 56
				const body = []
				if (showHeader) {
					const isClassic = layoutState.mode !== 'card'
					body.push(React.createElement('div', {
						key: 'bar',
						style: { display: 'flex', alignItems: 'center', gap: 6, padding: '5px 10px', fontSize: 12, color: 'var(--dsw-alias-label-secondary)', cursor: isClassic ? 'grab' : 'default', userSelect: 'none', borderBottom: '1px solid var(--dsw-alias-border-l1)', flex: 'none' },
						onPointerDown: isClassic ? startPluginPanelDetach : void 0,
						title: isClassic ? '拖动标题栏可浮动' : void 0
					},
						React.createElement('span', { style: { flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: 'var(--dsw-alias-label-primary)' } }, '🧩 插件面板'),
						isClassic && React.createElement('button', { type: 'button', style: PANEL_BTN, onPointerDown: function (e) { e.stopPropagation() }, onClick: function () { layoutState.pluginPanel.float = true; saveLayoutState(); notify() } }, '⧉ 浮动'),
						React.createElement('button', { type: 'button', style: PANEL_BTN, onPointerDown: function (e) { e.stopPropagation() }, onClick: function () { closeDock() } }, '×')
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
						style: { display: 'inline-flex', alignItems: 'center', gap: 5, height: 26, padding: '0 9px', borderRadius: 8, cursor: 'pointer', fontSize: 12, lineHeight: 1, whiteSpace: 'nowrap', flex: 'none', border: '1px solid ' + (on ? 'var(--dsw-alias-border-l2)' : 'var(--dsw-alias-border-l1)'), background: on ? 'var(--dsw-alias-interactive-bg-hover)' : 'transparent', color: on ? 'var(--dsw-alias-label-primary)' : 'var(--dsw-alias-label-secondary)' },
						title: (on ? '关闭' : '打开') + ' ' + def.title,
						onClick: function () { on ? dockApi.closePanel(id) : dockApi.openPanel(id) }
					},
						React.createElement('span', { style: { fontSize: 13 } }, def.icon || '🧩'),
						React.createElement('span', { style: { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 140 } }, def.title),
						React.createElement('span', { style: { fontSize: 9, opacity: .8 } }, on ? '●' : '○')
					)
				})
				const popover = overflowOpen ? React.createElement('div', {
					style: { position: 'absolute', right: 6, top: 36, zIndex: 5, minWidth: 220, maxHeight: 280, overflowY: 'auto', padding: 6, display: 'flex', flexDirection: 'column', gap: 2, background: 'var(--dsw-alias-bg-layer-1)', border: '1px solid var(--dsw-alias-border-l2)', borderRadius: 10, boxShadow: '0 8px 24px rgba(0,0,0,.18)' }
				},
					React.createElement('input', {
						type: 'text', value: query, placeholder: '搜索插件…',
						style: { boxSizing: 'border-box', width: '100%', padding: '4px 8px', fontSize: 12, borderRadius: 6, border: '1px solid var(--dsw-alias-border-l2)', outline: 'none', background: 'transparent', color: 'var(--dsw-alias-label-primary)', marginBottom: 4 },
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
							style: { display: 'flex', alignItems: 'center', gap: 6, padding: '5px 8px', borderRadius: 6, cursor: 'pointer', fontSize: 12, border: 'none', background: 'transparent', color: 'var(--dsw-alias-label-primary)', textAlign: 'left' },
							onClick: function () { setOverflowOpen(false); setQuery(''); on ? dockApi.closePanel(id) : dockApi.openPanel(id) }
						},
							React.createElement('span', null, def.icon || '🧩'),
							React.createElement('span', { style: { flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }, def.title),
							React.createElement('span', { style: { fontSize: 10, opacity: .8 } }, on ? '● 已打开' : '○ 未打开')
						)
					})
				) : null
				body.push(React.createElement('div', {
					key: 'list',
					'data-vsc-pplist': '',
					style: { flex: 'none', height: pp.listHeight, display: 'flex', flexDirection: 'column', position: 'relative' }
				},
					React.createElement('div', {
						style: { flex: 1, minHeight: 0, display: 'flex', alignItems: multiLine ? 'flex-start' : 'center', flexWrap: multiLine ? 'wrap' : 'nowrap', overflowX: multiLine ? 'hidden' : 'auto', overflowY: multiLine ? 'auto' : 'hidden', gap: 4, padding: '4px 8px' }
					},
						...chips,
						React.createElement('button', { key: 'more', type: 'button', style: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', height: 26, minWidth: 26, padding: '0 7px', borderRadius: 8, cursor: 'pointer', fontSize: 12, border: '1px solid var(--dsw-alias-border-l1)', background: 'transparent', color: 'var(--dsw-alias-label-secondary)' }, title: '全部插件', onClick: function () { setOverflowOpen(!overflowOpen) } }, '···'),
						popover
					),
					React.createElement('div', { style: { height: 6, flex: 'none', cursor: 'row-resize' }, title: '拖动调整插件列表高度', onPointerDown: startListResize })
				))
				/* tabs for open (docked) plugins */
				if (docked.length > 0) {
					const tabs = docked.map(function (id) {
						const on = id === active
						return React.createElement('span', {
							key: id,
							style: { display: 'inline-flex', alignItems: 'center', gap: 4, padding: '4px 8px', fontSize: 12, cursor: 'pointer', borderRadius: 8, color: on ? 'var(--dsw-alias-label-primary)' : 'var(--dsw-alias-label-secondary)', background: on ? 'var(--dsw-alias-interactive-bg-hover)' : 'transparent', border: '1px solid ' + (on ? 'var(--dsw-alias-border-l2)' : 'transparent') },
							onClick: function () { activePanel = id; notify() }
						},
							panelDefs.get(id).title,
							React.createElement('span', { style: { cursor: 'pointer', opacity: .7, padding: '0 2px' }, title: '关闭', onClick: function (ev) { ev.stopPropagation(); dockApi.closePanel(id) } }, '×'),
							React.createElement('span', { style: { cursor: 'pointer', opacity: .7, padding: '0 2px' }, title: '浮动', onClick: function (ev) { ev.stopPropagation(); dockApi.floatPanel(id) } }, '⧉')
						)
					})
					body.push(React.createElement('div', { key: 'tabs', style: { display: 'flex', gap: 4, padding: '4px 8px', borderBottom: '1px solid var(--dsw-alias-border-l1)', flexWrap: 'wrap', flex: 'none' } }, ...tabs))
				}
				/* active plugin content (or empty hint) */
				if (active !== null) {
					body.push(React.createElement(PanelMount, { key: 'content', def: panelDefs.get(active) }))
				} else {
					body.push(React.createElement('div', { key: 'empty', style: { flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--dsw-alias-label-tertiary)', fontSize: 12, textAlign: 'center', padding: '0 12px' } },
						ids.length === 0 ? '暂无插件 — 插件注册后自动出现在这里' : '从上方列表选择一个插件打开'
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
					style: { position: 'absolute', left: pp.fx, top: pp.fy, width: pp.fw, height: pp.fh, zIndex: 22, display: 'flex', flexDirection: 'column', overflow: 'hidden', pointerEvents: 'auto', background: 'color-mix(in srgb, var(--dsw-alias-bg-base) 88%, transparent)', backdropFilter: 'blur(12px)', border: '1px solid var(--dsw-alias-border-l2)', borderRadius: 12, boxShadow: '0 8px 32px rgba(0,0,0,.16)', boxSizing: 'border-box' },
					children: [
						React.createElement('div', {
							key: 'bar',
							style: { display: 'flex', alignItems: 'center', gap: 6, padding: '5px 8px', fontSize: 12, color: 'var(--dsw-alias-label-secondary)', cursor: 'grab', borderBottom: '1px solid var(--dsw-alias-border-l1)', flex: 'none' },
							onPointerDown: function (e) { startPluginPanelFloatMove(e) }
						},
							React.createElement('span', { style: { flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: 'var(--dsw-alias-label-primary)' } }, '🧩 插件面板'),
							React.createElement('button', { type: 'button', style: PANEL_BTN, onPointerDown: function (e) { e.stopPropagation() }, onClick: function () { layoutState.pluginPanel.float = false; saveLayoutState(); notify() } }, '回停靠'),
							React.createElement('button', { type: 'button', style: PANEL_BTN, onPointerDown: function (e) { e.stopPropagation() }, onClick: function () { closeDock() } }, '×')
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
				if (frame === null || geom.w <= 0 || settingsOpen) return null
				const parts = []
				const isCard = layoutState.mode === 'card'
				const pp = layoutState.pluginPanel
				if (isCard) {
					/* card mode: the plugin panel follows the dock card. v1.8.1: the
					   rect is DERIVED from layout state (dockRegionRect) instead of a
					   DOM measurement, so mode round-trips can never leave the panel
					   unrendered — the grid may be mid-transition or re-tagging, but
					   the region math stays deterministic. */
					if (pluginPanelOpen() && !pp.float) {
						const rect = dockRegionRect()
						if (rect !== null) {
							parts.push(React.createElement('div', {
								key: 'dhost',
								'data-vsc-dhost': '',
								style: { position: 'absolute', left: rect.left, top: rect.top, width: rect.width, height: rect.height, zIndex: 21, display: 'flex', flexDirection: 'column', overflow: 'hidden', pointerEvents: 'auto', background: 'var(--dsw-specific-sidebar-fill)', border: 'none', borderLeft: '1px solid var(--dsw-alias-border-l3)', boxSizing: 'border-box' },
								children: React.createElement(DockPanelBody, { key: 'body', showHeader: true })
							}))
						}
					}
				} else if (pp.open && !pp.float) {
					/* classic mode: right-docked overlay panel with a left-edge resize handle */
					const fr = frame.getBoundingClientRect()
					const w = pp.width
					const left = Math.max(0, Math.round(fr.width) - w)
					const h = Math.round(fr.height)
					parts.push(React.createElement('div', {
						key: 'dhost-classic',
						'data-vsc-dhost': '',
						style: { position: 'absolute', left: left, top: 0, width: w, height: h, zIndex: 21, display: 'flex', flexDirection: 'column', overflow: 'hidden', pointerEvents: 'auto', background: 'var(--dsw-specific-sidebar-fill)', border: 'none', borderLeft: '1px solid var(--dsw-alias-border-l3)', boxSizing: 'border-box' },
						children: [
							React.createElement('div', { key: 'resize', style: { position: 'absolute', left: -4, top: 0, bottom: 0, width: 8, cursor: 'col-resize', zIndex: 30, touchAction: 'none', pointerEvents: 'auto' }, title: '拖动调整宽度', onPointerDown: function (e) { startPluginPanelResize(e) } }),
							React.createElement(DockPanelBody, { key: 'body', showHeader: true })
						]
					}))
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
				const base = { padding: '16px 4px', borderTop: '1px solid var(--dsw-alias-border-l1)', marginTop: 8, paddingTop: 20, color: 'var(--dsw-alias-label-primary)' }
				const h3 = { margin: '0 0 6px', fontSize: 16, fontWeight: 600 }
				const p = { margin: '0 0 18px', color: 'var(--dsw-alias-label-secondary)', fontSize: 12 }
				const labelStyle = { display: 'block', marginBottom: 8, color: 'var(--dsw-alias-label-secondary)', fontSize: 12 }
				const rowStyle = { display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }
				const pill = function (active) {
					return {
						padding: '6px 14px', borderRadius: 999, cursor: 'pointer', fontSize: 13,
						border: active ? '1px solid var(--dsw-static-neutral-bluish-400)' : '1px solid var(--dsw-alias-border-l2)',
						background: active ? 'var(--dsw-alias-bg-module-platform)' : 'transparent',
						color: 'var(--dsw-alias-label-primary)'
					}
				}
				const ghost = { padding: '6px 14px', borderRadius: 8, cursor: 'pointer', fontSize: 13, border: '1px solid var(--dsw-alias-border-l2)', background: 'transparent', color: 'var(--dsw-alias-label-secondary)' }
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
						} else if (m.type === 'childList') {
							if (frame !== null && !document.contains(frame)) {
								teardown()
								init()
								return
							}
							/* the frame survived but its column nodes were replaced (React remount):
							   re-tag and re-apply so the new children get their card roles again */
							if (frame !== null && frame.hasAttribute('data-vsc-layout')) {
								tagColumns()
								applyLayout()
							}
						}
					}
				})
				mo.observe(frame, { attributes: true, childList: true, subtree: false })
				ro = new ResizeObserver(function () {
					const rect = frame.getBoundingClientRect()
					geom = { w: Math.round(rect.width), h: Math.round(rect.height) }
					notify()
				})
				ro.observe(frame)
				attachTimeReveal()
				if (probeTimer === null) probeTimer = window.setInterval(probeTick, 500)
			}
			function teardown() {
				if (mo !== null) { mo.disconnect(); mo = null }
				if (ro !== null) { ro.disconnect(); ro = null }
				detachTimeReveal()
				if (settingsMo !== null) { settingsMo.disconnect(); settingsMo = null }
				if (settingsTimer !== null) { window.clearInterval(settingsTimer); settingsTimer = null }
				if (probeTimer !== null) { window.clearInterval(probeTimer); probeTimer = null }
				if (probeEl !== null) { probeEl.remove(); probeEl = null }
				clearProbeStyles()
				removeAll()
			}
			function init() {
				frame = findFrame()
				if (frame === null) return false
				tagColumns()
				syncCollapsed()
				applyLayout()
				watch()
				waitSettings()
				return true
			}
			let attempts = 0
			function waitFrame() {
				if (init()) { console.log('[dsh-ui-beautify] card layout active') ; return }
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
				return ctx.reflect.provide('dock', dockApi)
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
