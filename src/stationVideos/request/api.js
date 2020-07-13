import { get } from '@comm/request/http'
import packing from '@comm/request/apiPacking'
import { independent } from '@comm/tools/env'

let baseApi = ''
if (process.env.NODE_ENV === 'development' && independent) baseApi = '/api'

// token 获取 /thirdparty/ys7/token
export const api＿thirdpartyYs7Token = (option = {}) => packing(get, baseApi + '/thirdparty/ys7/token.htm', option)
// 视频代理通用接口 摄像头列表 /thirdparty/ys7/api/data?apiurl=api/lapp/camera/list&pageStart=0&pageSize=20
export const api＿lappCameraList = (option = {}) => packing(get, baseApi + '/thirdparty/ys7/api/data.htm', { invariant: { apiurl: 'api/lapp/camera/list' }, ...option })
// 视频代理通用接口 根据时间获取存储文件信息 /thirdparty/ys7/api/data?apiurl=api/lapp/video/by/time&pageStart=0&pageSize=20
export const api＿lappVideoByTime = (option = {}) => packing(get, baseApi + '/thirdparty/ys7/api/data.htm', { invariant: { apiurl: 'api/lapp/video/by/time' }, ...option })
// 视频代理通用接口 设备抓拍图片 /thirdparty/ys7/api/data?apiurl=api/lapp/device/capture&pageStart=0&pageSize=20
export const api＿lappDeviceCapture = (option = {}) => packing(get, baseApi + '/thirdparty/ys7/api/data.htm', { invariant: { apiurl: 'api/lapp/device/capture' }, ...option })
// 获取摄像头验证码 /ce/video/curr/station/list
export const api＿ceVideoCurrStationList = (option = {}) => packing(get, baseApi + '/ce/video/curr/station/list.htm', option)
// 获取摄像头验证码 /ce/video/validate-code/curr/station
export const api＿ceVideoValidateCodeCurrStation = (option = {}) => packing(get, baseApi + '/ce/video/validate-code/curr/station.htm', option)
