<template>
    <div class="project-item-one-shanghai">
        <div class="content">
            <div class="content-middle">
                <div class="block-title">截止上月</div>
                <div class="clearfix">
                    <div class="left-part">
                        <p style="margin-bottom:10px;font-size:16px;">{{firstItem.name}}</p>
                        <p>累计发电<span class="total-power-num"> {{firstItem.kwh | numTofixedFilter}} </span>万度</p>
                    </div>
                    <div class="right-part">
                        <div v-for="(item, index) in children" :key="item.id" class="line-progress-con">
                            <el-row>
                                <el-col :span="6" style="text-align:right;padding-right:2em;">{{item.name}}</el-col>
                                <el-col :span="18">
                                    <span class="progress-square"><span class="line-progress" :class="{'progress0' : index === 0, 'progress1' : index === 1, 'progress2' : index === 2}" :style="{'width': item.rate}"></span></span>
                                    {{item.kwh | numTofixedFilter}} 万度
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {api＿powerTotalOfDepStation} from '@/request/api'
import {Row, Col} from 'element-ui'
import {widthHeight, rem} from '@comm/mixin'
export default {
    mixins: [widthHeight, rem],
    data () {
        return {
            firstItem: {},
            children: [],
            powerTotalOfDepStation: api＿powerTotalOfDepStation({
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
    },
    created () {
        this.powerTotalOfDepStation.getData({stcls: '01'}).then(res => {
            this.firstItem = res?.body?.[res.body.length - 1]
            this.children = this.firstItem.children
            // test todo
            // this.firstItem = {id: 38, name: '地铁二期6.8MW项目', kwh: 3189792}
            // this.children = [
            //     {id: 1, name: '龙阳路基地', kwh: 1760840},
            //     {id: 2, name: '富锦路基地', kwh: 967836.8},
            //     {id: 3, name: '三林基地', kwh: 461115.2}
            // ]
            let kwhArr = this.children.map(v => (v.kwh))
            let maxKwh = Math.max(...kwhArr)
            this.children.map(v => {
                v['rate'] = ((v.kwh / maxKwh) * 100) + '%'
            })
        })
    },
    components: {
        ElRow: Row,
        ElCol: Col
    }
}
</script>

<style lang="scss" scoped>
.project-item-one-shanghai {
    color:#fff;
    font-size: 12px;
    padding:12px 20px;
    .content{
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        .content-middle{
            align-items: center;
            width:100%;
        }
    }
    .block-title{
        font-size:16px;
        margin-bottom: 20px;
    }
    .left-part{
        float:left;
        width:34%;
        text-indent: 16px;
        line-height: 24px;
        .total-power-num{
            font-size:22px;
            color:#03F8FE;
        }
    }
    .right-part{
        float:right;
        width:66%;
        .line-progress-con{
            margin-bottom:1em;
            .progress-square{
                display: inline-block;
                height: 8px;
                width:60%;
                margin-right: 1em;
            }
            .line-progress{
                display: inline-block;
                height: 8px;
                &.progress0{
                    background:linear-gradient(90deg,rgba(255,153,102,1),rgba(255,94,98,1));
                }
                &.progress1{
                    background:linear-gradient(90deg,rgba(59,238,226,1),rgba(4,207,174,1));
                }
                &.progress2{
                    background: linear-gradient(90deg,rgba(0,110,234,1),rgba(0,198,251,1));
                }
            }
        }
    }
}
</style>
