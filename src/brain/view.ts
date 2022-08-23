import Table from 'cli-table3'
import { resolveConfig } from '../config'
import { resolvePiBrain } from '.'

const table = new Table({
  head: ['project', 'pnpm', 'yarn', 'npm'],
})

export async function brainView() {
  const brain = await resolvePiBrain(await resolveConfig())
  if (!brain)
    return
  Object.keys(brain).forEach((key) => {
    const { pnpm, yarn, npm } = brain[key]
    table.push([key, getEmoji(pnpm), getEmoji(yarn), getEmoji(npm)])
  })
  // eslint-disable-next-line no-console
  console.log(table.toString())
}

function getEmoji(value: boolean) {
  return value ? '✅' : '❌'
}
