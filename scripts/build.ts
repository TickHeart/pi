import { resolve } from 'path'
import { mkdir, readFile, writeFile } from 'fs/promises'
import { fileURLToPath } from 'url'
import { execaCommandSync } from 'execa'
import pk from '../package.json'

const t = fileURLToPath(import.meta.url)
const root = resolve(t, '..', '..', 'src')
const commands = resolve(root, 'commands')
const bin = resolve(t, '..', '..', 'bin')
const templateCommands = resolve(t, '..', 'templates', 'commands.txt')
const templateBin = resolve(t, '..', 'templates', 'bin.txt')

async function build() {
  const { options } = await import('../src/agents')
  const optionKeys = Object.keys(options)
  await resetDir()
  await writeCommands(optionKeys)
  await writeBin(optionKeys)
  await structurePackage(optionKeys)
}

async function resetDir() {
  execaCommandSync(`rm -rf ${commands}`)
  await mkdir(commands)
  execaCommandSync(`rm -rf ${bin}`)
  await mkdir(bin)
}

async function writeCommands(optionKeys: string[]) {
  optionKeys.forEach(async (key) => {
    const fileName = `${key}.ts`
    const filePath = resolve(commands, fileName)
    const content = await (await readFile(templateCommands, { encoding: 'utf-8' })).replaceAll('{mode}', key)
    await writeFile(filePath, content, { encoding: 'utf-8' })
  })
}

async function writeBin(optionKeys: string[]) {
  optionKeys.forEach(async (key) => {
    const fileName = `${key}.mjs`
    const filePath = resolve(bin, fileName)
    const content = await (await readFile(templateBin, { encoding: 'utf-8' })).replaceAll('{mode}', key)
    await writeFile(filePath, content, { encoding: 'utf-8' })
  })
}

async function structurePackage(optionKeys: string[]) {
  const ca: any = {}
  optionKeys.forEach((key) => {
    ca[key] = `./bin/${key}.mjs`
  })
  pk.bin = ca
  await writeFile(resolve(t, '..', '..', 'package.json'), JSON.stringify(pk, null, 2), { encoding: 'utf-8' })
}

build()
