export default [
    {
        path: '/analysisHomeSimple',
        name: 'analysisHomeSimple',
        component: () => import('@/pages/analysisHomeSimple'),
        meta: {
            icon: 'iconfont icon-dapingmu',
            title: '分析首页',
            requiredSelect: ['NONE'],
            refresh_interval: 20 * 1000,
            pageTheme: ['darkBlue', 'dark']
        }
    },
    {
        path: '/analysis',
        redirect: { name: '404' },
        component: () => import('@/pages/outerLayout'),
        children: [
            {
                path: '/shadowAnalysis',
                name: 'shadowAnalysis',
                component: () => import('@/pages/shadowAnalysis'),
                meta: {
                    title: '阴影分析',
                    icon: 'iconfont icon-baogao',
                    // 页面必选电站
                    requiredSelect: ['PV_STATION'],
                    pageTheme: ['light', 'dark']
                }
            },
            {
                path: '/ashAnalysis',
                name: 'ashAnalysis',
                component: () => import('@/pages/ashAnalysis'),
                meta: {
                    title: '积灰分析',
                    icon: 'iconfont icon-baogao',
                    // 页面必选电站
                    requiredSelect: ['PV_STATION'],
                    pageTheme: ['light', 'dark']
                }
            },
            {
                path: '/lossAnalysis',
                name: 'lossAnalysis',
                component: () => import('@/pages/lossAnalysis'),
                meta: {
                    title: '损失分析',
                    icon: 'iconfont icon-baogao',
                    // 页面必选电站
                    requiredSelect: ['PV_STATION'],
                    pageTheme: ['light', 'dark']
                }
            },
            {
                path: '/deviceFault',
                name: 'deviceFault',
                component: () => import('@/pages/deviceFault'),
                meta: {
                    title: '设备故障',
                    icon: 'iconfont icon-baogao',
                    // 页面必选电站
                    requiredSelect: ['PV_STATION'],
                    pageTheme: ['light', 'dark']
                }
            },
            {
                path: '/deviceMonitor',
                name: 'deviceMonitor',
                component: () => import('@/pages/deviceMonitor'),
                meta: {
                    title: '设备监视',
                    icon: 'iconfont icon-dapingmu',
                    // 页面必选电站
                    requiredSelect: ['PV_STATION'],
                    pageTheme: ['light', 'dark']
                }
            },
            {
                path: '/expertAnalysis',
                name: 'expertAnalysis',
                component: () => import('@/pages/expertAnalysis'),
                meta: {
                    title: '专家分析',
                    icon: 'iconfont icon-zhuanjia',
                    // 页面必选电站
                    requiredSelect: ['NONE'],
                    pageTheme: ['light', 'dark']
                }
            }
        ]
    }
]
