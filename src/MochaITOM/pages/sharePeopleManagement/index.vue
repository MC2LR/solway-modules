<template>
    <div class="sharePeopleManagement clearfix">
        <div class="head clearfix">
            <div class="head-con">
                <div class="tabs">
                    <el-button class="tab" :class="{'active': tabIndex === 0}" @click="keyword = '';query(0)">公开人员</el-button>
                    <el-button class="tab" :class="{'active': tabIndex === 1}" @click="keyword = '';query(1)">已加入公司</el-button>
                </div>
                <el-button class="searchSharePeople" @click.stop="searchSharePeople.show = true;">查找共享电工加入公司</el-button>
            </div>
            <div class="filter pull-left">
                <el-form ref="Form" :inline='true' size="small">
                    <el-form-item>
                        <el-input
                        v-model="keyword"
                        placeholder="请输入姓名/电话/城市"
                        @input="query()"
                        >
                            <i class="iconfont iconsousuo" slot="suffix" @click="query()"></i>
                        </el-input>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="page-body">
            <!-- 公开人员 -->
            <el-table
                v-if="tabIndex === 0"
                :data="apiAuthWechatUserWithOpen.res.data"
                v-loading="apiAuthWechatUserWithOpen.loading"
                style="width: 100%"
                :max-height="vh - 150"
                row-class-name="row-style"
                cell-class-name="cell-style"
                header-row-class-name="header-row-style"
                header-cell-class-name="header-cell-style">
                <el-table-column
                    prop="realname"
                    label="姓名"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="phone"
                    label="电话"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="registerTime"
                    label="注册时间"
                    :formatter="(row, column, cellValue, index) => cellValue ? new Date(cellValue).Format('yyyy-MM-dd') : ''">
                </el-table-column>
                <el-table-column
                    prop="position"
                    label="最近活跃城市">
                </el-table-column>
                <el-table-column
                    prop="authStatus"
                    label="实名认证"
                    :formatter="(row, column, cellValue, index) => cellValue === '01' ? '未认证' : cellValue === '02' ? '认证通过' : '认证失败'">
                </el-table-column>
                <el-table-column
                    prop="skill"
                    label="技能描述">
                </el-table-column>
                <el-table-column
                    width="100px"
                    align="center"
                    label="操作">
                    <template slot-scope="scope">
                        <div
                            title="加入到公司"
                            @click.stop="addGroup.show = true;addGroup.detail = scope.row"
                            style="cursor: pointer;color: #2FBFCC;">
                            <span style="vertical-align: middle;display:block">加入到公司</span>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 已加入公司 -->
            <el-table
                v-if="tabIndex === 1"
                :data="apiAuthWechatUserWithCompany.res.data"
                v-loading="apiAuthWechatUserWithCompany.loading"
                style="width: 100%"
                :max-height="vh - 150"
                row-class-name="row-style"
                cell-class-name="cell-style"
                header-row-class-name="header-row-style"
                header-cell-class-name="header-cell-style">
                <el-table-column
                    prop="realname"
                    label="姓名"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="phone"
                    label="电话"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="registerTime"
                    label="注册时间"
                    :formatter="(row, column, cellValue, index) => cellValue ? new Date(cellValue).Format('yyyy-MM-dd') : ''">
                </el-table-column>
                <el-table-column
                    prop="position"
                    label="最近活跃城市">
                </el-table-column>
                <el-table-column
                    prop="authStatus"
                    label="实名认证"
                    :formatter="(row, column, cellValue, index) => cellValue === '01' ? '未认证' : cellValue === '02' ? '认证通过' : '认证失败'">
                </el-table-column>
                <el-table-column
                    prop="skill"
                    label="技能描述">
                </el-table-column>
                <el-table-column
                    prop="remark"
                    label="人员备注(常驻地+职业)"
                    width="200">
                    <template slot-scope="scope">
                        <div style="cursor: pointer;color: #2FBFCC;" @click.stop="peopleRemark.show = true;peopleRemark.detail = JSON.parse(JSON.stringify(scope.row))">
                            <span>{{scope.row.remark}}</span>
                            <i class="iconfont iconbianji-copy"></i>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="stations"
                    label="电站">
                    <template slot-scope="scope">
                        <div @click.stop="alreadyAddGroup.show = true;alreadyAddGroup.detail = scope.row"
                            style="cursor: pointer;color: #2FBFCC;">
                            <span v-for="v in scope.row.stations" :key="v.stationId">{{v.stationName}}&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <i class="iconfont iconbianji-copy"></i>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!-- <solway-pagination
            :page-index="pageInterfaceObj.res.pageIndex"
            :page-size="pageInterfaceObj.res.pageSize"
            :total="pageInterfaceObj.res.total"
            @change="query">
        </solway-pagination> -->

        <!-- 公开人员加入公司 弹框 -->
        <el-dialog
        width="1000px"
        height="500px"
        title="公开人员加入公司"
        center
        :visible.sync="addGroup.show"
        top='10vh'
        @opened="$bus.emit('openAddGroup')"
        >
            <public-people-join v-if="addGroup.show" :detail="addGroup.detail"></public-people-join>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addGroup.show = false">取 消</el-button>
                <el-button type="primary" @click="$bus.emit('saveAddGroup')">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 指定人员加入公司 弹框 -->
        <el-dialog
        width="800px"
        height="500px"
        title="指定人员加入公司"
        center
        :visible.sync="searchSharePeople.show"
        top='10vh'
        @opened="$bus.emit('openSearchSharePeople')"
        >
            <appoint-people-join v-if="searchSharePeople.show" :detail="searchSharePeople.detail"></appoint-people-join>
            <div slot="footer" class="dialog-footer">
                <el-button @click="searchSharePeople.show = false">取 消</el-button>
                <el-button type="primary" @click="$bus.emit('saveSearchSharePeople')">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 已加入公司的共享人员 - 指定人员归属电站 弹框 -->
        <el-dialog
        width="800px"
        height="500px"
        title="指定人员归属电站"
        center
        :visible.sync="alreadyAddGroup.show"
        top='10vh'
        @opened="$bus.emit('openAlreadyAddGroup')"
        >
            <already-people-join v-if="alreadyAddGroup.show" :detail="alreadyAddGroup.detail"></already-people-join>
            <div slot="footer" class="dialog-footer">
                <el-button @click="alreadyAddGroup.show = false">取 消</el-button>
                <el-button type="primary" @click="$bus.emit('saveAlreadyAddGroup')">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 人员备注 弹框 -->
        <el-dialog
        width="500px"
        height="300px"
        title="人员备注(常驻地+职业)"
        center
        :visible.sync="peopleRemark.show"
        top='10vh'
        @opened="$bus.emit('openInvoice')"
        >
            <el-input v-model="peopleRemark.detail.remark" placeholder="常驻地+职业" @input="$forceUpdate()"></el-input>
            <div slot="footer" class="dialog-footer">
                <el-button @click="peopleRemark.show = false">取 消</el-button>
                <el-button type="primary" @click="handlePeopleRemark()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { api＿apiAuthWechatUserWithOpen, api＿apiAuthWechatUserWithCompany, api＿apiAuthWechatUpdateUser } from '@MochaITOM/request/api'
import solwayPagination from '@/components/pagination'
import mixinWidthHeight from '@comm/mixin/widthHeight'
import publicPeopleJoin from './publicPeopleJoin'
import appointPeopleJoin from './appointPeopleJoin'
import alreadyPeopleJoin from './alreadyPeopleJoin'

export default {
    mixins: [mixinWidthHeight],
    components: {
        solwayPagination,
        publicPeopleJoin,
        appointPeopleJoin,
        alreadyPeopleJoin
    },
    data () {
        return {
            stids: [],
            keyword: '',
            tabIndex: 0,
            pageInterfaceObj: null,
            addGroup: {
                show: false,
                detail: {}
            },
            searchSharePeople: {
                show: false,
                detail: {}
            },
            alreadyAddGroup: {
                show: false,
                detail: {}
            },
            peopleRemark: {
                show: false,
                detail: {}
            },
            apiAuthWechatUserWithOpen: api＿apiAuthWechatUserWithOpen({
                later: true,
                res: {
                    body: []
                }
            }),
            apiAuthWechatUserWithCompany: api＿apiAuthWechatUserWithCompany({
                later: true,
                res: {
                    body: []
                }
            }),
            apiAuthWechatUpdateUser: api＿apiAuthWechatUpdateUser({
                later: true,
                res: {
                    body: []
                }
            })
        }
    },
    created () {
        this.query(0)
        this.$bus.on('updateList', this.query)
    },
    methods: {
        query (i = this.tabIndex) {
            this.tabIndex = i
            if (this.tabIndex === 0) {
                this.apiAuthWechatUserWithOpen.getData({
                    busiType: '02',
                    keyword: this.keyword
                })
                this.pageInterfaceObj = this.apiAuthWechatUserWithOpen
            } else {
                this.apiAuthWechatUserWithCompany.getData({
                    busiType: '02',
                    keyword: this.keyword
                })
                this.pageInterfaceObj = this.apiAuthWechatUserWithCompany
            }
            this.alreadyAddGroup.show = false
            this.searchSharePeople.show = false
            this.addGroup.show = false
        },
        getStationList () {
            this.baseSearchConditionGetStByRoleAndComIds.getData({
                companyId: this.stId === 0 ? '' : this.stId
            })
        },
        handlePeopleRemark () {
             this.apiAuthWechatUpdateUser.getData({
                id: this.peopleRemark.detail.id,
                remark: this.peopleRemark.detail.remark
            }).then(res => {
                if (res.code !== 200) return this.$message({message: res.msg || '提交失败', type: 'error'})
                this.$message({message: res.msg || '提交成功', type: 'success'})
                this.peopleRemark.show = false
                this.query()
            })
        }
    }
}
</script>

<style lang="scss">
.sharePeopleManagement {
    .filter {
        .el-form-item {

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
    // @import '@comm/assets/themes/table/t5.scss';
    @import '@comm/assets/themes/table/pageTheme/table_light1.scss';

    .el-pagination.is-background .el-pager li {
        background: #fff;
    }
    .el-table__body tr.hover-row > td {
        color: #fff;
    }
    .el-table__empty-text {
        color: #fff !important;
    }

    .head {
        .el-button {
            border-radius: 0;
            border: none;
        }
        .el-button + .el-button {
            margin-left: 0;
            display: block;
            float: right;
        }
    }

}
</style>

<style lang="scss" scoped>
.sharePeopleManagement {
    height: 100vh;
    padding: 20px 10px;
    .head {
        .switch-station {
            line-height: 37px;
        }

        .head-con {
            .tabs {
                width: max-content;
                display: inline-block;
                .tab {
                    &.active {
                        background: #2FBFCC;
                        color: #fff;
                    }
                    display: inline-block;
                    text-align: center;
                }
            }
            .searchSharePeople {
                background: #2FBFCC;
                color: #fff;
                text-align: center;
                border-radius: 4px;
                margin-left: 30px;
            }
        }
    }

    .filter {
        width: calc(100% - 160px);
        padding-top: 20px;
        .iconfont.icon-iconfontsousuokuangsousuo {
            height: 34px;
            line-height: 34px;
            color: #73767C;
            font-size: 20px;
        }
    }
    .page-body {
        height: calc(100vh - 150px);
        background: #fff;
    }
    .pagination {
        text-align: center;
        padding-top: 10px;
    }
}
</style>
