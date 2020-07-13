import { get, postForm, postJson, upload } from '@comm/request/http'
import packing from '@comm/request/apiPacking'
import { independent } from '@comm/tools/env'

let baseApi = '/microplat'
if (process.env.NODE_ENV === 'development' && independent) baseApi = '/microplat'

// 运维管理首页
// 故障列表
export const getRunAlarmList = (option = {}) => packing(get, baseApi + '/api/energyRealtime/deviceAlarm/getRunAlarmList', option)
// 任务列表
export const getTaskByBiz = (option = {}) => packing(get, baseApi + '/api/optask/mainTask/getTaskByBiz', option)
// 撤回任务
export const undoTask = (option = {}) => packing(postForm, baseApi + '/api/optask/mainTask/undoTask', option)
// 受理任务/api/optask/mainTask/accept
export const acceptTask = (option = {}) => packing(postForm, baseApi + '/api/optask/mainTask/accept', option)
// 作废任务
export const invalidTask = (option = {}) => packing(postForm, baseApi + '/api/optask/mainTask/invalidTask', option)
// 任务验收
export const checkTask = (option = {}) => packing(postForm, baseApi + '/api/optask/mainTask/checkTask', option)
// 任务评价
export const assessTask = (option = {}) => packing(postForm, baseApi + '/api/optask/mainTask/assessTask', option)
// 发红包
export const sendRedEnv = (option = {}) => packing(postForm, baseApi + '/api/optask/mainTask/sendRedEnv', option)
// 发布任务
// 电站列表-下拉框
export const queryStWithListStationlist = (option = {}) => packing(get, baseApi + '/api/auth/userAccess/queryStWithList', option)
// 无需处理
export const withoutHandle = (option = {}) => packing(postForm, baseApi + '/api/energyRealtime/deviceAlarm/withoutHandle', option)
// 专业人员列表、抄送人列表
export const peopleProfessinal = (option = {}) => packing(get, baseApi + '/api/auth/userAccess/organization/users', option)
// 共享人员-候选电工、其他电工
export const peopleShare = (option = {}) => packing(get, baseApi + '/api/auth/wechat/company/userWithCompany', option)
// 共享人员-公开
export const peopleSharePublic = (option = {}) => packing(get, baseApi + '/api/auth/wechat/company/userWithOpen', option)
// 获取人员的接单次数、评分
export const getTimesAndScore = (option = {}) => packing(get, baseApi + '/api/optask/mainTask/getTimesAndScore', option)
// 派工任务
export const addPlanTask = (option = {}) => packing(postJson, baseApi + '/api/optask/mainTask/pcAddPlanTask', option)
// 上传
export const uploadOssFile = (option = {}) => packing(upload, baseApi + '/api/oss/saveAndUploadOss', option)
// 根据设备获取地理位置信息
export const queryDeviceMapPosition = (option = {}) => packing(postJson, baseApi + '/api/energyRealtime/device/realtime/queryDeviceMapPosition', option)
// 获取电站的地理位置信息
export const getStationGeo = (option = {}) => packing(get, baseApi + '/api/auth/station/geo', option)
// 根据经纬度获取具体位置
export const getPositionByLonlat = (option = {}) => packing(get, baseApi + '/api/base/geo/address', option)
// 获取运维工人信息列表
export const getUserInfoList = (option = {}) => packing(get, baseApi + '/api/optask/mainTask/getUserInfoList', option)
// 人员详情弹框信息
export const getTaskListByUserId = (option = {}) => packing(get, baseApi + '/api/optask/mainTask/getTaskListByUserId', option)

// 回首页(电脑版专用)
export const goHome = (option = {}) => packing(get, baseApi + '/api/auth/userAccess/goHome', option)
// 获得当前用户基本信息
export const getAccountInfo = (option = {}) => packing(get, baseApi + '/api/auth/userAccess/getAccountInfo', option)
// 获得当前用户信息
export const getCurrentInfo = (option = {}) => packing(get, baseApi + '/api/auth/userAccess/getCurrentInfo', option)
// 获得当前电站信息
export const getCurrentStationInfo = (option = {}) => packing(get, baseApi + '/api/auth/userAccess/getCurrentStationInfo', option)
// 获取当前角色下电站类型stcls列表
export const queryCurrentStcls = (option = {}) => packing(get, baseApi + '/api/auth/userAccess/queryCurrentStcls', option)
// 获取电站树形结构
export const queryStWithTree = (option = {}) => packing(get, baseApi + '/api/auth/userAccess/queryStWithTree', option)
// 切换电站
export const changeBusiType = (option = {}) => packing(get, baseApi + '/api/auth/userAccess/changeBusiType', option)
// 获取新能云菜单
export const queryCurrentMenu = (option = {}) => packing(get, baseApi + '/api/auth/userAccess/queryCurrentMenu', option)
// 获得角色列表 --> PC
export const queryRole4Web = (option = {}) => packing(get, baseApi + '/api/auth/userAccess/queryRole4Web', option)
// 切换用户角色 --> PC
export const changeRole4Web = (option = {}) => packing(get, baseApi + '/api/auth/userAccess/changeRole4Web', option)
// 查询数据字典
export const getDictionaryList = (option = {}) => packing(get, baseApi + '/api/base/dict/list', option)
// ----- 共享人员管理
// 查询公开用户
export const api＿apiAuthWechatUserWithOpen = (option = {}) => packing(get, baseApi + '/api/auth/wechat/company/userWithOpen', option)
// 查询已加入公司用户
export const api＿apiAuthWechatUserWithCompany = (option = {}) => packing(get, baseApi + '/api/auth/wechat/company/userWithCompany', option)
// 公司删除用户
export const api＿apiAuthWechatUnbindUser2Company = (option = {}) => packing(postForm, baseApi + '/api/auth/wechat/company/unbindUser2Company', option)
// 公司加入用户
export const api＿apiAuthWechatBindUser2Company = (option = {}) => packing(postForm, baseApi + '/api/auth/wechat/company/bindUser2Company', option)
// 根据手机号查询用户
export const api＿apiAuthQueryWechatUserWithPhone = (option = {}) => packing(get, baseApi + '/api/auth/wechat/company/queryWechatUserWithPhone', option)
// 获取电站列表
export const api＿apiAuthUserAccessQueryStWithList = (option = {}) => packing(get, baseApi + '/api/auth/userAccess/queryStWithList', option)
// 修改人员信息
export const api＿apiAuthWechatUpdateUser = (option = {}) => packing(postForm, baseApi + '/api/auth/wechat/company/updateUser', option)
// 查询厂商
export const api＿getManufacturer = (option = {}) => packing(get, baseApi + '/api/base/product/manuf/list', option)
// 查询产品型号
export const api＿getProductModel = (option = {}) => packing(get, baseApi + '/api/base/product/product/list', option)
// 知识库-查询产品资料
export const api＿getProductInformation = (option = {}) => packing(get, baseApi + '/api/knowledge/share/repository/selectByPageShareRepository', option)
// 知识库-查询历史检修记录
// export const api＿getRepairRecord = (option = {}) => packing(get, baseApi + '/api/knowledge/share/repository/selectByPageRepair', option)
// 知识库-查询明细
export const api＿getRepositoryOne = (option = {}) => packing(get, baseApi + '/api/knowledge/share/repository/getOne', option)
// 获取电站初始化信息
export const api＿apiAuthPowerstationinit = (option = {}) => packing(get, baseApi + '/api/energyRealtime/queryStationStatusMapData', option)
// 获取运维派工人数量
export const api＿apiAuthOperationWorkNum = (option = {}) => packing(get, baseApi + '/api/optask/mainTask/getUserCount', option)
// 获取运行状态（光伏）
export const api＿apiAuthRunState = (option = {}) => packing(get, baseApi + '/api/energyRealtime/station/rtSolarCollectorOverview', option)
// 获取运行状态（风电）
export const api＿apiAuthRunStateWind = (option = {}) => packing(get, baseApi + '/api/energyRealtime/station/rtWindCollectorOverview', option)
// 获取主要设备地图数据(逆变器、风机)
export const api＿apiAuthMapData = (option = {}) => packing(get, baseApi + '/api/energyRealtime/device/realtime/queryMainDeviceStatusMapData', option)
// 获取派工人员列表
export const api＿apiAuthPersonList = (option = {}) => packing(get, baseApi + '/api/optask/mainTask/getDispatchUserInfoList', option)
// 获取任务详情
export const api＿apiAuthtaskDetail = (option = {}) => packing(get, baseApi + '/api/optask/mainTask/getTaskById', option)

// 添加评论
export const api＿apiAuthcomment = (option = {}) => packing(postJson, baseApi + '/api/optask/taskReview/addTaskReview', option)
// 获取at人员信息
export const api＿apiAuthGetAtperson = (option = {}) => packing(get, baseApi + '/api/auth/userAccess/organization/otherUsers', option)
/// ///
// 获取历史统计页任务列表
export const api＿apiAuthGettaskLists = (option = {}) => packing(get, baseApi + '/api/optask/mainTask/getTaskListByBiz', option)
// 获取统计页根据电站统计工时
export const api＿apiAuthgetTaskHourByStId = (option = {}) => packing(get, baseApi + '/api/optask/mainTask/getTaskHourByStId', option)
// 获取历史统计页任务时间
export const api＿apiAuthGetTaskTime = (option = {}) => packing(get, baseApi + '/api/optask/mainTask/getTaskHour', option)
// 获取统计页根据人员统计工时
export const api＿apiAuthgetTaskHourByPe = (option = {}) => packing(get, baseApi + '/api/optask/mainTask/getTaskHourByPe', option)

// 获取任务个数
export const api＿apiAuthgetTasknum = (option = {}) => packing(get, baseApi + '/api/optask/mainTask/getTaskCount', option)
// 附件下载i
export const api＿apiAuthgetdownloadOss = (option = {}) => packing(postForm, baseApi + '/api/oss/downloadOss', option)

// 红包统计
export const getEnvRedList = (option = {}) => packing(get, baseApi + '/api/optask/mainTask/getEnvRedList', option)
