import { resolve } from 'path'
import { readFile } from 'fs/promises'
import { fileURLToPath } from 'url'
import ini from 'ini'
import fse from 'fs-extra'

export async function resolveConfig() {
  const pircPath = resolveConfigPath()
  if (pircPath) {
    const { skipVersionTesting = false, schedulingSequence = 'pnpm|yarn|npm' } = ini.parse(await readFile(pircPath, { encoding: 'utf-8' }))
    return { skipVersionTesting, schedulingSequence }
  }
  else {
    return { skipVersionTesting: false, schedulingSequence: 'pnpm|yarn|npm' }
  }
}

const cwd = process.cwd()
const t = fileURLToPath(import.meta.url)
const root = resolve(t, '..', '..', '..')
const cacheDir = resolve(root, 'cache')
const configFilePath = resolve(cacheDir, 'config.txt')

function havePath(path: string) {
  const isOk = fse.pathExistsSync(path)
  return { isOk, path }
}

const paths = [havePath(resolve(cwd, '.pirc')), havePath(`${process.env.HOME}/.pirc`), havePath(fse.readFileSync(configFilePath, 'utf8'))]

export function resolveConfigPath() {
  for (const s of paths) {
    if (s.isOk)
      return s.path
  }

  return null
}
