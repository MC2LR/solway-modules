export default [
    {
        path: '/henanHome',
        name: 'henanHome',
        component: () => import('@/pagesHenan/henanHome'),
        meta: {
            icon: 'iconfont icon-dapingmu',
            title: '河南首页',
            requiredSelect: ['NONE'],
            refresh_interval: 10 * 1000
        }
    },
    {
        path: '/henanMonitoring',
        name: 'henanMonitoring',
        component: () => import('@/pagesHenan/henanMonitoring'),
        meta: {
            icon: 'iconfont icon-dapingmu',
            title: '河南监视',
            // 页面必选电站或集团
            requiredSelect: ['PV_STATION', 'PV_COMPANY', 'DEFAULT'],
            refresh_interval: 10 * 1000
        }
    },
    {
        path: '/henanRunning',
        redirect: { name: '404' },
        component: () => import('@/pagesHenan/henanLayout'),
        children: [
            {
                path: '/henanStationOverview',
                name: 'henanStationOverview',
                component: () => import('@/pagesHenan/henanStationOverview'),
                meta: {
                    icon: 'iconfont icon-yunhang',
                    title: '电站概况',
                    requiredSelect: ['NONE'],
                    refresh_interval: 20 * 1000,
                    pageTheme: ['dark']
                }
            },
            {
                path: '/henanCleanSuggest',
                name: 'henanCleanSuggest',
                component: () => import('@/pagesHenan/henanCleanSuggest'),
                meta: {
                    icon: 'iconfont icon-qingxi',
                    title: '清洗建议',
                    requiredSelect: ['NONE'],
                    refresh_interval: 20 * 1000,
                    pageTheme: ['dark']
                }
            }
        ]
    }
]
