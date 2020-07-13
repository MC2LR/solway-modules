/**
 * 若某些操作需要不同页面不同路由之间数据共享，可使用此store module，自定义key，value
 * 页面内某些个数据想持久化也可以使用此module。
 */

import {deepClone} from '@comm/tools'
export default {
    namespaced: true,
    state: {},
    mutations: {
        SET_STATE (state, {key, value}) {
            state[key] = deepClone(value)
        },
        CLEAR_STATE (state) {
            state = {}
        }
    },
    actions: {
        setState ({commit}, {key, value}) {
            commit('SET_STATE', {key, value})
        },
        clear ({commit}) {
            commit('CLEAR_STATE')
        }
    }
}
