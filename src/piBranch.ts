import { log } from 'console'
import pkg from '../package.json'
import { list } from './utils/list'

export const piBranch = {
  list,
  '-v': function () {
    log(pkg.version)
  },
}
