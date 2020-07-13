<template>
    <el-dialog
        :title="data.fd_name + '-' + deviceTypeName + '-筛选器'"
        :visible.sync="dialogVisible"
        width="1000px"
        @closed="$emit('closed')">
        <div class="clearfix">
            <div class="left pull-left">
                <el-select
                    v-model="form.stid"
                    filterable
                    @change="baseSearchConditionGetDeviceByStIdsAndDeviceType.getData({stIds: form.stid, deviceTypes: deviceType})"
                    placeholder="请选择电站">
                    <el-option
                        v-for="item in baseSearchConditionGetStByRoleAndComIds.res.body"
                        :key="item.stId"
                        :label="item.stName"
                        :value="item.stId">
                    </el-option>
                </el-select>
                <el-input v-model="form.deviceSearchKey" @input="deviceFilter" placeholder="搜索设备"></el-input>
                <ul class="device-list">
                    <li class="addAll">
                        <el-button @click.native="addAll" size="mini" type="text">选择全部</el-button>
                    </li>
                    <li
                        v-for="item in baseSearchConditionGetDeviceByStIdsAndDeviceType.res.body"
                        class="device"
                        :class="{checked: item.checked}"
                        :data-content="item.deviceName"
                        :title="item.deviceName"
                        v-show="item.show"
                        @click="addDevice(item)"
                        :key="item.deviceSerialNnumber">
                        {{item.deviceName}}
                    </li>
                </ul>
            </div>
            <div class="right pull-right">
                <p class="title">
                    <span>已选设备</span>
                    <span v-if="form.selectedDevice.sts.length" @click="deviceAllDelete" class="pull-right delete">全部删除</span>
                </p>
                <p v-if="form.selectedDevice.sts.length === 0" style="padding-left: 0.5em;">您还没有选择设备，将按全部查询。</p>
                <div class="stations">
                    <div
                        class="station"
                        v-for="(item, index) in form.selectedDevice.sts"
                        :key="item">
                        <h5>
                            <span>{{form.selectedDevice[item].stName.trim()}}</span>
                            <el-badge type="primary" :value="form.selectedDevice[item].devices.length" />
                            <span
                                @click="delete form.selectedDevice[item]; form.selectedDevice.sts.splice(index, 1); baseSearchConditionGetDeviceByStIdsAndDeviceType.getData()"
                                class="pull-right delete">删除此站</span>
                        </h5>
                        <div class="devices">
                            <span
                                class="device"
                                v-for="(xitem, xindex) in form.selectedDevice[item].devices"
                                @click="deviceDelete(item, xindex, index, baseSearchConditionGetDeviceByStIdsAndDeviceType.res.body.find(v => v.st_eqid === xitem.st_eqid))"
                                :key="xitem.st_eqid">
                                {{xitem.deviceName}}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="confirm">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import {moduleName} from '../store'
import {api＿baseSearchConditionGetStByRoleAndComIds, api＿baseSearchConditionGetDeviceByStIdsAndDeviceType} from '@/request/api'
// const deviceTypeMap = {'401': '汇流箱', '402': '逆变器', '403': '箱变', '404': '电能表', '405': '气象仪', '417': '测风塔', '418': '风机'}
export default {
    props: {
        data: {
            type: Object,
            default () {
                return {}
            }
        }
    },
    data () {
        return {
            dialogVisible: true,
            baseSearchConditionGetStByRoleAndComIds: api＿baseSearchConditionGetStByRoleAndComIds({
                data: {
                    stClass: '01'
                }
            }),
            baseSearchConditionGetDeviceByStIdsAndDeviceType: api＿baseSearchConditionGetDeviceByStIdsAndDeviceType({
                later: true,
                res: {
                    body: []
                }
            }),
            form: {
                stid: '',
                deviceSearchKey: '',
                selectedDevice: {
                    sts: []
                }
            }
        }
    },
    computed: {
        ...mapState(moduleName, [
            'dataClassification',
            'dataType',
            'dataSource',
            'filtersResult'
        ]),
        deviceType () {
            return +this.dataClassification[this.dataType].ds[this.dataSource].k.substr(1)
        },
        deviceTypeName () {
            return {'1': '汇流箱', '2': '逆变器', '3': '箱变', '4': '电能表', '5': '气象仪', '17': '测风塔', '18': '风机'}[this.deviceType]
        }
    },
    created () {
        this.$nextTick(() => {
            this.form = this.filtersResult['st_eqid'] || this.form
            if (this.form.stid) {
                this.baseSearchConditionGetDeviceByStIdsAndDeviceType.getData({stIds: this.form.stid, deviceTypes: this.deviceType})
            }
        })
        const _this = this
        this.baseSearchConditionGetDeviceByStIdsAndDeviceType.subscribe(res => {
            _this.deviceFilter(_this.form.deviceSearchKey)
            if (!_this.form.selectedDevice.hasOwnProperty([_this.form.stid])) return
            res.body.forEach(v => {
                v.checked = this.form.selectedDevice[this.form.stid]?.devices?.some(xv => xv.st_eqid === v.st_eqid)
            })
        })
        this.baseSearchConditionGetDeviceByStIdsAndDeviceType.beforeSend = (params) => {
            this.baseSearchConditionGetDeviceByStIdsAndDeviceType.res.body = []
            return params
        }
    },
    methods: {
        ...mapActions(moduleName, [
            'setFilterData'
        ]),
        confirm () {
            this.setFilterData({key: 'st_eqid', value: this.form})
            this.dialogVisible = false
        },
        deviceFilter (str) {
            this.baseSearchConditionGetDeviceByStIdsAndDeviceType.res.body.forEach(v => {
                v.show = v.deviceName.includes(str)
            })
            this.baseSearchConditionGetDeviceByStIdsAndDeviceType.res.body = [...this.baseSearchConditionGetDeviceByStIdsAndDeviceType.res.body]
        },
        addDevice (device) {
            if (!this.form.selectedDevice.hasOwnProperty(this.form.stid)) {
                this.form.selectedDevice.sts.push(device.stId)
                this.form.selectedDevice[device.stId] = {
                    stName: device.stName,
                    devices: []
                }
            }
            const {deviceName, st_eqid: stEqid} = device
            if (this.form.selectedDevice[device.stId].devices.some(v => v.st_eqid === device.st_eqid)) {
                const stid = this.form.stid
                const index = this.form.selectedDevice.sts.indexOf(stid)
                const xindex = this.form.selectedDevice[stid].devices.findIndex(v => v.st_eqid === device.st_eqid)
                this.deviceDelete(stid, xindex, index, device)
            } else {
                this.form.selectedDevice[device.stId].devices.push({deviceName, st_eqid: stEqid})
                device.checked = true
                this.baseSearchConditionGetDeviceByStIdsAndDeviceType.res.body = [...this.baseSearchConditionGetDeviceByStIdsAndDeviceType.res.body]
                this.form.selectedDevice = {...this.form.selectedDevice}
            }
        },
        addAll () {
            this.baseSearchConditionGetDeviceByStIdsAndDeviceType.res.body.filter(v => v.show && !v.checked).forEach(v => this.addDevice(v))
        },
        deviceAllDelete () {
            this.form.selectedDevice.sts.forEach(v => {
                delete this.form.selectedDevice[v]
            })
            this.form.selectedDevice.sts = []
            this.baseSearchConditionGetDeviceByStIdsAndDeviceType.res.body.forEach(v => {
                v.checked = false
            })
        },
        deviceDelete (item, xindex, index, xitem) {
            this.form.selectedDevice[item].devices.splice(xindex, 1)
            if (xitem) xitem.checked = false
            this.baseSearchConditionGetDeviceByStIdsAndDeviceType.res.body = [...this.baseSearchConditionGetDeviceByStIdsAndDeviceType.res.body]
            if (!this.form.selectedDevice[item].devices.length) {
                delete this.form.selectedDevice[item]
                this.form.selectedDevice.sts.splice(index, 1)
                this.form.selectedDevice = {...this.form.selectedDevice}
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@comm/assets/themes/scrollbar/s1.scss';
.el-select {
    width: 100%;
}

.el-input {
    margin-top: 10px;
}

.left, .right {
    width: 48%;
    height: 300px;
    background-color: #eee;
    padding: 10px;
}

.left {
    ul.device-list {
        margin-top: 10px;
        height: 200px;
        overflow: auto;

        li.addAll {
            float: left;
            width: 30%;
            margin-right: 3%;
            cursor: pointer;
            line-height: 2em;
            height: 2em;
            padding-left: 1em;
        }

        li.device {
            float: left;
            width: 30%;
            margin-right: 3%;
            cursor: pointer;
            line-height: 2em;
            height: 2em;
            overflow: hidden;
            word-break: keep-all;
            text-overflow: ellipsis;
            position: relative;
            border: 1px dashed;
            border-color: transparent;
            padding-left: 1em;

            &.checked {
                @include c(border-color, $line_c1);

                &:before {
                    content: '删除';
                }
            }

            &:hover {
                &::before {
                    display: block;
                }
            }

            &::before {
                content: '添加';
                position: absolute;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                display: none;
                background-color: rgba(#000, .5);
                text-align: center;
                color: #fff;
            }
        }
    }
}

.right {
    line-height: 2;
    .title {
        padding: 0 0.5em;
        border-bottom: 1px solid;
        @include c(border-bottom-color, #ccc);

        .delete {
            @include c(color, $text_c3);
            cursor: pointer;
        }
    }

    .stations {
        height: 220px;
        overflow: auto;
        padding: 0 0.5em;

        .station {
            // border-bottom: 1px solid;
            // @include c(border-bottom-color, $line_c1);

            .delete {
                @include c(color, $text_c3);
                cursor: pointer;
            }

            .devices {
                max-height: 100px;
                overflow: auto;
                padding: 0.5em;
                background-color: #ccc;

                .device {
                    display: inline-block;
                    width: 140px;
                    cursor: pointer;
                    position: relative;
                    word-break: keep-all;
                    text-overflow: ellipsis;
                    overflow: hidden;

                    &:hover {
                        &::before {
                            display: block;
                        }
                    }

                    &::before {
                        content: '删除';
                        position: absolute;
                        background-color: rgba(#000, .5);
                        left: 0;
                        right: 0;
                        bottom: 0;
                        top: 0;
                        text-align: center;
                        display: none;
                        color: #fff;
                        // @include c(color, $text_c3);
                    }
                }
            }

        }
    }
}
</style>
