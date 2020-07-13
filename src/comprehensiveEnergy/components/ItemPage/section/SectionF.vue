<template>
    <div class="section section-f">
        <CommItem
            size="small"
            label="温度传感器"
            :value="ceDeviceCountTypeMult.res.data[31]"
            unit="个"
        ></CommItem>
        <CommItem
            size="small"
            label="烟感传感器"
            :value="ceDeviceCountTypeMult.res.data[32]"
            unit="个"
        ></CommItem>
        <CommItem
            size="small"
            label="水位传感器"
            :value="ceDeviceCountTypeMult.res.data[33]"
            unit="个"
        ></CommItem>
        <CommItem
            size="small"
            label="摄像头"
            :value="ceDeviceCountTypeMult.res.data[41]"
            unit="个"
        ></CommItem>
    </div>
</template>

<script>
import CommItem from '../../homePage/item'
import {api＿ceDeviceCountTypeMult} from '@comprehensiveEnergy/request/api'

export default {
    data () {
        return {
            ceDeviceCountTypeMult: api＿ceDeviceCountTypeMult({
                data: {
                    types: '31,32,33,41'
                },
                res: {
                    data: {
                        31: '',
                        32: '',
                        33: '',
                        41: ''
                    }
                }
            })
        }
    },
    components: {
        CommItem
    }
}
</script>

<style lang="scss" scoped>

</style>
