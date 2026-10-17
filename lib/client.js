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
		 * DSH exposes no client `styles` service for installed plugins — the
		 * official `dsh-client-ui-theme` plugin likewise appends its own
		 * `<style>` nodes — so a package-owned element is the current,
		 * supported shape. Rules that only need to move a theme token belong in
		 * `theme.overrideTokens()` instead; this element is for rules tokens
		 * cannot express (background images, structural selectors).
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

		/* ==================================================================
		 * Token 目录 —— 单一真源
		 *
		 * 三套预设写的是同一组 token，只有颜色不同。v4.1.0 及更早每个预设各抄一份
		 * 16 键的表，改一个 token 名要改三处、漏写一个键也不会报错。现在：
		 *   ① TOKEN_CATALOGUE 声明「有哪些 token」（唯一一处）；
		 *   ② 每个预设只给 15 组 [浅色, 深色] 值；
		 *   ③ presetTokens() 组装成 overrideTokens 要的 { light, dark } 形状。
		 * 另外每个预设还有一个 `bubble` 值，组装时并入 `--dsw-specific-bubble`。
		 *
		 * SUPPORT SURFACE（每次 DSH 升级都要复核）：`open: true` 的 7 个在官方
		 * 14-token 目录内；`open: false` 的 8 个是内置样式表的内部变量 ——
		 * `overrideTokens()` 只校验 { light, dark } 形状、不校验名字，所以它们今天
		 * 有效，但上游改名/删除不会有任何报错，表现是「某处颜色不跟随预设」。
		 * 复核清单与判据见 README「兼容性」一节。
		 * ================================================================== */
		const TOKEN_CATALOGUE = [
			/* 公开目录（7） */
			{ id: "bgBase", token: "--dsw-alias-bg-base", open: true },
			{ id: "bgLayer1", token: "--dsw-alias-bg-layer-1", open: true },
			{ id: "borderL1", token: "--dsw-alias-border-l1", open: true },
			{ id: "brandPrimary", token: "--dsw-alias-brand-primary", open: true },
			{ id: "labelPrimary", token: "--dsw-alias-label-primary", open: true },
			{ id: "stateSuccess", token: "--dsw-alias-state-success-primary", open: true },
			{ id: "sidebarFill", token: "--dsw-specific-sidebar-fill", open: true },
			/* 内部变量（8）：上游样式表里的名字，没有公开目录兜底 */
			{ id: "stateBusiness", token: "--dsw-alias-state-business-primary", open: false },
			{ id: "stateBusinessTertiary", token: "--dsw-alias-state-business-tertiary", open: false },
			{ id: "brandPrimaryAlt", token: "--dsw-alias-brand-primary-new-colorprimary-new-color", open: false },
			{ id: "labelPrimaryBluish", token: "--dsw-alias-label-primary-bluish", open: false },
			/* 会话主按钮：fill 是常态底色，hover 是 :hover:not(:disabled) 的底色。
			   两个都要写 —— 只写 fill 时，亮色模式下悬停会跳回上游的浅蓝。 */
			{ id: "sendButtonFill", token: "--dsw-alias-button-info-fill", open: false },
			{ id: "sendButtonHover", token: "--dsw-alias-button-info-hover", open: false },
			{ id: "deepseek500", token: "--dsw-static-deepseek-500", open: false },
			{ id: "deepseek450", token: "--dsw-static-deepseek-450", open: false }
		];

		/** 用户气泡走单独一层 token；chat 与 goal 共用它，所以按预设给一个值即可。 */
		const BUBBLE_TOKEN = "--dsw-specific-bubble";

		/**
		 * 每个预设：`values[tokenId] = [light, dark]`，另外 `bubble` 同形状。
		 *
		 * 发送按钮的 hover 关系照抄官方：官方 light 是 fill=deepseek-500、hover=
		 * deepseek-400（更浅一档），dark 是 fill=deepseek-400、hover=deepseek-500
		 * （更深一档）。所以每个预设的 hover 相对 fill：浅色主题浅一档、深色主题深
		 * 一档，且与 fill 明显区分（一整档色阶），避免悬停时跳回上游蓝。
		 */
		const PRESETS = {
			ocean: {
				label: "深海蓝",
				values: {
					bgBase: ["#f4f7fc", "#0f172a"],
					bgLayer1: ["#ffffff", "#1e293b"],
					borderL1: ["#dce3f0", "#334155"],
					brandPrimary: ["#2563eb", "#3b82f6"],
					labelPrimary: ["#1e3a8a", "#bfdbfe"],
					stateSuccess: ["#059669", "#34d399"],
					sidebarFill: ["#dbe7f7", "#15233f"],
					stateBusiness: ["#2563eb", "#3b82f6"],
					stateBusinessTertiary: ["#dbe9fb", "#1e3350"],
					brandPrimaryAlt: ["#2563eb", "#3b82f6"],
					labelPrimaryBluish: ["#1e3a8a", "#bfdbfe"],
					sendButtonFill: ["#2563eb", "#1d4ed8"],
					sendButtonHover: ["#3b82f6", "#1e40af"],
					deepseek500: ["#2563eb", "#3b82f6"],
					deepseek450: ["#2563eb", "#3b82f6"]
				},
				bubble: ["#dbe9fb", "#1e3350"]
			},
			sand: {
				label: "暖沙",
				values: {
					bgBase: ["#fbf7f0", "#1c1917"],
					bgLayer1: ["#ffffff", "#292524"],
					borderL1: ["#e7ddd0", "#44403c"],
					brandPrimary: ["#b45309", "#f59e0b"],
					labelPrimary: ["#5b4636", "#f0e6d3"],
					stateSuccess: ["#15803d", "#4ade80"],
					sidebarFill: ["#f2e6d5", "#33291e"],
					stateBusiness: ["#b45309", "#f59e0b"],
					stateBusinessTertiary: ["#f3e6d3", "#3d3123"],
					brandPrimaryAlt: ["#b45309", "#f59e0b"],
					labelPrimaryBluish: ["#5b4636", "#f0e6d3"],
					sendButtonFill: ["#b45309", "#b45309"],
					sendButtonHover: ["#d97706", "#92400e"],
					deepseek500: ["#b45309", "#f59e0b"],
					deepseek450: ["#b45309", "#f59e0b"]
				},
				bubble: ["#f3e6d3", "#3d3123"]
			},
			teal: {
				label: "松石绿",
				values: {
					bgBase: ["#f0faf9", "#042f2e"],
					bgLayer1: ["#ffffff", "#134e4a"],
					borderL1: ["#d2e8e5", "#115e59"],
					brandPrimary: ["#0d9488", "#2dd4bf"],
					labelPrimary: ["#134e4a", "#ccfbf1"],
					stateSuccess: ["#059669", "#34d399"],
					sidebarFill: ["#d4ece7", "#0b3d38"],
					stateBusiness: ["#0d9488", "#2dd4bf"],
					stateBusinessTertiary: ["#d9f0ec", "#1d4a46"],
					brandPrimaryAlt: ["#0d9488", "#2dd4bf"],
					labelPrimaryBluish: ["#134e4a", "#ccfbf1"],
					sendButtonFill: ["#0d9488", "#0f766e"],
					sendButtonHover: ["#14b8a6", "#115e59"],
					deepseek500: ["#0d9488", "#2dd4bf"],
					deepseek450: ["#0d9488", "#2dd4bf"]
				},
				bubble: ["#d9f0ec", "#1d4a46"]
			}
		};

		const PRESET_IDS = ["default", "ocean", "sand", "teal"];
		const DEFAULT_LABEL = "默认";

		/** 背景图模式下的可读遮罩：把两张通栏底色压成半透明，露出壁纸。 */
		const BG_TOKENS = {
			"--dsw-alias-bg-base": { light: "rgba(247,249,252,0.85)", dark: "rgba(12,18,30,0.85)" },
			"--dsw-specific-sidebar-fill": { light: "rgba(238,243,250,0.80)", dark: "rgba(15,23,42,0.80)" }
		};

		/** 预设 id 是否合法（`default` 单独判断，它不写任何 token）。 */
		function hasPreset(id) {
			return typeof id === "string" && Object.prototype.hasOwnProperty.call(PRESETS, id);
		}

		/** 把一个预设展开成 overrideTokens 要的完整 token 表（含用户气泡）。 */
		function presetTokens(id) {
			const preset = hasPreset(id) ? PRESETS[id] : null;
			if (preset === null) return {};
			const tokens = {};
			for (const entry of TOKEN_CATALOGUE) {
				const pair = preset.values[entry.id];
				/* 目录与预设值必须一一对应；缺一个就是数据错误，宁可不写也不要写出
				   半个 { light, dark } 让 overrideTokens 抛错。 */
				if (!Array.isArray(pair) || typeof pair[0] !== "string" || typeof pair[1] !== "string") continue;
				tokens[entry.token] = { light: pair[0], dark: pair[1] };
			}
			tokens[BUBBLE_TOKEN] = { light: preset.bubble[0], dark: preset.bubble[1] };
			return tokens;
		}

		/**
		 * 外观 token = 预设层 + 背景遮罩层，合成一次 overrideTokens 调用。
		 *
		 * v4.1.0 及更早分两层（"beautify-preset" / "beautify-bg"），谁赢只靠调用
		 * 先后保证 —— 任何新调用点只要顺序错了，壁纸遮罩就会被预设底色盖掉、变成
		 * 不透明。现在只有一个 source（SOURCE），背景遮罩在同一个对象里后写，
		 * 层叠顺序显式且与调用顺序无关。
		 */
		function appearanceTokens(presetId, hasBackground) {
			const tokens = presetId === "default" || !hasPreset(presetId) ? {} : presetTokens(presetId);
			if (hasBackground) Object.assign(tokens, BG_TOKENS);
			return tokens;
		}

		/**
		 * Neutralizes the workspace session-list bottom fade: it paints
		 * `linear-gradient(transparent, var(--dsw-specific-sidebar-fill))` over
		 * the bottom 24px of the session list, which is visible on a custom
		 * sidebar and on a wallpaper.
		 *
		 * 为什么用 `span[class*="_fade"]` 子串而不是整串类名：淡出层的类是带哈希
		 * 前缀的 CSS Module 类，构建一次就换一批 —— 0.2.0-rc.2 是
		 * `span.bhn1Oq_fade`，0.2.1-rc.1 是 `span._9lTDKa_fade`（旧版文件头说
		 * 这两个类「在 rc.2 里都不存在」是错的：它们都存在，只是 0.2.1 改了名）。
		 * 会变的是哈希前缀，`_fade` 后缀是模块里的原始类名，跨构建稳定，所以子串
		 * 匹配同时覆盖两个走廊版本。不要再写整串哈希类名。
		 *
		 * 结构式选择器（`[data-slot=...] > * > :last-child > :last-child`）少算
		 * 一层：它命中的是 `div.treeBody`，而 treeBody 自己没有 background ——
		 * 整条规则是 no-op，v4.1.0 正是因此两个运行时都不再清除淡出层。
		 * macOS 桌面下上游用 `[data-platform=darwin] ...{display:none}` 直接隐藏
		 * 这一层，本规则对它无副作用。
		 */
		const FADE_KILL_CSS = "[data-slot=\"sidebar.workspaces\"] span[class*=\"_fade\"]{background:none !important;}";

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
		 * CSS-module class. No `!important`: the host rule wins if upstream
		 * ever ships a surface for this page, and nothing competes today.
		 * Injected with the wallpaper so it is disposed with the image.
		 */
		const PANEL_SURFACE_CSS = "[data-plugin-panel]{background:var(--dsw-alias-bg-base);}";

		/* ==================================================================
		 * 持久化常量
		 * ================================================================== */

		/** 全部外观 token 只占一层（见 appearanceTokens 的注释）。 */
		const SOURCE = "beautify";

		/* localStorage 只是缓存：桌面宿主 origin 每次重启都变，权威状态在宿主侧
		   （<DSH_HOME>/storages/dsh-ui-beautify/state.json）。预设与背景图分两个
		   key 存，切预设时不用把整张图重新序列化写盘。 */
		const PRESET_KEY = "dsh-ui-beautify:preset";
		const BG_KEY = "dsh-ui-beautify:bg";
		/** v4.1.0 及更早的单一 key（{ preset, bg }），只读一次做迁移。 */
		const LEGACY_KEY = "dsh-ui-beautify:state";

		/** 宿主保存防抖：连续操作只在停下来后发一次 RPC。 */
		const SAVE_DEBOUNCE_MS = 300;

		/* 图片处理参数。MAX_EDGE 与 README 的「最长边 2560px」是同一件事；
		   LOSSLESS_LIMIT 是「保留原图/PNG」的 data URL 字符上限，超过才降级 JPEG。 */
		const MAX_EDGE = 2560;
		const JPEG_QUALITY = 0.85;
		const LOSSLESS_LIMIT = 2 * 1024 * 1024;
		/** 缓存重试用更狠的一档（老版本就是 1400 / 0.72）。 */
		const CACHE_RETRY_MAX_EDGE = 1400;
		const CACHE_RETRY_QUALITY = 0.72;
		/** 低于这个长度的图连压缩都救不了配额，直接提示失败。 */
		const CACHE_RETRY_MIN_CHARS = 200000;

		/* ==================================================================
		 * Remote 命名空间贡献
		 *
		 * `remote.uiBeautify` 由本入口自己挂载 —— 不能写进 inject（服务由本插件
		 * 提供，写进去会自锁）。descriptor 是手写的：本包单文件、无构建，typert
		 * 生成器不参与，所以只能手工给出 strict codec 形状。codec 必须带
		 * create() 工厂：两端 Gateway 都会调用 `codec.create().parse(value)`，
		 * 旧的 `codec.schema` 字段已经没有人读。
		 *
		 * 参数名必须与 host 方法源码里的参数名逐字相同（Gateway 按源码推导
		 * wire）：lib/index.js 里的签名是 `saveClientState(state)`。
		 * ================================================================== */
		function passthroughSchema() {
			return { parse: function (value) { return value; } };
		}
		function strictCodec(typeSymbol) {
			return { mode: "strict", typeSymbol: typeSymbol, create: passthroughSchema };
		}
		function descriptorOf(method, takesState) {
			const id = "dsh-ui-beautify#uiBeautify/" + method;
			return {
				id: id,
				service: "uiBeautify",
				namespace: "uiBeautify",
				method: method,
				invocation: { kind: "direct" },
				parameters: takesState
					? [{ name: "state", wire: "state", source: "json", codec: strictCodec(id + ":state") }]
					: [],
				result: strictCodec(id + ":result"),
				sourceLocation: { file: "dsh-ui-beautify/lib/client.js", line: 1, column: 1 }
			};
		}
		const CONTRIBUTION = {
			package: "dsh-ui-beautify",
			descriptors: [descriptorOf("loadClientState", false), descriptorOf("saveClientState", true)]
		};

		/** 命名空间方法返回 `{ ok, value }` 信封；失败时把宿主原因抛给调用方。 */
		function unwrap(result) {
			if (result && result.ok === true) return result.value;
			const error = result && result.error;
			throw new Error((error && error.message) || "uiBeautify remote call failed");
		}

		/* ==================================================================
		 * 图片编码（纯函数 + DOM，放在 apply 外面便于测试直接调用）
		 * ================================================================== */

		/**
		 * 读图 → 编码成可用的 data URL。
		 *
		 * 优先级：① 不需要缩放且原图够小 → 原样返回（不重编码，不丢画质、不丢透明）；
		 * ② 需要缩小或原图太大 → 画到 canvas，先出 PNG（保留 alpha，透明壁纸不会
		 * 变黑底）；③ PNG 仍然太大 → 才是 JPEG（无损优先，超限才降质量）。
		 */
		function downscaleImage(dataUrl, options) {
			const settings = options || {};
			const maxEdge = settings.maxEdge || MAX_EDGE;
			const quality = settings.quality === void 0 ? JPEG_QUALITY : settings.quality;
			const losslessLimit = settings.losslessLimit === void 0 ? LOSSLESS_LIMIT : settings.losslessLimit;
			return new Promise(function (resolve, reject) {
				const img = new Image();
				img.onload = function () {
					try { resolve(encodeBackground(img, dataUrl, maxEdge, quality, losslessLimit)); }
					catch (error) { reject(error); }
				};
				img.onerror = function () { reject(new Error("image decode failed")); };
				img.src = dataUrl;
			});
		}

		function encodeBackground(img, originalUrl, maxEdge, quality, losslessLimit) {
			const scale = Math.min(1, maxEdge / Math.max(img.width, img.height));
			if (scale === 1 && typeof originalUrl === "string" && originalUrl.length <= losslessLimit) {
				return originalUrl;
			}
			const width = Math.max(1, Math.round(img.width * scale));
			const height = Math.max(1, Math.round(img.height * scale));
			const canvas = document.createElement("canvas");
			canvas.width = width;
			canvas.height = height;
			const context2d = canvas.getContext("2d");
			if (context2d === null) throw new Error("canvas 2d context unavailable");
			context2d.drawImage(img, 0, 0, width, height);
			if (losslessLimit > 0) {
				const png = canvas.toDataURL("image/png");
				if (typeof png === "string" && png.length <= losslessLimit) return png;
			}
			return canvas.toDataURL("image/jpeg", quality);
		}

		/** 背景图相关的全部 CSS（壁纸 + 侧栏透明 + 淡出层 + 插件页补面）。 */
		function backgroundCss(dataUrl) {
			return [
				"[data-slot=root] > *{background-image:url(\"" + dataUrl + "\") !important;background-size:cover !important;background-position:center !important;}",
				"[data-slot=sidebar] > *{background:transparent !important;}",
				FADE_KILL_CSS,
				PANEL_SURFACE_CSS
			].join("\n");
		}

		function describeError(error) {
			return String((error && error.message) || error);
		}

		function apply(ctx) {
			/* `inject` 只保证服务就绪，不做运行时查找：theme 与 slots 在 apply 之前
			   一定存在（0.2.0/0.2.1 都提供）；remote 也由 inject 声明，但它的命名空间
			   方法（loadClientState/saveClientState）来自本包的 host 半区，旧宿主可能
			   没有 —— 那部分全部走特性检测 + 静默回退。 */
			const theme = ctx.theme;
			const slots = ctx.slots;

			let state = { preset: "default" };
			let bg = null; // { dataUrl, cssDisposer } | null
			let appearanceDisposer = null;

			/* ---------------------------------------------------------------
			 * 面板可见状态
			 * 保存失败不能只 console.warn：面板必须显示出来，否则用户以为已经存好。
			 * --------------------------------------------------------------- */
			const listeners = new Set();
			const notices = [];
			function notify() {
				listeners.forEach(function (listener) {
					try { listener(); } catch (error) { /* 渲染失败不影响持久化 */ }
				});
			}
			function setNotice(kind, text) {
				const index = notices.findIndex(function (notice) { return notice.kind === kind; });
				if (text === "") {
					if (index >= 0) { notices.splice(index, 1); notify(); }
					return;
				}
				if (index >= 0) {
					if (notices[index].text === text) return;
					notices[index].text = text;
				} else {
					notices.push({ kind: kind, text: text });
				}
				notify();
			}

			/* ---------------------------------------------------------------
			 * 浏览器缓存（localStorage）—— 只是缓存，不是权威
			 * --------------------------------------------------------------- */
			function readCache(key) {
				try {
					const value = window.localStorage.getItem(key);
					return typeof value === "string" && value !== "" ? value : null;
				} catch (error) { return null; }
			}
			function writeCache(key, value) {
				try { window.localStorage.setItem(key, value); return true; }
				catch (error) { return false; }
			}
			function removeCache(key) {
				try { window.localStorage.removeItem(key); } catch (error) { /* 清不掉就当没有 */ }
			}

			/* v4.2.0：旧版本把 { preset, bg } 整体存在一个 key 里。拆成两个 key
			   （小/大分开）后，旧值只在首次启动迁移一次，迁移完删掉旧 key。 */
			function migrateLegacyCache() {
				try {
					const raw = window.localStorage.getItem(LEGACY_KEY);
					if (raw === null) return;
					const saved = JSON.parse(raw);
					if (saved !== null && typeof saved === "object") {
						if (typeof saved.preset === "string" && saved.preset !== "") writeCache(PRESET_KEY, saved.preset);
						if (typeof saved.bg === "string" && saved.bg !== "") writeCache(BG_KEY, saved.bg);
					}
					window.localStorage.removeItem(LEGACY_KEY);
				} catch (error) { /* 旧缓存坏了当不存在 */ }
			}

			function savePresetCache() {
				if (state.preset === "default") { removeCache(PRESET_KEY); setNotice("cache", ""); return; }
				if (writeCache(PRESET_KEY, state.preset)) { setNotice("cache", ""); return; }
				setNotice("cache", "浏览器缓存写入失败（localStorage 不可用或已满）；刷新后可能回到旧配色。");
			}

			function saveBackgroundCache() {
				if (bg === null) { removeCache(BG_KEY); setNotice("cache", ""); return; }
				const current = bg.dataUrl;
				if (writeCache(BG_KEY, current)) { setNotice("cache", ""); return; }
				/* 缓存写不下（localStorage 约 5MB 配额）：压缩后重试一次。成功时必须让
				   屏幕、缓存、宿主三处一致 —— 只改存储会让刷新后突然变样（v3.0.1 修过
				   这个回归点），所以走 applyBackground 重建 CSS。 */
				if (typeof current !== "string" || current.length <= CACHE_RETRY_MIN_CHARS) {
					setNotice("cache", "背景图超出浏览器缓存配额，未能缓存；DSH 宿主保存不受影响。");
					return;
				}
				downscaleImage(current, {
					maxEdge: CACHE_RETRY_MAX_EDGE,
					quality: CACHE_RETRY_QUALITY,
					losslessLimit: 0
				}).then(function (smaller) {
					if (typeof smaller !== "string" || smaller === current) {
						setNotice("cache", "背景图超出浏览器缓存配额，压缩后仍未能缓存；DSH 宿主保存不受影响。");
						return;
					}
					if (bg === null || bg.dataUrl !== current) return; // 期间换了图，别覆盖
					if (!writeCache(BG_KEY, smaller)) {
						setNotice("cache", "背景图超出浏览器缓存配额，压缩后仍未能缓存；DSH 宿主保存不受影响。");
						return;
					}
					applyBackground(smaller, false);
					scheduleHostSave();
					setNotice("cache", "");
				}).catch(function () {
					setNotice("cache", "背景图压缩失败，未能写入浏览器缓存；DSH 宿主保存不受影响。");
				});
			}

			/* ---------------------------------------------------------------
			 * 外观引擎：一次 overrideTokens 写入全部 token
			 * --------------------------------------------------------------- */
			function applyAppearance() {
				if (appearanceDisposer !== null) { appearanceDisposer(); appearanceDisposer = null; }
				const tokens = appearanceTokens(state.preset, bg !== null);
				if (Object.keys(tokens).length === 0) return;
				appearanceDisposer = theme.overrideTokens(SOURCE, tokens);
			}

			function normalizePreset(id) {
				return id === "default" || hasPreset(id) ? id : "default";
			}

			/** 只换背景（CSS + 内存），不碰 token 层 —— 由调用方统一 applyAppearance 一次。 */
			function setBackgroundState(dataUrl) {
				if (bg !== null) {
					if (bg.cssDisposer) bg.cssDisposer();
					bg = null;
				}
				if (typeof dataUrl === "string" && dataUrl !== "") {
					bg = { dataUrl: dataUrl, cssDisposer: insertCss(backgroundCss(dataUrl)) };
				}
			}

			/** `persist === false` 用于「从缓存/宿主恢复」：只改内存与屏幕，不回写。 */
			function applyPreset(id, persist) {
				state.preset = normalizePreset(id);
				applyAppearance();
				if (persist !== false) {
					userEdits += 1;
					savePresetCache();
					scheduleHostSave();
				}
				notify();
			}

			function applyBackground(dataUrl, persist) {
				setBackgroundState(dataUrl);
				applyAppearance();
				if (persist !== false) {
					userEdits += 1;
					saveBackgroundCache();
					scheduleHostSave();
				}
				notify();
			}

			function clearBackground(persist) {
				applyBackground(null, persist);
			}

			function resetAll() {
				applyPreset("default");
				clearBackground();
			}

			/* ---------------------------------------------------------------
			 * 宿主持久化（Remote.uiBeautify）
			 * --------------------------------------------------------------- */
			let hostBridge = null;
			let saveTimer = null;
			/** 用户改过几次外观：用来避免「宿主状态回灌」覆盖用户刚做的选择。 */
			let userEdits = 0;

			function hostPayload() {
				return { preset: state.preset, bg: bg === null ? null : bg.dataUrl };
			}

			/** 命名空间存在才返回桥；旧宿主/旧 host 半区返回 null（静默回退）。 */
			function bridgeOf() {
				const namespace = typeof ctx.get === "function" ? ctx.get("remote.uiBeautify") : undefined;
				if (namespace === undefined || namespace === null) return null;
				if (typeof namespace.loadClientState !== "function" || typeof namespace.saveClientState !== "function") return null;
				return {
					load: function () {
						return Promise.resolve().then(function () {
							return namespace.loadClientState();
						}).then(unwrap).then(function (value) {
							if (value === null || typeof value !== "object") return null;
							const saved = value.state;
							return saved !== null && typeof saved === "object" ? saved : null;
						});
					},
					save: function (payload) {
						return Promise.resolve().then(function () {
							return namespace.saveClientState(payload);
						}).then(unwrap);
					}
				};
			}

			function scheduleHostSave() {
				if (hostBridge === null) return; // 没有宿主通道：localStorage 已经写过了
				if (saveTimer !== null) window.clearTimeout(saveTimer);
				saveTimer = window.setTimeout(function () {
					saveTimer = null;
					const bridge = hostBridge;
					if (bridge === null) return;
					bridge.save(hostPayload()).then(function () {
						setNotice("host", "");
					}).catch(function (error) {
						setNotice("host", "保存到 DSH 宿主失败：" + describeError(error) + "（浏览器缓存仍然有效）");
					});
				}, SAVE_DEBOUNCE_MS);
			}

			/**
			 * 宿主值覆盖内存与缓存（**宿主是权威**：桌面版 origin 会变，缓存可能来自
			 * 上一次会话）。仅当 saved 非空且用户尚未动过外观时执行。
			 */
			function mergeHostState(saved) {
				if (saved === null || userEdits > 0) return;
				/* 预设与背景一起换，只写一次 token 层（一次 applyAppearance）。 */
				state.preset = normalizePreset(typeof saved.preset === "string" ? saved.preset : "default");
				setBackgroundState(typeof saved.bg === "string" && saved.bg !== "" ? saved.bg : null);
				applyAppearance();
				/* 缓存跟着宿主走；缓存写失败只影响下次首屏，不回灌宿主。 */
				savePresetCache();
				saveBackgroundCache();
				notify();
			}

			function restoreFromCache() {
				migrateLegacyCache();
				const preset = readCache(PRESET_KEY);
				const image = readCache(BG_KEY);
				/* 首屏一次性还原：预设与背景合成一张 token 表，只写一层。 */
				state.preset = normalizePreset(preset === null ? "default" : preset);
				setBackgroundState(image);
				applyAppearance();
				notify();
			}

			/* ---------------------------------------------------------------
			 * 图片输入
			 * --------------------------------------------------------------- */
			function setBackgroundImage(file) {
				const reader = new FileReader();
				reader.onerror = function () {
					setNotice("image", "读取这张图片失败，背景图未更改。");
				};
				reader.onload = function () {
					const original = String(reader.result);
					downscaleImage(original).then(
						function (encoded) { applyBackground(encoded); },
						function () { setNotice("image", "无法解码这张图片（不是图片或已损坏），背景图未更改。"); }
					);
				};
				reader.readAsDataURL(file);
			}

			/* ---------------------------------------------------------------
			 * 设置面板
			 * --------------------------------------------------------------- */
			function labelOf(id) {
				return hasPreset(id) ? PRESETS[id].label : DEFAULT_LABEL;
			}

			function Panel() {
				/* 外观状态住在闭包里，不在 React 状态里：任何来源（用户点击、宿主回灌、
				   缓存恢复）都走 applyPreset/applyBackground，统一 notify 一次。 */
				const [, bump] = React.useState(0);
				const fileRef = React.useRef(null);
				React.useEffect(function subscribeAppearance() {
					const listener = function () { bump(function (count) { return count + 1; }); };
					listeners.add(listener);
					return function dispose() { listeners.delete(listener); };
				}, []);

				const base = { padding: "20px 8px", color: "var(--dsw-alias-label-primary)" };
				const h3 = { margin: "0 0 8px", fontSize: 16, fontWeight: 600 };
				const p = { margin: "0 0 24px", color: "var(--dsw-alias-label-secondary)", fontSize: 14 };
				const labelStyle = { display: "block", marginBottom: 8, color: "var(--dsw-alias-label-secondary)", fontSize: 14 };
				const rowStyle = { display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" };
				/* 失败提示：warning 色 + 可换行，压在其他控件之下。 */
				const noticeStyle = { margin: "0 0 18px", color: "var(--dsw-alias-state-warn-primary)", fontSize: 13, lineHeight: "20px" };
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
								}, labelOf(opt));
							})
						)
					);
				}

				function onFile(event) {
					const file = event.target.files && event.target.files[0];
					if (file) setBackgroundImage(file);
					event.target.value = "";
				}

				return React.createElement("div", { style: base },
					React.createElement("h3", { style: h3 }, "外观美化"),
					/* 面板文案照实说：预设 token 会渗进设置面板本身（v4.1.0 删除
					   SETTINGS_RESTORE_CSS 之后就是如此），不再宣称「设置窗口保持官方外观」。 */
					React.createElement("p", { style: p }, "配色预设与背景图全部通过官方主题 token 生效（发送按钮含悬停、用户气泡、侧边栏一并跟随）；设置面板本身也会跟随预设配色。"),
					group("配色预设", PRESET_IDS, state.preset, function (id) { applyPreset(id); }),
					React.createElement("div", { style: { marginBottom: 18 } },
						React.createElement("span", { style: labelStyle }, "背景图片（侧边栏+主区都显示，带可读遮罩）"),
						React.createElement("input", { type: "file", accept: "image/*", ref: fileRef, style: { display: "none" }, onChange: onFile }),
						React.createElement("div", { style: rowStyle },
							React.createElement("button", { type: "button", style: pill(bg !== null), onClick: function () { if (fileRef.current) fileRef.current.click(); } }, bg !== null ? "已设置（点击更换）" : "选择图片"),
							React.createElement("button", { type: "button", style: ghost, onClick: function () { clearBackground(); } }, "清除")
						)
					),
					notices.map(function (notice) {
						return React.createElement("p", { key: notice.kind, style: noticeStyle }, notice.text);
					}),
					React.createElement("button", { type: "button", style: ghost, onClick: function () { resetAll(); } }, "重置全部")
				);
			}

			/* 先恢复缓存拿首屏（同步、最快），再挂宿主通道并用宿主值覆盖。 */
			restoreFromCache();

			/* ---------------------------------------------------------------
			 * effects
			 * --------------------------------------------------------------- */
			ctx.effect(function appearanceCleanup() {
				return function dispose() {
					listeners.clear();
					if (appearanceDisposer !== null) { appearanceDisposer(); appearanceDisposer = null; }
					if (bg !== null) {
						if (bg.cssDisposer) bg.cssDisposer();
						bg = null;
					}
				};
			});

			ctx.effect(function hostPersistence() {
				let cancelled = false;
				let disposeMount = null;

				const service = ctx.remote;
				if (service !== undefined && service !== null && typeof service.$mount === "function") {
					Promise.resolve().then(function () {
						return service.$mount(CONTRIBUTION);
					}).then(function (dispose) {
						if (cancelled) { try { dispose(); } catch (error) { /* 已经卸载 */ } return; }
						disposeMount = dispose;
						const bridge = bridgeOf();
						if (bridge === null) return; // host 半区没有这两个方法：静默回退
						hostBridge = bridge;
						return bridge.load().then(function (saved) {
							if (cancelled) return;
							if (userEdits > 0) {
								/* 宿主就绪前用户已经改过外观：以本地为准推给宿主 —— 否则宿主里的旧值
								   会在下次启动时把这次的选择盖掉。 */
								scheduleHostSave();
								return;
							}
							mergeHostState(saved);
							/* 宿主还没存过（首次升级到 4.2.0）：把缓存灌进宿主，无缝迁移。 */
							if (saved === null && (state.preset !== "default" || bg !== null)) scheduleHostSave();
						});
					}).catch(function () {
						/* 旧宿主 / 旧 host 半区：localStorage-only，不打扰用户。 */
						hostBridge = null;
					});
				}

				return function dispose() {
					cancelled = true;
					hostBridge = null;
					if (saveTimer !== null) { window.clearTimeout(saveTimer); saveTimer = null; }
					if (disposeMount !== null) { try { disposeMount(); } catch (error) { /* 已经卸载 */ } disposeMount = null; }
				};
			});

			ctx.effect(function registerUiSettings() {
				return slots.inject('settings.section', function () {
					/* label 保持字符串：0.2.1 允许 thunk（() => string），但 0.2.0-rc 系
					   列按字符串渲染，写 thunk 会在旧宿主上显示成函数源码。要做 i18n
					   得先特性检测，等接入 ctx.locale 时一起改。 */
					return slots.register(
						{ name: 'settings.section', id: 'ui-settings', order: 5, label: 'UI设置' },
						function () { return React.createElement(Panel) }
					);
				});
			});
		}

		/* `remote` 必须声明：host 持久化走它。theme/slots 由 apply 直接用。 */
		const inject = ["theme", "slots", "remote"];

		/* 测试面（test/state.test.mjs）：纯数据与纯函数的出口，不参与运行时行为。 */
		exports.__internals = {
			TOKEN_CATALOGUE: TOKEN_CATALOGUE,
			PRESETS: PRESETS,
			PRESET_IDS: PRESET_IDS,
			BUBBLE_TOKEN: BUBBLE_TOKEN,
			BG_TOKENS: BG_TOKENS,
			FADE_KILL_CSS: FADE_KILL_CSS,
			CONTRIBUTION: CONTRIBUTION,
			LOSSLESS_LIMIT: LOSSLESS_LIMIT,
			presetTokens: presetTokens,
			appearanceTokens: appearanceTokens,
			encodeBackground: encodeBackground
		};

		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});
