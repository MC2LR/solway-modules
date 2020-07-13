<template>
    <div class="executor-dialog">
        <div class="executor-header">选择执行人</div>
        <div class="executor-type-tab">
            <el-button size="small" class="executor-type" :class="{'executor-type-active': currentExecutorType === 'profession'}" @click="changeExecutorType('profession')">专业运维</el-button>
            <el-button size="small" style="margin-left:150px;" class="executor-type" :class="{'executor-type-active': currentExecutorType === 'share'}" @click="changeExecutorType('share')">共享电工</el-button>
        </div>
        <div style="margin: 10px 60px;">
            <div>
                <el-input v-model="keyword" @input="keywordSearch()" placeholder="关键字查询" style="width:110px;"></el-input>
                <span v-if="currentExecutorType === 'profession'" class="selected-person-part">
                    已选：<span class="selected-person-con"><span class="selected-person" v-for="(item, index) in checkedRows" :key="item.id">{{item.realname}}<span class="delete-person" @click="deleteCurrentPerson(index, item)">×</span></span></span>
                </span>
                <span v-if="currentExecutorType === 'share'" class="selected-person-part">
                    已选：<span class="selected-person-con"><span class="selected-person" v-if="selectedShareItem.id">{{selectedShareItem.realname}}<span class="delete-person" @click="selectedShareItem = null">×</span></span></span>
                </span>
            </div>
            <div v-if="currentExecutorType === 'share'" class="clearfix">
                <div class="share-tab" @click="changeShareTab('1')"><span :class="{'share-tab-active': currentShareTab === '1'}">电站内电工</span></div>
                <div class="share-tab" @click="changeShareTab('2')"><span :class="{'share-tab-active': currentShareTab === '2'}">公司内电工</span></div>
                <div class="share-tab" @click="changeShareTab('3')"><span :class="{'share-tab-active': currentShareTab === '3'}">公开电工</span></div>
            </div>
            <div class="executor-table-con">
                <!-- 专业人员 -->
                <el-table
                    ref="professionTable"
                    v-if="currentExecutorType === 'profession'"
                    v-loading="peopleProfessinalData.loading"
                    :data="professionConcatArr"
                    border
                    @selection-change="handleSelectionChange"
                    :row-style="{'cursor': 'pointer'}"
                    :max-height="vh - 380"
                    row-class-name="row-style"
                    cell-class-name="cell-style"
                    header-row-class-name="header-row-style"
                    header-cell-class-name="header-cell-style"
                    style="width: 100%">
                    <el-table-column
                        type="selection"
                        :selectable='selectable'
                        text-align="center"
                        width="80">
                    </el-table-column>
                    <el-table-column
                        prop="realname"
                        label="姓名">
                    </el-table-column>
                    <el-table-column
                        prop="phone"
                        label="电话">
                    </el-table-column>
                </el-table>
                <!-- 共享人员 -->
                <div v-if="currentExecutorType === 'share'" class="share-line-con">
                    <!-- 候选电工 -->
                    <div v-if="currentShareTab === '1'">
                        <p style="margin-bottom: 15px;">挂在该电站下的候选人</p>
                        <div v-for="item in shareConcatArr" :key="item.id" class="share-line"><el-radio v-model="radio1" :label="item.id" @change="changeRadio(1, item)">{{item.realname}}（{{item.remark}}）</el-radio></div>
                    </div>
                    <!-- 其他电工 -->
                    <div v-if="currentShareTab === '2'">
                        <div v-for="item in shareConcatArr" :key="item.id" class="share-line">
                            <el-row>
                                <el-col :span="2">
                                    <el-radio v-model="radio2" :label="item.id" @change="changeRadio(2, item)">&nbsp;</el-radio>
                                </el-col>
                                <el-col :span="5">{{item.realname}}</el-col>
                                <el-col :span="4">{{item.position || '-'}}</el-col>
                                <el-col :span="4">接单{{item.times}}次</el-col>
                                <el-col :span="3">{{item.score}}分</el-col>
                                <el-col :span="6">{{item.skill || '-'}}</el-col>
                            </el-row>
                        </div>
                    </div>
                    <!-- 公开电工 -->
                    <div v-if="currentShareTab === '3'">
                        <div v-for="item in shareConcatArr" :key="item.id" class="share-line">
                            <el-row>
                                <el-col :span="2">
                                    <el-radio v-model="radio3" :label="item.id" @change="changeRadio(3, item)">&nbsp;</el-radio>
                                </el-col>
                                <el-col :span="5">{{item.realname}}</el-col>
                                <el-col :span="4">{{item.position || '-'}}</el-col>
                                <el-col :span="4">接单{{item.times}}次</el-col>
                                <el-col :span="3">{{item.score}}分</el-col>
                                <el-col :span="6">{{item.skill || '-'}}</el-col>
                            </el-row>
                        </div>
                    </div>
                </div>
            </div>
            <div style="text-align:center;padding:20px;">
                <el-button @click="cancel()">取消</el-button>
                <el-button type="primary" @click="selectPeople()">确定</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import {peopleProfessinal, peopleShare, peopleSharePublic, getTimesAndScore} from '@/request/api'
import {Message} from 'element-ui'
import mixinWidthHeight from '@comm/mixin/widthHeight'
export default {
    mixins: [mixinWidthHeight],
    props: {
        stid: {},
        currentExecutorTypeProp: {},
        handlerIdList: {},
        handlerNameList: {},
        personsArr: {}
    },
    data () {
        return {
            currentExecutorType: 'profession', // 默认专业人员
            currentShareTab: '1', // 共享人员tab，默认候选电工
            keyword: null,
            radio1: null,
            radio2: null,
            radio3: null,
            professionConcatArr: [], // 专业人员，过滤后的
            shareConcatArr: [], // 共享人员，过滤后的
            checkedRows: [], // 已选中的专业人员（多个）
            selectedShareItem: {}, // 已选中的共享电工（仅有一个）
            peopleProfessinalData: peopleProfessinal({
                later: true
            }),
            peopleShareData: peopleShare({
                later: true,
                cacheParams: false
            }),
            peopleSharePublicData: peopleSharePublic({
                later: true
            }),
            getTimesAndScoreData: getTimesAndScore({
                later: true
            })
        }
    },
    methods: {
        handleSelectionChange (val) {
            this.checkedRows = val
        },
        selectable (row, index) {
            return !row.hasChildren
        },
        // 切换tab，专业或共享
        changeExecutorType (type) {
            this.keyword = null
            this.currentExecutorType = type
            if (type === 'share') {
                this.currentShareTab = '1'
            }
            this.initData()
        },
        // 切换共享人员tab
        changeShareTab (type) {
            this.keyword = null
            this.currentShareTab = type
            this.selectedShareItem = {}
            if (this.currentShareTab === '3') {
                this.getPeopleSharePublicData()
            } else {
                this.getPeopleShareData()
            }
        },
        // 专业人员
        getPeopleProfessionalData () {
            this.peopleProfessinalData.getData()
        },
        // 共享人员-候选、其他
        getPeopleShareData () {
            if (this.currentShareTab === '1') {
                this.peopleShareData.getData({stid: this.stid, isRecOrder: 1})
            } else {
                this.peopleShareData.getData()
            }
        },
        // 共享人员-公开
        getPeopleSharePublicData () {
            this.peopleSharePublicData.getData({isRecOrder: 1, incme: 1})
        },
        // 改变radio的选择
        changeRadio (radioType, item) {
            this.selectedShareItem = item
        },
        // 关键字查询
        keywordSearch () {
            if (this.currentExecutorType === 'profession') {
                this.professionConcatArr = this.peopleProfessinalData.res.data.filter(v => v.realname.includes(this.keyword))
            } else {
                if (this.currentShareTab === '3') {
                    this.shareConcatArr = this.peopleSharePublicData.res.data.filter(v => v.realname.includes(this.keyword))
                } else {
                    this.shareConcatArr = this.peopleShareData.res.data.filter(v => v.realname.includes(this.keyword))
                }
            }
        },
        initData () {
            if (this.currentExecutorType === 'profession') {
                this.getPeopleProfessionalData()
            } else {
                if (this.currentShareTab === '3') {
                    this.getPeopleSharePublicData()
                } else {
                    this.getPeopleShareData()
                }
            }
        },
        deleteCurrentPerson (i, item) {
            this.checkedRows.splice(i, 1)
            this.$refs.professionTable.toggleRowSelection(item)
        },
        // 获取人员的评分、接单次数
        getPeopleScoreData (userIdList, peopleList) {
            this.getTimesAndScoreData.getData({userIdList}).then(res => {
                this.shareConcatArr = peopleList.map(v => {
                    return {
                        ...v,
                        score: res.data[v.id].score,
                        times: res.data[v.id].times
                    }
                })
                this.$nextTick(() => {
                    this['radio' + this.currentShareTab] = this.selectedShareItem.id
                })
            })
        },
        selectPeople () {
            if (this.currentExecutorType === 'profession') {
                if (!this.checkedRows.length) return Message.error('请至少选择一个执行人')
                this.$bus.$emit('selectedExecutorEmit', {persons: this.checkedRows, type: this.currentExecutorType})
            } else {
                if (!this.selectedShareItem.realname) return Message.error('请选择一个执行人')
                this.$bus.$emit('selectedExecutorEmit', {persons: {...this.selectedShareItem, shareTab: this.currentShareTab}, type: this.currentExecutorType})
            }
        },
        cancel () {
            this.$bus.$emit('selectedExecutorEmit', {persons: null})
        }
    },
    created () {
        this.peopleProfessinalData.subscribe(res => {
            this.professionConcatArr = res.data
            this.$nextTick(() => {
                if (this.checkedRows.length) {
                    let checkedIds = []
                    this.checkedRows.map(v => checkedIds.push(v.id))
                    this.professionConcatArr.map(row => {
                        if (checkedIds.includes(row.id)) this.$refs.professionTable.toggleRowSelection(row, true)
                    })
                }
            })
        })
        this.peopleShareData.subscribe(res => {
            let userIdList = res?.data.map(v => v.id)
            if (this.currentShareTab === '1') {
                this.shareConcatArr = [...res.data]
                this.$nextTick(() => {
                    this.radio1 = this.selectedShareItem.id
                })
            } else if (this.currentShareTab === '2' && userIdList && userIdList.length) {
                this.getPeopleScoreData(userIdList.join(','), res.data)
            }
        })
        this.peopleSharePublicData.subscribe(res => {
            let userIdList = res?.data.map(v => v.id)
            if (userIdList && userIdList.length) this.getPeopleScoreData(userIdList.join(','), res.data)
        })
    },
    mounted () {
        if (this.currentExecutorTypeProp) {
            this.currentExecutorType = this.currentExecutorTypeProp
            if (this.currentExecutorType === 'profession') {
                this.checkedRows = this.personsArr
            } else {
                this.selectedShareItem = this.personsArr
                this.currentShareTab = this.selectedShareItem.shareTab ? this.selectedShareItem.shareTab : this.currentShareTab
            }
        }
        this.initData()
    }
}
</script>

<style lang="scss">
.executor-dialog{
    @import '@comm/assets/themes/table/tableWhite/t1.scss';
    .el-table .header-cell-style {
        text-align: left;
        padding-left:5px;
    }
}
</style>
<style lang="scss" scoped>
.executor-dialog {
    background: #fff;
    .executor-header{
        background:white;
        height:44px;font-size:18px;line-height: 44px;
        text-align: center;
        background: #EDEFF9;
    }
    .executor-type-tab{
        width:624px;
        height:46px;
        background:rgba(255,253,253,0.3);
        border-radius:10px;
        margin: 20px auto;
        text-align: center;
        padding-top: 5px;
        .executor-type{
            border: none;
            font-size: 16px;
            background: transparent;
            width: 120px;
            height: 35px;
            border-radius: 5px;
            border: 1px solid #2FBFCC;
            color:#2FBFCC;
            &.executor-type-active{
                background:#2FBFCC;
                color:white;
            }
        }
    }
    .selected-person-part{
        display: inline-block;
        width:calc(100% - 130px);
        margin-left:15px;
        .selected-person-con{
            display: inline-block;
            vertical-align: middle;
            width:calc(100% - 4em);
            max-height: 60px;
            overflow:auto;
            .selected-person{
                display: inline-block;
                border: 1px solid #2FBFCC;
                padding: 4px 24px;
                border-radius: 20px;
                position:relative;
                line-height: 14px;
                margin: 0 10px 5px 0;
                .delete-person{
                    position: absolute;
                    right: 3px;
                    font-size: 24px;
                    top: 2px;
                    cursor: pointer;
                }
            }
        }
    }
    .share-tab{
        float:left;
        width:33%;
        text-align: center;
        >span{
            display: inline-block;
            padding:10px;
            cursor: pointer;
            &.share-tab-active{
                color:#2FBFCC;
                border-bottom: 1px solid #2FBFCC;
            }
        }
    }
    .executor-table-con{
        margin-top: 10px;
        background: rgba(227,227,227,0.1);
        padding:20px;
    }
    .share-line-con{
        max-height: calc(100vh - 380px);
        overflow: auto;
    }
    .share-line{
        padding:10px;
        &:nth-child(2n+1){
            background: #fff;
        }
        &:nth-child(2n){
            background: rgba(245,245,245,0.6);
        }
    }
}
</style>
