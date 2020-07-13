<template>
    <div class="section section-g">
        <div class="item">
            <p class="title">本月总用电量</p>
            <p class="value BB4FD">{{queryMonth.res.body.data.real_kwh || '-'}}kWh</p>
        </div>
        <div class="item">
            <p class="title">本年总用电量</p>
            <p class="value F676">{{queryYear.res.body.data.real_kwh || '-'}}kWh</p>
        </div>
        <div class="item">
            <p class="title">本月同比增长</p>
            <p class="value BB4FD">{{queryMonth.res.body.data.real_kwh_tb_rate || '-'}}%</p>
        </div>
        <div class="item">
            <p class="title">本年同比增长</p>
            <p class="value F676">{{queryYear.res.body.data.real_kwh_tb_rate || '-'}}%</p>
        </div>
    </div>
</template>

<script>
import { api＿queryStationUseKwhMonthComp, api＿queryStationUseKwhYearComp } from '@comprehensiveEnergy/request/api'
export default {
    data () {
        return {
            queryMonth: api＿queryStationUseKwhMonthComp({
                later: true,
                res: {
                    body: {
                        data: {

                        }
                    }
                }
            }),
            queryYear: api＿queryStationUseKwhYearComp({
                later: true,
                res: {
                    body: {
                        data: {

                        }
                    }
                }
            })
        }
    },
    mounted () {
        this.queryMonth.getData({
                date: new Date().getFullYear().toString() + '-' + (new Date().getMonth() + 1 < 10 ? '0' + (new Date().getMonth() + 1) : (new Date().getMonth() + 1))
                })
        this.queryYear.getData({
                date: new Date().getFullYear().toString() + '-' + (new Date().getMonth() + 1 < 10 ? '0' + (new Date().getMonth() + 1) : (new Date().getMonth() + 1))
                })
    }
}
</script>

<style lang="scss" scoped>
.section-g {
    // padding: 0 .17rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    .BB4FD {
        color: #4BB4FD;
    }
    .F676 {
        color: #30F676;
    }
    .item {
        padding: 0 .17rem;
        flex: 0 0 50%;
        .title {
            font-size: 13px;
            margin-bottom: .08rem;
        }
        .value {
            font-size: 13px;
        }
    }
}
</style>
