<template>
    <div class="analysis-body">
        <div class="filter-view">
            <div class="label pull-left">筛选器</div>
            <div
                class="view enter-view"
                :class="{enter: dragEnter === dragSource.filters}"
                @dragenter="dragenter(dragSource.filters)"
                @dragleave="dragleave">
                <div
                    class="enter-item"
                    v-for="item in filters"
                    draggable
                    @dragend="dragend"
                    @dragstart="dragstart({dragSource: dragSource.filters, data: item})"
                    @click="filterType(item)"
                    :key="item.fd_key">
                    <span>{{item.fd_name.split('-')[0]}}</span>
                </div>
                <span v-if="filters.length === 0" class="enter-view-placeholder">请选择维度或指标拖入此区域</span>
            </div>
        </div>

        <div class="group-view">
            <div class="label">分组</div>
            <div
                class="view enter-view"
                :class="{enter: dragEnter === dragSource.group}"
                @dragenter="dragenter(dragSource.group)"
                @dragleave="dragleave">
                <div
                    class="enter-item"
                    v-for="item in group"
                    draggable
                    @dragend="dragend"
                    @dragstart="dragstart({dragSource: dragSource.group, data: item})"
                    :key="item.fd_key">
                    <span>{{item.fd_name}}</span>
                </div>
                <span v-if="group.length === 0" class="enter-view-placeholder">请选择维度拖入此区域</span>
            </div>
        </div>

        <div class="button-view">
            <el-button @click="queryData" type="primary">查询</el-button>
        </div>

        <div class="x-y-axis">
            <div class="x-axis">
                <div class="label">X轴</div>
                <div
                    class="view enter-view"
                    :class="{enter: dragEnter === dragSource.xAxis}"
                    @dragenter="dragenter(dragSource.xAxis)"
                    @dragleave="dragleave">
                    <div
                        class="enter-item"
                        v-for="(item, index) in xAxis"
                        draggable
                        @dragend="dragend"
                        @dragstart="dragstart({dragSource: dragSource.xAxis, data: item})"
                        :key="item.fd_key">
                        <target-attr @setTargetAttr="type => setTargetDataType({axis: 'xAxis', index: index, type: type})" v-if="item.dataType === 'target'" :target="item"></target-attr>
                        <span v-if="item.dataType === 'dimension'">{{item.fd_name}}</span>
                    </div>
                    <span v-if="xAxis.length === 0" class="enter-view-placeholder">请选择维度或指标拖入此区域</span>
                </div>
            </div>
            <div class="y-axis">
                <div class="label">Y轴</div>
                <div
                    class="view enter-view"
                    :class="{enter: dragEnter === dragSource.yAxis}"
                    @dragenter="dragenter(dragSource.yAxis)"
                    @dragleave="dragleave">
                    <div
                        class="enter-item"
                        v-for="(item, index) in yAxis"
                        draggable
                        @dragend="dragend"
                        @dragstart="dragstart({dragSource: dragSource.yAxis, data: item})"
                        :key="item.fd_key">
                        <target-attr @setTargetAttr="type => setTargetDataType({axis: 'yAxis', index: index, type: type})" v-if="item.dataType === 'target'" :target="item"></target-attr>
                        <span v-if="item.dataType === 'dimension'">{{item.fd_name}}</span>
                    </div>
                    <span v-if="yAxis.length === 0" class="enter-view-placeholder">请选择指标拖入此区域</span>
                </div>
            </div>
        </div>

        <chart-view v-fullpage class="chart-view"></chart-view>
        <component :is="filterTpl" :data="filterData" :defaultDateType="dateType" @closed="dateType = null; filterData = null; filterTpl = null;"></component>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import {moduleName, DragSource as dragSource} from './store'
import targetAttr from './targetAttr'
import chartView from './chart/chart'
export default {
    components: {
        targetFilter: () => import('./filters/targetFilter'),
        stationFilter: () => import('./filters/stationFilter'),
        deviceFilter: () => import('./filters/deviceFilter'),
        dateFilter: () => import('./filters/dateFilter'),
        targetAttr,
        chartView
    },
    data () {
        return {
            dragSource,
            filterTpl: null,
            filterData: null,
            dateType: 0
        }
    },
    created () {
        this.$bus.on('expertAnalysisFilter', this.filterType)
        this.$nextTick(() => this.queryData())
    },
    computed: {
        ...mapState(moduleName, [
            'dragEnter',
            'filters',
            'group',
            'xAxis',
            'yAxis'
        ])
    },
    methods: {
        ...mapActions(moduleName, [
            'dragenter',
            'dragleave',
            'dragstart',
            'dragend',
            'setTargetDataType',
            'queryData'
        ]),
        filterType (data) {
            this.filterData = data
            if (data.dataType === 'target') {
                this.filterTpl = 'targetFilter'
            } else if (data.fd_tag.indexOf('dtime') === 0) {
                this.dateType = +data.fd_tag.split('_')[1]
                this.filterTpl = 'dateFilter'
            } else if (data.fd_tag === 'stid') {
                this.filterTpl = 'stationFilter'
            } else if (data.fd_tag === 'st_eqid') {
                this.filterTpl = 'deviceFilter'
            } else if (data.fd_tag === 'cityid') {
                this.$message('暂时不支持城市过滤/筛选')
                this.filterTpl = null // 还没写呢
            }
        }
    },
    beforeDestroy () {
        this.$bus.off('expertAnalysisFilter', this.filterType)
    }
}
</script>

<style lang="scss" scoped>
@import './theme/theme.scss';
@import '@comm/assets/themes/scrollbar/s1.scss';
.analysis-body {
    .filter-view {
        height: 31px;
        // background-color: #fff;
        @include page_c(background-color, $bgColor);
        border-radius: 4px;
        margin-bottom: 10px;
        padding-left: 10px;
        line-height: 31px;
        overflow: hidden;

        .view {
            margin-left: 60px;
            height: 100%;
        }
    }

    .group-view {
        width: 100px;
        height: 65px;
        // background-color: #fff;
        @include page_c(background-color, $bgColor);
        border-radius: 4px;
        float: left;
        padding: 0 5px;
        line-height: 22px;

        .label {
            padding-left: 5px;
        }

        .view {
            height: 45px;

            .enter-item {
                margin: 0;
                padding: 0 5px;
                height: max-content;
                font-size: 0;
                line-height: 0;
                display: block;
                margin-bottom: 3px;

                span {
                    font-size: 12px;
                    line-height: 1;
                    display: inline-block;
                }
            }
        }
    }

    .button-view {
        width: 100px;
        height: 65px;
        // background-color: #fff;
        @include page_c(background-color, $bgColor);
        border-radius: 4px;
        float: right;
        text-align: center;
        line-height: 65px;
    }

    .x-y-axis {
        height: 65px;
        margin-left: 103px;
        margin-right: 103px;

        &.hide-group {
            margin-left: 0;
        }

        .x-axis, .y-axis {
            height: 31px;
            line-height: 31px;
            margin-bottom: 3px;

            .label {
                width: 43px;
                height: 31px;
                border-radius: 4px;
                float: left;
                // background-color: #fff;
                @include page_c(background-color, $bgColor);
                line-height: 31px;
                text-align: center;
            }

            .view {
                height: 31px;
                border-radius: 4px;
                margin-left: 46px;
                // background-color: #fff;
                @include page_c(background-color, $bgColor);
                overflow: auto;
            }
        }
    }

    .enter-view {
        &.enter {
            @include c(background-color, rgba($text_c1, .1));
            border-radius: 4px;
        }

        .enter-item {
            display: inline-block;
            padding: 0 1em;
            height: 22px;
            border-radius: 11px;
            border: 2px solid;
            vertical-align: middle;
            line-height: 18px;
            margin: 0 10px;
            cursor: move;

            &:nth-child(4n - 3) {
                border-color: #2FBFCC;
                background-color: rgba(#2FBFCC, .3);
            }

            &:nth-child(4n - 2) {
                border-color: #FB9D2A;
                background-color: rgba(#FB9D2A, .3);
            }

            &:nth-child(4n - 1) {
                border-color: #FF7381;
                background-color: rgba(#FF7381, .3);
            }

            &:nth-child(4n) {
                border-color: #5676E8;
                background-color: rgba(#5676E8, .3);
            }
        }

        .enter-view-placeholder {
            color: #ccc;
            padding-left: 1em;
            pointer-events: none;
            -webkit-user-select: none;
        }
    }

    .chart-view {
        height: calc(100vh - 150px);
        // background-color: #fff;
        @include page_c(background-color, $bgColor);
        margin-top: 10px;
        border-radius: 4px;

        &.v-fullpage {
            margin-top: 0;
        }
    }

}
</style>
