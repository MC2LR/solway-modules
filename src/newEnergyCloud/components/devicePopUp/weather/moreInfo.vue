<template>
    <div class="more-info">
        <div class="position">
            <span>所属电站：{{otherdeviceCount.res.otherDevice.pstationname || '-'}}</span>
            <span>位置：{{otherdeviceCount.res.otherDevice.address || '-'}}</span>
            <span>设备厂商：{{otherdeviceCount.res.otherDevice.manufname || '-'}}</span>
            <span>产品型号：{{otherdeviceCount.res.otherDevice.productname || '-'}}</span>
        </div>
        <div class="parms">
            <span>主要参数：{{otherdeviceCount.res.otherDevice.mainparameter || '-'}}</span>
            <span>检修工艺卡：{{otherdeviceCount.res.otherDevice.repaircard || '-'}}</span>
        </div>
        <div class="hours">
            <el-row>
                <el-col :span="4">
                    <hour-item label="安装时间" :value="weatherHours.res.begindate" icon="iconfont icon-anzhuang1"></hour-item>
                </el-col>
                <el-col :span="4" :offset="1">
                    <hour-item label="已运行时间" :value="weatherHours.res.runhour + 'h'" icon="iconfont icon-yunhangzhong"></hour-item>
                </el-col>
                <el-col :span="4" :offset="1">
                    <hour-item label="正常时间" :value="weatherHours.res.workHour + 'h'" icon="iconfont icon-zhengchang1"></hour-item>
                </el-col>
                <el-col :span="4" :offset="1">
                    <hour-item label="累计工作时间" :value="weatherHours.res.totalHour + 'h'" icon="iconfont icon-leijishouru"></hour-item>
                </el-col>
                <el-col :span="4" :offset="1">
                    <hour-item label="故障时间" :value="weatherHours.res.faultHour + 'h'" icon="iconfont icon-guzhang1"></hour-item>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import {api＿otherdeviceCount, api＿weatherHours} from '@newEnergyCloud/request/api'
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
            otherdeviceCount: api＿otherdeviceCount({
                data: {
                    pageIndex: 0,
                    param: this.device.id
                },
                res: {
                    otherDevice: {}
                }
            }),
            weatherHours: api＿weatherHours({
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
