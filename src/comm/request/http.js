import axios from 'axios'
import qs from 'qs'
import { Notification } from 'element-ui'
import goLoging from '@comm/tools/goLogin'

// 创建axios实例
const service = axios.create({
    withCredentials: true,
    timeout: 60000 // 请求超时时间
})

let CIP = ''
getLocalIPs(ips => {
    CIP = ips.join()
})

export const commonXhrHeader = {
    'X-Requested-With': 'XMLHttpRequest',
    'Authorization': 'Bearer ' + window.localStorage.token,
    'CIP': CIP
}

export const refreshToken = async () => {
    const refreshToken = window.localStorage.refreshToken
    if (!refreshToken) return
    postForm('/microplat/oauth/token', {
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
        client_id: 'necloud_web',
        client_secret: 'necloud618',
        tenant: window.localStorage.tenant
    }).then(res => {
        if (res.code !== 200) return
        window.localStorage.token = res.data.access_token
        window.localStorage.refreshToken = res.data.refresh_token
        window.localStorage.tenant = res.data.tenant
        window.localStorage.expiresIn = Date.now() + res.data.expires_in * 1000
        console.log(res.data.access_token, '过期时间：', window.localStorage.expiresIn, res.data.expires_in)
    })
}
setTimeout(refreshToken, 30 * 1000)
setInterval(refreshToken, 60 * 60 * 1000)

service.interceptors.request.use(async config => {
    const expiresInTime = +window.localStorage.expiresIn
    if (expiresInTime && (Date.now() > expiresInTime)) {
        alert('登录状态过期，请重新登录')
        window.localStorage.removeItem('expiresIn')
        goLoging()
    }
    const token = window.localStorage.getItem('token')
    token && (config.headers.Authorization = 'Bearer ' + token)
    return config
}, error => Promise.reject(error))

service.interceptors.response.use(
    async response => {
        // debugger
        if (response.status !== 200) console.error(response.status)
        if (response.headers.login_status === 'TIMEOUT') {
            goLoging()
        }
        if (response.data.code === 401) {
            goLoging()
        }
        if (response.data.code === 10003011) {
            goLoging()
        }
        // if (process.env.name === 'newEnergyCloud') {
        //     const store = await import('@' + process.env.name + '/store')
        //     const beiKongRole = store.default.getters.role_list.find(v => v.comId === 196)
        //     if (beiKongRole && beiKongRole.roleId === store.default.getters.current_role) {
        //         const str = response.request.responseText
        //             .replace(/吕家渤海/g, '实验电站')
        //             .replace(/中广核三期基金/g, '北控清洁能源集团有限公司实验电站')
        //         try {
        //             const resposeJson = JSON.parse(str)
        //             return resposeJson
        //         } catch (error) {
        //             return response.data
        //         }
        //     }
        // }
        return response.data
    },
    error => {
        if (error.response && error.response.status === 404) {
            Notification.error({
                title: '错误',
                message: '接口不存在'
            })
        } else {
            error.response && Notification.error({
                title: '错误',
                message: error.response.status + ': 错误：接口请求错误'
            })
        }
        return Promise.reject(error.response)
    }
)

export function get (url, params = {}, {headers = {}, ...options} = {}) {
    // params.t = new Date().getTime()
    return service({
        url: url,
        method: 'get',
        headers: {
            ...commonXhrHeader,
            ...headers
        },
        params,
        withCredentials: true,
        ...options
    })
}

export function postJson (url, data = {}, {headers = {}, ...options} = {}) {
    return service({
        url: url,
        method: 'post',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            ...commonXhrHeader,
            ...headers
        },
        data: JSON.stringify(data),
        ...options
    })
}

export function postJson2 (url, data = {}, {headers = {}, ...options} = {}) {
    return service({
        url: url,
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            ...commonXhrHeader,
            ...headers
        },
        data: JSON.stringify(data),
        ...options
    })
}

export function postForm (url, data = {}, {headers = {}, ...options} = {}) {
    return service({
        url: url,
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            ...commonXhrHeader,
            ...headers
        },
        data: qs.stringify(data),
        ...options
    })
}

export function upload (url, data = {}) {
    const _data = new FormData()
    for (const key in data) {
        if (data.hasOwnProperty(key)) _data.append(key, data[key])
    }
    return service({
        url: url,
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data',
            ...commonXhrHeader
        },
        data: _data
    })
}

export const download = ({
    params = {},
    url,
    filename,
    callback = () => { },
    blob = false,
    download = true,
    firstName = '',
    text = false,
    // progress 为false 是使用a标签下载
    progress = () => { }
}) => {
    const paramsStr = qs.stringify(params)
    const fullUrl = url + (paramsStr && ('?' + paramsStr))
    if (download && !blob && !text && !progress) {
        const elink = document.createElement('a')
        elink.style.display = 'none'
        elink.href = fullUrl
        elink.target = '_blank'
        document.body.appendChild(elink)
        elink.click()
        document.body.removeChild(elink)
        return
    }
    const oReq = new XMLHttpRequest()
    oReq.open('GET', fullUrl, true)
    oReq.responseType = 'blob'
    oReq.addEventListener('progress', ({ total, loaded }) => progress && progress(total, loaded), false)
    oReq.onload = function (oEvent) {
        if (oReq.response.size === 0 || oReq.status === 404) {
            if (confirm(' 文件为空或不存在，确定继续执行吗？')) __fun()
            return callback()
        } else __fun()

        function __fun () {
            const _blob = new Blob([oReq.response])
            if (download) {
                const elink = document.createElement('a')
                let hasFileName = oReq.getResponseHeader('content-disposition')
                // filename = filename || (hasFileName && hasFileName.split(`UTF-8''`)[1] && decodeURI(hasFileName.split(`UTF-8''`)[1]))

                elink.download = filename || (hasFileName && hasFileName.split(`UTF-8''`)[1] && decodeURI(hasFileName.split(`UTF-8''`)[1])) ||
                    ((firstName || 'download') + '.') + (hasFileName && hasFileName.split('.')[hasFileName.split('.').length - 1]).replace(/"/, '')

                elink.style.display = 'none'
                elink.href = URL.createObjectURL(_blob)
                elink.target = '_blank'
                document.body.appendChild(elink)
                elink.click()
                document.body.removeChild(elink)
                if (!blob) callback()
                return
            }
            if (text) {
                const reader = new FileReader()
                reader.onload = function (event) {
                    const content = reader.result
                    callback(content)
                }
                return reader.readAsText(_blob)
            }
            if (blob) {
                return callback(_blob)
            }
        }
    }
    oReq.send()
}

export {
    service
}

export function getLocalIPs (callback) {
    var ips = []
    var RTCPeerConnection = window.RTCPeerConnection || window.webkitRTCPeerConnection || window.mozRTCPeerConnection

    var pc = new RTCPeerConnection({ iceServers: [] })
    pc.createDataChannel('')

    pc.onicecandidate = function (e) {
        if (!e.candidate) {
            pc.close()
            callback(ips)
            return
        }
        var ip = /^candidate:.+ (\S+) \d+ typ/.exec(e.candidate.candidate)[1]
        if (ips.indexOf(ip) === -1) ips.push(ip)
    }
    pc.createOffer(function (sdp) {
        pc.setLocalDescription(sdp)
    }, function onerror () { })
}
