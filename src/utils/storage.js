/**
 * 统一的localStorage操作工具
 * 提供错误处理和类型转换
 */

// 存储键名常量
export const STORAGE_KEYS = {
  LISTENLIST: 'listenlist',
  PLAY_INDEX: 'playIndex',
  PLAY_MODE: 'playMode',
  VOLUME: 'volume'
}

/**
 * 安全地获取localStorage中的值
 * @param {string} key - 存储键名
 * @param {*} defaultValue - 默认值
 * @returns {*} 存储的值或默认值
 */
export const getStorageItem = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key)
    if (item === null) {
      return defaultValue
    }
    
    // 尝试解析JSON，如果失败则返回原始字符串
    try {
      return JSON.parse(item)
    } catch {
      return item
    }
  } catch (error) {
    console.warn(`Failed to get item from localStorage: ${key}`, error)
    return defaultValue
  }
}

/**
 * 安全地设置localStorage中的值
 * @param {string} key - 存储键名
 * @param {*} value - 要存储的值
 * @returns {boolean} 是否成功存储
 */
export const setStorageItem = (key, value) => {
  try {
    const serializedValue = typeof value === 'string' ? value : JSON.stringify(value)
    localStorage.setItem(key, serializedValue)
    return true
  } catch (error) {
    console.warn(`Failed to set item in localStorage: ${key}`, error)
    return false
  }
}

/**
 * 安全地删除localStorage中的值
 * @param {string} key - 存储键名
 * @returns {boolean} 是否成功删除
 */
export const removeStorageItem = (key) => {
  try {
    localStorage.removeItem(key)
    return true
  } catch (error) {
    console.warn(`Failed to remove item from localStorage: ${key}`, error)
    return false
  }
}

/**
 * 清空所有localStorage
 * @returns {boolean} 是否成功清空
 */
export const clearStorage = () => {
  try {
    localStorage.clear()
    return true
  } catch (error) {
    console.warn('Failed to clear localStorage', error)
    return false
  }
}

// 专用的存储方法，提供更好的类型安全和默认值

/**
 * 获取聆听列表
 * @returns {Array} 聆听列表数组
 */
export const getListenList = () => {
  return getStorageItem(STORAGE_KEYS.LISTENLIST, [])
}

/**
 * 设置聆听列表
 * @param {Array} list - 聆听列表
 * @returns {boolean} 是否成功
 */
export const setListenList = (list) => {
  return setStorageItem(STORAGE_KEYS.LISTENLIST, list)
}

/**
 * 获取播放索引
 * @returns {number} 播放索引
 */
export const getPlayIndex = () => {
  const index = getStorageItem(STORAGE_KEYS.PLAY_INDEX, 0)
  return typeof index === 'number' ? index : parseInt(index) || 0
}

/**
 * 设置播放索引
 * @param {number} index - 播放索引
 * @returns {boolean} 是否成功
 */
export const setPlayIndex = (index) => {
  return setStorageItem(STORAGE_KEYS.PLAY_INDEX, index.toString())
}

/**
 * 获取播放模式
 * @returns {string} 播放模式
 */
export const getPlayMode = () => {
  return getStorageItem(STORAGE_KEYS.PLAY_MODE, 'loop')
}

/**
 * 设置播放模式
 * @param {string} mode - 播放模式
 * @returns {boolean} 是否成功
 */
export const setPlayMode = (mode) => {
  return setStorageItem(STORAGE_KEYS.PLAY_MODE, mode)
}

/**
 * 获取音量
 * @returns {number} 音量值
 */
export const getVolume = () => {
  const volume = getStorageItem(STORAGE_KEYS.VOLUME, 0.6)
  return typeof volume === 'number' ? volume : parseFloat(volume) || 0.6
}

/**
 * 设置音量
 * @param {number} volume - 音量值
 * @returns {boolean} 是否成功
 */
export const setVolume = (volume) => {
  return setStorageItem(STORAGE_KEYS.VOLUME, volume.toString())
}
