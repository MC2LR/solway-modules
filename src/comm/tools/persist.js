const win = window
let store = {}
const s = Symbol('s')
const persist = (obj, storeName = 'moduleStore') => {
    const persistStr = win.localStorage.getItem(storeName)

    if (obj === void 0) return store

    if (!(typeof obj === 'object' && obj)) return console.error('不是一个合法的json，数据持久失败')

    if (obj.__set__ === s) {
        delete obj.__set__
        win.localStorage.setItem(storeName, JSON.stringify(obj))
        store = obj
        return store
    }

    if (persistStr) {
        const o = JSON.parse(persistStr)
        if (!(typeof o === 'object' && o)) return console.error('数据被损坏')
        store = JSON.parse(persistStr)
        return store
    }

    win.localStorage.setItem(storeName, JSON.stringify(obj))
    store = obj
    return store
}

const setStore = (name, action) => {
    if (typeof name !== 'string') return console.error('设置的存储名不是一个合法的key' + name)
    if (!(typeof action === 'object' && action)) return console.error('设置的值不是一个合法的json' + action)
    if (!store.hasOwnProperty(name)) return console.error('store中没有该项数据' + name)
    const _store = {
        ...store,
        [name]: action,
        __set__: s
    }
    return persist(_store)[name]
}
const getStore = () => ({ ...store })

export {
    persist,
    setStore,
    getStore
}
