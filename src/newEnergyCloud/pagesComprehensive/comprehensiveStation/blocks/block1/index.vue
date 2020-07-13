<template>
    <div class="block1">
        <div class="block-title">能源概览分布</div>
        <div class="animate-wrap">
            <component :is="vw >= 1920 ? 'aniBlockBig' : 'aniBlockSmall'"></component>
        </div>
    </div>
</template>

<script>
import mixinWidthHeight from '@comm/mixin/widthHeight'
export default {
    mixins: [mixinWidthHeight],
    components: {
        'aniBlockBig': () => import('./aniBlockBig'),
        'aniBlockSmall': () => import('./aniBlockSmall')
    }
}
</script>

<style lang="scss" scoped>
.block1 {
    position: relative;
    .block-title {
        font-size: .14rem;
        padding: .14rem 0 0 .14rem;
    }
    .animate-wrap {
        width: max-content;
        height: max-content;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
    }
}

</style>
