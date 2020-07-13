import { get, postForm } from '@comm/request/http'
import packing from '@comm/request/apiPacking'
import { independent } from '@comm/tools/env'

let baseApi = ''
if (process.env.NODE_ENV === 'development' && independent) baseApi = '/api'

// 集团管理列表
export const api＿selectCompanyInfo1 = (option = {}) => packing(get, baseApi + '/Company/selectCompanyInfo1.htm', option)
// 停用或者启用某个公司
export const api＿companyEnableUse = (option = {}) => packing(postForm, baseApi + '/Company/detail/update.htm', option)
