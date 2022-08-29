import fs from 'fs/promises'
import { log } from 'console'
import fe from 'fs-extra'
import yaml from 'yaml'
import { findUp } from 'find-up'
import chalk from 'chalk'
import Table from 'cli-table3'
import type { Options } from '../config'
import type { AGENTS_KEYS } from '../agents'

function logTable(p: boolean, y: boolean, n: boolean) {
  const table = new Table({
    head: ['pnpm', 'yarn', 'npm'],
  })
  table.push([p, y, n])
  // eslint-disable-next-line no-console
  console.log(table.toString())
}

interface ConfigItem {
  npm: boolean
  yarn: boolean
  pnpm: boolean
}

export async function brain(_config: Options) {
  const config = await resolvePiBrain(_config) as Record<string, ConfigItem> | false || {}
  const pkg = await resolvePkg()

  async function useBrain() {
    const { name } = pkg
    if (name in config) {
      const val = config[name]
      const anat = maximumUse(val)
      return anat
    }
    else {
      return null
    }
  }

  async function addMemory(anat: 'pnpm' | 'yarn' | 'npm') {
    if (!pkg)
      return
    const { name } = pkg
    if (name in config) {
      const val = config[name]
      for (const key in val) {
        if (key === anat)
          val[key] = true

        else
          val[key as AGENTS_KEYS] = false
      }
      logTable(val.pnpm, val.yarn, val.npm)
    }
    else {
      const item = {
        pnpm: false,
        yarn: false,
        npm: false,
      }
      item[anat] = true
      config[name] = item
      logTable(item.pnpm, item.yarn, item.npm)
    }

    const fileBody = yaml.stringify(config)

    await fs.writeFile(await checkPiBrainFile(_config) as string, fileBody, { encoding: 'utf-8' })
  }

  return {
    useBrain,
    addMemory,
  }
}

function maximumUse(val: ConfigItem) {
  let anat = ''

  Object.keys(val).forEach((key) => {
    if (val[key as keyof typeof val])
      anat = key
  })
  return anat
}

export async function resolvePkg() {
  const pkgPath = await findPkgPath()

  if (!pkgPath) {
    log(chalk.red('没有找到当前环境'))
    return false
  }
  const pkgBody = await fs.readFile(pkgPath, 'utf-8')
  return JSON.parse(pkgBody)
}

async function findPkgPath() {
  const cwd = process.cwd()
  return await findUp('package.json', { cwd })
}

export async function resolvePiBrain(_config: Options): Promise<Record<string, { pnpm: boolean; yarn: boolean; npm: boolean }> | false> {
  const resolvePath = await checkPiBrainFile(_config)
  if (!resolvePath)
    return false
  const fileBody = await fs.readFile(resolvePath, 'utf-8')
  return yaml.parse(fileBody)
}

async function checkPiBrainFile(_config: Options) {
  const { piBranchPath: brainPath } = _config
  if (!brainPath) {
    log(chalk.red('windows 用户请设定 piBranchPath 的路径'))
    return false
  }

  const isHave = await fe.pathExists(brainPath)
  if (!isHave)
    await fe.writeFile(brainPath, '', { encoding: 'utf-8' })
  return brainPath
}
