import { log } from 'console'
import chalk from 'chalk'
import Table from 'cli-table3'
import { resolvePkg } from '../brain'

const table = new Table({
  head: ['alias', 'shell'],
})

export async function sc(isLog = true) {
  const pkg = await resolvePkg()

  if (!pkg)
    return false

  const { scripts } = pkg

  Object.keys(scripts).forEach((key: string) => {
    table.push([chalk.blue(key), chalk.green(scripts[key])])
  })
  if(isLog)
    log(table.toString())
  return scripts
}
