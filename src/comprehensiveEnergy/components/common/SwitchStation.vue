<template>
    <div class="switch-station">
        <i title="切换项目" class="iconfont iconartboard43" @click="dialogVisible = true"></i>
        <el-dialog
            title="切换项目"
            center
            @open="getStationList"
            :visible.sync="dialogVisible"
            :modal-append-to-body="false"
            width="1000px">
            <div class="station-list clearfix">
                <div
                    v-for="item in $store.state.switchStationList"
                    :key="item.stId"
                    @click="() => changeStation({dataType: 0, id: item.stId, isGroup: 0, stClass: '01'})"
                    class="station-item"
                    :class="{active: $store.state.currentStationInfo.currentSTID === item.stId}">
                    <span>{{item.stName}}</span>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {Dialog} from 'element-ui'
import { api＿UserAuthHandleChangeDataType } from '@comprehensiveEnergy/request/api'

export default {
    data () {
        return {
            dialogVisible: false,
            UserAuthHandleChangeDataType: api＿UserAuthHandleChangeDataType({
                later: true,
                sameTimeOnce: true,
                onlyLatest: true
            })
        }
    },
    methods: {
        getStationList () {
            if (this.$store.state.switchStationList.length === 0) {
                this.$store.dispatch('switchStationList')
            }
        },
        async changeStation (o) {
            const res = await this.UserAuthHandleChangeDataType.getData(o)
            if (res.result) {
                await this.$store.dispatch('stationInfo')
                if (this.$route.name === 'Home') {
                    if (!this.$store.getters.isEnergyStation(o.id)) {
                        return this.$router.push({ name: 'StationMonitoring' })
                    } else {
                        return this.$router.push({ name: 'Item' })
                    }
                } else if (this.$route.name === 'Item' && !this.$store.getters.isEnergyStation(o.id)) {
                    return this.$router.push({ name: 'StationMonitoring' })
                }
                this.$router.push({ name: this.$route.name, query: { t: Date.now() } })
            }
        }
    },
    components: {
        ElDialog: Dialog
    }
}
</script>

<style lang="scss">
.switch-station {
    .el-dialog {
        @include c(background-color, #1e4266);

        .el-dialog__header {
            padding: 0;

            .el-dialog__title {
                @include c(color, $text_c0);
            }
        }

        .el-dialog__body {
            padding-top: 0;
        }

    }
}
</style>

<style lang="scss" scoped>
@import '@comm/assets/themes/scrollbar/s1.scss';

.switch-station {
    max-height: 100%;

    i.iconfont {
        cursor: pointer;
        font-size: inherit;
    }

    .station-list {
        @include c(color, $text_c0);
        background-color: rgba(23,52,81,.9);
        max-height: calc(100vh - 260px);
        overflow: auto;

        .station-item {
            width: 236px;
            height: 40px;
            line-height: 40px;
            padding-left: 1em;
            float: left;
            cursor: pointer;
            color: #bccee4;

            &.active {
                @include c(color, $text_c1);
            }
        }
    }
}
</style>
