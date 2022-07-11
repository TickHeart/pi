import { execaCommand } from 'execa'
import chalk from 'chalk'
import inquirer from 'inquirer'
import type { AGENTS_KEYS } from './agents'
import { CMDS } from './agents'

// eslint-disable-next-line no-console
const log = console.log
let index = 0

type Parser = (cmd: 'pnpm' | 'yarn' | 'npm', args?: string[]) => string

export async function run(parser: Parser) {
  try {
    const cmd = CMDS[index++] as AGENTS_KEYS
    const args = process.argv.slice(2)
    const cmdStr = parser(cmd, args)

    log(chalk.yellow(`执行 ${cmdStr}`))

    await execaCommand(cmdStr, {
      stdio: 'inherit',
      encoding: 'utf-8',
    })
    index = 0
  }
  catch {
    if (index === CMDS.length)
      return log(chalk.red('请检查是否拥有pnpm、yarn、npm环境'))
    const prompt = [
      {
        type: 'input',
        name: 'isOk',
        message: `${CMDS[index - 1]}执行失败是否尝试使用${CMDS[index]}执行命令?（Y/N）`,
        default: 'N',
      },
    ]
    const { isOk } = await inquirer.prompt(prompt)
    if (isOk === 'Y')
      run(parser)
  }
}
