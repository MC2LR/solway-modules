<template>
    <div class="charging-pile-list" v-loading="queryCeStationDeviceType26DayDevice.loading">
        <div class="charging-box">
            <charging-pile
                v-for="item in queryCeStationDeviceType26DayDevice.res.body.data"
                :key="item.eqid"
                :name="item.eq_name"
                :useNumber="item.car_use_number"
                :useStatus="(item.car_use_number > 0) ? '02' : '04'">
            </charging-pile>
        </div>
    </div>
</template>

<script>
import ChargingPile from './chargingPile'
import {api＿queryCeStationDeviceType26DayDevice} from '@comprehensiveEnergy/request/api'
export default {
    data () {
        return {
            queryCeStationDeviceType26DayDevice: api＿queryCeStationDeviceType26DayDevice({
                data: {
                    date: this.$store.getters['stationMonitoring/dateStr'],
                    type: 26
                },
                res: {
                    body: {
                        data: []
                    }
                }
            })
        }
    },
    created () {
        this.$bus.on('dateChange', this.getData)
    },
    methods: {
        getData () {
            if (!this.isToday) this.queryCeStationDeviceType26DayDevice.getData({date: this.dateStr})
        }
    },
    computed: {
        isToday () {
            return this.$store.getters['stationMonitoring/isToday']
        },
        dateStr () {
            return this.$store.getters['stationMonitoring/dateStr']
        }
    },
    beforeDestroy () {
        this.$bus.off('dateChange', this.getData)
    },
    components: {
        ChargingPile
    }
}
</script>

<style lang="scss" scoped>
@import '@comm/assets/themes/scrollbar/s1.scss';
.charging-pile-list {
    padding: 17px 16px;
    position: relative;

    .charging-box {
        height: 100%;
        overflow-y: scroll;

        .charging-pile {
            margin: 7px;
        }
    }
}
</style>
