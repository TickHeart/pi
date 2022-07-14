import { execaCommandSync } from 'execa'
import pkg from '../../package.json'
export function getLastVersion(): string {
  return execaCommandSync('npm view @tickh/pi version').stdout.replace(/'/g, '') as string
}

export function inspectVersion() {
  const lastVersion = getLastVersion()
  const userVersion = pkg.version
  return [lastVersion === userVersion, userVersion, lastVersion]
}
