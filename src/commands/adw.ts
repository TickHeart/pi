import { AGENTS } from '../agents'
import { run } from '../runner'

run((cmd, args) => {
  const argStr = args!.join(' ')
  const ms = AGENTS[cmd]
  return ms.adw.replace('{0}', argStr)
})
