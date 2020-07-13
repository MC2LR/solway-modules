<template>
    <div v-loading="deviceHistoryData.loading && deviceHistoryData.resNumber === 0">
        <ve-line :data="chartData" :settings="chartSettings" :extend="extend" height="100%"></ve-line>
    </div>
</template>

<script>
import {api＿wpDeviceHistoryData} from '@newEnergyCloud/request/api'
export default {
    props: {
        device: {
            type: Object
        }
    },
    data () {
        const {stid, sn, id, type} = this.device
        this.chartSettings = {
            labelMap: {
                dtime: '时间',
                wdspd: '风速(m/s)',
                w: '功率(kW)'
            },
            legendName: {

            }
        }
        this.extend = {
            grid: {
                bottom: 10
            }
        }
        return {
            deviceHistoryData: api＿wpDeviceHistoryData({
                onlyLatest: true,
                data: {
                    pageIndex: 1,
                    pageSize: 99999,
                    devicetype: type,
                    enddate: new Date().Format('yyyy-MM-dd hh:mm'),
                    begindate: new Date(Date.now() - 1000 * 60 * 60 * 2).Format('yyyy-MM-dd hh:mm'),
                    stationid: stid,
                    serialnumber: sn,
                    id
                }
            }).subscribe(res => this.setLineData(res)),
            chartData: {
                columns: ['dtime', 'wdspd', 'w'],
                rows: []
            }
        }
    },
    methods: {
        setLineData (res) {
            this.chartData.rows = res.body.data.reverse().map(v => ({
                dtime: new Date(v.dtime * 1000).Format('yyyy-MM-dd hh:mm:ss').split(' ')[1],
                wdspd: v.wdspd,
                w: v.w
            }))
        }
    },
    created () {
        this.timer = setInterval(() => this.deviceHistoryData.getData({begindate: new Date(Date.now() - 1000 * 60 * 60 * 2).Format('yyyy-MM-dd hh:mm')}), 30 * 1000)
    },
    beforeDestroy () {
        clearInterval(this.timer)
    }
}
</script>
