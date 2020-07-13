<template>
    <div class="aside" :style="{height: height}">
        <div v-if="retract" @click="swichCollapse()" class="collapseSwich">
            <span v-show="isCollapse" title="展开">
                <i class="iconfont iconback-copy"></i>
            </span>
            <span v-show="!isCollapse" title="收起">
                <i class="iconfont iconback"></i>
            </span>
        </div>
        <div class="menu-outer" :class="{fullHeight: !retract}" :style="{backgroundColor: backgroundColor}">
            <el-menu
                :collapse="isCollapse"
                :collapse-transition="true"
                :default-active="$route.name"
                :background-color="backgroundColor"
                text-color="rgba(255,255,255,.7)"
                active-text-color="#52D6FF"
                router>

                <el-menu-item index="Item" :route="{name: 'Item'}">
                    <i class="iconfont iconjianzhu"></i>
                    <span slot="title">楼宇监控</span>
                </el-menu-item>

                <el-menu-item index="fullPageShow" :route="{name: 'fullPageShow'}">
                    <i class="iconfont icondapingmu"></i>
                    <span slot="title">大屏展示</span>
                </el-menu-item>

                <el-submenu index="pv">
                    <template slot="title">
                        <i class="iconfont iconguangfu"></i>
                        <span>光伏系统</span>
                    </template>
                    <el-menu-item index="StationMonitoring" :route="{name: 'StationMonitoring'}">
                        <span slot="title">电站监视</span>
                    </el-menu-item>
                    <el-menu-item index="StationMonitoringList" :route="{name: 'StationMonitoringList'}">
                        <span slot="title">列表监控</span>
                    </el-menu-item>
                </el-submenu>

                <el-submenu index="distributionRoom">
                    <template slot="title">
                        <i class="iconfont iconpeidianfang"></i>
                        <span>配电房</span>
                    </template>
                    <el-menu-item index="EnvironmentMonitoring" :route="{name: 'EnvironmentMonitoring'}">
                        <span slot="title">环境监测</span>
                    </el-menu-item>
                    <el-menu-item index="distributionLineMonitoring" :route="{name: 'distributionLineMonitoring'}">
                        <span slot="title">配电线路监测</span>
                    </el-menu-item>
                    <el-menu-item index="HighVoltageSwitch" :route="{name: 'HighVoltageSwitch'}">
                        <span slot="title">高压开关</span>
                    </el-menu-item>
                    <el-menu-item index="VideoSurveillance" :route="{name: 'VideoSurveillance'}">
                        <span slot="title">视频监控</span>
                    </el-menu-item>
                </el-submenu>

                <el-menu-item index="EnergyStorage" :route="{name: 'EnergyStorage'}">
                    <i class="iconfont iconchunengguanli"></i>
                    <span slot="title">储能系统</span>
                </el-menu-item>

                <el-menu-item index="ChargingPile" :route="{name: 'ChargingPile'}">
                    <i class="iconfont iconchongdianzhuang"></i>
                    <span slot="title">充电桩系统</span>
                </el-menu-item>

            </el-menu>
        </div>
    </div>
</template>

<script>
import {Menu, MenuItem, MenuItemGroup, Submenu, Tooltip} from 'element-ui'

export default {
    props: {
        retract: {
            type: Boolean,
            default: true
        },
        height: {
            type: String,
            default: 'calc(100vh - 67px)'
        },
        backgroundColor: {
            type: String,
            default: '#082A46'
        }
    },
    components: {
        ElMenu: Menu,
        ElMenuItem: MenuItem,
        ElMenuItemGroup: MenuItemGroup,
        ElSubmenu: Submenu,
        ElTooltip: Tooltip
    },
    created () {
        if (!this.retract && this.isCollapse) {
            this.swichCollapse()
        }
    },
    computed: {
        isCollapse () {
            return this.$store.state.levelThree.isCollapse
        }
    },
    methods: {
        swichCollapse () {
            this.$store.dispatch('levelThree/collapse')

            setTimeout(() => {
                if (document.createEvent) {
                    var event = document.createEvent('HTMLEvents')
                    event.initEvent('resize', true, true)
                    window.dispatchEvent(event)
                } else if (document.createEventObject) {
                    window.fireEvent('onresize')
                }
            }, 200)
        }
    }
}
</script>

<style lang="scss" scoped>
.aside {
    width: max-content;
    height: calc(100vh - 67px);

    .collapseSwich {
        width: 100%;
        height: 30px;
        @include c(background-color, rgb(8, 42, 70));
        // border-bottom: 1px solid;
        // @include c(border-bottom-color, $line_c3);
        line-height: 30px;
        position: relative;
        text-align: center;
        cursor: pointer;

        span {
            @include c(color, $text_c1);
            display: inline-block;
            width: 100%;

            i.iconback-copy {
                @include c(color, $text_c2);
            }
        }

        // i {
        //     font-size: 25px;
        //     vertical-align: super;
        //     position: absolute;
        //     top: 0;
        //     right: 25px;
        //     cursor: pointer;
        //     @include c(color, $text_c1);
        // }
    }

    .menu-outer {
        width: max-content;
        height: 100%;
        height: calc(100% - 32px);
        margin-top: 2px;
        overflow: auto;

        &.fullHeight {
            height: 100%;
            margin-top: 0;
        }

        .el-menu {
            border: none;

            &:not(.el-menu--collapse) {
                width: 200px;

                i.iconfont {
                    font-size: 14px;
                    color: inherit;
                }
            }

            i.iconfont {
                color: inherit;
                font-size: 20px;
            }
        }
    }

}
</style>
