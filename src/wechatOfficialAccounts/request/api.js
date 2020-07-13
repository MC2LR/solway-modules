import { get, postForm } from '@comm/request/http'
import packing from '@comm/request/apiPacking'
import { independent } from '@comm/tools/env'

let baseApi = ''
if (process.env.NODE_ENV === 'development' && independent) baseApi = '/api'

// 获取openid
// export const api＿getOpenId = (option = {}) => packing(get, baseApi + '/wx/redirect/getOpenId.htm', option)
export const api＿getOpenId = (option = {}) => packing(get, baseApi + '/wx/redirect/getOpenId2.htm', option)
// 判断是否绑定了账号
export const api＿checkAccountBinding = (option = {}) => packing(get, baseApi + '/wechat/business/checkAccountBinding.htm', option)
// 绑定账号
export const api＿accountBinding = (option = {}) => packing(get, baseApi + '/wechat/business/accountBinding.htm', option)
// 解绑账号
export const api＿removeBinding = (option = {}) => packing(get, baseApi + '/wechat/business/removeBinding.htm', option)
// 判断该账号是否注册过
export const api＿checkPhone = (option = {}) => packing(postForm, baseApi + '/personalReg/checkPhone.htm', option)
// 微信公众号存入信息
export const api＿doWxLogin = (option = {}) => packing(get, baseApi + '/Login/doWxLogin.htm', option)
// 获取集团电站发电情况
export const api＿getComAndStDayInfo = (option = {}) => packing(get, baseApi + '/wechat/business/getComAndStDayInfo.htm', option)
// 角色列表
export const api＿getRoleList = (option = {}) => packing(get, baseApi + '/UserAuthHandle/getRoleList.htm', option)
// 切换角色
export const api＿changeRoleForMobileNew = (option = {}) => packing(postForm, baseApi + '/UserAuthHandle/changeRoleForMobileNew.htm', option)
// 获取openID 新
export const api＿getOpenIdNew = (option = {}) => packing(get, baseApi + '/wx/redirect/greet.htm', option)
// 消息模板列表
export const api＿queryMsgSubList = (option = {}) => packing(get, baseApi + '/wechat/business/queryMsgSub.htm', option)
// 订阅、取消订阅消息模板
export const api＿updateMsgSub = (option = {}) => packing(postForm, baseApi + '/wechat/business/updateMsgSub.htm', option)
// 周报、月报列表
export const api＿queryReportList = (option = {}) => packing(get, baseApi + '/wechat/business/getComAndStInfoReport.htm', option)
// 周报、月报详情
export const api＿queryReportDetail = (option = {}) => packing(get, baseApi + '/wechat/business/getComAndStWeekDetail.htm', option)
// 获取视频路径
export const api＿getVideo = (option = {}) => packing(get, baseApi + '/publicity/video/getVideo.htm', option)
