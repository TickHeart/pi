import minimist from 'minimist'

const cmds = {
  yarn: '-Y|--yarn',
  pnpm: '-P|--pnpm',
  npm: '-N|--npm',
}

export function selectorPackage(argv: string[]) {
  const cmd = detectionInstruction(argv)
  if (cmd) {
    const ar = spliceArgument(argv, cmds[cmd])
    return [cmd, ar]
  }
  return [cmd, argv]
}

function detectionInstruction(argv: string[]) {
  const param = getArguments(argv)
  const pnpmAlias = cmds.pnpm.split('|')
  const yarnAlias = cmds.yarn.split('|')
  const npmAlias = cmds.npm.split('|')

  for (const p of pnpmAlias) {
    if (param[p])
      return 'pnpm'
  }

  for (const y of yarnAlias) {
    if (param[y])
      return 'yarn'
  }

  for (const n of npmAlias) {
    if (param[n])
      return 'npm'
  }

  return false
}

export function getArguments(argv: string[]) {
  return minimist(argv)
}

export function spliceArgument(argv: string[], n: string) {
  const ns = n.split('|')
  return argv.filter(item => !ns.includes(item))
}
