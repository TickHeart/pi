import { AGENTS } from '../agents'
import { run } from '../runner'

// 放个list进来

// 思路是我们可以让参数对应一个方法去执行

// 我们可以注入进去吗

run((cmd, args) => {
  const argStr = args!.join(' ')
  const ms = AGENTS[cmd]
  return ms.pi.replace('{0}', argStr)
})
