<template>
    <div class="aside">
        <div @click="swichCollapse()" class="collapseSwich">
            <i v-show="!isCollapse" title="收起" class="iconfont iconzhankai-1"></i>
            <i v-show="isCollapse" title="展开" class="iconfont iconshouqi-"></i>
        </div>
        <el-menu
            :collapse="isCollapse"
            :collapse-transition="true"
            :default-active="$router.history.current.name"
            :background-color="themeColors.$bg_c0"
            :text-color="themeColors.$text_c0"
            :active-text-color="themeColors.$text_c1"
            router>
            <el-menu-item index="WarehouseManagement" :route="{name: 'WarehouseManagement'}">
                <i class="iconfont iconkufang"></i>
                <span slot="title">库房管理</span>
            </el-menu-item>
            <el-menu-item index="SparePartsManagement" :route="{name: 'SparePartsManagement'}">
                <i class="iconfont iconbeijian"></i>
                <span slot="title">备件管理</span>
            </el-menu-item>
            <el-menu-item index="SparePartsList" :route="{name: 'SparePartsList'}">
                <i class="iconfont iconqingdan"></i>
                <span slot="title">备件清单</span>
            </el-menu-item>
            <el-submenu index="PutIn">
                <template slot="title">
                    <i class="iconfont iconruku"></i>
                    <span>入库管理</span>
                </template>
                <el-menu-item index="PutInStorage" :route="{name: 'PutInStorage'}">
                    <i class="iconfont iconqingdan"></i>
                    <span slot="title">入库记录</span>
                </el-menu-item>
                <el-menu-item index="PutInStorageAdd" :route="{name: 'PutInStorageAdd', query: {menu: true}}">
                    <i class="iconfont iconjia"></i>
                    <span slot="title">备件入库</span>
                </el-menu-item>
            </el-submenu>
            <el-submenu index="Packing">
                <template slot="title">
                    <i class="iconfont iconlingliao"></i>
                    <span>领料管理</span>
                </template>
                <el-menu-item index="PackingList" :route="{name: 'PackingList'}">
                    <i class="iconfont iconqingdan"></i>
                    <span slot="title">领料记录</span>
                </el-menu-item>
                <el-menu-item index="PackingAdd" :route="{name: 'PackingAdd', query: {menu: true}}">
                    <i class="iconfont iconjia"></i>
                    <span slot="title">领料申请</span>
                </el-menu-item>
            </el-submenu>
            <el-menu-item index="e" :route="{name: 'e'}">
                <i class="iconfont iconchuku"></i>
                <span slot="title">出库管理</span>
            </el-menu-item>
            <el-menu-item index="f" :route="{name: 'f'}">
                <i class="iconfont iconhuanyuan"></i>
                <span slot="title">还库</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
import {Menu, MenuItem, MenuItemGroup, Submenu} from 'element-ui'
import {getThemeColors} from '@comm/assets/themes'

export default {
    components: {
        ElMenu: Menu,
        ElMenuItem: MenuItem,
        ElMenuItemGroup: MenuItemGroup,
        ElSubmenu: Submenu
    },
    data () {
        return {
            isCollapse: false,
            themeColors: getThemeColors()
        }
    },
    methods: {
        swichCollapse () {
            this.isCollapse = !this.isCollapse
            this.$emit('collapse', this.isCollapse)
        }
    }
}
</script>

<style lang="scss" scoped>
.aside {
    @include c(background-color, $bg_c0);
    width: max-content;

    .collapseSwich {
        width: 100%;
        height: 30px;
        @include c(background-color, $bg_c0);
        border-bottom: 1px solid;
        @include c(border-bottom-color, $line_c3);
        line-height: 30px;
        font-size: 25px;
        position: relative;

        i {
            vertical-align: super;
            position: absolute;
            top: 0;
            right: 25px;
            cursor: pointer;
            @include c(color, $text_c1);
        }
    }

    .el-menu {
        border: none;

        i.iconfont {
            font-size: 20px;
        }
    }
}
</style>
