import path, { resolve } from 'path'
import { readFile } from 'fs/promises'
import { fileURLToPath } from 'url'
import ini from 'ini'
import fse from 'fs-extra'

export const DEFAULT_OPTIONS = {
  skipVersionTesting: false,
  piBranchPath: process.platform === 'win32' ? null : path.resolve(`${process.env.HOME}/.pi_brain.yaml`),
  loading: false,
}
export type Options = typeof DEFAULT_OPTIONS

export async function resolveConfig() {
  const pircPath = resolveConfigPath()
  if (pircPath) {
    const options = ini.parse(await readFile(pircPath, { encoding: 'utf-8' }))
    return { ...DEFAULT_OPTIONS, ...options }
  }
  else {
    return DEFAULT_OPTIONS
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

