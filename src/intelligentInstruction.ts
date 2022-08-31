import ss from 'x z'
import { sc } from './branch/sc'

export async function intelligentInstruction(cmd: string) {
  if (/^(pnpm|yarn|npm)\srun/.test(cmd))
    return await matchingPr(cmd)

  return false
}

async function matchingPr(cmd: string) {
  const cmds = cmd.split(' ')
  const alias = cmds[2].trim()
  const res = await sc(false)
  if (!res)
    return false

  const keys = Object.keys(res.scripts)

  if (keys.length === 0)
    return false

  const match = ss.findBestMatch(alias, keys)
  if (alias !== match.bestMatch.target)
    res.logTable()
  return cmd.replace(alias, match.bestMatch.target)
}
