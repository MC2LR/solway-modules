import { api＿getRoleListForPC, api＿changeRoleNew, api＿getLoginUser } from '@newEnergyCloud/request/api'
import Vue from 'vue'

const state = {
    // 用户信息
    userInfo: {},
    currentRole: null,
    rolelist: [],
    globalTheme: process.env.isHenan === 'true' ? 'dark' : 'darkBlue'
}

const mutations = {
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
            dispatch('getUserInfo'),
            dispatch('getRoleList'),
            dispatch('station/getStationInfo', null, {root: true}),
            dispatch('station/getStClassList', null, {root: true}),
            dispatch('asideMenu/getMenu', null, {root: true})
        ]).catch(() => window.location.reload())
    },
    // 获取用户信息
    getUserInfo ({ commit, state, dispatch }) {
        return new Promise((resolve, reject) => {
            api＿getLoginUser().subscribe(res => {
                if (state.userInfo.userId && state.userInfo.userId !== res.userId) {
                    return dispatch('resetStore')
                }
                commit('SET_USERINFO', res)
                resolve(res)
            }, err => reject(err))
        })
    },
    // 获取角色列表
    getRoleList ({ state, dispatch, commit }) {
        return new Promise((resolve, reject) => {
            api＿getRoleListForPC().subscribe(res => {
                if (!res.result) return reject(res)
                if (state.currentRole && state.currentRole !== res.currentRole) {
                    return dispatch('resetStore')
                }
                commit('SET_ROLE', res.currentRole)
                commit('SET_ROLEList', res.rolelist)
                resolve(res)
            }, err => reject(err))
        })
    },
    // 切角色
    changeRole ({ dispatch, state }, id) {
        return new Promise((resolve, reject) => {
            api＿changeRoleNew({ data: { roleId: id } }).subscribe(res => {
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
