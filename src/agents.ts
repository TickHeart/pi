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
  pi: [['pnpm install {0}', 'yarn {0}', 'npm install {0}'], '安装一个依赖'],
  pif: [['pnpm install {p}', 'yarn {p}', 'npm install'].map(i =>
    i.replace(/\{p\}/, '--frozen-lockfile'),
  ), '安装一个依赖携带 `frozen-lockfile` flag'],
  ad: [['pnpm add {0}', 'yarn add {0}', 'npm install {0}'], '安装一个依赖'],
  adf: [['pnpm add {p} {0}', 'yarn add {p} {0}', 'npm install {0}'].map(i =>
    i.replace(/\{p\}/, '--prefer-offline'),
  ), '安装一个依赖携带 `prefer-offline` flag'],
  pio: [['pnpm i {p} {0}', 'yarn add {p} {0}', 'npm install {0}'].map(i =>
    i.replace(/\{p\}/, '--prefer-offline'),
  ), '安装一个依赖携带 `prefer-offline` flag'],
  pis: [['pnpm i {p} {0}', 'yarn add {p} {0}', 'npm install {0}'].map(i =>
    i.replace(/\{p\}/, '--shamefully-hoist'),
  ), '安装一个依赖携带 `shamefully-hoist` flag'],
  pios: [['pnpm i {p} {0}', 'yarn add {p} {0}', 'npm install {0}'].map(i =>
    i.replace(/\{p\}/, '--prefer-offline --shamefully-hoist'),
  ), 'pio 和 pis 的结合体'],
  adw: [['pnpm add {p} {0}', 'yarn add {0}', 'npm install {0}'].map(i => i.replace('{p}', '--workspace')), '安装一个依赖携带 `workspace` flag'],
  pu: [['pnpm update', 'yarn update', 'npm update'], '升级依赖'],
  init: [['pnpm init', 'yarn init -y', 'npm init -y'], '初始化项目'],
  pr: [['pnpm run {0}', 'yarn run {0}', 'npm run {0}'], '执行一个命令'],
  pre: [['pnpm remove {0}', 'yarn remove {0}', 'npm remove {0}'], '删除一个依赖'],
  pc: [['pnpm create {0}', 'yarn create {0}', 'npm create {0}'], '执行 `create` 指令'],
  dd: [['pnpm run dev {0}', 'yarn run dev {0}', 'npm run dev {0}'], '执行 `dev` 指令'],
  ps: [['pnpm run start {0}', 'yarn run start {0}', 'npm run start {0}'], '执行 `start` 指令'],
  pt: [['pnpm run test {0}', 'yarn run test {0}', 'npm run test {0}'], '执行 `test` 指令'],
  ptu: [['pnpm run test --update', 'yarn run test --update', 'npm run test --update'], '执行 `test` 指令携带 `update` flag'],
  ec: [['pnpm create @tickh/ec', 'yarn create @tickh/ec', 'npm create @tickh/ec'], '执行 create @tickh/ec'],
  poo: [['pnpm create @tickh/oomoo', 'yarn create @tickh/oomoo', 'npm create @tickh/oomoo'], '执行 create @tickh/oomoo'],
  pvite: [['pnpm create vite {0}', 'yarn create vite {0}', 'npm create vite {0}'], '执行 create vite'],
  pb: [['pnpm run build {0}', 'yarn run build {0}', 'npm run build {0}'], '执行 `build` 指令'],
  px: [['pnpx {0}', 'npx {0}', 'npx {0}'], '执行 npx'],
  psf: [['pnpm start --filter {0}'], '执行 monorepo子项目'],
  pit: [['pnpm install --registry=http://registry.npmmirror.com {0}', 'yarn install --registry=http://registry.npmmirror.com {0}', 'npm install --registry=http://registry.npmmirror.com {0}'], '执行 `install` 指令携带单次镜像源 flag'],
} as Record<string, [string[], string]>

type ValueType = Record<keyof typeof options, string>

const getValueByIndex = (index: number): ValueType => {
  const values = Object.entries(options)
  const result: any = {}
  values.forEach(([key, values]) => {
    result[key] = values[0][index]
  })
  return result
}

export const AGENTS = {
  pnpm: getValueByIndex(0),
  yarn: getValueByIndex(1),
  npm: getValueByIndex(2),
} as Record<Tools, ValueType>

// eslint-disable-next-line import/no-mutable-exports
export let CMDS = Object.keys(AGENTS)

export function setCMDS(cmds: string[]) {
  CMDS = cmds
}
export type AGENTS_KEYS = keyof typeof AGENTS
