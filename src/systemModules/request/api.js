import { get, postForm } from '@comm/request/http'
import packing from '@comm/request/apiPacking'
import { independent } from '@comm/tools/env'

let baseApi = ''
if (process.env.NODE_ENV === 'development' && independent) baseApi = '/api'

// 系统模块列表
export const api＿moduleList = (option = {}) => packing(get, baseApi + '/moduleInfo/selectByCondition.htm', option)
// 模块添加、编辑
export const api＿moduleUpdate = (option = {}) => packing(postForm, baseApi + '/moduleInfo/update.htm', option)
// 模块删除
export const api＿moduleDelete = (option = {}) => packing(postForm, baseApi + '/moduleInfo/delete.htm', option)
// 按钮保存
export const api＿buttonUpdate = (option = {}) => packing(postForm, baseApi + '/moduleBtn/update.htm', option)
// 按钮删除
export const api＿buttonDelete = (option = {}) => packing(postForm, baseApi + '/moduleBtn/delete.htm', option)
