<template>
    <div class="weather weather-resource clearfix" v-if="pvMonitorGetRunResList.res.body">
        <i class="iconfont" :class="weatherIcon[pvMonitorGetRunResList.res.body[0].weatherTag]"></i>
        <div class="pull-right">
            <span>{{pvMonitorGetRunResList.res.body[0].tempDesc}}</span>
            <div></div>
            <span>{{(pvMonitorGetRunResList.res.body[0].tempReal || []).join('') || '-℃'}}</span>
        </div>
    </div>
</template>

<script>
import {api＿pvMonitorGetRunResList} from '@comprehensiveEnergy/request/api'

export default {
    data () {
        return {
            pvMonitorGetRunResList: api＿pvMonitorGetRunResList({
                data: {
                    dateType: 3,
                    queryType: 3,
                    date: (new Date()).Format('yyyy-MM-dd')
                },
                res: {
                    body: [{
                        tempReal: []
                    }]
                }
            }),
            weatherIcon: {
                A: 'iconqingtian1',
                B: 'iconyin',
                C: 'iconyu1',
                D: 'iconweather_snow',
                E: 'iconmai',
                X: 'iconother'
            }
        }
    },
    created () {
        this.timer = setInterval(() => {
            this.pvMonitorGetRunResList.getData()
        }, this.$store.state.second.dataInterval)
    },
    beforeDestroy () {
        clearInterval(this.timer)
    }
}
</script>

<style lang="scss" scoped>
.weather-resource {
    max-height: 100%;

    i.iconfont {
        font-size: 0.3em;
        float: left;
    }

    .pull-right {
        display: inline-block;
        margin-top: 0.1em;
        height: 100%;
        margin-left: 0.15em;

        span {
            font-size: 0.16em;
            line-height: 1.5;
            float: left;
        }
    }
}
</style>
