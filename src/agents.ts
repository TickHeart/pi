const pnpm = {
  add: 'pnpm add {0}',
  addf: 'pnpm add -prefer-offline {0}',
  pre: 'pnpm remove {0}',
  preg: 'pnpm remove -g {0}',
  pu: 'pnpm up',
  pi: 'pnpm i',
  pif: 'pnpm i --frozen-lockfile',
  pr: 'pnpm run {0}',
  pt: 'pnpm test',
  ptu: 'pnpm test --update-snapshot',
  init: 'pnpm init',
  pc: 'pnpm create',
}

const yarn = {
  add: 'yarn add {0}',
  addf: 'yarn add {0}',
  pre: 'yarn remove {0}',
  preg: 'yarn remove -g {0}',
  pu: 'yarn up',
  pi: 'yarn i',
  pif: 'yarn install --frozen-lockfile',
  pr: 'yarn run {0}',
  pt: 'yarn test',
  ptu: 'yarn test --update-snapshot',
  init: 'yarn init -y',
  pc: 'yarn create',
}

const npm = {
  add: 'npm install {0}',
  addf: 'npm install {0}',
  pre: 'npm remove {0}',
  preg: 'npm remove -g {0}',
  pu: 'npm update',
  pi: 'npm i',
  pif: 'npm ci',
  pr: 'npm run {0}',
  pt: 'npm run  test',
  ptu: 'npm run test --update-snapshot',
  init: 'npm init -y',
  pc: 'npm create',
}

export const AGENTS = {
  pnpm,
  yarn,
  npm,
}

export const CMDS = Object.keys(AGENTS)
export type AGENTS_KEYS = keyof typeof AGENTS
