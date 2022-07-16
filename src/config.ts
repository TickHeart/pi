import { resolve } from 'path'
import { readFile } from 'fs/promises'
import { log } from 'console'
import ini from 'ini'
import fse from 'fs-extra'

export async function resolveConfig() {
  const pircPath = resolveConfigPath()
  log({ pircPath })
  if (pircPath) {
    const { skipVersionTesting = false, schedulingSequence = 'pnpm|yarn|npm' } = ini.parse(await readFile(pircPath, { encoding: 'utf-8' }))
    return { skipVersionTesting, schedulingSequence }
  }
  else {
    return { skipVersionTesting: false, schedulingSequence: 'pnpm|yarn|npm' }
  }
}

export function resolveConfigPath() {
  const cwd = process.cwd()
  const cwdPath = resolve(cwd, '.pirc')

  if (fse.pathExistsSync(cwdPath))
    return cwdPath

  const globalPath = `${process.env.HOME}/.pirc`
  if (fse.pathExistsSync(globalPath))
    return globalPath

  return null
}
