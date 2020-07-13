<template>
    <div class="level-three">
        <div class="bg"></div>
        <three-header></three-header>
        <aside-menu height="calc(100vh - 67px)" :class="{collapse: isCollapse}" class="asede-menu"></aside-menu>
        <transition name="slide-fade">
            <router-view :class="{collapse: isCollapse}" class="router-view"/>
        </transition>
    </div>
</template>

<script>
import threeHeader from './header'
import AsideMenu from './Aside'

export default {
    computed: {
        isCollapse () {
            return this.$store.state.levelThree.isCollapse
        }
    },
    components: {
        threeHeader,
        AsideMenu
    }
}
</script>

<style lang="scss" scoped>
.level-three {
    font-size: 14px;
    @include c(color, $text_c0);
    background-image: url(./bgImg/bg.png);
    height: 100vh;
    background-size: cover;

    .bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        @include c(background-color, $bg_c6);
    }

    .three-header {
        position: relative;
        z-index: 5;
    }

    .router-view {
        top: 67px;
        left: 200px;
        width: calc(100% - 200px);
        transition: width,left 300ms cubic-bezier(0.5, 0.1, 0.5, 1);

        &.collapse {
            left: 64px;
            width: calc(100% - 64px);
        }
    }
}
</style>
