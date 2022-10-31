import { resolve } from 'path'
import { readFile, writeFile } from 'fs/promises'
import { fileURLToPath } from 'url'
import { log } from 'console'
import dayjs from 'dayjs'
import chalk from 'chalk'
import { inspectVersion } from './utils/version'
import { createIntroAnim } from './loading'

const t = fileURLToPath(import.meta.url)
const root = resolve(t, '..', '..', '..')
const cacheDir = resolve(root, 'cache')
const timeFilePath = resolve(cacheDir, 'time.txt')

export async function localDetection(config: {
  skipVersionTesting: any
  loading: boolean
}) {
  if (config.skipVersionTesting)
    return
  const res = await inspectionTime()
  if (res)
    await logUSerVersion(config)
}

export async function inspectionTime() {
  const time = await readFile(timeFilePath, { encoding: 'utf-8' })
  const aftunix = dayjs(time).add(5, 'hour').unix()
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

async function logUSerVersion(config: {
  loading: boolean
}) {
  const color = chalk.rgb(125, 255, 234)
  const { open: versionOpen, close: versionClose } = createIntroAnim(config, 'pi check version ...')
  versionOpen()
  const [isNew, lastVersion] = await inspectVersion()
  if (isNew)
    return
  if (/beta/.test(lastVersion as string))
    return
  versionClose()
  log(color(`更新啦更新啦，请升级pi至${lastVersion}`))
  log(color('可以执行 pi uv 来更新pi'))
}
