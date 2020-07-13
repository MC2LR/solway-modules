<template>
    <div class="bottom-con" :style="{height: !fullPage ? 'calc(100vh - 284px)' : 'calc(100vh - 70px)'}">
        <device-tabs style="margin-left: 30px"></device-tabs>
        <station-list v-if="tabIndex == 0"></station-list>
        <device-list v-if="tabIndex == 1"></device-list>
    </div>
</template>

<script>
import DeviceTabs from './tab'

export default {
    components: {
        deviceList: () => import('./deviceList'),
        stationList: () => import('./stationList'),
        DeviceTabs
    },
    data () {
        return {
            fullPage: false,
            tabIndex: 0
        }
    },
    created () {
        this.$bus.on('detailFullPage', this.detailFullPage)
        this.$bus.on('tabIndex', this.getTabIndex)
    },
    beforeDestroy () {
        this.$bus.off('detailFullPage', this.detailFullPage)
        this.$bus.off('tabIndex', this.getTabIndex)
    },
    methods: {
        detailFullPage (data) {
            this.fullPage = data
        },
        getTabIndex (index) {
            this.tabIndex = index
        }
    }
}
</script>

<style lang="scss" scoped>
.bottom-con {
    // height: calc(100vh - 284px);
    padding-bottom: 15px;
    padding-top: 20px;
}
</style>
