// import { get, postForm } from '@comm/request/http'
// import packing from '@comm/request/apiPacking'
// import { independent } from '@comm/tools/env'

// let baseApi = ''
// if (process.env.NODE_ENV === 'development' && independent) baseApi = '/api'

/* 下面是运行状态调整接口 */

// 集团列表 /BaseSearchCondition/getAllComByRole.htm?stClass=01
// export const api＿baseSearchConditionGetAllComByRole = (option = {}) => packing(get, baseApi + '/BaseSearchCondition/getAllComByRole.htm', option)
// 电站列表 /BaseSearchCondition/getStByRoleAndComIds.htm?stClass=01&comIds=181,135,106,176,170,177,182,178
// export const api＿baseSearchConditionGetStByRoleAndComIds = (option = {}) => packing(get, baseApi + '/BaseSearchCondition/getStByRoleAndComIds.htm', option)
// 设备列表 /BaseSearchCondition/getDeviceByStIdsAndDeviceType.htm?stIds=&deviceTypes=
