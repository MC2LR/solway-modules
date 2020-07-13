<template>
    <div class="user-info-list" @click.stop="">
        <ul class="dropdown-menu-list">
            <li v-for="role in rolelist" v-bind:key="role.i">
                 <a @click="changeRole(role.roleId)" :title="role.roleName">
                    <i class="iconcomm commxuanzhong" v-bind:class="{'active': currentRoleID==role.roleId}"></i>
                    {{role.roleName}}
                </a>
            </li>
            <li class="divider"></li>
            <li>
                <a @click="showAlertModal('editPersonInfoTpl')">
                    <i class="iconcomm commxuanzhong"></i> 个人信息
                </a>
            </li>
            <li>
                <a @click="showAlertModal('editPasswordTpl')">
                    <i class="iconcomm commxuanzhong"></i> 修改密码
                </a>
            </li>
            <li class="divider"></li>
            <li>
                <a @click="$store.dispatch('user/resetStore')">
                    <i class="iconcomm commxuanzhong"></i> 清除记录
                </a>
            </li>
            <li>
                <a @click="logOut();">
                    <i class="iconcomm commxuanzhong"></i> 退出系统
                </a>
            </li>
        </ul>
         <!-- 个人信息 -->
        <div v-if="editPersonInfoTpl" class="alertModal" @click="editPersonInfoTpl = false;$bus.emit('userInfoEmit', false);$bus.emit('asideDisply', false)">
            <person-info></person-info>
        </div>
        <!-- 修改密码 -->
        <div v-if="editPasswordTpl" class="alertModal" @click="editPasswordTpl = false;$bus.emit('userInfoEmit', false);$bus.emit('asideDisply', false)">
            <update-password ></update-password>
        </div>
    </div>
</template>

<script>
import {api＿logout} from '@comm/request/api'
// import { independent } from '@comm/tools/env'
import {Button, Dialog} from 'element-ui'
export default {
    data () {
        return {
            bbb: false,
            editPersonInfoTpl: false,
            editPasswordTpl: false
        }
    },
    methods: {
        logOut () {
            api＿logout()
            this.$router.push({name: 'login'})
        },
        showAlertModal (modalName) {
            this[modalName] = true
        },
        changeRole (id) {
            this.$store.dispatch('user/changeRole', id)
        }
    },
    created () {
        this.$bus.on('closePersonInfo', () => {
            this.editPersonInfoTpl = false
            this.$bus.emit('userInfoEmit', false)
            this.$bus.emit('asideDisply', false)
        })
        this.$bus.on('closeUpdatePassword', () => {
            this.editPasswordTpl = false
            this.$bus.emit('userInfoEmit', false)
            this.$bus.emit('asideDisply', false)
        })
    },
    computed: {
        currentRoleID () {
            return this.$store.getters.current_role
        },
        rolelist () {
            return this.$store.state.user.rolelist
        }
    },
    components: {
        ElButton: Button,
        ElDialog: Dialog,
        personInfo: () => import('./personInfo'),
        updatePassword: () => import('./updatePassword')
    }
}
</script>

<style lang="scss" scoped>
.user-info-list {
    background-color: #fff;
    ul,
    li {
        padding: 0;
        margin: 0;
        list-style: none;
    }
    .dropdown-menu-list {
        cursor: pointer;
        .divider {
            height: 1px;
            margin: 9px 0;
            overflow: hidden;
            background-color: #e5e5e5;
        }
        >li{
            >a {
                display: block;
                padding: 4px 20px;
                clear: both;
                font-weight: normal;
                line-height: 1.42857143;
                color: #333;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                width: 14.5em;
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
