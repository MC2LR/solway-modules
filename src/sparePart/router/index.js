import Vue from 'vue'
import Router from 'vue-router'
import outerLink from '@comm/router/outerLink'

Vue.use(Router)

// 首页
const Home = () => import('@sparePart/components/homePage/Home')
// 备件清单
const SparePartsList = () => import('@sparePart/components/homePage/SparePartsList/SparePartsList')
// 库房管理
const WarehouseManagement = () => import('@sparePart/components/homePage/WarehouseManagement/index')
// 备件管理
const SparePartsManagement = () => import('@sparePart/components/homePage/SparePartsManagement/index')
// 入库管理
const PutInStorage = () => import('@sparePart/components/homePage/PutInStorage/list')
// 入库 备件入库
const PutInStorageAdd = () => import('@sparePart/components/homePage/PutInStorage/addTo')
// 领料记录
const PackingList = () => import('@sparePart/components/homePage/Packing/list')
// 领料 申请
const PackingAdd = () => import('@sparePart/components/homePage/Packing/addTo')
// 测试
const test = () => import('@sparePart/components/test')

const router = new Router({
    routes: [
        {
            path: '/',
            redirect: { name: 'SparePartsList' }
        },
        {
            path: '/',
            name: 'Home',
            component: Home,
            children: [
                {
                    path: '/SparePartsList',
                    name: 'SparePartsList',
                    component: SparePartsList
                },
                {
                    path: '/WarehouseManagement',
                    name: 'WarehouseManagement',
                    component: WarehouseManagement
                },
                {
                    path: '/SparePartsManagement',
                    name: 'SparePartsManagement',
                    component: SparePartsManagement
                },
                {
                    path: '/PutInStorage',
                    name: 'PutInStorage',
                    component: PutInStorage
                },
                {
                    path: '/PutInStorageAdd',
                    name: 'PutInStorageAdd',
                    component: PutInStorageAdd
                },
                {
                    path: '/PackingList',
                    name: 'PackingList',
                    component: PackingList
                },
                {
                    path: '/PackingAdd',
                    name: 'PackingAdd',
                    component: PackingAdd
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
    if (window._czc) {
        window._czc.push(['_setAutoPageview', false])
        window._czc.push(['_trackPageview', window.location.hash.substr(1) + '_$_' + localStorage.username, from.fullPath])
    }
})

export default router
