/**
 * 写在modules文件夹的都会持久化保存，刷新页面状态保存
 * 单个页面若数据结构复杂，需要store管理，不要在这里新建模块。请在页面内动态添加store module。
 * 页面内动态添加的store module不会持久化，刷新页面会丢失状态。
 * 若页面内有数据需要持久化保存，请使用userActionRecord module
 */
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import getters from './getters'

Vue.use(Vuex)

const modulesFiles = require.context('./modules', true, /\.js$/)
const paths = []
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    paths.push(moduleName)
    const value = modulesFiles(modulePath)
    modules[moduleName] = value.default
    return modules
}, {})

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    plugins: [createPersistedState({
        key: process.env.name,
        paths
    })],
    modules,
    getters
})
