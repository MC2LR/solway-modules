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
                            :class="{real: item}"
                            :style="{
                                borderColor: item ? ('rgba(0, 0, 0, ' + (110 - Math.max(item.clean_mark || 0, 30)) / 100) + ')' : 'transparent',
                                background: item ? ('rgba(0, 0, 0, ' + (100 - Math.max(item.clean_mark || 0, 30)) / 100) + ')' : 'transparent',
                                color: (item && (item.clean_mark || 0 > 50)) ? '#333' : '#ccc',
                                ...(themeName === 'dark' ? {
                                    borderColor: item ? ('rgba(255, 255, 255, ' + (1 - (110 - Math.max(item.clean_mark || 0, 10)) / 100)) + ')' : 'transparent',
                                    background: item ? ('rgba(255, 255, 255, ' + (1 - (100 - Math.max(item.clean_mark || 0, 10)) / 100)) + ')' : 'transparent',
                                    color: (item && (item.clean_mark || 0 > 50)) ? '#333' : '#ccc',
                                } : {})
                            }"
                            v-for="(item, colIndex) in row"
                            :title="item && (item.eq_name + '，清洁度：' + item.clean_mark + '%，积灰损失电量：' + item.dust_we + '度')"
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
            <div :class="{'dark-theme': themeName === 'dark'}"></div>
            <span>清洁度</span>
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
            date: [dateStr, dateStr],
            data: [],
            drag: null,
            zoom: null
        }
    },
    created () {
        this.$bus.on('changeDateAshEmit', this.getData)
        this.$bus.on('stationChange', this.getData)
    },
    methods: {
        getData (date = this.date) {
            if (date.startDate && date.endDate) this.date = date
            this.getCoordinate.getData({
                stId: this.$store.getters.station_id,
                ...this.date
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
        this.$bus.off('changeDateAshEmit', this.getData)
        this.$bus.off('stationChange', this.getData)
    }
}
</script>

<style lang="scss" scoped>
@import './theme/theme.scss';
@import '@comm/assets/themes/scrollbar/s1.scss';
.edit-block {
    height: 100%;
    padding: 25px 10px 10px;
    overflow: hidden;
    position: relative;

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
        bottom: 50px;
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
            // border: 1px solid #000;

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
                    border: 1px solid #000;

                    &.real {
                        background:rgba(#000,0.4);
                        cursor: pointer;
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
            display: inline-block;
            width: 300px;
            height: 20px;
            line-height: 20px;
            background: linear-gradient(to right, rgba(#000, .7), rgba(#000, 0));
            border: 1px solid rgba(#000, .3);

            &.dark-theme {
                background: linear-gradient(to right, rgba(#fff, .1), rgba(#fff, 1));
                border: 1px solid rgba(#fff, .9);
            }

            &::before {
                content: "30%及以下";
                color: #fff;
            }

            &::after {
                content: "100%";
                color: #333;
                float: right;
            }
        }
    }
}
</style>
