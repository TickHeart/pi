import { log } from 'console'
import pkg from '../../package.json'
import { brainView } from '../brain/view'
import { list } from './list'
import { sc } from './sc'
import setConfig, { getConfigFileBody } from './setConfig'
import { u } from './u'
import uv from './uv'

type BranchFn = (...args: any) => Promise<any> | any

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
  sc,
  '-u': u,
}
