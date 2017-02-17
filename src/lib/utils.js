export const partial = (fn, ...args) => fn.bind(null, ...args)

const _pipe = (f1, f2) => (...args) => f2(f1(...args))

export const pipe = (...fns) => fns.reduce(_pipe)
