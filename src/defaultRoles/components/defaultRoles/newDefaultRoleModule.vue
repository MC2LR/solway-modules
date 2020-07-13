<template>
    <div class="add-default-role-module">
        <el-table
            :data="tableData"
            :max-height="vh - 150"
            style="width: 80%;margin: 0 auto;border: 1px solid #c7c7c7;background:#a9a9a9;">
            <el-table-column
                align="center"
                prop="originalName"
                width="80">
                <template slot-scope="scope">
                    <input :value="JSON.stringify(scope.row)" name="addRoleModuleIds" v-if="!scope.row.hasChildren" type="checkbox"/>
                </template>
            </el-table-column>
            <el-table-column
                prop="originalName"
                label="名称">
                <template slot-scope="scope">
                    <span :style="{'padding-left': scope.row.level * 2 + 'em'}">{{scope.row.originalName}}</span>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import {api＿queryUnSelectModules, api＿updateConfigDefaultRoleModules} from '@/request/api'
import {Table, TableColumn, Message} from 'element-ui'
import mixinWidthHeight from '@comm/mixin/widthHeight'
const $ = window.jQuery
export default {
    mixins: [mixinWidthHeight],
    props: {
        visible: {
            type: Boolean
        },
        versionId: {},
        roleType: {}
    },
    data () {
        return {
            tableData: [],
            queryUnSelectModules: api＿queryUnSelectModules({
                later: true,
                onlyLatest: true
            }),
            updateConfigDefaultRoleModules: api＿updateConfigDefaultRoleModules({
                later: true,
                sameTimeOnce: true,
                onlyLatest: true
            })
        }
    },
    created () {
        this.$bus.on('saveAddDefaultRole', this.save)
        this.$bus.on('openAddDefaultRoleModule', this.openModal)
    },
    methods: {
        openModal () {
            this.getUnAddModuleList()
        },
        getUnAddModuleList () {
            this.queryUnSelectModules.getData({roleType: this.roleType, version: this.versionId}).then(res => {
                if (res.code === 0) {
                    this.resetTableData(res.body)
                } else {
                    this.tableData = []
                }
            })
        },
        forRoll (item, data) {
            item['children'] = []
            data.map(v => {
                if (item.appId === v.appPid) {
                    item['children'].push(v)
                    if (v.hasChildren === true) {
                        this.forRoll(v, data)
                    }
                }
            })
        },
        flatArray (arr = [], level = 0) {
            arr.map(item => {
                item['level'] = level
                this.result.push(item)
                if (item.hasChildren === true) {
                    this.flatArray(item.children, level + 1)
                }
            })
        },
        resetTableData (data) {
            this.result = []
            let ids = data.map(v => v.appId)
            let level1Data = []
            data.map(v => {
                if (!ids.includes(v.appPid)) {
                    v['level'] = 1
                    level1Data.push(v)
                }
            })
            level1Data.map(v => {
                if (v.hasChildren === true) {
                    this.forRoll(v, data)
                }
            })
            this.flatArray(level1Data)
            this.tableData = this.result
        },
        save () { // 保存
            let stationIdsArr = []
            $("input[name='addRoleModuleIds']:checked").each((index, v) => {
                let appId = JSON.parse(v.value).appId
                let appPid = JSON.parse(v.value).appPid
                if (!stationIdsArr.includes(appId)) stationIdsArr.push(appId)
                if (appPid !== 0 && !stationIdsArr.includes(appPid)) stationIdsArr.push(appPid)
            })
            this.updateConfigDefaultRoleModules.getData({
                roleType: this.roleType,
                version: this.versionId,
                apps: stationIdsArr.map(v => ({
                    appId: v,
                    btnIds: ''
                }))
            }).then(res => {
                if (res.code !== 0) return Message.error(res.msg || res.body || '保存失败')
                this.$emit('updateSuccess')
                Message.success(res.msg || res.body || '保存成功')
            })
        }
    },
    beforeDestroy () {
        this.$bus.off('saveAddDefaultRole', this.save)
        this.$bus.off('openAddDefaultRoleModule', this.openModal)
    },
    components: {
        ElTable: Table,
        ElTableColumn: TableColumn
    }
}
</script>

<style lang="scss">
.add-default-role-module{
    .el-table th, .el-table td {
        padding: 6px 0;
    }
}
</style>
<style lang="scss" scoped>
.add-default-role-module {
    overflow:auto;
}
</style>
