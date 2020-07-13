export default [
    {
        path: '/homeSimple',
        name: 'homeSimple',
        component: () => import('@/pages/homeSimple'),
        meta: {
            icon: 'iconfont icon-dapingmu',
            title: '管理首页',
            requiredSelect: ['NONE'],
            refresh_interval: 20 * 1000
        }
    },
    {
        path: '/homeShanghai',
        name: 'homeShanghai',
        component: () => import('@/pages/homeSimple/indexShanghai'),
        meta: {
            icon: 'iconfont icon-dapingmu',
            title: '管理首页',
            requiredSelect: ['NONE'],
            refresh_interval: 20 * 1000
        }
    },
    {
        path: '/running',
        redirect: { name: '404' },
        component: () => import('@/pages/outerLayout'),
        children: [
            {
                path: '/dataReport',
                name: 'dataReport',
                component: () => import('@/pages/dataReport'),
                meta: {
                    title: '数据报表',
                    icon: 'iconfont icon-baogao',
                    // 页面必选电站
                    requiredSelect: ['PV_STATION', 'PV_COMPANY', 'WP_STATION', 'WP_COMPANY'],
                    pageTheme: ['light', 'dark']
                }
            },
            {
                path: '/stationRun',
                name: 'stationRun',
                component: () => import('@/pages/stationRun'),
                meta: {
                    title: '电站运行',
                    icon: 'iconfont icon-yunhang',
                    // 页面必选电站
                    requiredSelect: ['PV_STATION', 'PV_COMPANY', 'WP_STATION', 'WP_COMPANY'],
                    refresh_interval: 20 * 1000,
                    pageTheme: ['darkBlue', 'light', 'dark']
                }
            },
            {
                path: '/deviceList',
                name: 'deviceList',
                component: () => import('@/pages/deviceList'),
                meta: {
                    title: '设备列表',
                    icon: 'iconfont icon-shebei',
                    // 页面必选电站
                    requiredSelect: ['PV_STATION', 'PV_COMPANY', 'WP_STATION', 'WP_COMPANY'],
                    pageTheme: ['darkBlue', 'light', 'dark']
                }
            },
            {
                path: '/deviceMatrix',
                name: 'deviceMatrix',
                component: () => import('@/pages/deviceMatrix'),
                meta: {
                    title: '设备矩阵',
                    icon: 'iconfont icon-shebei',
                    // 页面必选电站
                    requiredSelect: ['PV_STATION', 'WP_STATION'],
                    refresh_interval: 20 * 1000,
                    // 页面从列表视图进入，没有菜单
                    permissionInheritance: ['deviceList'],
                    pageTheme: ['darkBlue', 'light']
                }
            },
            {
                path: '/deviceLayoutView',
                name: 'deviceLayoutView',
                component: () => import('@/pages/deviceLayoutView'),
                meta: {
                    title: '设备布局视图',
                    icon: 'iconfont icon-shebei',
                    // 页面必选电站
                    requiredSelect: ['WP_STATION'],
                    refresh_interval: 20 * 1000,
                    // 页面从列表视图进入，没有菜单
                    permissionInheritance: ['deviceList'],
                    pageTheme: ['darkBlue']
                }
            },
            {
                path: '/deviceAlarm',
                name: 'deviceAlarm',
                component: () => import('@/pages/deviceAlarm'),
                meta: {
                    title: '设备告警',
                    icon: 'iconfont icon-gaojing',
                    // 页面必选电站
                    requiredSelect: ['PV_STATION', 'PV_COMPANY', 'WP_STATION', 'WP_COMPANY'],
                    pageTheme: ['darkBlue', 'light', 'dark']
                }
            },
            {
                path: '/wiringDiagram',
                name: 'wiringDiagram',
                component: () => import('@/pages/wiringDiagram'),
                meta: {
                    title: '接线图',
                    icon: 'iconfont icon-gaojing',
                    // 页面必选电站
                    requiredSelect: ['PV_STATION', 'WP_STATION'],
                    pageTheme: ['light', 'dark']
                }
            },
            {
                path: '/videoSurveillance',
                name: 'videoSurveillance',
                component: () => import('@videoSurveillance/page'),
                meta: {
                    icon: 'iconfont icon-dapingmu',
                    title: '视频监视',
                    pageTheme: ['darkBlue', 'light']
                }
            }
        ]
    }
]
