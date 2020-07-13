import { api＿selectAnlsTypeV2, api＿analysisSelectAnlsType } from '@/request/api'
import Vue from 'vue'
export const moduleName = 'expertAnalysis'
export const DragSource = {
    original: 'original',
    filters: 'filters',
    group: 'group',
    xAxis: 'xAxis',
    yAxis: 'yAxis'
}

let enterflag = false

export default {
    namespaced: true,
    state: {
        version: void 0,
        // 数据分类
        dataClassification: [
            { ds: [] },
            { ds: [] }
        ],
        // 数据类型来源
        dataType: 0,
        // 数据
        dataSource: 0,
        // 筛选器 筛选结果
        filtersResult: {},
        // 筛选列表
        filters: [],
        // x轴
        xAxis: [],
        // y轴
        yAxis: [],
        // 扩展
        group: [],
        // 当前拖拽数据类型
        dragType: '',
        // 当前拖拽的数据
        dragData: null,
        // 拖拽数据从哪来
        dragSource: '',
        // 拖拽元素当前进入的区域
        dragEnter: '',
        // 相对当前图表条件已改变
        changed: true,
        // 图表类型 0: 柱状图、折线图   1：散点图
        chartType: null,
        // 图表加载中
        chartLoading: false,
        // 图表接口返回数据
        apiData: null,
        // 柱状图折线图配置
        lineBarChartConfig: {},
        // 散点图配置
        scatterChartConfig: {},
        // 当前图表状态
        currentChartState: {}
    },
    mutations: {
        // 所有数据分类
        SET_DATA_CLASSIFICATION (state, dataClassification) {
            state.dataClassification = dataClassification
        },
        // 数据类型
        SET_DATA_TYPE (state, dataType) {
            state.changed = true
            state.dataType = dataType
        },
        // 数据源
        SET_DATA_SOURCE (state, dataSource) {
            state.changed = true
            state.dataSource = dataSource
        },
        // 拖拽数据类型
        SET_DRAG_SOURCE (state, dragSource) {
            state.changed = true
            state.dragSource = dragSource
        },
        // 拖拽的数据
        SET_DRAG_DATA (state, dragData) {
            state.changed = true
            state.dragData = dragData
        },
        // 拖拽的数据进入区域
        SET_DRAG_ENTER (state, dragEnter = '') {
            state.changed = true
            state.dragEnter = dragEnter
        },
        // 拖拽结束后设置 列表（过滤列表、分组、x轴、y轴）
        SET_LIST (state, {source, list}) {
            state.changed = true
            state[source] = list
        },
        // 设置filter data
        SET_FILTER_DATA (state, {key, value}) {
            state.changed = true
            state.filtersResult[key] = value
        },
        // 清除filter
        CLEAR_FILTER_DATA (state) {
            state.changed = true
            state.filtersResult = {}
        },
        // 设置指标数据算法类型
        SET_TARGET_DATA_TYPE (state, {axis, index, type}) {
            state.changed = true
            state[axis][index].targetDataType = type
        },
        // 查询图表
        QUERY_CHART (state, {type, apiData}) {
            state.chartType = type
            if (apiData) {
                state.changed = false
                state.apiData = {
                    ...apiData.body
                }
                state.currentChartState = {...state}
            } else {
                state.apiData = null
            }
        },
        // 图表加载中？
        SET_LOADING (state, loading) {
            state.chartLoading = loading
        },
        // 模板数据回写
        TPL_DATA_REVIEW (state, data) {
            Object.keys(data).forEach(key => {
                state[key] = data[key]
            })
        },
        // 清空条件与画布
        CLEAR_CHART (state) {
            state.chartType = null
            state.group = []
            state.xAxis = []
            state.yAxis = []
            state.filters = []
            state.apiData = null
        },
        // 图表属性配置 颜色 线宽 柱状图、折线图
        SET_CHART_CONFIG (state, {type, key, config}) {
            state[type] = {
                ...state[type],
                [key]: {...config}
            }
        }
    },
    actions: {
        // 初始化所有数据分类
        async initDataClassification ({commit}) {
            const res = await api＿selectAnlsTypeV2({ data: { stationClass: '01' } }).promise
            if (res?.code !== 0) return
            const data = res?.body?.map((v, dataTypeIndex) => ({
                ...v,
                ds: v.ds.map(xv => {
                    const dtimeItem = xv.fd_1.find(v => v.fd_tag === 'dtime')
                    return {
                        ...xv,
                        fd_1: dtimeItem ? xv.fd_1.filter(xxv => xxv.fd_tag !== 'dtime').concat(dataTypeIndex === 0 ? [
                            {
                                ...dtimeItem,
                                fd_tag: 'dtime_1',
                                fd_name: '时间-年'
                            },
                            {
                                ...dtimeItem,
                                fd_tag: 'dtime_2',
                                fd_name: '时间-月'
                            },
                            {
                                ...dtimeItem,
                                fd_tag: 'dtime_3',
                                fd_name: '时间-日'
                            }
                        ] : [
                            {
                                ...dtimeItem,
                                fd_tag: 'dtime_5',
                                fd_name: '时间-分钟'
                            }
                        ]) : xv.fd_1
                    }
                })
            }))
            commit('SET_DATA_CLASSIFICATION', data)
        },
        // 切换数据类型
        changeDataType ({commit, state, dispatch}, dataType) {
            if (dataType === state.dataType) return
            commit('SET_DATA_TYPE', dataType)
            dispatch('changeDataSource', 0)
        },
        // 切换数据源
        changeDataSource ({commit, dispatch}, dataSource) {
            commit('SET_DATA_SOURCE', dataSource)
            dispatch('clearData')
        },
        // 清空条件
        clearData ({commit}) {
            commit('SET_LIST', { source: DragSource.filters, list: [] })
            commit('SET_LIST', { source: DragSource.group, list: [] })
            commit('SET_LIST', { source: DragSource.xAxis, list: [] })
            commit('SET_LIST', { source: DragSource.yAxis, list: [] })
            commit('CLEAR_FILTER_DATA')
        },
        // 开始拖拽
        dragstart ({ commit }, {dragSource, data}) {
            commit('SET_DRAG_SOURCE', dragSource)
            commit('SET_DRAG_DATA', data)
        },
        // 结束拖拽
        dragend ({commit, state, dispatch}) {
            enterflag = false
            const { dragSource, dragEnter, dragData } = state
            if (dragSource !== DragSource.original) {
                commit('SET_LIST', { source: dragSource, list: state[dragSource].filter(v => v.fd_key !== dragData.fd_key) })
                // if (dragSource === DragSource.xAxis) {
                //     commit('SET_LIST', {source: DragSource.group, list: []})
                // }
            }
            if (dragEnter && (!state[dragEnter].some(v => v.fd_key === dragData.fd_key)) && dragSource !== 'filters') {
                dispatch('dragendAndEnter')
            }
            if (dragSource === 'filters') {
                commit('SET_FILTER_DATA', {key: dragData.fd_key, value: null})
                commit('SET_FILTER_DATA', {key: dragData.fd_tag, value: null})
                // if (dragData.fd_tag.indexOf('dtime') === 0) {
                //     commit('SET_FILTER_DATA', {key: 'dtime', value: null})
                // } else if () {
                //     commit('SET_FILTER_DATA', {key: 'stid', value: null})
                // }
            }
            commit('SET_DRAG_SOURCE', '')
            commit('SET_DRAG_DATA', null)
        },
        // 结束拖拽 并且进入区域
        dragendAndEnter ({commit, state}) {
            const { dragEnter, dragData } = state
            // 如果区域是过滤器
            if (dragEnter === DragSource.filters) {
                if (dragData.fd_tag === 'stid' && +state.dataType === 1) return Vue.prototype.$message('原始数据筛选必须精确到设备，请选择设备筛选')
                Vue.prototype.$bus.emit('expertAnalysisFilter', dragData)
                if (state[dragEnter].some(v => v.fd_key === dragData.fd_key)) return
                if (dragData.fd_tag.indexOf('dtime') === 0 && state.filters.some(v => v.fd_tag.indexOf('dtime') === 0)) return
            }
            // 如果是维度，
            if (dragData.dataType === 'dimension') {
                // 进入分组区域
                if (dragEnter === DragSource.group) {
                    // X轴已选维度  X轴维度不是时间  不支持
                    if (state.xAxis[0] && state.xAxis[0].dataType === 'dimension' && state.xAxis[0].fd_tag.indexOf('dtime') !== 0) {
                        return Vue.prototype.$message('不支持此操作，x轴维度为时间时才可以分组')
                    }
                    // X轴已选维度   X轴维度是时间  分组也是时间   不支持
                    if (state.xAxis[0] && state.xAxis[0].dataType === 'dimension' && state.xAxis[0].fd_tag.indexOf('dtime') === 0) {
                        if (dragData.fd_tag.indexOf('dtime') === 0) {
                            return Vue.prototype.$message('暂不支持此操作')
                        }
                    }
                    // X轴已选维度   分组也选了维度   不能再选维度了
                    if (state.xAxis[0] && state.group.length >= 1 && state.xAxis[0].dataType === 'dimension') {
                        return Vue.prototype.$message('X轴已选维度，分组维度只能选择一个')
                    }
                    // 分组维度不能再多了
                    if (state.group.length >= 2) {
                        return Vue.prototype.$message('分组维度最多选择两个')
                    }
                    // 分组两个维度事，有且只有一个时间维度
                    if (state.group.length === 1) {
                        if ([state.group[0].fd_tag, dragData.fd_tag].filter(v => v.indexOf('dtime') === 0).length !== 1) {
                            return Vue.prototype.$message('双维度时必须有且只有一个时间维度')
                        }
                    }
                }
                if (dragEnter === DragSource.xAxis) {
                    // X轴只能选择一项判断
                    if (state.xAxis.length >= 1) {
                        return Vue.prototype.$message('X轴只能选择一项')
                    }
                    // 已选分组 分组维度两个或以上了，不能再x轴分组
                    if (state.group.length > 1) {
                        return Vue.prototype.$message('暂不支持此操作')
                    }
                    // 已选分组   x轴分组只能是时间
                    if (state.group[0] && dragData.fd_tag.indexOf('dtime') !== 0) {
                        return Vue.prototype.$message('暂不支持此操作')
                    }
                    // 已选分组  分组里有时间   x轴也是时间  不支持
                    if (dragData.fd_tag.indexOf('dtime') === 0 && state.group[0] && state.group[0].fd_tag.indexOf('dtime') === 0) {
                        return Vue.prototype.$message('暂不支持此操作')
                    }
                }
                // y轴不可以选维度
                if (dragEnter === DragSource.yAxis) {
                    return Vue.prototype.$message('y轴只可以选择指标')
                }
            }
            // 如果是指标
            if (dragData.dataType === 'target') {
                // 如果是分组  分组里面不可以选指标
                if (dragEnter === DragSource.group) return Vue.prototype.$message('分组只能选维度')
                // 一个区域选了维度  不可以再选指标
                if ((dragEnter === DragSource.xAxis || dragEnter === DragSource.yAxis) && state[dragEnter].some(v => v.dataType === 'dimension')) {
                    return Vue.prototype.$message('已选维度，不可以再选指标')
                }
                // X轴只能选择一项
                if (state[DragSource.xAxis].length && dragEnter === DragSource.xAxis) {
                    return Vue.prototype.$message('X轴只能选一个')
                }
                // 指标最多能选两项
                if ((state[DragSource.xAxis].filter(v => v.dataType === 'target').length + state[DragSource.yAxis].filter(v => v.dataType === 'target').length) >= 2) {
                    return Vue.prototype.$message('指标最多选两个')
                }
            }

            commit('SET_LIST', { source: dragEnter, list: state[dragEnter].concat(dragData) })
        },
        // 拖拽进入区域
        dragenter ({commit, state}, type) {
            enterflag = true
            if (type === state.dragEnter) return
            commit('SET_DRAG_ENTER', type)
        },
        // 拖拽离开区域
        dragleave ({commit}) {
            enterflag = false
            setTimeout(() => {
                if (enterflag) return
                commit('SET_DRAG_ENTER')
            }, 200)
        },
        // 设置过滤数据
        setFilterData ({commit}, {key, value}) {
            commit('SET_FILTER_DATA', {key, value})
        },
        // 设置指标数据算法类型
        setTargetDataType ({commit, state}, {axis, index, type}) {
            if (state[axis][index].targetDataType === type) return
            commit('SET_TARGET_DATA_TYPE', {axis, index, type})
        },
        // 图表颜色、线宽配置
        setChartOption ({commit}, {type, key, config}) {
            commit('SET_CHART_CONFIG', {type, key, config})
        },
        // 模板数据回写 tplDataReview
        tplDataReview ({commit, state}, historyData) {
            if (historyData.version !== state.version) {
                throw new Error('模板数据版本更新，请重新保存模板')
            }
            commit('TPL_DATA_REVIEW', historyData)
        },
        // 清空条件与画布
        clearChart ({commit}) {
            Vue.prototype.$MessageBox.confirm('确定清空当前条件与画布?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                commit('CLEAR_CHART')
                commit('CLEAR_FILTER_DATA')
            })
        },
        // 查询
        queryData ({commit, state}) {
            if (!(state.xAxis.length && state.yAxis.length)) return Vue.prototype.$message('请选择X轴Y轴')
            // let isGroup = false
            if (state.xAxis[0].dataType === 'target') {
                // isGroup = true
                if (state.group.length === 0) return Vue.prototype.$message('请选择分组')
            }
            const stEqids = state.filtersResult.st_eqid?.selectedDevice?.sts?.reduce((a, b) => {
                return a.concat(state.filtersResult.st_eqid.selectedDevice[b].devices.map(v => v.st_eqid))
            }, [])
            if (+state.dataType === 1) {
                if (!(state.filtersResult.dtime && stEqids)) return Vue.prototype.$message('原始数据查询（设备、时间）筛选必填。')
                if (stEqids.length > 10) return Vue.prototype.$message('原始数据查询设备数量不能大于10。')
                if (state.filtersResult.dtime.dates?.length > 7) return Vue.prototype.$message('原始数据查询时间不能大于7天。')
            }
            // 分组维度   非分组情况
            // const gdsFdKey = state.xAxis[0].fd_key
            // 是否时间维度   非分组情况
            // const isDtime = isGroup ? false : (gdsFdKey.indexOf('dtime') === 0)
            // 请求参数对象
            const reqParam = {}
            // 电站类型
            reqParam.stcls = '01'
            // 数据类型
            reqParam.sourceType = state.dataClassification[state.dataType].k
            // 分析类型
            // reqParam.anlsType = isGroup ? 1 : (isDtime ? 2 : 3)
            const xFdKey = state.xAxis[0].fd_key
            const xFdTag = state.xAxis[0].fd_tag
            reqParam.anlsType = state.xAxis[0].dataType === 'target' ? 1 : (xFdTag.indexOf('dtime') === 0 ? 2 : 3)
            // 维度类型
            reqParam.dmsType = state.dataClassification[state.dataType].ds[state.dataSource].k
            // 指标查询字段
            reqParam.fds = state.yAxis.map(v => ({
                fdKey: v.fd_key,
                fdAgg: v.targetDataType || null
            })).concat((reqParam.anlsType === 1) ? {
                fdKey: state.xAxis[0].fd_key,
                isx: 1,
                fdAgg: state.xAxis[0].targetDataType || null
            } : [])
            // 指标字段过滤器
            reqParam.fts = state.yAxis.map(v => [
                state.filtersResult[v.fd_key]?.gte && {
                    fdKey: v.fd_key,
                    fdVal: state.filtersResult[v.fd_key]?.gte,
                    op: 'gte'
                },
                state.filtersResult[v.fd_key]?.lte && {
                    fdKey: v.fd_key,
                    fdVal: state.filtersResult[v.fd_key]?.lte,
                    op: 'lte'
                }
            ]).flatMap(x => x).concat((reqParam.anlsType === 1) ? [
                state.filtersResult[state.xAxis[0].fd_key]?.gte && {
                    fdKey: state.xAxis[0].fd_key,
                    fdVal: state.filtersResult[state.xAxis[0].fd_key]?.gte,
                    op: 'gte'
                },
                state.filtersResult[state.xAxis[0].fd_key]?.lte && {
                    fdKey: state.xAxis[0].fd_key,
                    fdVal: state.filtersResult[state.xAxis[0].fd_key]?.lte,
                    op: 'lte'
                }
            ] : []).filter(v => v)
            // 分组维度
            const groupFdKey0 = state.group[0] && state.group[0].fd_key
            const groupFdTag0 = state.group[0] && state.group[0].fd_tag
            reqParam.gds = (reqParam.anlsType === 1) ? state.group.map(v => {
                return v.fd_tag.indexOf('dtime') === 0 ? {fdKey: v.fd_key, timeType: v.fd_tag.split('_')[1]} : {fdKey: v.fd_key}
            }) : (
                reqParam.anlsType === 2
                ? (
                    state.group?.[0] ? [
                        {fdKey: groupFdKey0},
                        {fdKey: xFdKey, timeType: xFdTag.split('_')[1]}
                    ] : [{fdKey: xFdKey, timeType: xFdTag.split('_')[1]}]
                )
                : (
                    groupFdKey0 ? [
                        groupFdTag0.indexOf('dtime') === 0 ? {fdKey: groupFdKey0, timeType: groupFdTag0.split('_')[1]} : {fdKey: groupFdKey0},
                        {fdKey: xFdKey}
                    ] : [{fdKey: xFdKey}]
                )
            )
            if (reqParam.gds.length === 2 && (reqParam.anlsType === 1) && reqParam.gds[0].timeType) {
                reqParam.gds[2] = reqParam.gds[0]
                reqParam.gds[0] = reqParam.gds[1]
                reqParam.gds[1] = reqParam.gds[2]
                reqParam.gds.length = 2
            }
            // 时间维度过滤
            reqParam.dmsTime = state.filtersResult?.dtime ? {
                dateType: state.filtersResult?.dtime?.dateType || 0,
                dates: state.filtersResult?.dtime?.dates || []
            } : {dateType: 0, dates: []}
            // 电站维度过滤
            reqParam.dmsTypeBs = state.filtersResult?.stid ? [{ids: state.filtersResult?.stid}] : []
            // 设备维度过滤
            reqParam.dmsTypeAs = state.filtersResult.st_eqid?.selectedDevice?.sts ? [{
                st_eqids: stEqids
            }] : []
            return new Promise((resolve, reject) => {
                commit('SET_LOADING', true)
                api＿analysisSelectAnlsType({ data: reqParam }).promise.then(res => {
                    commit('SET_LOADING', false)
                    if (!res.body) {
                        commit('QUERY_CHART', {type: null, apiData: null})
                        return Vue.prototype.$message.error(res.msg || '查询失败')
                    }
                    commit('QUERY_CHART', {
                        type: (reqParam.anlsType === 2 && state.group.length) ? 3 : state.group.length,
                        apiData: res
                    })
                    resolve(res)
                }).catch(res => {
                    commit('SET_LOADING', false)
                    Vue.prototype.$message.error(res?.msg || '查询失败')
                })
            })
        }
    }
}
