export default [
    {
        path: '/comprehensiveStation',
        name: 'comprehensiveStation',
        component: () => import('@/pagesComprehensive/comprehensiveStation'),
        meta: {
            icon: 'iconfont icon-dapingmu',
            title: '综合能源',
            requiredSelect: ['PV_STATION'],
            refresh_interval: 20 * 1000
        }
    },
    {
        path: '/comprehensiveEnergy',
        redirect: { name: '404' },
        component: () => import('@/pagesComprehensive/comprehensiveLayout'),
        children: [
            {
                path: '/chargingPile',
                name: 'chargingPile',
                component: () => import('@/pagesComprehensive/chargingPile'),
                meta: {
                    title: '充电桩',
                    icon: 'iconfont icon-baogao',
                    // 页面必选电站
                    requiredSelect: ['PV_STATION'],
                    pageTheme: ['darkBlue'],
                    refresh_interval: 20 * 1000
                }
            },
            {
                path: '/energyStorage',
                name: 'energyStorage',
                component: () => import('@/pagesComprehensive/energyStorage'),
                meta: {
                    title: '储能',
                    icon: 'iconfont icon-baogao',
                    // 页面必选电站
                    requiredSelect: ['PV_STATION'],
                    pageTheme: ['darkBlue'],
                    refresh_interval: 20 * 1000
                }
            },
            {
                path: '/environmentMonitoring',
                name: 'environmentMonitoring',
                component: () => import('@/pagesComprehensive/environmentMonitoring'),
                meta: {
                    title: '环境监测',
                    icon: 'iconfont icon-baogao',
                    // 页面必选电站
                    requiredSelect: ['PV_STATION'],
                    pageTheme: ['darkBlue'],
                    refresh_interval: 20 * 1000
                }
            },
            {
                path: '/highVoltageSwitch',
                name: 'highVoltageSwitch',
                component: () => import('@/pagesComprehensive/highVoltageSwitch'),
                meta: {
                    title: '高压开关',
                    icon: 'iconfont icon-baogao',
                    // 页面必选电站
                    requiredSelect: ['PV_STATION'],
                    pageTheme: ['darkBlue'],
                    refresh_interval: 20 * 1000
                }
            }
        ]
    }
]
