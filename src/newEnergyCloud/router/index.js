import Vue from 'vue'
import Router from 'vue-router'
import outerLink from '@comm/router/outerLink'
import newTabLink from '@comm/router/newTabLink'
import store from '@newEnergyCloud/store'
import { czcPush } from '@newEnergyCloud/projectConfig'
import otherRoutes from './asyncRoutes'
import isIframeRoutes from './iframeRoutes'
import otherModules from './modules/otherModules'

/**
 * 定义路由请加name属性，路由跳转除iframe外，都用name跳转
 */
Vue.use(Router)

export const asyncRoutes = otherRoutes

export const constantRoutes = [
    {
        path: '/',
        redirect: { name: 'home' }
    },
    {
        path: '/home',
        name: 'home',
        redirect: to => {
            if (to.query.theme) store.dispatch('user/switchTheme', to.query.theme)
            if (store.state.permission.flatRoutes.some(v => v.name === store.getters.home_page)) return { name: store.getters.home_page, query: {} }
            return { path: '/iframe', query: { path: store.getters.home_page } }
        }
    },
    {
        path: '/iframe',
        name: 'iframe',
        props: route => ({...route.query}),
        component: () => import('@/pages/iframe'),
        beforeEnter (to, from, next) {
            if (isIframeRoutes(to.query.path)) next()
            else next({name: '404'})
        },
        meta: {
            keepAlive: true
        }
    },
    {
        path: '/iframeModule',
        name: 'iframeModule',
        props: route => ({...route.query}),
        component: () => import('@/pages/iframeModule'),
        beforeEnter (to, from, next) {
            if (isIframeRoutes(to.query.path)) next()
            else next({name: '404'})
        },
        meta: {
            keepAlive: true
        }
    },
    {
        path: '/404',
        name: '404',
        component: () => import('@/pages/404')
    },
    {
        path: '*',
        beforeEnter (to, from, next) {
            if (isIframeRoutes(to.path.substring(1))) {
                if (otherModules.find(v => v.path === to.path)) {
                    next({ path: '/iframeModule', query: { path: to.path.substring(1) } })
                } else {
                    next({ path: '/iframe', query: { path: to.path.substring(1) } })
                }
            } else next({name: '404'})
        }
    }
]

const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})

const router = createRouter()

export function resetRouter () {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

// 进页面前选择电站
const selectStation = (requiredSelect) => {
    if (requiredSelect.includes('NONE')) {
        // if (store.getters.no_choice_station) return
        return store.dispatch('station/clearStation')
    }
    const currentDataType = store.getters.station_data_type
    if (requiredSelect.includes(currentDataType)) return true
    const stationRecently = store.getters.station_recently(requiredSelect)
    if (stationRecently.length > 0) {
        const { currentSTID, currentSTClass, currentType } = stationRecently[0]
        return store.dispatch('station/changeStation', {
            id: currentSTID, stClass: currentSTClass, dataType: currentType
        })
    } else if (requiredSelect.includes('DEFAULT')) {
        return store.dispatch('station/defaultStation')
    }
    return Vue.prototype.$switchStation(requiredSelect)
}

router.beforeEach(async (to, from, next) => {
    if (to.params.moduleScope && to.params.moduleScope !== process.env.name) {
        if (process.env.NODE_ENV === 'development') {
            alert('进入其他模块，开发环境暂时无法模拟')
        } else {
            window.location.href = window.location.origin + '/module/' + to.params.moduleScope + '/#/' + (to.name.split(':')[1] || to.name)
        }
        return next(false)
    }
    if (outerLink(to.name)) next(false)
    if (newTabLink(to.name)) next(false)
    if (to.matched.length === 0) {
        if (to.name) next({path: '/' + to.name})
        else from.name ? next({ name: from.name }) : next('/')
    } else if (to.meta && to.meta.requiredSelect) {
        Vue.prototype.$loading()
        const result = await selectStation(to.meta.requiredSelect)
        if (!result) {
            Vue.prototype.$loading().close()
            return next({ name: from.name || 'home' })
        }
        next()
    } else {
        if (to.name === from.name && to.path === from.path && to.query === from.query) next(false)
        else next()
    }
})

router.afterEach((to, from) => {
    Vue.prototype.$loading().close()
    czcPush(from, to)
    store.dispatch('asideMenu/setMenuIndex', ['iframe', 'iframeModule'].includes(to.name) ? to.query.path : to.params.menuIndex)
})

export default router
