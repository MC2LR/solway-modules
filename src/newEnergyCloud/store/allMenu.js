/**
 * title        菜单名称        为空不显示（会加入路由表）
 * icon         菜单图标        icon的className
 * routeName    菜单路由名      有子菜单无效（父菜单没有路由）
 * disabled     是否禁用        会显示(不可点击)
 * children     子菜单          可无限极子菜单
 */
export default [
    // { title: '管理首页', icon: 'iconfont icon-guanlishouye', routeName: 'homeSimple', disabled: false },
    // { title: '分析首页', icon: 'iconfont icon-fenxishouye', routeName: 'analysisHomeSimple', disabled: false },
    {
        title: '运营管理',
        icon: 'iconfont icon-yunhangfenxi1',
        disabled: false,
        children: [
            { moduleScope: 'newEnergyCloud', title: '', icon: 'iconfont icon-dianzhanyunhang', routeName: 'homeSimple', disabled: false },
            { moduleScope: 'newEnergyCloud', title: '电站运行', icon: 'iconfont icon-dianzhanyunhang', routeName: 'stationRun', disabled: false },
            { moduleScope: 'newEnergyCloud', title: '设备运行', icon: 'iconfont icon-shebeiyunhang', routeName: 'deviceList', disabled: false },
            { moduleScope: 'newEnergyCloud', title: '设备告警', icon: 'iconfont icon-shebeigaojing', routeName: 'deviceAlarm', disabled: false },
            { moduleScope: 'newEnergyCloud', title: '数据报表', icon: 'iconfont icon-shujubaobiao', routeName: 'dataReport', disabled: false },
            { moduleScope: 'newEnergyCloud', title: '接线图', icon: 'iconfont icon-shujubaobiao', routeName: 'wiringDiagram', disabled: false },
            { moduleScope: 'newEnergyCloud', title: '上海地铁首页', icon: 'iconfont icon-shujubaobiao', routeName: 'homeShanghai', disabled: false }
        ]
    },
    {
        title: '运行分析',
        icon: 'iconfont icon-yunhangfenxi1',
        disabled: false,
        children: [
            { moduleScope: 'newEnergyCloud', title: '', icon: 'iconfont icon-dianzhanyunhang', routeName: 'analysisHomeSimple', disabled: false },
            { moduleScope: 'newEnergyCloud', title: '设备监视', icon: 'iconfont icon-shebeijianshi', routeName: 'deviceMonitor', disabled: false },
            { moduleScope: 'newEnergyCloud', title: '设备故障', icon: 'iconfont icon-shebeiguzhang', routeName: 'deviceFault', disabled: false },
            { moduleScope: 'newEnergyCloud', title: '损失分析', icon: 'iconfont icon-sunshifenxi-', routeName: 'lossAnalysis', disabled: false },
            { moduleScope: 'newEnergyCloud', title: '阴影分析', icon: 'iconfont icon-yinyingfenxi', routeName: 'shadowAnalysis', disabled: false },
            { moduleScope: 'newEnergyCloud', title: '积灰分析', icon: 'iconfont icon-jihuifenxi-', routeName: 'ashAnalysis', disabled: false },
            { moduleScope: 'newEnergyCloud', title: '专家分析', icon: 'iconfont icon-zhuanjiafenxi', routeName: 'expertAnalysis', disabled: false }
        ]
    },
    {
        title: '综合能源',
        icon: 'iconfont icon-yunhangfenxi1',
        disabled: false,
        children: [
            { moduleScope: 'newEnergyCloud', title: '', icon: 'iconfont icon-guanlishouye', routeName: 'comprehensiveStation', disabled: false },
            { moduleScope: 'newEnergyCloud', title: '储能', icon: 'iconfont icon-guanlishouye', routeName: 'energyStorage', disabled: false },
            { moduleScope: 'newEnergyCloud', title: '充电桩', icon: 'iconfont icon-guanlishouye', routeName: 'chargingPile', disabled: false },
            { moduleScope: 'newEnergyCloud', title: '环境监测', icon: 'iconfont icon-guanlishouye', routeName: 'environmentMonitoring', disabled: false },
            { moduleScope: 'newEnergyCloud', title: '高压开关', icon: 'iconfont icon-guanlishouye', routeName: 'highVoltageSwitch', disabled: false }
        ]
    },
    {
        title: '河南项目',
        icon: 'iconfont icon-yunhangfenxi1',
        disabled: false,
        children: [
            { moduleScope: 'newEnergyCloud', title: '', icon: 'iconfont icon-guanlishouye', routeName: 'henanHome', disabled: false },
            { moduleScope: 'newEnergyCloud', title: '河南监视', icon: 'iconfont icon-guanlishouye', routeName: 'henanMonitoring', disabled: false },
            { moduleScope: 'newEnergyCloud', title: '电站概况', icon: 'iconfont icon-dianzhanyunhang', routeName: 'henanStationOverview', disabled: false },
            { moduleScope: 'newEnergyCloud', title: '清洗建议', icon: 'iconfont icon-qingxi', routeName: 'henanCleanSuggest', disabled: false }
        ]
    },
    {
        title: '新能云2.0',
        icon: 'iconfont icon-yunhangfenxi1',
        disabled: false,
        children: [
            { moduleScope: 'newEnergyCloud', title: '', icon: 'iconfont icon-guanlishouye', routeName: 'main', disabled: false },
            { moduleScope: 'newEnergyCloud', title: '电站监视', icon: 'iconfont icon-guanlishouye', routeName: 'monitoringSummary', disabled: false },
            { moduleScope: 'newEnergyCloud', title: '视频监视', icon: 'iconfont icon-guanlishouye', routeName: 'videoSurveillanceNew', disabled: false },
            { moduleScope: 'newEnergyCloud', title: '运行分析', icon: 'iconfont icon-guanlishouye', routeName: 'analyzeSummary', disabled: false },
            { moduleScope: 'newEnergyCloud', title: '行动方案', icon: 'iconfont icon-guanlishouye', routeName: 'actionPlanSummary', disabled: false },
            { moduleScope: 'newEnergyCloud', title: '运维人员', icon: 'iconfont icon-guanlishouye', routeName: 'maintenancePersonSummary', disabled: false },
            { moduleScope: 'newEnergyCloud', title: '生产管理', icon: 'iconfont icon-guanlishouye', routeName: 'productionManageSummary', disabled: false },
            { moduleScope: 'newEnergyCloud', title: '高效运维', icon: 'iconfont icon-fenxishouye', routeName: 'efficientOperationSummary', disabled: false },
            { moduleScope: 'newEnergyCloud', title: '运维知识', icon: 'iconfont icon-guanlishouye', routeName: 'knowledgeBaseSummary', disabled: false },
            { moduleScope: 'newEnergyCloud', title: '数据报表', icon: 'iconfont icon-guanlishouye', routeName: 'dataReportSummary', disabled: false },
            { moduleScope: 'newEnergyCloud', title: '共享数据', icon: 'iconfont icon-guanlishouye', routeName: 'dataShareSummary', disabled: false },
            { moduleScope: 'newEnergyCloud', title: '专家分析', icon: 'iconfont icon-guanlishouye', routeName: 'expertAnalysis', disabled: false },
            { moduleScope: 'newEnergyCloud', title: '数据导出', icon: 'iconfont icon-guanlishouye', routeName: 'dataExport', disabled: false },
            { moduleScope: 'newEnergyCloud', title: '结算电量', icon: 'iconfont icon-guanlishouye', routeName: 'settlementAmount', disabled: false },
            { moduleScope: 'newEnergyCloud', title: '数据查询', icon: 'iconfont icon-guanlishouye', routeName: 'dataQuery', disabled: false },
            // { title: '合同管理', icon: 'iconfont icon-guanlishouye', routeName: 'contractManage', disabled: false },
            { moduleScope: 'newEnergyCloud', title: '运行状态调整', icon: 'iconfont icon-guanlishouye', routeName: 'runStatus', disabled: false },
            { moduleScope: 'newEnergyCloud', title: '运行配置', icon: 'iconfont icon-guanlishouye', routeName: 'workingConfigure', disabled: false }
        ]
    },
    {
        title: '视频监视',
        icon: 'iconfont icon-gongren-',
        disabled: false,
        children: [
            { moduleScope: 'newEnergyCloud', title: '', icon: 'iconfont icon-xiangqing1', routeName: 'videoSurveillance', disabled: false },
            { moduleScope: 'newEnergyCloud', title: '智能视频监视', icon: 'iconfont icon-xiangqing1', routeName: 'smartVideo', disabled: false }
        ]
    },
    {
        title: '运维管理',
        icon: 'iconfont icon-gongren-',
        disabled: false,
        children: [
            { moduleScope: 'MochaITOM', title: '', icon: 'iconfont icon-xiangqing1', routeName: 'home', disabled: false },
            { moduleScope: 'MochaITOM', title: '共享人员管理', icon: 'iconfont icon-xiangqing1', routeName: 'sharePeopleManagement', disabled: false },
            { moduleScope: 'MochaITOM', title: '历史统计', icon: 'iconfont icon-xiangqing1', routeName: 'operHistorStatic', disabled: false },
            { moduleScope: 'MochaITOM', title: '运维报表', icon: 'iconfont icon-xiangqing1', routeName: 'operationsRepository', disabled: false },
            { moduleScope: 'MochaITOM', title: '红包统计', icon: 'iconfont icon-xiangqing1', routeName: 'redEnvelopeStatistics', disabled: false },
            { moduleScope: 'MochaITOM', title: '运维知识', icon: 'iconfont icon-xiangqing1', routeName: 'knowledgeBaseTest', disabled: false },
            { moduleScope: 'newEnergyCloud', title: '结算电量', icon: 'iconfont icon-xiangqing1', routeName: 'settlementPower', disabled: false }
        ]
    }
    // {
    //     title: '系统管理',
    //     icon: 'iconfont icon-gongren-',
    //     disabled: false,
    //     children: [
    //         { title: '角色管理', icon: 'iconfont icon-xiangqing1', routeName: 'roleAuthorityManagement', disabled: false },
    //         { title: '角色管理', icon: 'iconfont icon-xiangqing1', routeName: 'roleManagement', disabled: false },
    //         { title: '电站管理', icon: 'iconfont icon-xiangqing1', routeName: 'stationManage', disabled: false },
    //         { title: '企业信息管理', icon: 'iconfont icon-xiangqing1', routeName: 'newTab_businessManagement', disabled: false }
    //     ]
    // }
]
