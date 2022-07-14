import pkg from '../package.json'
import { getLastVersion, inspectVersion } from '../src/utils/version'

describe('developer-plus', () => {
  it('Version', () => {
    const lastVersion = getLastVersion()

    expect(lastVersion).toMatchInlineSnapshot('"0.0.40"')
    expect(pkg.version).toMatchInlineSnapshot('"0.0.40"')
    expect(inspectVersion()).toMatchInlineSnapshot(`
      [
        true,
        "0.0.40",
        "0.0.40",
      ]
    `)
  })
})

