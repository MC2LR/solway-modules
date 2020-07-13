<template>
    <div class="wiring-detail">
        <div class="header">
            <el-select v-model="currentWiringId" placeholder="请选择" @change="changeWiring()" style="position:absolute;left:20px;">
                <el-option
                    v-for="item in wiringList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                </el-option>
            </el-select>
            <el-button @click="changeTab('realData')" :type="component === 'realData' ? 'primary' : 'default'">实时数据</el-button>
            <el-button @click="changeTab('historyData')" :type="component === 'historyData' ? 'primary' : 'default'">历史数据</el-button>
        </div>
        <div v-if="component === 'realData'" class="component">
            <div class="realdata-con">
                <span v-if="realData && realData.length === 0" style="padding: 20px;">暂无数据</span>
                <span v-for="item in realData" :key="item.varId" class="realdata"><span class="realdata-name">{{item.name}}</span><span class="realdata-value">{{item.value}}</span></span>
            </div>
        </div>
        <div v-if="component === 'historyData'" class="component">
            <div class="search-condition-line">
                <el-popover
                    ref="popperRef"
                    placement="bottom-start"
                    trigger="manual"
                    v-model="visiblePopover"
                    width="1150">
                    <div class="device-select-popover">
                        <div style="padding-left: 20px;">
                            <span class="search-con">
                                <input type="text" style="height: 28px;border: 1px solid #DCDFE6;" placeholder="可按关键字搜索" class="input-place-hoder" v-model="keywordPoint" @keyup="keywordSearch()" @keydown.enter="keywordSearch()"/>
                                <i class="iconfont iconiconfontsousuokuangsousuo" @click="keywordSearch()"></i>
                            </span>
                        </div>
                        <div class="device-params-con">
                            <div :class="{'device-group': group.length}" v-for="(group, grounIndex) in deviceGroupList" :key="grounIndex">
                                <span v-if="group && group.length">
                                    <span v-for="item in group" :key="item.id" class="device-param" :class="{'selected-status': item.checked === true}" @click="selectPoint(item, group, grounIndex)">{{item.pointName}}</span>
                                </span>
                            </div>
                            <span v-if="deviceGroupList.length <= 0" style="padding-left: 1em;">没有查询到测点</span>
                        </div>
                        <div style="text-align:center;margin-top:9px;">
                            <el-button type="primary" @click="confirmParams()">{{deviceGroupList.length ? '选好了' : '关闭'}}</el-button>
                        </div>
                    </div>
                    <el-input @focus="visiblePopover = true" slot="reference" :readonly="true" placeholder="请选择要查询的指标" prefix-icon="el-icon-search" v-model="selectedGroupName" style="width:620px;"></el-input>
                </el-popover>
                <span class="clear-empty-con" @click="clearInput()"><i class="el-icon-circle-close"></i></span>
                <!-- <el-date-picker
                    v-model="betweenTime"
                    type="datetimerange"
                    @blur="computerTime()"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker> -->
                <el-date-picker
                    v-model="startTime"
                    type="datetime"
                    @change="chooseDate('start')"
                    placeholder="选择开始时间">
                </el-date-picker>
                至
                <el-date-picker
                    v-model="endTime"
                    @change="chooseDate('end')"
                    type="datetime"
                    placeholder="选择结束时间">
                </el-date-picker>
                <el-button type="primary" @click="search()">查询</el-button>
            </div>
            <div class="table-container-wiring">
                <el-table
                    v-loading="getSvgHisDataWiringdiagram.loading"
                    :data="getSvgHisDataWiringdiagram.res.body.data"
                    border
                    :row-style="{'cursor': 'pointer'}"
                    :max-height="vh - 260"
                    row-class-name="row-style"
                    cell-class-name="cell-style"
                    header-row-class-name="header-row-style"
                    header-cell-class-name="header-cell-style"
                    style="width: 100%">
                    <el-table-column
                        :fixed="item.varId === 'dtime' ? true : false"
                        v-for="item in selectedColumnList"
                        :key="item.id"
                        min-width="150px"
                        :label="item.pointName">
                        <template slot-scope="scope">
                            <span v-if="item.varId === 'dtime'">{{new Date(scope.row[item.varId] * 1000).Format('yyyy-MM-dd hh:mm:ss')}}</span>
                            <span v-if="item.varId !== 'dtime'">{{scope.row[item.varId]}}</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div v-if="component === 'historyData'" style="text-align:center;padding:10px;">
            <solway-pagination
                :page-index="getSvgHisDataWiringdiagram.res.body.pageIndex"
                :page-size="getSvgHisDataWiringdiagram.res.body.pageSize"
                :firstPageIndex="1"
                :total="getSvgHisDataWiringdiagram.res.body.totalPage"
                @change="data => getSvgHisDataWiringdiagram.getData(data)">
            </solway-pagination>
        </div>
    </div>
</template>

<script>
import {api＿queryPointsWiringdiagram, api＿getSvgHisDataWiringdiagram, api＿getSvgRtmDataWiringdiagram} from '@/request/api'
import {Select, Option, DatePicker, Dropdown, DropdownMenu, DropdownItem, Message} from 'element-ui'
import solwayPagination from '@/components/pagination'
import mixinWidthHeight from '@comm/mixin/widthHeight'
export default {
    mixins: [mixinWidthHeight],
    props: {
        deviceIds: {},
        stid: {},
        wiringList: {},
        currentWiringId: {},
        visible: {
            type: Boolean
        }
    },
    data () {
        return {
            component: 'realData',
            deviceId: null,
            visiblePopover: false,
            deviceGroupList: [],
            copyPointsList: [],
            currentGroupEqid: null,
            selectedGroupName: '',
            selectedGroup: [],
            keywordPoint: '',
            groupIndex: null,
            selectedColumnList: [], // 选中的table动态列表的列项
            concatTableData: [],
            // betweenTime: [new Date(new Date().getTime() - 86400000), new Date()],
            startTime: new Date(new Date().getTime() - 86400000),
            endTime: new Date(),
            realData: [],
            realDataInterval: null,
            queryPointsWiringdiagram: api＿queryPointsWiringdiagram({
                later: true
            }),
            getSvgHisDataWiringdiagram: api＿getSvgHisDataWiringdiagram({
                later: true,
                res: {
                    body: {
                        points: []
                    }
                }
            }),
            getSvgRtmDataWiringdiagram: api＿getSvgRtmDataWiringdiagram({
                later: true
            })
        }
    },
    created () {
    },
    mounted () {
        this.$bus.on('openWiringDetailModal', this.openModal)
        this.$bus.on('closeWiringDetail', this.closeModal)
    },
    methods: {
        openModal () {
            this.changeTab('realData')
        },
        closeModal () {
            this.visiblePopover = false
        },
        changeTab (type) {
            this.visiblePopover = false
            this.component = type
            if (type === 'realData') {
                this.getRealdata()
                this.realDataInterval = setInterval(() => {
                    this.getRealdata()
                }, 30000)
            }
            if (type === 'historyData') {
                if (this.realDataInterval) clearInterval(this.realDataInterval)
                this.getDeviceParams()
            }
        },
        changeWiring () {
            this.wiringList.map(v => {
                if (this.currentWiringId === v.id) this.deviceIds = v.deviceIds
            })
            this.changeTab(this.component)
        },
        getRealdata () {
            if (this.stid && this.deviceIds) {
                this.getSvgRtmDataWiringdiagram.getData({stid: this.stid, eqids: this.deviceIds, returnType: 1}).then(res => {
                    this.realData = res?.body?.varData
                })
            } else {
                this.realData = []
            }
        },
        // 选择测点
        selectPoint (item, group, groupIndex) {
            if (this.selectedGroup && this.selectedGroup.length === 0) {
                this.currentGroupEqid = group[0].eqid
                this.selectedGroup = group
                this.groupIndex = groupIndex
                item.checked = !item.checked
            } else {
                let hasCheckedflag = false
                this.selectedGroup.map(v => {
                    if (v.checked) {
                        hasCheckedflag = true
                    }
                })
                if (hasCheckedflag && (group[0].eqid !== this.currentGroupEqid)) {
                    Message.error('同时只能选择同一分组内的指标')
                    return false
                }
                this.currentGroupEqid = group[0].eqid
                this.selectedGroup = group
                this.groupIndex = groupIndex
                item.checked = !item.checked
            }
            this.selectedGroupName = ''
            this.selectedGroup.map(v => {
                if (v.checked) {
                    this.selectedGroupName += v.pointName + ', '
                }
            })
        },
        // 获取当前设备类型的参数列表
        getDeviceParams () {
            if (!this.stid || !this.deviceIds) {
                this.deviceGroupList = []
                this.copyPointsList = []
                this.selectedGroupName = ''
                this.currentGroupEqid = null
                this.selectedGroup = []
                this.groupIndex = null
                this.getSvgHisDataWiringdiagram.res = {
                    body: {
                        data: []
                    }
                }
                return false
            }
            if (this.deviceGroupList.length && this.copyPointsList.length) return false
            this.queryPointsWiringdiagram.getData({stid: this.stid, eqids: this.deviceIds, isGroup: 1}).then(res => {
                let deviceGroupList = res?.body
                this.deviceGroupList = []
                this.copyPointsList = []
                if (deviceGroupList && deviceGroupList.length) {
                    for (let i = 0; i < deviceGroupList.length; i++) {
                        if (deviceGroupList[i].length) {
                            this.deviceGroupList.push(deviceGroupList[i].map(v => {
                                return {
                                    ...v,
                                    checked: false
                                }
                            }))
                        }
                    }
                    this.deviceGroupList = [...this.deviceGroupList]
                    this.copyPointsList = [...this.deviceGroupList]
                }
            })
        },
        // keyword搜索
        keywordSearch () {
            this.deviceGroupList = []
            this.copyPointsList.map((item, index) => {
                if (item.length) {
                    this.deviceGroupList[index] = item.filter(v => v['pointName'].includes(this.keywordPoint))
                }
            })
            this.selectedGroupName = ''
            this.deviceGroupList.map(item => {
                if (item.length && (item[0].eqid === this.currentGroupEqid)) {
                    item.map(v => {
                        if (v.checked) {
                            this.selectedGroupName += v.pointName + ', '
                        }
                    })
                }
            })
            this.deviceGroupList.map(item => {
                if (item.length && item[0].eqid !== this.currentGroupEqid) {
                    item.map(v => (v.checked = false))
                }
            })
        },
        // 确认列表中要对比的项（column的列表）
        confirmParams () {
            this.$refs['popperRef'].showPopper = false
            // window.localStorage['wiringDetail'] = JSON.stringify({
            //     groupIndex: this.groupIndex,
            //     currentGroupEqid: this.selectedGroup
            // })
        },
        // 组装列表项
        search () {
            this.visiblePopover = false
            if (this.selectedGroup.length <= 0) {
                Message.error('没有选择到测点，无法查询')
                return false
            }
            this.selectedColumnList = []
            this.selectedGroup.map(v => {
                if (v.checked) {
                    this.selectedColumnList.push(v)
                }
            })
            if (!this.selectedColumnList.length) {
                Message.error('请选择查询的测点')
                return false
            }
            let nums = this.selectedColumnList.map(v => { return v.num }).join(',')
            this.selectedColumnList.unshift({id: 0, pointName: '时间', varId: 'dtime'})
            if (!this.startTime || !this.endTime) {
                Message.error('必须选择开始时间和结束时间')
                return false
            }
            let start = new Date(this.startTime).getTime()
            let end = new Date(this.endTime).getTime()
            if (end < start) {
                Message.error('结束时间不能小于开始时间')
                return false
            }
            if (end > start + 86400000 * 6) {
                Message.error('不能超过7天')
                return false
            }
            let beginTime = new Date(this.startTime).Format('yyyy-MM-dd hh:mm')
            let endTime = new Date(this.endTime).Format('yyyy-MM-dd hh:mm')
            // this.concatTableData = [{id: 1, 'time': '03-20', 'v1000001': '12', 'v1000006': '23'}, {id: 2, 'time': '03-23', 'v1000001': '134', 'v1000006': '11'}]
            this.getSvgHisDataWiringdiagram.getData({stid: this.stid, eqid: this.selectedGroup[0].eqid, nums, beginTime, endTime, pageIndex: 1})
        },
        clearInput () {
            this.selectedGroupName = ''
            this.currentGroupEqid = null
            this.selectedGroup = []
            this.groupIndex = null
            let deviceGroupList = [...this.copyPointsList]
            this.deviceGroupList = []
            if (deviceGroupList && deviceGroupList.length) {
                for (let i = 0; i < deviceGroupList.length; i++) {
                    if (deviceGroupList[i].length) {
                        this.deviceGroupList.push(deviceGroupList[i].map(v => {
                            return {
                                ...v,
                                checked: false
                            }
                        }))
                    }
                }
                this.deviceGroupList = [...this.deviceGroupList]
            }
        },
        // 校验时间
        chooseDate (type) {
            let startTime = new Date(this.startTime).getTime()
            let endTime = new Date(this.endTime).getTime()
            if (type === 'end') {
                if (endTime < startTime) {
                    Message.error('结束时间不能小于开始时间')
                    this.endTime = new Date(startTime + 86400000)
                    return false
                }
                if (endTime > startTime + 86400000 * 6) {
                    Message.error('不能超过7天')
                    this.endTime = new Date(startTime + 86400000 * 6)
                    return false
                }
            }
        }
    },
    beforeDestroy () {
        this.visiblePopover = false
        if (this.realDataInterval) clearInterval(this.realDataInterval)
        this.$bus.off('openWiringDetailModal', this.openModal)
    },
    components: {
        ElSelect: Select,
        ElOption: Option,
        ElDropdown: Dropdown,
        ElDropdownMenu: DropdownMenu,
        ElDropdownItem: DropdownItem,
        solwayPagination,
        ElDatePicker: DatePicker
    }
}
</script>

<style lang="scss">
.device-select-popover{
    .device-params-con{
        margin:10px;
        height: calc(85vh - 220px);
        overflow: auto;
        .device-group{
            border-bottom: 1px solid grey;
            padding: 10px;
        }
        .device-param{
            display: inline-block;
            width: 21%;
            margin-right: 4%;
            max-height: 40px;
            margin-bottom: 10px;
            cursor: pointer;
            vertical-align: top;
            &.selected-status{
                color: #2fbfcc;
            }
        }
    }
}
.wiring-detail{
    .table-container-wiring{
        @import '@comm/assets/themes/table/t3.scss';
    }
    .el-range-editor.el-input__inner {
        padding:0 5px;
    }
    .el-date-editor .el-range-separator {
        padding:0;
    }
}
</style>
<style lang="scss" scoped>
.wiring-detail {
    .header {
        height: 46px;
        line-height: 46px;
        background-color: #fff;
        text-align: center;
        position: relative;
        // top: -40px;
        border-bottom: 1px solid #bfbfbf;
    }
    .el-icon-close {
        position: absolute;
        right: -30px;
        font-size: 30px;
        color: white;
        top: 0px;
        cursor: pointer;
    }
    .clear-empty-con{
        cursor: pointer;
        display:inline-block;
        width: 40px;
        height: 30px;
        background: #e0e0e0;
        line-height: 30px;
        text-align: center;
        position: relative;
        left: -46px;
        z-index: 2003;
    }
    .table-container-wiring{
        height: calc(85vh - 160px);
        margin-top:12px;
    }
    .realdata-con{
        height: calc(85vh - 60px);
        margin-top:12px;
        background: white;
        overflow: auto;
        padding: 10px 0;
        .realdata{
            width:21%;
            margin-right:4%;
            display: inline-block;
            position:relative;
            margin-bottom: 10px;
            // max-height: 40px;
            .realdata-name{
                display: inline-block;
                padding-left: 10px;
                width:78%;
                height: 40px;
                vertical-align: top;
            }
            .realdata-value{
                position:absolute;
                right:0;
            }
        }
    }
    .component{
        padding:10px 20px;
    }
}
</style>
