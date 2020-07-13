<script>
import {SvgXb, SvgHlx, SvgNbq, SvgNbqHlx} from './chart'
import {api＿getDeviceLayoutV2} from '@/request/api'
import devicePopUp from '@/components/devicePopUp'
export default {
    data () {
        return {
            getDeviceLayoutV2: api＿getDeviceLayoutV2({onlyLatest: true}),
            timer: null,
            status: null
        }
    },
    created () {
        this.timer = setInterval(() => this.getDeviceLayoutV2.getData(), this.$store.getters.refresh_interval())
    },
    mounted () {
        this.$bus.on('stationChange', this.getData)
        this.$bus.on('statusChange', this.setStatus)
        this.$bus.on('devicePopUp', this.devicePopUp)
    },
    methods: {
        getData () {
            this.getDeviceLayoutV2.res = {}
            this.getDeviceLayoutV2.getData()
        },
        setStatus (status) {
            this.status = status
        },
        devicePopUp ({stid, eqid}) {
            devicePopUp({stid, eqid})
        }
    },
    beforeDestroy () {
        clearInterval(this.timer)
        this.$bus.off('stationChange', this.getData)
        this.$bus.off('statusChange', this.setStatus)
        this.$bus.off('devicePopUp', this.devicePopUp)
    },
    render () {
        return this.getDeviceLayoutV2.res.length ? (
            <div style={{padding: '13px', 'height': 'calc(100vh - 60px)', overflow: 'auto'}}>
                <el-row>
                    {this.getDeviceLayoutV2.res.map(v => (
                        <el-col
                            key={v.id + '' + v.serialNumber} span={v.deviceType * 3}>
                            {v.deviceType === '3' ? <SvgXb status={this.status} data={v}/> : null}
                            {v.deviceType === '2' && v.hasJB === '1' ? <SvgNbqHlx status={this.status} data={v}/> : null}
                            {v.deviceType === '2' && v.hasJB !== '1' ? <SvgNbq status={this.status} data={v}/> : null}
                            {v.deviceType === '1' ? <SvgHlx status={this.status} data={v}/> : null}
                        </el-col>
                    ))}
                </el-row>
            </div>
        ) : <div style={{height: '400px'}} v-loading={true}></div>
    }
}
</script>

<style lang="scss" scoped>
@import '@comm/assets/themes/scrollbar/s1.scss';
@import '../theme/theme.scss';
.el-col {
    @include page_c(color, $fontColor);
    &:hover {
        cursor: pointer;
        background-color: rgba(6, 190, 189, .3);
    }
}
</style>
