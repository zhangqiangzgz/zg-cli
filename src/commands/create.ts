import path from 'path'
import { existsSync, rmSync } from 'fs'
import select from '@inquirer/select'
import { loading, loadingFn } from '../utils/loading.js'
import { fetchOrganizationRepos, fetchOrganizationRepoTags, cloneProject } from '../utils/project.js'

export default async function (name: string, options: { [key: string]: unknown }) {
  const { force } = options
  const targetDir = path.join(process.cwd(), name)
  // 当前目录存在
  if (existsSync(targetDir)) {
    if (force) {
      // 递归删除文件
      rmSync(targetDir, {
        recursive: true
      })
    } else {
      const answer = await select({
        message: 'whether to overwrite existing directories?',
        choices: [
          {
            name: 'overwrite',
            value: 'overwrite',
            description: 'overwrite existing directories'
          },
          {
            name: 'cancel',
            value: 'cancel',
            description: 'cancel'
          }
        ]
      })

      if (answer === 'overwrite') {
        console.log(targetDir)
        await loading('removing', () => {
          rmSync(targetDir, {
            recursive: true
          })
        })
      } else if (answer === 'cancel') {
        console.log('user cancel')
        return
      }
    }
  }

  // 拉取项目仓库中的项目
  const projects = await loadingFn('fetching projects', fetchOrganizationRepos)()
  let project: string = ''
  let tag: string = ''
  if (projects && projects.length > 0) {
    project = await select({
      message: 'please select a project',
      choices: projects
    })

    // 拉取项目版本信息
    const tags = await loadingFn('fetching project tags', fetchOrganizationRepoTags)(project)
    if (tags && tags.length > 0) {
      tag = await select({
        message: 'please select a version',
        choices: tags
      })
    }

    // 克隆项目到用户输入的文件夹中
    await loadingFn('clone project', cloneProject)(project, tag, name)
  }
}
