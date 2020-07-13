<template>
    <div class="report-detail">
        <div class="datepicker-con">
            <div class="date-con" v-if="dateType === 1">
                <span @click="changeDate('week', 'last')" class="arrow-con">
                    <i class="iconcomm commzuo"></i>
                </span>
                <el-date-picker
                    v-model="startDate"
                    @change="chooseDate('start')"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
                <span>至</span>
                <el-date-picker
                    v-model="endDate"
                    @change="chooseDate('end')"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
                <span @click="changeDate('week', 'next')" class="arrow-con">
                    <i class="iconcomm commyou"></i>
                </span>
            </div>
            <div class="date-con" v-if="dateType === 2">
                <span @click="changeDate('month', 'last')" class="arrow-con">
                    <i class="iconcomm commzuo"></i>
                </span>
                <el-date-picker
                    v-model="date"
                    @change="getDetailData()"
                    type="month"
                    placeholder="选择日期">
                </el-date-picker>
                <span @click="changeDate('month', 'next')" class="arrow-con">
                    <i class="iconcomm commyou"></i>
                </span>
            </div>
        </div>
        <div class="graph-con">
            <div ref="graph" class="graph" id="graph"></div>
        </div>
        <div class="table-con">
            <div class="table-head">
                <div class="weui-flex">
                    <div class="weui-flex__item">日期</div>
                    <div class="weui-flex__item">辐射量({{units.rad_chk}})</div>
                    <div class="weui-flex__item" style="text-indent:8px;">发电小时({{units.real_hours}})</div>
                    <div class="weui-flex__item">发电量(度)</div>
                </div>
            </div>
            <div class="table-body">
                <div class="table-item" v-for="item in dataList" :key="item.dtime">
                    <div class="weui-flex">
                        <div class="weui-flex__item" style="font-size:0.12rem;line-height:25px;">{{item.dtime}}</div>
                        <div class="weui-flex__item">{{item.rad_chk}}</div>
                        <div class="weui-flex__item" style="text-indent:8px;">{{item.real_hours}}</div>
                        <div class="weui-flex__item">{{item.real_kwh_chk}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {api＿queryReportDetail} from '@/request/api'
import {DatePicker} from 'element-ui'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import mixinWidthHeight from '@comm/mixin/widthHeight'
export default {
    mixins: [mixinWidthHeight],
    props: {
        id: {},
        dateType: {},
        queryType: {},
        dateObj: {}
    },
    data () {
        return {
            apartDayNum: 7, // 周报左切，右切，按间隔几天改动，默认是7天
            apartMonthNum: 1, // 月报左切，右切，按间隔几个月改动，默认1个月，目前仅支持一个月
            startDate: new Date(new Date().getTime() - 86400000 * 7),
            endDate: new Date(new Date().getTime() - 86400000),
            date: new Date(),
            myChart: null,
            dataList: [],
            units: {},
            queryReportDetail: api＿queryReportDetail({ // 周报，月报详情
                later: true,
                onlyLatest: true
            })
        }
    },
    created () {
        this.openModal()
    },
    mounted () {
    },
    methods: {
        openModal () {
            if (this.dateType === 1) { // 周
                this.startDate = this.dateObj.startDate
                this.endDate = this.dateObj.endDate
            } else if (this.dateType === 2) { // 月
                this.date = this.dateObj.date
            }
            this.getDetailData()
        },
        // 获取上个月的完整时间
        getLastMonthTime (method) {
            let nowDate = new Date(this.date)
            let year = nowDate.getFullYear()
            let month = nowDate.getMonth()
            if (method === 'last') {
                if (month === 0) {
                    year -= 1
                    month = 12
                }
            } else if (method === 'next') {
                month += 2
                if (month === 13) {
                    year += 1
                    month = 1
                }
            }
            this.date = new Date(year + '-' + month)
        },
        // 改变日期
        changeDate (type, method) {
            if (type === 'week') {
                if (method === 'last') { // 往前移一个设定区间的时间
                    this.startDate = new Date(this.startDate).getTime() - (86400000 * (this.apartDayNum))
                    this.endDate = this.startDate + (86400000 * (this.apartDayNum - 1))
                } else if (method === 'next') { // 往后移一个设定区间的时间
                    this.startDate = new Date(this.startDate).getTime() + (86400000 * (this.apartDayNum))
                    this.endDate = this.startDate + (86400000 * (this.apartDayNum - 1))
                }
            } else if (type === 'month') {
                this.getLastMonthTime(method)
            }
            this.getDetailData()
        },
        // 选择日
        chooseDate (type) {
            if (type === 'start') { // 若改变开始时间，则自动改变结束时间
                this.apartDayNum = 7
                this.endDate = new Date(this.startDate).getTime() + 86400000 * (this.apartDayNum - 1)
            } else if (type === 'end') { // 若改变结束时间，则间隔区间值改变，按最新的间隔计算
                this.apartDayNum = (new Date(this.endDate).getTime() - new Date(this.startDate).getTime()) / 86400000 + 1
            }
            this.getDetailData()
        },
        getDetailData () {
            this.dataList = []
            let paramsData = {
                dateType: this.dateType,
                queryType: this.queryType
            }
            if (this.dateType === 1) {
                paramsData['startDate'] = new Date(this.startDate).Format('yyyy-MM-dd')
                paramsData['endDate'] = new Date(this.endDate).Format('yyyy-MM-dd')
            } else if (this.dateType === 2) {
                paramsData['date'] = new Date(this.date).Format('yyyy-MM')
            }
            if (this.queryType === 1) {
                paramsData['comId'] = this.id
            } else if (this.queryType === 3) {
                paramsData['stId'] = this.id
            }
            this.queryReportDetail.getData(paramsData).then(res => {
                if (res.code === 200 || res.code === 0) {
                    this.units = res.data.units
                    let graph = document.getElementById('graph')
                    graph.style.width = (res.data.data.dtime.length * 50) + 'px'
                    graph.style.height = (window.screen.availHeight / 2 - 50) + 'px'
                    graph.style.minWidth = '100%'
                    this.drawGraph(res.data.data)
                    this.drawList(res.data.data)
                } else {
                    this.drawGraph({})
                    this.drawList({})
                }
            })
        },
        drawGraph (data) {
            this.myChart = this.$echarts.init(this.$refs.graph)
            let dtime = data.dtime ? data.dtime.map(v => (v.substring(v.length - 2))) : []
            let option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                grid: {
                    top: '35px',
                    left: '45px',
                    right: '40px',
                    bottom: '12px',
                    containLabel: true
                },
                xAxis: {
                    name: '日期',
                    type: 'category',
                    data: dtime,
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(0,0,0,0.5)'
                        }
                    },
                    nameTextStyle: {
                        color: 'rgba(0,0,0,0.5)',
                        fontSize: 12
                    },
                    nameGap: 5,
                    splitNumber: 4,
                    splitLine: {
                        show: false,
                        lineStyle: {
                            color: 'rgba(0,0,0,0.5)',
                            width: 1
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            color: 'rgba(0,0,0,0.5)',
                            fontSize: '12'
                        }
                    }
                },
                yAxis: [{
                    name: '辐射量' + this.units.rad_chk,
                    type: 'value',
                    axisTick: {
                        show: false
                    },
                    nameTextStyle: {
                        color: 'rgba(0,0,0,0.5)',
                        fontSize: 12
                    },
                    splitNumber: 4,
                    nameGap: 5,
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(0,0,0,0.5)'
                        }
                    },
                    splitLine: {
                        show: false,
                        lineStyle: {
                            color: 'rgba(0,0,0,0.5)',
                            width: 1
                        }
                    },
                    axisLabel: {
                        show: false,
                        textStyle: {
                            color: 'rgba(0,0,0,0.5)',
                            fontSize: '12'
                        }
                    }
                }, {
                    name: '发电小时数h',
                    type: 'value',
                    axisTick: {
                        show: false
                    },
                    nameTextStyle: {
                        color: 'rgba(0,0,0,0.5)',
                        fontSize: 12
                    },
                    splitNumber: 4,
                    nameGap: 5,
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(0,0,0,0.5)'
                        }
                    },
                    splitLine: {
                        show: false,
                        lineStyle: {
                            color: 'rgba(0,0,0,0.5)',
                            width: 1
                        }
                    },
                    axisLabel: {
                        show: false,
                        textStyle: {
                            color: 'rgba(0,0,0,0.5)',
                            fontSize: '12'
                        }
                    }
                }],
                series: [{
                    name: '发电小时数',
                    type: 'bar',
                    barWidth: 7,
                    itemStyle: {
                        normal: {
                            color: '#646498'
                        }
                    },
                    data: data.real_hours
                }, {
                    name: '辐射量',
                    type: 'line',
                    itemStyle: {
                        normal: {
                            color: '#ffb42b'
                        }
                    },
                    data: data.rad_chk
                }]
            }
            this.myChart.setOption(option, true)
            this.myChart.resize()
        },
        drawList (data) {
            this.dataList = []
            if (!data.dtime.length) return
            for (let i = 0; i < data.dtime.length; i++) {
                this.dataList.push({
                    dtime: data.dtime[i],
                    rad_chk: data.rad_chk[i],
                    real_hours: data.real_hours[i],
                    real_kwh_chk: data.real_kwh_chk[i]
                })
            }
        }
    },
    components: {
        ElDatePicker: DatePicker
    }
}
</script>

<style lang="scss">
.el-input--suffix .el-input__inner {
    padding-right: 0px;
}
</style>
<style lang="scss" scoped>
.el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 115px;
}
.report-detail {
    background: white;
    height: calc(100vh - 50px);
    overflow:auto;
    .date-con{
        text-align: center;
        margin-bottom:10px;
        margin-top: 10px;
    }
    .arrow-con{
        display: inline-block;
        width: 0.25rem;
        height: 32px;
        text-align: center;
    }
    .graph-con{
        background: rgba(222, 222, 222, 0.1);
        overflow: auto;-webkit-overflow-scrolling: touch;
    }
    .graph{
        background: rgba(222, 222, 222, 0.1);
    }
    .table-con{
        margin:10px;
        .table-head{
            background: rgba(110,110,110,0.2);
            line-height: 32px;
            font-size: 0.12rem;
        }
        .table-body{
            height: calc(50vh - 120px);
            overflow:auto;
            -webkit-overflow-scrolling: touch;
            .table-item{
                margin-bottom:8px;
            }
        }
    }
}
</style>
