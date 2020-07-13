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
                @change="v => currentStId && baseSearchConditionGetDeviceByStIdsAndDeviceType.getData({stIds: currentStId, deviceTypes: v.join()})"
                v-model="data.deviceType">
                <el-checkbox v-if="data.stClass === '01'" label="1">汇流箱</el-checkbox>
                <el-checkbox v-if="data.stClass === '01'" label="2">逆变器</el-checkbox>
                <!-- <el-checkbox v-if="data.stClass === '01'" label="3">箱变</el-checkbox> -->
                <el-checkbox v-if="data.stClass === '02'" label="18">风机</el-checkbox>
            </el-checkbox-group>
        </el-form-item>

        <!-- <el-form-item
            label-width="80px"
            label="设备">
            <el-radio-group v-model="data.deviceAll">
                <el-radio :label="true">全部</el-radio>
                <el-radio :label="false">自定义</el-radio>
            </el-radio-group>
        </el-form-item> -->

        <el-form-item
            v-if="!data.deviceAll"
            class="station-device"
            label-width="80px"
            label=".">
            <div class="station-list">
                <ul>
                    <li></li>
                </ul>
            </div>
        </el-form-item>
    </div>
</template>

<script>
import {Select, Option, FormItem, Input, Radio, RadioGroup, Transfer, Checkbox, CheckboxGroup, Button, OptionGroup} from 'element-ui'
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
                later: true
            }),
            data: {
                stClass: '01',
                comIds: [],
                stIds: [],
                st_dids: {},
                deviceType: ['1', '2', '18'],
                deviceAll: true
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
            // if (_this.data.st_dids[_this.currentStId].dids.length === 0) {
            //     _this.data.st_dids[_this.currentStId].dids = res.body.map(element => element.deviceId)
            // }
            _this.transferValue = _this.data.st_dids[_this.currentStId].dids
            _this.transferData = res.body.map(element => {
                return {
                    key: element.deviceId,
                    label: element.deviceName
                }
            })
        })

        // this.baseSearchConditionGetDeviceByStIdsAndDeviceType.beforeSend = params => {
        //     _this.transferData = []
        //     _this.transferValue = []
        //     return params
        // }
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
            // const devices = '设备：' + '***'
            const str = stClass + ';\t' + components + ';\t' + stations + ';\t'
            this.$emit('change', str, this.data)
        },
        stFilter (v) {
            this.baseSearchConditionGetStByRoleAndComIds.res.body.forEach(item => {
                item.show = (this.data.stIds[0] ? this.data.stIds.includes(item.stId) : true) && item.stName.includes(v)
            })
        },
        reset () {
            this.getSTClassLIst.getData()
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
        ElOptionGroup: OptionGroup
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
                width: 300px;
            }

            .el-form-item__label {
                @include c(color, transparent);
            }
        }

        .el-radio, .el-checkbox {
            @include c(color, $text_c0);
        }

        .station-list {
            .el-checkbox__label {
                padding-left: 2px;
                @include c(color, $text_c2);
            }
        }

        .el-transfer {
            .el-transfer-panel {
                @include c(background-color, $bg_c2);
                width: 230px;
                border-color: transparent;

                .el-transfer-panel__header {
                    height: 30px;
                    line-height: 30px;
                    background-color: transparent;
                    color: #fff;
                    @include c(border-bottom-color, $line_c1);

                    .el-checkbox {
                        line-height: 30px;
                        @include c(color, $text_c2);

                        .el-checkbox__label {
                            @include c(color, $text_c2);
                            font-size: 14px;

                            span {
                                @include c(color, $text_c2);
                            }
                        }
                    }
                }

                .el-transfer-panel__body {
                    height: 215px;

                    .el-transfer-panel__list.is-filterable {
                        height: 178px;
                    }

                    .el-checkbox {
                        @include c(color, $text_c2);

                        &:hover {
                            @include c(color, $text_c1);
                        }
                    }
                }

                .el-input {
                    width: 200px;
                    margin: 5px;

                    .el-input__prefix {
                        display: none;
                    }

                    input {
                        border-radius: 2px;
                        height: 28px;
                        padding-left: 1em;
                        margin-left: 0.5em;
                    }
                }
            }
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
        width: 230px;
        padding-bottom: 0.5em;

        .header {
            height: 30px;
            line-height: 30px;
            border-bottom: 1px solid;
            margin-bottom: 5px;
            @include c(border-bottom-color, $line_c1);
            @include c(color, $text_c2);
            padding-left: 1em;
        }

        ul {
            overflow: auto;
            height: 170px;
            margin-top: 0.5em;
            li {
                padding: 0.5em 1em;
                cursor: pointer;
                line-height: 1;

                &:hover {
                    @include c(color, $text_c1);
                }

                &.active {
                    @include c(color, $text_c1);
                }

                .text {
                    display: inline-block;
                    width: 140px;
                }

                // .el-checkbox {
                //     float: right;
                // }
            }
        }
    }

    // .el-transfer {
    //     float: left;
    //     // margin-left: 70px;
    // }
}
</style>
