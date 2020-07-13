import {
    getCurrentInfo,
    queryRole4Web,
    changeRole4Web,
    getAccountInfo
} from '@/request/api'
import Vue from 'vue'

const state = {
    // 用户信息
    baseInfo: {},
    userInfo: {},
    currentRole: null,
    rolelist: [],
    globalTheme: process.env.isHenan === 'true' ? 'dark' : 'darkBlue'
}

const mutations = {
    SET_BASE_INFO (state, info) {
        state.baseInfo = info
    },
    SET_USERINFO (state, info) {
        state.userInfo = info
    },
    SET_ROLE (state, roleId) {
        state.currentRole = roleId
    },
    SET_ROLEList (state, roleList) {
        state.rolelist = roleList
    },
    SWITCH_THEME (state, themeName) {
        state.globalTheme = themeName
    }
}

const actions = {
    // 数据初始化
    initUserInfo ({ dispatch }) {
        return Promise.all([
            dispatch('getUserBaseInfo'),
            dispatch('getUserInfo'),
            dispatch('getRoleList'),
            // dispatch('station/getStationInfo', null, {root: true}),
            dispatch('station/getStClassList', null, {root: true}),
            dispatch('asideMenu/getMenu', null, {root: true})
        ]).catch(() => {
            console.log('错误')
            // window.location.reload()
        })
    },
    // 获取用户基本信息
    getUserBaseInfo ({ commit, state, dispatch }) {
        return new Promise((resolve, reject) => {
            getAccountInfo().subscribe(res => {
                if (res.code !== 200 && res.code !== 0) return reject(res.msg)
                if (state.baseInfo?.id && state.baseInfo?.id !== res.data.id) {
                    return dispatch('resetStore')
                }
                commit('SET_BASE_INFO', res.data)
                resolve(res)
            }, err => reject(err))
        })
    },
    // 获取用户信息
    getUserInfo ({ commit, state, dispatch }, data) {
        if (data?.code === 200) {
            if (state.userInfo.currentUserId && state.userInfo.currentUserId !== data.data.currentUserId) {
                return dispatch('resetStore')
            }
            return commit('SET_USERINFO', data.data)
        }
        return new Promise((resolve, reject) => {
            getCurrentInfo().subscribe(res => {
                if (res.code !== 200) {
                    return reject(res.msg)
                }
                dispatch('station/getStationInfo', res, {
                    root: true
                })
                if (state.userInfo.currentUserId && state.userInfo.currentUserId !== res.data.currentUserId) {
                    return dispatch('resetStore')
                }
                commit('SET_USERINFO', res.data)
                resolve(res)
            }, err => reject(err))
        })
    },
    // 获取角色列表
    getRoleList ({ state, dispatch, commit }) {
        return new Promise((resolve, reject) => {
            queryRole4Web().subscribe(res => {
                if (res.code !== 200) return reject(res.msg)
                if (state.currentRole && state.currentRole !== res.data.currentRole) {
                    return dispatch('resetStore')
                }
                commit('SET_ROLE', res.data.currentRole)
                commit('SET_ROLEList', res.data.roles)
                resolve(res)
            }, err => reject(err))
        })
    },
    // 切角色
    changeRole ({ dispatch, state }, id) {
        return new Promise((resolve, reject) => {
            changeRole4Web({ data: { roleId: id } }).subscribe(res => {
                location.hash = 'home?theme=' + state.globalTheme
                dispatch('resetStore')
                resolve()
            })
        })
    },
    switchTheme ({commit}, themeName) {
        commit('SWITCH_THEME', themeName)
        Vue.prototype.$bus.emit('switch_theme', themeName)
    },
    // 重置页面所有数据
    resetStore ({commit, dispatch}) {
        commit('SET_BASE_INFO', {})
        commit('SET_USERINFO', {})
        commit('SET_ROLE', null)
        commit('SET_ROLEList', [])
        dispatch('asideMenu/cancelAllMenu', null, { root: true })
        dispatch('station/clear', null, { root: true })
        dispatch('userActionRecord/clear', null, { root: true })
        location.reload()
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
