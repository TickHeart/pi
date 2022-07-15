import { getArguments, selectorPackage } from '../src/argv'

describe('argv', () => {
  it('get argument', () => {
    const args = ['-R', '--name=123', '--as']
    const param = getArguments(args)

    expect(param).toMatchInlineSnapshot(`
      {
        "R": true,
        "_": [],
        "as": true,
        "name": 123,
      }
    `)
    expect(param.name).toEqual(123)
    expect(param.R).toEqual(true)
    expect(param.as).toEqual(true)
  })

  it('selectorPackage pnpm', () => {
    const args = ['-P']
    const res = selectorPackage(args)
    expect(res[0]).toBe('pnpm')

    const args2 = ['--pnpm']
    const res2 = selectorPackage(args2)
    expect(res2[0]).toBe('pnpm')
  })

  it('selectorPackage yarn', () => {
    const args = ['-Y']
    const res = selectorPackage(args)
    expect(res[0]).toBe('yarn')

    const args2 = ['--yarn']
    const res2 = selectorPackage(args2)
    expect(res2[0]).toBe('yarn')
  })

  it('selectorPackage yarn', () => {
    const args = ['-N']
    const res = selectorPackage(args)
    expect(res[0]).toBe('npm')

    const args2 = ['--npm']
    const res2 = selectorPackage(args2)
    expect(res2[0]).toBe('npm')
  })

  it('selectorPackage all', () => {
    const args = ['-N', '--npm', '-Y', '--yarn', '-P', '--pnpm']
    const res = selectorPackage(args)
    expect(res[0]).toBe('pnpm')
  })

  it('selectorPackage zero', () => {
    const args = ['']
    const res = selectorPackage(args)
    expect(res[0]).toBe(false)
  })
})
