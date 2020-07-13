// import { get, postForm } from '@comm/request/http'
// import packing from '@comm/request/apiPacking'
// import { independent } from '@comm/tools/env'

// let baseApi = ''
// if (process.env.NODE_ENV === 'development' && independent) baseApi = '/api'

// /* 下面是运行状态调整接口 */

// // 集团列表 /BaseSearchCondition/getAllComByRole.htm?stClass=01
// export const api＿baseSearchConditionGetAllComByRole = (option = {}) => packing(get, baseApi + '/BaseSearchCondition/getAllComByRole.htm', option)
// // 电站列表 /BaseSearchCondition/getStByRoleAndComIds.htm?stClass=01&comIds=181,135,106,176,170,177,182,178
// export const api＿baseSearchConditionGetStByRoleAndComIds = (option = {}) => packing(get, baseApi + '/BaseSearchCondition/getStByRoleAndComIds.htm', option)
// // 设备列表 /BaseSearchCondition/getDeviceByStIdsAndDeviceType.htm?stIds=&deviceTypes=
// export const api＿baseSearchConditionGetDeviceByStIdsAndDeviceType = (option = {}) => packing(get, baseApi + '/BaseSearchCondition/getDeviceByStIdsAndDeviceType.htm', option)
// // 设备列表 /BaseSearchCondition/getDeviceByStIdsAndDeviceTypePage.htm?stIds=&deviceTypes=
// export const api＿baseSearchConditionGetDeviceByStIdsAndDeviceTypePage = (option = {}) => packing(get, baseApi + '/BaseSearchCondition/getDeviceByStIdsAndDeviceTypePage.htm', option)
// // /stateAdjust/getStateAdjustListByPage.htm  获取运行状态调整列表
// export const api＿stateAdjustGetStateAdjustListByPage = (option = {}) => packing(get, baseApi + '/stateAdjust/getStateAdjustListByPage.htm', option)
// // /stateAdjust/exportStateAdjustList.htm  获取运行状态调整列表 导出
// export const api＿stateAdjustexportStateAdjustList = baseApi + '/stateAdjust/exportStateAdjustList.htm'
// // /stateAdjust/saveStateAdjust.htm  保存运行状态调整
// export const api＿stateAdjustSaveStateAdjust = (option = {}) => packing(postForm, baseApi + '/stateAdjust/saveStateAdjust.htm', option)
// // /stateAdjust/getStateAdjustById.htm  根据日志id查询运行状态调整 参数 id:日志id
// // export const api＿stateAdjustGetStateAdjustById = (option = {}) => packing(get, baseApi + '/stateAdjust/getStateAdjustById.htm', option)
// // /stateAdjust/deleteStateAdjust.htm  删除运行状态调整 参数 ids:数据id(数组)
// export const api＿stateAdjustDeleteStateAdjust = (option = {}) => packing(postForm, baseApi + '/stateAdjust/deleteStateAdjust.htm', option)
// // 设备日志列表 /deviceLogNew/deviceLogListByPageAndStartTime.htm
// export const api＿deviceLogNewDeviceLogListByPageAndStartTime = (option = {}) => packing(get, baseApi + '/deviceLogNew/deviceLogListByPageAndStartTimeNew.htm', option)
// // '/Basedictionary/selectAll.htm'  事件类型 dicType: EVENT_TYPE   故障类型列表接口   光伏：dictType传  FAULT_REAL_TYPE  风电：dictType传  WT_SYSTEM
// export const api＿BasedictionarySelectAll = (option = {}) => packing(postForm, baseApi + '/Basedictionary/selectAll.htm', option)
// // /deviceLogNew/getDeviceLogById.htm  根据日志id获取日志
// export const api＿deviceLogNewGetDeviceLogById = (option = {}) => packing(get, baseApi + '/deviceLogNew/getDeviceLogByIdNew.htm', option)
