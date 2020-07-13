import { deviceStatusColorMap, filterStatus } from './statusColor'
import SvgHlx from './hlx'

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
        const show = filterStatus(this.status, this.data.status)
        return (
            <div onClick={e => this.handleClidk(e, this.data.stid, this.data.serialNumber)}>
                {show && <svg
                    xmlns="http://www.w3.org/2000/svg" height="50" width="30"
                    style={{ verticalAlign: 'middle', cursor: 'pointer' }}>
                    {this.hover && <rect name="select" height="100%" width="100%" fill="rgba(6, 190, 189, .3)" />}
                    <g>
                        <rect stroke={deviceStatusColorMap[this.data.status]} height="40" width="20" y="5" x="5" fill-opacity="0.1" stroke-width="1" fill={deviceStatusColorMap[this.data.status]} />
                        <line stroke={deviceStatusColorMap[this.data.status]} y2="45" x2="5" y1="5" x1="25" stroke-width="1" />
                        <line stroke={deviceStatusColorMap[this.data.status]} y2="14" x2="16" y1="14" x1="8" stroke-width="1" />
                        <path stroke={deviceStatusColorMap[this.data.status]} d="M15 35 Q 17 33, 19 35 T 23 35" fill-opacity="0" />
                    </g>
                    <rect name="shadow" height="100%" width="100%" fill-opacity="0.5" fill="#CCCCCC" style={{ display: 'none' }} />
                </svg>}
                {show && <span>{this.data.name}</span>}
                <div>
                    {this.data.children && this.data.children[0] && this.data.children.map(v => <SvgHlx status={this.status} data={v} />)}
                </div>
            </div>
        )
    }
}
