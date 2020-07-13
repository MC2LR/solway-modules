import { get, postForm } from '@comm/request/http'
import packing from '@comm/request/apiPacking'
import { independent } from '@comm/tools/env'

let baseApi = ''
if (process.env.NODE_ENV === 'development' && independent) baseApi = '/api'

// 获取合同信息
export const api＿getContract = (option = {}) => packing(get, baseApi + '/contract/getContract.htm', option)
// 表单 - 列表
export const api＿dynamicFormPage = (option = {}) => packing(get, baseApi + '/base/dynamic/form/page.htm', option)
// 表单 - 增加|修改
export const api＿dynamicFormUpdate = (option = {}) => packing(postForm, baseApi + '/base/dynamic/form/update.htm', option)
// 表单 - 删除
export const api＿dynamicFormDelete = (option = {}) => packing(postForm, baseApi + '/base/dynamic/form/delete.htm', option)
// 表单字段 - 列表
export const api＿dynamicFieldList = (option = {}) => packing(get, baseApi + '/base/dynamic/field/list.htm', option)
// 表单字段 - 删除
export const api＿dynamicFieldDelete = (option = {}) => packing(postForm, baseApi + '/base/dynamic/field/delete.htm', option)
// 表单字段 - 增加|修改
export const api＿dynamicFieldUpdate = (option = {}) => packing(postForm, baseApi + '/base/dynamic/field/update.htm', option)
// 表单字段 - 远程数据地址
export const api＿dynamicFieldDataTplList = (option = {}) => packing(get, baseApi + '/base/dynamic/field/data/tpl/list.htm', option)
// 表单字段 - 组件类型
export const api＿dynamicWidgetList = (option = {}) => packing(get, baseApi + '/base/dynamic/widget/list.htm', option)
