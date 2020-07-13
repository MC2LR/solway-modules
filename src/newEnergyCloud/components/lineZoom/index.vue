<template>
    <div ref="scrollView" class="scroll-view zoom-line line-zoom" :style="{height: height}" @mousewheel="mousewheel">
        <div ref="zoomView" class="zoom-view">
            <div class="zoom-content">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        height: {
            type: String,
            required: true
        }
    },
    data () {
        this.scrollLeft = 0
        return {}
    },
    methods: {
        mousewheel (event) {
            const wheelData = event.wheelDelta ? (event.wheelDelta) / 120 : event.detail * -40 / 120
            const {scrollView, zoomView} = this.$refs
            let zoomRect = zoomView.getClientRects()[0]
            const changeValue = zoomRect.width * wheelData / 20
            const eventLeft = event.x - zoomRect.x
            const eventLeftRate = eventLeft / zoomRect.width
            zoomView.style.width = zoomRect.width + changeValue + 'px'
            const scrollLeft = this.scrollLeft + eventLeftRate * changeValue
            scrollView.scrollLeft = this.scrollLeft = scrollLeft < 0 ? 0 : scrollLeft
        }
    }
}
</script>

<style lang="scss" scoped>
.scroll-view {
    overflow: auto;
    position: relative;

    .zoom-view {
        height: 100%;
        position: relative;
        cursor: pointer;
        min-width: 100%;

        .zoom-content {
            width: 100%;
            padding: 1px 0;
            overflow: visible;
            position: relative;
        }
    }
}
</style>
