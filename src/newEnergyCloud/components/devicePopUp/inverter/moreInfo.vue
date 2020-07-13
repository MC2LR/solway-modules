<template>
    <div class="more-info">
        <div class="position">
            <span>所属箱变：{{inverterCount.res.inverter.boxname || '-'}}</span>
            <span>位置：{{inverterCount.res.inverter.address || '-'}}</span>
            <span>逆变器室：{{inverterCount.res.inverter.inverterroom || '-'}}</span>
            <span>逆变器组：{{inverterCount.res.inverter.invertergid || '-'}}</span>
            <span>设备厂商：{{inverterCount.res.inverter.manufname || '-'}}</span>
            <span>产品型号：{{inverterCount.res.inverter.productname || '-'}}</span>
        </div>
        <div class="parms">
            <span>主要参数：{{inverterCount.res.inverter.mainparameter || '-'}}</span>
            <span>检修工艺卡：{{inverterCount.res.inverter.repaircard || '-'}}</span>
        </div>
        <div class="hours">
            <el-row>
                <el-col :span="4">
                    <hour-item label="安装时间" :value="inverterHours.res.begindate" icon="iconfont icon-anzhuang1"></hour-item>
                </el-col>
                <el-col :span="4" :offset="1">
                    <hour-item label="已运行时间" :value="inverterHours.res.runhour + 'h'" icon="iconfont icon-yunhangzhong"></hour-item>
                </el-col>
                <el-col :span="4" :offset="1">
                    <hour-item label="正常时间" :value="inverterHours.res.workHour + 'h'" icon="iconfont icon-zhengchang1"></hour-item>
                </el-col>
                <el-col :span="4" :offset="1">
                    <hour-item label="累计工作时间" :value="inverterHours.res.totalHour + 'h'" icon="iconfont icon-leijishouru"></hour-item>
                </el-col>
                <el-col :span="4" :offset="1">
                    <hour-item label="故障时间" :value="inverterHours.res.faultHour + 'h'" icon="iconfont icon-guzhang1"></hour-item>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import {api＿inverterCount, api＿inverterHours} from '@newEnergyCloud/request/api'
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
            inverterCount: api＿inverterCount({
                data: {
                    pageIndex: 0,
                    param: this.device.id
                },
                res: {
                    inverter: {}
                }
            }),
            inverterHours: api＿inverterHours({
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
