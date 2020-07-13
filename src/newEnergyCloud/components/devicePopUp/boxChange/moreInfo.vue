<template>
    <div class="more-info">
        <div class="position">
            <span>所属电站：{{bboxChangeCount.res.bboxChange.pstationname || '-'}}</span>
            <span>位置：{{bboxChangeCount.res.bboxChange.address || '-'}}</span>
            <span>设备厂商：{{bboxChangeCount.res.bboxChange.manufname || '-'}}</span>
            <span>产品型号：{{bboxChangeCount.res.bboxChange.productname || '-'}}</span>
        </div>
        <div class="parms">
            <span>主要参数：{{bboxChangeCount.res.bboxChange.mainparameter || '-'}}</span>
            <span>检修工艺卡：{{bboxChangeCount.res.bboxChange.repaircard || '-'}}</span>
        </div>
        <div class="hours">
            <el-row>
                <el-col :span="4">
                    <hour-item label="安装时间" :value="boxChangeHours.res.begindate" icon="iconfont icon-anzhuang1"></hour-item>
                </el-col>
                <el-col :span="4" :offset="1">
                    <hour-item label="已运行时间" :value="boxChangeHours.res.runhour + 'h'" icon="iconfont icon-yunhangzhong"></hour-item>
                </el-col>
                <el-col :span="4" :offset="1">
                    <hour-item label="正常时间" :value="boxChangeHours.res.workHour + 'h'" icon="iconfont icon-zhengchang1"></hour-item>
                </el-col>
                <el-col :span="4" :offset="1">
                    <hour-item label="累计工作时间" :value="boxChangeHours.res.totalHour + 'h'" icon="iconfont icon-leijishouru"></hour-item>
                </el-col>
                <el-col :span="4" :offset="1">
                    <hour-item label="故障时间" :value="boxChangeHours.res.faultHour + 'h'" icon="iconfont icon-guzhang1"></hour-item>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import {api＿bboxChangeCount, api＿boxChangeHours} from '@newEnergyCloud/request/api'
import hourItem from '../header/hourItem'
export default {
    components: {
        hourItem
    },
    props: {
        device: {
            type: Object
        }
    },
    data () {
        return {
            bboxChangeCount: api＿bboxChangeCount({
                data: {
                    pageIndex: 0,
                    param: this.device.id
                },
                res: {
                    bboxChange: {}
                }
            }),
            boxChangeHours: api＿boxChangeHours({
                data: {
                    id: this.device.id
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.more-info {
    width: 100%;
    padding-bottom: 20px;
    cursor: auto;

    .position {
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #ccc;

        span {
            margin-right: 2em;
        }
    }

    .parms {
        height: 40px;
        line-height: 40px;
    }
}
</style>
