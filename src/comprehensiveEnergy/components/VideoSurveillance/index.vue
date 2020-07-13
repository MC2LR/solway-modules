<template>
    <div class="video-surveillance" v-loading="thirdpartyYs7Token.loading">
        <real-time
            v-if="thirdpartyYs7Token.res.data && !historyData"
            @checkedVideos="data => checkedVideos = data"
            :checkedVideos="checkedVideos"
            :token="thirdpartyYs7Token.res.data.token">
        </real-time>
        <history-video
            v-if="historyData"
            :token="thirdpartyYs7Token.res.data.token"
            :data="historyData">
        </history-video>
    </div>
</template>

<script>
import { api＿thirdpartyYs7Token } from '@/request/api'
import RealTime from './realTime'
import HistoryVideo from './history'
export default {
    data () {
        return {
            thirdpartyYs7Token: api＿thirdpartyYs7Token(),
            checkedVideos: [],
            historyData: null
        }
    },
    created () {
        this.$bus.on('historyVideo', this.setHistoryData)
    },
    methods: {
        setHistoryData (data) {
            this.historyData = data
        }
    },
    beforeDestroy () {
        this.$bus.off('historyVideo', this.setHistoryData)
    },
    components: {
        RealTime,
        HistoryVideo
    }
}
</script>

<style lang="scss" scoped>
.video-surveillance{
    height: calc(100vh - 80px);
    padding: 10px 30px 0;
}
</style>
