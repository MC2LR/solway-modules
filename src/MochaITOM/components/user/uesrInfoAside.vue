<template>
    <div class="user-info-aside">
        <div v-if="pageThemes.length > 1 && isDev" class="switch-theme">
            <i v-for="item in pageThemes" :key="item" @click="switchTheme(item)" :class="item + ((pageTheme === item) ? ' active' : '')"></i>
        </div>
        <el-popover
            placement="right"
            width="200"
            v-model="userInfo"
            @show="$bus.emit('asideDisply', true)"
            @hide="$bus.emit('asideDisply', false)"
            trigger="click">
            <user-info-list></user-info-list>
            <div slot="reference">
                <div v-if="!ifInviteNote" class="avatar">{{(real_name || '').substr(0, 1).toUpperCase()}}</div>
                <!-- <div class="user-name" :style="{color: fontColor}">
                    <span v-show="!isCollapse">{{real_name}}</span>
                    <i v-show="!isCollapse" class="iconfont icon-you"></i>
                </div> -->
            </div>
        </el-popover>
        <div v-if="ifInviteNote" class="avatar twinkle" @click="$bus.emit('inviteNoteModalEmit');showInviteModel = true;">{{(real_name || '').substr(0, 1).toUpperCase()}}</div>
        <div class="user-message">
            <el-badge :value="0">
                <i class="iconfont icon-xiaoxi" :style="{color: fontColor}"></i>
            </el-badge>
        </div>
        <invite-note-modal v-if="showInviteModel"></invite-note-modal>
    </div>
</template>

<script>
import UserInfoList from './userInfoList'
import InviteNoteModal from './inviteNoteModal'
import {
    api＿getNoticeUnreadCount,
    api＿getCompanyInviteCount
} from '@newEnergyCloud/request/api'
export default {
    components: {
        UserInfoList,
        InviteNoteModal
    },
    props: {
        fontColor: {
            type: String,
            default: '#333'
        }
    },
    data () {
        return {
            isDev: process.env.NODE_ENV === 'development',
            userInfo: false,
            timer: null,
            ifInviteNote: false,
            showInviteModel: false,
            inviteNumInterval: null,
            getNoticeUnreadCount: api＿getNoticeUnreadCount({
                disabled: process.env.NODE_ENV === 'development'
            }),
            getCompanyInviteCount: api＿getCompanyInviteCount({
                disabled: process.env.NODE_ENV === 'development',
                later: true,
                res: {
                    data: []
                }
            })
        }
    },
    created () {
        this.$bus.on('userInfoEmit', (v) => { this.userInfo = false })
        this.$bus.on('closeInviteNote', () => (this.showInviteModel = false)) // 关闭邀请消息弹框
        this.timer = setInterval(() => this.getNoticeUnreadCount.getData(), 1000 * 60)
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
    computed: {
        pageTheme () {
            if (this.$route.meta?.pageTheme?.some(v => v === this.$store.getters.global_theme)) return this.$store.getters.global_theme
            return this.$route.meta?.pageTheme?.[0] || this.$store.getters.global_theme
        },
        pageThemes () {
            return this.$route.meta?.pageTheme || []
        },
        real_name () {
            return this.$store.getters.real_name
        },
        isCollapse () {
            return this.$store.state.asideMenu.isCollapse
        }
    },
    methods: {
        getInvitesNum () {
            this.getCompanyInviteCount.getData()
        },
        switchTheme (val) {
            this.$store.dispatch('user/switchTheme', val)
        }
    },
    beforeDestroy () {
        this.timer && clearInterval(this.timer)
        this.inviteNumInterval && clearInterval(this.inviteNumInterval)
    }
}
</script>

<style lang="scss" scoped>
.user-info-aside {
    text-align: center;
    padding-top: 20px;
    position: relative;

    .switch-theme {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 20px;
        background-color: #999;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        padding: 5px 0;

        &+span {
            position: relative;
            top: 5px;
        }

        i {
            height: 100%;
            // flex: 1;
            cursor: pointer;
            width: 25%;

            &.active {
                border: 1px solid;
                @include c(border-color, $text_c1);
            }

            &.darkBlue {
                background-color: blue;
            }

            &.light {
                background-color: #fff;
            }

            &.dark {
                background-color: #000;
            }
        }
    }

    .avatar {
        display: inline-block;
        width:31px;
        height:31px;
        background:rgba(86,118,232,1);
        border-radius:50%;
        font-size:16px;
        line-height: 31px;
        color: #fff;
        cursor: pointer;
    }
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

    .user-name {
        width: 100%;
        margin-top: 15px;
        font-size: 16px;
        height: 16px;
        cursor: pointer;
        padding: 0 1em;
        line-height: 16px;
        position: relative;

        &:hover {
            .user-info-list {
                display: block;
            }
        }

        i.iconfont.icon-you {
            position: absolute;
            right: 1em;
            top: 0;
            opacity: 0.5;
            font-size: 12px;
        }

        .user-info-list {
            position: absolute;
            left: 100%;
            top: -1em;
            z-index: 3;
            display: none;
        }
    }

    .user-message {
        margin-top: 13px;

        i {
            opacity: 0.5;
            font-size: 25px;
            cursor: pointer;
        }
    }
    .alertModal {
        position: fixed;
        height:100vh;
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
