import axios from 'axios'
import { exec } from 'child_process'
import { promisify } from 'util'
import { rm } from 'fs/promises'
import { getConfig } from '../commands/config.js'

const execPromisify = promisify(exec)

const { organization = 'zg-cli' } = getConfig()

export async function fetchOrganizationRepos() {
  const { data = [] } = await axios.get(`https://api.github.com/orgs/${organization}/repos`)
  return data.map((project: any) => ({
    name: project.name,
    value: project.name
  })) || []
}

export async function fetchOrganizationRepoTags(repo: string) {
  const { data = [] } = await axios.get(`https://api.github.com/repos/${organization}/${repo}/tags`)
  return data.map((tag: any) => ({
    name: tag.name,
    value: tag.name
  })) || []
}

// 这里也可以使用download-git-repo下载
// 克隆的项目含有.git目录，保存了历史版本信息，可以修改源码后重新提交git
export async function cloneProject (projectName: string, tag: string, dir: string) {
  // 从github克隆某个标签tag到固定的文件夹dir
  const cmd = `git clone --branch ${tag} https://github.com/${organization}/${projectName}.git ${dir}` 
  await execPromisify(cmd)
  // 删除.git文件
  rm(`${dir}/.git`, {
    recursive: true
  })
}
