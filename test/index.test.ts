import pkg from '../package.json'
import { resolveConfig } from '../src/config'
import { list } from '../src/branch/list'
import { getLastVersion, inspectVersion } from '../src/utils/version'

describe('developer-plus', () => {
  it.skip('Version', async () => {
    const lastVersion = await getLastVersion()

    expect(lastVersion).toMatchInlineSnapshot('"0.3.2"')
    expect(pkg.version).toMatchInlineSnapshot('"0.3.2"')
    expect(await inspectVersion()).toMatchInlineSnapshot(`
      [
        true,
        "0.3.2",
        "0.3.2",
      ]
    `)
  })
  it.skip('pi list', () => {
    list()
  })

  it('config', async () => {
    const config = await resolveConfig()
    expect(config).toMatchInlineSnapshot(`
      {
        "schedulingSequence": "pnpm|yarn|npm",
        "skipVersionTesting": false,
      }
    `)
  })
})

