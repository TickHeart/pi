import path from 'path'
import fs from 'fs/promises'
import { log } from 'console'
import fe from 'fs-extra'
import yaml from 'yaml'
import { findUp } from 'find-up'
import chalk from 'chalk'
import Table from 'cli-table3'

function logTable(p: number, y: number, n: number) {
  const table = new Table({
    head: ['pnpm', 'yarn', 'npm'],
  })
  table.push([p, y, n])
  // eslint-disable-next-line no-console
  console.log(table.toString())
}

interface ConfigItem {
  npm: number
  yarn: number
  pnpm: number
}

export async function brain() {
  const config = await resolvePiBrain() as Record<string, ConfigItem> || {}
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
      val[anat]++
      logTable(val.pnpm, val.yarn, val.npm)
    }
    else {
      const item = {
        pnpm: 0,
        yarn: 0,
        npm: 0,
      }
      item[anat] = item[anat] + 1
      config[name] = item
      logTable(item.pnpm, item.yarn, item.npm)
    }

    const fileBody = yaml.stringify(config)

    await fs.writeFile(await checkPiBrainFile(), fileBody, { encoding: 'utf-8' })
  }

  return {
    useBrain,
    addMemory,
  }
}

function maximumUse(val: ConfigItem) {
  let anat = ''
  let num = 0
  Object.keys(val).forEach((key) => {
    if (val[key as keyof typeof val] >= num) {
      anat = key
      num = val[key as keyof typeof val]
    }
  })
  return anat
}

async function resolvePkg() {
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

async function resolvePiBrain() {
  const resolvePath = await checkPiBrainFile()
  const fileBody = await fs.readFile(resolvePath, 'utf-8')
  return yaml.parse(fileBody)
}

async function checkPiBrainFile() {
  const brainPath = process.platform === 'win32' ? path.resolve('C:\Users\Administrator') : path.resolve(`${process.env.HOME}/.pi_brain.yaml`)
  const isHave = await fe.pathExists(brainPath)
  if (!isHave)
    await fe.writeFile(brainPath, '', { encoding: 'utf-8' })
  return brainPath
}
