/**
 * dsh-ui-beautify — 宿主侧状态文件（与 dsh-deepseek-billing 同构的一份实现）。
 *
 * 为什么需要它：0.2.1 桌面宿主用 `--port 0` 启动，监听端口每次重启由 OS 重新分配，
 * GUI 的页面 origin 随之改变，而 localStorage 按 origin 隔离 —— 纯浏览器持久化在
 * 桌面版上每次重启都会丢。官方主题同样把外观写进宿主侧，本文件是同一思路的最小
 * 实现：状态落在用户主目录，与端口/origin 无关。
 *
 * 文件位置：`<DSH_HOME>/storages/dsh-ui-beautify/state.json`
 *   `DSH_HOME` 取 `$DSH_HOME`，未设置时回落 `~/.dsh`。
 * 原子写：先写 `state.json.tmp` 再 `rename`，崩溃/断电不会留下半个 JSON。
 * 读失败（缺失 / 损坏 / 非对象 / 超过上限）一律返回 null，绝不抛给调用方：
 * 调用方是 Remote 方法，"没有状态"是正常场景，不该变成客户端的一次错误提示。
 *
 * 本文件不依赖 cordis，可直接被 node:test import（见 test/state.test.mjs）。
 *
 * @module dsh-ui-beautify/state-store
 */

import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'

/**
 * 单文件上限。背景图以 data URL 存进来（最长边 2560 的 PNG/JPEG 通常 1–6 MiB），
 * 8 MiB 足够放下，同时挡住"把整个文件系统写进状态"这种误用。
 */
export const MAX_STATE_BYTES = 8 * 1024 * 1024

/** 解析 DSH 主目录；`$DSH_HOME` 优先，空串视为未设置。 */
export function dshHome() {
  const fromEnv = process.env.DSH_HOME
  if (typeof fromEnv === 'string' && fromEnv.trim() !== '') return fromEnv.trim()
  return path.join(os.homedir(), '.dsh')
}

/** `<DSH_HOME>/storages` —— 宿主侧存储都在这一层下按插件 id 分目录。 */
export function storagesDir() {
  return path.join(dshHome(), 'storages')
}

/** 某个插件的状态目录。 */
export function stateDir(pluginId) {
  return path.join(storagesDir(), pluginId)
}

/** 某个插件的状态文件。 */
export function stateFile(pluginId) {
  return path.join(stateDir(pluginId), 'state.json')
}

/**
 * 读回状态。缺失、损坏、超限、不是对象都返回 null。
 * @param pluginId - 本插件的归属目录名（如 `dsh-ui-beautify`）。
 * @returns 解析后的状态对象，或 null。
 */
export async function readState(pluginId) {
  const file = stateFile(pluginId)
  try {
    const info = await fs.stat(file)
    /* 先用 stat 挡住超大文件，避免把 GB 级内容读进内存再判大小。 */
    if (!info.isFile() || info.size > MAX_STATE_BYTES) return null
    const text = await fs.readFile(file, 'utf8')
    const value = JSON.parse(text)
    return isPlainObject(value) ? value : null
  } catch (error) {
    return null
  }
}

/**
 * 写状态（原子）。非对象 / 不可序列化 / 不是无损 JSON / 超过上限时抛可读错误，
 * 由 Remote 层转成客户端可见的失败原因。
 * @param pluginId - 本插件的归属目录名。
 * @param value - 待写入的状态对象。
 * @returns 写入完成后 resolve。
 */
export async function writeState(pluginId, value) {
  if (!isPlainObject(value)) throw new Error('ui-beautify: 状态必须是一个 JSON 对象')
  const text = serialize(value)
  const dir = stateDir(pluginId)
  const file = path.join(dir, 'state.json')
  const tmp = `${file}.tmp`
  await fs.mkdir(dir, { recursive: true })
  try {
    await fs.writeFile(tmp, text, 'utf8')
    await fs.rename(tmp, file)
  } catch (error) {
    /* 写一半失败时清掉临时文件，免得下次 rename 撞上一个不完整的旧 tmp。 */
    await fs.rm(tmp, { force: true }).catch(() => {})
    throw error
  }
}

/** 把状态对象序列化成待写入的 JSON 文本；所有拒绝条件都给出可读原因。 */
function serialize(value) {
  let text
  try {
    text = JSON.stringify(value)
  } catch (error) {
    throw new Error(`ui-beautify: 状态无法序列化为 JSON（${describe(error)}）`)
  }
  if (typeof text !== 'string') throw new Error('ui-beautify: 状态无法序列化为 JSON')
  /* 无损校验：JSON 往返后结构必须一致。NaN / undefined / 函数 / Date 这类值往返后
     会变形或消失，写下去等于悄悄改数据，所以直接拒绝。 */
  let revived
  try {
    revived = JSON.parse(text)
  } catch (error) {
    throw new Error(`ui-beautify: 状态序列化结果不是合法 JSON（${describe(error)}）`)
  }
  if (!jsonEqual(value, revived)) {
    throw new Error('ui-beautify: 状态不是无损 JSON（含 undefined / NaN / 函数等无法往返的值）')
  }
  const bytes = Buffer.byteLength(text, 'utf8')
  if (bytes > MAX_STATE_BYTES) {
    throw new Error(`ui-beautify: 状态 ${bytes} 字节，超过 ${MAX_STATE_BYTES} 字节上限`)
  }
  return text
}

/** 只接受普通对象：数组/标量不是本插件状态载荷的形状。 */
function isPlainObject(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

/** 深比较两个 JSON 值（只处理 JSON 能表达的类型）。 */
function jsonEqual(left, right) {
  if (left === right) return true
  if (typeof left !== typeof right) return false
  if (left === null || right === null) return false
  if (Array.isArray(left) || Array.isArray(right)) {
    if (!Array.isArray(left) || !Array.isArray(right) || left.length !== right.length) return false
    return left.every((item, index) => jsonEqual(item, right[index]))
  }
  if (typeof left !== 'object') return false
  const leftKeys = Object.keys(left)
  const rightKeys = Object.keys(right)
  if (leftKeys.length !== rightKeys.length) return false
  return leftKeys.every((key) => Object.prototype.hasOwnProperty.call(right, key) && jsonEqual(left[key], right[key]))
}

function describe(error) {
  return error instanceof Error ? error.message : String(error)
}
