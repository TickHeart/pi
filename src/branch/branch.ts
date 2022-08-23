import { log } from 'console'
import pkg from '../../package.json'
import { brainView } from '../brain/view'
import { list } from './list'
import setConfig, { getConfigFileBody } from './setConfig'
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
  'brain': brainView,
}
