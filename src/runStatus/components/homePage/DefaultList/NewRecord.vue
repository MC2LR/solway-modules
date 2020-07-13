<template>
    <el-form
        class="new-record"
        :disabled="disabled"
        ref="form"
        label-width="135px"
        :inline="true"
        :model="data">
        <el-form-item
            style="display: block;margin-bottom:10px;"
            v-if="getSTClassLIst.res.data[1]"
            label="电站分类">
            <el-radio-group
                :disabled="!!detail"
                v-model="data.stClass"
                @change="changeStClass">
                <el-radio label="01">光伏</el-radio>
                <el-radio label="02">风电</el-radio>
            </el-radio-group>
        </el-form-item>

        <el-form-item
            prop="comId"
            :rules="[{ required: true, message: '请选择集团'}]"
            label="集团">
            <el-select
                :disabled="!!detail"
                :filterable="true"
                placeholder="请选择集团"
                @change="v => baseSearchConditionGetStByRoleAndComIds.getData({comIds: v, stClass: data.stClass})"
                v-model="data.comId">
                <el-option
                    v-for="item in baseSearchConditionGetAllComByRole.res.body"
                    :key="item.comId"
                    :label="item.comName"
                    :value="item.comId">
                </el-option>
            </el-select>
        </el-form-item>

        <el-form-item
            prop="stId"
            :rules="[{ required: true, message: '请选择电站'}]"
            label="电站">
            <el-select
                :disabled="!!detail"
                :filterable="true"
                placeholder="请选择电站"
                @change="getDevice"
                v-model="data.stId">
                <el-option
                    v-for="item in baseSearchConditionGetStByRoleAndComIds.res.body"
                    :key="item.stId"
                    :label="item.stName"
                    :value="item.stId">
                </el-option>
            </el-select>
        </el-form-item>

        <el-form-item
            prop="deviceType"
            :rules="[{ required: true, message: '请选择设备类型'}]"
            label="设备类型">
            <el-select
                :disabled="!!detail"
                placeholder="请选择设备类型"
                @change="getDevice"
                v-model="data.deviceType">
                <el-option v-if="data.stClass === '01'" label="汇流箱" value="1"></el-option>
                <el-option v-if="data.stClass === '01'" label="逆变器" value="2"></el-option>
                <el-option v-if="data.stClass === '02'" label="风机" value="18"></el-option>
            </el-select>
        </el-form-item>

        <el-form-item
            label="设备">
            <el-select
                :disabled="!!detail"
                :filterable="true"
                multiple
                clearable
                reserve-keyword
                collapse-tags
                placeholder="全部"
                v-model="data.deviceIds">
                <el-option
                    v-for="item in baseSearchConditionGetDeviceByStIdsAndDeviceType.res.body"
                    :key="item.deviceSerialNnumber"
                    :label="item.deviceName"
                    :value="item.deviceSerialNnumber">
                </el-option>
            </el-select>
        </el-form-item>

        <el-form-item
            prop="date"
            :rules="[
                { required: true, message: '请选择时间'},
                { validator: dateValidator }
            ]"
            label="时间">
            <el-date-picker
                style="width: 583px;"
                v-model="data.date"
                format="yyyy-MM-dd HH:mm"
                type="datetimerange"
                align="center"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
            </el-date-picker>
        </el-form-item>

        <el-form-item
            prop="realStatus"
            :rules="[{ required: true, message: '请选择实际状态'}]"
            label="实际状态">
            <el-select
                placeholder="请选择实际状态"
                v-model="data.realStatus">
                <el-option label="正常运行" value="00"></el-option>
                <el-option label="故障停机" value="01"></el-option>
                <el-option label="限电停机" value="02"></el-option>
                <el-option label="检修停机" value="03"></el-option>
            </el-select>
        </el-form-item>

        <el-form-item
            label="电量计算参考设备">
            <el-select
                :filterable="true"
                clearable
                v-model="data.referenceDevice">
                <el-option
                    v-for="item in baseSearchConditionGetDeviceByStIdsAndDeviceType.res.body"
                    :key="item.deviceSerialNnumber"
                    :label="item.deviceName"
                    :value="item.deviceSerialNnumber">
                </el-option>
            </el-select>
        </el-form-item>

        <el-form-item
            label="系统计算损失电量">
            <el-tooltip
                effect="dark"
                content="如果在设备异常时间内有光照数据，系统将自动根据光照计算设备的损失电量，如没有，则系统将根据参考设备为依据进行计算"
                placement="bottom">
                <el-input
                    v-model="data.lostElecSystem"
                    style="width: 217px;"
                    disabled>
                </el-input>
            </el-tooltip>
        </el-form-item>

        <el-form-item
            label="事件说明">
            <el-input
                style="width: 950px;"
                placeholder="请输入事件说明"
                v-model="data.eventExplain"
                type="textarea">
            </el-input>
        </el-form-item>

        <el-form-item
            label="人工统计损失电量">
            <el-tooltip
                effect="dark"
                content="如果系统计算的损失电量有误，可以手动在此输入损失电量，后台计算时将以此数据为准"
                placement="bottom">
                <el-input
                    clearable
                    v-model="data.lostElecUser"
                    placeholder="请输入人工统计损失电量"
                    type="number">
                </el-input>
            </el-tooltip>
        </el-form-item>

        <el-form-item
            prop="dayRate"
            :rules="[
                {required: data.lostElecUser, message: '请输入电量每日折算比例'},
                {validator: dayRateValidator.bind(this)}
            ]"
            label="电量每日折算比例">
            <el-tooltip
                effect="dark"
                content="如果需要手动输入损失电量且时间涉及跨天，请按照0.1,0.8,0.1格式输入每天的电量折算比例"
                placement="bottom">
                <el-input
                    style="width: 217px;"
                    placeholder="请输入电量每日折算比例"
                    v-model="data.dayRate">
                </el-input>
            </el-tooltip>
        </el-form-item>
    </el-form>
</template>

<script>
import {
    api＿getSTClassLIst,
    api＿baseSearchConditionGetAllComByRole,
    api＿baseSearchConditionGetStByRoleAndComIds,
    api＿baseSearchConditionGetDeviceByStIdsAndDeviceType,
    api＿stateAdjustSaveStateAdjust
} from '@runStatus/request/api'
import {Select, Option, FormItem, Input, Radio, RadioGroup, Form, DatePicker, Message, Tooltip} from 'element-ui'

export default {
    props: {
        detail: {
            type: Object
        },
        disabled: {
            required: true,
            type: Boolean
        },
        visible: {
            required: true,
            type: Boolean
        }
    },
    data () {
        return {
            getSTClassLIst: api＿getSTClassLIst({
                later: true,
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
            stateAdjustSaveStateAdjust: api＿stateAdjustSaveStateAdjust({
                later: true,
                sameTimeOnce: true,
                beforeSend (params) {
                    if (params.date) {
                        params.startDate = params.date[0].Format('yyyy-MM-dd hh:mm')
                        params.endDate = params.date[1].Format('yyyy-MM-dd hh:mm')
                        delete params.date
                    }
                    delete params.createDate
                    delete params.updateDate
                    delete params.createUser
                    delete params.updateUser
                    if (params.deviceIds[0]) {
                        params.deviceIds = params.deviceIds.join()
                    }
                    if (params.id && !params.log_deviceIds) {
                        params.ids_deviceIds = params.id + '_' + params.deviceIds
                        delete params.deviceIds
                    }
                    if (params.log_deviceIds) {
                        params.log_deviceIds = (params.log_deviceIds + '').split(',').map((v, i) => v + '_' + params.deviceIds.split(',')[i]).join()
                        delete params.id
                    }
                    return params
                }
            }),
            dateValidator: (rule, value, callback) => {
                if (value[0].getTime() === value[1].getTime()) {
                    callback(new Error('开始和结束时间不能重叠'))
                } else {
                    callback()
                }
            },
            dayRateValidator (rule, value, callback) {
                if (value) {
                    const nums = value.split(',')
                    if (nums.some(v => {
                        if (!v) return true
                        if (isNaN(+v)) return true
                        if (typeof +v !== 'number') return true
                    })) {
                        callback(new Error('格式错误，应为(`1.2,0.8,1`或`1.2`)'))
                    } else if (this.data.date && this.data.date[1]) {
                        const [s, e] = this.data.date
                        const dayNum = (Math.floor((e.getTime() + 28800000) / 86400000) - Math.floor((s.getTime() + 28800000) / 86400000)) + 1
                        if (dayNum !== nums.length) {
                            callback(new Error(`时间范围${dayNum}天，应填${dayNum}个值。`))
                        } else {
                            callback()
                        }
                    } else {
                        callback()
                    }
                } else {
                    callback()
                }
            },
            data: {
                stClass: '01',
                comId: '',
                stId: '',
                deviceType: void 0,
                deviceIds: []
            }
        }
    },
    created () {
        const _this = this

        this.getSTClassLIst.subscribe(res => {
            _this.data.stClass = res.data[0].id
            if (!this.detail) {
                _this.baseSearchConditionGetAllComByRole.getData({
                    stClass: _this.data.stClass
                })
            }
        })

        this.baseSearchConditionGetAllComByRole.subscribe(res => {
            _this.data.comId = ''
            _this.data.stId = ''
            _this.baseSearchConditionGetStByRoleAndComIds.res = {}
            _this.baseSearchConditionGetDeviceByStIdsAndDeviceType.res = {}
        })

        this.baseSearchConditionGetStByRoleAndComIds.subscribe(res => {
            _this.data.stId = ''
            _this.baseSearchConditionGetDeviceByStIdsAndDeviceType.res = {}
        })

        this.stateAdjustSaveStateAdjust.subscribe(res => {
            if (res.code !== 0) return Message.error(res.msg || res.body)
            _this.$emit('updateSuccess')
            Message.success(res.msg || res.body)
        })
    },
    mounted () {
        this.$bus.on('saveRecord', this.saveRecord)
        this.$bus.on('openNewRecord', this.openNewRecord)
        this.openNewRecord()
    },
    methods: {
        async openNewRecord () {
            this.$refs.form.resetFields()
            this.data = {
                comId: '',
                stId: '',
                deviceType: '',
                deviceIds: []
            }
            await this.getSTClassLIst.getData()
            if (this.detail) {
                const {stClass, comId, stId, deviceType, deviceId, startDate, endDate, deviceIds} = this.detail
                await this.baseSearchConditionGetAllComByRole.getData({ stClass })
                await this.baseSearchConditionGetStByRoleAndComIds.getData({comIds: comId, stClass})
                await this.baseSearchConditionGetDeviceByStIdsAndDeviceType.getData({ stIds: stId, deviceTypes: deviceType })
                this.data = {
                    ...this.data,
                    ...this.detail,
                    date: [new Date(startDate), new Date(endDate)],
                    deviceIds: deviceIds ? deviceIds.split(',').map(v => +v) : (deviceId ? [deviceId] : [])
                }
            }
        },
        getDevice () {
            const {stId, deviceType} = this.data
            if (stId && deviceType) {
                this.baseSearchConditionGetDeviceByStIdsAndDeviceType.getData({
                    stIds: stId,
                    deviceTypes: deviceType
                })
            }
        },
        changeStClass () {
            this.data.deviceType = ''
            this.baseSearchConditionGetAllComByRole.getData({stClass: this.data.stClass})
        },
        saveRecord () {
            this.$refs.form.validate(valid => {
                if (!valid) return false
                this.stateAdjustSaveStateAdjust.getData(this.data)
            })
        }
    },
    beforeDestroy () {
        this.$bus.off('saveRecord', this.saveRecord)
        this.$bus.off('openNewRecord', this.openNewRecord)
    },
    components: {
        ElSelect: Select,
        ElOption: Option,
        ElForm: Form,
        ElFormItem: FormItem,
        ElInput: Input,
        ElRadio: Radio,
        ElRadioGroup: RadioGroup,
        ElDatePicker: DatePicker,
        ElTooltip: Tooltip
    }
}
</script>
