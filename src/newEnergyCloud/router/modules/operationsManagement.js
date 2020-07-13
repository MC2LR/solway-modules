export default [
    {
        path: '/operations',
        redirect: { name: '404' },
        component: () => import('@/pages/outerLayout'),
        children: [
            {
                path: '/settlementPower',
                name: 'settlementPower',
                component: () => import('@/pages/settlementPower'),
                meta: {
                    title: '结算电量',
                    icon: 'iconfont icon-yunhang',
                    pageTheme: ['light']
                }
            }
        ]
    }
]
