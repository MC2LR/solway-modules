import { get, postJson } from '@comm/request/http'
import packing from '@comm/request/apiPacking'
import { independent } from '@comm/tools/env'

let baseApi = ''
if (process.env.NODE_ENV === 'development' && independent) baseApi = '/api'

// 公司列表
export const api＿companyList = (option = {}) => packing(get, baseApi + '/Company/selectAllByAdmin.htm', option)
// 公司的已购买+未购买所有的模块列表
export const api＿selectCompanyModules = (option = {}) => packing(get, baseApi + '/moduleInfo/selectCompanyModules.htm', option)
// 购买配置保存
export const api＿updateCompanyBuyModule = (option = {}) => packing(postJson, baseApi + '/moduleInfo/updateCompanyBuyModule.htm', option)
// 购买配置保存-批量
export const api＿updateCompanyBuyModules = (option = {}) => packing(postJson, baseApi + '/moduleInfo/updateCompanyBuyModules.htm', option)
