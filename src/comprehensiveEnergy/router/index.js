import Vue from 'vue'
import Router from 'vue-router'
import outerLink from '@comm/router/outerLink'
import { czcPush } from '@comprehensiveEnergy/projectConfig'

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            redirect: { name: 'Home' }
        },
        {
            // 首页 地图
            path: '/',
            name: 'Home',
            component: () => import('@/components/homePage/Home')
        },
        {
            // 二级页 建筑
            path: '/Item',
            name: 'Item',
            component: () => import('@/components/ItemPage')
        },
        {
            // 二级页 方块
            path: '/fullPageShow',
            name: 'fullPageShow',
            component: () => import('@/components/fullPageShow')
        },
        {
            // 三级页
            path: '/Project',
            name: 'Project',
            component: () => import('@/components/levelThree'),
            redirect: { name: 'StationMonitoring' },
            children: [
                {
                    // 电站监视 光伏
                    path: 'StationMonitoring',
                    name: 'StationMonitoring',
                    component: () => import('@/components/stationMonitoring')
                },
                {
                    // 电站列表监视
                    path: 'StationMonitoringList',
                    name: 'StationMonitoringList',
                    component: () => import('@/components/stationMonitoringList')
                },
                {
                    path: 'EnvironmentMonitoring',
                    name: 'EnvironmentMonitoring',
                    component: () => import('@/components/environmentMonitoring')
                },
                {
                    path: 'distributionLineMonitoring',
                    name: 'distributionLineMonitoring',
                    component: () => import('@/components/distributionLineMonitoring')
                },
                {
                    // 高压
                    path: 'HighVoltageSwitch',
                    name: 'HighVoltageSwitch',
                    component: () => import('@/components/highVoltageSwitch')
                },
                {
                    // 低压
                    path: 'LowVoltageSwitch',
                    name: 'LowVoltageSwitch',
                    component: () => import('@/components/lowVoltageSwitch')
                },
                {
                    // 储能
                    path: 'EnergyStorage',
                    name: 'EnergyStorage',
                    component: () => import('@/components/energyStorage')
                },
                {
                    // 充电桩
                    path: 'ChargingPile',
                    name: 'ChargingPile',
                    component: () => import('@/components/chargingPile')
                },
                {
                    // 配电房 视频监控
                    path: 'VideoSurveillance',
                    name: 'VideoSurveillance',
                    component: () => import('@/components/VideoSurveillance')
                }
            ]
        },
        {
            path: '/test',
            name: 'test',
            component: () => import('@/components/test')
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
