import { get, postForm } from '@comm/request/http'
import packing from '@comm/request/apiPacking'
import { independent } from '@comm/tools/env'

let baseApi = ''
if (process.env.NODE_ENV === 'development' && independent) baseApi = '/api'

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
