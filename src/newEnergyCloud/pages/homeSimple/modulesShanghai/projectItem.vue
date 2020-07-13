<template>
    <!-- <div class="project-item-shanghai">
        <div class="clearfix project-item-con clearfix">
            <div class="pull-left item-left">
                <div class="content">
                    <div class="content-middle">
                        <div class="scroll-area">
                            <div class="child-item">
                                <el-row class="column-header">
                                    <el-col :span="10" class="item-row text-left">项目名称</el-col>
                                    <el-col :span="7" class="item-row">电量(万度)</el-col>
                                    <el-col :span="7" class="item-row">收益(万元)</el-col>
                                </el-row>
                            </div>
                            <div class="project-item">
                                <el-row>
                                    <el-col :span="10" class="item-row text-left"><div :title="firstItem.name">{{firstItem.name || '-'}}</div></el-col>
                                    <el-col :span="7" class="item-row"><div class="num" :title="firstItem.sendKwhDisp">{{firstItem.sendKwhDisp | numTofixedFilter}}</div></el-col>
                                    <el-col :span="7" class="item-row"><div class="num" :title="firstItem.sendKwhProfit">{{firstItem.sendKwhProfit | numTofixedFilter}}</div></el-col>
                                </el-row>
                            </div>
                            <div v-for="item in firstItem.children" :key="item.id" class="child-item">
                                <el-row>
                                    <el-col :span="10" class="item-row text-left"><div :title="item.name">{{item.name || '-'}}</div></el-col>
                                    <el-col :span="7" class="item-row"><div class="num" :title="item.sendKwhDisp">{{item.sendKwhDisp | numTofixedFilter}}</div></el-col>
                                    <el-col :span="7" class="item-row"><div class="num" :title="item.sendKwhProfit">{{item.sendKwhProfit | numTofixedFilter}}</div></el-col>
                                </el-row>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="pull-left item-right">
                <div class="content">
                    <div class="content-middle">
                        <div class="scroll-area">
                            <div class="child-item">
                                <el-row class="column-header">
                                    <el-col :span="10" class="item-row text-left">项目名称</el-col>
                                    <el-col :span="7" class="item-row">电量(万度)</el-col>
                                    <el-col :span="7" class="item-row">收益(万元)</el-col>
                                </el-row>
                            </div>
                            <div class="project-item">
                                <el-row>
                                    <el-col :span="10" class="item-row text-left"><div :title="secondItem.name">{{secondItem.name || '-'}}</div></el-col>
                                    <el-col :span="7" class="item-row"><div class="num" :title="secondItem.sendKwhDisp">{{secondItem.sendKwhDisp | numTofixedFilter}}</div></el-col>
                                    <el-col :span="7" class="item-row"><div class="num" :title="secondItem.sendKwhProfit">{{secondItem.sendKwhProfit | numTofixedFilter}}</div></el-col>
                                </el-row>
                            </div>
                            <div v-for="item in secondItem.children" :key="item.id" class="child-item">
                                <el-row>
                                    <el-col :span="10" class="item-row text-left"><div :title="item.name">{{item.name || '-'}}</div></el-col>
                                    <el-col :span="7" class="item-row"><div class="num" :title="item.sendKwhDisp">{{item.sendKwhDisp | numTofixedFilter}}</div></el-col>
                                    <el-col :span="7" class="item-row"><div class="num" :title="item.sendKwhProfit">{{item.sendKwhProfit | numTofixedFilter}}</div></el-col>
                                </el-row>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div> -->
    <div class="project-item-shanghai">
        <div class="clearfix project-item-con clearfix">
            <div class="pull-left item-left">
                <div class="scroll-area-test">
                    <div class="child-item">
                        <el-row class="column-header">
                            <el-col :span="13" class="item-row text-left">项目名称</el-col>
                            <el-col :span="6" class="item-row text-left">电量(万度)</el-col>
                            <el-col :span="5" class="item-row">收益(万元)</el-col>
                        </el-row>
                    </div>
                    <div class="project-item">
                        <el-row>
                            <el-col :span="13" class="item-row text-left"><div :title="firstItem.name">{{firstItem.name || '-'}}</div></el-col>
                            <el-col :span="6" class="item-row"><div class="num" :title="firstItem.sendKwhDisp">{{firstItem.sendKwhDisp | numTofixedFilter}}</div></el-col>
                            <el-col :span="5" class="item-row"><div class="num" :title="firstItem.sendKwhProfit">{{firstItem.sendKwhProfit | numTofixedFilter}}</div></el-col>
                        </el-row>
                    </div>
                    <div v-for="item in firstItem.children" :key="item.id" class="child-item">
                        <el-row>
                            <el-col :span="13" class="item-row text-left"><div :title="item.name">{{item.name || '-'}}</div></el-col>
                            <el-col :span="6" class="item-row"><div class="num" :title="item.sendKwhDisp">{{item.sendKwhDisp | numTofixedFilter}}</div></el-col>
                            <el-col :span="5" class="item-row"><div class="num" :title="item.sendKwhProfit">{{item.sendKwhProfit | numTofixedFilter}}</div></el-col>
                        </el-row>
                    </div>
                </div>
            </div>
            <div class="pull-left item-right">
                <div class="scroll-area-test">
                    <div class="child-item">
                        <el-row class="column-header">
                            <el-col :span="13" class="item-row text-left">项目名称</el-col>
                            <el-col :span="6" class="item-row text-left">电量(万度)</el-col>
                            <el-col :span="5" class="item-row">收益(万元)</el-col>
                        </el-row>
                    </div>
                    <div class="project-item">
                        <el-row>
                            <el-col :span="13" class="item-row text-left"><div :title="secondItem.name">{{secondItem.name || '-'}}</div></el-col>
                            <el-col :span="6" class="item-row"><div class="num" :title="secondItem.sendKwhDisp">{{secondItem.sendKwhDisp | numTofixedFilter}}</div></el-col>
                            <el-col :span="5" class="item-row"><div class="num" :title="secondItem.sendKwhProfit">{{secondItem.sendKwhProfit | numTofixedFilter}}</div></el-col>
                        </el-row>
                    </div>
                    <div v-for="item in secondItem.children" :key="item.id" class="child-item">
                        <el-row>
                            <el-col :span="13" class="item-row text-left"><div :title="item.name">{{item.name || '-'}}</div></el-col>
                            <el-col :span="6" class="item-row"><div class="num" :title="item.sendKwhDisp">{{item.sendKwhDisp | numTofixedFilter}}</div></el-col>
                            <el-col :span="5" class="item-row"><div class="num" :title="item.sendKwhProfit">{{item.sendKwhProfit | numTofixedFilter}}</div></el-col>
                        </el-row>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {api＿queryCurrStProfit} from '@/request/api'
import {Row, Col} from 'element-ui'
import {widthHeight, rem} from '@comm/mixin'
export default {
    mixins: [widthHeight, rem],
    data () {
        return {
            firstItem: [],
            secondItem: [],
            queryCurrStProfit: api＿queryCurrStProfit({
                later: true
            })
        }
    },
    filters: {
        numTofixedFilter: function (value) {
            if (!value && value !== 0) {
                return '-'
            } else if (value === 0) {
                return 0
            } else {
                return (value / 10000).toFixed(1)
            }
        }
    },
    methods: {
        // asfd
    },
    created () {
        this.queryCurrStProfit.getData({stcls: '01'}).then(res => {
            this.firstItem = res?.data?.[0]
            this.secondItem = res?.data?.[1]
            // this.firstItem = {id: 1, sendKwhDisp: null, sendKwhProfit: 1122233, name: '地铁一期10MW项目', children: [{id: 1, sendKwhDisp: 10000.5, sendKwhProfit: 120005.2, name: '川杨河基地11号线运行库'}, {id: 1, sendKwhDisp: 24234, sendKwhProfit: 1122233, name: '治北0.5MW'}, {id: 1, sendKwhDisp: 24234, sendKwhProfit: 1122233, name: '金桥1.5MW'}]}
            // this.secondItem = {id: 1, sendKwhDisp: undefined, sendKwhProfit: 0, name: '地铁二期6.8MW项目', children: [{id: 1, sendKwhDisp: 10000.5, sendKwhProfit: 120005.2, name: '龙阳路7.6MW'}, {id: 1, sendKwhDisp: 24234, sendKwhProfit: 1122233, name: '三林0.5MW'}, {id: 1, sendKwhDisp: 24234, sendKwhProfit: 1122233, name: '富锦路1.5MW'}]}
        })
    },
    components: {
        ElRow: Row,
        ElCol: Col
    }
}
</script>

<style lang="scss" scoped>
.project-item-shanghai {
    color:#fff;
    font-size: 12px;
    .project-item-con{
        height: 100%;
        // padding:15px ;
        .content{
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
        }
        .content-middle{
            align-items: center;
            width:100%;
        }
        .item-left{
            width:50%;
            height: 100%;
            padding-left: 15px;
        }
        .item-right{
            width:50%;
            height: 100%;
            padding-left: 10px;
        }
        .project-item{
            font-size:16px;
            margin-bottom: 15px;
            text-align: center;
        }
        .column-header{
            font-size:12px;
            color:rgba(255,255,255,0.5);
        }
        .item-row{
            line-height: 2.5em;
            >div{
                white-space:nowrap;
                text-overflow:ellipsis;
                overflow: hidden;
                width: 100%;
            }
            .num{
                font-size:14px;
            }
        }
        .child-item{
            font-size:16px;
            margin-left: 10px;
            text-align: center;
        }
        .scroll-area{
            max-height: calc(45vh - 50px);
            overflow: auto;
        }
        .scroll-area-test{
            padding-top: 60px;
            max-height: calc(45vh - 50px);
            overflow: auto;
        }
    }
}
</style>
