import Vue from 'vue'
import Router from 'vue-router'
import outerLink from '@comm/router/outerLink'
import store from '@/store'
// import { czcPush } from '@/projectConfig'

Vue.use(Router)

export const asyncRoutes = []

export const constantRoutes = [{
        path: '/',
        redirect: {
            name: 'home'
        }
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('@/pages/home'),
        async beforeEnter (to, from, next) {
            if (store.getters.station_id) {
                next()
            } else {
                await store.dispatch('station/setStcls', store.getters.station_class_list[0].id)
                next()
            }
        },
        meta: {
            title: '运维管理首页',
            requiredSelect: ['PV_STATION', 'PV_COMPANY', 'WP_STATION', 'WP_COMPANY']
        }
    },
    {
        path: '/running',
        redirect: { name: '404' },
        component: () => import('@/pages/outerLayout'),
        children: [
            {
                path: '/sharePeopleManagement',
                name: 'sharePeopleManagement',
                component: () => import('@/pages/sharePeopleManagement')
            },
            {
                path: '/operHistorStatic',
                name: 'operHistorStatic',
                component: () => import('@/pages/operHistorStatic/index.vue')
            }, {
                path: '/operationsRepository',
                name: 'operationsRepository',
                component: () => import('@/pages/operationsRepository/index.vue')
            }, {
                path: '/redEnvelopeStatistics',
                name: 'redEnvelopeStatistics',
                component: () => import('@/pages/redEnvelopeStatistics/index.vue')
            }, {
                path: '/knowledgeBaseTest',
                name: 'knowledgeBaseTest',
                component: () => import('@/pages/knowledgeBaseTest')
            }
        ]
    },
    {
        path: '/test',
        name: 'test',
        component: () => import('@/pages/test')
    },

    {
        path: '*',
        redirect: '/'
    }
]

const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({
        y: 0
    }),
    routes: constantRoutes
})

const router = createRouter()

export function resetRouter () {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

router.beforeEach((to, from, next) => {
    if (to.params.moduleScope && to.params.moduleScope !== process.env.name) {
        if (process.env.NODE_ENV === 'development') {
            alert('进入其他模块，开发环境暂时无法模拟')
        } else {
            window.location.href = window.location.origin + '/module/' + to.params.moduleScope + '/#/' + (to.name.split(':')[1] || to.name)
        }
        return next(false)
    }
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
