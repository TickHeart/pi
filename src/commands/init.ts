import { AGENTS } from '../agents'
import { run } from '../runner'

run((cmd) => {
  const ms = AGENTS[cmd]
  return ms.init
})
