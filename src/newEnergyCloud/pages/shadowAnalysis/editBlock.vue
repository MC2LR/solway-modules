<template>
    <div class="edit-block" v-loading="getCoordinate.loading">
        <div class="edit-btn" @click="editLayout = true">
            <i class="iconfont icon-bianji-copy"></i>
            <span>编辑</span>
        </div>

        <div class="device-chart">
            <div ref="dragEle" class="drag-zoom" v-if="$useful($oc(data, 0))">
                <div ref="zoomEle" class="layout">
                    <div v-for="(row, rowIndex) in data" :key="rowIndex" class="row">
                        <div
                            class="device"
                            @click.stop="$bus.emit('clickEditBlock', item.eqid)"
                            :class="{real: item, shadow: item && (item.shade_count > 0)}"
                            v-for="(item, colIndex) in row"
                            :title="item && (item.eq_name + ', 阴影损失电量：' + item.shade_we + '度')"
                            :key="rowIndex + '_' + colIndex">
                            {{item && item.eq_name}}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="!$oc(data, 0)" class="no-layout">
            <p>还没有布局图，去<span class="edit" @click="editLayout = true">编辑</span></p>
        </div>

        <div class="lengend">
            <div>无阴影遮挡</div>
            <div>阴影遮挡</div>
        </div>

        <edit-device-layout :stid="$store.getters.station_id" @close="layoutClose" v-if="editLayout"></edit-device-layout>
    </div>
</template>

<script>
import {zoom, drag, getComputedStyle} from '@comm/tools'
import {api＿getCoordinate} from '@/request/api'
import theme from './theme/theme'

export default {
    mixins: [theme],
    components: {
        EditDeviceLayout: () => import('@/components/deviceLayout')
    },
    data () {
        const dateStr = new Date(Date.now() - 86400000).Format('yyyy-MM-dd')
        return {
            getCoordinate: api＿getCoordinate({
                data: {
                    stId: this.$store.getters.station_id,
                    startDate: dateStr,
                    endDate: dateStr
                }
            }).subscribe(this.setData),
            editLayout: false,
            dateArr: [dateStr, dateStr],
            data: [],
            drag: null,
            zoom: null
        }
    },
    created () {
        this.$bus.on('dateChange', this.getData)
        this.$bus.on('stationChange', this.getData)
    },
    methods: {
        getData (date) {
            if (Array.isArray(date)) this.dateArr = date
            this.getCoordinate.getData({
                stId: this.$store.getters.station_id,
                startDate: this.dateArr[0],
                endDate: this.dateArr[1]
            })
        },
        setData (res) {
            this.data = res?.body
            this.zoom && this.zoom.destroy()
            this.drag && this.drag.destroy()
            this.zoom = null
            this.drag = null
            if (this.data?.[0]) {
                this.zoom || this.dataInit()
            }
        },
        dataInit () {
            this.$nextTick(() => {
                const {dragEle, zoomEle} = this.$refs
                this.drag = drag({ele: dragEle})
                const outerStyle = getComputedStyle(dragEle)
                const ineerStyle = getComputedStyle(zoomEle)
                const outerWidth = parseInt(outerStyle.width)
                const innerWidth = parseInt(ineerStyle.width)
                const outerHeight = parseInt(outerStyle.height)
                const innerHeight = parseInt(ineerStyle.height)
                const scale = Math.min(outerWidth / innerWidth, outerHeight / innerHeight)
                const translate = [(outerWidth - innerWidth) / 2, (outerHeight - innerHeight) / 2]
                this.zoom = zoom({
                    ele: zoomEle,
                    minScale: 0.1,
                    scale,
                    translate
                })
            })
        },
        layoutClose (isEdit) {
            this.editLayout = false
            isEdit && this.getData()
        }
    },
    beforeDestroy () {
        this.zoom && this.zoom.destroy()
        this.drag && this.drag.destroy()
        this.$bus.off('dateChange', this.getData)
        this.$bus.off('stationChange', this.getData)
    }
}
</script>

<style lang="scss" scoped>
@import '@comm/assets/themes/scrollbar/s1.scss';
@import './theme/theme.scss';
.edit-block {
    height: 100%;
    padding: 25px 10px 10px;
    overflow: hidden;
    position: relative;
    border:1px solid transparent;
    border-radius: 4px;
    @include page_c(border-color, $blockBorderColor);
    @include page_c(background-color, $blockBgColor);
    .edit-btn {
        z-index: 9;
        @include c(color, $text_c1);
        cursor: pointer;
        position: absolute;
        right: 5px;
        top: 5px;
    }

    .device-chart {
        position: absolute;
        top: 30px;
        bottom: 30px;
        left: 20px;
        right: 20px;
        overflow: hidden;
    }

    .drag-zoom {
        width: calc(100% - 20px);
        height: 100%;
        overflow: visible;

        .layout {
            line-height: 0;
            width: max-content;
            height: max-content;
            // border: 1px solid rgba(48,198,249,1);

            .row {
                display: table;

                .device {
                    display: table-cell;
                    vertical-align: middle;
                    word-break: keep-all;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    width: 100px;
                    min-width: 100px;
                    max-width: 100px;
                    height: 40px;
                    font-size: 12px;
                    border: 1px solid rgba(48,198,249,1);
                    @include page_c(color, #fff #333 #fff);

                    &.real {
                        background:rgba(48,198,249,0.4);
                        cursor: pointer;

                        &.shadow {
                            border-color: #0072FF;
                            background-color: rgba(#0072FF, .6);
                        }
                    }

                    &:not(.real) {
                        border-color: transparent;
                    }
                }
            }
        }
    }

    .no-layout {
        span.edit {
            cursor: pointer;
            @include c(color, $text_c1);
        }
    }

    .lengend {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        padding: 1em;
        @include page_c(color, #fff #333 #fff);

        div {
            float: left;
            margin-right: 2em;

            &::before {
                content: "";
                width: 14px;
                height: 14px;
                display: inline-block;
                box-sizing: border-box;
                border: 2px solid #30C6F9;
                background-color:rgba(#30C6F9, .4);
                vertical-align: middle;
            }

            &:nth-child(2) {

                &::before {
                    border: 2px solid #0072FF;
                    background-color:rgba(#0072FF, .6);
                }
            }
        }
    }
}
</style>
