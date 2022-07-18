interface MingLing {
  name: string
  handle: any
}

const list: MingLing = {
  name: 'list',
  handle: () => {
    // TODO:list的逻辑
    return true
  },
}

const list2: MingLing = {
  name: 'list2',
  handle: () => {
    // TODO:list2的逻辑
    return true
  },
}
export default {
  list,
  list2,
} as Record<string, MingLing>
