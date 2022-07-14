import pkg from '../package.json'
import { getLastVersion, inspectVersion } from '../src/utils/version'

describe('developer-plus', () => {
  it('Version', async () => {
    const lastVersion = await getLastVersion()

    expect(lastVersion).toMatchInlineSnapshot('"0.0.45"')
    expect(pkg.version).toMatchInlineSnapshot('"0.0.45"')
    expect(await inspectVersion()).toMatchInlineSnapshot(`
      [
        true,
        "0.0.45",
        "0.0.45",
      ]
    `)
  })
})

