import { log } from 'console'
import pkg from '../../package.json'
import { list } from './list'
import uv from './uv'

export const piBranch = {
  list,
  '-v': function () {
    log(pkg.version)
  },
  uv,
}
