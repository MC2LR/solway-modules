import Vue from 'vue'
import Router from 'vue-router'
import outerLink from '@comm/router/outerLink'
import { czcPush } from '@runStatus/projectConfig'

Vue.use(Router)

// 首页
const Home = () => import('@runStatus/components/homePage/Home')
// 运行状态修改
const DefaultList = () => import('@runStatus/components/homePage/DefaultList/DefaultList')
// 设备日志
const DeviceLog = () => import('@runStatus/components/homePage/DviceLog/DeviceLogList')
// 测试
const test = () => import('@runStatus/components/test')

const router = new Router({
    routes: [
        {
            path: '/',
            redirect: { name: 'DefaultList' }
        },
        {
            path: '/',
            name: 'Home',
            component: Home,
            children: [
                {
                    path: '/DefaultList',
                    name: 'DefaultList',
                    component: DefaultList
                },
                {
                    path: '/DeviceLog',
                    name: 'DeviceLog',
                    component: DeviceLog
                }
            ]
        },
        {
            path: '/test',
            name: 'test',
            component: test
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
