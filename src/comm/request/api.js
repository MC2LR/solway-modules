import { get, postForm, postJson } from './http'
import packing from './apiPacking'
import { independent } from '@comm/tools/env'

let baseApi = ''
const microServeceBaseApi = '/microplat'
if (process.env.NODE_ENV === 'development' && independent) baseApi = '/api'

export {baseApi}

// 退出登录
export const api＿logout = (option = {}) => packing(postForm, baseApi + '/Login/logout.htm', { ...option, invariant: {} })
// 电站类型列表
export const api＿getSTClassLIst = (option = {}) => packing(get, baseApi + '/UserAuthHandle/getSTClassLIst.htm', option)
// 获取当前电站类型 stClass的值
export const api＿getCurrentInfoNew = (option = {}) => packing(get, baseApi + '/UserAuthHandle/getCurrentInfoNew.htm', option)
// 切电站类型，默认选中第一个电站
export const api＿setSTClass = (option = {}) => packing(get, baseApi + '/UserAuthHandle/setSTClass.htm', option)
// 获取所有角色列表
export const api＿getRoleListForPC = (option = {}) => packing(get, baseApi + '/UserAuthHandle/getRoleListForPC.htm', option)
// 邀请消息条数
export const api＿getCompanyInviteCount = (option = {}) => packing(get, baseApi + '/BaseMessage/queryCompanyInviteCount.htm', option)
// 邀请消息列表
export const api＿getCompanyInviteList = (option = {}) => packing(get, baseApi + '/BaseMessage/queryCompanyInvite.htm', option)
// 邀请消息处理
export const api＿getCompanyInviteHandle = (option = {}) => packing(get, baseApi + '/authComUserRel/handleCompanyInvite.htm', option)
// 公告未读条数
export const api＿getNoticeUnreadCount = (option = {}) => packing(get, baseApi + '/BaseNotice/getNoticeUnreadCount.htm', option)
// 公告所有类型的列表
export const api＿getAllNoticePage = (option = {}) => packing(get, baseApi + '/BaseNotice/getAllNoticePage.htm', option)
// 公告单条标记已读
export const api＿makeNoticeRead = (option = {}) => packing(get, baseApi + '/BaseNotice/makeNoticeRead.htm', option)
// 公告多条标记已读
export const api＿makeNoticeAllRead = (option = {}) => packing(get, baseApi + '/BaseNotice/makeNoticeAllRead.htm', option)
// 未读公告弹框列表
export const api＿getNoticeUnreadWindows = (option = {}) => packing(get, baseApi + '/BaseNotice/getNoticeUnreadWindows.htm', option)
// 切换角色
export const api＿changeRoleNew = (option = {}) => packing(get, baseApi + '/UserAuthHandle/changeRoleNew.htm', option)
// 当前用户信息
export const api＿getLoginUser = (option = {}) => packing(get, baseApi + '/Login/getLoginUser.htm', option)
// 保存个人信息
export const api＿updateDataSelective = (option = {}) => packing(postForm, baseApi + '/AdminUser/updateDataSelective.htm', option)
// 修改用户密码
export const api＿userPasswordChangeModel = (option = {}) => packing(postForm, baseApi + '/AdminUser/userPasswordChangeModel.htm', option)
// 分组列表
export const api＿listGroup = (option = {}) => packing(get, baseApi + '/userGroup/listGroup.htm', option)
// 添加分组
export const api＿updateGroup = (option = {}) => packing(postForm, baseApi + '/userGroup/updateGroup.htm', option)
// 删除分组
export const api＿deleteGroup = (option = {}) => packing(postForm, baseApi + '/userGroup/deleteGroup.htm', option)
// 某个分组下的电站列表
export const api＿listPStations = (option = {}) => packing(get, baseApi + '/userGroup/listPStations.htm', option)
// 删除某分组下的电站
export const api＿deleteGroupRel = (option = {}) => packing(postForm, baseApi + 'userGroup/deleteGroupRel.htm', option)
// 查看该功能是否有查看权限
export const api＿checkModuleAuth = (option = {}) => packing(get, baseApi + '/UserAuthHandle/checkModuleAuth.htm', option)
// 某分组下未添加的电站列表
export const api＿unGroupBPS = (option = {}) => packing(get, baseApi + '/userGroup/unGroupBPS.htm', option)
// 保存所选电站到某分组下
export const api＿updateGroupRel = (option = {}) => packing(postForm, baseApi + '/userGroup/updateGroupRel.htm', option)
// 管理员下拉导航菜单
export const api＿getUiStates = (option = {}) => packing(get, baseApi + '/UserAuthHandle/getUiStates.htm', option)
// 公司列表
export const api＿companyList = (option = {}) => packing(get, baseApi + '/Company/selectAllByAdmin.htm', option)
// 公司的已购买+未购买所有的模块列表
export const api＿selectCompanyModules = (option = {}) => packing(get, baseApi + '/moduleInfo/selectCompanyModules.htm', option)
// 购买配置保存
export const api＿updateCompanyBuyModule = (option = {}) => packing(postJson, baseApi + '/moduleInfo/updateCompanyBuyModule.htm', option)
// 购买配置保存-批量
export const api＿updateCompanyBuyModules = (option = {}) => packing(postJson, baseApi + '/moduleInfo/updateCompanyBuyModules.htm', option)

// 回首页(电脑版专用)
export const goHome = (option = {}) => packing(get, microServeceBaseApi + '/api/auth/userAccess/goHome', option)
// 退出登录
export const logout = (option = {}) => packing(get, microServeceBaseApi + '/logout', option)
// 获得当前用户基本信息
export const getAccountInfo = (option = {}) => packing(get, microServeceBaseApi + '/api/auth/userAccess/getAccountInfo', option)
// 获得当前用户信息
export const getCurrentInfo = (option = {}) => packing(get, microServeceBaseApi + '/api/auth/userAccess/getCurrentInfo', option)
// 获得当前电站信息
export const getCurrentStationInfo = (option = {}) => packing(get, microServeceBaseApi + '/api/auth/userAccess/getCurrentStationInfo', option)
// 获取当前角色下电站类型stcls列表
export const queryCurrentStcls = (option = {}) => packing(get, microServeceBaseApi + '/api/auth/userAccess/queryCurrentStcls', option)
// 获取电站树形结构 部门  ?busiType=6 区域
export const queryStWithTree = (option = {}) => packing(get, microServeceBaseApi + '/api/auth/userAccess/queryStWithTree', option)
// 切换电站
export const changeBusiType = (option = {}) => packing(get, microServeceBaseApi + '/api/auth/userAccess/changeBusiType', option)
// 获取新能云菜单
export const queryCurrentMenu = (option = {}) => packing(get, microServeceBaseApi + '/api/auth/userAccess/queryCurrentMenu', option)
// 获得角色列表 --> PC
export const queryRole4Web = (option = {}) => packing(get, microServeceBaseApi + '/api/auth/userAccess/queryRole4Web', option)
// 切换用户角色 --> PC
export const changeRole4Web = (option = {}) => packing(get, microServeceBaseApi + '/api/auth/userAccess/changeRole4Web', option)
// 切换当前角色电站类型 光伏风电||火电
export const userAccessSetStcls = (option = {}) => packing(get, microServeceBaseApi + '/api/auth/userAccess/setStcls', option)
