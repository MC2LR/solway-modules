import {persist, getStore, setStore} from './persist'

persist({
    theme: {
        name: 'default'
    }
})

export {
    getStore,
    setStore
}
