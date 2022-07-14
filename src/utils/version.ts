import latestVersion from 'latest-version'
import pkg from '../../package.json'
export async function getLastVersion() {
  return await latestVersion(pkg.name)
}

export async function inspectVersion() {
  const lastVersion = await getLastVersion()
  const userVersion = pkg.version
  return [lastVersion === userVersion, userVersion, lastVersion]
}
