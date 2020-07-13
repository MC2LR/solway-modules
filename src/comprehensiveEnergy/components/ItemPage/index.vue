<template>
    <div class="item-page" v-if="isEnergyStation">
        <item-header :title="$store.state.currentStationInfo.currentDataName"></item-header>
        <div class="body">
            <item-body></item-body>
            <item-aside></item-aside>
        </div>
        <aside class="aside">
            <my-menu :retract="false" height="calc(100vh - 0.6rem);"></my-menu>
        </aside>
    </div>
</template>

<script>
import {rem} from '@comm/mixin'
import ItemHeader from './Header'
import ItemBody from './Body'
import ItemAside from './Aside'
import MyMenu from '../levelThree/Aside'

export default {
    mixins: [rem],
    created () {
        if (!this.$store.getters.isEnergyStation()) {
            this.$router.push({name: 'Home'})
        }
    },
    mounted () {
        // document.documentElement.style.fontSize = '100px'
        this.timer = setTimeout(() => {
            this.$el.className += ' ok'
        }, 1000)
    },
    computed: {
        isEnergyStation () {
            return this.$store.getters.isEnergyStation()
        }
    },
    beforeDestroy () {
        clearTimeout(this.timer)
    },
    components: {
        ItemHeader,
        ItemBody,
        ItemAside,
        MyMenu
    }
}
</script>

<style lang="scss" scoped>
.item-page {
    height: 100vh;
    font-size: 0;
    background: url(./bg.png) no-repeat;
    background-size: cover;
    @include c(color, $text_c0);

    .body {
        width: 100%;
        height: calc(100vh - 0.6rem);
        padding: 0 0.4rem;
        position: relative;

        .item-body {
            float: left;
            height: 100%;
            width: calc(100% - 19.5vw);
        }

        .aside {
            float: right;
            height: 100%;
            width: 16.5vw;
            position: relative;
            // transform-style: preserve-3d;
        }
    }

    aside.aside {
        position: fixed;
        left: 0;
        top: 0.6rem;
        width: 10px;
        z-index: 99;
        overflow: hidden;
        opacity: 0;
        transition: all 1s ease 1s;

        &:hover {
            transition: all 1s ease;
            width: 200px;
            opacity: 1;
        }
    }
}
</style>
