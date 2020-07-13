import { get } from '@comm/request/http'
import packing from '@comm/request/apiPacking'
import { independent } from '@comm/tools/env'

let baseApi = ''
if (process.env.NODE_ENV === 'development' && independent) baseApi = '/api'

// 综合能源大数据平台 首页
// 综合能源-电站-用电-日-曲线（最近7天用电情况)
export const api＿latestDayGraph = (option = {}) => packing(get, baseApi + '/his/query.htm', {...option, invariant: {queryCode: 'query_ce_station_use_kwh_day_timeline', queryType: 3}})
// 设备类型列表
export const api＿getDeviceTypeList = (option = {}) => packing(get, baseApi + '/DeviceStation/getDeviceType.htm', option)
// 列表视图-设备-箱变
export const api＿getRunRealDataBBoxChange = (option = {}) => packing(get, baseApi + '/pv/monitorData/getRunRealDataBBoxChange.htm', option)
// 列表视图-设备-逆变器
export const api＿getRunRealDataBInverter = (option = {}) => packing(get, baseApi + '/pv/monitorData/getRunRealDataBInverter.htm', option)
// 列表视图-设备-汇流箱
export const api＿getRunRealDataBJunction = (option = {}) => packing(get, baseApi + '/pv/monitorData/getRunRealDataBJunction.htm', option)
// 列表视图-设备-气象
export const api＿getRunRealDataWeather = (option = {}) => packing(get, baseApi + '/pv/monitorData/getRunRealDataWeather.htm', option)
// 列表视图-设备-电表
export const api＿getRunRealDataMeter = (option = {}) => packing(get, baseApi + '/pv/monitorData/getRunRealDataMeter.htm', option)
// 接线图
export const api＿getWiringGraph = (option = {}) => packing(get, baseApi + '/bWiringdiagramConfig/selectByCondition.htm', {...option, invariant: {type: 27}})
// 首页接口 /UserAuthHandle/goHome.htm
export const api＿goHome = (option = {}) => packing(get, baseApi + '/UserAuthHandle/goHome.htm', option)
// 当前电站基本信息 /UserAuthHandle/getCurrentInfoNew.htm
export const api＿userAuthHandleGetCurrentInfoNew = (option = {}) => packing(get, baseApi + '/UserAuthHandle/getCurrentInfoNew.htm', option)
// 设备类型 /ce/device/type
export const api＿ceDeviceType = (option = {}) => packing(get, baseApi + '/ce/device/type.htm', option)
// 设备数量 /ce/device/count/type/mult.htm?types=1,2,3,4,5
export const api＿ceDeviceCountTypeMult = (option = {}) => packing(get, baseApi + '/ce/device/count/type/mult.htm', option)
// 设备容量 /ce/device/capacity/type/mult.htm?types=1,2,3,4,5
export const api＿ceDeviceCapacityTypeMult = (option = {}) => packing(get, baseApi + '/ce/device/capacity/type/mult.htm', option)
// 电站数量 /ce/station/count.htm
export const api＿ceStationCount = (option = {}) => packing(get, baseApi + '/ce/station/count.htm', option)
// 电站光伏装机容量 /ce/station/monitor/pv/capacity.htm
export const api＿ceStationMonitorPvCapacity = (option = {}) => packing(get, baseApi + '/ce/station/monitor/pv/capacity.htm', option)
// 地图 /MobileRtmDeviceMonitor/getPowerStationStatusDataNew2.htm
export const api＿mobileRtmDeviceMonitorGetPowerStationStatusDataNew2 = (option = {}) => packing(get, baseApi + '/MobileRtmDeviceMonitor/getPowerStationStatusDataNew2.htm', option)
// 切电站 /UserAuthHandle/changeDataType.htm
export const api＿UserAuthHandleChangeDataType = (option = {}) => packing(get, baseApi + '/UserAuthHandle/changeDataType.htm', option)
// 综合能源首页弹窗 /ce/device/monitor/rt/overview/type.htm
export const api＿ceDeviceMonitorRtOverviewType = (option = {}) => packing(get, baseApi + '/ce/device/monitor/rt/overview/type.htm', option)
// 地图电站弹窗 /MobileRtmDeviceMonitor/getPowerStationModalShowData.htm?id=4194
export const api＿mobileRtmDeviceMonitorGetPowerStationModalShowData = (option = {}) => packing(get, baseApi + '/MobileRtmDeviceMonitor/getPowerStationModalShowData.htm', option)
// 设备类型的实时数据查询 /ce/device/monitor/rt/single/type.htm?types=25,27,29,23,28,26
export const api＿ceDeviceMonitorRtSingleType = (option = {}) => packing(get, baseApi + '/ce/device/monitor/rt/single/type.htm', option)
// 设备类型的实时数据查询 /ce/device/monitor/rt/single/type/mult.htm?types=25,27,29,23,28,26
export const api＿ceDeviceMonitorRtSingleTypeMult = (option = {}) => packing(get, baseApi + '/ce/device/monitor/rt/single/type/mult.htm', option)
// 光伏系统实时数据 pvwp/station/pvMobileRealTimeDetail
export const api＿pvwpStationPvMobileRealTimeDetail = (option = {}) => packing(get, baseApi + '/pvwp/station/pvMobileRealTimeDetail.htm', { ...option, invariant: {queryType: 3} })
// 光伏系统实时数据 资源天气 /pv/monitor/getRunResList.htm?date=2019-10-10&dateType=3&queryType=3
export const api＿pvMonitorGetRunResList = (option = {}) => packing(get, baseApi + '/pv/monitor/getRunResList.htm', { ...option, invariant: {queryType: 3} })
// 光伏系统实时数据 资源天气
export const api＿stationMonitorWeather = (option = {}) => packing(get, baseApi + '/ce/station/monitor/weather.htm', option)
// 电站列表 /BaseSearchCondition/getStByRoleAndComIds.htm?stClass=01&comIds=181,135,106,176,170,177,182,178
export const api＿baseSearchConditionGetStByRoleAndComIds = (option = {}) => packing(get, baseApi + '/BaseSearchCondition/getStByRoleAndComIds.htm', option)
// 电站监视 实时 /pvwp/station/overview/single.htm
export const api＿pvwpStationOverviewSingle = (option = {}) => packing(get, baseApi + '/pvwp/station/overview/single.htm', option)
// 电站监视 实时 /pvwp/station/rt/overview/day.htm?stid=4177&stcls=01&date=2019-10-17
export const api＿pvwpStationRtOverviewDay = (option = {}) => packing(get, baseApi + '/pvwp/station/rt/overview/day.htm', option)
// 三级页-电站监控-今日-功率趋势图
export const api＿getRunAcpTimeListToday = (option = {}) => packing(get, baseApi + '/pv/monitorData/getRunAcpTimeList.htm', option)
// 三级页-电站监控-历史日-功率趋势图
export const api＿getPowerStationDayAgoTimeLine = (option = {}) => packing(get, baseApi + '/pv/monitor/getKWLine.htm', option)
// 三级页-配电房-设备列表
export const api＿getDeviecList = (option = {}) => packing(get, baseApi + '/ce/device/monitor/rt/device/list.htm', option)

// query_ce_station_device_type_25_load_days_timeline 电站-周-负载-综合能源
export const api＿queryStationDeviceType25Days = (option = {}) => packing(get, baseApi + '/his/query.htm', { invariant: { queryCode: 'query_ce_station_device_type_25_load_days_timeline', queryType: 3 }, ...option })
// query_ce_station_use_kwh_rate_month 电站-日-负荷-综合能源
export const api＿queryStationUseKwhRateMonth = (option = {}) => packing(get, baseApi + '/his/query.htm', { invariant: { queryCode: 'query_ce_station_use_kwh_rate_month', queryType: 3 }, ...option })
// 今日负荷曲线
export const api＿acpline = (option = {}) => packing(get, baseApi + '/ce/station/monitor/acp/line.htm', option)

// 电站状态 /MobileRtmStationStatus/getRtmSingleStationComm.htm?dateString=2019-10-15&stids=3002
export const api＿mobileRtmStationStatusGetRtmSingleStationComm = (option = {}) => packing(get, baseApi + '/MobileRtmStationStatus/getRtmSingleStationComm.htm', option)
// 电站经纬度 /pvwp/station/position.htm
export const api＿pvwpStationPosition = (option = {}) => packing(get, baseApi + '/pvwp/station/position.htm', option)
// query_station_day_elec_4ce 电站-日-电量-综合能源 /his/query.htm?date=2019-10-14&queryCode=&queryType=3
export const api＿queryStationDayElec4ce = (option = {}) => packing(get, baseApi + '/his/query.htm', { invariant: { queryCode: 'query_station_day_elec_4ce', queryType: 3 }, ...option })
// query_station_day_elec_4ce 电站-月-电量-综合能源 /his/query.htm?date=2019-10-14&queryCode=&queryType=3
export const api＿queryStationMonthElec4ce = (option = {}) => packing(get, baseApi + '/his/query.htm', { invariant: { queryCode: 'query_station_month_elec_4ce', queryType: 3 }, ...option })
// query_station_day_elec_4ce 电站-年-电量-综合能源 /his/query.htm?date=2019-10-14&queryCode=&queryType=3
export const api＿queryStationYearElec4ce = (option = {}) => packing(get, baseApi + '/his/query.htm', { invariant: { queryCode: 'query_station_year_elec_4ce', queryType: 3 }, ...option })
// query_station_day_elec_4ce 电站-累计-电量-综合能源 /his/query.htm?date=2019-10-14&queryCode=&queryType=3
export const api＿queryStationAccumElec4ce = (option = {}) => packing(get, baseApi + '/his/query.htm', { invariant: { queryCode: 'query_station_accum_elec_4ce', queryType: 3 }, ...option })
// 设备类型 数据更新时间 /ce/device/monitor/rt/updatetime/type/htm?stid=4177&type=25
export const api＿ceDeviceMonitorRtUpdatetimeType = (option = {}) => packing(get, baseApi + '/ce/device/monitor/rt/updatetime/type.htm', option)
// 设备类型 日月年累计概览 /ce/device/monitor/rt/overview/type/day.htm?type=26
export const api＿ceDeviceMonitorRtOverviewTypeDay = (option = {}) => packing(get, baseApi + '/ce/device/monitor/rt/overview/type/day.htm', option)
// 设备列表数据 /ce/device/monitor/rt/device/list.htm?type=25
export const api＿ceDeviceMonitorRtDeviceList = (option = {}) => packing(get, baseApi + '/ce/device/monitor/rt/device/list.htm', option)
// 设备曲线接口 /ce/device/monitor/rt/type/line.htm?type=25
export const api＿ceDeviceMonitorRtTypeLine = (option = {}) => packing(get, baseApi + '/ce/device/monitor/rt/type/line.htm', option)
// query_ce_station_device_type_26_day_device_list 充电桩列表历史 /his/query.htm?date=2019-10-14&queryCode=&queryType=3
export const api＿queryCeStationDeviceType26DayDevice = (option = {}) => packing(get, baseApi + '/his/query.htm', { invariant: { queryCode: 'query_ce_station_device_type_26_day_device_list', queryType: 3 }, ...option })
// query_ce_station_device_23_info_day 储能历史日 /his/query.htm?date=2019-10-14&queryCode=&queryType=3
export const api＿queryCeStationDevice23InfoDay = (option = {}) => packing(get, baseApi + '/his/query.htm', { invariant: { queryCode: 'query_ce_station_device_23_info_day', queryType: 3 }, ...option })
// 实景图 /pv/monitor/getRunBaseList.htm?date=2019-10-24&dateType=3&queryType=3
export const api＿pvMonitorGetRunBaseList = (option = {}) => packing(get, baseApi + '/pv/monitor/getRunBaseList.htm', { invariant: { queryType: 3, dateType: 3, date: new Date().Format('yyyy-MM-dd') }, ...option })
// query_ce_station_use_kwh_month_comp 本月总用电量
export const api＿queryStationUseKwhMonthComp = (option = {}) => packing(get, baseApi + '/his/query.htm', { invariant: { queryCode: 'query_ce_station_use_kwh_month_comp', queryType: 3 }, ...option })
// query_ce_station_use_kwh_month_comp 本年总用电量
export const api＿queryStationUseKwhYearComp = (option = {}) => packing(get, baseApi + '/his/query.htm', { invariant: { queryCode: 'query_ce_station_use_kwh_year_comp', queryType: 3 }, ...option })
// 实时报警消息
export const api＿getRunAlarmList = (option = {}) => packing(get, baseApi + '/pv/alarm/getRunAlarmList.htm', option)
// 最近三天 天气
export const api＿stationMonitorWeather3day = (option = {}) => packing(get, baseApi + '/ce/station/monitor/weather3day.htm', option)

// 视频第三方接口
// const videoBaseApi = '/videoapi'
// 根据时间获取存储文件信息 https://open.ys7.com/api/lapp/video/by/time
// export const api＿lappVideoByTime = (option = {}) => packing(postForm, videoBaseApi + '/api/lapp/video/by/time', option)
// token 获取 /thirdparty/ys7/token
export const api＿thirdpartyYs7Token = (option = {}) => packing(get, baseApi + '/thirdparty/ys7/token.htm', option)
// 视频代理通用接口 摄像头列表 /thirdparty/ys7/api/data?apiurl=api/lapp/camera/list&pageStart=0&pageSize=20
export const api＿lappCameraList = (option = {}) => packing(get, baseApi + '/thirdparty/ys7/api/data.htm', { invariant: { apiurl: 'api/lapp/camera/list' }, ...option })
// 视频代理通用接口 根据时间获取存储文件信息 /thirdparty/ys7/api/data?apiurl=api/lapp/video/by/time&pageStart=0&pageSize=20
export const api＿lappVideoByTime = (option = {}) => packing(get, baseApi + '/thirdparty/ys7/api/data.htm', { invariant: { apiurl: 'api/lapp/video/by/time' }, ...option })
// 视频代理通用接口 设备抓拍图片 /thirdparty/ys7/api/data?apiurl=api/lapp/device/capture&pageStart=0&pageSize=20
export const api＿lappDeviceCapture = (option = {}) => packing(get, baseApi + '/thirdparty/ys7/api/data.htm', { invariant: { apiurl: 'api/lapp/device/capture' }, ...option })
// 获取摄像头验证码 /ce/video/curr/station/list
export const api＿ceVideoCurrStationList = (option = {}) => packing(get, baseApi + '/ce/video/curr/station/list.htm', option)
// 获取摄像头验证码 /ce/video/validate-code/curr/station
export const api＿ceVideoValidateCodeCurrStation = (option = {}) => packing(get, baseApi + '/ce/video/validate-code/curr/station.htm', option)
