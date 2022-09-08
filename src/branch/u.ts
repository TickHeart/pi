import { log } from 'console'
import { execaCommand } from 'execa'
import pacote from 'pacote'
import { resolvePkg } from '../brain'
export async function u(args?: string[]) {
  const [, packageName, keyWord] = args!
  if (keyWord === 'n' || keyWord === 'next') {
    const res = await pacote.packument(packageName)
    const versions = Object.keys(res.versions)

    const pkg = await resolvePkg()
    const { dependencies, devDependencies } = pkg
    let version = ''
    if (packageName in devDependencies)
      version = devDependencies[packageName]

    else if (packageName in dependencies)
      version = dependencies[packageName]
    if (!version)
      return log('您没有下载此项依赖')

    version = version.replace(/(\^|~)/, '')

    const index = versions.findIndex(it => it === version)

    if (index === versions.length - 1)
      return log('当前您的版本是最新的')
    if (index === -1)
      return log('发生错误')
    await execaCommand(`pio ${packageName}@${versions[index + 1]}`, {
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
