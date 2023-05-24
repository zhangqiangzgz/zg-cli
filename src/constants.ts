export const defaultConfig = {}

// 存放配置信息的临时目录
export const configPath = `${
  process.env[process.platform === "darwin" ? "HOME" : "USERPROFILE"]
}/.zgrc`;
  