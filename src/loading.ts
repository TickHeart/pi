import chalk from 'chalk'
import ora from 'ora'

const gradientColors = [
  '#ff5e00',
  '#ff4c29',
  '#ff383f',
  '#ff2453',
  '#ff0565',
  '#ff007b',
  '#f5008b',
  '#e6149c',
  '#d629ae',
  '#c238bd',
]
const FlagStrings = ['㊎', '㊏', '㊌', '㊋', '㊏', '㊤', '㊦', '㊧', '㊨', '㊥']

function getIntroAnimFrames() {
  let tag = ''
  const frames = []
  for (let i = 0; i < FlagStrings.length; i++) {
    const frame = FlagStrings[i]
    const s = chalk.hex(gradientColors[i])(frame)
    tag += s
    frames.push(tag)
  }
  return frames
}
export function createIntroAnim() {
  const spinner = ora({
    spinner: {
      interval: 200,
      frames: getIntroAnimFrames() as string[],
    },
    prefixText: chalk.yellow('pi running ■■▶'),
  })
  return spinner
}

