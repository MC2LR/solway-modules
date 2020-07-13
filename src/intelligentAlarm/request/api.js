import { get } from '@comm/request/http'
import packing from '@comm/request/apiPacking'
import { independent } from '@comm/tools/env'

let baseApi = 'microplat'
if (process.env.NODE_ENV === 'development' && independent) baseApi = '/microplat'

/* 下面是运行状态调整接口 */

// 报警规则分页查询
export const api＿getAlarmConfig = (option = {}) => packing(get, baseApi + '/api/msgpush/bigdataAlarmConfig/getAlarmConfig', option)
// 获取新能云菜单
export const queryCurrentMenu = (option = {}) => packing(get, baseApi + '/api/auth/userAccess/queryCurrentMenu', option)
// 获得当前用户信息
export const getCurrentInfo = (option = {}) => packing(get, baseApi + '/api/auth/userAccess/getCurrentInfo', option)
// 获取电站树形结构
export const queryStWithTree = (option = {}) => packing(get, baseApi + '/api/auth/userAccess/queryStWithTree', option)
// 切换电站
export const changeBusiType = (option = {}) => packing(get, baseApi + '/api/auth/userAccess/changeBusiType', option)
// 回首页(电脑版专用)
export const goHome = (option = {}) => packing(get, baseApi + '/api/auth/userAccess/goHome', option)
// 获取当前角色下电站类型stcls列表
export const queryCurrentStcls = (option = {}) => packing(get, baseApi + '/api/auth/userAccess/queryCurrentStcls', option)
// 获得角色列表 --> PC
export const queryRole4Web = (option = {}) => packing(get, baseApi + '/api/auth/userAccess/queryRole4Web', option)
// 切换用户角色 --> PC
export const changeRole4Web = (option = {}) => packing(get, baseApi + '/api/auth/userAccess/changeRole4Web', option)
// 获得当前用户基本信息
export const getAccountInfo = (option = {}) => packing(get, baseApi + '/api/auth/userAccess/getAccountInfo', option)
