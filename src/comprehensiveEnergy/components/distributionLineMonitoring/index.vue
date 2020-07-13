<template>
    <div class="distributionMonitoring">
        <div class="content">
            <h3 v-for="item in graphs" :key="item.id"><span class="tab-name">{{item.name}}</span></h3>
            <div class="graph-container" v-if="graphs.length">
                <component :is="'svg' + $store.state.currentStationInfo.currentSTID"></component>
            </div>
            <div v-if="graphs.length <= 0" style="height: calc(100vh - 100px);padding-top: 50px;">本电站暂无接线图</div>
        </div>
    </div>
</template>

<script>
import {api＿getWiringGraph} from '@comprehensiveEnergy/request/api'
import mixinWidthHeight from '@comm/mixin/widthHeight'
export default {
    mixins: [mixinWidthHeight],
    data () {
        return {
            graphs: [], // 图
            graphNames: [], // 图名称
            svgUrl: '',
            getWiringGraph: api＿getWiringGraph({
                later: true,
                res: {
                    data: []
                }
            })
        }
    },
    created () {
        this.getWiringGraph.getData()
        this.getWiringGraph.subscribe(res => {
            // res.body = [{id: 26, stId: 4415, num: 1, name: '电气主接线图', type: '01', typeName: '变电站接线图', deviceIds: '1000', svgPath: ''}] // 测试,要删除
            if (res.code === 0 && res.body.length) {
                this.graphs = res.body
                // this.getCurrentGraph(this.graphs[0])
            } else {
                this.graphs = []
                this.graphNames = []
            }
        })
    },
    mounted () {
    },
    methods: {
        // getCurrentGraph (current) {
        //     console.log(current)
        //     // this.svgUrl = current
        // }
    },
    components: {
        svg4177: () => import('./svg/' + 4177) // 蓝景丽家,测试
    },
    beforeDestroy () {
    }
}
</script>

<style lang="scss" scoped>
.distributionMonitoring{
    padding: 10px 30px;
    .content{
        text-align: center;
        h3{
            font-size:14px;
            padding:10px;
            text-align: right;
            color: #06BEBD;
            .tab-name{
                border-bottom:1px solid #06BEBD;
                cursor: pointer;
                padding-bottom: 4px;
            }
        }
        .graph-container{
            width: 100%;
            height: calc(100vh - 130px);
            overflow: auto;
        }
    }
}
</style>

<style lang="scss">
.distributionMonitoring{
    .content{
        @include c(background-color, $bg_c7);
    }
}
</style>
