enum Tools {
  Pnpm = 'pnpm',
  Yarn = 'yarn',
  Npm = 'npm',
}

export const options = {
  pi: ['pnpm install', 'yarn', 'npm install'],
  pif: ['pnpm install {p}', 'yarn {p}', 'npm install'].map(i =>
    i.replace(/\{p\}/, '--frozen-lockfile'),
  ),
  add: ['pnpm add {0}', 'yarn add {0}', 'npm install {0}'],
  addf: ['pnpm add {p} {0}', 'yarn add {p} {0}', 'npm install {0}'].map(i =>
    i.replace(/\{p\}/, '--prefer-offline'),
  ),
  addw: ['pnpm add {p} {0}', 'yarn add {0}', 'npm install {0}'].map(i => i.replace('{p}', '--workspace')),
  pu: ['pnpm update', 'yarn update', 'npm update'],
  init: ['pnpm init', 'yarn init -y', 'npm init -y'],
  pr: ['pnpm run {0}', 'yarn run {0}', 'npm run {0}'],
  pre: ['pnpm remove {0}', 'yarn remove {0}', 'npm remove {0}'],
  pc: ['pnpm create {0}', 'yarn create {0}', 'npm create {0}'],
}

type ValueType = Record<keyof typeof options, string>

const getValueByIndex = (index: number): ValueType => {
  const values = Object.entries(options)
  const result: any = {}
  values.forEach(([key, values]) => {
    result[key] = values[index]
  })
  return result
}

export const AGENTS = {
  pnpm: getValueByIndex(0),
  yarn: getValueByIndex(1),
  npm: getValueByIndex(2),
} as Record<Tools, ValueType>

export const CMDS = Object.keys(AGENTS)
export type AGENTS_KEYS = keyof typeof AGENTS
