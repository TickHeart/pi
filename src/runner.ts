import { execaCommand } from 'execa'
import type { AGENTS_KEYS } from './agents'
import { CMDS } from './agents'

let index = 0

type Parser = (cmd: 'pnpm' | 'yarn' | 'npm', args: string[]) => string

export async function run(parser: Parser) {
  try {
    const cmd = CMDS[index++] as AGENTS_KEYS
    const args = process.argv.slice(2)
    const cmdStr = parser(cmd, args)
    // eslint-disable-next-line no-console
    console.log(cmdStr)

    await execaCommand(cmdStr, {
      stdio: 'inherit', encoding: 'utf-8',
    })
    index = 0
  }
  catch {
    if (index === CMDS.length)
      return
    run(parser)
  }
}
