<template>
    <div class="personal-center">
        <!-- 无邀请消息 -->
        <div v-if="!ifInviteNote">
            <span v-if="userName" @click="dropdown" class="real-name">{{realName}}</span>
            <i class="iconcomm commgerenzhongxin" style="font-size:23px;" @click="dropdown"></i>
        </div>
        <!-- 有邀请消息 -->
        <a v-if="ifInviteNote" class="invite-note twinkle" @click="inviteNoteTpl = true">
            <i class="iconfont commgerenzhongxin" style="font-size:23px;color: #f93e3e;"></i>
        </a>
        <ul class="dropdown-menu" v-if="dropdownShow && isComprehensiveEnergy">
            <li>
                <a @click="editPersonInfoTpl = true;dropdownShow = false;">
                    <i class="iconcomm commxuanzhong"></i> 个人信息
                </a>
            </li>
            <li>
                <a @click="editPasswordTpl = true;dropdownShow = false;">
                    <i class="iconcomm commxuanzhong"></i> 修改密码
                </a>
            </li>
            <li class="divider"></li>
            <li>
                <a @click="logOut();">
                    <i class="iconcomm commxuanzhong"></i> 退出系统
                </a>
            </li>
        </ul>
        <ul class="dropdown-menu" v-if="dropdownShow && !isComprehensiveEnergy">
            <li v-for="role in rolelist" v-bind:key="role.i" class="toggletick">
                 <a @click="changeRole(role.roleId)" >
                    <i class="iconcomm commxuanzhong" v-bind:class="{'active': currentRoleID==role.roleId}"></i>
                    {{role.roleDisplayName}}
                </a>
            </li>
            <li class="divider"></li>
            <li>
                <a @click="editStationManagementTpl = true;dropdownShow = false;">
                    <i class="iconcomm commxuanzhong"></i> 电站组管理
                </a>
            </li>
            <li>
                <a @click="editPersonInfoTpl = true;dropdownShow = false;">
                    <i class="iconcomm commxuanzhong"></i> 个人信息
                </a>
            </li>
            <li>
                <a @click="editPasswordTpl = true;dropdownShow = false;">
                    <i class="iconcomm commxuanzhong"></i> 修改密码
                </a>
            </li>
            <li class="divider"></li>
            <li>
                <a @click="logOut();">
                    <i class="iconcomm commxuanzhong"></i> 退出系统
                </a>
            </li>
        </ul>
        <!-- 个人信息 -->
        <div class="alertModal" @click="editPersonInfoTpl = false;" v-bind:style="{'height': editPersonInfoTpl ? '100vh' : 0}" style="height:0;">
            <person-info v-if="editPersonInfoTpl"></person-info>
        </div>
        <!-- 修改密码 -->
        <div class="alertModal" @click="editPasswordTpl = false;" v-bind:style="{'height': editPasswordTpl ? '100vh' : 0}" style="height:0;">
            <update-password v-if="editPasswordTpl"></update-password>
        </div>
        <!-- 电站组管理 -->
        <div class="alertModal" @click="editStationManagementTpl = false;" v-bind:style="{'height': editStationManagementTpl ? '100vh' : 0}" style="height:0;">
            <station-management v-if="editStationManagementTpl"></station-management>
        </div>
        <!-- 邀请信息弹框 -->
        <div class="alertModal" @click="inviteNoteTpl = false;" v-bind:style="{'height': inviteNoteTpl ? '100vh' : 0}" style="height:0;">
            <invite-note v-if="inviteNoteTpl"></invite-note>
        </div>
    </div>
</template>

<script>
import {api＿getLoginUser, api＿changeRoleNew, api＿logout, api＿getRoleListForPC, api＿getCompanyInviteCount} from '@comm/request/api'
import { independent } from '@comm/tools/env'
import personInfo from './personInfo'
import updatePassword from './updatePassword'
import stationManagement from './stationManagement'
import inviteNote from './inviteNote'
export default {
    name: 'personalCenter',
    props: {
        userName: {
            type: Boolean,
            default: false
        }
    },
    components: {
        personInfo,
        updatePassword,
        stationManagement,
        inviteNote
    },
    data () {
        return {
            isComprehensiveEnergy: '',
            dropdownShow: false,
            realName: '',
            rolelist: [],
            editPersonInfoTpl: false,
            editPasswordTpl: false,
            editStationManagementTpl: false,
            inviteNumInterval: null,
            ifInviteNote: false,
            inviteNoteTpl: false,
            getCompanyInviteCount: api＿getCompanyInviteCount({
                later: true,
                res: {
                    data: []
                }
            })
        }
    },
    methods: {
        getInvitesNum () {
            this.getCompanyInviteCount.getData()
        },
        dropUp () {
            this.dropdownShow = false
        },
        dropdown (event) {
            this.dropdownShow = !this.dropdownShow
            event.stopPropagation()
        },
        changeRole (id) {
            api＿changeRoleNew({data: {roleId: id}}).subscribe(res => {
                if (independent) {
                    this.$router.go(0)
                } else {
                    this.$router.push({name: 'outer_Monitoring'})
                }
            })
        },
        logOut () {
            api＿logout()
            this.$router.push({name: 'login'})
        }
    },
    created () {
        this.isComprehensiveEnergy = window.location.pathname.includes('comprehensiveEnergy')
        this.$bus.on('closePersonInfo', () => (this.editPersonInfoTpl = false)) // 关闭个人信息编辑框
        this.$bus.on('closeUpdatePassword', () => (this.editPasswordTpl = false)) // 关闭修改密码编辑框
        this.$bus.on('closeStationManagement', () => (this.editStationManagementTpl = false)) // 关闭电站分组
        this.$bus.on('closeInviteNote', () => (this.inviteNoteTpl = false)) // 关闭邀请消息弹框
        this.$bus.on('noInviteNote', () => {
            this.inviteNoteTpl = false
            this.ifInviteNote = false
        })
        api＿getRoleListForPC().subscribe(res => {
            this.rolelist = res.rolelist
            this.currentRoleID = res.currentRole // 当前用户的ID
        })
        api＿getLoginUser().subscribe(res => {
            this.realName = res.realName
        })
        this.getInvitesNum()
        this.getCompanyInviteCount.subscribe(res => {
            if (res.code === 1 && res.data > 0) {
                this.ifInviteNote = true
            } else {
                this.ifInviteNote = false
            }
        })
        this.inviteNumInterval = setInterval(() => {
            this.getInvitesNum()
        }, 60000)
    },
    mounted () {
        document.addEventListener('click', this.dropUp)
    },
    beforeDestroy () {
        document.removeEventListener('click', this.dropUp)
        if (this.inviteNumInterval) clearInterval(this.inviteNumInterval)
    }
}
</script>

<style lang="scss" scoped>
.personal-center {
    display: inline-block;
    cursor: pointer;
    position: relative;
    max-height: 100%;
    .twinkle{
        animation: twinkleAnitmation 1s linear infinite;
        -moz-animation: twinkleAnitmation 1s linear infinite;
        -webkit-animation: twinkleAnitmation 1s linear infinite;
        -o-animation: twinkleAnitmation 1s linear infinite;
    }
    @keyframes twinkleAnitmation {
        0% {
            opacity: 0;
        }
        50% {
            opacity: 0;
        }
        55% {
            opacity: 1;
        }
        100% {
            opacity: 1;
        }
    }
    @-moz-keyframes twinkleAnitmation {
        0% {
            opacity: 0;
        }
        50% {
            opacity: 0;
        }
        55% {
            opacity: 1;
        }
        100% {
            opacity: 1;
        }
    }
    @-webkit-keyframes twinkleAnitmation {
        0% {
            opacity: 0;
        }
        50% {
            opacity: 0;
        }
        55% {
            opacity: 1;
        }
        100% {
            opacity: 1;
        }
    }
    ul,
    li {
        padding: 0;
        margin: 0;
        list-style: none;
    }
    .real-name {
        display: inline-block !important;
        font-size: 18px;
        vertical-align: top;
        margin-top: -0.01rem;
        margin-right: 0.05rem;
    }
    .dropdown-menu {
        display: block;
        width: 200px;
        min-width: 160px;
        max-height: 350px;
        overflow: auto;
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 2px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        position: absolute;
        right: 0;
        left: auto;
        top: 110%;
        z-index: 99;
        padding: 5px 0;
        margin: 2px 0 0;
        font-size: 14px;
        text-align: left;
        list-style: none;
        background-color: #fff;
        color: #000;
        .divider {
            height: 1px;
            margin: 9px 0;
            overflow: hidden;
            background-color: #e5e5e5;
        }
        >li{
            >a {
                display: block;
                padding: 3px 20px;
                clear: both;
                font-weight: normal;
                line-height: 1.42857143;
                color: #333;
                white-space: nowrap;
            }
            .commxuanzhong {
                @include c(color, $text_c1);
                visibility: hidden;
                &.active {
                    visibility: visible;
                }
            }
        }
    }
    .alertModal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, .4);
        z-index: 100;
        overflow: auto;
        transition: height 0.2s ease 0s;
    }
}
</style>
