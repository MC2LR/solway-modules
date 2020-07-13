<template>
    <div class="device-list clearfix" v-loading="deviceMonitorList.loading">
        <transition-group v-if="$oc(deviceMonitorList.res, 'body', 'deviceList', 'data')">
            <div
                class="device"
                v-for="(item, index) in dataList"
                :class="{avg: avgIndex === index, 'theme-dark': themeName === 'dark'}"
                :data-avg="avgIndex === -1 ? '' : ('平均值：' + avg + deviceMonitorList.res.body.deviceList.units[sortName])"
                :key="item.eqid">
                <div class="device-name">
                    <span @click="devicePopUp({stid: $store.getters.station_id, eqid: item.eqid})">{{item.eq_name}}</span>
                </div>
                <el-popover
                    placement="right"
                    width="700"
                    trigger="click">
                    <device-detail :data="item" :units="deviceMonitorList.res.body.deviceList.units"></device-detail>
                    <div class="device-sort" slot="reference">
                        <span>{{sortIndex.label}}</span>
                        <span class="pull-right">{{deviceMonitorList.res.body.deviceList.units[sortName]}}</span>
                        <span class="pull-right">{{item[sortName]}}</span>
                    </div>
                </el-popover>
                <div class="real-kwh">
                    <span>发电量</span>
                    <span class="pull-right">{{deviceMonitorList.res.body.deviceList.units.real_kwh_chk}}</span>
                    <span class="pull-right">{{item.real_kwh_chk}}</span>
                </div>
                <el-popover
                    v-if="item.device_log.length"
                    popper-class="device-monitor-log-popover"
                    placement="top-start"
                    width="556"
                    trigger="click">
                    <event-list :data="item.device_log"></event-list>
                    <span class="dot" slot="reference"></span>
                </el-popover>
            </div>
        </transition-group>
        <div v-else>没有查询到数据</div>
    </div>
</template>

<script>
import {api＿deviceMonitorList} from '@/request/api'
import {deviceParams} from './handle'
import EventList from './eventList'
import DeviceDetail from './deviceDetail'
import devicePopUp from '@/components/devicePopUp'
import {jsonToCsv, downloadBlob} from '@comm/tools'
import theme from './theme/theme'
export default {
    mixins: [theme],
    components: {
        EventList,
        DeviceDetail
    },
    data () {
        return {
            deviceMonitorList: api＿deviceMonitorList({
                later: true,
                res: {
                    body: {
                        avg: null,
                        deviceList: {
                            data: [],
                            names: {},
                            units: {}
                        }
                    }
                }
            }),
            sortName: '',
            sortType: ''
        }
    },
    created () {
        this.$bus.on('stationChange', this.getData)
        this.$bus.on('deviceMonitorGetData', this.getData)
        this.$bus.on(this.$route.name + 'Export', this.exportList)
        // this.$bus.emit('deviceMonitorMounted')
    },
    methods: {
        getData (data) {
            if (data.stClass) return this.deviceMonitorList.getData()
            if (data.sort) {
                const sort = data.sort.split(',')
                this.sortName = sort[0]
                this.sortType = sort[1]
                if (this.deviceMonitorList.resNumber) return
            }
            this.deviceMonitorList.getData({...data, sort: ''})
        },
        devicePopUp (data) {
            devicePopUp(data, 'faultInfo')
        },
        exportList () {
            if (!this.deviceMonitorList.res?.body?.deviceList?.data?.[0]) return
            const {names, data, units} = this.deviceMonitorList.res.body.deviceList
            const header = {}
            for (const key in data[0]) {
                if (names.hasOwnProperty(key) && data[0].hasOwnProperty(key)) {
                    header[key] = names[key] + (units[key] ? `(${units[key]})` : '')
                }
            }
            const list = [header, ...data.map(item => {
                const o = {}
                for (const key in item) {
                    if (item.hasOwnProperty(key) && names.hasOwnProperty(key)) {
                        o[key] = item[key]
                    }
                }
                return o
            })]
            downloadBlob(jsonToCsv(list), '设备监视-' + this.deviceMonitorList.params.startDate + '-' + this.deviceMonitorList.params.endDate + '.csv')
        }
    },
    computed: {
        avg () {
            const validList = this.dataList.filter(v => v[this.sortName] !== null)
            if (validList.length === 0) return '-'
            return (validList.reduce((a, b) => {
                return a + b[this.sortName]
            }, 0) / validList.length).toFixed(3)
        },
        sortIndex () {
            return deviceParams.find(v => v.value === this.sortName)
        },
        avgIndex () {
            let index = this.dataList.findIndex(v => {
                if (this.sortType === 'desc') return v[this.sortName] < this.avg
                else if (this.sortType === 'asc') return v[this.sortName] > this.avg
                return false
            })
            // if (index === (this.dataList.length - 1)) {
            //     index--
            // }
            return index === 0 ? 0 : index - 1
        },
        dataList () {
            return Array.from(this.deviceMonitorList.res.body.deviceList.data).sort((a, b) => {
                if (this.sortType === 'desc') return b[this.sortName] - a[this.sortName]
                if (this.sortType === 'asc') return a[this.sortName] - b[this.sortName]
                return a.eqid - b.eqid
            })
        }
    },
    beforeDestroy () {
        this.$bus.off('stationChange', this.getData)
        this.$bus.off('deviceMonitorGetData', this.getData)
        this.$bus.off(this.$route.name + 'Export', this.exportList)
    }
}
</script>

<style lang="scss">
.device-monitor-log-popover {
    background:rgba(96,99,105,.85);
    box-shadow:0px 17px 43px 0px rgba(1,11,10,0.86);
    border: none;

    &[x-placement^="top"] {
        .popper__arrow {
            &::after {
                border-top-color: rgba(0, 0, 0, .4);
            }
        }
    }
    &[x-placement^="bottom"] {
        .popper__arrow {
            &::after {
                border-bottom-color: rgba(0, 0, 0, .4);
            }
        }
    }
}
</style>

<style lang="scss" scoped>
@import '@comm/assets/themes/scrollbar/s1.scss';
@import './theme/theme.scss';
.device-list {
    margin: 10px auto;
    padding: 30px 13px;
    height: calc(100vh - 110px);
    overflow: auto;
    @include page_c(color, rgba(255,255,255,0.8) #333 #fff);

    .device {
        width: 210px;
        height: 86px;
        background:rgba(72,205,129,1);
        box-shadow:0px 8px 25px 2px rgba(72,205,129,0.47);
        border-radius:4px;
        margin-right: 20px;
        margin-bottom: 30px;
        float: left;
        position: relative;
        transition: all 1s ease;

        .device-name {
            padding: 0 22px;
            font-size: 14px;
            line-height: 2;

            span {
                cursor: pointer;
            }
        }

        .device-sort {
            width: 185px;
            height: 28px;
            line-height: 28px;
            background-color: #fff;
            font-size: 12px;
            margin: 0 auto;
            color: #22AC5D;
            padding: 0 10px;
            cursor: pointer;
        }

        .real-kwh {
            padding: 0 22px;
            font-size: 14px;
            line-height: 2;
            color: #fff;
        }

        &.avg {
            &::before {
                content: attr(data-avg);
                position: absolute;
                right: -40px;
                top: -24px;
                height:19px;
                border:2px solid rgba(248,155,42,1);
                line-height: 19px;
                padding: 0 10px;
                color: rgba(248,155,42,1);
                word-break: keep-all;
            }

            &::after {
                content: '';
                position: absolute;
                width: 2px;
                height: 100%;
                top: -1px;
                right: -10px;
                background-color: rgba(248,155,42,1);
            }
        }

        .dot {
            position: absolute;
            right: -6px;
            top: -6px;
            width: 13px;
            height: 13px;
            border-radius: 50%;
            background: #FF7381;
            cursor: pointer;
            transition: transform .5s ease;

            &:hover {
                transform: scale(2);
            }
        }
    }

    .device.theme-dark {
        background:rgba(47,191,203,.1);
        box-shadow:0px 8px 25px 2px rgba(72,205,129,0.047);

        .device-name {
            color: $text_c1;
        }

        .device-sort {
            background-color: transparent;
            box-shadow: 0 0 10px rgb(72,205,129) inset;
        }
    }
}
</style>
