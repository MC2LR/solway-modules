import Vue from 'vue'
import Router from 'vue-router'
import outerLink from '@comm/router/outerLink'
import { czcPush } from '@contractManage/projectConfig'

Vue.use(Router)

// 首页
const Home = () => import('@/components/homePage/Home')
// 二级路由首页
const index = () => import('@/components/homePage/index')
// 合同管理
const contractList = () => import('@/components/homePage/contractList/contractList')
// 合同项目管理
const projectList = () => import('@/components/homePage/projectList/projectList')
// 内部项目管理
const insideProjectList = () => import('@/components/homePage/insideProjectList/index')

const router = new Router({
    routes: [
        {
            path: '/',
            redirect: { name: 'index' }
        },
        {
            path: '/',
            name: 'Home',
            component: Home,
            children: [
                {
                    path: '/index',
                    name: 'index',
                    component: index,
                    redirect: { name: 'contractList' },
                    children: [
                        {
                            path: '/contractList',
                            name: 'contractList',
                            component: contractList
                        },
                        {
                            path: '/projectList',
                            name: 'projectList',
                            component: projectList
                        },
                        {
                            path: '/insideProjectList',
                            name: 'insideProjectList',
                            component: insideProjectList
                        }
                    ]
                }
            ]
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
