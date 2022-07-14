import chalk from 'chalk'
import columnify from 'columnify'
import { options } from '../agents'

interface ListEach {
  alias: string
  example: string
  description: string
}

function parseToData(opts: typeof options) {
  const result: ListEach[] = []
  Object.keys(options).forEach((key) => {
    const option = opts[key]
    result.push({
      alias: key,
      description: option[1],
      example: option[0][0],
    })
  })
  return result
}

export function list() {
  const data: ListEach[] = parseToData(options)
  const columns = columnify(data)
  const color = chalk.rgb(168, 69, 107)
  // eslint-disable-next-line no-console
  console.log(color(columns))
}
