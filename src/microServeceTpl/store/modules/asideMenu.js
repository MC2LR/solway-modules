import router, { resetRouter } from '@/router'
import allMenuData from '@newEnergyCloud/store/allMenu'
import { queryCurrentMenu } from '@comm/request/api'
import Vue from 'vue'
const COLLAPSE = 'COLLAPSE'

/**
 *
 * @param {菜单列表} menuData
 * @param {store} rootState
 */
const flatMenu = []
function setMenuIcon (menuData, rootState) {
    const res = []
    menuData.forEach(menu => {
        const tmp = {...menu}
        flatMenu.push(tmp)
        if (tmp.children) {
            tmp.icon = tmp.icon || ''
            tmp.children = setMenuIcon(tmp.children, rootState)
        } else {
            tmp.icon = tmp.icon || ((rootState.permission.flatRoutes?.filter(route => route.name === tmp.routeName)?.[0]?.meta || {})?.icon) || ''
        }
        res.push(tmp)
    })
    return res
}

const state = {
    // 导航折叠
    isCollapse: false,
    // 用户 首页面
    homePage: 'homeSimple',
    // 菜单结构
    menuData: [],
    // 扁平菜单
    flatMenu: [],
    // 当前选中菜单
    menuIndex: null,
    // 显示所有菜单
    allMenu: false
}

const mutations = {
    [COLLAPSE] (state) {
        state.isCollapse = !state.isCollapse
    },
    SET_HOME_PAGE (state, page) {
        state.homePage = page
    },
    SET_MENU (state, list) {
        state.menuData = list
    },
    SET_MENU_INDEX (state, index) {
        state.menuIndex = index
    },
    SET_FLAT_MENU (state, list) {
        state.flatMenu = list
    },
    ALL_MENU (state, val) {
        state.allMenu = val
    }
}

function parseMenu (menu = [], parent) {
    const menuList = menu.map(v => ({
        title: v.name?.trim(),
        icon: v.uiIcon,
        routeName: v.uiState?.split(':')?.[0],
        disabled: false,
        moduleScope: v.uiPrefix,
        children: v.children && parseMenu(v.children, v.uiState && v)
    }))
    return (parent && parent.uiState) ? [{
        title: '',
        icon: parent.uiIcon,
        routeName: parent.uiState?.split(':')?.[0],
        disabled: false,
        moduleScope: parent.uiPrefix
    }, ...menuList] : menuList
}

const actions = {
    collapse ({ commit }) {
        commit(COLLAPSE)
    },
    getMenu ({ commit, dispatch, rootState, state }) {
        return new Promise(async (resolve, reject) => {
            await queryCurrentMenu({ data: { version: 3 } }).subscribe(res => {
                let parseMenuList
                try {
                    parseMenuList = parseMenu(res?.data)
                } catch (error) {
                    parseMenuList = []
                    Vue.prototype.$message.error('菜单解析失败')
                    console.error(error)
                }
                const menuData = state.allMenu ? allMenuData : (parseMenuList)
                commit('SET_HOME_PAGE', menuData?.[0]?.routeName || menuData?.[0]?.children?.[0]?.routeName || '404')
                dispatch('permission/generateRoutes', menuData, { root: true }).then((accessRoutes) => {
                    resetRouter()
                    router.addRoutes(accessRoutes)
                    const menus = setMenuIcon(menuData, rootState)
                    commit('SET_MENU', menus)
                    commit('SET_FLAT_MENU', flatMenu)
                    resolve(menus)
                })
            }, err => reject(err))
        })
    },
    // 显示所有菜单，调试用
    allMenu ({ commit, dispatch }, menuData = allMenuData) {
        dispatch('permission/generateRoutes', menuData, { root: true }).then((accessRoutes) => {
            resetRouter()
            router.addRoutes(accessRoutes)
            commit('SET_MENU', menuData)
            commit('ALL_MENU', true)
        })
    },
    // 取消超级菜单权限
    cancelAllMenu ({commit}) {
        commit('ALL_MENU', false)
    },
    // 设置菜单选中
    setMenuIndex ({commit, state}, menuIndex) {
        const { permissionInheritance } = router.history.current.meta
        if (!menuIndex && permissionInheritance && permissionInheritance.length) {
            menuIndex = state.menuIndex || permissionInheritance[0]
        }
        commit('SET_MENU_INDEX', menuIndex)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
