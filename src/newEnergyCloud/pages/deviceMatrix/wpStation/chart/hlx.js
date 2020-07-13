import { deviceStatusColorMap, groupStringColorMap, filterStatus } from './statusColor'

export default {
    props: {
        data: {
            type: Object,
            required: true
        },
        status: {
            type: Array
        }
    },
    methods: {
        handleClidk (event, stid, eqid) {
            event.stopPropagation()
            this.$bus.emit('devicePopUp', {stid, eqid})
        }
    },
    render () {
        const show = filterStatus(this.status, this.data.status, this.data.statusData.shadowFlags)
        return (
            <div onClick={e => this.handleClidk(e, this.data.stid, this.data.serialNumber)} style={{ display: 'inline-block', 'vertical-align': 'top' }}>
                {show && <div title={this.data.name}>
                    <svg xmlns="http://www.w3.org/2000/svg" height={
                        (this.data.statusData.statuFlags.length > 20) ? '73' : '47'
                    } width="56">
                        {this.hover && <rect name="select" height="100%" width="100%" fill="rgba(6, 190, 189, .3)" />}
                        <g>
                            <rect height="4" width="46" z="0" y="5" x="5" stroke-opacity="null" stroke-width="1" stroke={deviceStatusColorMap[this.data.status]} fill={deviceStatusColorMap[this.data.status]} />
                            <rect name="shadow" height="8" width="50" y="2" x="3" fill-opacity="0.5" fill="#CCCCCC" style={{ display: 'none' }} />
                            {
                                this.data.statusData.statuFlags.slice(0, 10).map((v, i) => [
                                    <rect height="10" width="1" z="1" y="12" x={5 + 5 * i} stroke-opacity="null" stroke-width="1" stroke={groupStringColorMap[v]} fill={groupStringColorMap[v]} name="zuchuan" />,
                                    this.data.statusData.shadowFlags[i] && <rect name="shadow" height="14" sz="1" width="5" y="10" x={3 + 5 * i} fill-opacity="0.5" fill="#CCCCCC" />
                                ])
                            }
                            {
                                this.data.statusData.statuFlags.slice(10, 20).map((v, i) => [
                                    <rect height="10" width="1" z="1" y="25" x={5 + 5 * i} stroke-opacity="null" stroke-width="1" stroke={groupStringColorMap[v]} fill={groupStringColorMap[v]} name="zuchuan" />,
                                    this.data.statusData.shadowFlags[10 + i] && <rect name="shadow" height="14" sz="1" width="5" y="24" x={3 + 5 * i} fill-opacity="0.5" fill="#CCCCCC" />
                                ])
                            }
                            {
                                this.data.statusData.statuFlags.slice(20, 30).map((v, i) => [
                                    <rect height="10" width="1" z="1" y="38" x={5 + 5 * i} stroke-opacity="null" stroke-width="1" stroke={groupStringColorMap[v]} fill={groupStringColorMap[v]} name="zuchuan" />,
                                    this.data.statusData.shadowFlags[20 + i] && <rect name="shadow" height="14" sz="1" width="5" y="37" x={3 + 5 * i} fill-opacity="0.5" fill="#CCCCCC" />
                                ])
                            }
                            {
                                this.data.statusData.statuFlags.slice(30, 32).map((v, i) => [
                                    <rect height="10" width="1" z="1" y="51" x={5 + 5 * i} stroke-opacity="null" stroke-width="1" stroke={groupStringColorMap[v]} fill={groupStringColorMap[v]} name="zuchuan" />,
                                    this.data.statusData.shadowFlags[30 + i] && <rect name="shadow" height="14" sz="1" width="5" y="50" x={3 + 5 * i} fill-opacity="0.5" fill="#CCCCCC" />
                                ])
                            }
                        </g>
                        <rect name="shadow" height="100%" width="100%" fill-opacity="0.5" fill="#CCCCCC" style={{ display: 'none' }} />
                    </svg>
                </div>}
            </div>
        )
    }
}
