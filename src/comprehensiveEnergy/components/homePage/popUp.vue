<template>
    <div
        @click.stop="() => {}"
        :style="{left: left() + 'px', top: top() + 'px'}"
        v-loading="ceDeviceMonitorRtOverviewType.loading"
        class="home-pop-up">
        <header class="header">
            <span class="stName">{{sName}}</span>
            <span @click="goStation" class="router-link">进入项目></span>
            <i @click="$emit('close')" class="iconfont iconguanbi pull-right"></i>
        </header>
        <div class="img-content">

        </div>
        <div class="section section1">
            <pop-item class="p1" label="变压器容量" :value="ceDeviceMonitorRtOverviewType.res.data.capacity || '-'" unit="kVA"></pop-item>
            <pop-item v-if="ceDeviceMonitorRtOverviewType.res.data.acp" class="p2" label="实时功率" :value="ceDeviceMonitorRtOverviewType.res.data.acp[0]" :unit="ceDeviceMonitorRtOverviewType.res.data.acp[1]"></pop-item>
        </div>
        <div class="section section2">
            <pop-item v-if="ceDeviceMonitorRtOverviewType.res.data.dw" class="p3" label="日用电量" :value="ceDeviceMonitorRtOverviewType.res.data.dw[0]" :unit="ceDeviceMonitorRtOverviewType.res.data.dw[1]"></pop-item>
            <pop-item v-if="ceDeviceMonitorRtOverviewType.res.data.dw_m" class="p4" label="月用电量" :value="ceDeviceMonitorRtOverviewType.res.data.dw_m[0]" :unit="ceDeviceMonitorRtOverviewType.res.data.dw_m[1]"></pop-item>
            <pop-item v-if="ceDeviceMonitorRtOverviewType.res.data.dw_y" class="p5" label="年用电量" :value="ceDeviceMonitorRtOverviewType.res.data.dw_y[0]" :unit="ceDeviceMonitorRtOverviewType.res.data.dw_y[1]"></pop-item>
        </div>
    </div>
</template>

<script>
import PopItem from './popItem'
import {
    api＿UserAuthHandleChangeDataType
    , api＿ceDeviceMonitorRtOverviewType
} from '@comprehensiveEnergy/request/api'

const win = window
export default {
    props: {
        x: {
            type: Number,
            required: true
        },
        y: {
            type: Number,
            required: true
        },
        sid: {
            type: Number,
            required: true
        },
        sName: {
            type: String,
            required: true
        }
    },
    data () {
        return {
            visible: true,
            left () {
                const width = 375
                if (this.x < width) return this.x
                if ((this.x + width) > win.innerWidth) return this.x - width
                return this.x - width / 2
            },
            top () {
                const height = 263
                if (this.y < height) return this.y + 4
                if ((this.y + height) > win.innerWidth) return this.y - height + 6
                return this.y - height - 4
            },
            UserAuthHandleChangeDataType: api＿UserAuthHandleChangeDataType({
                later: true,
                sameTimeOnce: true,
                onlyLatest: true
            }),
            ceDeviceMonitorRtOverviewType: api＿ceDeviceMonitorRtOverviewType({
                onlyLatest: true,
                data: {
                    stid: this.sid,
                    type: 25
                },
                res: {
                    data: {}
                }
            })
        }
    },
    methods: {
        close () {
            this.$emit('close')
        },
        async goStation () {
            const o = {dataType: 0, id: this.sid, isGroup: 0, stClass: '01'}
            const res = await this.UserAuthHandleChangeDataType.getData(o)
            if (res.result) {
                await this.$store.dispatch('stationInfo')
                this.$router.push({name: 'Item'})
            }
        }
    },
    mounted () {
        setTimeout(() => {
            document.addEventListener('click', this.close)
        }, 0)
        this.timer = setInterval(() => {
            this.ceDeviceMonitorRtOverviewType.getData()
        }, 5 * 1000)
    },
    beforeDestroy () {
        document.removeEventListener('click', this.close)
        clearInterval(this.timer)
    },
    components: {
        PopItem
    }
}
</script>

<style lang="scss" scoped>
.home-pop-up {
    position: absolute;
    z-index: 2;
    width: 0;
    height: 0;
    width:375px;
    height:263px;
    @include c(background-color, rgba($line_c3, 0.8));
    border:2px solid;
    @include c(border-color, $line_c4);

    .header {
        height:38px;
        @include c(background-color, $bg_c5);
        line-height: 38px;
        font-size: 16px;
        padding-left: 20px;

        .stName {
            opacity: .6;
            display: inline-block;
            max-width: 200px;
            height: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .router-link {
            line-height: 38px;
            font-size: 16px;
            vertical-align: top;
            @include c(color, $text_c1);
            margin-left: 2em;
            cursor: pointer;
        }

        .iconguanbi {
            font-size: 12px;
            margin-right: 8px;
            cursor: pointer;
        }
    }

    .img-content {
        height: 100px;
    }

    .section {
        height: 59px;
        @include c(background-color, $bg_c5);
        padding: 10px 20px;

        .pop-item {
            width: 106px;
        }

        .p1, .p2, .p3 {
            @include c(color, $text_c1);
        }

        .p4 {
            @include c(color, #FFDA2F);
        }

        .p5 {
            @include c(color, #FF822F);
        }
    }

    .section1 {
        margin-bottom: 2px;
    }
}
</style>
