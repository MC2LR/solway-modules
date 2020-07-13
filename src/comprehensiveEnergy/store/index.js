import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import rootState from './rootState'
import second from './second'
import stationMonitoring from './stationMonitoring'
import levelThree from './levelThree'

Vue.use(Vuex)

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    plugins: [createPersistedState({
        key: 'comprehensiveEnergyStore'
    })],
    // 根模块
    ...rootState,
    modules: {
        // 二级页
        second,
        // 电站监视
        stationMonitoring,
        // 三级页导航
        levelThree
    }
})
