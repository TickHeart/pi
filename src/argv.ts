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
  if (param.P || param.pnpm)
    return 'pnpm'

  if (param.Y || param.yarn)
    return 'yarn'

  if (param.N || param.npm)
    return 'npm'

  return false
}

export function getArguments(argv: string[]) {
  return minimist(argv)
}

export function spliceArgument(argv: string[], n: string) {
  const ns = n.split('|')
  return argv.filter(item => !ns.includes(item))
}
