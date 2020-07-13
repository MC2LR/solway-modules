<template>
    <aside class="aside" :class="{show: asideDisply}">
        <my-menu :theme="theme" :retract="false"></my-menu>
    </aside>
</template>

<script>
import myMenu from './index'
export default {
    props: ['theme'],
    components: {
        myMenu
    },
    data () {
        return {
            timer: false,
            asideDisply: true
        }
    },
    created () {
        this.$bus.on('asideDisply', this.toggleDisplay)
    },
    mounted () {
        this.timer = setTimeout(() => {
            this.asideDisply = false
        }, 1000)
    },
    methods: {
        toggleDisplay (flag) {
            this.asideDisply = flag
        }
    },
    beforeDestroy () {
        clearTimeout(this.timer)
        this.$bus.off('asideDisply', this.toggleDisplay)
    }
}
</script>

<style lang="scss" scoped>
aside.aside {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 99999;
    overflow: hidden;
    transition: all 1s ease 0.5s;
    width: 10px;
    opacity: 0;

    &.show, &:hover {
        transition: all 1s ease;
        width: 160px;
        opacity: 1;
    }
}
</style>
