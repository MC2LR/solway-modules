import { deviceStatusColorMap, filterStatus } from './statusColor'
import SvgNbq from './nbq'
import SvgNbqHlx from './nbqHlx'

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
                    xmlns="http://www.w3.org/2000/svg"
                    height="40" width="70"
                    style={{ verticalAlign: 'middle', cursor: 'pointer' }}>
                    {this.hover && <rect name="select" height="100%" width="100%" fill="rgba(6, 190, 189, .3)" />}
                    <g>
                        <rect stroke={deviceStatusColorMap[this.data.status]} height="30" width="60" y="5" x="5" fill-opacity="0.1" stroke-width="1" fill={deviceStatusColorMap[this.data.status]} />
                        <ellipse stroke={deviceStatusColorMap[this.data.status]} ry="7" rx="7" id="svg_4" cy="24" cx="30" fill-opacity="0" stroke-width="1" />
                        <ellipse stroke={deviceStatusColorMap[this.data.status]} ry="7" rx="7" id="svg_6" cy="16" cx="35" fill-opacity="0" stroke-width="1" />
                        <ellipse stroke={deviceStatusColorMap[this.data.status]} ry="7" rx="7" id="svg_7" cy="24" cx="40" fill-opacity="0" stroke-width="1" />
                    </g>
                    <rect name="shadow" height="100%" width="100%" fill-opacity="0.5" fill="#CCCCCC" style={{ display: 'none' }} />
                </svg>}
                {show && <span>{this.data.name}</span>}
                <div>
                    {this.data.children && this.data.children[0] && this.data.children.map(v => v.hasJB === '1' ? <SvgNbqHlx status={this.status} data={v} /> : <SvgNbq status={this.status} data={v} />)}
                </div>
            </div>
        )
    }
}
