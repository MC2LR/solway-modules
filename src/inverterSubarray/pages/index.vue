<template>
    <div class="inverter-subarray">
        <div class="page-body clearfix">
            <div class="body-left">
                <!-- 查询区域 -->
                <div class="filter">
                    <el-form ref="Form" :inline='true' size="small">
                        <el-form-item label="">
                            <el-input
                            v-model="params.groupName"
                            placeholder="请输入分组名称"
                            @input="getGroupList()"
                            >
                                <i class="iconfont icon-iconfontsousuokuangsousuo" slot="suffix" @click="getGroupList()"></i>
                            </el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="add-group-btn">
                    <el-button type="text" style="padding-top: 0;" @click="addGroup()">
                        <span class="add-con"><i class="iconfont icon-xinzeng"></i></span>
                        增加
                    </el-button>
                </div>
                <!-- 表格区域 -->
                <div style="height: vh - 130;background: #fff">
                    <el-table
                        ref='groupTable'
                        :data="deviceGroupList.res.data"
                        v-loading="deviceGroupList.loading"
                        highlight-current-row
                        :cell-style="cellStyle"
                        @cell-click='cellClick'
                        @current-change="handleCurrentChange"
                        style="width: 100%"
                        :height="vh - 130"
                        row-class-name="row-style"
                        cell-class-name="cell-style"
                        header-row-class-name="header-row-style"
                        header-cell-class-name="header-cell-style">
                        <el-table-column
                            prop="groupName"
                            label="分组名称"
                            width="180">
                            <template slot-scope="scope">
                                <el-input v-show="scope.row.edit" size="small" v-model="scope.row.groupName" placeholder="请输入分组名称"></el-input>
                                <span v-show="!scope.row.edit" style="display: inline-block;padding-left: 15px;color: #606266;">{{scope.row.groupName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="longitude"
                            label="经度">
                            <template slot-scope="scope">
                                <el-input type="number" v-show="scope.row.edit" size="small" v-model="scope.row.longitude" placeholder="请输入分组名称" title=""></el-input>
                                <span v-show="!scope.row.edit" style="display: inline-block;padding-left: 15px;color: #606266;">{{scope.row.longitude}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="latitude"
                            label="纬度">
                            <template slot-scope="scope">
                                <el-input type="number" v-show="scope.row.edit" size="small" v-model="scope.row.latitude" placeholder="请输入分组名称" title="" @change="getlat(scope.row)"></el-input>
                                <span v-show="!scope.row.edit" style="display: inline-block;padding-left: 15px;color: #606266;">{{scope.row.latitude}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="position"
                            label="地理位置">
                            <template slot-scope="scope">
                                <el-input v-show="scope.row.edit" size="small" v-model="scope.row.position" placeholder="请选择地理位置" disabled></el-input>
                                <i v-show="scope.row.edit" class="iconfont icon-weizhi"></i>
                                <span v-show="!scope.row.edit" style="display: inline-block;padding-left: 15px;color: #606266;">{{scope.row.position}}</span>
                                <!-- <span style="display: inline-block;padding-left: 15px;color: #606266;">
                                    {{scope.row.position}}
                                    <i class="iconfont icon-iconfontsousuokuangsousuo"></i>
                                </span> -->
                            </template>
                        </el-table-column>
                        <el-table-column
                            fixed="right"
                            width="150px"
                            align="center"
                            label="操作">
                                <template slot-scope="scope">
                                    <span class="table-btn" v-show="!scope.row.edit" @click="editButton(scope.row, scope.$index)" style="padding-right: 8px">
                                        编辑
                                    </span>
                                    <span class="table-btn" v-show="!scope.row.edit" @click="deleteButton(scope.row, scope.$index)">
                                        删除
                                    </span>
                                    <span class="table-btn" v-show="scope.row.edit" @click="yesButton(scope.row, scope.$index)" style="padding-right: 8px">
                                        确定
                                    </span>
                                    <span class="table-btn" v-show="scope.row.edit" @click="cancelButton(scope.row, scope.$index)">
                                        取消
                                    </span>
                                    <span class="table-btn" @click="handleCurrentChange(scope.row)" style="padding-left: 8px">
                                        设备
                                    </span>
                                </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>

            <div class="body-right">
                <el-transfer
                    filterable
                    filter-placeholder="请输入设备名称"
                    :titles="['已加入', '未加入']"
                    :props="{
                        key: 'id',
                        label: 'name'
                    }"
                    v-model="value"
                    :data="deviceGroupListBind.res.data"
                    @change="transferChange">
                </el-transfer>
            </div>

            <!-- 地图 弹框 -->
            <el-dialog
            width="800px"
            height="500px"
            title="地图"
            class="elecDialog"
            :modal="false"
            :visible.sync="mapData.show"
            top='10vh'
            @closed='params.location = ""'
            >
                <el-input
                v-model="params.location"
                placeholder="请输入地理位置"
                style="width: 260px"
                >
                    <i class="iconfont icon-iconfontsousuokuangsousuo" slot="suffix" @click="getLocation()"></i>
                </el-input>
                <baidu-map
                    v-if="mapData.show"
                    class="bm-view"
                    :center="center"
                    :zoom="zoom"
                    @ready="handler"
                    ak="PDG8ovPtyIsvYXNFR55sLYbdSKFql7W7"
                    :scroll-wheel-zoom="true">
                    <!--缩放控件-->
                    <bm-navigation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" ></bm-navigation>
                </baidu-map>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import { api＿deviceGroupList, api＿deviceGroupUpdate, api＿deviceGroupDelete, api＿deviceGroupListBind, api＿deviceGroupListUnbind, api＿deviceGroupDoBind } from '@inverterSubarray/request/api'
import mixinWidthHeight from '@comm/mixin/widthHeight'
import { Table, TableColumn, Select, Option, Form, FormItem, Input, Button, Dialog, MessageBox, Message, Transfer } from 'element-ui'
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
import BmNavigation from 'vue-baidu-map/components/controls/Navigation'

export default {
    mixins: [mixinWidthHeight],
    components: {
        BaiduMap,
        BmNavigation,
        ElTable: Table,
        ElTableColumn: TableColumn,
        ElSelect: Select,
        ElOption: Option,
        ElForm: Form,
        ElFormItem: FormItem,
        ElInput: Input,
        ElButton: Button,
        ElDialog: Dialog,
        ElTransfer: Transfer
    },
    data () {
        return {
            stids: [],
            params: {
                groupName: '',
                location: ''
            },
            stid: 3002,
            deviceGroupList: api＿deviceGroupList({
                later: true,
                res: {
                    data: []
                }
            }),
            deviceGroupUpdate: api＿deviceGroupUpdate({
                later: true,
                res: {
                    data: []
                }
            }),
            deviceGroupDelete: api＿deviceGroupDelete({
                later: true,
                res: {
                    data: []
                }
            }),
            deviceGroupListBind: api＿deviceGroupListBind({
                later: true,
                res: {
                    data: []
                }
            }),
            deviceGroupListUnbind: api＿deviceGroupListUnbind({
                later: true,
                res: {
                    data: []
                }
            }),
            deviceGroupDoBind: api＿deviceGroupDoBind({
                later: true,
                res: {
                    data: []
                }
            }),
            value: [],
            mapData: {
                show: false,
                detail: {}
            },
            center: {lng: 0, lat: 0},
            zoom: 3,
            map: null,
            geoc: null
        }
    },
    created () {
        this.getStationId()
        this.getGroupList()
        this.getNoGroupDevice()
    },
    methods: {
        getStationId (variable) {
            this.stid = window.location.href.split('?')[1].split('=')[1]
        },
        getGroupList () {
            this.deviceGroupList.getData({
                'search.deviceType_eq': 2,
                'search.stid_eq': this.stid,
                'search.groupName_like': this.params.groupName
            }).then(res => {
                this.$refs.groupTable && this.$refs.groupTable.setCurrentRow(res.data[0])
                res.data.forEach((v, i) => {
                    v.edit = false
                    v.index = i
                })
                this.$forceUpdate()
            })
        },
        getNoGroupDevice () {
            this.deviceGroupListUnbind.getData({
                stid: this.stid,
                deviceType: 2
            }).then((res) => {
                this.value = []
                res.data.length && res.data.forEach(v => {
                    this.value.push(v.id)
                })
            })
        },
        editButton (row, index) {
            var editFlag = this.deviceGroupList.res.data.some(v => v.edit)
            if (editFlag) return Message.error('每次仅限编辑一条')
            this.$nextTick(() => {
                row.edit = true
                this.$set(this.deviceGroupList.res.data, index, row)
            })
        },
        yesButton (row, index) {
            if (!row.groupName) return Message.error('请输入分组名称')
            this.$nextTick(() => {
                this.deviceGroupUpdate.getData({
                    id: row.id || null,
                    stid: row.stid || this.stid,
                    deviceType: 2,
                    groupName: row.groupName,
                    position: row.position,
                    longitude: row.longitude,
                    latitude: row.latitude
                }).then((res) => {
                    if (res.code === 200) {
                        this.getGroupList()
                        row.edit = false
                        this.$set(this.deviceGroupList.res.data, index, row)
                        Message.success('操作成功')
                    } else Message.error('操作失败')
                })
            })
        },
        deleteButton (row) {
            MessageBox.confirm('确定删除吗?', '提示', {
                cancelButtonText: '取消',
                confirmButtonText: '确定',
                type: 'warning'
                }).then(() => {
                    this.deviceGroupDelete.getData({
                        id: row.id
                    }).then((res) => {
                        if (res.code === 200) {
                            this.getGroupList()
                            return Message.success('删除成功')
                        }
                        Message.error('删除失败')
                    })
            })
        },
        cancelButton (row, index) {
            if (!row.id) return this.deviceGroupList.res.data.splice(index, 1)
            row.edit = false
            this.$set(this.deviceGroupList.res.data, index, row)
        },
        addGroup () {
            this.deviceGroupList.res.data.splice(0, 0, {
                deviceType: 2,
                groupName: '',
                id: null,
                latitude: null,
                longitude: null,
                position: null,
                stid: this.stid,
                edit: true
            })
        },
        handleCurrentChange (val) {
            this.currentRow = val
            if (!this.currentRow?.id) return
            this.deviceGroupListUnbind.getData({
                stid: this.stid,
                deviceType: 2
            }).then((res) => {
                this.value = []
                res.data.length && res.data.forEach(v => {
                    this.value.push(v.id)
                })

                this.deviceGroupListBind.getData({
                    stid: this.stid,
                    deviceType: 2,
                    groupId: this.currentRow.id
                }).then((res) => {
                    res.data = [...res.data, ...this.deviceGroupListUnbind.res.data]
                })
            })
        },
        transferChange (value, direction, movedKeys) {
            this.deviceGroupDoBind.getData({
                flag: direction === 'right' ? 0 : 1,
                deviceType: 2,
                groupId: this.currentRow.id,
                deviceIds: movedKeys.join()
            }).then((res) => {
                if (res.code === 200) return Message.success('操作成功')
                Message.error('操作失败')
            })
        },
        // 地理位置cell样式
        cellStyle ({ row, column, rowIndex, columnIndex }) {
            if (column.property === 'position') return 'cursor: pointer'
            return ''
        },
        // 点击地理位置
        cellClick (row, column, cell, event) {
            if (column.property === 'position') {
                if (!row.edit) return
                this.mapData.detail = row
                this.mapData.show = true
            }
        },
        handler ({BMap, map}) {
            this.center.lng = this.mapData.detail.longitude || 116.404
            this.center.lat = this.mapData.detail.latitude || 39.915
            this.zoom = 15
            this.setMapClick(BMap, map)
        },
        setMapClick (BMap, map) {
            this.map = map
            map.addEventListener('click', clickCallback)
            const that = this
            function clickCallback (e) {
                that.mapData.detail.longitude = e.point.lng
                that.mapData.detail.latitude = e.point.lat
                this.geoc = new BMap.Geocoder()
                this.geoc.getLocation(e.point, function (rs) {
                    let addComp = rs.addressComponents
                    that.mapData.detail.position = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber

                    Message.success({
                        message: `经度: ${e.point.lng} \xa0 纬度: ${e.point.lat} \xa0 详细位置: ${that.mapData.detail.position}`,
                        duration: 4500
                    })
                    that.$set(that.deviceGroupList.res.data, that.mapData.detail.index, that.mapData.detail)
                })
            }
        },
        getLocation () {
            this.map.centerAndZoom(this.params.location, 11)
        }
        // getlat (row) {
        //     let obj = {
        //         lng: row.longitude,
        //         lat: row.latitude
        //     }
        //     this.geoc.getLocation(obj, function (rs) {
        //         const addComp = rs.addressComponents
        //         console.log(addComp)
        //     })
        // }
    }
}
</script>

<style lang="scss">
.inverter-subarray {
    @import '@comm/assets/themes/table/t5.scss';
    .filter {
        .el-form-item {

            .el-form-item__label {
                color: #606266;
            }

            .el-input__inner {
                border: none;
            }

            .el-input__suffix {
                right: 10px;
            }

            .el-input--suffix .el-input__inner {
                padding-right: 10px;
            }
        }
    }
    .el-pagination.is-background .el-pager li {
        background: #fff;
    }
    // .el-table__body tr:hover td {
    //     color: #fff;
    // }
    .el-table__empty-text {
        color: #fff;
    }
    .el-table__body tr.current-row > td {
        background: #57dde6;
    }
    .el-table .header-row-style {
        color: #000 !important;
        font-size: 14px;
    }
    .el-table .el-input {
        width: 88%;
    }
    .el-table .el-input.is-disabled .el-input__inner {
        color: #414141;
    }
    .el-table .icon-weizhi {
        font-size: 18px;
    }

    .body-right {
        .el-transfer {
            height: 100%;
            .el-transfer-panel {
                width: calc(50% - 81px);
                height: 100%;
                .el-input {
                    width: calc(100% - 20px);
                }
                .el-transfer-panel__body {
                    height: calc(100% - 40px);
                    .el-transfer-panel__list {
                        height: calc(100% - 32px);
                    }
                }
            }
            .el-transfer__buttons {
                padding: 0 20px;
            }
        }
    }
    .el-dialog {
        right: -250px;
        .el-input {
            width: 200px;
            padding-bottom: 10px;
            .el-input__suffix-inner {
                line-height: 34px;
            }
        }
    }
}
</style>

<style lang="scss" scoped>
.inverter-subarray {
    height: 100%;
    padding: 20px 10px;
    .page-body {
        height: 100%;
        .body-left {
            float: left;
            width: 60%;
            margin-right: 10px;
            .add-group-btn {
                padding-bottom: 10px;
            }
            .table-btn {
                cursor: pointer;
            }
        }
        .body-right {
            float: left;
            width: calc(40% - 10px);
            height: 100%;
            // background: #fff;
            padding-top: 86px;
        }

        .bm-view {
            width: 100%;
            height: 500px;
        }
    }

}
</style>
