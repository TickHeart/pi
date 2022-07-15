import pkg from '../package.json'
import { list } from '../src/utils/list'
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
  it('pi list', () => {
    list()
  })
})

