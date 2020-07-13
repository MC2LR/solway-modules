export default [
    {
        path: '/companyManagement',
        redirect: { name: '404' },
        component: () => import('@/pages/outerLayout'),
        children: [
            {
                path: '/roleManagement',
                name: 'roleAuthorityManagement',
                component: () => import('@/pages/roleManagement'),
                meta: {
                    title: '角色管理',
                    icon: 'iconfont icon-yunhang',
                    pageTheme: ['darkBlue']
                }
            },
            {
                path: '/peopleOrganizationManage',
                name: 'peopleOrganizationManage',
                component: () => import('@/pages/peopleOrganizationManage'),
                meta: {
                    title: '人员机构管理',
                    icon: 'iconfont icon-yunhang',
                    pageTheme: ['light']
                }
            },
            {
                path: '/stationManage',
                name: 'stationManage',
                component: () => import('@/pages/stationManage'),
                meta: {
                    title: '电站管理',
                    icon: 'iconfont icon-yunhang',
                    pageTheme: ['darkBlue']
                }
            },
            {
                path: '/messageManage',
                name: 'messageManage',
                component: () => import('@messageManage/components/homePage/MessageManage'),
                meta: {
                    title: '消息推送',
                    icon: 'iconfont icon-yunhang',
                    pageTheme: ['darkBlue']
                }
            },
            {
                path: '/inverterSubarray',
                name: 'inverterSubarray',
                component: () => import('@inverterSubarray/pages/index'),
                meta: {
                    title: '逆变器子阵',
                    icon: 'iconfont icon-yunhang',
                    pageTheme: ['light']
                }
            }
        ]
    }
]
