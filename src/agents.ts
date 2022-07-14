enum Tools {
  Pnpm = 'pnpm',
  Yarn = 'yarn',
  Npm = 'npm',
}

/**
 * 类型：
 *  Record<aliasName, [[pnpm command], [yarn command], [npm command], description]>
 */
export const options = {
  pi: [['pnpm install', 'yarn', 'npm install'], '安装一个依赖'],
  pif: [['pnpm install {p}', 'yarn {p}', 'npm install'].map(i =>
    i.replace(/\{p\}/, '--frozen-lockfile'),
  ), '安装一个依赖携带 `frozen-lockfile` flag'],
  add: [['pnpm add {0}', 'yarn add {0}', 'npm install {0}'], '安装一个依赖'],
  addf: [['pnpm add {p} {0}', 'yarn add {p} {0}', 'npm install {0}'].map(i =>
    i.replace(/\{p\}/, '--prefer-offline'),
  ), '安装一个依赖携带 `prefer-offline` flag'],
  addw: [['pnpm add {p} {0}', 'yarn add {0}', 'npm install {0}'].map(i => i.replace('{p}', '--workspace')), '安装一个依赖携带 `workspace` flag'],
  pu: [['pnpm update', 'yarn update', 'npm update'], '升级依赖'],
  init: [['pnpm init', 'yarn init -y', 'npm init -y'], '初始化项目'],
  pr: [['pnpm run {0}', 'yarn run {0}', 'npm run {0}'], '执行一个命令'],
  pre: [['pnpm remove {0}', 'yarn remove {0}', 'npm remove {0}'], '删除一个依赖'],
  pc: [['pnpm create {0}', 'yarn create {0}', 'npm create {0}'], '执行 `create` 指令'],
  dd: [['pnpm run dev {0}', 'yarn run dev {0}', 'npm run dev {0}'], '执行 `dev` 指令'],
  pt: [['pnpm run test {0}', 'yarn run test {0}', 'npm run test {0}'], '执行 `test` 指令'],
  ptu: [['pnpm run test --update', 'yarn run test --update', 'npm run test --update'], '执行 `test` 指令携带 `update` flag'],
  ec: [['pnpm create @tickh/ec', 'yarn create @tickh/ec', 'npm create @tickh/ec'], '执行 create @tickh/ec'],
  pvite: [['pnpm create vite {0}', 'yarn create vite {0}', 'npm create vite {0}'], '执行 create vite'],
  bb: [['pnpm run build {0}', 'yarn run build {0}', 'npm run build {0}'], '执行 `build` 指令'],
} as Record<string, [string[], string]>

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
