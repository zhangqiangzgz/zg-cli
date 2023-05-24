import path from 'path'
import { existsSync, rmSync } from 'fs'
import select from '@inquirer/select'
import { loading } from '../utils/loading.js'
import { fetchOrganizationRepos } from '../utils/project.js'

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
      }
    }
  }

  // 拉取项目仓库中的项目
  const projects = await fetchOrganizationRepos()
  console.log(projects)
}