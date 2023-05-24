var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import path from 'path';
import { existsSync, rmSync } from 'fs';
import select from '@inquirer/select';
import { loading } from '../utils/loading.js';
import { fetchOrganizationRepos } from '../utils/project.js';
export default function (name, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const { force } = options;
        const targetDir = path.join(process.cwd(), name);
        // 当前目录存在
        if (existsSync(targetDir)) {
            if (force) {
                // 递归删除文件
                rmSync(targetDir, {
                    recursive: true
                });
            }
            else {
                const answer = yield select({
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
                });
                if (answer === 'overwrite') {
                    console.log(targetDir);
                    yield loading('removing', () => {
                        rmSync(targetDir, {
                            recursive: true
                        });
                    });
                }
                else if (answer === 'cancel') {
                    console.log('user cancel');
                }
            }
        }
        // 拉取项目仓库中的项目
        const projects = yield fetchOrganizationRepos();
        console.log(projects);
    });
}
