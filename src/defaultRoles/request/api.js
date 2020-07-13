// import { get, postForm } from '@comm/request/http'
import { get, postForm, postJson } from '@comm/request/http'
import packing from '@comm/request/apiPacking'
import { independent } from '@comm/tools/env'

let baseApi = ''
if (process.env.NODE_ENV === 'development' && independent) baseApi = '/api'

// 默认角色列表
export const api＿selectConfigDefaultRoleModules = (option = {}) => packing(get, baseApi + '/moduleCompanyTemplate/selectConfigDefaultRoleModules.htm', option)
// 默认角色 按钮 操作
export const api＿updateConfigDefaultRoleModule = (option = {}) => packing(postJson, baseApi + '/moduleCompanyTemplate/updateConfigDefaultRoleModule.htm', option)
// 接收消息类型
export const api＿selectAll = (option = {}) => packing(get, baseApi + '/Basedictionary/selectAll.htm', { invariant: { dictType: 'ROLE_REC_MSG_TYPE_CODE' }, ...option })
// 获取角色接收信息模版
export const api＿getByRoleType = (option = {}) => packing(get, baseApi + '/moduleRoleRecmsgTemplate/getByRoleType.htm', option)
// 角色接收信息保存
export const api＿roleMsgUpdate = (option = {}) => packing(postForm, baseApi + '/moduleRoleRecmsgTemplate/update.htm', option)
// 获取该角色未配置模块列表
export const api＿queryUnSelectModules = (option = {}) => packing(get, baseApi + '/moduleCompanyTemplate/queryUnSelectModules.htm', option)
// 保存  给某角色下配置默认模块
export const api＿updateConfigDefaultRoleModules = (option = {}) => packing(postJson, baseApi + '/moduleCompanyTemplate/updateConfigDefaultRoleModules.htm', option)
// 删除  某角色下的模块
export const api＿roleDeleteModule = (option = {}) => packing(postForm, baseApi + '/moduleCompanyTemplate/delete.htm', option)
