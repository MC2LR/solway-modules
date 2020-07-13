const COLLAPSE = 'COLLAPSE'
export default {
    namespaced: true,
    state: {
        isCollapse: false
    },
    mutations: {
        [COLLAPSE] (state) {
            state.isCollapse = !state.isCollapse
        }
    },
    actions: {
        collapse ({ commit }) {
            commit(COLLAPSE)
        }
    }
}
