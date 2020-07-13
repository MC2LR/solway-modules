import { get, postForm, postJson, upload } from '@comm/request/http'
import packing from '@comm/request/apiPacking'
import { independent } from '@comm/tools/env'

let baseApi = ''
if (process.env.NODE_ENV === 'development' && independent) baseApi = '/api'

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

// 备件管理 备件清单 /opFittingsDict/fdnum/page.htm?pageIndex=0&pageSize=20
export const api＿opFittingsDictFdnumPage = (option = {}) => packing(get, baseApi + '/opFittingsDict/fdnum/page.htm', { ...option, invariant: {} })
// 备件管理 库房管理 库房列表 /opFittingsRoom/selectByCondition.htm?isMe=1
export const api＿opFittingsRoomSelectByCondition = (option = {}) => packing(get, baseApi + '/opFittingsRoom/selectByCondition.htm', { ...option, invariant: {} })
// 备件管理 库房管理 添加库房 /opFittingsRoom/update.htm  id: '' name: k2 remark: k2备注
export const api＿opFittingsRoomUpdate = (option = {}) => packing(postForm, baseApi + '/opFittingsRoom/update.htm', { ...option, invariant: {} })
// 备件管理 库房管理 删除库房 /opFittingsRoom/delete.htm  id: ''
export const api＿opFittingsRoomDelete = (option = {}) => packing(postForm, baseApi + '/opFittingsRoom/delete.htm', { ...option, invariant: {} })
// 备件管理 备件分类 列表 /opFittingsCategory/selectByCondition.htm
export const api＿opFittingsCategorySelectByCondition = (option = {}) => packing(get, baseApi + '/opFittingsCategory/selectByCondition.htm', { ...option, invariant: {} })
// 备件管理 备件管理 大类列表 /opFittingsDict/selectCtg1.htm
export const api＿opFittingsDictSelectCtg1 = (option = {}) => packing(get, baseApi + '/opFittingsDict/selectCtg1.htm', { ...option, invariant: {} })
// 备件管理 备件管理 小类列表 /opFittingsDict/selectCtg2.htm?ctg1=%E4%B8%AD%E9%91%AB
export const api＿opFittingsDictSelectCtg2 = (option = {}) => packing(get, baseApi + '/opFittingsDict/selectCtg2.htm', { ...option, invariant: {} })
// 备件管理 备件管理 备件列表 /opFittingsDict/page.htm?ctg1=%E4%B8%AD%E9%91%AB&ctg2=&keywords=
export const api＿opFittingsDictPage = (option = {}) => packing(get, baseApi + '/opFittingsDict/page.htm', { ...option, invariant: {} })
// 备件管理 备件管理 厂商列表 /opFittingsDict/selectManuf.htm
export const api＿opFittingsSelectManuf = (option = {}) => packing(get, baseApi + '/opFittingsDict/selectManuf.htm', { ...option, invariant: {} })
/**
 * 备件管理 备件管理 添加更新备件 /opFittingsDict/update.htm
 * @param {*} option
 * ctg1: da
 * ctg2: xiao
 * code: 456
 * name: lxj_test2
 * manuf: lxj
 * ft: lxj_test
 * fu: 个
 * numMin: 0
 * remark:
 * attachments: 7
 * id: 14
 */
export const api＿opFittingsDictUpdate = (option = {}) => packing(postForm, baseApi + '/opFittingsDict/update.htm', { ...option, invariant: {} })
// 备件管理 备件管理 添加更新备件 附件上传 /FileUpload/uploadFile.htm file: (binary) targetType: FITTING_FILE
export const api＿fileUploadUploadFile = (option = {}) => packing(upload, baseApi + '/FileUpload/uploadFile.htm', { ...option, invariant: {} })
// 备件管理 备件管理 添加更新备件 附件查询 FileUpload/selectFiles.htm?ids=7&targetType=FITTING_FILE
export const api＿fileUploadSelectFiles = (option = {}) => packing(upload, baseApi + '/FileUpload/selectFiles.htm', { ...option, invariant: {} })
// 备件管理 备件管理 备件删除 /opFittingsDict/delete.htm id: 13
export const api＿opFittingsDictDelete = (option = {}) => packing(postForm, baseApi + '/opFittingsDict/delete.htm', { ...option, invariant: {} })
// 备件管理 入库管理 入库列表查询 /opWork/fittings/in/page.htm?endDate=2019-08-27&keywords=a&pageIndex=0&pageSize=20&startDate=2018-08-21&stationId=19
export const api＿opWorkFittingsInPage = (option = {}) => packing(get, baseApi + '/opWork/fittings/in/page.htm', { ...option, invariant: {} })
// 备件管理 入库管理 入库详情 /opWork/fittings/in/goods.htm?id=153
export const api＿opWorkFittingsInGoods = (option = {}) => packing(get, baseApi + '/opWork/fittings/in/goods.htm', { ...option, invariant: {} })
// 备件管理 入库管理 备件列表查询 /opFittingsDict/selectCurrData.htm
export const api＿opFittingsDictSelectCurrData = (option = {}) => packing(get, baseApi + '/opFittingsDict/selectCurrData.htm', { ...option, invariant: {} })
// 备件管理 入库管理 备件编号校验 /opFittingsDictRoom/validFsn.htm?fsn=alskgkdfj
export const api＿opFittingsDictRoomValidFsn = (option = {}) => packing(get, baseApi + '/opFittingsDictRoom/validFsn.htm', { ...option, invariant: {} })
// 备件管理 入库管理 入库 /opWork/fittings/in/create.htm
/**
 * @param {*} option
 * goods: [{num: 0, fsn: "B201909021809", $$hashKey: "object:1258", fdId: "23", position: "w1809", fdPt: 1}]
0: {num: 0, fsn: "B201909021809", $$hashKey: "object:1258", fdId: "23", position: "w1809", fdPt: 1}
$$hashKey: "object:1258"
fdId: "23"
fdPt: 1
fsn: "B201909021809"
num: 0
position: "w1809"
sn: "R201909021808"
stationId: "19"
 */
export const api＿opWorkFittingsInCreate = (option = {}) => packing(postJson, baseApi + '/opWork/fittings/in/create.htm', { ...option, invariant: {} })
// 领料列表 /opWork/fittings/req/page.htm?endDate=2019-09-03&keywords=a&pageIndex=0&pageSize=20&startDate=2018-09-03
export const api＿opWorkFittingsReqPage = (option = {}) => packing(get, baseApi + '/opWork/fittings/req/page.htm', { ...option, invariant: {} })
// 获取当前用户信息 /Login/getLoginUser.htm
export const api＿loginGetLoginUser = (option = {}) => packing(get, baseApi + '/Login/getLoginUser.htm', { ...option, invariant: {} })
// 领料 处理记录 /opWork/fittings/req/tasks.htm?id=163
export const api＿opWorkFittingsReqTasks = (option = {}) => packing(get, baseApi + '/opWork/fittings/req/tasks.htm', { ...option, invariant: {} })
