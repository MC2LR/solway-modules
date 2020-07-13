<template>
    <div>
        <el-tabs v-model="treeType">
            <el-tab-pane label="部门" name="stationTree"></el-tab-pane>
            <el-tab-pane label="行政区域" name="stationTreeRegion"></el-tab-pane>
        </el-tabs>
        <div class="lately">
            <span
                class="recently-name"
                v-for="item in recentlyStation"
                :key="item.currentSTID"
                @click="() => changeStation({id: item.currentSTID, stClass, dataType: item.currentType - 1})">
                {{item.currentDataName}}
            </span>
        </div>
        <el-input v-model="input" ref="nodeKeyWords" placeholder="关键字搜索"></el-input>
        <div class="tree-view" v-loading="switchLoading">
            <ul :id="treeId" class="ztree"></ul>
        </div>
    </div>
</template>

<script>
import '@ztree/ztree_v3/js/jquery.ztree.all'
import '@ztree/ztree_v3/js/jquery.ztree.exhide'
import fuzzySearch from './fuzzysearch'
const $ = window.jQuery

export default {
    props: {
        stClass: {
            type: String
        },
        types: {
            type: [String, Array]
        }
    },
    data () {
        return {
            treeId: 'ztree_' + parseInt(Math.random() * 1e10),
            input: '',
            treeType: this.$store.state.station.currentTreeType,
            dialogVisible: false,
            ztreeObj: null,
            switchLoading: false,
            setting: {
                data: {
                    simpleData: {
                        enable: true,
                        pIdKey: 'pid'
                    }
                },
                view: {
                    showIcon: false,
                    fontCss: (treeId, treeNode) => {
                        const disabledCss = {color: '#999'}
                        if (!this.hasStation && treeNode.busiType === 1) return disabledCss
                        if (!this.hasCompany && treeNode.busiType > 1) return disabledCss
                        return {color: '#333'}
                    }
                },
                callback: {
                    beforeClick: this.nodeBeforeClick,
                    onClick: this.nodeClick
                }
            }
        }
    },
    created () {
        this.$store.dispatch('station/stationTree', this.stClass)
        this.$store.dispatch('station/stationTreeRegion', this.stClass)
    },
    mounted () {
        this.treeInit()
    },
    methods: {
        treeInit () {
            const ztreeObj = this.ztreeObj = $.fn.zTree.init($('#' + this.treeId), this.setting, this.tree)
            ztreeObj.expandNode(ztreeObj.getNodes()[0], true)
            fuzzySearch(this.treeId, this.$refs.nodeKeyWords.$el.children[0], null, true)
        },
        nodeBeforeClick (treeId, data, clickFlag) {
            if (!this.hasStation && data.busiType === 1) return false
            if (!this.hasCompany && data.busiType > 1) {
                this.ztreeObj.expandNode(data, !data.open, true, true)
                return false
            }
            return true
        },
        nodeClick (event, treeId, data, clickFlag) {
            this.changeStation({
                id: data.busiId,
                stClass: this.stClass,
                dataType: data.busiType - 1
            })
        },
        async changeStation (data) {
            this.switchLoading = true
            if (this.treeType === 'stationTreeRegion') data.isGroup = 2
            try {
                const res = await this.$store.dispatch('station/changeStation', data)
                if (res.result) this.$emit('closeDialog')
                this.switchLoading = false
            } catch (error) {
                this.switchLoading = false
            }
        }
    },
    computed: {
        tree () {
            return this.$store.state.station[this.treeType || this.$store.state.station.currentTreeType][this.stClass]
        },
        hasStation () {
            return this.types.includes('PV_STATION') || this.types.includes('WP_STATION')
        },
        hasCompany () {
            return this.types.includes('PV_COMPANY') || this.types.includes('WP_COMPANY')
        },
        recentlyStation () {
            let recently = this.$store.getters.station_recently(this.types).filter(v => v.currentSTClass === this.stClass)
            const obj = {}
            recently = recently.reduce((item, next) => {
                if (!obj[next.currentSTID]) obj[next.currentSTID] = true && item.push(next)
                return item
            }, [])
            return recently.slice(0, 5)
        }
    },
    watch: {
        stClass (newValue, oldValue) {
            if (newValue === oldValue) return
            this.$store.dispatch('station/stationTree', newValue)
        },
        tree () {
            if (this.ztreeObj) this.ztreeObj.destroy()
            this.$nextTick(this.treeInit)
        }
    },
    beforeDestroy () {
        if (this.ztreeObj) this.ztreeObj.destroy()
    }
}
</script>
<style lang="scss" scoped>
@import "./ztree.css";
.lately {
    margin-bottom: 10px;

    .recently-name {
        cursor: pointer;
        margin-right: 2em;

        &:hover {
            @include c(color, $text_c1);
        }
    }
}
.tree-view {
    height: 400px;
    overflow: auto;
    margin: 15px 0;
}
</style>
