const ANIMATION = 'ANIMATION'
export default {
    namespaced: true,
    state: {
        // 数据刷新时间间隔
        dataInterval: 10 * 1000,
        animations: {}
    },
    mutations: {
        [ANIMATION] (state, obj = {}) {
            state.animations = { ...state.animations, ...obj }
        }
    },
    actions: {
        animation ({ commit, state }, obj) {
            const key = Object.keys(obj)[0]
            if (state.animations[key] === obj[key]) return
            commit(ANIMATION, obj)
        }
    }
}
