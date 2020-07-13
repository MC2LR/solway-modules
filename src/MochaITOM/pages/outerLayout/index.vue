<template>
    <div class="level-three" :style="{backgroundColor: theme.$bg}">
        <aside-menu :theme="(isHenan ? 'dark' : 'darkBlue') || themeName"></aside-menu>
        <transition name="slide-fade">
            <router-view :class="{collapse: isCollapse}" class="router-view"/>
        </transition>
    </div>
</template>

<script>
import AsideMenu from '@/components/AsideMenu'
import theme from './theme/theme'
export default {
    mixins: [theme],
    data () {
        return {
            isHenan: process.env.isHenan === 'true'
        }
    },
    computed: {
        isCollapse () {
            return this.$store.state.asideMenu.isCollapse
        }
    },
    components: {
        AsideMenu
    }
}
</script>

<style lang="scss" scoped>
.level-three {
    font-size: 14px;
    height: 100vh;
    @include c(color, $text_c0);

    .router-view {
        top: 0;
        left: 160px;
        width: calc(100% - 160px);
        transition: width,left 300ms cubic-bezier(0.5, 0.1, 0.5, 1);

        &.collapse {
            left: 64px;
            width: calc(100% - 64px);
        }
    }
}
</style>
