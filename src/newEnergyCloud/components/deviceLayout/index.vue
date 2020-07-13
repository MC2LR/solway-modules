<template>
    <el-dialog
        custom-class="device-layout"
        title="设备布局编辑"
        top="50px"
        center
        destroy-on-close
        modal-append-to-body
        append-to-body
        :visible.sync="visible"
        @close="$emit('close', editSuccess)"
        width="1000px">
        <el-form :inline="true" size="mini">
            <el-form-item label="行">
                <el-input v-model="rowCount" type="number" min="1" max="100" @input="rowChange" placeholder="请输入行数"></el-input>
            </el-form-item>
            <el-form-item label="列">
                <el-input v-model="colCount" type="number" min="1" max="100" @input="colChange" placeholder="请输入列数"></el-input>
            </el-form-item>
            <el-form-item label="网格宽">
                <el-input v-model="deviceWidth" type="number" min="20" max="200" placeholder="请输入行数"></el-input>
            </el-form-item>
            <el-form-item label="网格高">
                <el-input v-model="deviceHeight" type="number" min="20" max="200" placeholder="请输入列数"></el-input>
            </el-form-item>
            <!-- <el-button size="mini" type="primary" @click="cut">裁切预览</el-button> -->
            <el-button size="mini" type="primary" @click="save">保存</el-button>
        </el-form>
        <div class="device-list pull-right">
            <el-input v-model="deviceKeyWord" placeholder="请输入关键字"></el-input>
            <ul v-loading="selectDevicesByStation.loading">
                <li
                    draggable
                    v-for="item in showDeviceList"
                    @dragend="dragend"
                    @dragstart="(event) => dragstart(event, item)"
                    :key="item.serialNumber">
                    {{item.name}}
                </li>
                <li v-if="showDeviceList.length === 0">没有数据</li>
            </ul>
        </div>
        <div class="layout" v-loading="saveDeviceCoordinate.loading || getCoordinate.loading">
            <div v-for="(row, rowIndex) in data" :key="rowIndex" class="row">
                <div
                    class="device"
                    :style="{width: deviceWidth + 'px', minWidth: deviceWidth + 'px', maxWidth: deviceWidth + 'px', height: deviceHeight + 'px'}"
                    v-for="(item, colIndex) in row"
                    @dragenter="event => dragenter(event, rowIndex, colIndex)"
                    @dragleave="event => dragleave(event, rowIndex, colIndex)"
                    :draggable="item ? true : false"
                    @dragend="dragend"
                    @dragstart="event => dragstart(event, item, true, rowIndex, colIndex)"
                    :title="item && (item.name || item.eq_name)"
                    :class="{active: item || ((rowIndex === activeRow) && (colIndex === activeCol))}"
                    :key="rowIndex + '_' + colIndex">
                    {{item && (item.name || item.eq_name)}}
                </div>
            </div>
        </div>
    </el-dialog>
</template>

<script>
import {api＿selectDevicesByStation, api＿saveDeviceCoordinate, api＿getCoordinate} from '@/request/api'
export default {
    props: {
        stid: {
            type: Number,
            required: true
        }
    },
    data () {
        const rowCount = 10
        const colCount = 12
        const rowData = new Array(colCount).fill('')
        const dateStr = new Date(Date.now() - 86400000).Format('yyyy-MM-dd')
        return {
            getCoordinate: api＿getCoordinate({
                data: {
                    stId: this.stid,
                    startDate: dateStr,
                    endDate: dateStr
                }
            }).subscribe(this.editInit),
            selectDevicesByStation: api＿selectDevicesByStation({
                data: {
                    stid: this.stid,
                    deviceType: 2
                },
                res: []
            }),
            saveDeviceCoordinate: api＿saveDeviceCoordinate({
                later: true
            }),
            visible: true,
            editSuccess: false,
            rowCount,
            colCount,
            deviceWidth: 66,
            deviceHeight: 40,
            data: new Array(rowCount).fill('').map(v => [...rowData]),
            deviceKeyWord: '',
            dragData: null,
            activeRow: null,
            activeCol: null,
            layoutDevice: [],
            move: false
        }
    },
    methods: {
        rowChange (rowCount = this.rowCount) {
            rowCount = +rowCount
            if (rowCount > this.data.length) {
                const newRows = new Array(rowCount - this.data.length).fill('').map(v => [...this.rowData])
                this.data = this.data.concat(newRows)
            } else {
                this.layoutDevice = this.layoutDevice.filter(v => v.y < rowCount)
                this.data.length = rowCount
            }
        },
        colChange (colCount = this.colCount) {
            colCount = +colCount
            if (colCount > this.data[0].length) {
                const newCols = new Array(colCount - this.data[0].length).fill('')
                this.data = this.data.map(v => v.concat(newCols))
            } else {
                this.layoutDevice = this.layoutDevice.filter(v => v.x < colCount)
                this.data = this.data.map(v => v.slice(0, colCount))
            }
        },
        dragstart (event, device, move, row, col) {
            this.dragData = {...device}
            this.dragData.axisX = col
            this.dragData.axisY = row
            if (move) {
                this.move = true
                // if (event.ctrlKey) {
                //     return
                // }
                this.data[row][col] = ''
            }
        },
        dragenter (event, row, col) {
            this.activeRow = row
            this.activeCol = col
        },
        async dragleave (event, row, col) {
            // 为什么是200毫秒，我也不知道，扩展投屏的时候会有问题，200就没问题了
            await this.$timeout(200)
            if (!(row === this.activeRow && col === this.activeCol)) return
            this.activeRow = null
            this.activeCol = null
        },
        dragend (event) {
            if ((typeof this.activeRow === 'number') && (typeof this.activeCol === 'number') && this.data[this.activeRow][this.activeCol] && this.dragData) {
                this.$message('位置被占用')
                if (this.move) {
                    const {x, y} = this.layoutDevice.find(device => device.eqid === (this.dragData.serialNumber || this.dragData.eqid))
                    this.data[y][x] = this.dragData
                    this.data = [...this.data]
                }
            } else if ((typeof this.activeRow === 'number') && (typeof this.activeCol === 'number') && (!this.data[this.activeRow][this.activeCol]) && this.dragData) {
                this.data[this.activeRow][this.activeCol] = this.dragData
                this.data = [...this.data]
                this.layoutDevice.push({eqid: (this.dragData.serialNumber || this.dragData.eqid), y: this.activeRow, x: this.activeCol})
            } else {
                this.layoutDevice = this.layoutDevice.filter(v => {
                    return !(v.x === this.dragData.axisX && v.y === this.dragData.axisY)
                })
                // this.layoutDevice = this.layoutDevice.filter(v => v.eqid !== (this.dragData.serialNumber || this.dragData.eqid))
            }
            this.activeRow = null
            this.activeCol = null
            this.dragData = null
        },
        cut () {
            if (!this.xValidRange.length) return false
            const [xmin, xmax] = this.xValidRange
            const [ymin, ymax] = this.yValidRange
            this.data = this.data.slice(ymin, ymax + 1)
            this.data = this.data.map(row => row.slice(xmin, xmax + 1))
            this.layoutDevice = this.layoutDevice.map(device => ({
                ...device,
                x: device.x - xmin,
                y: device.y - ymin
            }))
            this.rowCount = this.data.length
            this.colCount = this.data[0].length
            return true
        },
        async save () {
            if (!this.cut()) return
            const deviceListJson = this.layoutDevice.map(device => ({eqid: device.eqid, axisX: device.x, axisY: device.y}))
            // debugger
            // console.log(deviceListJson)
            const res = await this.saveDeviceCoordinate.getData({
                stId: this.stid,
                deviceList: JSON.stringify(deviceListJson)
            })
            if (res?.code === 0) {
                this.editSuccess = true
                this.visible = false
            }
        },
        async editInit (res) {
            await this.$timeout(1000)
            const editData = res?.body
            if (!editData || !editData.length) return
            this.rowCount = editData.length
            this.colCount = editData[0].length
            editData.forEach((row, rowIndex) => {
                row.forEach((device, colIndex) => {
                    device && this.layoutDevice.push({
                        eqid: device.eqid,
                        x: colIndex,
                        y: rowIndex
                    })
                })
            })
            this.data = editData
            await this.$timeout(1000)
            if (this.rowCount < 10) this.rowChange(10)
            if (this.colCount < 11) this.colChange(11)
        }
    },
    computed: {
        rowData () {
            return new Array(+this.colCount).fill('')
        },
        showDeviceList () {
            return this.selectDevicesByStation.res.filter(v => v.name.includes(this.deviceKeyWord) && (!this.layoutDevice.some(xv => xv.eqid === v.serialNumber)))
        },
        xValidRange () {
            const allX = this.layoutDevice.map(v => v.x)
            return allX.length ? [Math.min(...allX), Math.max(...allX)] : []
        },
        yValidRange () {
            const allY = this.layoutDevice.map(v => v.y)
            return allY.length ? [Math.min(...allY), Math.max(...allY)] : []
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@comm/assets/themes/scrollbar/s1.scss';
.device-layout.el-dialog {
    .el-form {
        .el-input {
            width: 100px;
        }
    }

    .layout {
        margin-right: 210px;
        height: 400px;
        border-left:2px solid rgba(48,198,249,1);
        border-top:2px solid rgba(48,198,249,1);
        overflow: scroll;
        line-height: 0;

        .row {
            display: table;

            .device {
                display: table-cell;
                // background:#fff;
                vertical-align: middle;
                word-break: keep-all;
                overflow: hidden;
                text-overflow: ellipsis;
                border-bottom:2px solid rgba(48,198,249,1);
                border-right:2px solid rgba(48,198,249,1);

                &.active {
                    background:rgba(48,198,249,0.4);
                    cursor: move;
                }

                &::before {}
            }
        }

    }

    .device-list {
        width: 200px;
        height: 400px;

        ul {
            margin-top: 5px;
            height: 360px;
            overflow: auto;

            li {
                height: 41px;
                line-height: 41px;
                background:rgba(48,198,249,0.4);
                border:2px solid rgba(48,198,249,1);
                cursor: move;
                padding-left: 1em;

                &:not(:last-of-type) {
                    border-bottom: none;
                }
            }
        }
    }
}
</style>
