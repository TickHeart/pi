#!/usr/bin/env node

import { execaCommand } from 'execa'
import chalk from 'chalk'
import type { AGENTS_KEYS } from './agents'
import { selectorPackage } from './argv'
import { resolveConfig } from './config'
import { piBranch } from './branch/branch'
import { localDetection } from './version'
import { brain } from './brain'
import ss from 'string-similarity'
import { sc } from './branch/sc'

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
  const piBrain = await brain(config)
  const [_cmd, args] = selectorPackage(process.argv.slice(2))

  try {
    let cmd = ''
    if (!_cmd) {
      const anat = await piBrain.useBrain()
      if (anat) { cmd = anat }

      else {
        log('为你的新项目指定一个包管理器吧，执行命令时请携带 -Y 或 -N 或 -P 参数')
        return
      }
    }
    else {
      cmd = _cmd as string
      await piBrain.addMemory(cmd as AGENTS_KEYS)
    }

    const cmdStr = parser(cmd as any, args as string[])
    const prCmdStr =  await matchingPr(cmdStr)
    log(chalk.yellow(`执行 ${prCmdStr || cmdStr}`))

    await execaCommand(prCmdStr || cmdStr, {
      stdio: 'inherit',
      encoding: 'utf-8',
    })


    const color = chalk.rgb(138, 255, 128)
    log(color('谢谢您使用pi，祝您生活愉快，工作顺利。'))
  }
  catch {
  }
}

async function matchingPr(cmd: string) {
  if (/^(pnpm|yarn|npm)\srun/.test(cmd)) {
    const cmds = cmd.split(' ')
    const alias = cmds[cmds.length - 1].trim()
    const scripts = await sc()
    if (!scripts) {
      return false
    }
    let s = '',
      num = 0
    Object.keys(scripts).forEach((it: string) => {
      const n = ss.compareTwoStrings(it, alias)
      if (n > num) {
        num = n
        s = it
      }
    })
    if (!s) {
      return false
    } else {
      cmds[cmds.length - 1] = s
      return cmds.join(' ')
    }
  } 
  return false
}

