<template>
    <div class="configure-role-module">
        <el-table
            ref="checkboxTable"
            @selection-change="handleSelectionChange"
            :data="tableData"
            :max-height="vh - 300"
            style="width: 80%;margin: 0 auto;border: 1px solid #c7c7c7;background:#a9a9a9;">
            <!-- <el-table-column
                align="center"
                prop="originalName"
                width="80">
                <template slot-scope="scope">
                    <input :value="JSON.stringify(scope.row)" :checked="scope.row.ctrl ? scope.row.checked : true" name="configureRoleCheckbox" :disabled="fixedType === '01' || fixedType === '02' || scope.row.ctrl === 0" type="checkbox"/>
                </template>
            </el-table-column> -->
            <el-table-column
                type="selection"
                :selectable='selectable'
                width="80">
            </el-table-column>
            <el-table-column
                prop="originalName"
                label="名称">
                <template slot-scope="scope">
                    <span :style="{'padding-left': scope.row.level * 2 + 'em'}">{{scope.row.originalName}}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="">
                <template slot-scope="scope">
                    <label v-for="xitem in scope.row.btns" :key="xitem.id" style="margin-right:2em;">
                        <span v-if="(fixedType === '01' || fixedType === '02') && includes(scope.row.btnIds, xitem.id)">
                            <input :disabled="fixedType === '01' || fixedType === '02'" name="btnNames" :checked="scope.row.checked && includes(scope.row.btnIds, xitem.id)" :value="xitem.id" type="checkbox" style="vertical-align:sub;">
                            <span>{{xitem.name}}</span>
                        </span>
                    </label>
                    <span v-if="(fixedType !== '01' && fixedType !== '02')">
                        <label v-for="xitem in scope.row.btns" :key="xitem.id" style="margin-right:15px;">
                            <input name="btnNames" :checked="scope.row.checked && includes(scope.row.btnIds, xitem.id)" :value="xitem.id" type="checkbox" style="vertical-align:sub;">
                            <span>{{xitem.name}}</span>
                        </label>
                    </span>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import {api＿selectCustomModules, api＿updateCustomModules} from '@roleAuthorityManagement/request/api'
import {Table, TableColumn, Message} from 'element-ui'
import mixinWidthHeight from '@comm/mixin/widthHeight'
const $ = window.jQuery
export default {
    mixins: [mixinWidthHeight],
    props: {
        visible: {
            type: Boolean
        },
        detail: {}
    },
    data () {
        return {
            tableData: [],
            roleId: null,
            fixedType: null,
            checkedRows: [],
            selectCustomModules: api＿selectCustomModules({
                later: true,
                onlyLatest: true
            }),
            updateCustomModules: api＿updateCustomModules({
                later: true,
                sameTimeOnce: true,
                onlyLatest: true
            })
        }
    },
    created () {
        this.$bus.on('saveConfigureRoleModule', this.save)
        this.$bus.on('openConfigureRoleModule', this.openModal)
    },
    methods: {
        selectable (row, index) {
            return !(this.fixedType === '01' || this.fixedType === '02' || row.ctrl === 0)
        },
        initCheckedData (rows) {
            this.$nextTick(() => {
                rows.map(row => {
                    let flag = row.ctrl ? row.checked : true
                    if (flag) {
                        this.$refs.checkboxTable.toggleRowSelection(row)
                    }
                })
            })
        },
        openModal () {
            this.roleId = this.detail.roleId
            this.fixedType = this.detail.fixedType
            this.tableData = []
            this.getListData()
        },
        includes (str = '---------', i) {
            return str.includes(i)
        },
        getListData () {
            this.selectCustomModules.getData({roleId: this.roleId, version: 3}).then(res => {
                // test
                // let data = [{appId: 643, appPid: 503, originalName: 'test24', hasChildren: true, checked: false},
                //     {appId: 645, appPid: 643, originalName: 'test24子', hasChildren: false, checked: false},
                //     {appId: 649, appPid: 610, originalName: '测试下', hasChildren: false, checked: false},
                //     {appId: 610, appPid: 502, originalName: '设备故障分析', hasChildren: true, checked: true},
                //     {appId: 502, appPid: 0, originalName: '运行分析', hasChildren: true, checked: true}
                //     ]
                //     this.resetTableData(data)
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
            this.initCheckedData(this.tableData)
        },
        handleSelectionChange (val) {
            this.checkedRows = val
        },
        save () { // 保存
            let appIdArr = []
            let btnIds = []
            // $("input[name='configureRoleCheckbox']:checked").each((index, v) => {
            //     let appId = JSON.parse(v.value).appId
            //     let appPid = JSON.parse(v.value).appPid
            //     if (!appIdArr.includes(appId)) appIdArr.push(appId)
            //     if (appPid !== 0 && !appIdArr.includes(appPid)) appIdArr.push(appPid)
            //     $(v).parents('tr').find('input[name="btnNames"]').each((i, item) => {
            //         if (item.checked) btnIds[index] = btnIds[index] ? (btnIds[index] + ',' + item.value) : item.value
            //     })
            // })
            this.checkedRows.map((v, index) => {
                let appId = v.appId
                let appPid = v.appPid
                if (!appIdArr.includes(appId)) appIdArr.push(appId)
                if (appPid !== 0 && !appIdArr.includes(appPid)) appIdArr.push(appPid)
                $(v).parents('tr').find('input[name="btnNames"]').each((i, item) => {
                    if (item.checked) btnIds[index] = btnIds[index] ? (btnIds[index] + ',' + item.value) : item.value
                })
            })
            const parentAndChildArr = appIdArr.map((v, index) => ({'appId': v, btnIds: btnIds[index] ? btnIds[index] : ''}))
            let formData = {
                roleId: this.roleId,
                ls: parentAndChildArr
            }
            this.updateCustomModules.getData({param: JSON.stringify(formData)}).then(res => {
                if (res.code !== 0) return Message.error(res.msg || res.body || '保存失败')
                this.$emit('updateSuccess')
                Message.success(res.msg || res.body || '保存成功')
            })
        }
    },
    beforeDestroy () {
        this.$bus.off('saveConfigureRoleModule', this.save)
        this.$bus.off('openConfigureRoleModule', this.openModal)
    },
    components: {
        ElTable: Table,
        ElTableColumn: TableColumn
    }
}
</script>

<style lang="scss">
.configure-role-module{
    .el-table th, .el-table td {
        padding: 6px 0;
    }
}
</style>
<style lang="scss" scoped>
.configure-role-module {
    overflow:auto;
}
</style>
