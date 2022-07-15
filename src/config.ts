import { resolve } from 'path'
import { access, readFile } from 'fs/promises'
import fs from 'fs'
import ini from 'ini'

export async function resolveConfig() {
  const cwd = process.cwd()
  const pircPath = resolve(cwd, '.pirc')
  try {
    await access(pircPath, fs.constants.F_OK)
    const { skipVersionTesting = false } = ini.parse(await readFile(pircPath, { encoding: 'utf-8' }))
    return { skipVersionTesting }
  }
  catch {
    return { skipVersionTesting: false }
  }
}
