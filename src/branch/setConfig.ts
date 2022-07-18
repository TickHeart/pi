import { resolve } from 'path'
import { fileURLToPath } from 'url'
import fse from 'fs-extra'

const t = fileURLToPath(import.meta.url)
const root = resolve(t, '..', '..', '..')
const cacheDir = resolve(root, 'cache')
const configFilePath = resolve(cacheDir, 'config.txt')

export default async function setConfig(args?: string[]) {
  const [, configPath] = args!

  if (configPath)
    fse.writeFileSync(configFilePath, configPath, { encoding: 'utf-8' })
}

export function getConfigFileBody() {
  return {
    file: configFilePath,
    body: fse.readFileSync(configFilePath, { encoding: 'utf-8' }),
  }
}
