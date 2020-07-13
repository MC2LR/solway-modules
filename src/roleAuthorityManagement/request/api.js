import { get, postForm } from '@comm/request/http'
import packing from '@comm/request/apiPacking'
import { independent } from '@comm/tools/env'

let baseApi = ''
if (process.env.NODE_ENV === 'development' && independent) baseApi = '/api'

// 角色列表
export const api＿roleInformationList = (option = {}) => packing(get, baseApi + '/Role/roleInformationList.htm', option)
// 添加角色
export const api＿updateRole = (option = {}) => packing(postForm, baseApi + '/Role/updateRole.htm', option)
// 获取自定义模块列表
export const api＿selectCustomModules = (option = {}) => packing(get, baseApi + '/moduleCompanyRole/selectCustomModules.htm', option)
// 保存自定义模块
export const api＿updateCustomModules = (option = {}) => packing(postForm, baseApi + '/moduleCompanyRole/updateCustomModules.htm', option)
// 删除角色
export const api＿deleteRole = (option = {}) => packing(postForm, baseApi + '/Role/delete.htm', option)
