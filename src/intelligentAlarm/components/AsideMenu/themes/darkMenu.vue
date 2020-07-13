<template>
    <div class="aside" @dblclick="showAllMenu" :style="{height: height, backgroundColor: backgroundColor}">
        <div v-if="retract" @click="swichCollapse()" class="collapseSwich" :class="{dark: dark}">
            <span v-show="isCollapse" title="展开">
                <i class="iconfont icon-back-copy"></i>
            </span>
            <span v-show="!isCollapse" title="收起">
                <i class="iconfont icon-back"></i>
            </span>
        </div>
        <user-info-Aside :fontColor="dark ? '#fff' : null" class="user-block" :class="{dark: dark}"></user-info-Aside>
        <div class="menu-outer" :class="{fullHeight: !retract}" :style="{backgroundColor: backgroundColor}">
            <menu-list :backgroundColor="backgroundColor" :fontColor="fontColor" activeColor="#2FBFCC"></menu-list>
        </div>
    </div>
</template>

<script>
import MenuList from '../menu'
import UserInfoAside from '@/components/user/uesrInfoAside'

export default {
    props: {
        retract: {
            type: Boolean,
            default: true
        },
        dark: {
            type: Boolean,
            default: true
        },
        height: {
            type: String,
            default: '100vh'
        },
        fontColor: {
            type: String,
            default: 'rgba(255,255,255,.7)'
        },
        backgroundColor: {
            type: String,
            default: '#18305B'
        }
    },
    components: {
        UserInfoAside,
        MenuList
    },
    created () {
        if (!this.retract && this.isCollapse) {
            this.swichCollapse()
        }
    },
    computed: {
        isCollapse () {
            return this.$store.state.asideMenu.isCollapse
        }
    },
    methods: {
        swichCollapse () {
            this.$store.dispatch('asideMenu/collapse')

            setTimeout(() => {
                if (document.createEvent) {
                    var event = document.createEvent('HTMLEvents')
                    event.initEvent('resize', true, true)
                    window.dispatchEvent(event)
                } else if (document.createEventObject) {
                    window.fireEvent('onresize')
                }
            }, 200)
        },
        showAllMenu (event) {
            // event.ctrlKey && event.shiftKey && event.altKey && this.$store.dispatch('asideMenu/allMenu')
        }
    }
}
</script>

<style lang="scss">
li.el-menu-item:hover, div.el-submenu__title:hover {
   background-color: rgba($color: #000000, $alpha: 0.1) !important;
   color: #2FBFCC !important;
}
</style>

<style lang="scss" scoped>
.aside {
    font-size: 0;
    width: max-content;
    $collapse-swich-height: 30px;
    $user-block-height: 100px;

    .collapseSwich {
        width: 100%;
        height: $collapse-swich-height;
        line-height: $collapse-swich-height;
        position: relative;
        text-align: center;
        z-index: 5;
        cursor: pointer;
        border-bottom: 1px solid #f7f8fc;

        &.dark {
            border-bottom-color: rgba(11,33,52,0.3)
        }
        // box-shadow:0px 1px 1px 1px rgba(237,239,249,0.83);

        span {
            @include c(color, #BDC0C5);
            display: inline-block;
            width: 100%;

            i.iconback-copy {
                @include c(color, #BDC0C5);
            }
        }
    }

    .user-block {
        position: relative;
        z-index: 2;
        height: $user-block-height;
        border-bottom: 1px solid #f7f8fc;
        // box-shadow:0px 1px 1px 1px rgba(11,33,52,0.1);

        &.dark {
            border-bottom-color: rgba(11,33,52,0.3)
        }
    }

    .menu-outer {
        width: max-content;
        height: 100%;
        height: calc(100% - 2px - 30px - 100px);
        overflow: auto;

        &.fullHeight {
            height: calc(100% - 100px);
        }
    }

}
</style>
