<template>
    <div class="more-info">
        <div class="position">
            <span>所属逆变器：{{bjunctionCount.res.bjunctionBox.boxname || '-'}}</span>
            <span>位置：{{bjunctionCount.res.bjunctionBox.address || '-'}}</span>
            <span>设备厂商：{{bjunctionCount.res.bjunctionBox.manufname || '-'}}</span>
            <span>产品型号：{{bjunctionCount.res.bjunctionBox.productname || '-'}}</span>
        </div>
        <div class="parms">
            <span>主要参数：{{bjunctionCount.res.bjunctionBox.mainparameter || '-'}}</span>
            <span>检修工艺卡：{{bjunctionCount.res.bjunctionBox.repaircard || '-'}}</span>
        </div>
        <div class="hours">
            <el-row>
                <el-col :span="4">
                    <hour-item label="安装时间" :value="junctionBoxHours.res.begindate" icon="iconfont icon-anzhuang1"></hour-item>
                </el-col>
                <el-col :span="4" :offset="1">
                    <hour-item label="已运行时间" :value="junctionBoxHours.res.runhour + 'h'" icon="iconfont icon-yunhangzhong"></hour-item>
                </el-col>
                <el-col :span="4" :offset="1">
                    <hour-item label="正常时间" :value="junctionBoxHours.res.workHour + 'h'" icon="iconfont icon-zhengchang1"></hour-item>
                </el-col>
                <el-col :span="4" :offset="1">
                    <hour-item label="累计工作时间" :value="junctionBoxHours.res.totalHour + 'h'" icon="iconfont icon-leijishouru"></hour-item>
                </el-col>
                <el-col :span="4" :offset="1">
                    <hour-item label="故障时间" :value="junctionBoxHours.res.faultHour + 'h'" icon="iconfont icon-guzhang1"></hour-item>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import {api＿bjunctionCount, api＿junctionBoxHours} from '@newEnergyCloud/request/api'
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
            bjunctionCount: api＿bjunctionCount({
                data: {
                    pageIndex: 0,
                    param: this.device.id
                },
                res: {
                    bjunctionBox: {}
                }
            }),
            junctionBoxHours: api＿junctionBoxHours({
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
