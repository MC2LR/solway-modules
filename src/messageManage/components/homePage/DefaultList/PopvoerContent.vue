<template>
    <div class="popover-content">
        <el-form-item
            label-width="80px"
            v-if="getSTClassLIst.res.data[1]"
            label="电站分类">
            <el-radio-group
                @change="getSTClassAllDevice"
                v-model="data.stClass">
                <el-radio label="01">光伏</el-radio>
                <el-radio label="02">风电</el-radio>
            </el-radio-group>
        </el-form-item>

        <el-form-item
            label-width="80px"
            label="集团">
            <el-select
                :clearable="true"
                :filterable="true"
                :multiple="true"
                :reserve-keyword="true"
                :popper-append-to-body="false"
                placeholder="全部"
                @change="v => baseSearchConditionGetStByRoleAndComIds.getData({comIds: v.join(), stClass: data.stClass})"
                v-model="data.comIds">
                <el-option
                    v-for="item in baseSearchConditionGetAllComByRole.res.body"
                    :key="item.comId"
                    :label="item.comName"
                    :value="item.comId">
                </el-option>
            </el-select>
        </el-form-item>

        <el-form-item
            label-width="80px"
            label="电站">
            <el-select
                :clearable="true"
                :filterable="true"
                :multiple="true"
                :reserve-keyword="true"
                :popper-append-to-body="false"
                @change="stFilter"
                placeholder="全部"
                v-model="data.stIds">
                <el-option
                    v-for="item in baseSearchConditionGetStByRoleAndComIds.res.body"
                    :key="item.stId"
                    :label="item.stName"
                    :value="item.stId">
                </el-option>
            </el-select>
        </el-form-item>

        <el-form-item
            label-width="80px"
            v-if="data.stClass === '01'"
            style="margin-bottom:0;"
            label="设备类型">
            <el-checkbox-group
                @change="getDevice"
                v-model="data.deviceType">
                <el-checkbox v-if="data.stClass === '01'" label="1">汇流箱</el-checkbox>
                <el-checkbox v-if="data.stClass === '01'" label="2">逆变器</el-checkbox>
                <!-- <el-checkbox v-if="data.stClass === '01'" label="3">箱变</el-checkbox> -->
                <el-checkbox v-if="data.stClass === '02'" label="18">风机</el-checkbox>
            </el-checkbox-group>
        </el-form-item>

        <el-form-item
            label-width="80px"
            label="设备">
            <el-radio-group v-model="data.deviceAll">
                <el-radio :label="true">全部</el-radio>
                <el-radio :label="false">自定义</el-radio>
            </el-radio-group>
        </el-form-item>

        <el-form-item
            v-if="!data.deviceAll"
            class="station-device"
            label-width="80px"
            label=".">
            <div class="station-list">
                <el-form-item>
                    <el-select
                        :clearable="true"
                        :filterable="true"
                        :popper-append-to-body="false"
                        v-model="custom.currentStid"
                        @change="getDevice"
                        placeholder="请选择电站">
                        <el-option
                            v-for="item in baseSearchConditionGetStByRoleAndComIds.res.body"
                            :key="item.stId"
                            :label="item.stName"
                            v-show="item.show"
                            :value="item.stId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item
                    class="deviceType">
                    <el-input
                        v-model="custom.deviceFilterText"
                        @input="deviceFilter"
                        placeholder="搜索设备名">
                        <el-select
                            v-model="custom.deviceType"
                            slot="prepend"
                            @change="getDevice"
                            clearable
                            placeholder="全部">
                            <el-option v-if="data.deviceType.includes('1')" label="汇流箱" value="1"></el-option>
                            <el-option v-if="data.deviceType.includes('2')" label="逆变器" value="2"></el-option>
                            <el-option v-if="data.deviceType.includes('18')" label="风机" value="18"></el-option>
                        </el-select>
                    </el-input>
                </el-form-item>
                <div class="devices" v-loading="baseSearchConditionGetDeviceByStIdsAndDeviceType.loading">
                    <span
                        v-for="item in baseSearchConditionGetDeviceByStIdsAndDeviceType.res.body"
                        class="device"
                        :class="{checked: item.checked}"
                        :data-content="item.deviceName"
                        v-show="item.show"
                        @click="addDevice(item)"
                        :key="item.deviceSerialNnumber">
                        {{item.deviceName}}
                    </span>
                </div>
            </div>
            <div class="station-device-list">
                <p class="title">
                    <span>已选设备</span>
                    <span v-if="custom.sts.length" @click="deviceAllDelete" class="pull-right delete">全部删除</span>
                </p>
                <p v-if="custom.sts.length === 0" style="padding-left: 0.5em;">您还没有选择设备，将按全部查询。</p>
                <div class="stations">
                    <div
                        class="station"
                        v-for="(item, index) in custom.sts"
                        :key="item">
                        <h5>
                            <span>{{custom[item].stName.trim()}}</span>
                            <el-badge type="primary" :value="custom[item].devices.length" />
                            <span @click="delete custom[item]; custom.sts.splice(index, 1)" class="pull-right delete">删除此站</span>
                        </h5>
                        <div class="devices">
                            <span
                                :data-content="item.deviceName"
                                class="device"
                                v-for="(xitem, xindex) in custom[item].devices"
                                @click="deviceDelete(item, xindex, index, baseSearchConditionGetDeviceByStIdsAndDeviceType.res.body.find(v => v.st_eqid === xitem.st_eqid))"
                                :key="xitem.st_eqid">
                                {{xitem.deviceName}}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </el-form-item>
    </div>
</template>

<script>
import {Select, Option, FormItem, Input, Radio, RadioGroup, Transfer, Checkbox, CheckboxGroup, Button, OptionGroup, Badge} from 'element-ui'
import {
    api＿getSTClassLIst,
    api＿baseSearchConditionGetAllComByRole,
    api＿baseSearchConditionGetStByRoleAndComIds,
    api＿baseSearchConditionGetDeviceByStIdsAndDeviceType
} from '@messageManage/request/api'

export default {
    data () {
        return {
            getSTClassLIst: api＿getSTClassLIst({
                onlyLatest: true,
                res: { data: [] }
            }),
            baseSearchConditionGetAllComByRole: api＿baseSearchConditionGetAllComByRole({
                later: true
            }),
            baseSearchConditionGetStByRoleAndComIds: api＿baseSearchConditionGetStByRoleAndComIds({
                later: true
            }),
            baseSearchConditionGetDeviceByStIdsAndDeviceType: api＿baseSearchConditionGetDeviceByStIdsAndDeviceType({
                later: true,
                res: {
                    body: []
                }
            }),
            data: {
                stClass: '01',
                comIds: [],
                stIds: [],
                st_dids: {},
                deviceType: ['1', '2', '18'],
                deviceAll: true
            },
            custom: {
                currentStid: '',
                deviceType: '',
                deviceFilterText: '',
                sts: []
            }
            // currentStName: '',
            // stFilterText: '',
            // currentStId: void 0
        }
    },
    created () {
        const _this = this

        this.$bus.on('popoverHide', this.change)
        this.$bus.on('reset', this.reset)

        this.getSTClassLIst.subscribe(res => {
            _this.data.stClass = res.data[0].id
            _this.getSTClassAllDevice()
            _this.change()
        })

        this.baseSearchConditionGetStByRoleAndComIds.subscribe(res => {
            _this.data.st_dids = {}
            res.body.forEach(v => {
                _this.data.st_dids[v.stId] = {
                    selectStatus: 2,
                    dids: []
                }
            })
            _this.stFilter(this.stFilterText)
        })

        this.baseSearchConditionGetDeviceByStIdsAndDeviceType.subscribe(res => {
            _this.deviceFilter(_this.custom.deviceFilterText)
        })

        this.baseSearchConditionGetDeviceByStIdsAndDeviceType.subscribe(res => {
            if (!_this.custom.hasOwnProperty([_this.custom.currentStid])) return
            res.body.forEach(v => {
                v.checked = _this.custom[_this.custom.currentStid].devices.some(xv => xv.st_eqid === v.st_eqid)
            })
        })

        this.baseSearchConditionGetDeviceByStIdsAndDeviceType.beforeSend = (params) => {
            this.baseSearchConditionGetDeviceByStIdsAndDeviceType.res.body = []
            return params
        }
    },
    methods: {
        getSTClassAllDevice () {
            const _this = this
            this.data.comIds = []
            this.data.stIds = []
            this.data.deviceType = this.data.stClass === '01' ? ['1', '2'] : ['18']
            this.baseSearchConditionGetAllComByRole.getData({
                stClass: _this.data.stClass
            })
            this.baseSearchConditionGetStByRoleAndComIds.getData({
                stClass: _this.data.stClass,
                comIds: _this.data.comIds.join()
            })
        },
        change () {
            const stClass = '电站类型: ' + {'01': '光伏', '02': '风电'}[this.data.stClass]
            const components = '集团：' + ((this.baseSearchConditionGetAllComByRole.res.body && this.data.comIds.length) ? this.baseSearchConditionGetAllComByRole.res.body.filter(v => this.data.comIds.includes(v.comId)).map(v => v.comName).join('、') : '全部')
            const stations = '电站：' + ((this.baseSearchConditionGetStByRoleAndComIds.res.body && this.data.stIds.length) ? this.baseSearchConditionGetStByRoleAndComIds.res.body.filter(v => this.data.stIds.includes(v.stId)).map(v => v.stName).join('、') : '全部')
            const deviceTypes = '设备类型：' + this.data.deviceType.map(v => ({'1': '汇流箱', '2': '逆变器', '18': '风机'}[v])).join('、')
            const devices = '设备：' + (this.data.deviceAll ? '全部' : this.custom.sts.reduce((a, b) => {
                return a.concat(this.custom[b].devices.map(v => v.deviceName))
            }, []).join('、') || '全部')
            const str = stClass + ';\t' + components + ';\t' + stations + ';\t' + deviceTypes + ';\t' + devices
            this.$emit('change', str, {
                ...this.data,
                st_eqid: this.data.deviceAll ? '' : this.custom.sts.reduce((a, b) => {
                    return a.concat(this.custom[b].devices.map(v => v.st_eqid))
                }, []).join()
            })
        },
        stFilter (v) {
            this.baseSearchConditionGetStByRoleAndComIds.res.body.forEach(item => {
                item.show = (this.data.stIds[0] ? this.data.stIds.includes(item.stId) : true)
            })
        },
        reset () {
            this.deviceAllDelete()
            this.data.deviceAll = true
            this.getSTClassLIst.getData()
        },
        getDevice () {
            if (this.custom.currentStid) {
                this.baseSearchConditionGetDeviceByStIdsAndDeviceType.getData({
                    stIds: this.custom.currentStid,
                    deviceTypes: this.custom.deviceType || this.data.deviceType.join()
                })
            }
        },
        deviceFilter (str) {
            this.baseSearchConditionGetDeviceByStIdsAndDeviceType.res.body.forEach(v => {
                v.show = v.deviceName.includes(str)
            })
        },
        addDevice (device) {
            if (!this.custom.hasOwnProperty(device.stId)) {
                this.custom.sts.push(device.stId)
                this.custom[device.stId] = {
                    stName: device.stName,
                    devices: []
                }
            }
            const {deviceName, st_eqid: stEqid} = device
            if (this.custom[device.stId].devices.some(v => v.st_eqid === device.st_eqid)) {
                const stid = this.custom.currentStid
                const index = this.custom.sts.indexOf(stid)
                const xindex = this.custom[stid].devices.findIndex(v => v.st_eqid === device.st_eqid)
                this.deviceDelete(stid, xindex, index, device)
            } else {
                this.custom[device.stId].devices.push({deviceName, st_eqid: stEqid})
                device.checked = true
                this.custom = {...this.custom}
            }
        },
        deviceAllDelete () {
            this.custom.sts.forEach(v => {
                delete this.custom[v]
            })
            this.custom.sts = []
            this.baseSearchConditionGetDeviceByStIdsAndDeviceType.res.body.forEach(v => {
                v.checked = false
            })
        },
        deviceDelete (item, xindex, index, xitem) {
            this.custom[item].devices.splice(xindex, 1)
            xitem.checked = false
            if (!this.custom[item].devices.length) {
                delete this.custom[item]
                this.custom.sts.splice(index, 1)
            }
        }
    },
    beforeDestroy () {
        this.$bus.off('popoverHide', this.change)
        this.$bus.off('reset', this.rese)
    },
    components: {
        ElSelect: Select,
        ElOption: Option,
        ElFormItem: FormItem,
        ElInput: Input,
        ElRadio: Radio,
        ElRadioGroup: RadioGroup,
        ElTransfer: Transfer,
        ElCheckbox: Checkbox,
        ElCheckboxGroup: CheckboxGroup,
        ElButton: Button,
        ElOptionGroup: OptionGroup,
        ElBadge: Badge
    }
}
</script>

<style lang="scss">
.popover-content {
    .el-form-item {
        margin-bottom: 10px;

        .el-form-item__label {
            @include c(color, $text_c2);
        }

        .el-input {
            width: 860px;

            input {
                @include c(background-color, $bg_input_c1);
                @include c(border-color, $line_c1);
                @include c(color, $text_c0);
            }
        }

        &.station-device {
            .el-input {
                width: 365px;
            }

            .el-form-item__label {
                @include c(color, transparent);
            }

            .station-list {
                .deviceType {
                    .el-input-group__prepend {
                        border: none;

                        .el-select {
                            width: 100px;

                            .el-input {
                                width: 100px;

                                input {
                                    border: 1px solid;
                                    @include c(border-color, $line_c1);
                                }
                            }

                            &:hover {
                                .el-input {
                                    input.el-input__inner {
                                        @include c(background-color, $bg_input_c1);
                                        @include c(border-color, $line_c1);
                                        @include c(color, $text_c0);
                                    }
                                }
                            }
                        }
                    }

                    .el-input__inner {
                        border-left: none;
                    }
                }

            }
        }

        .el-radio, .el-checkbox {
            @include c(color, $text_c0);
        }
    }
}
</style>

<style lang="scss" scoped>
@import '@comm/assets/themes/scrollbar/s1.scss';
.popover-content {
    @include c(color, $text_c0);
    min-height: 400px;

    .station-device {
        .station-device-container {
            margin-left: 80px;
            max-height: 250px;
            overflow: auto;

            .line {

            }
        }
    }

    .station-list {
        float: left;
        @include c(background-color, $bg_c2);
        width: 380px;
        height: 260px;
        padding: 0.5em;

        div.devices {
            height: 166px;
            overflow: auto;

            span.device {
                display: inline-block;
                width: 170px;
                cursor: pointer;
                padding: 0 0.5em;
                position: relative;
                word-break: keep-all;
                text-overflow: ellipsis;
                overflow: hidden;
                margin-right: 10px;

                &.checked {
                    border: 1px dashed;
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
                    background-color: rgba(#000, .5);
                    left: 0;
                    right: 0;
                    bottom: 0;
                    top: 0;
                    text-align: center;
                    display: none;
                }
            }
        }

    }

    .station-device-list {
        float: left;
        @include c(background-color, $bg_c2);
        width: 460px;
        height: 260px;
        margin-left: 20px;

        .title {
            padding: 0 0.5em;
            border-bottom: 1px solid;
            @include c(border-bottom-color, $line_c1);

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
                    @include c(background-color, mix(#000, $bg_c2, 10%));

                    .device {
                        display: inline-block;
                        width: 115px;
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
                            // @include c(color, $text_c3);
                        }
                    }
                }

            }
        }

    }

    // .el-transfer {
    //     float: left;
    //     // margin-left: 70px;
    // }
}
</style>
