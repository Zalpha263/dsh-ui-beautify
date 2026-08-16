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
					React.createElement("p", { style: p }, "v1.5.6：设置自动记忆，全局强调色（文件夹、加载螺旋、标签高亮、Deep Diving、超链接等）跟随预设。"),
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
				sidebar: { dock: 'left', width: 280, fx: 80, fy: 60, fw: 340, fh: 640 },
				conversation: { dock: 'center', fx: 120, fy: 60, fw: 640, fh: 520 },
				dock: { dock: 'right', open: false, width: 400, height: 260, fx: 160, fy: 80, fw: 560, fh: 420 },
				panels: {}
			}
			function loadLayoutState() {
				try { const raw = localStorage.getItem(LAYOUT_STORAGE_KEY); return raw === null ? null : JSON.parse(raw) } catch (e) { return null }
			}
			function mergeLayoutState(saved) {
				const base = JSON.parse(JSON.stringify(LAYOUT_DEFAULTS))
				if (saved && typeof saved === 'object') {
					if (saved.mode === 'card' || saved.mode === 'classic') base.mode = saved.mode
					else if (saved.mode === 'vscode') base.mode = 'card'
					const pick = function (src, dst, keys) {
						if (!src || typeof src !== 'object') return
						for (const k of keys) if (typeof src[k] === 'number') dst[k] = Math.round(src[k])
						if (typeof src.dock === 'string') dst.dock = src.dock
					}
					pick(saved.sidebar, base.sidebar, ['width', 'fx', 'fy', 'fw', 'fh'])
					pick(saved.conversation, base.conversation, ['fx', 'fy', 'fw', 'fh'])
					pick(saved.dock, base.dock, ['width', 'height', 'fx', 'fy', 'fw', 'fh'])
					if (saved.dock && typeof saved.dock.open === 'boolean') base.dock.open = saved.dock.open
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
				/* unified card border system (v1.5.6): between every two adjacent cards there is
				   exactly ONE 1px divider, drawn ON the dock card (right-docked → left edge,
				   bottom-docked → top edge) and on the sidebar's right edge, all using the same
				   border-l3 token (0.16 white / 0.12 black — the shipped strong-divider step).
				   The DetailsPanel's own border-left stays removed so right-docked never stacks
				   two lines; the conversation card carries no junction border (no content-box
				   strip risk). Probe-verified geometry is untouched: no paints, no shadow bands. */
				'[data-vsc-layout] [data-vsc-card="sidebar"]{border-right:1px solid var(--dsw-alias-border-l3)!important}',
				'[data-vsc-layout] [data-vsc-card="dock"]:not([data-vsc-float]):not([data-vsc-bottom]){border-left:1px solid var(--dsw-alias-border-l3)!important}',
				'[data-vsc-layout] [data-vsc-card="dock"][data-vsc-bottom]{border-left:none!important;border-top:1px solid var(--dsw-alias-border-l3)!important}',
				/* card surface language (v1.5.6): the dock card uses the SIDEBAR fill token, not
				   bg-base — sidebar-fill vs bg-base is the exact color contrast that makes the
				   sidebar seam readable, so the dock/conversation junction gets the same visible
				   step. The card paints the fill (single layer — the shipped DetailsPanel is
				   forced transparent in card mode, and the empty-details placeholder no longer
				   paints its own layer, so there is no translucent stacking / re-dimming), and
				   the l3 dividers stay on top of it. Float state keeps its own glass surface. */
				'[data-vsc-layout] [data-vsc-card="dock"]:not([data-vsc-float]){background-color:var(--dsw-specific-sidebar-fill)!important}',
				'[data-vsc-layout] [data-vsc-card="dock"] [data-slot="details"] > *{background:transparent!important;border-left:none!important}',
				/* bottom-docked junction (v1.5.1): 1) row 1 is a deterministic calc in applyLayout,
				   so the column fills exactly; 2) gap and alignment pinned to 0; 3) the panel's
				   border-top stays the single divider. NOTE: no background-color paint on the
				   conversation card here — the shipped ConversationRoot already paints bg-base
				   (semi-transparent when a page background image is set), and painting the column
				   again stacked a second translucent layer that visibly dimmed the chat when the
				   dock was bottom-docked */
				'[data-vsc-layout][data-vsc-dock-bottom]{gap:0!important;align-content:stretch!important}',
				'[data-vsc-layout][data-vsc-dock-bottom] [data-slot="conversation"] > *{flex:1!important;min-height:0!important}',
				/* empty-details placeholder: after archiving (or on a fresh page) the details
				   slot is empty, so the dock would otherwise look wiped out — render a quiet
				   hint instead of a blank transparent column */
				'[data-vsc-layout] [data-vsc-card="dock"] > [data-slot="details"]:empty::before{content:"无活动会话";display:flex;align-items:center;justify-content:center;height:100%;box-sizing:border-box;color:var(--dsw-alias-label-tertiary);font-size:12px;text-align:center;padding:0 12px}',
				'[data-vsc-layout] [data-vsc-card][data-vsc-hidden]{display:none!important}',
				'[data-vsc-layout] [data-vsc-card][data-vsc-float]{position:absolute!important;z-index:19;border:1px solid var(--dsw-alias-border-l2);border-radius:12px;box-shadow:0 8px 32px rgba(0,0,0,.16);overflow:hidden;box-sizing:border-box;padding-top:20px}',
				'[data-vsc-layout] [data-vsc-card][data-vsc-float]::before{content:"";position:absolute;inset:0;z-index:-1;backdrop-filter:blur(12px);background:color-mix(in srgb, var(--dsw-alias-bg-base) 74%, transparent)}',
				'[data-vsc-layout] [data-vsc-card="sidebar"][data-vsc-float]::before{background:color-mix(in srgb, var(--dsw-specific-sidebar-fill) 74%, transparent)}',
				'[data-vsc-layout] [data-vsc-card="sidebar"][data-vsc-float]{left:var(--vsc-sb-x,80px);top:var(--vsc-sb-y,60px);width:var(--vsc-sb-w,340px);height:var(--vsc-sb-h,640px);background:transparent!important}',
				'[data-vsc-layout] [data-vsc-card="conversation"][data-vsc-float]{left:var(--vsc-cv-x,120px);top:var(--vsc-cv-y,60px);width:var(--vsc-cv-w,640px);height:var(--vsc-cv-h,520px)}',
				'[data-vsc-layout] [data-vsc-card="dock"][data-vsc-float]{left:var(--vsc-dk-x,160px);top:var(--vsc-dk-y,80px);width:var(--vsc-dk-w,560px);height:var(--vsc-dk-h,420px)}',
				'[data-vsc-layout] [data-side]{display:none!important}',
				'[data-vsc-layout] [data-vsc-card="sidebar"] [data-slot="sidebar"] > *{width:100%!important}',
				'[data-vsc-layout] [data-vsc-card="conversation"][data-vsc-float] [data-slot="conversation"] > *, [data-vsc-layout] [data-vsc-card="dock"][data-vsc-float] [data-slot="details"] > *{background:transparent!important}',
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
				/* dock card bottom-docked: flush the composer against the panel (shipped input bar has 8px bottom padding) */
				'[data-vsc-layout][data-vsc-dock-bottom] [data-slot="conversation.composer.bar"] > *{padding-bottom:0!important}',
				/* composer seat: the shipped seat paints a 36px fade (transparent → bg-base) over the
				   message list; in dark themes that fade reads as a hard black gradient above the input
				   bar — drop it in card mode so the composer floats cleanly over the chat */
				'[data-vsc-layout] [data-composer-seat]{background:none!important}'
			].join('\n')
			const cssDisposer = insertCss(SHEET)

			/* ---------- shared helpers ---------- */
			const cardPrefix = (card) => card === 'sidebar' ? 'sb' : card === 'conversation' ? 'cv' : 'dk'
			const FLOAT_MIN_W = { sidebar: 264, conversation: 480, dock: 360 }
			const FLOAT_MIN_H = { sidebar: 240, conversation: 320, dock: 240 }
			const SIDEBAR_RAIL = 56
			const PANEL_BTN = { border: '1px solid var(--dsw-alias-border-l2)', background: 'transparent', color: 'var(--dsw-alias-label-secondary)', borderRadius: 6, fontSize: 11, padding: '1px 7px', cursor: 'pointer', lineHeight: 1.5 }

			function clamp(v, min, max) { return Math.min(max, Math.max(min, Math.round(v))) }
			function zoneFor(card, x, y, w, h) {
				if (card === 'sidebar') {
					if (x <= w * 0.26) return 'left'
				} else if (card === 'conversation') {
					if (x >= w * 0.35 && x <= w * 0.65 && y >= h * 0.3 && y <= h * 0.7) return 'center'
				} else {
					if (x >= w * 0.72) return 'right'
					if (y >= h * 0.72) return 'bottom'
				}
				return null
			}

			/* ---------- panel registry (ctx.dock) ---------- */
			const panelDefs = new Map()
			let activePanel = null
			function panelVisible() {
				for (const id of panelDefs.keys()) {
					const p = layoutState.panels[id]
					if (p !== undefined && p.open && !p.float) return true
				}
				return false
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
					saveLayoutState()
					applyLayout()
					notify()
				},
				floatPanel(id) {
					const p = layoutState.panels[id]
					if (p === undefined) return
					p.float = true
					ensureActive()
					saveLayoutState()
					applyLayout()
					notify()
				},
				dockPanel(id) {
					const p = layoutState.panels[id]
					if (p === undefined) return
					p.float = false
					ensureActive()
					saveLayoutState()
					applyLayout()
					notify()
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
			function dockVisible() {
				return layoutState.dock.open || !collapsedDetails || panelVisible()
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
				const dkR = dk.dock === 'right' && dVis
				const dkB = dk.dock === 'bottom' && dVis

				const sbEl = frame.children[0]
				const cvEl = frame.children[1]
				const dkEl = frame.children[2]
				if (sbEl) { sbEl.dataset.vscCard = 'sidebar'; sbEl.toggleAttribute('data-vsc-float', sbF); sbEl.toggleAttribute('data-vsc-hidden', false) }
				if (cvEl) { cvEl.dataset.vscCard = 'conversation'; cvEl.toggleAttribute('data-vsc-float', cvF); cvEl.toggleAttribute('data-vsc-hidden', false) }
				if (dkEl) {
					dkEl.dataset.vscCard = 'dock'
					dkEl.toggleAttribute('data-vsc-float', dkF)
					dkEl.toggleAttribute('data-vsc-bottom', dkB)
					dkEl.toggleAttribute('data-vsc-hidden', !dVis)
				}
				frame.toggleAttribute('data-vsc-dock-bottom', dkB)

				const cols = []
				const rows = ['minmax(0,1fr)']
				let cvCol = '2'
				if (!sbF) cols.push(cvF ? 'minmax(0,1fr)' : (collapsedSidebar ? SIDEBAR_RAIL + 'px' : sb.width + 'px'))
				if (!cvF) { cols.push('minmax(0,1fr)'); cvCol = sbF ? '1' : String(cols.length) }
				let dkCol = null
				let dkRow = null
				if (dkR) { cols.push(dk.width + 'px'); dkCol = String(cols.length); dkRow = '1 / -1' }
				if (dkB) {
					/* v1.4.7: deterministic first row — a definite calc resolves height:100% of the
					   conversation root exactly, so no transparent strip can remain under the column */
					rows[0] = 'calc(100% - ' + dk.height + 'px)'
					rows.push(dk.height + 'px')
					dkRow = '2'
					dkCol = cvF ? '1 / -1' : (sbF ? '1' : '2')
				}
				if (cols.length === 0) cols.push('minmax(0,1fr)')

				setVar('--vsc-cols', cols.join(' '))
				setVar('--vsc-rows', rows.join(' '))
				setVar('--vsc-sb-col', sbF ? 'auto' : '1')
				setVar('--vsc-sb-row', sbF ? 'auto' : '1 / -1')
				setVar('--vsc-cv-col', cvF ? 'auto' : cvCol)
				setVar('--vsc-cv-row', cvF ? 'auto' : '1')
				setVar('--vsc-dk-col', dkF ? 'auto' : (dkCol === null ? 'auto' : dkCol))
				setVar('--vsc-dk-row', dkF ? 'auto' : (dkRow === null ? 'auto' : dkRow))
				setVar('--vsc-sb-x', sb.fx + 'px'); setVar('--vsc-sb-y', sb.fy + 'px'); setVar('--vsc-sb-w', (sbF && collapsedSidebar ? SIDEBAR_RAIL : sb.fw) + 'px'); setVar('--vsc-sb-h', sb.fh + 'px')
				setVar('--vsc-cv-x', cv.fx + 'px'); setVar('--vsc-cv-y', cv.fy + 'px'); setVar('--vsc-cv-w', cv.fw + 'px'); setVar('--vsc-cv-h', cv.fh + 'px')
				setVar('--vsc-dk-x', dk.fx + 'px'); setVar('--vsc-dk-y', dk.fy + 'px'); setVar('--vsc-dk-w', dk.fw + 'px'); setVar('--vsc-dk-h', dk.fh + 'px')
				notify()
			}
			function removeAll() {
				if (frame === null) return
				frame.removeAttribute('data-vsc-layout')
				frame.removeAttribute('data-vsc-dock-bottom')
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

			/* ---------- drag: resize ---------- */
			function applyDockedResize(kind, p, startX, startY, base, rect) {
				if (kind === 'sb') {
					const w = clamp(base.s + (p.x - startX), 120, Math.min(420, Math.max(120, rect.width - 400)))
					layoutState.sidebar.width = w
					const dPart = layoutState.dock.dock === 'right' && dockVisible() ? ' ' + layoutState.dock.width + 'px' : ''
					setVar('--vsc-cols', w + 'px minmax(0,1fr)' + dPart)
				} else if (kind === 'dk-right') {
					const w = clamp(base.d + (startX - p.x), 120, Math.min(520, Math.max(120, rect.width - 420)))
					layoutState.dock.width = w
					const sbPart = layoutState.sidebar.dock === 'float' ? '' : (collapsedSidebar ? SIDEBAR_RAIL + 'px' : layoutState.sidebar.width + 'px') + ' '
					setVar('--vsc-cols', sbPart + 'minmax(0,1fr) ' + w + 'px')
				} else if (kind === 'dk-bottom') {
					const h = clamp(base.h + (startY - p.y), 160, Math.min(480, Math.max(160, rect.height - 320)))
					layoutState.dock.height = h
					setVar('--vsc-rows', 'calc(100% - ' + h + 'px) ' + h + 'px')
				}
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
				const base = {
					s: collapsedSidebar ? SIDEBAR_RAIL : layoutState.sidebar.width,
					d: layoutState.dock.width,
					h: layoutState.dock.height,
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
					if (kind.startsWith('float-')) applyFloatResize(card, kind.slice(6), p, startX, startY, base, rect)
					else applyDockedResize(kind, p, startX, startY, base, rect)
					notify()
				}
				function up() {
					window.removeEventListener('pointermove', move)
					window.removeEventListener('pointerup', up)
					window.removeEventListener('pointercancel', up)
					if (raf !== null) { cancelAnimationFrame(raf); raf = null }
					applyDrag(latest)
					if (kind === 'sb') {
						if (layoutState.sidebar.width < 140) {
							layoutState.sidebar.width = 280
							if (layoutSvc !== undefined) { if (!collapsedSidebar) layoutSvc.toggleSidebar() }
							else { collapsedSidebar = true; applyLayout() }
						} else if (collapsedSidebar && layoutSvc !== undefined) {
							layoutSvc.toggleSidebar()
						}
					}
					if (kind === 'dk-right') {
						if (layoutState.dock.width < 140) {
							layoutState.dock.width = 400
							if (layoutSvc !== undefined) { if (!collapsedDetails) layoutSvc.closeDetails(); layoutState.dock.open = false }
							else { collapsedDetails = true; applyLayout() }
						} else if (collapsedDetails && layoutSvc !== undefined) {
							layoutSvc.openDetails()
						}
					}
					if (kind.startsWith('float-') && card === 'sidebar' && collapsedSidebar && layoutSvc !== undefined) {
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
			function resetWidth(kind) {
				if (kind === 'sb') layoutState.sidebar.width = 280
				else if (kind === 'dk-right') layoutState.dock.width = 400
				else if (kind === 'dk-bottom') layoutState.dock.height = 260
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
					const zone = zoneFor(card, latest.x - rect.left, latest.y - rect.top, w, h)
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
				const sb = layoutState.sidebar
				const dk = layoutState.dock
				const sbF = sb.dock === 'float'
				const dVis = dockVisible()
				const dkB = dk.dock === 'bottom' && dVis
				const dkR = dk.dock === 'right' && dVis
				const sbW = collapsedSidebar ? SIDEBAR_RAIL : sb.width
				if (!sbF) {
					parts.push(React.createElement('div', {
						key: 'sb', 'data-vsc-handle': 'sb',
						style: { position: 'absolute', left: sbW - 4, top: 0, bottom: 0, width: 8, cursor: 'col-resize', zIndex: 30, touchAction: 'none', pointerEvents: 'auto' },
						onPointerDown: function (e) { startDrag('sb', 'sidebar', e) },
						onDoubleClick: function () { resetWidth('sb') }
					}))
				}
				if (dkR) {
					parts.push(React.createElement('div', {
						key: 'dk', 'data-vsc-handle': 'dk',
						style: { position: 'absolute', left: w - dk.width - 4, top: 0, bottom: 0, width: 8, cursor: 'col-resize', zIndex: 30, touchAction: 'none', pointerEvents: 'auto' },
						onPointerDown: function (e) { startDrag('dk-right', 'dock', e) },
						onDoubleClick: function () { resetWidth('dk-right') }
					}))
				}
				if (dkB) {
					parts.push(React.createElement('div', {
						key: 'db', 'data-vsc-handle': 'db',
						style: { position: 'absolute', left: sbF ? 0 : sbW, right: 0, top: h - dk.height - 4, height: 8, cursor: 'row-resize', zIndex: 30, touchAction: 'none', pointerEvents: 'auto' },
						onPointerDown: function (e) { startDrag('dk-bottom', 'dock', e) },
						onDoubleClick: function () { resetWidth('dk-bottom') }
					}))
				}
			}

			function pushGrabStrips(parts) {
				const w = geom.w
				const h = geom.h
				const sb = layoutState.sidebar
				const dk = layoutState.dock
				const sbF = sb.dock === 'float'
				const cvF = layoutState.conversation.dock === 'float'
				const dVis = dockVisible()
				const dkR = dk.dock === 'right' && dVis
				const dkB = dk.dock === 'bottom' && dVis
				const sbW = collapsedSidebar ? SIDEBAR_RAIL : sb.width
				if (!sbF && !collapsedSidebar && dragState === null) {
					parts.push(React.createElement('div', {
						key: 'grab-sb', 'data-vsc-grab': '',
						style: { left: 0, top: 0, width: sbW, height: 10 },
						onPointerDown: function (e) { startDockDrag('sidebar', e) }
					}))
				}
				if (!cvF && dragState === null) {
					parts.push(React.createElement('div', {
						key: 'grab-cv', 'data-vsc-grab': '',
						style: { left: sbF ? 0 : sbW, top: 0, width: w - (sbF ? 0 : sbW) - (dkR ? dk.width : 0), height: 10 },
						onPointerDown: function (e) { startDockDrag('conversation', e) }
					}))
				}
				if ((dkR || dkB) && dVis && dragState === null) {
					const left = dkR ? w - dk.width : (sbF ? 0 : sbW)
					const width = dkR ? dk.width : w - (sbF ? 0 : sbW)
					const top = dkR ? 0 : h - dk.height
					parts.push(React.createElement('div', {
						key: 'grab-dk', 'data-vsc-grab': '',
						style: { left: left, top: top, width: width, height: 10 },
						onPointerDown: function (e) { startDockDrag('dock', e) }
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
				if (dragState === null) return
				const w = geom.w
				const h = geom.h
				const zones = []
				if (dragState.card === 'sidebar') {
					zones.push({ id: 'left', label: '停靠左侧', left: 0, top: 0, width: w * 0.26, height: h })
				} else if (dragState.card === 'conversation') {
					zones.push({ id: 'center', label: '回到中间', left: w * 0.35, top: h * 0.3, width: w * 0.3, height: h * 0.4 })
				} else {
					zones.push({ id: 'right', label: '停靠右侧', left: w * 0.72, top: 0, width: w * 0.28, height: h })
					zones.push({ id: 'bottom', label: '停靠底部', left: 0, top: h * 0.72, width: w, height: h * 0.28 })
				}
				for (const z of zones) {
					parts.push(React.createElement('div', {
						key: 'zone-' + z.id, 'data-vsc-zone': '', 'data-hot': dragState.zone === z.id || undefined,
						style: { left: z.left, top: z.top, width: z.width, height: z.height },
						children: z.label
					}))
				}
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

			function DockHost() {
				useEngine()
				if (frame === null || layoutState.mode !== 'card' || geom.w <= 0 || settingsOpen) return null
				const w = geom.w
				const h = geom.h
				const parts = []
				const docked = []
				for (const id of panelDefs.keys()) {
					const p = layoutState.panels[id]
					if (p !== undefined && p.open && !p.float) docked.push(id)
				}
				if (docked.length > 0) {
					const dk = layoutState.dock
					const sb = layoutState.sidebar
					const sbF = sb.dock === 'float'
					const sbX = sbF ? 0 : (collapsedSidebar ? SIDEBAR_RAIL : sb.width)
					const rect = dk.dock === 'bottom'
						? { left: sbX, top: h - dk.height, width: w - sbX, height: dk.height }
						: dk.dock === 'float'
							? { left: dk.fx, top: dk.fy, width: dk.fw, height: dk.fh }
							: { left: w - dk.width, top: 0, width: dk.width, height: h }
					const active = activePanel !== null && docked.includes(activePanel) ? activePanel : docked[0]
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
					parts.push(React.createElement('div', {
						key: 'dhost',
						style: { position: 'absolute', left: rect.left, top: rect.top, width: rect.width, height: rect.height, zIndex: 21, display: 'flex', flexDirection: 'column', overflow: 'hidden', pointerEvents: 'auto', background: 'color-mix(in srgb, var(--dsw-alias-bg-base) 88%, transparent)', backdropFilter: 'blur(12px)', border: '1px solid var(--dsw-alias-border-l2)', borderRadius: 12, boxSizing: 'border-box' },
						children: [
							React.createElement('div', { key: 'bar', style: { display: 'flex', gap: 4, padding: '6px 8px', borderBottom: '1px solid var(--dsw-alias-border-l1)', flexWrap: 'wrap', flex: 'none' } }, ...tabs),
							React.createElement(PanelMount, { key: 'body', def: panelDefs.get(active) })
						]
					}))
				}
				for (const id of panelDefs.keys()) {
					const p = layoutState.panels[id]
					if (p === undefined || !p.open || !p.float) continue
					parts.push(React.createElement(PanelFloat, { key: 'pfloat-' + id, id: id, def: panelDefs.get(id) }))
				}
				return parts.length > 0 ? React.createElement(React.Fragment, null, ...parts) : null
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
					layoutState.panels = fresh.panels
					activePanel = null
					saveLayoutState()
					applyLayout()
					notify()
				}
				return React.createElement('div', { style: base },
					React.createElement('h3', { style: h3 }, '布局'),
					React.createElement('p', { style: p }, '卡片模式：拖住卡片顶栏即脱离为浮动窗口，拖到边缘停靠区吸附回位；手柄双击重置宽度；状态自动记忆。'),
					React.createElement('div', { style: { marginBottom: 18 } },
						React.createElement('span', { style: labelStyle }, '布局模式'),
						React.createElement('div', { style: rowStyle },
							React.createElement('button', { type: 'button', style: pill(layoutState.mode === 'classic'), onClick: function () { setMode('classic') } }, '经典'),
							React.createElement('button', { type: 'button', style: pill(layoutState.mode === 'card'), onClick: function () { setMode('card') } }, '卡片')
						)
					),
					React.createElement('div', { style: { marginBottom: 18 } },
						React.createElement('span', { style: labelStyle }, '停靠卡（右列/底部/浮动）'),
						React.createElement('div', { style: rowStyle },
							React.createElement('button', { type: 'button', style: ghost, onClick: function () { layoutState.dock.open = true; applyLayout(); saveLayoutState() } }, '打开'),
							React.createElement('button', { type: 'button', style: ghost, onClick: function () { closeDock() } }, '关闭')
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
				if (probeTimer === null) probeTimer = window.setInterval(probeTick, 500)
			}
			function teardown() {
				if (mo !== null) { mo.disconnect(); mo = null }
				if (ro !== null) { ro.disconnect(); ro = null }
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
