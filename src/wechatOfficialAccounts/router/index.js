import Vue from 'vue'
import Router from 'vue-router'
import outerLink from '@comm/router/outerLink'
// import { czcPush } from '@/projectConfig'

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            redirect: { name: 'accountBind' }
        },
        {
            path: '/accountBind',
            name: 'accountBind',
            component: () => import('@/components/accountBind')
        },
        {
            path: '/dailyPowerGeneration',
            name: 'dailyPowerGeneration',
            component: () => import('@/components/dailyPowerGeneration/dailyPowerGeneration')
        },
        {
            path: '/messageSubscribe',
            name: 'messageSubscribe',
            component: () => import('@/components/messageSubscribe/messageSubscribe')
        },
        {
            path: '/report',
            name: 'report',
            component: () => import('@/components/report/reportList')
        },
        {
            path: '/videoPage',
            name: 'videoPage',
            component: () => import('@/components/videoPage')
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
    // czcPush(from, to)
})

export default router
