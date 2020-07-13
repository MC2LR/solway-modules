<template>
    <div class="index">
        <div class="header_tab_con clearfix">
            <div class="header_tab pull-left" :class="{'active': theme == 'contractList'}" @click="changeTheme('contractList')">合同管理</div>
            <div class="header_tab pull-left" :class="{'active': theme == 'projectList'}" @click="changeTheme('projectList')">合同项目管理</div>
            <div class="header_tab pull-left" :class="{'active': theme == 'insideProjectList'}" @click="changeTheme('insideProjectList')">内部项目管理</div>
        </div>
        <transition name="slide-fade">
            <router-view class="router-view"/>
        </transition>
    </div>
</template>

<script>
import {api＿getConctactManageAuth} from '@contractManage/request/api'
export default {
    data () {
        return {
            getConctactManageAuth: api＿getConctactManageAuth({
                later: true
            }),
            theme: ''
        }
    },
    watch: {
        $route: {
            handler: function (val, oldVal) {
                if (this.theme !== this.$route.name && this.$route.name !== 'outer_main') {
                    this.changeTheme(this.$route.name)
                }
            },
            // 深度观察监听
            deep: true
        }
    },
    created () {
        this.changeTheme('contractList')
        this.getConctactManageAuth.getData().then(res => {
            if (!res.body.enable) {
                this.$router.push({name: 'outer_main'})
            }
        })
    },
    methods: {
        changeTheme (v) {
            this.theme = v
            this.$router.push({name: v})
        }
    }
}
</script>

<style lang="scss" scoped>
.index {
    .header_tab_con {
        padding: 26px 30px 20px 30px;
        .header_tab {
            width: 30%;
            height: 25px;
            line-height: 25px;
            @include c(color, $text_c0);
            text-align: center;
            border-radius: 2px;
            margin-right: 5%;
            font-size: 14px;
            cursor: pointer;
            background: linear-gradient(to right, #305c8a, #52678f);
            &.active {
                background: rgba(70,118,167,0.4);
                box-shadow: 0px 0px 6px #fff;
            }
            &:last-child {
                margin: 0;
            }
        }
    }

    .router-view {
        top: 75px;
    }
}
</style>
