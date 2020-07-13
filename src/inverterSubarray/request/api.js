import { get, postForm } from '@comm/request/http'
import packing from '@comm/request/apiPacking'
import { independent } from '@comm/tools/env'

let baseApi = ''
if (process.env.NODE_ENV === 'development' && independent) baseApi = '/api'

// 逆变器子阵维护
// 分组列表接口  search.stid_eq=&search.deviceType_eq=2&search.groupName_like=
export const api＿deviceGroupList = (option = {}) => packing(get, baseApi + '/device/group/list.htm', option)
// 分组保存接口  formfield: stid: deviceType: groupName: position: longitude: latitude:
export const api＿deviceGroupUpdate = (option = {}) => packing(postForm, baseApi + '/device/group/update.htm', option)
// 删除分组接口  id=
export const api＿deviceGroupDelete = (option = {}) => packing(postForm, baseApi + '/device/group/delete.htm', option)
// 设备分组接口  deviceType=2&deviceIds=&groupId=&flag=    flag:0 去除分组 1 加入分组
export const api＿deviceGroupDoBind = (option = {}) => packing(postForm, baseApi + '/device/group/do/bind.htm', option)
// 已分组设备接口  stid=&deviceType=2&groupId=
export const api＿deviceGroupListBind = (option = {}) => packing(get, baseApi + '/device/group/list/bind.htm', option)
// 未分组设备接口  stid=&deviceType=2
export const api＿deviceGroupListUnbind = (option = {}) => packing(get, baseApi + '/device/group/list/unbind.htm', option)
