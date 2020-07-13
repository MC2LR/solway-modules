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
            <div onClick={e => this.handleClidk(e, this.data.stid, this.data.serialNumber)}>
                {show && <svg
                    style={{ verticalAlign: 'middle', cursor: 'pointer' }}
                    xmlns="http://www.w3.org/2000/svg" version="1.1" height={
                        ((this.data.version === 2) && (this.data.statusData.statuFlags.length > 20)) ? '103' : '63'
                    } width="56">
                    {this.hover && <rect name="select" height="100%" width="100%" fill="rgba(6, 190, 189, .3)" />}
                    <g type='nbq'>
                        <rect stroke={deviceStatusColorMap[this.data.status]} x="5" y="5" width="46" height="14" fill-opacity='0.1' fill={deviceStatusColorMap[this.data.status]} />
                        <line stroke={deviceStatusColorMap[this.data.status]} x1="5" y1="19" x2="51" y2="5" />
                        <line stroke={deviceStatusColorMap[this.data.status]} x1="38" y1="14" x2="46" y2="14" />
                        <path stroke={deviceStatusColorMap[this.data.status]} d='M10.17,9.7q2.09,2.31,4.19,0t4.19,0' fill-opacity='0' />
                        <rect stroke={deviceStatusColorMap[this.data.status]} className='rectLayout' height='14' width='46' y='5' x='5' fill-opacity='0' fill={deviceStatusColorMap[this.data.status]} />
                    </g>
                    <g type='hlx'>
                        {
                            this.data.statusData.statuFlags.slice(0, 10).map((v, i) => [
                                <rect key={i + '1'} fill={groupStringColorMap[v]} stroke-opacity='null' x={5 + 5 * i} y='24' width='1' height='14' stroke={groupStringColorMap[v]} name="zuchuan" />,
                                this.data.statusData.shadowFlags[i] && <rect key={i + '2'} name='shadow' fill-opacity='0.5' sz='0' x={3 + 5 * i} y='22' width='5' height='18' fill="#CCCCCC" />
                            ])
                        }
                        {
                            this.data.statusData.statuFlags.slice(10, 20).map((v, i) => [
                                <rect key={10 + i + '1'} fill={groupStringColorMap[v]} stroke-opacity='null' x={5 + 5 * i} y='44' width='1' height='14' stroke={groupStringColorMap[v]} name="zuchuan" />,
                                this.data.statusData.shadowFlags[10 + i] && <rect key={10 + i + '2'} name='shadow' fill-opacity='0.5' sz='0' x={3 + 3 * i} y='42' width='5' height='18' fill="#CCCCCC" />
                            ])
                        }
                        {
                            this.data.statusData.statuFlags.slice(20, 30).map((v, i) => [
                                <rect key={20 + i + '1'} fill={groupStringColorMap[v]} stroke-opacity='null' x={5 + 5 * i} y='64' width='1' height='14' stroke={groupStringColorMap[v]} name="zuchuan" />,
                                this.data.statusData.shadowFlags[20 + i] && <rect key={20 + i + '2'} name='shadow' fill-opacity='0.5' sz='0' x={3 + 3 * i} y='62' width='5' height='18' fill="#CCCCCC" />
                            ])
                        }
                        {
                            this.data.statusData.statuFlags.slice(30, 32).map((v, i) => [
                                <rect key={30 + i + '1'} fill={groupStringColorMap[v]} stroke-opacity='null' x={5 + 5 * i} y='84' width='1' height='14' stroke={groupStringColorMap[v]} name="zuchuan" />,
                                this.data.statusData.shadowFlags[30 + i] && <rect key={30 + i + '2'} name='shadow' fill-opacity='0.5' sz='0' x={3 + 3 * i} y='82' width='5' height='18' fill="#CCCCCC" />
                            ])
                        }
                    </g>
                </svg>}
                {show && <span>{this.data.name}</span>}
            </div>
        )
    }
}
