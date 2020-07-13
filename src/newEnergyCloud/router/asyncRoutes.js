import monitoring from './modules/monitoring'
import analysis from './modules/analysis'
import operations from './modules/operationsManagement'
import companyManagement from './modules/companyManagement'
import henanCustom from './modules/henanCustom'
import comprehensiveEnergy from './modules/comprehensiveEnergy'
import otherModules from './modules/otherModules'
// 权限继承路由名，当此路由不在导航中可见，需配置权限继承自哪个路由名。
// 继承路由可以有多个
// 当继承路由有权限访问，则该路由有权限访问，否则该路没有权限访问
// permissionInheritance: ['a', 'b']

// unrestricted true 不受权限控制

export default [
    // 实时监视路由
    ...monitoring,
    // 统计分析路由
    ...analysis,
    // 运维管理
    ...operations,
    // 集团管理员页面
    ...companyManagement,
    // 河南定制页面
    ...henanCustom,
    // 综合能源页面
    ...comprehensiveEnergy,
    // 其他模块
    ...otherModules,
    {
        path: '/testPage',
        name: 'testPage',
        component: () => import('@/pages/test'),
        meta: {
            unrestricted: process.env.NODE_ENV === 'development',
            pageTheme: ['darkBlue']
        }
    }
]
