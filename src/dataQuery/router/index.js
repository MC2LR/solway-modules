import Vue from 'vue'
import Router from 'vue-router'
import outerLink from '@comm/router/outerLink'
import { czcPush } from '@runStatus/projectConfig'

Vue.use(Router)

// 首页
const Home = () => import('@/components/homePage/Home')
// 导航页
const HomeNav = () => import('@/components/homePage/HomeNav')
// 设备日志查询
const deviceLogQuery = () => import('@/components/homePage/deviceLogQuery/index')
// 设备日志统计
const deviceLogStatistics = () => import('@/components/homePage/deviceLogStatistics')
// 主题数据查询
const deviceLogTheme = () => import('@/components/homePage/deviceLogTheme')
// 秒级数据查询
const deviceLogSecond = () => import('@/components/homePage/deviceLogSecond')

const router = new Router({
    routes: [
        {
            path: '/',
            redirect: { name: 'HomeNav' }
        },
        {
            path: '/',
            name: 'Home',
            component: Home,
            children: [
                {
                    path: '/home',
                    name: 'HomeNav',
                    component: HomeNav
                },
                {
                    path: '/deviceLogQuery',
                    name: 'deviceLogQuery',
                    component: deviceLogQuery
                },
                {
                    path: '/deviceLogStatistics',
                    name: 'deviceLogStatistics',
                    component: deviceLogStatistics
                },
                {
                    path: '/deviceLogTheme',
                    name: 'deviceLogTheme',
                    component: deviceLogTheme
                },
                {
                    path: '/deviceLogSecond',
                    name: 'deviceLogSecond',
                    component: deviceLogSecond
                }
            ]
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (outerLink(to.name)) next(false)
    if (to.matched.length === 0) {
        from.name ? next({ name: from.name }) : next('/')
    } else {
        Vue.prototype.$loading()
        next()
    }
})

router.afterEach((to, from) => {
    Vue.prototype.$loading().close()

    czcPush(from, to)
})

export default router
