# pi

## 安装
  
```bash
pnpm add @tickh/pi -g
```

## 优先度
`pnpm > yarn > npm`

## 使用

```ts
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
  dd: ['pnpm run dev {0}', 'yarn run dev {0}', 'npm run dev {0}'],
  pt: ['pnpm run test {0}', 'yarn run test {0}', 'npm run text {0}'],
  ptu: ['pnpm run test --update', 'yarn run test --update', 'npm run test --update'],
  ec: ['pnpm create @tickh/ec', 'yarn create @tickh/ec', 'npm create @tickh/ec'],
  pvite: ['pnpm create vite {0}', 'yarn create vite {0}', 'npm create vite {0}'],
  bb: ['pnpm run build {0}', 'yarn run build {0}', 'npm run build {0}'],
}
```

