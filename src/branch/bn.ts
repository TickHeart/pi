import type { AGENTS_KEYS } from '../agents'
import { detectionInstruction } from '../argv'
import { brain } from '../brain'

export async function bn(argvs: string[], config: {
  skipVersionTesting: boolean
  piBranchPath: string | null
}) {
  const piBrain = await brain(config)
  const cmd = detectionInstruction(argvs)
  piBrain.addMemory(cmd as AGENTS_KEYS)

  return true
}
