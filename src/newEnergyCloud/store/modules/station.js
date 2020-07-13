import {
    api＿userAuthHandleGetCurrentInfoNew,
    api＿queryStWithTree,
    api＿queryRegionStWithTree,
    api＿changeDataType,
    api＿goHome,
    api＿getSTClassLIst,
    api＿defaultStation
} from '@newEnergyCloud/request/api'
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
        // 电站树状结构 行政部门
        stationTreeRegion: {
            '01': [],
            '02': []
        },
        // 当前选择电站所属树结构类型
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
        SET_TREE (state, current = {}) {
            state[current.treeType] = {
                ...state.stationTree,
                [current.stClass]: current.tree
            }
        },
        RECENTLY_ADD (state, stationInfo) {
            state.recently = {
                ...state.recently,
                [stationInfo.currentSTClass]: [stationInfo].concat(state.recently[stationInfo.currentSTClass])
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
        getStationInfo ({ commit }) {
            return new Promise((resolve, reject) => {
                api＿userAuthHandleGetCurrentInfoNew().subscribe(res => {
                    if (res.code === 0) commit(STATION_INFO, res.body)
                    resolve(res.body)
                }, err => reject(err))
            })
        },
        // 获取电站类型列表
        getStClassList ({commit}) {
            return new Promise((resolve, reject) => {
                api＿getSTClassLIst().subscribe(res => {
                    if (res.code !== 0) reject(res)
                    commit('ST_CLASS_LIST', res.body)
                    resolve(res)
                }, err => reject(err))
            })
        },
        // 电站树结构获取 部门
        stationTree ({ commit, state }, stClass) {
            return new Promise((resolve, reject) => {
                if (state.stationTree[stClass].length) return resolve(state.stationTree[stClass])
                api＿queryStWithTree({ data: { stcls: stClass } }).subscribe(res => {
                    if (res.code === 0) {
                        commit('SET_TREE', {stClass, tree: res.body, treeType: 'stationTree'})
                        resolve(res.body)
                    } else {
                        reject(res)
                    }
                })
            })
        },
        // 电站树结构获取 行政区域
        stationTreeRegion ({ commit, state }, stClass) {
            return new Promise((resolve, reject) => {
                if (state.stationTreeRegion[stClass].length) return resolve(state.stationTreeRegion[stClass])
                api＿queryRegionStWithTree({ data: { stcls: stClass } }).subscribe(res => {
                    console.log(res)
                    if (res.code === 0) {
                        commit('SET_TREE', {stClass, tree: res.body, treeType: 'stationTreeRegion'})
                        resolve(res.body)
                    } else {
                        reject(res)
                    }
                })
            })
        },
        // 切换电站或公司
        changeStation ({dispatch, state, commit}, data) {
            return new Promise((resolve, reject) => {
                if (data.stClass === state.currentStationInfo.currentSTClass && data.id === state.currentStationInfo.currentSTID) {
                    return resolve({ result: true })
                }
                data = { isGroup: 0, ...data }
                if (data.dataType === 5) {
                    data.isGroup = 2
                }
                // 只考虑光伏，不能切电站类型
                // if (data.stClass !== '01') return resolve({result: false})
                api＿changeDataType({ data }).subscribe(async res => {
                    if (res.result) {
                        if (res.isChangeSTClass) {
                            // 切换电站类型了
                        }
                        const newStationInfo = await dispatch('getStationInfo')
                        newStationInfo.currentTreeType = {'0': 'stationTree', '2': 'stationTreeRegion'}[data.isGroup]
                        Vue.prototype.$bus.emit('stationChange', data)
                        if (newStationInfo.currentSTID) commit('RECENTLY_ADD', newStationInfo)
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
                api＿defaultStation().subscribe(async res => {
                    if (res.result) {
                        const newStationInfo = await dispatch('getStationInfo')
                        newStationInfo.currentTreeType = 'stationTreeRegion'
                        if (newStationInfo.currentSTID) commit('RECENTLY_ADD', newStationInfo)
                        resolve(true)
                    } else {
                        Message.error('电站切换失败')
                        reject(res)
                    }
                })
            })
        },
        // 清空选中电站或公司
        clearStation ({ dispatch }) {
            return new Promise(resolve => {
                api＿goHome().promise.then(res => {
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
