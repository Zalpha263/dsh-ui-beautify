window.__ModuleLoader__.load({
	id: "dsh-ui-beautify",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		const React = require("react");

		/**
		 * Package-owned <style> host; `insert` returns a disposer.
		 *
		 * DSH 0.2.0-rc.2 exposes no client `styles` service — the official
		 * `dsh-client-ui-theme` plugin likewise appends its own `<style>` nodes —
		 * so a package-owned element is the current, supported shape. Rules that
		 * only need to move a theme token belong in `theme.overrideTokens()`
		 * instead; this element is for rules tokens cannot express (selectors,
		 * background images, structure).
		 */
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

		/**
		 * Preset token sets — every value must be a { light, dark } pair of
		 * strings; `theme.overrideTokens()` throws on a bare string.
		 *
		 * SUPPORT SURFACE (re-verify on every DSH upgrade): 7 of the 17 tokens in
		 * each preset are in the official 14-token override catalogue
		 * (`--dsw-alias-bg-base`, `--dsw-alias-bg-layer-1`, `--dsw-alias-border-l1`,
		 * `--dsw-alias-brand-primary`, `--dsw-alias-label-primary`,
		 * `--dsw-alias-state-success-primary`, `--dsw-specific-sidebar-fill`).
		 * The remaining 10 are NOT in that catalogue — they are internal tokens of
		 * the shipped stylesheet, accepted by `overrideTokens()` (which validates
		 * only the { light, dark } shape) and still consumed by the 0.2.0-rc.2 UI,
		 * but they can be renamed or dropped without notice:
		 *   --dsw-alias-state-business-primary / -tertiary
		 *   --dsw-alias-brand-primary-new-colorprimary-new-color
		 *   --dsw-alias-label-primary-bluish
		 *   --dsw-alias-button-info-fill      (composer send button)
		 *   --dsw-specific-sidebar-nav-item-active-accent
		 *   --dsw-static-deepseek-500 / -450 / -200
		 *   --dsw-specific-bubble             (user bubble)
		 * Dropping them yields stock accents; nothing else in the plugin depends
		 * on them. Verify with `cordis_inspect_query` → client Theme.listTokens
		 * plus a grep of the shipped client bundles.
		 */
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
				bubble: { light: "#dbe9fb", dark: "#1e3350" }
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
				bubble: { light: "#f3e6d3", dark: "#3d3123" }
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
				bubble: { light: "#d9f0ec", dark: "#1d4a46" }
			}
		};

		const BG_TOKENS = {
			"--dsw-alias-bg-base": { light: "rgba(247,249,252,0.85)", dark: "rgba(12,18,30,0.85)" },
			"--dsw-specific-sidebar-fill": { light: "rgba(238,243,250,0.80)", dark: "rgba(15,23,42,0.80)" }
		};

		/**
		 * Neutralizes the workspace session-list bottom fade, which would
		 * otherwise paint a visible white gradient over a custom sidebar and
		 * background. 0.2.0-rc.2 offers no stable hook for that element, so the
		 * rule walks the structural seat instead. Hashed CSS-module classes
		 * (`.bhn1Oq_fade`, `.qDHVXG_fade`) were removed here in v4.1.0: they no
		 * longer exist in the shipped client, and every upstream rebuild renames
		 * them — do not reintroduce one.
		 */
		const FADE_KILL_CSS = "[data-slot=\"sidebar.workspaces\"] > * > :last-child > :last-child{background:none !important;}";

		/**
		 * Give the plugin panel the surface every other page paints for itself.
		 *
		 * The wallpaper goes on `[data-slot=root] > *`, the layout frame that
		 * also carries `background:var(--dsw-alias-bg-base)`. Every layer
		 * between the frame and the text therefore has to paint its own: the
		 * sidebar column does (`--dsw-specific-sidebar-fill`) and so does the
		 * conversation page. A `main`-slot page that paints no background shows
		 * the raw wallpaper instead — the plugin manager page is exactly such a
		 * page, so a wallpaper would leave its cards and text sitting directly
		 * on the image. Paint the same token the conversation page uses;
		 * BG_TOKENS already carries the 0.85 alpha, so the two pages match.
		 *
		 * `[data-plugin-panel]` is that page's own stable hook, not a hashed
		 * CSS-module class (hashed names are gone from this file in v4.1.0 —
		 * see FADE_KILL_CSS). No `!important`: the host rule wins if upstream
		 * ever ships a surface for this page, and nothing competes today.
		 * Scoped to the wallpaper by living in setBackgroundFromDataUrl's bundle,
		 * so it is disposed with the image.
		 */
		const PANEL_SURFACE_CSS = "[data-plugin-panel]{background:var(--dsw-alias-bg-base);}";

		const LABELS = { default: "默认", ocean: "深海蓝", sand: "暖沙", teal: "松石绿" };
		const PRESET_IDS = ["default", "ocean", "sand", "teal"];
		const STORAGE_KEY = "dsh-ui-beautify:state";

		function apply(ctx) {
			// `inject = ["theme", "slots"]` already guarantees both services — the
			// plugin does not load until they exist, so no runtime lookup is needed.
			const theme = ctx.theme;
			const slots = ctx.slots;
			/* 注：引擎状态（含 `disposed`）全部声明在下面的 apply 闭包里，每次 apply
			   都是新闭包、天然复位，无需在此重置。 */

			/* ==================================================================
			 * 外观美化 (原有功能)
			 * ================================================================== */
			let state = { preset: "default" };
			let presetTokenDisposer = null;
			let bg = null;

			/* Preset surfaces are driven entirely by host tokens, written through
			   overrideTokens in applyPreset below.
			   v3.0.1: the user bubble follows `--dsw-specific-bubble`.
			   v4.1.0: the composer send button follows `--dsw-alias-button-info-fill`
			   (0.2.0-rc.2 renders it as `background:var(--dsw-alias-button-info-fill)`),
			   so the per-preset `button` color is no longer written as a hashed
			   CSS-module class override — that selector (`.uV2eYG_primary`) no
			   longer exists upstream and is not re-added here. */

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
				state.preset = id;
				if (id !== "default" && PRESETS[id]) {
					const preset = PRESETS[id];
					/* v3.0.1: 用户气泡由宿主 token 驱动（chat 与 goal 共用），把预设的
					   bubble 值并入 token 覆盖，两个包的气泡才会一起跟随预设。
					   v4.1.0: 发送按钮同理由 `--dsw-alias-button-info-fill` 驱动
					   （该 token 已在各预设的 tokens 里），不再写哈希类。 */
					const tokens = Object.assign({}, preset.tokens);
					tokens["--dsw-specific-bubble"] = preset.bubble;
					presetTokenDisposer = theme.overrideTokens("beautify-preset", tokens);
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
					React.createElement("p", { style: p }, "配色预设与背景图全部通过官方主题 token 生效（发送按钮、用户气泡、侧边栏一并跟随），设置窗口保持官方外观。"),
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
					clearBackgroundImage(false);
				};
			});
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
