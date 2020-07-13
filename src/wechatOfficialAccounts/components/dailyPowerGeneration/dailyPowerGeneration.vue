<template>
    <div class="daily-power-generation">
        <div v-if="errorTip">{{errorTip}}</div>
        <div class="rolelist-con" v-if="showRoleCon && !errorTip">
            <div class="default-role" @click="roleCollapsed = !roleCollapsed">
                <i class="iconcomm commgerenzhongxin"></i>
                <span class="role-name">{{currentRoleName}}</span>
                <span class="role-arrow"><i class="iconfont" :class="{'icon-right': roleCollapsed, 'icon-bottom': !roleCollapsed}"></i></span>
            </div>
            <div v-if="!roleCollapsed" class="role-list">
                <div v-for="role in roleList" :key="role.roleId" @click="switchRole(role.roleId)">{{role.roleDisplayName}}</div>
                <!-- <div v-for="role in roleList" :key="role.roleId" @click="changeRoleForMobileNew.getData({roleId: role.roleId}); currentRoleName = role.roleDisplayName; currentRoleId = role.roleId">{{role.roleDisplayName}}</div> -->
            </div>
        </div>
        <div class="date-con" v-if="!errorTip">
            <el-date-picker
                v-model="dayTime"
                @change="getDataList"
                type="date"
                placeholder="选择日期">
            </el-date-picker>
        </div>
        <div class="company-list" v-if="!errorTip" :class="{'company-height2':!showRoleCon, 'company-height1':showRoleCon}">
            <div v-if="listTip">{{listTip}}</div>
            <div class="weui-loadmore" v-if="loading">
                <i class="weui-loading"></i>
                <span class="weui-loadmore__tips">正在加载</span>
            </div>
            <div class="company-item black" v-for="company in companyList" :key="company.companyid">
                <div class="company">
                    <div class="clearfix company-name">
                        <div class="pull-left">
                            <i class="iconfont icon-gongsi"></i>
                            {{company.company_name}}
                        </div>
                        <div class="pull-right arrow-con" @click="collapse(company)">
                            <i class="iconfont pull-right" :class="{'icon-right': !company.flag, 'icon-bottom': company.flag, 'green-icon': company.flag}"></i>
                        </div>
                    </div>
                    <div class="clearfix">
                        <div class="width3-1 pull-left">
                            <p class="font15 light-black">发电量</p>
                            <p><span class="font18">{{company.real_kwh_chk[0]}}</span><span class="font12 light-black">{{company.real_kwh_chk[1]}}</span></p>
                        </div>
                        <div class="width3-1 pull-left">
                            <p class="font15 light-black">辐射量</p>
                            <p><span class="font18">{{company.rad_chk[0]}}</span><span class="font12 light-black">{{company.rad_chk[1]}}</span></p>
                        </div>
                        <div class="width3-1 pull-left">
                            <p class="font15 light-black">发电小时</p>
                            <p><span class="font18">{{company.real_hours[0]}}</span><span class="font12 light-black">{{company.real_hours[1]}}</span></p>
                        </div>
                    </div>
                </div>
                <div class="station-list" v-if="company.flag">
                    <div class="station" v-for="station in company.stList" :key="station.stid">
                        <div class="station-name">
                            <i class="iconfont icon-dianzhan"></i>
                            {{station.st_name}}
                        </div>
                        <div class="clearfix">
                            <div class="width3-1 pull-left">
                                <p class="font15 light-black">发电量</p>
                                <p><span class="font18">{{station.real_kwh_chk[0]}}</span><span class="font12 light-black">{{station.real_kwh_chk[1]}}</span></p>
                            </div>
                            <div class="width3-1 pull-left">
                                <p class="font15 light-black">辐射量</p>
                                <p><span class="font18">{{station.rad_chk[0]}}</span><span class="font12 light-black">{{station.rad_chk[1]}}</span></p>
                            </div>
                            <div class="width3-1 pull-left">
                                <p class="font15 light-black">发电小时</p>
                                <p><span class="font18">{{station.real_hours[0]}}</span><span class="font12 light-black">{{station.real_hours[1]}}</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {api＿getOpenId, api＿doWxLogin, api＿getComAndStDayInfo, api＿getRoleList, api＿changeRoleForMobileNew} from '@/request/api'
import {DatePicker} from 'element-ui'
export default {
    data () {
        return {
            code: '', // 通过微信获取的code
            openId: '', // openID
            dayTime: new Date(new Date().getTime() - 86400000), // 时间，默认前一天
            showRoleCon: false, // 默认不显示角色信息
            roleList: [], // 角色列表
            roleCollapsed: true, // 角色默认折叠
            currentRoleId: '', // 当前角色ID
            currentRoleName: '', // 当前角色名称
            errorTip: '', // 提示信息
            listTip: '',
            companyList: [], // 集团列表
            loading: false, // 加载中loading
            getOpenId: api＿getOpenId({ // 获取Openid
                later: true,
                onlyLatest: true
            }),
            doWxLogin: api＿doWxLogin({ // 微信公众号信息存入
                later: true,
                onlyLatest: true
            }),
            getComAndStDayInfo: api＿getComAndStDayInfo({ // 集团电站发电情况
                later: true,
                onlyLatest: true
            }),
            getRoleList: api＿getRoleList({ // 获取角色列表
                later: true,
                onlyLatest: true
            }),
            changeRoleForMobileNew: api＿changeRoleForMobileNew({ // 切换角色
                later: true,
                sameTimeOnce: true
            })
        }
    },
    methods: {
        // 微信动态code
        getWxCode () {
            // search中取code
            let searchArr = window.location.search.substring(1).split('&')
            searchArr.map(v => {
                let cur = v.split('=')
                if (cur[0] === 'code') {
                    this.code = cur[1]
                }
            })
            // hash中取参数date、roleid,仅在消息模板跳转时，会有此参数
            if (window.location.hash.split('?').length > 1) {
                let hashArr = window.location.hash.split('?')[1].split('&')
                hashArr.map(v => {
                    let cur = v.split('=')
                    if (cur[0] === 'date') {
                        this.dayTime = new Date(Number(cur[1]))
                    }
                    if (cur[0] === 'roleId') {
                        this.currentRoleId = cur[1]
                    }
                })
            }
        },
        // openId
        getOpenIdData () {
            this.getOpenId.getData({
                code: this.code
            }).then(res => {
                this.openId = res.openid
                this.saveWxLoginInfo()
            })
        },
        // 模拟登陆-存入公众号信息
        saveWxLoginInfo () {
            this.doWxLogin.getData({openId: this.openId}).then(async (res) => {
                if (res.status === 12) {
                    this.errorTip = '账号未绑定，请通过【账户绑定】进行绑定'
                } else if (res.status === 5) {
                    this.errorTip = '新能云用户被删除'
                } else if (res.status === 4) {
                    this.errorTip = '新能云用户被锁'
                } else if (res.status === 2) {
                    this.errorTip = '接口error'
                } else if (res.status === 1) {
                    await this.roleListData()
                    if (this.currentRoleId) {
                        this.switchRole(this.currentRoleId)
                    } else {
                        this.getDataList()
                    }
                }
            })
        },
        // 切换角色
        switchRole (roleId) {
            this.changeRoleForMobileNew.getData({roleId}).then(res => {
                this.roleCollapsed = true
                if (res.result) {
                    this.currentRoleId = roleId
                    this.roleList.map(v => {
                        if (Number(v.roleId) === Number(this.currentRoleId)) this.currentRoleName = v.roleDisplayName
                    })
                    this.getDataList()
                }
            })
        },
        // 角色列表
        roleListData () {
            this.getRoleList.getData().then(res => {
                if (res.rolelist.length > 1) {
                    this.roleList = res.rolelist
                    this.showRoleCon = true
                    // 有传roleid进来
                    res.rolelist.map(v => {
                        if (v.roleId === this.currentRoleId) this.currentRoleName = v.roleDisplayName
                    })
                    // 无roleid,取默认值
                    if (!this.currentRoleName) {
                        res.rolelist.map(v => {
                            if (v.roleId === res.currentRole) this.currentRoleName = v.roleDisplayName
                        })
                    }
                }
            })
        },
        // 集团电站发电量情况列表
        getDataList () {
            this.listTip = ''
            this.loading = true
            this.getComAndStDayInfo.getData({date: this.dayTime.Format('yyyy-MM-dd')}).then(res => {
                this.loading = false
                if ((res.code === 0 || res.code === 200) && res.data) {
                    if (res.data.status === 0) {
                        this.companyList = res.data.data
                        if (this.companyList.length === 0) {
                            this.listTip = '该日无数据'
                            return false
                        }
                        this.companyList.map(v => (v['flag'] = false))
                    } else if (res.data.status === 1) {
                        this.listTip = '该角色下没有电站'
                    } else if (res.data.status === 403) {
                        // session过期,重新获取
                        this.getWxCode()
                        this.getOpenIdData()
                    }
                } else {
                    this.companyList = []
                }
            })
        },
        collapse (item) {
            item['flag'] = !item['flag']
            this.companyList = [...this.companyList]
        }
    },
    created () {
        this.getWxCode()
        this.getOpenIdData()
    },
    components: {
        // Alert
        ElDatePicker: DatePicker
    }
}
</script>

<style lang="scss" scoped>
.daily-power-generation {
    font-size:0.16rem;
    .font18{
        font-size:0.18rem;
    }
    .font15{
        font-size:0.15rem;
    }
    .font12{
        font-size:0.12rem;
    }
    .rolelist-con{
        position:relative;
        .default-role{
            border: 1px solid #3BC5AD;
            border-radius: 4px;
            text-align: center;
            .role-arrow{
                display: inline-block;
                line-height: 30px;
                text-align: center;
            }
            .role-name{
                margin: 0 20px;
            }
        }
        .role-list{
            position: absolute;
            z-index: 2;
            background: #f8f8f8;
            width: 100%;
            border: 1px solid #dcdcdc;
            text-align: center;
            padding: 0.1rem;
            line-height: 0.5rem;
        }
    }
    .date-con{
        margin-bottom:10px;
        margin-top: 10px;
    }
    .width3-1{
        width:33.33%;
    }
    .black{
        color:#222222;
    }
    .light-black{
        color:#8A8A8A;
    }
    .green-icon{
        color:#3BC5AD;
    }
    .company-height1{
        height: calc(100vh - 110px);
    }
    .company-height2{
        height: calc(100vh - 80px);
    }
    .company-list{
        overflow:auto;
        -webkit-overflow-scrolling: touch;
        .company-item{
            .company{
                margin-bottom:0.15rem;
                padding: 0 10px;
            }
            .company-name{
                margin:0.15rem 0 0.1rem;
            }
            .icon-gongsi{
                color: #3BC5AD;
            }
            .arrow-con{
                width: 50px;
                height: 30px;
                padding-right: 15px;
            }
        }
        .station{
            background: #f8f8f8;
            margin-bottom: 0.05rem;
            border-radius: 4px;
            padding: 0 10px 5px;
            .station-name{
                padding: 0.1rem 0;
            }
        }
    }
}
</style>
