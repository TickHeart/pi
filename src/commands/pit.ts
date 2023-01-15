import { AGENTS } from '../agents'
import { run } from '../runner'

run((cmd, args) => {
  const argStr = args!.join(' ')
  const ms = AGENTS[cmd]
  return ms.pit.replace('{0}', argStr)
})
