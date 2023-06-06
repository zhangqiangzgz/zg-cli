import path from 'path'
import os from 'os'

export const defaultConfig = {}

// 存放配置信息的临时目录
export const configPath = path.join(os.homedir(), '.zgrc')
  