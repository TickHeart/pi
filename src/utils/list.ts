import chalk from 'chalk'
import Table from 'cli-table3'
import { options } from '../agents'

const table = new Table({
  head: ['alias', 'description', 'example'],
})

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
  // const columns = columnify(data)
  const color = chalk.rgb(168, 69, 107)
  data.forEach((item) => {
    table.push([color(item.alias), item.description, item.example])
  })

  // eslint-disable-next-line no-console
  console.log(table.toString())
}
