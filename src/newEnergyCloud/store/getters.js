import router from '@newEnergyCloud/router'
const getters = {
    // 用户id
    user_id: state => state.user.userInfo.userId,
    // 系统主题
    global_theme: state => state.user.globalTheme,
    // page_theme: (state, getters) => {
    //     console.log(router.history.current.meta?.pageTheme?.toString(), getters.global_theme)
    //     if (router.history.current.meta?.pageTheme?.some(v => v === getters.global_theme)) return getters.global_theme
    //     return router.history.current.meta?.pageTheme?.[0] || getters.global_theme
    // },
    // const beiKongRole = store.default.getters.role_list.find(v => v.comId === 196)
    // 当前角色id
    current_role: state => state.user.currentRole,
    // 角色列表
    role_list: state => state.user.rolelist,
    // 当前角色信息
    current_role_data: (state, getters) => getters.role_list.find(v => v.roleId === getters.current_role),
    // 当前角色公司id
    current_companyid: (state, getters) => getters.current_role_data.comId,
    user_phone: state => state.user.userInfo.tel,
    real_name: state => state.user.userInfo.realName,
    home_page: state => state.asideMenu.homePage,
    permission_routes: state => state.permission.routes,
    station_id: state => state.station.currentStationInfo.currentSTID,
    station_name: state => state.station.currentStationInfo.currentDataName,
    // 类型 station_type === 0 ? 'STATION' : 'COMPANY'
    station_type: state => state.station.currentStationInfo.currentType,
    station_class: state => state.station.currentStationInfo.currentSTClass,
    station_class_list: state => state.station.stClassList,
    // 当前集团下所有的电站id  3002,3023,2342
    current_company_stids: (state, getters) => state.station.stationTree?.[getters.station_class]?.find(v => v.busiId === getters.station_id)?.stids,
    station_recently: state => types => {
        const hasPv = types.includes('PV_STATION') || types.includes('PV_COMPANY')
        const hasWp = types.includes('WP_STATION') || types.includes('WP_STATION')
        const hasStation = types.includes('PV_STATION') || types.includes('WP_STATION')
        const hasCompany = types.includes('PV_COMPANY') || types.includes('WP_COMPANY')
        const recently = (hasPv ? state.station.recently['01'] : []).concat(hasWp ? state.station.recently['02'] : [])
        if (hasStation && hasCompany) return recently
        if (hasStation) return recently.filter(data => data.currentType === 0)
        if (hasCompany) return recently.filter(data => data.currentType > 0)
        return []
    },
    no_choice_station: state => state.station.currentStationInfo.currentSTID == null,
    station_data_type: (state, getters) => {
        const dataType = getters.station_type
        const classCode = getters.station_class
        if (!classCode) return ''
        return { '01': 'PV', '02': 'WP' }[classCode] + '_' + (dataType === 1 ? 'STATION' : 'COMPANY')
    },
    // 刷新频率 每个页面可单独配置
    refresh_interval: state => (interval = (router.history.current.meta && router.history.current.meta.refresh_interval)) => interval || 10 * 1000
}
export default getters
