<template>
    <el-form label-width="150px" :model="formData" :rules="rules" class="newEventLogFaultcode" ref="formData">
        <el-form-item label="通知人员" prop="roleIds">
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
        <div class="add-btn-con">
            <el-button type="success" icon="el-icon-plus" circle @click="addLine"></el-button>
        </div>
        <el-form-item label="事件故障码" prop="eventRule">
            <div class="clearfix">
                <div class="pull-left faultcode-title">设备类型</div>
                <div class="pull-left faultcode-title">产品</div>
                <div class="pull-left faultcode-title">故障库</div>
                <div class="pull-left faultcode-title">故障码</div>
            </div>
            <div v-for="item in list"  :key="item.id">
                <el-select v-model="item.group1" placeholder="请选择" @change="changeGroup1(item, item.group1)">
                    <el-option
                        v-for="group in item.group1List"
                        :key="group.id"
                        :label="group.name"
                        :value="group.id">
                    </el-option>
                </el-select>
                <el-select v-model="item.group2" placeholder="请选择" @change="changeGroup2(item, item.group2)">
                    <el-option
                        v-for="group in item.group2List"
                        :key="group.id"
                        :label="group.name"
                        :value="group.id">
                    </el-option>
                </el-select>
                <el-select v-model="item.group3" placeholder="请选择" @change="changeGroup3(item, item.group3)">
                    <el-option
                        v-for="group in item.group3List"
                        :key="group.id"
                        :label="group.name"
                        :value="group">
                    </el-option>
                </el-select>
                <el-popover
                    placement="right"
                    width="800"
                    trigger="click">
                    <div>
                        <!-- <div>搜索</div> -->
                        <el-checkbox :indeterminate="item.fourthObj.isIndeterminate" v-model="item.fourthObj.checkAll" @change="(v)=>checkAllFourthLevel(v, item.fourthObj)">全选</el-checkbox>
                        <el-checkbox-group v-model="item.fourthObj.checkedFaults" @change="(v)=>checkSingleFourthLevel(v, item.fourthObj)">
                            <el-checkbox v-for="fourth in item.fourthObj.children" :label="fourth.faultCode" :key="fourth.faultCode" style="width:180px;margin:0;">{{fourth.faultName}}</el-checkbox>
                        </el-checkbox-group>
                    </div>
                    <el-select slot="reference" v-model="item.fourthObj.showCheckedName" disabled></el-select>
                </el-popover>
                <i class="el-icon-delete" @click="deleteCurLine(item.id)"></i>
            </div>
        </el-form-item>
    </el-form>
</template>

<script>
// 故障码类别-仅集团管理员有，即，本页面，仅存在集团角色的接口
import {
    api＿roleList, api＿userList, api＿timeNoticeMethod, api＿updateStrategyCompany, api＿detailInfoCompany, api＿queryPlatProtocol, api＿queryPlatFaultCode
} from '@messageManage/request/api'
import {Select, Option, FormItem, Form, Popover, Radio, RadioGroup, Checkbox, CheckboxGroup, Row, Col, Message, Button} from 'element-ui'
import mixinWidthHeight from '@comm/mixin/widthHeight'
export default {
    mixins: [mixinWidthHeight],
    props: {
        detail: {
            type: Object
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
                ruleType: 2, // 故障码类型为2
                msgTpl: [], // 通知方式多选框
                dateRuleId: '', // 时间方式单选
                eventRule: '', // 事件类别设置，只传2,3两级id值,格式：2.1:3.1,3.2,3.3;2.2:3.1,3.2
                roleIds: '',
                userIds: '',
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
            lineIndex: 1,
            list: [], // 故障码列表
            roleList: api＿roleList({ // 角色列表
                onlyLatest: true,
                later: true,
                res: {data: []}
            }),
            userList: api＿userList({ // 用户列表
                later: true,
                res: {data: []},
                isIndeterminate: true,
                checkAll: false,
                checkedUsers: [],
                showCheckedName: '' // 显示在select框的值
            }),
            timeNoticeMethod: api＿timeNoticeMethod({ // 时间，通知方式
                later: true,
                res: {data: []}
            }),
            updateStrategyCompany: api＿updateStrategyCompany({ // 集团管理员-保存
                later: true,
                sameTimeOnce: true,
                res: {body: []}
            }),
            detailInfoCompany: api＿detailInfoCompany({ // 集团管理员-详情
                later: true,
                res: {body: []}
            }),
            queryPlatProtocol: api＿queryPlatProtocol({ // 故障库
                later: true,
                res: {body: []}
            }),
            queryPlatFaultCode: api＿queryPlatFaultCode({ // 故障码
                later: true,
                res: {body: []}
            })
        }
    },
    created () {
    },
    mounted () {
        this.$bus.on('saveStrategyFaultcode', this.saveStrategy)
        this.$bus.on('openNewStrategyFaultCode', this.openModal)
    },
    methods: {
        async openModal () {
            this.resetForm()
            this.formData = {
                msgId: '',
                ruleType: 2,
                msgTpl: [],
                dateRuleId: '',
                eventRule: '',
                roleIds: '',
                userIds: '',
                id: ''
            }
            this.list = []
            await this.timeNoticeMethod.getData({appId: this.appId})
            this.roleList.getData()
            await this.queryPlatProtocol.getData({stcls: this.solarOrWind})
            if (this.detail) {
                this.detailInfoCompany.getData({id: this.detail.id}).then(async res => {
                    if (res.code === 200) {
                        let data = res.data
                        this.formData = {
                            msgId: data.msgId,
                            ruleType: data.ruleType,
                            msgTpl: data.msgTpl.split(',').map(Number),
                            dateRuleId: data.dateRuleItem.id,
                            roleIds: data.roleRuleItems.map(item => item.roleId), // 角色
                            id: data.id
                        }
                        // 人员
                        await this.userList.getData({roleIds: this.formData.roleIds.join(',')})
                        this.checkAllUser(true) // 默认全部选上
                        if (data.userRuleItems && (data.userRuleItems.length !== this.userList.res.data.length)) { // 若是部分选择
                            this.userList.checkedUsers = data.userRuleItems.map(v => v.userId)
                            this.userList.checkAll = false
                            this.userList.res.data.map(v => {
                                if (this.userList.checkedUsers.includes(v.userId)) this.userList.showCheckedName = '部分选择'
                            })
                        }
                        // 故障码规则
                        let thirdArr = data.eventRule.split(';')
                        let thirdLevIds = [] // 三级中所有的id
                        let thirdLevDefinedArr = [] // 三级中id，以及关联四级中选中id
                        thirdArr.map(v => {
                            if (!v) return
                            if (!v.includes(':')) {
                                thirdLevDefinedArr.push({thirdId: Number(v), fourthIds: ''})
                                return thirdLevIds.push(Number(v))
                            } else {
                                thirdLevDefinedArr.push({thirdId: Number(v.substring(0, v.indexOf(':'))), fourthIds: v.substring(v.indexOf(':') + 1, v.length)})
                                return thirdLevIds.push(Number(v.substring(0, v.indexOf(':'))))
                            }
                        })
                        let firstGroup = [...this.queryPlatProtocol.res.body]
                        for (let i = 0; i < data.eventRuleItems.length; i++) {
                            let firstLev = data.eventRuleItems[i]
                            let secondLev = data.eventRuleItems[i].children[0]
                            let thirdLev = data.eventRuleItems[i].children[0].children[0]
                            let group2List = []
                            let group3List = []
                            firstGroup.map(v => {
                                if (Number(v.id) === Number(firstLev.id)) group2List = v.children
                            })
                            group2List.map(v => {
                                if (Number(v.id) === Number(secondLev.id)) group3List = v.children
                            })
                            let item = {
                                id: this.lineIndex,
                                group1: firstLev.id.toString(),
                                group2: secondLev.id,
                                group3: thirdLev,
                                group1List: firstGroup,
                                group2List: group2List,
                                group3List: group3List,
                                fourthObj: {
                                    isIndeterminate: false,
                                    checkAll: true,
                                    checkedFaults: [],
                                    children: [],
                                    showCheckedName: '全部'
                                }
                            }
                            this.changeGroup3Async(item, item.group3, thirdLevDefinedArr)
                            this.lineIndex++
                        }
                    }
                })
            } else {
                this.formData.msgId = this.timeNoticeMethod.res.data.msgId
                this.userList.res.data = []
                this.userList.checkedUsers = []
                this.userList.showCheckedName = '全部'
                // 新增，默认角色全选上，角色对应所有人员也都选上
                // 角色
                let roleIdAll = this.roleList.res.data.map(v => v.roleId)
                this.formData.roleIds = roleIdAll
                // 人员
                await this.userList.getData({roleIds: roleIdAll.join(',')})
                this.checkAllUser(true)
            }
        },
        addLine () {
            let firstGroup = [...this.queryPlatProtocol.res.body]
            this.list.push({
                id: this.lineIndex,
                group1: '',
                group2: '',
                group3: '',
                group1List: firstGroup,
                group2List: [],
                group3List: [],
                fourthObj: {
                    isIndeterminate: true,
                    checkAll: false,
                    checkedFaults: [],
                    children: [],
                    showCheckedName: '全部'
                }
            })
            this.lineIndex++
        },
        deleteCurLine (id) {
            this.list.map((v, i) => {
                if (v.id === id) this.list.splice(i, 1)
            })
        },
        checkAllFourthLevel (val, fourthObj) { // 故障码-全选
            fourthObj.checkAll = val
            fourthObj.checkedFaults = val ? fourthObj.children.map(v => v.faultCode) : []
            fourthObj.isIndeterminate = false
            fourthObj.showCheckedName = '全部'
        },
        checkSingleFourthLevel (val, fourthObj) { // 故障码-单选
            let checkedCount = val.length
            fourthObj.checkAll = checkedCount === fourthObj.children.length
            fourthObj.isIndeterminate = checkedCount > 0 && checkedCount < fourthObj.children.length
            fourthObj.showCheckedName = '全部'
            if (!fourthObj.checkAll && checkedCount) fourthObj.showCheckedName = '部分选择'
        },
        changeGroup1 (item, id) {
            item.group2 = ''
            item.group3 = ''
            item.group2List = []
            item.group3List = []
            item.fourthObj = {
                isIndeterminate: false,
                checkAll: true,
                checkedFaults: [],
                children: [],
                showCheckedName: '全部'
            }
            item.group1List.map(v => {
                if (Number(v.id) === Number(id)) item.group2List = v.children
            })
        },
        changeGroup2 (item, id) {
            item.group3 = ''
            item.group3List = []
            item.fourthObj = {
                isIndeterminate: false,
                checkAll: true,
                checkedFaults: [],
                children: [],
                showCheckedName: '全部'
            }
            item.group2List.map(v => {
                if (Number(v.id) === Number(id)) item.group3List = v.children
            })
        },
        async changeGroup3Async (item, group, thirdLevDefinedArr) {
            await this.queryPlatFaultCode.getData({protocolId: group.id, faultDiagnosisType: group.faultDiagnosisType ? group.faultDiagnosisType : '2'}) // ????
            item.fourthObj.children = this.queryPlatFaultCode.res.body
            for (let j = 0; j < thirdLevDefinedArr.length; j++) {
                if (thirdLevDefinedArr[j].thirdId === item.group3.id) {
                    if (thirdLevDefinedArr[j].fourthIds) { // 部分选择
                        item.fourthObj.checkedFaults = thirdLevDefinedArr[j].fourthIds.split(',')
                        item.fourthObj.showCheckedName = '部分选择'
                        item.fourthObj.checkAll = false
                    } else { // 全选
                        item.fourthObj.checkedFaults = item.fourthObj.children.map(v => v.faultCode)
                    }
                }
            }
            this.list.push(item)
        },
        async changeGroup3 (item, group) {
            await this.queryPlatFaultCode.getData({protocolId: group.id, faultDiagnosisType: group.faultDiagnosisType ? group.faultDiagnosisType : '2'}) // ????
            item.fourthObj.children = this.queryPlatFaultCode.res.body
            item.fourthObj.checkedFaults = item.fourthObj.children.map(v => v.faultCode)
            item.fourthObj.showCheckedName = '全部'
            item.fourthObj.checkAll = true
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
            if (!this.userList.checkAll && checkedCount) this.userList.showCheckedName = '部分选择'
        },
        saveStrategy () { // 保存
            let str = ''
            for (let i = 0; i < this.list.length; i++) {
                let item = this.list[i]
                if (item.group3) { // 选了三级
                    str += item.group3.id
                    if (item.fourthObj.checkAll) { // 全选
                        str += ';'
                    } else {
                        if (item.fourthObj.checkedFaults.length) { // 选了一部分
                            str += ':'
                            item.fourthObj.checkedFaults.map((v, index) => {
                                if (v) str += v + (index + 1 === item.fourthObj.checkedFaults.length ? ';' : ',')
                            })
                        } else {
                            str += ';'
                        }
                    }
                }
            }
            this.formData.eventRule = str
            this.$refs.formData.validate((valid) => { // 校验
                if (!valid) return false
                let formData = {...this.formData}
                formData.msgTpl = this.formData.msgTpl.join(',')
                formData.roleIds = this.formData.roleIds.join(',')
                formData.userIds = this.userList.checkedUsers
                this.updateStrategyCompany.getData(formData).then(res => {
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
        this.$bus.off('saveStrategyFaultcode', this.saveStrategy)
        this.$bus.off('openNewStrategyFaultCode', this.openModal)
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
        ElCol: Col,
        ElButton: Button
    }
}
</script>

<style lang="scss">
.newEventLogFaultcode {
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
@import '@comm/assets/themes/scrollbar/s1.scss';
.newEventLogFaultcode {
    height: calc(100vh - 350px);
    overflow:auto;
    .el-icon-delete{
        cursor: pointer;
        color:red;
        font-size: 20px;
        margin-left: 8px;
    }
    .add-btn-con{
        position: relative;
        button{
            position: absolute;
            top: 45px;
            left: 106px;
        }
    }
    .faultcode-title{
        width:222px;
        text-align: center;
        margin-right: 4px;
        background: #e0e0e0;
    }
}
</style>
