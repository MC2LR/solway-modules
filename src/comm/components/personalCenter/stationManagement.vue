<template>
    <div class="station-management" @click="$event.stopPropagation();">
        <i class="iconfont iconguanbi" @click="cancel()"></i>
        <div class="container-area">
            <!-- 分组列表 -->
            <div v-if="getGroupList.flagGrouplist">
                <!-- 暂无分组 -->
                <div class="no-group-area" v-if="getGroupList.res.data.length === 0">
                    <div class="circle">
                        <img src="./images/non-group.png" style="margin: 28px 0 15px;">
                        <p>暂无分组</p>
                    </div>
                    <a class="add-btn" @click="addGroupModule.flagcreateGroup = true;getGroupList.flagGrouplist = false">添加分组</a>
                </div>
                <!-- 有分组，显示分组列表 -->
                <div v-if="getGroupList.res.data.length > 0">
                    <div class="header-con">
                        <div class="name">电站组</div>
                    </div>
                    <div class="clearfix nav-con">
                        <div class="pull-left check-box">
                            <input type='checkbox' v-model='groupCheckAll' v-on:click='checkedAllGroup'>
                            <span>全选</span>
                        </div>
                        <div class="pull-left">
                            <a class="delete-all" @click="deleteGroups()">删除</a>
                        </div>
                        <div class="pull-left">
                            <span class="add-group" @click="addGroupModule.flagcreateGroup = true;getGroupList.flagGrouplist = false;">
                                <img src="./images/add-group.png">
                            </span>
                            <span>添加组</span>
                        </div>
                    </div>
                    <ul class="group-list">
                        <li class="clearfix" v-for="item in getGroupList.res.data" v-bind:key="item.id">
                            <div class="pull-left" style="width:3%;">
                                <input type='checkbox' name='groupCheckbox' v-model='groupCheckSingle' :value='item.id'>
                            </div>
                            <div class="pull-right clearfix" style="width:97%;" @click="showStationList(item.id,item.groupName)">
                                <div class="pull-left">
                                    <span class="station-name">{{item.groupName}}</span>
                                </div>
                                <div class="pull-right">
                                    <span class="station-num">{{item.powerStation.length}}</span>
                                    <span>＞</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- 创建分组 -->
            <div class="creat-group" v-if="addGroupModule.flagcreateGroup">
                <h2>创建分组</h2>
                <div class="input-con flex-box">
                    <label>分组名称：</label>
                    <input placeholder="请输入新建组名称，最多6个字" v-model="addGroupModule.groupName" class="flex">
                </div>
                <div class="button-con clearfix">
                    <a @click="saveGroup()" class="btn-save btn pull-left">保存</a>
                    <a @click="getGroupList.flagGrouplist = true;addGroupModule.flagcreateGroup = false;" class="btn-cancel btn pull-right">取消</a>
                </div>
            </div>
            <!-- 显示某个电站组 -->
            <div class="every-group" v-if="everyGroup.flagEveryGroup">
                <div class="header-con">
                    <div class="go-back" @click="gobackGroupList()">
                        <span>＜</span>
                    </div>
                    <div class="name">{{everyGroup.groupName}}</div>
                </div>
                <div class="clearfix nav-con">
                    <div class="pull-left check-box">
                        <input type="checkbox" v-model='everyGroupCheckAll'  v-on:click='checkedEveryGroup'>
                        <span>全选</span>
                    </div>
                    <div class="pull-left">
                        <a class="delete-all" @click="deleteStations()">删除</a>
                    </div>
                    <div class="pull-left">
                        <span class="add-group" @click="showAddStation()">
                            <img src="./images/add-group.png">
                        </span>
                        <span>添加电站</span>
                    </div>
                </div>
                <ul class="station-list">
                    <li class="clearfix" v-for="item in everyGroup.res.data" v-bind:key="item.id">
                        <div class="pull-left">
                            <input type="checkbox" name="everyGroupCheckbox" v-model='everyGroupCheckSingle' :value='item.powerstationid'>
                            <span class="station-name">{{item.stationName}}</span>
                        </div>
                    </li>
                </ul>
            </div>
             <!-- 添加电站 -->
            <div class="add-station" v-if="unAddedStations.flagStation">
                <div class="header-con">
                    <div class="go-back" @click="gobackEveryGroup()">
                        <span>＜</span>
                    </div>
                    <div class="name">{{everyGroup.groupName}}-添加电站</div>
                </div>
                <div v-if="unAddedStations.res.data.length=='0'" style="width: 180px;margin: 10px auto;">
                    <div class="circle">
                        <img src="./images/non-group.png" style="margin: 28px 0 15px;">
                        <p>暂无电站</p>
                    </div>
                </div>
                <div class="clearfix nav-con" v-if="unAddedStations.res.data.length > 0">
                    <div class="pull-left check-box">
                        <input type="checkbox" v-model='addStationSelectAll'  @click='checkedStations'>
                        <span>全选</span>
                    </div>
                    <div class="pull-right">
                        <a class="saveStationBtn" @click="saveStations()">添加</a>
                    </div>
                </div>
                <ul class="station-list">
                    <li v-for="item in unAddedStations.res.data" v-bind:key="item.id">
                        <div>
                            <input type="checkbox" name="stationSingleCheckbox" v-model='addStationSelectSingle' :value='item.id'>
                            <span class="station-name">{{item.stationName}}</span>
                        </div>
                    </li>
                </ul>
            </div>
            <!-- 验证错误提示 -->
            <div class="validate-error" v-if="errorTip">
                <alert
                    v-bind:title=errorTip
                    type="error">
                </alert>
            </div>
        </div>
    </div>
</template>

<script>
import {api＿listGroup, api＿updateGroup, api＿deleteGroup, api＿listPStations, api＿unGroupBPS, api＿updateGroupRel, api＿deleteGroupRel} from '@comm/request/api'
import { Message, Alert, MessageBox } from 'element-ui'
export default {
    name: 'personalInfo',
    data () {
        return {
            groupCheckAll: false, // 分组全选
            groupCheckSingle: [], // 分组单选
            getGroupList: api＿listGroup({
                res: {
                    data: []
                },
                flagGrouplist: true // 是否显示分组列表
            }),
            addGroupModule: {
                flagcreateGroup: false,
                groupName: ''
            },
            everyGroup: api＿listPStations({
                res: {
                    data: []
                },
                groupName: '', // 某分组的名称
                flagEveryGroup: false // 是否显示某个组
            }),
            everyGroupCheckAll: false, // 分组下的电站 全选
            everyGroupCheckSingle: [], // 分组下的电站 单选
            unAddedStations: api＿unGroupBPS({
                later: true,
                res: {
                    data: []
                },
                flagStation: false // 是否显示电站列表
            }),
            addStationSelectAll: false,
            addStationSelectSingle: [],
            errorTip: ''
        }
    },
    components: {
        Alert
    },
    methods: {
        // 添加分组
        saveGroup () {
            let groupName = this.addGroupModule.groupName
            if (!groupName) {
                this.errorTip = '分组名称不能为空'
                return
            }
            api＿updateGroup({data: {groupName}}).subscribe(res => {
                this.errorTip = ''
                if (res.key === '4' || res.key === '6') {
                    Message({
                        message: '添加成功！',
                        type: 'success'
                    })
                    this.getGroupList.flagGrouplist = true
                    this.addGroupModule.flagcreateGroup = false
                    this.getGroupList.getData()
                } else {
                    Message({
                        message: res.msg ? res.msg : '添加失败',
                        type: 'error'
                    })
                }
            })
        },
        // 分组全选复选
        checkedAllGroup () {
            let _this = this
            if (this.groupCheckAll) {
                _this.groupCheckSingle = []
            } else {
                _this.groupCheckSingle = []
                _this.getGroupList.res.data.forEach(function (item) {
                    _this.groupCheckSingle.push(item.id)
                })
            }
        },
        // 删除分组
        deleteGroups () {
            let checkbox = document.getElementsByName('groupCheckbox')
            let checkedIds = []
            for (let i in checkbox) {
                if (checkbox[i].checked) checkedIds.push(checkbox[i].value)
            }
            if (checkedIds.length === 0) {
                MessageBox('', '请至少选择一个组', {
                    confirmButtonText: '确定',
                    callback: action => {}
                })
                return false
            } else {
                api＿deleteGroup({data: {id: checkedIds.join(',')}}).subscribe(msg => {
                    if (msg.key === '0') {
                        Message({message: '网络错误!', type: 'error'})
                    } else if (msg.key === '1') {
                        Message({message: '没有当前角色!', type: 'error'})
                    } else if (msg.key === '2') {
                        Message({message: '此分组不能为空!', type: 'error'})
                    } else if (msg.key === '3') {
                        Message({message: '删除失败!', type: 'error'})
                    } else if (msg.key === '4') {
                        Message({message: '删除成功,重新登录后生效！', type: 'success'})
                        this.getGroupList.getData()
                    }
                })
            }
        },
        // 显示当前电站组内的电站列表
        showStationList (groupId, groupName) {
            this.groupId = groupId
            this.getGroupList.flagGrouplist = false
            this.everyGroup.flagEveryGroup = true
            this.everyGroup.groupName = groupName
            this.everyGroup.getData({groupId})
        },
        // 某个分组 全选复选
        checkedEveryGroup () {
            let _this = this
            if (this.everyGroupCheckAll) {
                _this.everyGroupCheckSingle = []
            } else {
                _this.everyGroupCheckSingle = []
                _this.everyGroup.res.data.forEach(function (item) {
                    _this.everyGroupCheckSingle.push(item.powerstationid)
                })
            }
        },
        // 删除某个分组下，所选的电站
        deleteStations () {
            let checkbox = document.getElementsByName('everyGroupCheckbox')
            let checkedIds = []
            for (let i in checkbox) {
                if (checkbox[i].checked) checkedIds.push(checkbox[i].value)
            }
            if (checkedIds.length === 0) {
                MessageBox('', '请至少选择一个电站', {
                    confirmButtonText: '确定',
                    callback: action => {}
                })
                return false
            } else {
                api＿deleteGroupRel({data: {groupId: this.groupId, pStatIds: checkedIds.join(',')}}).subscribe(msg => {
                    if (msg.key === '0') {
                        Message({message: '网络错误!', type: 'error'})
                    } else if (msg.key === '1') {
                        Message({message: '不存在该组!', type: 'error'})
                    } else if (msg.key === '2') {
                        Message({message: '删除失败!', type: 'error'})
                    } if (msg.key === '3') {
                        Message({message: '删除成功,重新登录后生效！', type: 'success'})
                        this.everyGroup.getData({groupId: this.groupId})
                    }
                })
            }
        },
        gobackGroupList () {
            this.getGroupList.flagGrouplist = true
            this.everyGroup.flagEveryGroup = false
            this.getGroupList.getData()
        },
        // 显示添加电站
        showAddStation () {
            this.unAddedStations.flagStation = true
            this.everyGroup.flagEveryGroup = false
            this.unAddedStations.getData()
        },
        // 添加电站 全选复选
        checkedStations () {
            let _this = this
            _this.addStationSelectSingle = []
            if (!this.addStationSelectAll) {
                _this.addStationSelectSingle = []
                _this.unAddedStations.res.data.forEach(function (item) {
                    _this.addStationSelectSingle.push(item.id)
                })
            }
        },
        // 保存电站到分组中
        saveStations () {
            let checkbox = document.getElementsByName('stationSingleCheckbox')
            let checkedIds = []
            for (let i in checkbox) {
                if (checkbox[i].checked) checkedIds.push(checkbox[i].value)
            }
            if (checkedIds.length === 0) {
                MessageBox('', '请至少选择一个电站', {
                    confirmButtonText: '确定',
                    callback: action => {}
                })
                return false
            } else {
                api＿updateGroupRel({data: {pStatIds: checkedIds.join(','), groupId: this.groupId}}).subscribe(msg => {
                    if (msg.key === '0') {
                        Message({message: '网络错误!', type: 'error'})
                    } else if (msg.key === '1') {
                        Message({message: '不存在该组!', type: 'error'})
                    } else if (msg.key === '2') {
                        Message({message: '用户当前无电站权限!', type: 'error'})
                    } else if (msg.key === '3') {
                        Message({message: '新增失败!', type: 'error'})
                    } else if (msg.key === '4') {
                        Message({message: '添加成功,重新登录后生效！', type: 'success'})
                        this.gobackEveryGroup()
                    }
                })
            }
        },
        // 返回到某个分组
        gobackEveryGroup () {
            this.unAddedStations.flagStation = false
            this.everyGroup.flagEveryGroup = true
            this.everyGroup.getData({groupId: this.groupId})
        },
        cancel () {
            this.$bus.$emit('closeStationManagement')
        }
    },
    watch: {
        // 分组列表 -- 选择
        'groupCheckSingle': {
            handler: function (val, oldVal) {
                if (this.groupCheckSingle.length === this.getGroupList.res.data.length) {
                    this.groupCheckAll = true
                } else {
                    this.groupCheckAll = false
                }
            },
            deep: true
        },
        // 单个分组 -- 选择
        'everyGroupCheckSingle': {
            handler: function (val, oldVal) {
                if (this.everyGroupCheckSingle.length === this.everyGroup.res.data.length) {
                    this.everyGroupCheckAll = true
                } else {
                    this.everyGroupCheckAll = false
                }
            },
            deep: true
        },
        // 电站列表 -- 选择
        'addStationSelectSingle': {
            handler: function (val, oldVal) {
                if (this.addStationSelectSingle.length === this.unAddedStations.res.data.length) {
                    this.addStationSelectAll = true
                } else {
                    this.addStationSelectAll = false
                }
            },
            deep: true
        }
    },
    created () {
        // API.getLoginUser().subscribe(res => {
        //     this.formData = res
        // })
    }
}
</script>

<style lang="scss" scoped>
.station-management{
    height:300px;
    width:768px;
    background: white;
    border-radius: 10px;
    margin: 0 auto;
    position: relative;
    padding:1px 0px;
    color:rgba(0, 0, 0, 0.7);
    margin-top: calc(50vh - 150px);
    font-size:12px;
    h2{
        font-size: 25px;
        color:black;
    }
    .iconguanbi{
        position:absolute;
        right:-40px;
        top:0px;
        color:white;
        font-size:28px;
    }
    .header-con {
        height: 50px;
        position: relative;
        .name {
            width: 100%;
            text-align: center;
            line-height: 50px;
            font-size: 24px;
        }
        .go-back {
            width: 50px;
            height: 50px;
            position: absolute;
            text-align: center;
            cursor: pointer;
            >span {
                width: 20px;
                height: 20px;
                display: inline-block;
                border: 1px solid black;
                border-radius: 50%;
                margin-top: 12px;
                line-height: 20px;
                text-align: center;
            }
        }
    }
    .circle {
        width: 180px;
        height: 180px;
        text-align: center;
        border-radius: 50%;
        background: #f5f5f5;
        margin: 15px auto 20px;
        >p {
            font-size: 16px;
            color: #bdbdbd;
            line-height: 0;
        }
    }
    .nav-con {
        margin: 0 60px;
        font-size: 14px;
        line-height: 0;
        .delete-all {
            display: block;
            padding: 0 14px;
            margin: 0 45px 0 20px;
            border: 1px solid black;
            line-height: 1.5em;
            color: black;
        }
        .add-group {
            display: inline-block;
            vertical-align: text-bottom;
            margin-right: 6px;
            cursor: pointer;
        }
    }
    .group-list {
        margin: 25px 60px 45px 60px;
        overflow: auto;
        height: 160px;
        >li {
            border-bottom: 1px solid #d4d4d4;
            height: 45px;
            line-height: 45px;
            cursor: pointer;
        }
        .station-name {
            font-size: 24px;
            padding-left: 5px;
            display: block;
        }
        .station-num {
            margin-right: 10px;
        }
    }
    .no-group-area{
        .add-btn {
            border-radius: 22px;
            background: #58c7b7;
            color: white;
            font-size: 18px;
            display: block;
            width: 175px;
            line-height: 42px;
            margin: 20px auto;
            text-align: center;
        }
    }
    .creat-group{
        padding: 35px 48px;
        >.button-con {
            margin: 0 22%;
        }
        .input-con {
            margin: 40px 30px 45px;
            >label {
                width: 80px;
                height: 38px;
                line-height: 40px;
                display: block;
            }
            >input {
                border: 1px solid #cfdadc;
                width: 320px;
                line-height: 40px;
                font-size: 15px;
                text-indent: 1em;
                display: block;
            }
        }
    }
    .every-group{
        .station-list {
            margin: 25px 60px 45px 60px;
            overflow: auto;
            height: 150px;
            li {
                border-bottom: 1px solid #d4d4d4;
                line-height: 45px;
                font-size: 16px;
            }
        }
    }
    .add-station{
        .station-list {
            margin: 25px 60px 45px 60px;
            overflow: auto;
            height: 150px;
            li {
                border-bottom: 1px solid #d4d4d4;
                line-height: 45px;
                font-size: 16px;
            }
        }
        .saveStationBtn {
            display: inline-block;
            border-radius: 5px;
            width: 70px;
            line-height: 25px;
            text-align: center;
            background: #02b19a;
            color: white;
        }
    }
    .btn{
        display: inline-block;
        width:90px;
        border-radius: 2px;
        line-height: 32px;
        cursor: pointer;
        text-align: center;
        &.btn-save{
            color: #fff;
            background-color: #1caf9a;
            border:1px solid #1caf9a;
            margin-right: 5px;
        }
        &.btn-cancel{
            color: #58666e;
            background-color: #fff;
            border: 1px solid #dee5e7;
        }
    }
    .validate-error{
        margin: 5px 80px 5px 160px;
    }
}
</style>
