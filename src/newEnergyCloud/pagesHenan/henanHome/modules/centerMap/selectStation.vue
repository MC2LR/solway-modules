<template>
    <div class="select-station" @click.stop>
        <input type="text" v-model="showStationName" @focus="showList = true;showStationName = ''" :title="currentStationName" :placeholder="currentStationName">
        <i @click.stop="showList = true;showStationName = ''" class="iconfont henandaosanjiao"></i>
        <ul v-show="showList" class="station-list">
            <li @click="currentStationName = '全部电站'; showStationName = ''; currentStationId = ''; hideList($event, true)">全部</li>
            <li
                v-for="item in showStationList"
                :key="item.stid"
                @click="currentStationName = item.stname; currentStationId = item.stid; hideList($event, true)">
                {{item.cityName + item.countyName + item.stname}}
            </li>
        </ul>
    </div>
</template>

<script>
import {api＿queryStWithLocation} from '@/request/henanApi'
export default {
    data () {
        return {
            baseSearchConditionGetStByRoleAndComIds: api＿queryStWithLocation(),
            currentStationName: '全部电站',
            currentStationId: '',
            showStationName: '',
            showList: false
        }
    },
    created () {
        this.$bus.on(this.$route.name + 'StationChange', this.onChange)
    },
    mounted () {
        document.addEventListener('click', this.hideList)
    },
    methods: {
        onChange () {
            this.currentStationId = this.stid
            this.showStationName = this.currentStationName = this.baseSearchConditionGetStByRoleAndComIds?.res?.body?.find(v => +v.id === +this.stid)?.stationName || '全部电站'
        },
        hideList (event, emit) {
            this.showStationName = this.currentStationId ? this.currentStationName : ''
            this.showList = false
            if (!emit) return
            this.$store.dispatch('userActionRecord/setState', {key: this.$route.name + '_selectedStid', value: this.currentStationId})
            this.$bus.emit(this.$route.name + 'StationChange')
        }
    },
    computed: {
        showStationList () {
            return this.baseSearchConditionGetStByRoleAndComIds?.res?.body?.filter(v => (v.cityName + v.countyName + v.stationName).includes(this.showStationName))?.map(v => ({
                stid: v.id,
                stname: v.stationName.trim(),
                provinceName: v.provinceName,
                cityName: v.cityName,
                countyName: v.countyName
            })) || []
        },
        stid () {
            return this.$store.state.userActionRecord[this.$route.name + '_selectedStid']
        }
    },
    beforeDestroy () {
        this.$bus.on(this.$route.name + 'StationChange', this.onChange)
        document.removeEventListener('click', this.hideList)
    }
}
</script>

<style lang="scss" scoped>
.select-station {
    width:190px;
    height:29px;
    line-height: 27px;
    border:1px solid rgba(52,210,238,.6);
    padding-left: 12px;
    font-size: 14px;
    position: relative;

    input {
        background-color: transparent;
        width: 150px;
        border: none;
        outline: none;
        color: rgba(71, 236, 255, 1);

        &::-webkit-input-placeholder {
            color: rgba(71, 236, 255, 1);
        }
    }

    i.iconfont {
        color: rgba(71, 236, 255, 1);
    }

    ul.station-list {
        position: absolute;
        top: 100%;
        left: 0;
        background:rgba(8,75,161,.9);
        width: 100%;
        max-height: 200px;
        overflow: auto;
        padding: 12px;

        li {
            cursor: pointer;
            line-height: 1.2;
            margin-bottom: 10px;
            font-size: 14px;

            &:hover {
                color: rgba(71, 236, 255, 1);
            }
        }
    }
}
</style>
