import { get } from '@comm/request/http'
import packing from '@comm/request/apiPacking'
import { independent } from '@comm/tools/env'

let baseApi = ''
if (process.env.NODE_ENV === 'development' && independent) baseApi = '/oldApi'

let microBaseApi = '/microplat'

export {
    baseApi,
    microBaseApi
}

// 首页 电站数量 装机容量 top /pv/monitor/runBaseInfo.htm date=2020-04-03&dateType=3&queryType=1    queryType 1 集团 3 电站
export const api＿runBaseInfo = (option = {}) => packing(get, baseApi + '/pv/monitor/runBaseInfo.htm', { invariant: { date: new Date().Format('yyyy-MM-dd'), dateType: 3 }, ...option })
// 首页 top 集团 /pvwp/station/overview.htm
export const api＿stationOverview = (option = {}) => packing(get, baseApi + '/pvwp/station/overview.htm', option)
// 首页 top 电站 /overview/single.htm
export const api＿overviewSingle = (option = {}) => packing(get, baseApi + '/pvwp/station/overview/single.htm', option)
// 切换到河南定制单位 /UserAuthHandle/changeLocaleUnit.htm?locale=zh_HENAN
export const api＿changeLocaleUnit = (option = {}) => packing(get, baseApi + '/UserAuthHandle/changeLocaleUnit.htm', option)
// 每日发电量接口 /pv/monitor/getRunBaseInfoPvCom.htm
export const api＿getRunBaseInfoPvCom = (option = {}) => packing(get, baseApi + '/pv/monitor/getRunBaseInfoPvCom.htm', option)
// 获取共享运维派单数量
export const api＿getDispatchTaskCount = (option = {}) => packing(get, microBaseApi + '/api/optask/mainTask/getDispatchTaskCount', option)
// 电站概览-列表接口
export const api＿getRunKWPowerList = (option = {}) => packing(get, baseApi + '/pv/monitor/getRunKWPowerList.htm', option)
// 电站概览-图表
export const api＿getRunKWPowerLine = (option = {}) => packing(get, baseApi + '/pv/monitor/getRunKWPowerLine.htm', option)
// 电站概览-基本信息
export const api＿getRunKWPower = (option = {}) => packing(get, baseApi + '/pv/monitor/getRunKWPower.htm', option)
// 电站概览-投资方列表
export const api＿queryStWithTree = (option = {}) => packing(get, baseApi + '/UserAuthHandle/queryStWithTree.htm', { invariant: { busiType: 3 }, ...option })

// 清洗建议
export const api＿cleanSuggest = (option = {}) => packing(get, baseApi + '/pv/analysis/getActionCompanyCleanSuggestV2.htm', option)

// 河南监视-上-中框内接口
export const api＿getRunAcpStatus = (option = {}) => packing(get, baseApi + '/pv/monitor/getRunAcpStatus.htm', { invariant: {date: new Date().Format('yyyy-MM-dd'), dateType: 3}, ...option })
// 发电量前十，可切换今日PR前十、出力系数前十
// /pv/monitor/getRunKWPowerRanking?fd=&n=10
// fd -->   real_kwh: 发电量; pr: 发电量; kw_r: 出力比; 排行 queryType=3&dateType=0&date=2020-02-15,2020-02-20
export const api＿getRunKWPowerRanking = (option = {}) => packing(get, baseApi + '/pv/monitor/getRunKWPowerRanking.htm', option)

// 首页 日发电量  当月每天
// Request URL: /his/query.htm?date=2020-04-08&queryCode=query_company_month_elec_detail_timelist_his&queryType=1
export const api＿queryCompanyMonthElecDetailTimelistHis = (option = {}) => packing(get, baseApi + '/his/query.htm', {invariant: {
    queryCode: 'query_company_month_elec_detail_timelist_his',
    // queryType: 1,
    date: new Date().Format('yyyy-MM-dd')
},
...option})
// 首页 日发电量  当年每月
// Request URL: /his/query.htm?date=2020-04-08&queryCode=query_company_year_elec_detail_timelist_his&queryType=1
export const api＿queryCompanyYearElecDetailTimelistHis = (option = {}) => packing(get, baseApi + '/his/query.htm', {invariant: {
    queryCode: 'query_company_year_elec_detail_timelist_his',
    // queryType: 1,
    date: new Date().Format('yyyy-MM-dd')
},
...option})
// 近10日历史曲线  /pv/monitor/selectKWLine.htm?queryType=3&dateType=0&date=2020-02-15,2020-02-20
export const api＿pvMonitorSelectKWLine = (option = {}) => packing(get, baseApi + '/pv/monitor/selectKWLine.htm', { invariant: {
    dateType: 0
},
...option})
// 首页词云
export const api＿queryPlatFaultCodeYun = (option = {}) => packing(get, baseApi + '/pvwp/station/queryPlatFaultCodeYun.htm', option)
// 首页故障 集团
export const api＿queryCompanyDeviceFaultAccumInfoHis = (option = {}) => packing(get, baseApi + '/his/query.htm', {invariant: {
    queryCode: 'query_pv_company_device_fault_accum_info_his',
    queryType: 1,
    date: new Date().Format('yyyy-MM-dd')
},
...option})
// 首页故障 电站
export const api＿queryStationDeviceFaultAccumInfoHis = (option = {}) => packing(get, baseApi + '/his/query.htm', {invariant: {
    queryCode: 'query_pv_station_device_fault_accum_info_his',
    queryType: 3,
    date: new Date().Format('yyyy-MM-dd')
},
...option})
// 电站列表 /BaseSearchCondition/getStByRoleAndComIds.htm?stClass=01&comIds=181,135,106,176,170,177,182,178
export const api＿baseSearchConditionGetStByRoleAndComIds = (option = {}) => packing(get, baseApi + '/BaseSearchCondition/getStByRoleAndComIds.htm', {invariant: {
    stClass: '01'
},
...option})
// 电站列表 /UserAuthHandle/queryStWithLocation.htm stcls=
export const api＿queryStWithLocation = (option = {}) => packing(get, baseApi + '/UserAuthHandle/queryStWithLocation.htm', {invariant: {
    // stClass: '01'
},
...option})
// 首页地图电站弹窗
export const api＿stationOverviewDay = (option = {}) => packing(get, baseApi + '/pvwp/station/rt/overview/day.htm', {invariant: {
    stcls: '01'
},
...option})
// 首页最近12个月发电量 his/query.htm?queryType=1&queryCode=query_company_month_range_elec_detail_timelist_his&start_date=2019-09&end_date=2020-04
export const api＿queryCompanyMonthRangeElecDetailTimelistHis = (option = {}) => packing(get, baseApi + '/his/query.htm', {invariant: {
    queryCode: 'query_company_month_range_elec_detail_timelist_his'
},
...option})
// 集团实时功率曲线 Request URL: http://necloud.solway.cn/pv/monitorData/getRunAcpTimeList.htm?dataType=2&date=2020-04-12&dateType=3&queryType=1&stime=1003
export const api＿getRunAcpTimeList = (option = {}) => packing(get, baseApi + '/pv/monitorData/getRunAcpTimeList.htm', {invariant: {
    dataType: '2',
    date: new Date().Format('yyyy-MM-dd'),
    dateType: '3'
    // queryType: '1',
    // stime: '0'
},
...option})
