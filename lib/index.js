// dsh-ui-beautify — Host half（持久化 + Remote 服务）。
//
// 为什么 Host 半区从 v4.2.0 起不再是空壳：0.2.1 桌面宿主用 `--port 0` 启动（端口
// 每次重启由 OS 分配），GUI 的 origin 因此每次都变，而 localStorage 按 origin 隔离
// —— 纯浏览器持久化在桌面版重启后全丢。状态改由宿主写进
// `<DSH_HOME>/storages/dsh-ui-beautify/state.json`（lib/state-store.js），浏览器
// 半区把它当权威源，localStorage 降级为启动缓存。
//
// Remote 走 dsh-file-explorer / dsh-deepseek-billing 同一条路：TypertRemoteService
// 通过 ctx.reflect.props 注册服务、super 构造器绑定 wire，`@Remote` 用「手动装饰器
// 上下文」打标记（Node 24 不接受 stage-3 装饰器语法）。
//
// 注意：Gateway 按方法**源码里的参数名**推导 wire —— 参数必须是简单标识符，不能
// 解构/默认值/剩余参数；浏览器侧的 descriptor 按位置对应（见 lib/client.js 的
// CONTRIBUTION，参数 wire 名必须与这里的参数名逐字相同）。
//
// 兼容性：旧客户端（v4.1.0）不认识这个服务，空转即可；旧宿主半区（空 apply）配新
// 客户端时，客户端拿不到 `remote.uiBeautify` 命名空间，静默回落到 localStorage。

import { Remote, TypertRemoteService } from '@deepseek-ai/dsh-typert-protocol'

import { readState, writeState } from './state-store.js'

/** 宿主侧存储目录名，与包名一致（`<DSH_HOME>/storages/<PLUGIN_ID>/state.json`）。 */
const PLUGIN_ID = 'dsh-ui-beautify'

class UiBeautifyService extends TypertRemoteService {
  constructor(ctx) {
    super(ctx, 'uiBeautify')
  }

  /**
   * 读宿主侧外观状态：`{ state: { preset, bg } | null }`。
   * 文件缺失/损坏都由 state-store 归一成 null —— 那不是错误，客户端用它表示
   * "宿主还没存过东西"，随后按缓存放行。
   */
  async loadClientState() {
    return { state: await readState(PLUGIN_ID) }
  }

  /**
   * 保存宿主侧外观状态：`{ preset, bg }`。
   * 非对象 / 不可 JSON 序列化 / 超过 8 MiB 由 state-store 抛可读错误，
   * Gateway 会把它变成 `{ ok: false, error }`，客户端据此在面板上提示。
   */
  async saveClientState(state) {
    await writeState(PLUGIN_ID, state)
    return { ok: true }
  }
}

// --- Manual Remote markers (decorator-syntax-free) ---
// 与 billing 相同的写法：伪造一个 method decorator 的 context，把 initializer 跑在
// `Object.create(proto)` 上 —— initializer 里只读 `Object.getPrototypeOf(this)`，
// 拿到的是 UiBeautifyService.prototype，marker 因此落在真实原型上。
const proto = UiBeautifyService.prototype
function markRemote(method) {
  const context = {
    private: false,
    static: false,
    name: method,
    addInitializer(callback) { this.cb = callback }
  }
  Remote(method)(undefined, context)
  context.cb.call(Object.create(proto))
}
markRemote('loadClientState')
markRemote('saveClientState')

export function apply(ctx) {
  /* 服务随插件 fiber 一起销毁，不需要额外 disposer。 */
  new UiBeautifyService(ctx)
}
