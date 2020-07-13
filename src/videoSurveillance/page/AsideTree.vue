<template>
    <div class="aside-tree">
        <div class="tree-view">
            <el-tabs v-if="$oc(queryVideos.res, 'body', '01', 'length') && $oc(queryVideos.res, 'body', '02', 'length')" v-model="treeDataType" @tab-click="reloadTree">
                <el-tab-pane label="光伏" name="01"></el-tab-pane>
                <el-tab-pane label="风电" name="02"></el-tab-pane>
            </el-tabs>
            <ul :id="treeId" class="ztree"></ul>
        </div>
    </div>
</template>

<script>
import '@ztree/ztree_v3/js/jquery.ztree.all'
import '@ztree/ztree_v3/js/jquery.ztree.exhide'
import {api＿queryVideos} from '@videoSurveillance/request/api'
const $ = window.jQuery
export default {
    props: {
        max: {
            type: Number,
            required: true
        }
    },
    data () {
        return {
            treeId: 'ztree_' + parseInt(Math.random() * 1e10),
            ztreeObj: null,
            treeDataType: '01',
            setting: {
                data: {
                    simpleData: {
                        enable: true,
                        idKey: 'id',
                        pIdKey: 'pid'
                    },
                    key: {
                        name: 'name'
                    }
                },
                check: {
                    enable: true
                },
                view: {
                    showIcon: false
                    // fontCss: (treeId, treeNode) => ({color: '#333'})
                },
                callback: {
                    beforeClick: this.nodeBeforeClick,
                    onClick: this.nodeClick,
                    beforeCheck: (treeId, node) => node.checked || this.checkedVideoList.length < this.max,
                    onCheck: this.nodeOnCheck
                }
            },
            queryVideos: api＿queryVideos().subscribe(res => this.treeDataLoad(res)),
            checkedVideoList: []
        }
    },
    created () {
        this.$bus.on(this.$route.name + 'unCheck', this.unCheck)
    },
    methods: {
        treeDataLoad (res) {
            if (res?.body?.['01']?.length) this.treeDataType = '01'
            else if (res?.body?.['02']?.length) this.treeDataType = '02'
            this.$emit('treeLoad', res.body)
            this.treeInit(res)
        },
        reloadTree () {
            this.ztreeObj.destroy()
            this.checkedVideoList = []
            this.$emit('checkedChange', [])
            this.treeInit(this.queryVideos.res)
        },
        treeInit (res = {}) {
            this.ztreeObj = $.fn.zTree.init($('#' + this.treeId), this.setting, res.body?.[this.treeDataType])
            this.ztreeObj.expandAll(true)
        },
        nodeBeforeClick (treeId, data, clickFlag) {
            if (!data.children) return true
            this.ztreeObj.expandNode(data, !data.open, true, true)
            return false
        },
        nodeClick (event, treeId, data, clickFlag) {
            this.ztreeObj.checkNode(data, !data.checked, true, true)
        },
        nodeOnCheck (event, treeId, treeNode) {
            if (treeNode.children) {
                return treeNode.children.forEach(v => this.nodeOnCheck(event, treeId, v))
            }
            treeNode.checked ? this.checked(treeNode) : this.unChecked(treeNode)
        },
        unCheck (node) {
            this.ztreeObj.checkNode(node, false, true, true)
        },
        checked (node) {
            if (this.checkedVideoList.length >= this.max) return this.unCheck(node)
            if (node.ctrl === '02') node.getStreamUrl = this.queryVideos.res.body.destUrl
            this.checkedVideoList.push(node)
            this.$emit('checkedChange', this.checkedVideoList)
        },
        unChecked (node) {
            this.checkedVideoList = this.checkedVideoList.filter(v => v.id !== node.id)
            this.$emit('checkedChange', this.checkedVideoList)
        }
    },
    beforeDestroy () {
        this.$bus.off(this.$route.name + 'unCheck', this.unCheck)
        if (this.ztreeObj) this.ztreeObj.destroy()
    }
}
</script>

<style lang="scss" scoped>
@import "./ztree.css";
@import './theme/theme';
[data-pagetheme="darkBlue"] {
   .aside-tree{
        .ztree>>>.button.noline_close:before,
        .ztree>>>.button.noline_open:before,
        .ztree>>>.button.root_open:before,
        .ztree>>>.button.root_close:before,
        .ztree>>>.button.roots_open:before,
        .ztree>>>.button.roots_close:before,
        .ztree>>>.button.bottom_open:before,
        .ztree>>>.button.bottom_close:before,
        .ztree>>>.button.center_open:before,
        .ztree>>>.button.center_close:before {
            border-color: transparent transparent transparent #BDC0C5;
        }
    }
}
[data-pagetheme="light"] {
   .aside-tree{
        .ztree>>>.button.noline_close:before,
        .ztree>>>.button.noline_open:before,
        .ztree>>>.button.root_open:before,
        .ztree>>>.button.root_close:before,
        .ztree>>>.button.roots_open:before,
        .ztree>>>.button.roots_close:before,
        .ztree>>>.button.bottom_open:before,
        .ztree>>>.button.bottom_close:before,
        .ztree>>>.button.center_open:before,
        .ztree>>>.button.center_close:before {
            border-color: transparent transparent transparent #666;
        }
    }
}

.aside-tree {
    padding: 5px;
    .tree-view {
        overflow: auto;
        width: 100%;
        height: 100%;
        .ztree>>>li a {
            @include page_c(color, $pageAsideTreeNameColor);
        }
    }
}
</style>
