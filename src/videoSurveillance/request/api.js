import { get } from '@comm/request/http'
import packing from '@comm/request/apiPacking'
import { independent } from '@comm/tools/env'

let baseApi = ''
let videoServerBase = 'http://103.3.121.25:10000'
if (process.env.NODE_ENV === 'development' && independent) {
    baseApi = '/api'
    // videoServerBase = '/video'
}

// 视频树状结构
export const api＿queryVideos = (option = {}) => packing(get, baseApi + '/pvwp/station/queryVideos.htm', option)

// 旧版控制视频token /UserAuthHandle/getVideoToken.htm
export const api＿getVideoToken = (option = {}) => packing(get, baseApi + '/UserAuthHandle/getVideoToken.htm', option)

// 获取liveGBS token
export const api＿getToken = (option = {}) => packing(get, baseApi + '/thirdparty/proxy/edge/login.htm', option)

// 通道列表Request URL: /api/v1/device/channellist
// ?serial=34020000001320000001&q=&start=0&limit=10&online=&channel_type=&dir_serial=&sort=Channel&order=asc&_=1584959938983
export const api＿channellist = (option = {}) => packing(get, videoServerBase + '/api/v1/device/channellist', option)
