import goLoging from '@comm/tools/goLogin'
const outerLinks = {
    'outer_contractManage': '/module/contractManage/',
    'outer_dataQuery': '/module/dataQuery/',
    'outer_runStatus': '/module/runStatus/',
    'outer_main': '/#/main',
    'outer_knowledgeBaseSummary': '/#/knowledgeBaseSummary', // 运维知识
    'outer_dataShareSummary': '/#/dataShareSummary', // 共享数据
    'outer_dataReportSummary': '/#/dataReportSummary', // 数据报表
    'outer_maintenancePersonSummary': '/#/maintenancePersonSummary', // 运维人员
    'outer_productionManageSummary': '/#/productionManageSummary', // 生产管理
    'outer_efficientOperationSummary': '/#/efficientOperationSummary', // 高效运维
    'outer_monitoringSummary': '/#/monitoringSummary', // 电站监视
    'outer_analyzeSummary': '/#/analyzeSummary', // 运行分析
    'outer_actionPlanSummary': '/#/actionPlanSummary', // 行动方案
    'outer_videoSurveillance': '/#/videoSurveillance', // 视频监控
    'outer_expertAnalysis': '/#/expertAnalysis', // 专家分析
    'outer_dataExport': '/#/dataExport', // 数据导出
    'outer_workingConfigure': '/#/workingConfigure', // 运行配置
    'outer_settlementAmount': '/#/settlementAmount', // 结算电量
    'outer_Monitoring': '/#/Monitoring', // 首页一
    'outer_Resources': '/#/Resources', // 首页二
    'outer_Equipment': '/#/Equipment', // 首页三
    'outer_People': '/#/People', // 首页四
    'outer_monitoringSummaryWp': '/#/monitoringSummaryWp', // 电站监视---风电
    'outer_analyzeSummaryWp': '/#/analyzeSummaryWp', // 运行分析---风电
    'outer_actionPlanSummaryWp': '/#/actionPlanSummaryWp', // 行动方案---风电
    'outer_expertAnalysisWp': '/#/expertAnalysisWp', // 专家分析---风电
    // 管理员页面
    'outer_messageManage': '/module/messageManage/#MessageManage', // 消息推送
    'outer_companyManagement': '/module/companyManagement/', // 集团管理
    'outer_systemModules': '/module/systemModules/', // 系统模块
    'outer_systemModules_old': '/#/systemModules', // 系统模块-旧
    'outer_defaultRoles': '/module/defaultRoles', // 默认角色
    'outer_roleAuthorityManagement': '/module/roleAuthorityManagement', // 角色管理
    'outer_businessManagement': '/#/businessManagement', // 企业信息管理
    'outer_departmentManagement': '/#/departmentManagement', // 部门管理
    'outer_powerStationManagement': '/#/powerStationManagement', // 电站管理
    'outer_authorityManagement': '/#/authorityManagement', // 角色管理
    'outer_userManagement': '/#/userManagement', // 用户管理
    'outer_stationGroupManagement': '/#/stationGroupManagement', // 电站分组管理
    'outer_accountManagement': '/#/accountManagement', // 台账管理
    'outer_svgManagement': '/#/svgManagement', // 布局视图管理
    'outer_knowledgeManagement': '/#/knowledgeManagement', // 知识管理
    'outer_stationEntrustCompanyManage': '/#/stationEntrustCompanyManage', // 委托服务
    'outer_protocolApplicationManagement': '/#/protocolApplicationManagement', // 协议应用
    // 'outer_companyManagement': '/#/companyManagement', // 集团管理
    'outer_userManagementSystem': '/#/userManagementSystem', // 用户管理-系统
    'outer_app_roleInformationList': '/#/app/roleInformationList', // 角色管理
    'outer_app_rightInformation': '/#/app/rightInformation', // 权限管理
    'outer_baseDictionarynew': '/#/baseDictionarynew', // 字典管理
    'outer_dataInitManagement': '/#/dataInitManagement', // 数据初始化
    'outer_ureportConfig1': '/#/ureportConfig1', // 报表配置
    'outer_purchaseModules': '/#/purchaseModules', // 模块购买
    // 'outer_systemModules': '/#/systemModules', // 系统模块
    // 'outer_defaultRoles': '/#/defaultRoles', // 默认角色
    'outer_powerStationOperate': '/#/powerStationOperate', // 电站运行
    'outer_stationEntrustSystemManage': '/#/stationEntrustSystemManage', // 委托服务
    'outer_manufacturerManagement': '/#/manufacturerManagement', // 厂商管理
    'outer_productManagement': '/#/productManagement', // 产品管理
    'outer_protocolConfiguration': '/#/protocolConfiguration', // 协议管理
    'outer_app_commProtocol': '/#/app/commProtocol' // 通讯规约管理
}

export default name => {
    if (name === 'login') {
        goLoging()
        return true
    } else if (outerLinks[name]) {
        window.location.href = '//' + window.location.host + outerLinks[name]
        return true
    } else {
        return false
    }
}
