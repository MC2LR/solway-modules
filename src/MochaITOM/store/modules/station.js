import {
    getCurrentInfo, queryStWithTree, changeBusiType, goHome, queryCurrentStcls
    // api＿defaultStation
} from '@/request/api'
import {
    userAccessSetStcls
} from '@comm/request/api'
import { Message } from 'element-ui'
import Vue from 'vue'

export const SWITCH_STATION_LIST = 'SWITCH_STATION_LIST'
export const STATION_INFO = 'STATION_INFO'

export default {
    namespaced: true,
    state: {
        // 当前电站基本信息
        currentStationInfo: {},
        // 电站树状结构 部门
        stationTree: {
            '01': [],
            '02': []
        },
        // 电站树状结构 区域
        stationTreeRegion: {
            '01': [],
            '02': []
        },
        currentTreeType: 'stationTree',
        // 最近选过的电站
        recently: {
            '01': [],
            '02': []
        },
        // 电站树状结构
        stationList: [],
        // 电站树状结构
        companyList: [],
        // 电站类型列表
        stClassList: []
    },
    mutations: {
        [STATION_INFO] (state, newStationInfo) {
            state.currentStationInfo = newStationInfo
        },
        SET_TREE (state, current) {
            state[current.treeType] = {
                ...state.stationTree,
                [current.stClass]: current.tree
            }
        },
        RECENTLY_ADD (state, stationInfo) {
            state.recently = {
                ...state.recently,
                [stationInfo.currentClass]: [stationInfo].concat(state.recently[stationInfo.currentClass])
            }
            state.currentTreeType = stationInfo.currentTreeType
        },
        ST_CLASS_LIST (state, list) {
            state.stClassList = list
        },
        CLEAR_STATE (state) {
            state.currentStationInfo = {}
            state.stationTree = {
                '01': [],
                '02': []
            }
            state.stationTreeRegion = {
                '01': [],
                '02': []
            }
            state.recently = {
                '01': [],
                '02': []
            }
            state.stClassList = []
        }
    },
    actions: {
        // 获取当前电站信息
        getStationInfo ({ commit, dispatch }, data) {
            if (data && data.code === 200) {
                return commit(STATION_INFO, data.data || {})
            }
            return new Promise((resolve, reject) => {
                getCurrentInfo().subscribe(res => {
                    if (res.code === 200) commit(STATION_INFO, res.data || {})
                    dispatch('user/getUserInfo', res, {
                        root: true
                    })
                    resolve(res)
                }, err => reject(err))
            })
        },
        // 获取电站类型列表
        getStClassList ({commit}) {
            return new Promise((resolve, reject) => {
                queryCurrentStcls().subscribe(res => {
                    if (res.code !== 200) reject(res)
                    commit('ST_CLASS_LIST', res.data)
                    resolve(res)
                }, err => reject(err))
            })
        },
        // 切换电站类型
        setStcls ({dispatch}, stcls) {
            return new Promise((resolve, reject) => {
                userAccessSetStcls({data: {stcls}}).subscribe(async res => {
                    if (res.code !== 200) reject(res)
                    await dispatch('getStationInfo')
                    resolve(true)
                }, err => reject(err))
            })
        },
        // 电站树结构获取 部门
        stationTree ({ commit, state }, stClass) {
            return new Promise((resolve, reject) => {
                if (state.stationTree[stClass].length) return resolve(state.stationTree[stClass])
                queryStWithTree({ data: { stcls: stClass } }).subscribe(res => {
                    if (res.code === 0 || res.code === 200) {
                        commit('SET_TREE', {stClass, tree: res.data, treeType: 'stationTree'})
                        resolve(res.data)
                    } else {
                        reject(res)
                    }
                })
            })
        },
        // 电站树结构获取 区域
        stationTreeRegion ({ commit, state }, stClass) {
            return new Promise((resolve, reject) => {
                if (state.stationTreeRegion[stClass].length) return resolve(state.stationTreeRegion[stClass])
                queryStWithTree({ data: { stcls: stClass, busiType: 6 } }).subscribe(res => {
                    if (res.code === 0 || res.code === 200) {
                        commit('SET_TREE', {stClass, tree: res.data, treeType: 'stationTreeRegion'})
                        resolve(res.data)
                    } else {
                        reject(res)
                    }
                })
            })
        },
        // 切换电站或公司
        changeStation ({dispatch, state, commit}, data) {
            return new Promise((resolve, reject) => {
                // if (data.treeId === state.currentStationInfo.currentTreeId) {
                //     return resolve({
                //         result: true
                //     })
                // }
                data = { isGroup: 0, ...data }
                // 只考虑光伏，不能切电站类型
                // if (data.stClass !== '01') return resolve({result: false})
                changeBusiType({ data }).subscribe(async res => {
                    if (res.code === 200) {
                        if (res.isChangeSTClass) {
                            // 切换电站类型了
                        }
                        const newStationInfo = await dispatch('getStationInfo')
                        newStationInfo.data.currentTreeType = {'0': 'stationTree', '2': 'stationTreeRegion'}[data.isGroup]
                        Vue.prototype.$bus.emit('stationChange', data)
                        if (newStationInfo?.data?.currentStid) commit('RECENTLY_ADD', newStationInfo.data)
                        resolve(res)
                    } else {
                        Message.error('切换失败')
                        reject(res)
                    }
                })
            })
        },
        // 切换默认电站或公司
        defaultStation ({dispatch, state, commit}) {
            return new Promise((resolve, reject) => {
                reject(new Error('失败'))
                // api＿defaultStation().subscribe(async res => {
                //     if (res.result) {
                //         const newStationInfo = await dispatch('getStationInfo')
                //         if (newStationInfo.currentSTID) commit('RECENTLY_ADD', newStationInfo)
                //         resolve(true)
                //     } else {
                //         Message.error('电站切换失败')
                //         reject(res)
                //     }
                // })
            })
        },
        // 清空选中电站或公司
        clearStation ({ dispatch }) {
            return new Promise(resolve => {
                goHome().promise.then(res => {
                    dispatch('getStationInfo')
                    resolve(res || true)
                })
            })
        },
        clear ({commit}) {
            commit('CLEAR_STATE')
        }
    }
}
