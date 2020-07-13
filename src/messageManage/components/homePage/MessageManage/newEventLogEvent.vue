<template>
    <el-form label-width="150px" :model="formData" :rules="rules" class="newEventLogEvent" ref="formData">
        <el-form-item label="通知人员" v-if="roleType === 3" prop="roleIds">
            <el-select v-model="formData.roleIds" multiple placeholder="请选择" collapse-tags style="margin-right: 20px;" @change="changeRole">
                <el-option
                    v-for="item in roleList.res.data"
                    :key="item.roleId"
                    :label="item.roleName"
                    :value="item.roleId">
                </el-option>
            </el-select>
            <el-popover
                v-if="userList.res.data"
                placement="center"
                width="600"
                trigger="click">
                <div>
                    <el-checkbox :indeterminate="userList.isIndeterminate" v-model="userList.checkAll" @change="checkAllUser">全选</el-checkbox>
                    <el-checkbox-group v-model="userList.checkedUsers" @change="checkSingleUser">
                        <el-checkbox v-for="user in userList.res.data" :label="user.userId" :key="user.userId">{{user.realName + ' ' + user.userName}}</el-checkbox>
                    </el-checkbox-group>
                </div>
                <el-select slot="reference" v-model="userList.showCheckedName" disabled ></el-select>
            </el-popover>
        </el-form-item>
        <el-form-item label="时间设置" prop="dateRuleId">
            <el-radio-group v-model="formData.dateRuleId">
                <el-radio :label="time.id" v-for="time in timeNoticeMethod.res.data.dateRules" :key="time.id">{{time.name}} （{{time.desc}}）</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="通知方式" prop="msgTpl">
            <el-checkbox-group v-model="formData.msgTpl">
                <el-checkbox v-for="noticeType in timeNoticeMethod.res.data.msgTpls" :label="noticeType.msgType" :key="noticeType.msgType">{{noticeType.msgName}}</el-checkbox>
            </el-checkbox-group>
        </el-form-item>
        <el-form-item label="事件类别设置" prop="eventRule">
            <div v-for="firstLevel in faultcodeType.res.body" :key="firstLevel.id">
                <el-row>
                    <el-col :span="4"><el-checkbox v-model="firstLevel.checked" @change="firstLevelChange(firstLevel.checked, firstLevel)">{{firstLevel.name}}</el-checkbox></el-col>
                    <el-col :span="20">
                        <div v-for="secondLevel in firstLevel.children" :key="secondLevel.id">
                            <el-row>
                                <el-col :span="6"><el-checkbox v-model="secondLevel.checked" @change="secondLevelChange(secondLevel.checked, secondLevel)" :disabled="!firstLevel.checked">{{secondLevel.name}}</el-checkbox></el-col>
                                <el-col :span="18">
                                    <el-popover
                                        v-if="secondLevel.otherObj.init && secondLevel.children"
                                        :disabled="!firstLevel.checked || !secondLevel.checked"
                                        placement="right"
                                        width="400"
                                        trigger="click">
                                        <div>
                                            <el-checkbox :indeterminate="secondLevel.otherObj.isIndeterminate" v-model="secondLevel.otherObj.checkAll" @change="(v)=>checkAllThirdLevel(v,secondLevel)">全选</el-checkbox>
                                            <el-checkbox-group v-model="secondLevel.otherObj.checkedFaults" @change="(v)=>checkSingleThirdLevel(v,secondLevel)">
                                                <el-checkbox v-for="thirdLevel in secondLevel.children" :label="thirdLevel" :key="thirdLevel.id">{{thirdLevel.name}}</el-checkbox>
                                            </el-checkbox-group>
                                        </div>
                                        <el-select slot="reference" v-model="secondLevel.otherObj.showCheckedName" disabled></el-select>
                                    </el-popover>
                                </el-col>
                            </el-row>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div style="position:absolute;top:0;right:200px;">（至少选到二级）</div>
        </el-form-item>
    </el-form>
</template>

<script>
import {
    api＿roleList, api＿userList, api＿timeNoticeMethod, api＿faultcodeType, api＿updateStrategySystem, api＿updateStrategyCompany, api＿detailInfoSystem, api＿detailInfoCompany
} from '@messageManage/request/api'
import {Select, Option, FormItem, Form, Popover, Radio, RadioGroup, Checkbox, CheckboxGroup, Row, Col, Message} from 'element-ui'
import mixinWidthHeight from '@comm/mixin/widthHeight'
export default {
    mixins: [mixinWidthHeight],
    props: {
        detail: {
            type: Object
        },
        roleType: {
            type: Number
        },
        visible: {
            type: Boolean
        },
        appId: {
            type: Number
        },
        solarOrWind: {}
    },
    data () {
        return {
            formData: {
                msgId: '', // 接口返回的
                ruleType: 1, // 事件类型为1
                msgTpl: [], // 通知方式多选框
                dateRuleId: '', // 时间方式单选
                eventRule: '', // 事件类别设置，只传2,3两级id值,格式：2.1:3.1,3.2,3.3;2.2:3.1,3.2
                id: '' // 编辑时传
            },
            rules: {
                roleIds: [
                    {required: true, message: '请选择角色', trigger: 'blur'}
                ],
                dateRuleId: [
                    {required: true, message: '请选择时间设置方式', trigger: 'blur'}
                ],
                msgTpl: [
                    {type: 'array', required: true, message: '请至少选择一种通知方式', trigger: 'blur'}
                ],
                eventRule: [
                    {required: true, message: '请选择事件规则', trigger: 'blur'}
                ]
            },
            roleList: api＿roleList({ // 角色列表
                onlyLatest: true,
                later: true,
                res: {data: []}
            }),
            userList: api＿userList({ // 用户列表
                later: true,
                onlyLatest: true,
                res: {data: []},
                isIndeterminate: true,
                checkAll: true,
                checkedUsers: [],
                showCheckedName: '全部' // 显示在select框的值
            }),
            timeNoticeMethod: api＿timeNoticeMethod({ // 时间，通知方式
                later: true,
                res: {data: []}
            }),
            faultcodeType: api＿faultcodeType({ // 故障类型
                later: true,
                res: {body: []}
            }),
            updateStrategySystem: api＿updateStrategySystem({ // 系统管理员-保存
                later: true,
                sameTimeOnce: true,
                res: {body: []}
            }),
            updateStrategyCompany: api＿updateStrategyCompany({ // 集团管理员-保存
                later: true,
                sameTimeOnce: true,
                res: {body: []}
            }),
            detailInfoSystem: api＿detailInfoSystem({ // 系统管理员-详情
                later: true,
                res: {body: []}
            }),
            detailInfoCompany: api＿detailInfoCompany({ // 集团管理员-详情
                later: true,
                res: {body: []}
            })
        }
    },
    created () {
        this.faultcodeType.subscribe(res => {
            for (let i = 0; i < res.body.length; i++) {
                let data = res.body[i].children
                for (let j = 0; j < data.length; j++) {
                    res.body[i].children[j]['otherObj'] = {
                        init: false,
                        checkedFaults: [],
                        checkAll: false,
                        showCheckedName: '全部',
                        isIndeterminate: true
                    }
                }
            }
        })
    },
    mounted () {
        this.$bus.on('saveStrategy', this.saveStrategy)
        this.$bus.on('openNewStrategy', this.openModal)
    },
    methods: {
        async openModal () {
            this.resetForm()
            this.formData = {
                msgId: '',
                ruleType: 1,
                msgTpl: [],
                dateRuleId: '',
                eventRule: '',
                roleIds: '',
                userIds: '',
                id: ''
            }
            this.timeNoticeMethod.getData({appId: this.appId})
            await this.faultcodeType.getData({stcls: this.solarOrWind})
            if (this.roleType === 3) {
                await this.roleList.getData()
            }
            if (this.detail) {
                let interfaceUrl = ''
                if (this.roleType === 3) {
                    interfaceUrl = 'detailInfoCompany'
                } else if (this.roleType === 99) {
                    interfaceUrl = 'detailInfoSystem'
                }
                this[interfaceUrl].getData({id: this.detail.id}).then(async (res) => {
                    if (res.code === 200) {
                        let data = res.data
                        this.formData = {
                            msgId: data.msgId,
                            ruleType: data.ruleType,
                            msgTpl: data.msgTpl.split(',').map(Number),
                            dateRuleId: data.dateRuleItem.id,
                            id: data.id
                        }
                        if (this.roleType === 3) {
                            // 角色
                            if (data.roleRuleItems) {
                                this.formData.roleIds = data.roleRuleItems.map(item => item.roleId)
                                await this.userList.getData({roleIds: this.formData.roleIds.join(',')})
                            }
                            // 人员
                            this.checkAllUser(true) // 默认全部选上
                            if (data.userRuleItems && (data.userRuleItems.length !== this.userList.res.data.length)) { // 若是部分选择
                                this.userList.checkedUsers = data.userRuleItems.map(v => v.userId)
                                this.userList.checkAll = false
                                this.userList.res.data.map(v => {
                                    if (this.userList.checkedUsers.includes(v.userId)) this.userList.showCheckedName = '部分选择'
                                })
                            }
                        }
                        // 事件规则
                        let ruleType = data.eventRule.split(';')
                        let secondLevIds = [] // 二级所有选中的id
                        let thirdLevDefinedArr = [] // 二三级自定义组合
                        ruleType.map(item => {
                            if (!item) return
                            if (!item.includes(':')) return secondLevIds.push(Number(item))
                            thirdLevDefinedArr.push({secId: Number(item.substring(0, item.indexOf(':'))), thirdIds: item.substring(item.indexOf(':') + 1, item.length)})
                            return secondLevIds.push(Number(item.substring(0, item.indexOf(':'))))
                        })
                        let faultcodeData = this.faultcodeType.res.body
                        for (let i = 0; i < faultcodeData.length; i++) { // 一级
                            faultcodeData[i].checked = false
                            let data = faultcodeData[i].children
                            for (let j = 0; j < data.length; j++) { // 二级
                                data[j].checked = false
                                data[j].otherObj.init = true
                                if (secondLevIds.includes(data[j].id)) {
                                    data[j].checked = true
                                    faultcodeData[i].checked = true
                                }
                                if (data[j].children) { // 若有第三级
                                    this.checkAllThirdLevel(true, data[j]) // 默认三级中，全部选中
                                    if (thirdLevDefinedArr.length) { // 若三级中有部分选中
                                        data[j].otherObj.checkedFaults = []
                                        thirdLevDefinedArr.map(item => {
                                            if (data[j].id === Number(item.secId)) {
                                                data[j].children.map(v => {
                                                    if (item.thirdIds.includes(v.id)) data[j].otherObj.checkedFaults.push(v)
                                                })
                                            }
                                        })
                                        data[j].otherObj.showCheckedName = '部分选择'
                                        data[j].otherObj.checkAll = false
                                    }
                                }
                            }
                        }
                        this.faultcodeType.res.body = [...this.faultcodeType.res.body]
                    }
                })
            } else {
                this.formData.msgId = this.timeNoticeMethod.res.data.msgId
                this.userList.res.data = []
                this.userList.checkedUsers = []
                this.userList.showCheckedName = '全部'
                if (this.roleType === 3) {
                    // 新增，默认角色全选上，角色对应所有人员也都选上
                    // 角色
                    let roleIdAll = this.roleList.res.data.map(v => v.roleId)
                    this.formData.roleIds = roleIdAll
                    // 人员
                    await this.userList.getData({roleIds: roleIdAll.join(',')})
                    this.checkAllUser(true)
                }
                let faultcodeData = this.faultcodeType.res.body
                for (let i = 0; i < faultcodeData.length; i++) { // 一级
                    let data = faultcodeData[i].children
                    faultcodeData[i].checked = false
                    for (let j = 0; j < data.length; j++) { // 二级
                        data[j].checked = false
                        if (data[j].children) {
                            data[j].otherObj.init = true
                            this.checkAllThirdLevel(true, data[j])
                        }
                    }
                }
                this.faultcodeType.res.body = [...this.faultcodeType.res.body]
            }
        },
        async changeRole (v) {
            if (v.length) {
                await this.userList.getData({roleIds: v.join(',')})
            } else {
                await this.userList.getData({roleIds: this.roleList.res.data.map(v => v.roleId).join(',')})
            }
            this.checkAllUser(true)
        },
        checkAllUser (val) { // 全选-人员
            let userList = this.userList.res.data
            this.userList.checkAll = val
            this.userList.checkedUsers = val ? userList.map(v => v.userId) : []
            this.userList.isIndeterminate = false
            this.userList.showCheckedName = '全部'
        },
        checkSingleUser (value) { // 单选-人员
            let userList = this.userList.res.data
            let checkedCount = value.length
            this.userList.checkAll = checkedCount === userList.length
            this.userList.isIndeterminate = checkedCount > 0 && checkedCount < this.userList.res.data.length
            this.userList.showCheckedName = '全部'
            if (!this.userList.checkAll) {
                userList.map(v => {
                    if (this.userList.checkedUsers.includes(v.userId)) this.userList.showCheckedName = '部分选择'
                })
            }
        },
        checkAllThirdLevel (val, secondValue) { // 全选-事件分类
            secondValue.otherObj.checkAll = val
            secondValue.otherObj.checkedFaults = val ? secondValue.children : []
            secondValue.otherObj.isIndeterminate = false
            secondValue.otherObj.showCheckedName = '全部'
            this.faultcodeType.res.body = [...this.faultcodeType.res.body]
        },
        checkSingleThirdLevel (value, secondValue) { // 单选-事件分类
            // let checkedCount = value.length
            let checkedCount = secondValue.otherObj.checkedFaults.length
            secondValue.otherObj.checkAll = checkedCount === secondValue.children.length
            secondValue.otherObj.isIndeterminate = checkedCount > 0 && checkedCount < secondValue.children.length
            secondValue.otherObj.showCheckedName = '全部'
            if (!secondValue.otherObj.checkAll && secondValue.otherObj.checkedFaults && secondValue.otherObj.checkedFaults.length) secondValue.otherObj.showCheckedName = '部分选择'
            this.faultcodeType.res.body = [...this.faultcodeType.res.body]
        },
        firstLevelChange (curChecked, curFirst) { // 一级CheckBox改变
            if (!curChecked) {
                curFirst.children.map(item => (item.checked = false))
            }
            this.faultcodeType.res.body = [...this.faultcodeType.res.body]
        },
        secondLevelChange (curChecked, curSecond) { // 二级CheckBox改变
            this.faultcodeType.res.body = [...this.faultcodeType.res.body]
        },
        saveStrategy () { // 保存
            let faultcodeData = this.faultcodeType.res.body
            let str = ''
            for (let i = 0; i < faultcodeData.length; i++) { // 一级
                if (faultcodeData[i].checked) {
                    let data = faultcodeData[i].children
                    for (let j = 0; j < data.length; j++) { // 二级
                        if (data[j].checked) {
                            str += data[j].id
                            if (data[j].otherObj.checkAll) { // 说明三级全选，则不传三级的id值
                                str += ';'
                            } else {
                                if (data[j].otherObj.checkedFaults.length) { // 只选了部分值
                                    str += ':'
                                    data[j].otherObj.checkedFaults.map((item, index) => {
                                        if (item.id) str += item.id + (index + 1 === data[j].otherObj.checkedFaults.length ? ';' : ',')
                                    })
                                } else {
                                    str += ';'
                                }
                            }
                        }
                    }
                }
            }
            this.formData.eventRule = str
            this.formData = {...this.formData}
            this.$refs.formData.validate((valid, a) => { // 校验
                if (!valid) return false
                let formData = {...this.formData}
                formData.msgTpl = this.formData.msgTpl.join(',')

                let interfaceUrl = ''
                if (this.roleType === 3) {
                    interfaceUrl = 'updateStrategyCompany'
                    formData.roleIds = this.formData.roleIds ? this.formData.roleIds.join(',') : ''
                    formData.userIds = this.userList.checkedUsers
                } else if (this.roleType === 99) {
                    interfaceUrl = 'updateStrategySystem'
                }
                this[interfaceUrl].getData(formData).then(res => {
                    if (res.code !== 200) return Message.error(res.msg || res.body || '保存失败')
                    this.$emit('updateSuccess')
                    Message.success(res.msg || res.body || '保存成功')
                })
            })
        },
        resetForm () { // 重置form
            this.$refs.formData.resetFields()
        }
    },
    beforeDestroy () {
        this.$bus.off('saveStrategy', this.saveStrategy)
        this.$bus.off('openNewStrategy', this.openModal)
        this.faultcodeType.res.body = null
    },
    components: {
        ElSelect: Select,
        ElOption: Option,
        ElForm: Form,
        ElFormItem: FormItem,
        ElPopover: Popover,
        ElRadio: Radio,
        ElRadioGroup: RadioGroup,
        ElCheckbox: Checkbox,
        ElCheckboxGroup: CheckboxGroup,
        ElRow: Row,
        ElCol: Col
    }
}
</script>

<style lang="scss">
.newEventLogEvent {
    .el-input {
        &.is-disabled {
            .el-input__inner {
                background-color: #FFFFFF;
                cursor: pointer;
            }
        }
    }
}
</style>
<style lang="scss" scoped>
.newEventLogEvent {
    height: calc(100vh - 350px);
    overflow:auto;
    .require{
        color: #F56C6C;
        position:absolute;
    }
}
</style>
