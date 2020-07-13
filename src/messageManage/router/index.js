import Vue from 'vue'
import Router from 'vue-router'
import outerLink from '@comm/router/outerLink'
import { czcPush } from '@messageManage/projectConfig'

Vue.use(Router)

// 首页
const Home = () => import('@messageManage/components/homePage/Home')
// 消息推送策略管理
const MessageManage = () => import('@/components/homePage/MessageManage/index')
// // 运行状态修改
// const DefaultList = () => import('@messageManage/components/homePage/DefaultList/DefaultList')
// // 设备日志
// const DeviceLog = () => import('@messageManage/components/homePage/DviceLog/DeviceLogList')
// // 测试
// const test = () => import('@messageManage/components/test')

const router = new Router({
    routes: [
        {
            path: '/',
            redirect: { name: 'MessageManage' }
        },
        {
            path: '/',
            name: 'Home',
            component: Home,
            children: [
                {
                    path: '/MessageManage',
                    name: 'MessageManage',
                    component: MessageManage
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
