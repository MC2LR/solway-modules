import { get, postForm } from './http'
import { Notification } from 'element-ui'

/**
 * req params
 * method: 请求方法  为函数类型
 * url: 请求地址
 * option:
 *      data: 不使用later的时候，直接发送请求data为参数
 *      later: 不立即请求  默认立即请求  later = false
 *      cacheParams: 是否缓存参数 get请求默认缓存参数 post不缓存 缓存参数后再次请求将携带上一次参数
 *      onlyLatest: 是否只获取最后一次结果。发送多次请求 只获取最后一次请求结果，防止错乱
 *      sameTimeOnce: 同一个接口是否同时只允许请求一个。 默认false 为true时同一个接口只发起一个请求未响应时，不允许发起下一个请求
 *      cache： 缓存接口响应结果，默认false   当参数完全相同时不发送请求，直接返回成功
 *      invariant: 不变的参数  例如 queryCode
 *      res: 接口默认数据，或 默认数据结构
 *      ...arg: 其他挂载数据
 * res options
 *      loading: 是否正在请求中
 *      onlyLatest: 只接收最后一次响应结果
 *      sameTimeOnce: 同一个请求同时只允许存在一个请求中
 *      cache：是否缓存响应数据
 *      invariant：固定不变的参数
 *      cacheParams：是否缓存请求参数
 *      params: 上一次请求的参数或当前正在请求的参数
 *      res：接口响应的数据 使用方法 API.queryVideos({}).res
 *      diffObj：两个对象值对比，仅支持浅对比。 使用方法：API.queryVideos({}).diffObj(o1, o2)
 *      preGetdata：请求前要做的操作 使用方法：API.queryVideos({}).preGetdata(() => {...请求参数})
 *      getData：接口请求 使用方法： API.queryVideos({}).getData({...请求参数})
 *      subscribe：接口响应订阅 使用方法：API.queryVideos({}).subscribe(res => {。。。这里做一些操作})
 *      reqInterceptor: 请求拦截器，返回假，终止请求。使用方法：API.queryVideos({}).reqInterceptor(() => false), 可以有多个拦截器
 *      beforeSend: 发送请求前对参数进行修改  使用方法 API.queryVideos({beforeSend (params) {return params}})
 *      mountedRes: 挂载res  自定义挂载，修改数据返回结构  API.queryVideos({mountedRes (res) {return res}})
 *      res_interceptor：响应拦截器 不建议使用
 *      subscribeArr：响应订阅执行队列 不建议使用
 *      reqInterceptorArr：拦截器队列 请求前依次执行  不建议使用
 */

export default (method, url, { data = {}, later = false, cacheParams = null, onlyLatest = false, sameTimeOnce = false, cache = false, invariant = {}, res = {}, disabled = false, ...arg }) => {
    const obj = {
        url,
        loading: false,
        onlyLatest,
        sameTimeOnce,
        cache,
        invariant,
        cacheParams: cacheParams === null ? (method === get) : cacheParams,
        params: {},
        realRes: {},
        res,
        reqNumber: 0,
        resNumber: 0,
        disabled,
        diffObj (o1, o2) {
            delete o1.__t__
            delete o2.__t__
            if (Object.keys(o1).length !== Object.keys(o2).length) return false
            for (const key in o1) {
                if (o1[key] !== o2[key]) return false
            }
            return true
        },
        reqInterceptorArr: [],
        reqInterceptor (fun) {
            if (typeof fun !== 'function') throw Error('拦截器必须为函数类型')
            this.reqInterceptorArr.push(fun)
            return this
        },
        preGetdata (fun) {
            if (typeof fun !== 'function') throw Error('请求前置必须为函数类型')
            return this.getData(fun())
        },
        beforeSend (params) {
            return params
        },
        getData (data = { ...this.invariant }) {
            if (this.disabled) return
            if (this.sameTimeOnce && this.loading) return
            if (this.reqInterceptorArr.some(f => !f(data))) return
            this.loading = true
            if (this.cacheParams) data = { ...this.params, ...data }
            this.reqNumber++
            const oldParams = this.realParams
            this.params = { ...data, ...this.invariant }
            this.realParams = this.beforeSend({ ...data, ...this.invariant })
            if (method === get && this.cache && this.resNumber && this.diffObj(oldParams, this.realParams)) {
                const _p = new Promise(resolve => resolve(this.realRes))
                this.res_interceptor(this.realRes)
                return _p
            }
            if (method === get) this.realParams.__t__ = Date.now()
            if (method !== get && method !== postForm) this.realParams = data
            const _p = method(url, this.realParams)
            _p.then(this.res_interceptor.bind(this)).catch(this.res_catch.bind(this))
            this.promise = _p
            return _p
        },
        mountedRes (res) {
            return res || {}
        },
        res_interceptor (res = {}, _catch) {
            this.loading = false
            this.realRes = JSON.parse(JSON.stringify(res))
            this.res = res = this.mountedRes(res, this.res, this)
            this.resNumber++
            if (res.hasOwnProperty('code') && res.hasOwnProperty('msg') && (typeof res.code === 'number') && ((res.code !== 0) && (res.code !== 200)) && (process.env.NODE_ENV === 'development')) Notification.error({title: '错误', message: url + '\t：' + res.msg})
            if (onlyLatest && (this.reqNumber !== this.resNumber)) return
            let pipeData = this.res
            this.subscribeArr.forEach((v) => {
                const { s, a, e } = v
                pipeData = (_catch ? e(pipeData) : s(pipeData)) || pipeData
                a(pipeData)
            })
        },
        res_catch (res) {
            this.res_interceptor(res, 'catch')
            console.error(res)
        },
        subscribeArr: [],
        subscribe (s = () => 0, e = () => 0, a = () => 0) {
            if (typeof s !== 'function') throw Error('必须为函数类型')
            if (typeof e !== 'function') throw Error('必须为函数类型')
            if (typeof a !== 'function') throw Error('必须为函数类型')
            this.subscribeArr.push({ s, e, a })
            return this
        },
        ...arg
    }
    if (!later) obj.getData(data)
    return obj
}
