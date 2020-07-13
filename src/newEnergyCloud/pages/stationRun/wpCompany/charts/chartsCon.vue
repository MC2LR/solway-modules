<template>
    <div class="charts" ref="charts">
        <div class="item" v-show='showChartIndex === 0'>
            <chart-a v-show="showChartIndex === 0 && isToday"/>
            <charta-history v-show="showChartIndex === 0 && !isToday"/>
        </div>
        <div class="item" v-show='showChartIndex === 1'>
            <div class="tabs">
                <div class="tab" :class="{'active': tabDayIndex === 0}" @click="tabDay(0)">
                    时间
                </div>
                <div class="tab" :class="{'active': tabDayIndex === 1}" @click="tabDay(1)">
                    电站
                </div>
            </div>
            <chart-b v-show="showChartIndex === 1 && tabDayIndex === 0"/>
            <chartb-device v-show="showChartIndex === 1 && tabDayIndex === 1 && isToday"/>
            <chartb-device-history v-show="showChartIndex === 1 && tabDayIndex === 1 && !isToday"/>
        </div>
        <div class="item" v-show='showChartIndex === 2'>
            <div class="tabs">
                <div class="tab" :class="{'active': tabMonthIndex === 0}" @click="tabMonth(0)">
                    时间
                </div>
                <div class="tab" :class="{'active': tabMonthIndex === 1}" @click="tabMonth(1)">
                    电站
                </div>
            </div>
            <chart-c v-show="showChartIndex === 2 && tabMonthIndex === 0"/>
            <chartc-device v-show="showChartIndex === 2 && tabMonthIndex === 1"/>
        </div>
        <div class="item" v-show='showChartIndex === 3'>
            <div class="tabs">
                <div class="tab" :class="{'active': tabYearIndex === 0}" @click="tabYear(0)">
                    时间
                </div>
                <div class="tab" :class="{'active': tabYearIndex === 1}" @click="tabYear(1)">
                    电站
                </div>
            </div>
            <chart-d v-show="showChartIndex === 3 && tabYearIndex === 0"/>
            <chartd-device v-show="showChartIndex === 3 && tabYearIndex === 1"/>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            isToday: true,
            showChartIndex: 0,
            tabDayIndex: 0,
            tabMonthIndex: 0,
            tabYearIndex: 0
        }
    },
    components: {
        chartA: () => import('./chartA'),
        chartaHistory: () => import('./chartAHistory'),
        chartB: () => import('./chartB'),
        chartbDevice: () => import('./chartbDevice'),
        chartbDeviceHistory: () => import('./chartbDeviceHistory'),
        chartC: () => import('./chartC'),
        chartcDevice: () => import('./chartcDevice'),
        chartD: () => import('./chartD'),
        chartdDevice: () => import('./chartdDevice')
    },
    created () {
        this.$bus.on('getChartIndex', this.getChartIndex)
        this.$bus.on('dateChange', this.getTime)
    },
    mounted () {
        // chrome/ie
        this.$refs.charts.addEventListener('mousewheel', this.handleScroll, false)
        // firefox
        this.$refs.charts.addEventListener('DOMMouseScroll', this.handleScroll, false)
    },
    methods: {
        getChartIndex (i) {
            this.showChartIndex = i
        },
        getTime (date) {
            this.isToday = new Date(date).toDateString() === new Date().toDateString()
        },
        tabDay (i) {
            this.tabDayIndex = i
            this.$bus.emit('tabsDay', i)
        },
        tabMonth (i) {
            this.tabMonthIndex = i
            this.$bus.emit('tabsMonth', i)
        },
        tabYear (i) {
            this.tabYearIndex = i
            this.$bus.emit('tabsYear', i)
        },
        handleScroll (e) {
            this.showChartIndex = e.deltaY > 0 ? this.showChartIndex + 1 : this.showChartIndex - 1
            if (this.showChartIndex > 3) this.showChartIndex = 0
            if (this.showChartIndex < 0) this.showChartIndex = 3
            this.$bus.emit('scrollChart', this.showChartIndex)
        }
    },
    beforeDestroy () {
        this.$bus.off('dateChange', this.getTime)
        this.$bus.off('getChartIndex', this.getChartIndex)
    }
}
</script>

<style lang="scss" scoped>
@import '../../theme/theme.scss';

.charts {
    height: calc(100vh - 120px - 1.06rem);
    margin: 15px 10px;
    .item {
        width: 100%;
        height: 100%;
        position: relative;
        border-width: 1px;
        border-style: solid;
        @include page_c(border-color, $pageSectionBorderColor);
        .tabs {
            width: max-content;
            position: absolute;
            right: 10px;
            top: 10px;
            z-index: 111;
            .tab {
                &.active {
                    @include page_c(background-color, $pageChartActiveButtonBgColor);
                    @include page_c(color, $pageChartActiveButtonColor);
                    // background: #2FBFCC;
                    // color: #fff;
                    border-width: 1px;
                    border-style: solid;
                    // border-color: #2FBFCC;
                    @include page_c(border-color, $pageChartActiveButtonBorderColor);
                }
                display: inline-block;
                width: 68px;
                height: 29px;
                line-height: 28px;
                text-align: center;
                border-radius: 4px;
                // background: #fff;
                // color: #606369;
                @include page_c(color, $pageChartButtonColor);
                @include page_c(background-color, $pageChartButtonBgColor);
                border-width: 1px;
                border-style: solid;
                @include page_c(border-color, $pageSectionBorderColor);
                cursor: pointer;
            }
        }
    }
}
</style>
