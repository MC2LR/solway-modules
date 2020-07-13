import { get, postForm, postJson, upload } from '@comm/request/http'
import packing from '@comm/request/apiPacking'
import { independent } from '@comm/tools/env'

let baseApi = ''
if (process.env.NODE_ENV === 'development' && independent) baseApi = '/oldApi'
// if (process.env.NODE_ENV === 'development' && independent) baseApi = '/api'

export {baseApi}

// 组织机构管理
// 机构列表-tree
export const api＿organizationTreeList = (option = {}) => packing(get, baseApi + '/sys/organization/company/list.htm', option)
// 机构保存
export const api＿organizationUpdate = (option = {}) => packing(postForm, baseApi + '/sys/organization/update.htm', option)
// 机构删除-批量
export const api＿organizationDeleteBatch = (option = {}) => packing(postForm, baseApi + '/sys/organization/delete/batch.htm', option)
// 公告未读条数
export const api＿getNoticeUnreadCount = (option = {}) => packing(get, baseApi + '/BaseNotice/getNoticeUnreadCount.htm', option)
// 邀请消息条数
export const api＿getCompanyInviteCount = (option = {}) => packing(get, baseApi + '/BaseMessage/queryCompanyInviteCount.htm', option)
// 邀请消息列表
export const api＿getCompanyInviteList = (option = {}) => packing(get, baseApi + '/BaseMessage/queryCompanyInvite.htm', option)
// 邀请消息处理
export const api＿getCompanyInviteHandle = (option = {}) => packing(get, baseApi + '/authComUserRel/handleCompanyInvite.htm', option)
// 当前电站基本信息 /UserAuthHandle/getCurrentInfoNew.htm
// export const api＿userAuthHandleGetCurrentInfoNew = (option = {}) => packing(get, baseApi + '/UserAuthHandle/getCurrentInfoNew.htm', option)
export const api＿userAuthHandleGetCurrentInfoNew = (option = {}) => packing(get, baseApi + '/UserAuthHandle/getCurrentAccountInfo.htm', option)
// 用户基本信息
export const api＿getLoginUser = (option = {}) => packing(get, baseApi + '/Login/getLoginUser.htm', option)
// 菜单管理 /UserAuthHandle/queryCurrentMenu?version=3
export const api＿queryCurrentMenu = (option = {}) => packing(get, baseApi + '/UserAuthHandle/queryCurrentMenu.htm', option)
// 电站类型列表
export const api＿getSTClassLIst = (option = {}) => packing(get, baseApi + '/UserAuthHandle/queryCurrentStcls.htm', option)
// 电站tree 部门
export const api＿queryStWithTree = (option = {}) => packing(get, baseApi + '/UserAuthHandle/queryStWithTree.htm', option)
// 电站tree 行政区域
export const api＿queryRegionStWithTree = (option = {}) => packing(get, baseApi + '/UserAuthHandle/queryRegionStWithTree.htm', option)
// 切电站 /UserAuthHandle/changeDataType.htm
export const api＿changeDataType = (option = {}) => packing(get, baseApi + '/UserAuthHandle/changeDataType.htm', option)
// 切电站 默认电站  默认选中第一个 /UserAuthHandle/setSTClass.htm
export const api＿defaultStation = (option = {}) => packing(get, baseApi + '/UserAuthHandle/setSTClass.htm', option)
// 上海地铁首页
// 电站发电量收益列表（多期）
export const api＿queryCurrStProfit = (option = {}) => packing(get, baseApi + '/cust/st/acqu/elec/queryCurrStProfit.htm', option)
// 累计发电量（一期）
export const api＿powerTotalOfDepStation = (option = {}) => packing(get, baseApi + '/opSettlementPower/analysisByTotalElecOfDeptStation.htm', option)
// 首页接口 /UserAuthHandle/goHome.htm
export const api＿goHome = (option = {}) => packing(get, baseApi + '/UserAuthHandle/goHome.htm', option)
// 获取所有角色列表
export const api＿getRoleListForPC = (option = {}) => packing(get, baseApi + '/UserAuthHandle/getRoleListForPC.htm', option)
// 切换角色
export const api＿changeRoleNew = (option = {}) => packing(get, baseApi + '/UserAuthHandle/changeRoleNew.htm', option)
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
// 列表视图-光伏-集团-列表 + 不同状态的设备数量
export const api＿getRunStatusInfoList = (option = {}) => packing(get, baseApi + '/pv/monitor/getRunStatusInfoList.htm', option)
// 列表视图-风电-集团-列表 + 不同状态的设备数量
export const api＿getWpRunStatusInfoList = (option = {}) => packing(get, baseApi + '/wp/monitor/getRunStatusInfoList.htm', option)
// 列表视图-风电-电站-风机
export const api＿getRunRealDataWindTurbine = (option = {}) => packing(get, baseApi + '/wp/monitor/getRunRealDataWindTurbine.htm', option)
// 列表视图-风电-电站-测风塔
export const api＿getRunRealDataWindTower = (option = {}) => packing(get, baseApi + '/wp/monitor/getRunRealDataWindTower.htm', option)
// 电站的接线图信息
export const api＿wiringdiagramSelectByCondition = (option = {}) => packing(get, baseApi + '/bWiringdiagramConfig/selectByCondition.htm', option)
// 接线图svg的状态数据
export const api＿wiringGetSvgData = (option = {}) => packing(get, baseApi + '/wiringDiagram/getSvgData.htm', option)
// 接线图-设备事件-查询
export const api＿rtmDeviceLogWiringdiagram = (option = {}) => packing(get, baseApi + '/wiringDiagram/getLogData.htm', option)
// 接线图的设备所有测点列表
export const api＿queryPointsWiringdiagram = (option = {}) => packing(get, baseApi + '/bWiringdiagramPointConfig/queryPoints.htm', option)
// 接线图详情弹框table列表
export const api＿getSvgHisDataWiringdiagram = (option = {}) => packing(get, baseApi + '/wiringDiagram/getSvgHisData.htm', option)
// 接线图详情弹框-实时数据
export const api＿getSvgRtmDataWiringdiagram = (option = {}) => packing(get, baseApi + '/wiringDiagram/getSvgRtmData.htm', option)
// 首页地图接口
export const api＿getPowerStationStatusDataNew2 = (option = {}) => packing(get, baseApi + '/MobileRtmDeviceMonitor/getPowerStationStatusDataNew2.htm', option)
export const api＿queryStationStatusMapData = (option = {}) => packing(get, baseApi + '/pvwp/station/queryStationStatusMapData.htm', option)
// 实景图 pvwp/station/pics
export const api＿stationPics = (option = {}) => packing(get, baseApi + '/pvwp/station/pics.htm', option)
// 设备信息获取设备类型，设备id
export const api＿getDeviceInfo = (option = {}) => packing(get, baseApi + '/pvwp/device/getDeviceInfo.htm', option)
// 查询当前 集团 或 电站 设备类型下所有设备
export const api＿queryDeviceWithType = (option = {}) => packing(get, baseApi + '/pvwp/device/queryDeviceWithType.htm', option)

// 设备 历史数据 /HistoryData/getNewHistoryData.htm
export const api＿deviceHistoryData = (option = {}) => packing(get, baseApi + '/HistoryData/getNewHistoryData.htm', option)
// 设备 历史数据 风电 /wpHistoryData/getWpHistoryData.htm
export const api＿wpDeviceHistoryData = (option = {}) => packing(get, baseApi + '/wpHistoryData/getWpHistoryData.htm', option)
// 设备 故障信息 /FaultAlarm/faultAlarmList.htm
export const api＿faultAlarmList = (option = {}) => packing(get, baseApi + '/FaultAlarm/faultAlarmList.htm', option)
// 设备 实时信息 状态更新时间 /pvwp/device/getDeviceRunStatus.htm?eqid&type
export const api＿deviceRunStatus = (option = {}) => packing(get, baseApi + '/pvwp/device/getDeviceRunStatus.htm', option)
// 设备 故障码 pvwp//deviceFaultCode?stcls=01或02&stid=eqid  当前设备都有哪些故障码
export const api＿deviceFaultCode = (option = {}) => packing(get, baseApi + '/pvwp/device/faultCode.htm', option)
// 设备 故障码 pvwp/protocolCodes?protocolId
export const api＿protocolCodes = (option = {}) => packing(get, baseApi + '/pvwp/device/protocolCodes.htm', option)

// 逆变器 基本信息 /InverterStanding/inverterCount.htm
export const api＿inverterCount = (option = {}) => packing(get, baseApi + '/InverterStanding/inverterCount.htm', option)
// 逆变器 小时数获取 /InverterStanding/getInverterHours.htm
export const api＿inverterHours = (option = {}) => packing(get, baseApi + '/InverterStanding/getInverterHours.htm', option)
// 逆变器 实时数据 /pv/monitorData/getSingleRealDataBInverter.htm
export const api＿singleRealDataBInverter = (option = {}) => packing(get, baseApi + '/pv/monitorData/getSingleRealDataBInverter.htm', option)

// 汇流箱 基本信息 /BjunctionStanding/bjunctionCount.htm
export const api＿bjunctionCount = (option = {}) => packing(get, baseApi + '/BjunctionStanding/bjunctionCount.htm', option)
// 汇流箱 小时数获取 /BjunctionStanding/getJunctionBoxHours.htm
export const api＿junctionBoxHours = (option = {}) => packing(get, baseApi + '/BjunctionStanding/getJunctionBoxHours.htm', option)
// 汇流箱 实时数据 /pv/monitorData/getSingleRealDataBJunction.htm
export const api＿getSingleRealDataBJunction = (option = {}) => packing(get, baseApi + '/pv/monitorData/getSingleRealDataBJunction.htm', option)

// 箱变 基本信息 /BboxChange/bboxChangeCount.htm
export const api＿bboxChangeCount = (option = {}) => packing(get, baseApi + '/BboxChange/bboxChangeCount.htm', option)
// 箱变 小时数获取 /BboxChange/getBoxChangeHours.htm
export const api＿boxChangeHours = (option = {}) => packing(get, baseApi + '/BboxChange/getBoxChangeHours.htm', option)
// 箱变 实时数据 /DeviceStation/getSingleRealDataBBoxChange.htm
export const api＿getSingleRealDataBBoxChange = (option = {}) => packing(get, baseApi + '/DeviceStation/getSingleRealDataBBoxChange.htm', option)

// 电表 基本信息 /OtherDevice/meterCount.htm
export const api＿meterCount = (option = {}) => packing(get, baseApi + '/OtherDevice/meterCount.htm', option)
// 电表 小时数获取 /OtherDevice/getMeterHours.htm
export const api＿meterHours = (option = {}) => packing(get, baseApi + '/OtherDevice/getMeterHours.htm', option)
// 电表 实时数据 /DeviceStation/getSingleRealDataMeter.htm
export const api＿getSingleRealDataMeter = (option = {}) => packing(get, baseApi + '/DeviceStation/getSingleRealDataMeter.htm', option)

// 气象站 基本信息 /OtherDevice/otherdeviceCount.htm
export const api＿otherdeviceCount = (option = {}) => packing(get, baseApi + '/OtherDevice/otherdeviceCount.htm', option)
// 气象站 小时数获取 /OtherDevice/getWeatherHours.htm
export const api＿weatherHours = (option = {}) => packing(get, baseApi + '/OtherDevice/getWeatherHours.htm', option)
// 气象站 实时数据 /DeviceStation/getSingleRealDataWeather.htm
export const api＿getSingleRealDataWeather = (option = {}) => packing(get, baseApi + '/DeviceStation/getSingleRealDataWeather.htm', option)

// 风机 基本信息
export const api＿getDeviceInfoWidthDialog = (option = {}) => packing(get, baseApi + '/pvwp/device/getDeviceInfoWidthDialog.htm', option)
// 风机 小时数获取 /pvwp/device/getDeviceHours.htm
export const api＿getDeviceHours = (option = {}) => packing(get, baseApi + '/pvwp/device/getDeviceHours.htm', option)
// 风机 子系统 /wp/monitor/getWindTurbineSubSystem.htm
export const api＿getWindTurbineSubSystem = (option = {}) => packing(get, baseApi + '/wp/monitor/getWindTurbineSubSystem.htm', option)
// 风机 子系统 svg 数据 /wp/monitor/getWindTurbineSubSystemRunData.htm
export const api＿getWindTurbineSubSystemRunData = (option = {}) => packing(get, baseApi + '/wp/monitor/getWindTurbineSubSystemRunData.htm', option)
// 风机 实时数据 /wp/monitor/selectWindTurbineSubSystemRunData.htm
export const api＿selectWindTurbineSubSystemRunData = (option = {}) => packing(get, baseApi + '/wp/monitor/selectWindTurbineSubSystemRunData.htm', option)
// 风机 实时故障数据列表 /pvwp/alarm/getRunFaultList.htm
export const api＿getRunFaultList = (option = {}) => packing(get, baseApi + '/pvwp/alarm/getRunFaultList.htm', option)
// 测风塔实时数据 /wp/monitor/getSingleRealtimeWindTower.htm
export const api＿getSingleRealtimeWindTower = (option = {}) => packing(get, baseApi + '/wp/monitor/getSingleRealtimeWindTower.htm', option)

// 设备列表 /PowerStation/selectDevicesByStation?stid&deviceType
export const api＿selectDevicesByStation = (option = {}) => packing(get, baseApi + '/PowerStation/selectDevicesByStation.htm', option)

// 管理视图首页header滚动信息 /cust/welc/msg/curr.htm
export const api＿custWelcMsgCurr = (option = {}) => packing(get, baseApi + '/cust/welc/msg/curr.htm', option)
// 管理视图首页左上角、右下角overview接口 公司
export const api＿getStationRtOverviewComDay = (option = {}) => packing(get, baseApi + '/pvwp/station/rt/overviewCom/day.htm', option)
export const api＿getStationRtOverviewComDayPvWp = (option = {}) => packing(get, baseApi + '/pvwp/station/v2/overview.htm', option)
// query_company_year_elec_detail_stationline_his 电站发电量曲线  光伏
export const api＿queryCompanyYearElecDetailStationlineHis = (option = {}) => packing(get, baseApi + '/his/query.htm', { invariant: { queryCode: 'query_company_year_elec_detail_stationline_his', queryType: 1 }, ...option })
// query_wp_company_year_elec_stationline 电站发电量曲线  风电
export const api＿queryWpCompanyYearElecStationline = (option = {}) => packing(get, baseApi + '/his/query.htm', { invariant: { queryCode: 'query_wp_company_year_elec_stationline', queryType: 1 }, ...option })
// 本期同期完成率发电量曲线  光伏
export const api＿comLineGetStAComRkLine = (option = {}) => packing(get, baseApi + '/comLine/getStAComRkLine.htm', { invariant: { queryType: 1 }, ...option })
// 本期同期完成率发电量曲线  风电
export const api＿queryWpCompanyMonthRangeElecTimeline = (option = {}) => packing(get, baseApi + '/his/query.htm', { invariant: { queryCode: 'query_wp_company_month_range_elec_timeline', queryType: 1 }, ...option })
// 功率曲线-光伏 实时
export const api＿pvMonitorDataGetPvRunAcpTimeList = (option = {}) => packing(get, baseApi + '/pv/monitorData/getPvRunAcpTimeList.htm', option)
// 功率曲线-风电 实时
export const api＿wpMonitorDataGetPvRunAcpTimeList = (option = {}) => packing(get, baseApi + '/wp/monitorData/getRunAcpTimeList.htm', option)
// 功率曲线-光伏 + 风电 实时
export const api＿pvwpGetrunAcpTimeListPvwp = (option = {}) => packing(get, baseApi + '/pvwp/station/getRunAcpTimeList.htm', option)
// 电站数量-光伏 + 风电
export const api＿pvMonitorRunBaseInfo = (option = {}) => packing(get, baseApi + '/pv/monitor/runBaseInfo.htm', { invariant: { dateType: 3, queryType: 1 }, ...option })
// query_company_year_elec_detail_stationline_his 电站运行 总装机量 累计发电量 二氧化碳减排
export const api＿queryStationAccumSubjectHisEndDate = (option = {}) => packing(get, baseApi + '/his/query.htm', { invariant: { queryCode: 'query_station_accum_subject_his_endDate', queryType: 3 }, ...option })
// 电站发电量详情
export const api＿pvwpStationRtOverviewDay = (option = {}) => packing(get, baseApi + '/pvwp/station/rt/overview/day.htm', option)
// 功率曲线-光伏 历史
export const api＿pvMonitorGetKWLine = (option = {}) => packing(get, baseApi + '/pv/monitor/getKWLine.htm', { invariant: { dateType: 3 }, ...option })
// 功率曲线-风电 历史
export const api＿wpMonitorGetKWLine = (option = {}) => packing(get, baseApi + '/wp/monitor/getKWLine.htm', { invariant: { dateType: 3 }, ...option })
// 每日发电量
export const api＿runBaseInfo = (option = {}) => packing(get, baseApi + '/pv/monitor/getRunBaseInfoPvCom.htm', { invariant: { queryType: 1, dateType: 3 }, ...option })
// 每日发电量（支持光伏，风电）
export const api＿getRunBaseInfoAll = (option = {}) => packing(get, baseApi + '/pv/monitor/getRunBaseInfoAll.htm', { invariant: { queryType: 1, dateType: 3 }, ...option })
// 光伏-电站-时间-日 发电量  stId:电站id(不传是从session里面取)  stcls:电站类型   date:2019-12-24  dateType:时间类型  1:年 2:月  3:日
export const api＿comLineGetStRkLineDay = (option = {}) => packing(get, baseApi + '/comLine/getStRkLine.htm', { invariant: { dateType: 3 }, ...option })
// 光伏-电站-时间-月 发电量
export const api＿comLineGetStRkLineMonth = (option = {}) => packing(get, baseApi + '/comLine/getStRkLine.htm', { invariant: { dateType: 2 }, ...option })
// 光伏-电站-时间-年 发电量
export const api＿comLineGetStRkLineYear = (option = {}) => packing(get, baseApi + '/comLine/getStRkLine.htm', { invariant: { dateType: 1 }, ...option })
// 光伏-电站-设备-日 发电量  stId:电站id(不传是从session里面取)  stcls:电站类型   date:2019-12-24  dateType:时间类型  1:年 2:月  3:日
export const api＿comLineGetStDeviceRkLineDay = (option = {}) => packing(get, baseApi + '/comLine/getStDeviceRkLine.htm', { invariant: { dateType: 3 }, ...option })
// 光伏-电站-设备-月 发电量
export const api＿comLineGetStDeviceRkLineMonth = (option = {}) => packing(get, baseApi + '/comLine/getStDeviceRkLine.htm', { invariant: { dateType: 2 }, ...option })
// 光伏-电站-设备-年 发电量
export const api＿comLineGetStDeviceRkLineYear = (option = {}) => packing(get, baseApi + '/comLine/getStDeviceRkLine.htm', { invariant: { dateType: 1 }, ...option })

// 光伏-公司-电站-日 发电量 实时
export const api＿pvMonitorGetRtKWHPowerList = (option = {}) => packing(get, baseApi + '/pv/monitor/getRtKWHPowerList.htm', { invariant: { dateType: 3, queryType: 1, stcls: '01' }, ...option })
// 光伏-公司-时间-日 发电量
export const api＿queryPvMonthElecTimelistV201 = (option = {}) => packing(get, baseApi + '/his/query.htm', { invariant: { queryCode: 'query_pv_month_elec_timelist_v2', queryType: 1 }, ...option })
// 光伏-公司-时间-月 发电量
export const api＿queryPvYearElecTimelistV201 = (option = {}) => packing(get, baseApi + '/his/query.htm', { invariant: { queryCode: 'query_pv_year_elec_timelist_v2', queryType: 1 }, ...option })
// 光伏-公司-时间-年 发电量
export const api＿queryPvAccumElecTimelistV201 = (option = {}) => packing(get, baseApi + '/his/query.htm', { invariant: { queryCode: 'query_pv_accum_elec_timelist_v2', queryType: 1 }, ...option })
// 光伏-公司-电站-日 发电量 历史
export const api＿queryPvDayElecCompanyStationlistV201 = (option = {}) => packing(get, baseApi + '/his/query.htm', { invariant: { queryCode: 'query_pv_day_elec_company_stationlist_v2', queryType: 1 }, ...option })
// 光伏-公司-电站-月 发电量
export const api＿queryPvMonthElecCompanyStationlistV201 = (option = {}) => packing(get, baseApi + '/his/query.htm', { invariant: { queryCode: 'query_pv_month_elec_company_stationlist_v2', queryType: 1 }, ...option })
// 光伏-公司-电站-年 发电量
export const api＿queryPvYearElecCompanyStationlistV201 = (option = {}) => packing(get, baseApi + '/his/query.htm', { invariant: { queryCode: 'query_pv_year_elec_company_stationlist_v2', queryType: 1 }, ...option })

// 风电-电站-时间-日 发电量
export const api＿queryWpMonthElecTimelistV201 = (option = {}) => packing(get, baseApi + '/his/query.htm', { invariant: { queryCode: 'query_wp_month_elec_timelist_v2', queryType: 3 }, ...option })
// 风电-电站-时间-月 发电量
export const api＿queryWpYearElecTimelistV201 = (option = {}) => packing(get, baseApi + '/his/query.htm', { invariant: { queryCode: 'query_wp_year_elec_timelist_v2', queryType: 3 }, ...option })
// 风电-电站-时间-年 发电量
export const api＿queryWpAccumElecTimelistV201 = (option = {}) => packing(get, baseApi + '/his/query.htm', { invariant: { queryCode: 'query_wp_accum_elec_timelist_v2', queryType: 3 }, ...option })
// 风电-电站-设备-日 发电量 历史
export const api＿queryWpDayElecStationDevlistV201 = (option = {}) => packing(get, baseApi + '/his/query.htm', { invariant: { queryCode: 'query_wp_day_elec_station_devlist_v2', queryType: 3 }, ...option })
// 风电-电站-设备-月 发电量
export const api＿queryWpMonthElecStationDevlistV201 = (option = {}) => packing(get, baseApi + '/his/query.htm', { invariant: { queryCode: 'query_wp_month_elec_station_devlist_v2', queryType: 3 }, ...option })
// 风电-电站-设备-年 发电量
export const api＿queryWpYearElecStationDevlistV201 = (option = {}) => packing(get, baseApi + '/his/query.htm', { invariant: { queryCode: 'query_wp_year_elec_station_devlist_v2', queryType: 3 }, ...option })
// 风电-电站-时间/设备-日 发电量 实时
export const api＿wpMonitorGetRtKWHList = (option = {}) => packing(get, baseApi + '/wp/monitor/getRtKWHList.htm', { invariant: { dateType: 3 }, ...option })

// 风电-公司-时间-日 发电量
export const api＿queryWpMonthElecTimelistV202 = (option = {}) => packing(get, baseApi + '/his/query.htm', { invariant: { queryCode: 'query_wp_month_elec_timelist_v2', queryType: 1 }, ...option })
// 风电-公司-时间-月 发电量
export const api＿queryWpYearElecTimelistV202 = (option = {}) => packing(get, baseApi + '/his/query.htm', { invariant: { queryCode: 'query_wp_year_elec_timelist_v2', queryType: 1 }, ...option })
// 风电-公司-时间-年 发电量
export const api＿queryWpAccumElecTimelistV202 = (option = {}) => packing(get, baseApi + '/his/query.htm', { invariant: { queryCode: 'query_wp_accum_elec_timelist_v2', queryType: 1 }, ...option })
// 风电-公司-电站-日 发电量
export const api＿queryWpDayElecCompanyStationlistV202 = (option = {}) => packing(get, baseApi + '/his/query.htm', { invariant: { queryCode: 'query_wp_day_elec_company_stationlist_v2', queryType: 1 }, ...option })
// 风电-公司-电站-月 发电量
export const api＿queryWpMonthElecCompanyStationlistV202 = (option = {}) => packing(get, baseApi + '/his/query.htm', { invariant: { queryCode: 'query_wp_month_elec_company_stationlist_v2', queryType: 1 }, ...option })
// 风电-公司-电站-年 发电量
export const api＿queryWpYearElecCompanyStationlistV202 = (option = {}) => packing(get, baseApi + '/his/query.htm', { invariant: { queryCode: 'query_wp_year_elec_company_stationlist_v2', queryType: 1 }, ...option })

// 获取电站的设备类型
export const api＿getDeviceTypeByStIds = (option = {}) => packing(get, baseApi + '/BaseSearchCondition/getDeviceTypeByStIds.htm', option)
// 获取电站的设备
export const api＿getDeviceByStIdsAndDeviceType = (option = {}) => packing(get, baseApi + '/BaseSearchCondition/getDeviceByStIdsAndDeviceType.htm', option)
// 设备告警-设备列表
export const api＿deviceLogListByPageAndThroughTimeNew = (option = {}) => packing(get, baseApi + '/deviceLogNew/deviceLogListByPageAndThroughTimeNew.htm', option)
// 报表展示 tab
export const api＿reportShowTab = (option = {}) => packing(get, baseApi + '/report/show/tab.htm', option)
// 报表展示 view
export const api＿reportShowView = (option = {}) => packing(get, baseApi + '/report/show/view.htm', option)
// 报表展示 判断用户是否订阅
export const api＿reportShowUserCheckSubscribe = (option = {}) => packing(get, baseApi + '/report/show/userCheckSubscribe.htm', option)
// 报表展示 用户订阅操作
export const api＿reportShowUserDoSubscribe = (option = {}) => packing(postForm, baseApi + '/report/show/userDoSubscribe.htm', option)
// 报表导出
export const api＿reportShowExcel = baseApi + '/report/show/excel.htm'

// 设备矩阵视图
export const api＿getDeviceLayoutV2 = (option = {}) => packing(get, baseApi + '/RtmDeviceLayout/getDeviceLayoutV2.htm', option)
// 损失分析-能流图
export const api＿getStationEnergy = (option = {}) => packing(get, baseApi + '/pvAnalyze/getStationEnergy.htm', { invariant: { queryType: 3 }, ...option })
// 积灰分析-电站基本信息
export const api＿stationDustInfo = (option = {}) => packing(get, baseApi + '/pvAnalyze/stationDustInfo.htm', option)
// 积灰分析-电站及周围电站曲线（左上）
export const api＿dustStationAnd50kmLine = (option = {}) => packing(get, baseApi + '/pvAnalyze/dustStationAnd50kmLine.htm', option)
// 积灰分析-清洗记录（左中）
export const api＿queryPvStationCleanSeList = (option = {}) => packing(get, baseApi + '/his/query.htm', { invariant: { queryCode: 'query_pv_station_clean_se_list', queryType: 3 }, ...option })
// 积灰分析-清洗记录（左中）-弹框
export const api＿getDustCleanLine = (option = {}) => packing(get, baseApi + '/pvAnalyze/getDustCleanLine.htm', option)
// 积灰分析-清洗计算器（左下）
export const api＿cleanCalculator = (option = {}) => packing(get, baseApi + '/pvAnalyze/cleanCalculator.htm', option)
// 最近三天 天气
export const api＿stationMonitorWeather3day = (option = {}) => packing(get, baseApi + '/ce/station/monitor/weather3day.htm', option)
// 积灰分析- 设备损失电量曲线（右上）
export const api＿queryPvDeviceInvDustWeSeLine = (option = {}) => packing(get, baseApi + '/his/query.htm', { invariant: { queryCode: 'query_pv_device_inv_dust_we_se_line', queryType: 3 }, ...option })
// 积灰分析-所有设备曲线图（右中）
export const api＿deviceDustALine = (option = {}) => packing(get, baseApi + '/pvAnalyze/deviceDustALine.htm', option)
// 分析首页-发电情况曲线
export const api＿queryPvCompanyAnalysisElecSeLine = (option = {}) => packing(get, baseApi + '/his/query.htm', { invariant: { queryCode: 'query_pv_company_analysis_elec_se_line', queryType: 1 }, ...option })
// 分析首页-发电情况
export const api＿queryPvCompanyAnalysisElecSe = (option = {}) => packing(get, baseApi + '/his/query.htm', { invariant: { queryCode: 'query_pv_company_analysis_elec_se', queryType: 1 }, ...option })
// 分析首页-故障情况
export const api＿queryPvCompanyAnalysisWeSe = (option = {}) => packing(get, baseApi + '/his/query.htm', { invariant: { queryCode: 'query_pv_company_analysis_we_se', queryType: 1 }, ...option })
// 分析首页-故障情况曲线
export const api＿queryPvCompanyAnalysisWeSeLine = (option = {}) => packing(get, baseApi + '/his/query.htm', { invariant: { queryCode: 'query_pv_company_analysis_we_se_line', queryType: 1 }, ...option })
// 分析首页-阴影损失电量曲线
export const api＿queryPvCompanyAnalysisShadowSe = (option = {}) => packing(get, baseApi + '/his/query.htm', { invariant: { queryCode: 'query_pv_company_analysis_shadow_se', queryType: 1 }, ...option })
// 分析首页-积灰损失电量曲线
export const api＿queryPvCompanyAnalysisDustSe = (option = {}) => packing(get, baseApi + '/his/query.htm', { invariant: { queryCode: 'query_pv_company_analysis_dust_se', queryType: 1 }, ...option })

// 电站基本信息 /his/query.htm?queryCode=query_pv_station_analysis_info_se&queryType=3&startDate=2019-11-11&endDate=2020-01-01
export const api＿queryPvStationAnalysisInfoSe = (option = {}) => packing(get, baseApi + '/his/query.htm', { invariant: { queryCode: 'query_pv_station_analysis_info_se', queryType: 3 }, ...option })
// 分析 设备监视 逆变器分组 /BaseSearchCondition/selectDeviceGroup.htm?stId=3002
export const api＿selectDeviceGroup = (option = {}) => packing(get, baseApi + '/BaseSearchCondition/selectDeviceGroup.htm', option)
// 分析 设备监视 电站监视设备列表 /pvAnalyze/deviceMonitorList.htm?startDate=2019-11-11&endDate=2020-01-01&sort=dust_we,desc&groupIds=1,2,3
export const api＿deviceMonitorList = (option = {}) => packing(get, baseApi + '/pvAnalyze/deviceMonitorList.htm', option)
// 电站故障损失曲线  sort=fail_count,desc
export const api＿queryPvDeviceInvWeSeLine = (option = {}) => packing(get, baseApi + '/his/query.htm', { invariant: { queryCode: 'query_pv_device_inv_we_se_line', queryType: 3 }, ...option })
// 电站故障记录  deviceId=10,12,14&stId=3002  deviceId 传 下拉框接口返回的数据中的 deviceSerialNnumber的值
export const api＿pvAnalyzeDeviceFaultLog = (option = {}) => packing(get, baseApi + '/pvAnalyze/deviceFaultLog.htm', option)
// 电站故障趋势图  startDate=2019-01-01  endDate=2020-01-01  stId=3002 faultDesc=孤岛 serialNumber=10 deviceType=2
export const api＿pvAnalyzeDeviceFaultLogTrendChart = (option = {}) => packing(get, baseApi + '/pvAnalyze/deviceFaultLogTrendChart.htm', option)

// 逆变器 设备自定义布局 保存逆变器坐标  /pvAnalyze/saveDeviceCoordinate.htm 参数 stId=3002 deviceList:[{eqid:10,axisX:1,axisY:0},{eqid:12,axisX:12,axisY:10}]
export const api＿saveDeviceCoordinate = (option = {}) => packing(postForm, baseApi + '/pvAnalyze/saveDeviceCoordinate.htm', option)
// 逆变器 获取逆变器坐标以及信息  /pvAnalyze/getCoordinate.htm?startDate=2020-01-08&endDate=2020-01-14&stId=3002
export const api＿getCoordinate = (option = {}) => packing(get, baseApi + '/pvAnalyze/getCoordinate.htm', option)

// 专家分析 数据类型，数据源，维度，指标接口 /opHighAnalysis/selectAnlsTypeV2.htm?stationClass=01
export const api＿selectAnlsTypeV2 = (option = {}) => packing(get, baseApi + '/opHighAnalysis/selectAnlsTypeV2.htm', option)
// 专家分析 查询接口 /pvwp/high/analysis/v2/selectAnlsType.htm
export const api＿analysisSelectAnlsType = (option = {}) => packing(postJson, baseApi + '/pvwp/high/analysis/v2/selectAnlsType.htm', option)
// 专家分析 模板保存更新 /user/high/analysis/tpl/update
export const api＿analysisTplUpdate = (option = {}) => packing(postForm, baseApi + '/user/high/analysis/tpl/update.htm', option)
// 专家分析 模板列表 /user/high/analysis/tpl/list
export const api＿analysisTplList = (option = {}) => packing(get, baseApi + '/user/high/analysis/tpl/list.htm', option)
// 专家分析 模板列表分页 /user/high/analysis/tpl/page
export const api＿analysisTplPage = (option = {}) => packing(get, baseApi + '/user/high/analysis/tpl/page.htm', option)
// 专家分析 模板删除 /user/high/analysis/tpl/delete
export const api＿analysisTplDelete = (option = {}) => packing(postForm, baseApi + '/user/high/analysis/tpl/delete.htm', option)

// 阴影分析-阴影损失电量曲线
export const api＿queryPvDeviceInvShadowWeSeLine = (option = {}) => packing(get, baseApi + '/his/query.htm', { invariant: { queryCode: 'query_pv_device_inv_shadow_we_se_line', queryType: 3 }, ...option })
// 阴影分析-阴影设备列表  startDate=2019-08-07&endDate=2019-08-31&eqId=24
export const api＿pvAnalyzeGetShadowDeviceList = (option = {}) => packing(get, baseApi + '/pvAnalyze/getShadowDeviceList.htm', option)
// 阴影分析-阴影组串列表  startDate=2019-01-11&endDate=2019-08-08&st_eqid=3002-24
export const api＿queryPvStringShadowSeList = (option = {}) => packing(get, baseApi + '/his/query.htm', { invariant: { queryCode: 'query_pv_string_shadow_se_list', queryType: 3 }, ...option })
// 阴影分析-阴影弹窗-曲线2  startDate=2019-08-07&endDate=2019-08-31&eqId=24&stringId=1
export const api＿pvAnalyzeGetShadowStringLine = (option = {}) => packing(get, baseApi + '/pvAnalyze/getShadowStringLine.htm', option)
// 阴影分析-阴影弹窗-曲线1  date=2020-01-12&stId=3002&eqId=10&deviceType=2
export const api＿pvAnalyzeGetDeviceAMin = (option = {}) => packing(get, baseApi + '/pvAnalyze/getDeviceAMin.htm', option)
// 阴影分析-同时段弹窗  queryType=3&st_eqid=&endDate=&dateType=3&shadowtime=
export const api＿pvAnalysisGetInvShadeAtSameTime = (option = {}) => packing(get, baseApi + '/pv/analysis/getInvShadeAtSameTime.htm', option)
// 导出阴影设备
export const api＿pvwpDeviceStExcel = '/pvwp/device/st/excel.htm'
// 判断电站下是否是小逆还是大逆
export const api＿getDeviceInvJb = (option = {}) => packing(get, baseApi + '/pvwp/device/getDeviceInvJb.htm', option)

// 结算电量
// 电站列表 stClass=01&comIds=181,135,106,176,170,177,182,178
export const api＿baseSearchConditionGetStByRoleAndComIds = (option = {}) => packing(get, baseApi + '/BaseSearchCondition/getStByRoleAndComIds.htm', option)
// 设备列表 /BaseSearchCondition/getDeviceByStIdsAndDeviceType.htm?stIds=&deviceTypes=
export const api＿baseSearchConditionGetDeviceByStIdsAndDeviceType = (option = {}) => packing(get, baseApi + '/BaseSearchCondition/getDeviceByStIdsAndDeviceType.htm', option)
// 设备列表 /BaseSearchCondition/getDeviceByStIdsAndDeviceTypePage.htm?stIds=&deviceTypes=
export const api＿baseSearchConditionGetDeviceByStIdsAndDeviceTypePage = (option = {}) => packing(get, baseApi + '/BaseSearchCondition/getDeviceByStIdsAndDeviceTypePage.htm', option)
// 主页面 列表
export const api＿custStAcquElecGetCustStElecList = (option = {}) => packing(get, baseApi + '/cust/st/acqu/elec/getCustStElecList.htm', option)
// 开票 回款 国网电量
export const api＿custStAcquElecUpdateCustStElec = (option = {}) => packing(postForm, baseApi + '/cust/st/acqu/elec/updateCustStElec.htm', option)
// 电价列表  ?stId=3002
export const api＿custStElecPriceGetElecPriceList = (option = {}) => packing(get, baseApi + '/cust/st/elec/price/getElecPriceList.htm', option)
// 电表列表  ?stId=3002
export const api＿custDeviceMeterGetCustDeviceMeterList = (option = {}) => packing(get, baseApi + '/cust/device/meter/getCustDeviceMeterList.htm', option)
// 电价列表  新增 编辑
export const api＿custStElecPriceSaveElecPrice = (option = {}) => packing(postForm, baseApi + '/cust/st/elec/price/saveElecPrice.htm', option)
// 电价列表  删除
export const api＿custStElecPriceDeleteElecPrice = (option = {}) => packing(get, baseApi + '/cust/st/elec/price/deleteElecPrice.htm', option)
// 电表列表  新增 编辑
export const api＿custDeviceMeterSaveDeviceMeter = (option = {}) => packing(postForm, baseApi + '/cust/device/meter/saveDeviceMeter.htm', option)
// 电表列表  删除
export const api＿custDeviceMeterDeleteDeviceMeter = (option = {}) => packing(get, baseApi + '/cust/device/meter/deleteDeviceMeter.htm', option)
// 抄表列表  stId=3002&date=2020-02
export const api＿custDeviceMeterElecGetCustDeviceMeterElecList = (option = {}) => packing(get, baseApi + '/cust/device/meter/elec/getCustDeviceMeterElecList.htm', option)
// 抄表列表 上传附件
export const api＿minioUploader = (option = {}) => packing(upload, baseApi + '/minio/uploader.htm', option)
// 抄表列表 文件地址  ?ids=
export const api＿minioFiles = (option = {}) => packing(get, baseApi + '/minio/files.htm', option)
// 抄表列表 编辑
export const api＿custDeviceMeterElecSaveCustDeviceMeterElec = (option = {}) => packing(postForm, baseApi + '/cust/device/meter/elec/saveCustDeviceMeterElec.htm', option)
// 抄表导出
export const api＿ureportExcel = baseApi + '/ureport/excel'

// 电站列表
export const api＿powerStationList = (option = {}) => packing(get, baseApi + '/PowerStation/powerStationList.htm', option)
// 某公司下的部门
export const api＿getDepartmentTree = (option = {}) => packing(get, baseApi + '/authDepartment/getDepartmentTree.htm', option)
// 保存电站
export const api＿powerStationUpdate = (option = {}) => packing(postForm, baseApi + '/PowerStation/update.htm', option)
// 删除电站
export const api＿powerStationDelete = (option = {}) => packing(postForm, baseApi + '/PowerStation/delete.htm', option)
// 获取form表单 /dynamic/form/business/query/field.htm?fmId=8
export const api＿dynamicFormBusinessQueryField = (option = {}) => packing(get, baseApi + '/dynamic/form/business/query/field.htm', option)

// 风电列表矩阵接口 设备状态数量 /wp/monitor/getRunStatusInfoList.htm
export const api＿wpGetRunStatusInfoList = (option = {}) => packing(get, baseApi + '/wp/monitor/getRunStatusInfoList.htm', option)

// 电站列表 companyId=
export const api＿userAuthHandleQueryStWithList = (option = {}) => packing(get, baseApi + '/UserAuthHandle/queryStWithList.htm', option)
// 逆变器子阵维护
// 分组列表接口  search.stid_eq=&search.deviceType_eq=2&search.groupName_like=
export const api＿deviceGroupList = (option = {}) => packing(get, baseApi + '/device/group/list.htm', option)
// 分组保存接口  formfield: stid: deviceType: groupName: position: longitude: latitude:
export const api＿deviceGroupUpdate = (option = {}) => packing(postForm, baseApi + '/device/group/update.htm', option)
// 删除分组接口  id=
export const api＿deviceGroupDelete = (option = {}) => packing(postForm, baseApi + '/device/group/delete.htm', option)
// 设备分组接口  deviceType=2&deviceIds=&groupId=&flag=    flag:0 去除分组 1 加入分组
export const api＿deviceGroupDoBind = (option = {}) => packing(postForm, baseApi + '/device/group/do/bind.htm', option)
// 已分组设备接口  stid=&deviceType=2&groupId=
export const api＿deviceGroupListBind = (option = {}) => packing(get, baseApi + '/device/group/list/bind.htm', option)
// 未分组设备接口  stid=&deviceType=2
export const api＿deviceGroupListUnbind = (option = {}) => packing(get, baseApi + '/device/group/list/unbind.htm', option)
