import { log } from 'console'
import { execaCommand } from 'execa'
import pacote from 'pacote'
import type { MaybeNull } from 'ztshared/index'
import { resolvePkg } from '../brain'
export async function u(args?: string[]) {
  const [, packageName, keyWord] = args!
  if (keyWord === 'n' || keyWord === 'next') {
    const res = await pacote.packument(packageName)
    const historicalVersion = Object.keys(res.versions)

    const currentVersion = await findDependenciesVersion(packageName)

    const index = historicalVersion.findIndex(it => it === currentVersion)

    if (index === historicalVersion.length - 1)
      return log('当前您的版本是最新的')
    if (index === -1)
      return log('发生错误')
    await execaCommand(`pio ${packageName}@${historicalVersion[index + 1]}`, {
      stdio: 'inherit',
      encoding: 'utf-8',
    })
  }
  else if (!keyWord) {
    log('输入的指令有错误')
  }
  else {
    await execaCommand(`pio ${packageName}@${keyWord.replace('[v|V]', '')}`, {
      stdio: 'inherit',
      encoding: 'utf-8',
    })
  }
}

async function findDependenciesVersion(packageName: string) {
  let version: MaybeNull<string> = null
  const pkg = await resolvePkg()
  const dependenciesKeys = Object.keys(pkg).filter((key: string) => {
    return /[dD]ependencies/.test(key)
  })

  for (let i = 0; i <= dependenciesKeys.length - 1; i++) {
    const dependencies = pkg[dependenciesKeys[i]]
    if (packageName in dependencies) {
      version = dependencies[packageName]
      break
    }
  }
  if (!version)
    return log('您没有下载此项依赖')
  version = version.replace(/(\^|~)/, '')

  return version
}
