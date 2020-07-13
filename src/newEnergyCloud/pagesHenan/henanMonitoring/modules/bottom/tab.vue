<template>
    <div class="tab-con">
        <div class="tab-item" :class="{active: flag == 0}" @click="changeTab(0)" v-if="!isStation">电站</div>
        <div class="tab-item" :class="{active: flag == 1}" @click="changeTab(1)">设备</div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            fullPage: false,
            flag: 0,
            isStation: true
        }
    },
    created () {
        this.changeStation()
        // 切换电站
        this.$bus.on('stationChange', this.changeStation)
    },
    beforeDestroy () {
        this.$bus.off('stationChange', this.changeStation)
    },
    methods: {
        changeTab (data) {
            this.flag = data
            this.$bus.emit('tabIndex', this.flag)
        },
        changeStation () {
            this.isStation = this.$store.getters.station_type === 0
            if (this.isStation) this.changeTab(1)
            else this.changeTab(0)
        }
    }
}
</script>

<style lang="scss" scoped>
.tab-con {
    display: inline-block;
    font-size: 0;
    margin-right: 15px;
    border:1px solid rgba(52, 210, 238, 0.5);
    position: relative;
    z-index: 11;
    .tab-item {
        width: 79px;
        height: 31px;
        text-align: center;
        line-height: 30px;
        // border:1px solid rgba(52, 210, 238, 0.5);
        color: rgba(52, 210, 238, 0.5);
        cursor: pointer;
        display: inline-block;
        font-size: 15px;
        // &:first-child {
        //     border-right: 0;
        // }
        &.active {
            background: #2FBFCB;
            color: #fff;
        }
    }
}
</style>
