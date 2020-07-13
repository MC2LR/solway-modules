<template>
    <div class="corner-border">
        <slot>
            <i class="iconfont"></i>
        </slot>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.corner-border {
    display: inline-block;
    width: 20px;
    height: 20px;
    position: relative;

    &::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background: linear-gradient(to left, rgba(40,194,221, .5), rgba(40,194,221, .5)) left top no-repeat,
                    linear-gradient(to bottom, rgba(40,194,221, .5), rgba(40,194,221, .5)) left top no-repeat,
                    linear-gradient(to left, rgba(40,194,221, .5), rgba(40,194,221, .5)) right top no-repeat,
                    linear-gradient(to bottom, rgba(40,194,221, .5), rgba(40,194,221, .5)) right top no-repeat,
                    linear-gradient(to left, rgba(40,194,221, .5), rgba(40,194,221, .5)) left bottom no-repeat,
                    linear-gradient(to bottom, rgba(40,194,221, .5), rgba(40,194,221, .5)) left bottom no-repeat,
                    linear-gradient(to left, rgba(40,194,221, .5), rgba(40,194,221, .5)) right bottom no-repeat,
                    linear-gradient(to left, rgba(40,194,221, .5), rgba(40,194,221, .5)) right bottom no-repeat;
        background-size: 1px 6px, 6px 1px, 1px 6px, 6px 1px;
    }
}
</style>
