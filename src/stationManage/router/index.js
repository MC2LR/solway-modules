import Vue from 'vue'
import Router from 'vue-router'
import outerLink from '@comm/router/outerLink'
import { czcPush } from '@/projectConfig'

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            redirect: { name: 'stationList' }
        },
        {
            path: '/',
            name: 'Home',
            component: () => import('@/components/homePage/Home'),
            children: [
                {
                    path: '/stationList',
                    name: 'stationList',
                    component: () => import('@/components/homePage/stationList/stationList')
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
