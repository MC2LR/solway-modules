export default name => {
    const routelinks = {
        'newTab_businessManagement': '/#/businessManagement', // 企业信息管理
        'newTab_departmentManagement': '/#/departmentManagement', // 部门管理
        'newTab_powerStationManagement': '/#/powerStationManagement', // 电站管理
        'newTab_authorityManagement': '/#/authorityManagement', // 角色管理
        'newTab_userManagement': '/#/userManagement', // 用户管理
        'newTab_stationGroupManagement': '/#/stationGroupManagement', // 电站分组管理
        'newTab_accountManagement': '/#/accountManagement', // 台账管理
        'newTab_svgManagement': '/#/svgManagement', // 布局视图管理
        'newTab_knowledgeManagement': '/#/knowledgeManagement', // 知识管理
        'newTab_stationEntrustCompanyManage': '/#/stationEntrustCompanyManage', // 委托服务
        'newTab_protocolApplicationManagement': '/#/protocolApplicationManagement', // 协议应用
        'newTab_companyManagement': '/#/companyManagement', // 集团管理
        'newTab_userManagementSystem': '/#/userManagementSystem', // 用户管理-系统
        'newTab_app_roleInformationList': '/#/app/roleInformationList', // 角色管理
        'newTab_app_rightInformation': '/#/app/rightInformation', // 权限管理
        'newTab_baseDictionarynew': '/#/baseDictionarynew', // 字典管理
        'newTab_dataInitManagement': '/#/dataInitManagement', // 数据初始化
        'newTab_ureportConfig1': '/#/ureportConfig1', // 报表配置
        'newTab_purchaseModules': '/#/purchaseModules', // 模块购买
        'newTab_systemModules': '/#/systemModules', // 系统模块
        'newTab_defaultRoles': '/#/defaultRoles', // 默认角色
        'newTab_powerStationOperate': '/#/powerStationOperate', // 电站运行
        'newTab_stationEntrustSystemManage': '/#/stationEntrustSystemManage', // 委托服务
        'newTab_manufacturerManagement': '/#/manufacturerManagement', // 厂商管理
        'newTab_productManagement': '/#/productManagement', // 产品管理
        'newTab_protocolConfiguration': '/#/protocolConfiguration', // 协议管理
        'newTab_app_commProtocol': '/#/app/commProtocol' // 通讯规约管理
    }

    if (routelinks[name]) {
        window.open('//' + location.host + routelinks[name] + '?islocked=true', '_blank')
        return true
    } else {
        return false
    }
}
