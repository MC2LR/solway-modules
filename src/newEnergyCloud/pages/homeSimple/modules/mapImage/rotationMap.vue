<template>
    <div class="map rotation-map">
        <div class="content" :style="{top: top}">
            <station-shanghai-map v-if="comId === 189" @slideTop="setTop => top = setTop"></station-shanghai-map>
            <station-map v-else @slideTop="setTop => top = setTop"></station-map>
            <station-image @slideTop="setTop => top = setTop"></station-image>
        </div>
        <div class="mask"></div>
    </div>
</template>

<script>
// import StationMap from './map'
import StationImage from './stationImage'
export default {
    components: {
        StationMap: () => import('./map'),
        StationShanghaiMap: () => import('./mapShanghai'),
        StationImage
    },
    data () {
        return {
            top: '0'
        }
    },
    computed: {
        comId () {
            return this.$store.getters.current_companyid
        }
    }
}
</script>

<style lang="scss" scoped>
.rotation-map {
    position: relative;
    overflow: hidden;

    .content {
        height: 100%;
        position: relative;
        z-index: 99;
        transition: top 0.4s linear;
        transform: translate3d(0, 0, 0);

        .station-image {
            width: 100%;
            height: 100%;
            // position: absolute;
            // top: 0;
            // left: 0;
        }
    }

    .mask {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        z-index: 99;
    }

}
</style>
