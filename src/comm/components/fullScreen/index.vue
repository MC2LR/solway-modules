<template>
    <div class="full-screen">
        <i class="iconcomm commicon--" v-if="fullScreen" @click="changeFullScreen()" title="全屏模式"></i>
        <i class="iconcomm commsuoxiao1" v-if="!fullScreen" @click="changeFullScreen()" title="关闭全屏"></i>
    </div>
</template>

<script>
import {requestFullScreen, isFullscreen, exitFull} from '@comm/tools'
export default {
    name: 'fullScreen',
    data () {
        return {
            fullScreen: true
        }
    },
    methods: {
        changeFullScreen () {
            if (!isFullscreen()) {
                requestFullScreen()
            } else {
                exitFull()
            }
        },
        async windowChange () {
            await this.$timeout(200)
            if (isFullscreen()) {
                this.fullScreen = false
            } else {
                this.fullScreen = true
            }
        }
    },
    mounted () {
        this.windowChange()
        window.addEventListener('resize', this.windowChange)
    },
    destroyed () {
        window.removeEventListener('resize', this.windowChange)
    }
}
</script>

<style lang="scss" scoped>
.full-screen {
    display: inline-block;
    max-height: 100%;

    .iconcomm{
        font-size: 20px;
        cursor: pointer;
    }
}
</style>
