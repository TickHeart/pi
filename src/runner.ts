#!/usr/bin/env node
import { fileURLToPath } from 'url'
import { resolve } from 'path'
import { readFile, writeFile } from 'fs/promises'
import { execaCommand } from 'execa'
import chalk from 'chalk'
import inquirer from 'inquirer'
import dayjs from 'dayjs'
import type { AGENTS_KEYS } from './agents'
import { CMDS, setCMDS } from './agents'
import { inspectVersion } from './utils/version'
import { selectorPackage } from './argv'
import { resolveConfig } from './config'
import { piBranch } from './piBranch'

// eslint-disable-next-line no-console
const log = console.log
let index = 0

type Parser = (cmd: 'pnpm' | 'yarn' | 'npm', args?: string[]) => string

// parse list command
const parseLineFlag = () => {
  const args = process.argv.slice(2)
  if (args[0] in piBranch) {
    piBranch[args[0] as keyof typeof piBranch]()
    return true
  }
  return false
}

export async function run(parser: Parser) {
  const config = await resolveConfig()
  await localDetection(config)
  setCMDS(config.schedulingSequence.split('|'))
  if (parseLineFlag())
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

const t = fileURLToPath(import.meta.url)
const root = resolve(t, '..', '..', '..')
const cacheDir = resolve(root, 'cache')
const timeFilePath = resolve(cacheDir, 'time.txt')

export async function inspectionTime() {
  const time = await readFile(timeFilePath, { encoding: 'utf-8' })
  const aftunix = dayjs(time).add(1, 'hour').unix()
  const now = dayjs().format()
  const nowunix = dayjs(now).unix()
  if (nowunix > aftunix) {
    await writeFile(timeFilePath, now.toString(), { encoding: 'utf-8' })
    return true
  }
  else {
    return false
  }
}

async function logUSerVersion() {
  const color = chalk.rgb(125, 255, 234)
  if (index !== 0)
    return
  const [isNew, userVersion, lastVersion] = await inspectVersion()
  log(color(`您的pi版本是${userVersion}`))
  if (isNew)
    return
  log(color(`更新啦更新啦，请升级pi至${lastVersion}`))
}

async function localDetection(config: {
  skipVersionTesting: any
}) {
  if (config.skipVersionTesting)
    return
  const res = await inspectionTime()
  if (res)
    await logUSerVersion()
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
