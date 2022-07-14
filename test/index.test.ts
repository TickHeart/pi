import pkg from '../package.json'
import { getLastVersion, inspectVersion } from '../src/utils/version'

describe('developer-plus', () => {
  it('Version', async () => {
    const lastVersion = await getLastVersion()

    expect(lastVersion).toMatchInlineSnapshot('"0.1.0"')
    expect(pkg.version).toMatchInlineSnapshot('"0.1.0"')
    expect(await inspectVersion()).toMatchInlineSnapshot(`
      [
        true,
        "0.1.0",
        "0.1.0",
      ]
    `)
  })
})

