#!/usr/bin/env node

import { execaCommand } from 'execa'
import chalk from 'chalk'
import inquirer from 'inquirer'

import type { AGENTS_KEYS } from './agents'
import { CMDS, setCMDS } from './agents'
import { selectorPackage } from './argv'
import { resolveConfig } from './config'
import { piBranch } from './branch/branch'
import { localDetection } from './version'

// eslint-disable-next-line no-console
const log = console.log
let index = 0

export function getIndex() {
  return index
}

type Parser = (cmd: 'pnpm' | 'yarn' | 'npm', args?: string[]) => string

// parse list command
const parseLineFlag = async () => {
  const args = process.argv.slice(2)
  if (args[0] in piBranch) {
    await piBranch[args[0] as keyof typeof piBranch](args)
    return true
  }
  return false
}

export async function run(parser: Parser) {
  const config = await resolveConfig()
  await localDetection(config)
  setCMDS(config.schedulingSequence.split('|'))
  if (await parseLineFlag())
    return

  const [_cmd, args] = selectorPackage(process.argv.slice(2))

  try {
    const cmd = _cmd || CMDS[index++] as AGENTS_KEYS
    const cmdStr = parser(cmd as any, args as string[])

    log(chalk.yellow(`执行 ${cmdStr}`))

    await execaCommand(cmdStr, {
      stdio: 'inherit',
      encoding: 'utf-8',
    })
    index = 0

    const color = chalk.rgb(138, 255, 128)
    log(color('谢谢您使用pi，祝您生活愉快，工作顺利。'))
  }
  catch {
    if (index === CMDS.length) {
      log(chalk.red('请检查是否拥有pnpm、yarn、npm环境'))
      index = 0
      return
    }
    if (_cmd)
      return
    await askForRestart(parser)
  }
}

async function askForRestart(parser: Parser) {
  const prompt = [
    {
      type: 'confirm',
      message: `${CMDS[index - 1]}执行失败是否尝试使用${CMDS[index]}执行命令?`,
      name: 'isOk',
      prefix: '⚠️',
      default: false,
      filter(val: any) {
        return val.toLowerCase()
      },
    },
  ]
  const { isOk } = await inquirer.prompt(prompt)
  if (isOk)
    await run(parser)
}
