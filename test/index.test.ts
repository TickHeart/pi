import pkg from '../package.json'
import { inspectionTime } from '../src/runner'
import { getLastVersion, inspectVersion } from '../src/utils/version'

describe('developer-plus', () => {
  it('Version', async () => {
    const lastVersion = await getLastVersion()

    expect(lastVersion).toMatchInlineSnapshot('"0.2.2"')
    expect(pkg.version).toMatchInlineSnapshot('"0.2.2"')
    expect(await inspectVersion()).toMatchInlineSnapshot(`
      [
        true,
        "0.2.2",
        "0.2.2",
      ]
    `)
    expect(await inspectionTime()).toMatchInlineSnapshot('false')
  })
})

