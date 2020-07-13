<template>
    <div class="expert-analysis-left">
        <div class="btn-group clearfix">
            <el-button @click="changeDataType(0)" :type="dataType === 0 ? 'primary' : 'default'" size="small" class="pull-left" :class="{'theme-dark': themeName === 'dark'}">汇总计算数据</el-button>
            <el-button @click="changeDataType(1)" :type="dataType === 1 ? 'primary' : 'default'" size="small" class="pull-right" :class="{'theme-dark': themeName === 'dark'}">分钟原始数据</el-button>
        </div>

        <div class="data-form">
            <el-select :key="dataType" :value="dataSource" @change="changeDataSource">
                <el-option
                    v-for="(item, index) in dataClassification[dataType].ds"
                    :key="item.k"
                    :label="item.n"
                    :value="index">
                </el-option>
            </el-select>
        </div>

        <div class="dimensions">
            <div class="title" :class="{'theme-dark': themeName === 'dark'}">维度</div>
            <ul v-if="$oc(dataClassification, dataType, 'ds', dataSource)">
                <li
                    draggable
                    @dragend="dragend"
                    @dragstart="dragstart({dragSource: dragSource.original, data: {...item, dataType: 'dimension'}})"
                    v-for="item in dataClassification[dataType].ds[dataSource].fd_1"
                    :key="item.fd_tag">
                    {{item.fd_name}}
                </li>
            </ul>
        </div>

        <div class="targets">
            <div class="title" :class="{'theme-dark': themeName === 'dark'}">指标</div>
            <el-input v-model="targetSearchKey" size="mini" placeholder="搜索"></el-input>
            <ul v-if="$oc(dataClassification, dataType, 'ds', dataSource)">
                <li
                    draggable
                    @dragend="dragend"
                    @dragstart="dragstart({dragSource: dragSource.original, data: {...item, dataType: 'target'}})"
                    v-for="item in targetList"
                    :key="item.fd_key">
                    {{item.fd_name}}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import {moduleName, DragSource as dragSource} from './store'
import theme from './theme/theme'

export default {
    mixins: [theme],
    data () {
        return {
            dragSource,
            targetSearchKey: ''
        }
    },
    created () {
        this.initDataClassification()
    },
    computed: {
        ...mapState(moduleName, [
            'dataClassification',
            'dataType',
            'dataSource'
        ]),
        targetList () {
            return this.dataClassification[this.dataType].ds[this.dataSource].fd_2.filter(v => v.fd_name.includes(this.targetSearchKey))
        }
    },
    methods: {
        ...mapActions(moduleName, [
            'initDataClassification',
            'dragstart',
            'dragend',
            'changeDataType',
            'changeDataSource'
        ])
    }
}
</script>

<style lang="scss">
.expert-analysis-left {
    .el-select {
        .el-input__inner {
            border: none;
        }
    }
}
</style>

<style lang="scss" scoped>
@import './theme/theme.scss';
.expert-analysis-left {
    overflow: hidden;
    border-radius: 4px;

    .btn-group {
        .el-button {
            width: 48%;
            margin-left: 0;
            border: none;
            border-radius: 4px;
            padding-left: 0;
            padding-right: 0;

            &.el-button--default.theme-dark {
                background:#18305B;
                color: $text_c1;
            }
        }
    }

    .data-form {
        // background-color: #fff;
        // background-color: #18305B;
        @include page_c(background-color, $bgColor);
        margin-top: 10px;
        padding: 2px 0;
        border-radius: 4px;
    }

    .dimensions, .targets {
        // background-color: #fff;
        // background-color: #18305B;
        @include page_c(background-color, $bgColor);
        margin-top: 10px;
        border-radius: 4px;

        .title {
            line-height: 38px;
            padding-left: 1em;
            box-shadow:0px 2px 1px 0px rgba(237,239,249,0.55);

            &.theme-dark {
                box-shadow:0px 2px 1px 0px rgba(#191E3B,0.55);
            }
        }

        ul {
            padding: 10px 0;
            overflow: auto;

            li {
                line-height: 2;
                padding-left: 1em;
                cursor: move;

                &:hover {
                    @include c(color, $text_c1);
                }
            }
        }
    }

    .dimensions {
        ul {
            height: 110px;
        }
    }

    .targets {
        .el-input {
            margin: 1em;
            width: 155px;
        }
        ul {
            height: calc(100vh - 368px);
            padding-top: 0;
        }
    }
}
</style>
