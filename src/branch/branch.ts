import { log } from 'console'
import pkg from '../../package.json'
import { list } from './list'
import setConfig, { getConfigFileBody, getPidFileBody, setPid } from './setConfig'
import uv from './uv'

type BranchFn = (args?: string[]) => Promise<void> | void

export const piBranch: Record<string, BranchFn> = {
  list,
  '-v': function () {
    log(pkg.version)
  },
  uv,
  '--set-config': setConfig,
  '--get-config': () => {
    log(`配置文件路径${getConfigFileBody().body}`)
  },
  '--set-pid': setPid,
  '--get-pid': () => {
    log(`配置文件路径${getPidFileBody().body}`)
  },
}
