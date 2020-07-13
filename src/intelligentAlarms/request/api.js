import { get, postForm, postJson } from '@comm/request/http'
import packing from '@comm/request/apiPacking'
import { independent } from '@comm/tools/env'

let baseApi = 'microplat'
if (process.env.NODE_ENV === 'development' && independent) baseApi = '/microplat'

/* 下面是运行状态调整接口 */

// 报警规则分页查询
export const api＿getAlarmConfig = (option = {}) => packing(get, baseApi + '/api/msgpush/bigdataAlarmConfig/getAlarmConfig', option)
// 获取新能云菜单
export const queryCurrentMenu = (option = {}) => packing(get, baseApi + '/api/auth/userAccess/queryCurrentMenu', option)
// 获得当前用户信息
export const getCurrentInfo = (option = {}) => packing(get, baseApi + '/api/auth/userAccess/getCurrentInfo', option)
// 获取电站树形结构
export const queryStWithTree = (option = {}) => packing(get, baseApi + '/api/auth/userAccess/queryStWithTree', option)
// 切换电站
export const changeBusiType = (option = {}) => packing(get, baseApi + '/api/auth/userAccess/changeBusiType', option)
// 回首页(电脑版专用)
export const goHome = (option = {}) => packing(get, baseApi + '/api/auth/userAccess/goHome', option)
// 获取当前角色下电站类型stcls列表
export const queryCurrentStcls = (option = {}) => packing(get, baseApi + '/api/auth/userAccess/queryCurrentStcls', option)
// 获得角色列表 --> PC
export const queryRole4Web = (option = {}) => packing(get, baseApi + '/api/auth/userAccess/queryRole4Web', option)
// 切换用户角色 --> PC
export const changeRole4Web = (option = {}) => packing(get, baseApi + '/api/auth/userAccess/changeRole4Web', option)
// 获得当前用户基本信息
export const getAccountInfo = (option = {}) => packing(get, baseApi + '/api/auth/userAccess/getAccountInfo', option)
// 获取公司(光伏|风电|···)所有电站树形结构
export const GetStationTresed = (option = {}) => packing(get, baseApi + '/api/auth/userAccess/queryStWithTreeWithEntrust', option)

// 报警规则配置接口
export const AlarmConfigDelete = (option = {}) => packing(postForm, baseApi + '/api/msgpush/bigdataAlarmConfig/delete', option)

// 报警规则配置接口
export const AlarmConfigEdandcopy = (option = {}) => packing(postJson, baseApi + '/api/msgpush/bigdataAlarmConfig/addAlarmConfig', option)
// 根据电站分类统计数量
export const getCountByStation = (option = {}) => packing(get, baseApi + '/api/msgpush/bigdataAlarmLog/getCountByStation', option)
// 根据电站分类统计数量
export const getCountByTime = (option = {}) => packing(get, baseApi + '/api/msgpush/bigdataAlarmLog/getCountByTime', option)
// 根据报警规则统计数量（告警分类）
export const getCountByRuleName = (option = {}) => packing(get, baseApi + '/api/msgpush/bigdataAlarmLog/getCountByRuleName', option)
// 根据报警级别统计数量
export const getCountByAlarmLevel = (option = {}) => packing(get, baseApi + '/api/msgpush/bigdataAlarmLog/getCountByAlarmLevel', option)
// 根据设备类型统计数量
export const getCountByDtype = (option = {}) => packing(get, baseApi + '/api/msgpush/bigdataAlarmLog/getCountByDtype', option)
// 暂停或启用模板
export const updateConfigStatus = (option = {}) => packing(postForm, baseApi + '/api/msgpush/bigdataAlarmConfig/updateConfigStatus', option)
// 查询设备列表
export const getDeviceByStation = (option = {}) => packing(get, baseApi + '/api/msgpush/bigdataAlarmConfig/getDeviceByStation', option)

// 获得采集指标
export const getStdPointInfo = (option = {}) => packing(get, baseApi + '/api/msgpush/bigdataStdPointInfo/getStdPointInfo', option)
// 报警规则模板分页查询
export const getConfigTemplate = (option = {}) => packing(get, baseApi + '/api/msgpush/bigdataAlarmConfigTemplate/getConfigTemplate', option)
// 报警详情
export const getAlarmLogs = (option = {}) => packing(get, baseApi + '/api/msgpush/bigdataAlarmLog/getAlarmLog', option)
// 认领
export const claimAlarm = (option = {}) => packing(postForm, baseApi + '/api/msgpush/bigdataAlarmLog/claimAlarm', option)
// 关闭
export const closeAlarm = (option = {}) => packing(postForm, baseApi + '/api/msgpush/bigdataAlarmLog/closeAlarm', option)
// 统计报警数量和报警设备数
export const getAlarmAndDeviceCount = (option = {}) => packing(get, baseApi + '/api/msgpush/bigdataAlarmLog/getAlarmAndDeviceCount', option)

// 公司--智能报警消息分页
export const getInfoRulePage = (option = {}) => packing(get, baseApi + '/api/msgpush/alarm/rule/company/page', option)

// 公司--智能报警消息删除
export const alarmInfoDelete = (option = {}) => packing(get, baseApi + '/api/msgpush/alarm/rule/company/delete', option)
// 公司--智能报警消息更新
export const alarmInfoUpde = (option = {}) => packing(postForm, baseApi + '/api/msgpush/alarm/rule/company/update', option)

// 公司角色
export const queryCurrRole = (option = {}) => packing(get, baseApi + '/api/auth/company/queryCurrRole', option)

// 公司角色下的用户
export const queryUser = (option = {}) => packing(get, baseApi + '/api/auth/role/queryUser', option)
// 通知配置编辑
export const configEdit = (option = {}) => packing(get, baseApi + '/api/msgpush/alarm/rule/selector', option)
// // 获取综合指标
export const getGroupPoint = (option = {}) => packing(get, baseApi + '/api/msgpush/bigdataAlarmGroupPoint/getGroupPoint', option)
// // 添加综合指标
export const addGroupPoint = (option = {}) => packing(postJson, baseApi + '/api/msgpush/bigdataAlarmGroupPoint/joinGroupPoint', option)
// // 综合指标模板
export const getGroupPointTemple = (option = {}) => packing(get, baseApi + '/api/msgpush/bigdataAlarmGroupPoint/getGroupPointTemple', option)
// 验证模拟表达式
export const checkExpression = (option = {}) => packing(postJson, baseApi + '/api/msgpush/bigdataAlarmConfig/checkExpression', option)
// 验证表达式
export const testExpression = (option = {}) => packing(postForm, baseApi + '/api/msgpush/bigdataAlarmConfig/testExpression', option)
// 报警规则操作符类型查询
export const getAlarmRuleOperatorClass = (option = {}) => packing(get, baseApi + '/api/msgpush/bigdataAlarmRuleOperator/getAlarmRuleOperatorClass', option)
// 报警规则操作符查询
export const getAlarmRuleOperator = (option = {}) => packing(get, baseApi + '/api/msgpush/bigdataAlarmRuleOperator/getAlarmRuleOperator', option)
// 报警详情分页查询
export const getAlarmLog = (option = {}) => packing(get, baseApi + '/api/msgpush/bigdataAlarmLog/getAlarmLog', option)
// 计算函数
export const dictList = (option = {}) => packing(get, baseApi + '/api/base/dict/list', option)
