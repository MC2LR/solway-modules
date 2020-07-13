import { asyncRoutes, constantRoutes } from '@newEnergyCloud/router'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission (menuList, route, flatRotesList) {
    const { unrestricted, permissionInheritance } = route.meta || {}
    // 如果不受权限控制
    if (route.meta && unrestricted) return true
    return menuList.some(menu => {
        // 父级菜单没有路由 判断子菜单路由
        if (menu.children) return hasPermission(menu.children, route, flatRotesList)
        // 有权限
        if (menu.routeName === route.name) return true
        // 没有依赖路由 或其他入口页面
        if (!permissionInheritance) return false
        let flag = false
        permissionInheritance.forEach(routeName => {
            if (flag) return
            flag = flatRotesList.some(route => (route.name === routeName) && hasPermission(menuList, route, flatRotesList))
        })
        return flag
    })
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes (routes, menuList, flatRotesList) {
    const res = []
    routes.forEach(route => {
        const tmpRoute = { ...route }
        if (tmpRoute.children) {
            tmpRoute.children = filterAsyncRoutes(tmpRoute.children, menuList, flatRotesList)
            if (tmpRoute.children.length) res.push(tmpRoute)
        } else if (hasPermission(menuList, tmpRoute, flatRotesList)) {
            res.push(tmpRoute)
        }
    })

    return res
}

function flatRoutes (routes) {
    const flatRoutes = []
    const flat = routes => {
        routes.forEach(route => {
            const tmpRoute = { ...route }
            flatRoutes.push({ ...tmpRoute, children: null })
            tmpRoute.children && flat(tmpRoute.children)
        })
    }
    if (!flatRoutes.length) flat(routes)
    return flatRoutes
}

const state = {
    routes: [],
    addRoutes: [],
    flatRoutes: []
}

const mutations = {
    SET_ROUTES: (state, routes) => {
        state.addRoutes = routes
        state.routes = constantRoutes.concat(routes)
    },
    FLAT_ROUTES (state, routes) {
        state.flatRoutes = routes
    }
}

const actions = {
    generateRoutes ({ commit, dispatch }, menuList) {
        return new Promise(resolve => {
            const flatRotesList = flatRoutes(constantRoutes.concat(asyncRoutes))
            commit('FLAT_ROUTES', flatRotesList)
            let accessedRoutes = filterAsyncRoutes(asyncRoutes, menuList, flatRotesList)
            commit('SET_ROUTES', accessedRoutes)
            resolve(accessedRoutes)
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
