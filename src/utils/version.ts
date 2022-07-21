import pacote from 'pacote'
import pkg from '../../package.json'

export async function getLastVersion() {
  return (await pacote.manifest(pkg.name)).version
}

export async function inspectVersion() {
  const lastVersion = await getLastVersion()
  const userVersion = pkg.version
  return [lastVersion === userVersion, userVersion, lastVersion]
}
