import { execaCommand } from 'execa'
import inquirer from 'inquirer'
import { isArray } from 'ztshared'

const questions = [
  {
    type: 'list',
    name: 'type',
    message: '选择使用的下载工具',
    choices: ['pnpm', 'npm'],
    default: 'pnpm',
  },
]

export default async function uv() {
  const { type } = await inquirer.prompt(questions)
  if (type === 'pnpm') {
    await useListExecaCommand('pnpm add -g @tickh/pi')
  }
  else if (type === 'npm') {
    await useListExecaCommand([
      'npm remove @tickh/pi -g',
      'npm install @tickh/pi -g',
    ])
  }
}

async function useListExecaCommand(commds: string[] | string) {
  const cmd = isArray(commds) ? commds : [commds]
  for await (const commd of cmd as string[]) {
    await execaCommand(commd, {
      stdio: 'inherit',
      encoding: 'utf-8',
    })
  }
}
