#! /usr/bin/env node
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { program } from 'commander';
import { createRequire } from 'module';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);
import chalk from 'chalk';
const pkg = require(path.join(__dirname, '../package.json'));
// 注册版本号
program.version(`zg-cli@${pkg.version}`)
    .name('zg-cli')
    .usage("<command> [option]");
// 通过脚手架创建一个项目，既拉去github中的模版
program.command('create <project-name>')
    .description('create your project')
    .option('-f, --force', 'force coverage')
    .action((name, options) => __awaiter(void 0, void 0, void 0, function* () {
    (yield import('./commands/create.js')).default(name, options);
}));
// 配置拉取的信息，配置系统文件
program.command('config [value]')
    .description('inspect config')
    .option('-s, --set <property> <value>', 'set value')
    .option('-g, --get <property>', 'get value')
    .option('-d --delete <property>', 'delete value')
    .action((value, options) => __awaiter(void 0, void 0, void 0, function* () {
    (yield import('./commands/config.js')).default(value, options);
}));
// 自定义帮助信息
program.addHelpText('after', `
\nRun ${chalk.blueBright('zg-cli <command> --help')} for detailed usage of given command
`);
// 解析用户的参数 自用提供--help
// 用户传递的参数 process.argv
program.parse(process.argv);
// console.log(import.meta.url)
