import { get, postForm } from '@comm/request/http'
import packing from '@comm/request/apiPacking'
import { independent } from '@comm/tools/env'

let baseApi = ''
if (process.env.NODE_ENV === 'development' && independent) baseApi = '/api'

// 添加分组
export const api＿updateGroup = (option = {}) => packing(postForm, baseApi + '/userGroup/updateGroup.htm', option)

/* 消息推送接口 */
// 登录角色
export const api＿getRightListForPCNew = (option = {}) => packing(get, baseApi + '/UserAuthHandle/getRightListForPCNew.htm', option)
// 光伏|风电推送配置入口
export const api＿settingMode = (option = {}) => packing(get, baseApi + '/module/msg/setting/query/push/mod.htm', option)
// 角色列表
export const api＿roleList = (option = {}) => packing(get, baseApi + '/auth/handler/query/company/role.htm', option)
// 角色对应的用户列表
export const api＿userList = (option = {}) => packing(get, baseApi + '/auth/handler/query/company/role/user.htm', option)
// 消息推送管理列表---系统
export const api＿sendMessageListSystem = (option = {}) => packing(get, baseApi + '/module/msg/rule/default/list.htm', option)
// 消息推送管理列表---集团
export const api＿sendMessageListCompany = (option = {}) => packing(get, baseApi + '/module/msg/rule/company/list.htm', option)
// 消息推送管理列表---集团---默认
export const api＿sendMessageListCompanyDefault = (option = {}) => packing(get, baseApi + '/module/msg/rule/company/list/default.htm', option)
// 集团列表-默认-禁用或者启用规则
export const api＿companyIfEnable = (option = {}) => packing(postForm, baseApi + '/module/msg/rule/company/default/update.htm', option)
// 时间、通知方式 接口
export const api＿timeNoticeMethod = (option = {}) => packing(get, baseApi + '/module/msg/setting/get/push/mod.htm', option)
// 故障类型接口
export const api＿faultcodeType = (option = {}) => packing(get, baseApi + '/pvwp/station/queryPlatEventType.htm', option)
// 保存-系统
export const api＿updateStrategySystem = (option = {}) => packing(postForm, baseApi + '/module/msg/rule/default/update.htm', option)
// 保存-集团
export const api＿updateStrategyCompany = (option = {}) => packing(postForm, baseApi + '/module/msg/rule/company/update.htm', option)
// 详情-系统
export const api＿detailInfoSystem = (option = {}) => packing(get, baseApi + '/module/msg/rule/default/view.htm', option)
// 详情-集团
export const api＿detailInfoCompany = (option = {}) => packing(get, baseApi + '/module/msg/rule/company/view.htm', option)
// 删除-系统
export const api＿deleteStrategySystem = (option = {}) => packing(postForm, baseApi + '/module/msg/rule/default/delete.htm', option)
// 删除-集团
export const api＿deleteStrategyCompany = (option = {}) => packing(postForm, baseApi + '/module/msg/rule/company/delete.htm', option)
// 故障库
export const api＿queryPlatProtocol = (option = {}) => packing(get, baseApi + '/pvwp/station/queryPlatProtocol.htm', option)
// 故障码
export const api＿queryPlatFaultCode = (option = {}) => packing(get, baseApi + '/pvwp/station/queryPlatFaultCode.htm', option)
