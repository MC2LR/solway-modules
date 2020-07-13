<template>
    <div class="more-info">
        <div class="position">
            <span>所属电站：{{$oc(otherdeviceCount.res, 'body', 'device', 'stationName')}}</span>
            <span>设备厂商：{{$oc(otherdeviceCount.res, 'body', 'device', 'manufName')}}</span>
            <span>产品型号：{{$oc(otherdeviceCount.res, 'body', 'device', 'productName')}}</span>
        </div>
        <div class="parms">
            <!-- <span>主要参数：{{otherdeviceCount.res.otherDevice.mainparameter || '-'}}</span>
            <span>检修工艺卡：{{otherdeviceCount.res.otherDevice.repaircard || '-'}}</span> -->
        </div>
        <div class="hours">
            <el-row>
                <el-col :span="4">
                    <hour-item label="安装时间" :value="$useful($oc(deviceHours.res, 'body', 'begindate'), '--')" icon="iconfont icon-anzhuang1"></hour-item>
                </el-col>
                <el-col :span="4" :offset="1">
                    <hour-item label="已运行时间" :value="$useful($oc(deviceHours.res, 'body', 'runhour'), '--') + 'h'" icon="iconfont icon-yunhangzhong"></hour-item>
                </el-col>
                <el-col :span="4" :offset="1">
                    <hour-item label="正常时间" :value="$useful($oc(deviceHours.res, 'body', 'workHour'), '--') + 'h'" icon="iconfont icon-zhengchang1"></hour-item>
                </el-col>
                <el-col :span="4" :offset="1">
                    <hour-item label="累计工作时间" :value="$useful($oc(deviceHours.res, 'body', 'totalHour'), '--') + 'h'" icon="iconfont icon-leijishouru"></hour-item>
                </el-col>
                <el-col :span="4" :offset="1">
                    <hour-item label="故障时间" :value="$useful($oc(deviceHours.res, 'body', 'faultHour'), '--') + 'h'" icon="iconfont icon-guzhang1"></hour-item>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import {api＿getDeviceInfoWidthDialog, api＿getDeviceHours} from '@newEnergyCloud/request/api'
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
            otherdeviceCount: api＿getDeviceInfoWidthDialog({
                data: {
                    pageIndex: 0,
                    id: this.device.id,
                    type: 18,
                    stid: this.device.stid
                },
                res: {
                    otherDevice: {}
                }
            }),
            deviceHours: api＿getDeviceHours({
                data: {
                    id: this.device.id,
                    type: 18
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
