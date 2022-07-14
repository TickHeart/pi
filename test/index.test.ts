import pkg from '../package.json'
import { getLastVersion, inspectVersion } from '../src/utils/version'

describe('developer-plus', () => {
  it('Version', () => {
    const lastVersion = getLastVersion()

    expect(lastVersion).toMatchInlineSnapshot('"0.0.41"')
    expect(pkg.version).toMatchInlineSnapshot('"0.0.41"')
    expect(inspectVersion()).toMatchInlineSnapshot(`
      [
        true,
        "0.0.41",
        "0.0.41",
      ]
    `)
  })
})

