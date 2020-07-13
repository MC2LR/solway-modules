<template>
  <div class="switch-station">
    <div class="slot-view" @click="dialogVisible = true">
        <slot>
            <div v-if="!hideBtn" class="switch-btn">
                <i class="iconfont icon-dianzhanqiehuan_huabanfuben"></i>
                <span :title="$store.getters.station_name">{{$store.getters.station_name}}</span>
            </div>
        </slot>
    </div>
    <el-dialog custom-class="switch-station" append-to-body :visible.sync="dialogVisible" @open="result = false" width="600px">
        <el-tabs v-model="stClass">
            <el-tab-pane v-for="item in stClassList" :key="item.id" :label="item.name" :name="item.id"></el-tab-pane>
        </el-tabs>
        <station-tree v-if="stClass" :types="types" @closeDialog="manualClosing" :stClass="stClass"></station-tree>
    </el-dialog>
  </div>
</template>

<script>
export default {
    components: {
        StationTree: () => import('./stationTree')
    },
    props: {
        types: {
            type: [String, Array],
            default () {
                return this.$route.meta.requiredSelect
            }
        },
        showStationTree: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            result: false,
            hideBtn: false,
            dialogVisible: this.showStationTree,
            stClass: this.$store.getters.station_class
        }
    },
    created () {
        this.stClass = this.stClass || this.$store.getters.station_class_list[0].id
    },
    computed: {
        stClassList () {
            const list = this.$store.getters.station_class_list
            const hasPv = this.types.some(v => v.indexOf('PV') === 0)
            const hasWp = this.types.some(v => v.indexOf('WP') === 0)
            return list.filter(item => {
                if (item.id === '01' && hasPv) return true
                if (item.id === '02' && hasWp) return true
                return false
            })
        }
    },
    methods: {
        manualClosing () {
            this.result = true
            this.dialogVisible = false
        }
    }
}
</script>
<style lang="scss">
.switch-station.el-dialog .el-dialog__header {
    padding: 0;
}
</style>
<style lang="scss" scoped>
.switch-station {
    display: inline-block;
    width: max-content;
    vertical-align: inherit;
    line-height: normal;

    .slot-view {
        width: max-content;
    }

  .switch-btn {
    width: 160px;
    cursor: pointer;

    i {
      font-size: 20px;
    }

    span {
      font-size: 18px;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 1;
      word-break: keep-all;
      height: 1em;
      display: inline-block;
      width: 130px;
    }
  }
}
</style>
