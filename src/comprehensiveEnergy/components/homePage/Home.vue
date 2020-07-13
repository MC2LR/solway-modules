<template>
    <div ref="root" class="home">
        <div class="bg1"></div>
        <div class="bg2"></div>
        <home-header></home-header>
        <home-map></home-map>
        <aside-view></aside-view>
    </div>
</template>

<script>
import HomeHeader from './Header'
import {rem} from '@comm/mixin'
import {api＿goHome} from '@comprehensiveEnergy/request/api'
import HomeMap from './map'
import AsideView from './aside'

export default {
    mixins: [rem],
    components: {
        HomeHeader,
        HomeMap,
        AsideView
    },
    created () {
        api＿goHome().promise.then(() => {
            this.$store.dispatch('stationInfo')
        })
    },
    mounted () {
        setTimeout(() => {
            this.$refs.root.className += ' loaded'
        }, 200)
    }
}
</script>

<style lang="scss" scoped>
.home {
    height: 100vh;
    position: relative;
    font-size: 0;
    @include c(color, $text_c0);

    &.loaded {
        .bg1 {
            width: 100%;
            height: 130%;
            transform: translateY(-15%);
        }

        .home-map, .bg2, .aside-view {
            opacity: 1;
        }
    }

    .bg1, .bg2, .bg3 {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
    }

    .bg1 {
        background: url(./earth.png) center no-repeat;
        background-size: auto 100%;
        opacity: 0.7;
        width: 1vw;
        height: 1vh;
        transition: all 1s ease-in;
    }

    .bg2 {
        @include c(background-color, $bg_c6);
        opacity: 0;
        transition: opacity 1s ease-in 1s;
    }

    .home-map {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: calc(100vh - 0.6rem);
        opacity: 0;
        transition: opacity 1s ease-in 1s;
    }

    .aside-view {
        position: absolute;
        top: 0.6rem;
        left: 0;
        width: 100%;
        opacity: 0;
        transition: opacity 1s ease-in 2s;
    }
}
</style>
