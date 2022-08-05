#!/usr/bin/env node

import { execaCommand } from 'execa'
import chalk from 'chalk'
import type { AGENTS_KEYS } from './agents'
import { selectorPackage } from './argv'
import { resolveConfig } from './config'
import { piBranch } from './branch/branch'
import { localDetection } from './version'
import { brain } from './brain'

// eslint-disable-next-line no-console
const log = console.log

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
  if (await parseLineFlag())
    return
  const piBrain = await brain()
  const [_cmd, args] = selectorPackage(process.argv.slice(2))
  try {
    const cmd = _cmd || await piBrain.useBrain()

    const cmdStr = parser(cmd as any, args as string[])
    log(chalk.yellow(`执行 ${cmdStr}`))

    await execaCommand(cmdStr, {
      stdio: 'inherit',
      encoding: 'utf-8',
    })

    await piBrain.addMemory(cmd as AGENTS_KEYS)

    const color = chalk.rgb(138, 255, 128)
    log(color('谢谢您使用pi，祝您生活愉快，工作顺利。'))
  }
  catch {
  }
}

