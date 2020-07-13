import store from '@/store'

export default (routeName) => {
    const o = {
        // 老版本视频监视权限 === 新版本视频监视权限
        videoSurveillanceNew: store.state.asideMenu.flatMenu.some(menu => menu.routeName === 'videoSurveillance')
    }
    if (o.hasOwnProperty(routeName) && o[routeName]) return true
    return store.state.asideMenu.flatMenu.some(menu => menu.routeName === routeName)
}
