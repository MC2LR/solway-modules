import { get, upload, postForm } from '@comm/request/http'
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

// --------------------------------------合同管理接口组
// 当前用户信息
export const api＿getLoginUser = (option = {}) => packing(get, baseApi + '/Login/getLoginUser.htm', option)
// 获取该角色权限下的所有最高级集团
export const api＿getAllComByRole = (option = {}) => packing(get, baseApi + '/BaseSearchCondition/getAllComByRole.htm', option)
// 秒级设备数据查询
export const api＿getNewHistoryData = (option = {}) => packing(get, baseApi + '/secondDate/getNewHistoryData.htm', option)
// 查询所有分类  参数 status 0:合同分类 1:项目分类 2:合同小类
export const api＿getBaseContract = (option = {}) => packing(get, baseApi + '/contract/getBaseContract.htm', option)
// 删除分类
export const api＿deleteBaseContract = (option = {}) => packing(get, baseApi + '/contract/deleteBaseContract.htm', option)
// 保存分类
export const api＿saveStandardPoint = (option = {}) => packing(get, baseApi + '/contract/saveStandardPoint.htm', option)
// 获取市场负责人
export const api＿getMarketManager = (option = {}) => packing(get, baseApi + '/contract/getMarketManager.htm', option)
// 获取合同信息
export const api＿getContract = (option = {}) => packing(get, baseApi + '/contract/getContract.htm', option)
// 保存合同财务信息
export const api＿updateContractCost = (option = {}) => packing(get, baseApi + '/contract/updateContractCost.htm', option)
// 获取回款信息
export const api＿getBackMoneyList = (option = {}) => packing(get, baseApi + '/contract/getBackMoneyList.htm', option)
// 合同财务-回款的权限
export const api＿getContractCost = (option = {}) => packing(get, baseApi + '/UserAuthHandle/getBusinessManageAuth/08.htm', option)
// 保存回款信息
export const api＿saveContractBackMoney = (option = {}) => packing(postForm, baseApi + '/contract/saveContractBackMoney.htm', option)
// 删除合同信息
export const api＿deleteContract = (option = {}) => packing(get, baseApi + '/contract/deleteContract.htm', option)
// 保存合同信息
export const api＿saveContract = (option = {}) => packing(get, baseApi + '/contract/saveContract.htm', option)
// 查询所有公司
export const api＿selectAllCompany = (option = {}) => packing(get, baseApi + '/BaseSearchCondition/selectAllCompany.htm', option)
// 获取所有的甲方或者乙方
export const api＿getPartyAB = (option = {}) => packing(get, baseApi + '/contract/getPartyAB.htm', option)
// 获取合同项目信息
export const api＿getContractProject = (option = {}) => packing(get, baseApi + '/contract/getContractProject.htm', option)
// 保存合同项目信息
export const api＿saveContractProject = (option = {}) => packing(get, baseApi + '/contract/saveContractProject.htm', option)
// 查询公司下所有电站
export const api＿selectAllStation = (option = {}) => packing(get, baseApi + '/BaseSearchCondition/selectAllStation.htm', option)
// 删除项目
export const api＿deleteContractProject = (option = {}) => packing(get, baseApi + '/contract/deleteContractProject.htm', option)
// 判断是否有合同权限
export const api＿getConctactManageAuth = (option = {}) => packing(get, baseApi + '/UserAuthHandle/getContractManageAuth.htm', option)
// 导出合同信息
export const api＿exportContract = '/contract/exportContract.htm'
// 导出项目信息
export const api＿exportContractProject = '/contract/exportContractProject.htm'
// 合同项目模板导出
export const api＿exportContractProjectFormwork = '/contract/exportContractProjectFormwork.htm'
// 导出内部项目
export const api＿exportInsideProject = '/contract/exportInsideProject.htm'
// 合同项目批量导入
export const api＿importContractProject = (option = {}) => packing(upload, baseApi + '/contract/importContractProject.htm', option)
// 获取执行计划列表  参数 contractId：合同id  projectManagerId：项目经理id
export const api＿getExecutionPlanList = (option = {}) => packing(get, baseApi + '/contract/getExecutionPlanList.htm', option)
// 保存执行计划列表
export const api＿saveExecutionPlan = (option = {}) => packing(postForm, baseApi + '/contract/saveExecutionPlan.htm', option)
// 获取审核日志列表  参数 contractId：合同id
export const api＿getContractAuditList = (option = {}) => packing(get, baseApi + '/contract/getContractAuditList.htm', option)
// 合同审核  参数 auditStatus: 退回传0 通过传1  contractId:合同id  auditOpinion:审核意见
export const api＿applyAudit = (option = {}) => packing(get, baseApi + '/contract/applyAudit.htm', option)
// 判断合同审核人权限
export const api＿UserAuthHandleGetBusinessManageAuth07 = (option = {}) => packing(get, baseApi + '/UserAuthHandle/getBusinessManageAuth/07.htm', option)
// 项目内容
export const api＿BasedictionarySelectAll = (option = {}) => packing(get, baseApi + '/Basedictionary/selectAll.htm', { invariant: { dictType: 'CONTRACT_COST_PROJECT' }, ...option })
// 判断合同管理员权限
export const api＿UserAuthHandleGetBusinessManageAuth09 = (option = {}) => packing(get, baseApi + '/UserAuthHandle/getBusinessManageAuth/09.htm', option)
// 上传附件
export const api＿minioUploader = (option = {}) => packing(upload, baseApi + '/minio/uploader.htm', option)
// 获取附件列表
export const api＿minioFileInfos = (option = {}) => packing(get, baseApi + '/minio/fileinfos.htm', option)
// 附件下载
export const api＿minioDownload = '/minio/download.htm'

// export const api＿minioDownload = (option = {}) => packing(get, baseApi + '/minio/download.htm', option)
