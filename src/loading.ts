import chalk from 'chalk'
import type { Ora } from 'ora'
import ora from 'ora'
import type { MaybeNull } from 'ztshared/index'

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
export function createIntroAnim(config: { loading: boolean }, text: string) {
  text += '\n'
  
  let spinner: MaybeNull<Ora> = null
  if (config.loading) {
    spinner = ora({
      spinner: {
        interval: 30,
        frames: [...getIntroAnimFrames(), '\n'],
      },
      prefixText: chalk.yellow(text),
    })
  }
  return {
    spinner,
    open() {
      spinner?.start()
    },
    close() {
      spinner?.stop()
    },
  }
}

