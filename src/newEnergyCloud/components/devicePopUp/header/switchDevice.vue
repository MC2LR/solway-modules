<template>
    <el-select class="switch-device" v-if="$oc(queryDeviceWithType.res, 'body')" v-model="value" @change="handleChange" filterable placeholder="请选择">
        <el-option
            v-for="item in queryDeviceWithType.res.body"
            :key="item.serialNumber"
            :label="item.name"
            :value="item.stationId + '_' + item.serialNumber">
        </el-option>
    </el-select>
</template>

<script>
import {api＿queryDeviceWithType} from '@newEnergyCloud/request/api'
export default {
    props: {
        data: {
            type: Object
        },
        tab: {
            type: String
        }
    },
    data () {
        return {
            queryDeviceWithType: api＿queryDeviceWithType({
                data: {
                    type: this.data.type
                }
            }),
            value: this.data.stid + '_' + this.data.sn
        }
    },
    methods: {
        handleChange (value) {
            const [stid, eqid] = value.split('_')
            this.$bus.emit('switchDevice', {stid, eqid}, this.tab)
        }
    }
}
</script>

<style lang="scss">
.switch-device.el-select .el-input__inner {
    border: none;
    padding-left: 0;
}
</style>

<style lang="scss" scoped>

</style>
