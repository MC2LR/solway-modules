import { get, postForm, postJson, upload } from '@comm/request/http'
import packing from '@comm/request/apiPacking'
import { independent } from '@comm/tools/env'

let baseApi = ''
if (process.env.NODE_ENV === 'development' && independent) baseApi = '/api'

/**
 * 接口调用使用方法
 * @param {data = {}, later = false, cacheParams = null, onlyLatest = false, sameTimeOnce = false, cache = false} option
 * 第一步：  import * as API from '../../request/api'
 * 第二步：  API.queryVideos().subscribe(res => {...})
 * 每调用一次 API.queryVideos() 都会创建一个独立的对象，多次调用建议挂载赋值，重复使用
 *
 * 一、什么时候建议挂载组件data中使用           data: {queryVideos: API.queryVideos({later: true})}
 *  1.需要判断loading状态                     <loading v-if="queryVideos.loading"/>
 *  2.接口返回的数据直接在模板中使用            <span>{{queryVideos.res.res_data}}<span>
 *
 * 二、什么时候不需要赋值或挂载 API.queryVideos({data: {...参数}}).subscribe(res => {...})
 *  1.接口只调用一次
 *  2.接口与模板没有直接关系
 *
 * 三、什么时候建议赋值挂载
 *  1.多次调用同一个接口且统一处理
 *  2.需要接口拦截、预处理等复杂判断等
 */

// 样例
export const api＿queryVideos2 = (option = {}) => packing(postJson, baseApi + '/pvwp/station/queryVideos.htm', option)
// 样例
export const api＿queryVideos3 = (option = {}) => packing(upload, baseApi + '/pvwp/station/queryVideos.htm', option)
// 视频监控列表
export const api＿queryVideos = (option = {}) => packing(get, baseApi + '/pvwp/station/queryVideos.htm', { ...option, invariant: {} })
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

// 某分组下未添加的电站列表
export const api＿unGroupBPS = (option = {}) => packing(get, baseApi + '/userGroup/unGroupBPS.htm', option)
// 保存所选电站到某分组下
export const api＿updateGroupRel = (option = {}) => packing(postForm, baseApi + '/userGroup/updateGroupRel.htm', option)

// --------------------------------------数据查询接口组
// 获取该角色权限下的所有最高级集团
export const api＿getAllComByRole = (option = {}) => packing(get, baseApi + '/BaseSearchCondition/getAllComByRole.htm', option)
// 获取该角色权限下多个集团的电站
export const api＿getStByRoleAndComIds = (option = {}) => packing(get, baseApi + '/BaseSearchCondition/getStByRoleAndComIds.htm', option)
// 获取该角色权限下多个电站的设备类型
export const api＿getDeviceTypeByStIds = (option = {}) => packing(get, baseApi + '/BaseSearchCondition/getDeviceTypeByStIds.htm', option)
// 获取该角色权限下多个电站和设备类型的设备信息-分页
export const api＿getDeviceByStIdsAndDeviceTypePage = (option = {}) => packing(get, baseApi + '/BaseSearchCondition/getDeviceByStIdsAndDeviceTypePage.htm', option)
// 获取设备事件类型
export const api＿getDeviceEventType = (option = {}) => packing(get, baseApi + '/Basedictionary/selectAll.htm', option)

// 设备日志条件查询-流经时间
export const api＿deviceLogListByPageAndThroughTime = (option = {}) => packing(get, baseApi + '/deviceLogNew/deviceLogListByPageAndThroughTimeNew.htm', option)
// 设备日志条件查询-开始时间
export const api＿deviceLogListByPageAndStartTime = (option = {}) => packing(get, baseApi + '/deviceLogNew/deviceLogListByPageAndStartTimeNew.htm', option)

// 设备日志条件查询-流经时间
// export const api＿deviceLogListByPageAndThroughTime = (option = {}) => packing(get, baseApi + '/deviceLogNew/deviceLogListByPageAndThroughTime.htm', option)
// 设备日志条件查询-开始时间
// export const api＿deviceLogListByPageAndStartTime = (option = {}) => packing(get, baseApi + '/deviceLogNew/deviceLogListByPageAndStartTime.htm', option)

// 设备日志统计-查询按钮
export const api＿deviceLogStat = (option = {}) => packing(get, baseApi + '/deviceLogNew/deviceLogStat.htm', option)
// 秒级数据指标查询
export const api＿getSecondDateIndex = (option = {}) => packing(get, baseApi + '/BaseSearchCondition/getSecondDateIndex.htm', option)
// 秒级设备数据查询
export const api＿getNewHistoryData = (option = {}) => packing(get, baseApi + '/secondDate/getNewHistoryData.htm', option)
// 主题查询对象分组
export const api＿getSubjectGroup = (option = {}) => packing(get, baseApi + '/BaseSearchCondition/getSubjectGroup.htm', option)
// 获取指标的接口
export const api＿getSubjectPoint = (option = {}) => packing(get, baseApi + '/subjectDate/getSubjectPoint.htm', option)
// 主题查询接口
export const api＿getSubjectList = (option = {}) => packing(get, baseApi + '/subjectDate/getSubjectList.htm', option)
// 主题数据导出接口
export const api＿subjectDateExportSubjectData = '/subjectDate/exportSubjectData.htm'
// 秒级数据导出接口
export const api＿exportSecondData = '/secondDate/exportSecondData.htm'

// 逆变器列表视图 /pv/monitorData/getRunRealDataBInverter.htm?status=00,01,07,02,03,04,05
export const api＿getRunRealDataBInverter = (option = {}) => packing(get, baseApi + '/pv/monitorData/getRunRealDataBInverter.htm', { ...option, invariant: {} })
