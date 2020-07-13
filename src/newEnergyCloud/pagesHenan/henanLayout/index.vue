<template>
    <div class="level-three">
        <aside-menu :theme="$useful($oc($route.meta, 'pageTheme', '0'), 'dark')"></aside-menu>
        <transition name="slide-fade">
            <router-view :class="{collapse: isCollapse}" class="router-view"/>
        </transition>
    </div>
</template>

<script>
import AsideMenu from '@/components/AsideMenu'

export default {
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
    background:rgba(14,21,45,1);

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
