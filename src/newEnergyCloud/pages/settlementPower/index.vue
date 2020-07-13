<template>
    <div class="settlement-list">
        <div class="content">
            <!-- 查询区域 -->
            <div class="filter clearfix" ref="filter">
                <el-form ref="Form" :model="custStAcquElecGetCustStElecList.params" :inline='true' size="small">
                    <el-form-item label="期数">
                        <el-date-picker
                            style="width: 180px"
                            v-model="custStAcquElecGetCustStElecList.params.date"
                            type="month"
                            format="yyyy-MM"
                            value-format="yyyy-MM"
                            placeholder="选择日期"
                            @change='search()'>
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="电站">
                        <el-select v-model="custStAcquElecGetCustStElecList.params.stId" filterable multiple clearable collapse-tags
                        placeholder="全部" style="width: 260px" @change='search()'>
                            <el-option
                                v-for="item in getStByRoleAndComIds.res.body"
                                :key="item.stId"
                                :label="item.stName"
                                :value="item.stId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="开票状态">
                        <el-select v-model="custStAcquElecGetCustStElecList.params.voice" clearable placeholder="全部" style="max-width: 150px" class='s1' @change='search()'>
                            <el-option label="已开票" value="1"></el-option>
                            <el-option label="未开票" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="回款状态">
                        <el-select v-model="custStAcquElecGetCustStElecList.params.cost" clearable placeholder="全部" style="max-width: 150px" class='s1' @change='search()'>
                            <el-option label="已回款" value="1"></el-option>
                            <el-option label="未回款" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <el-button type="text" @click.stop="checkWatchDetail.show = true;powerDetail.detail = {}" style="padding-top: 0;">
                <span class="add-con"><i class="iconfont icon-xinzeng"></i></span>
                抄表
            </el-button>
            <el-button type="text" @click.stop="elecWatchConfDetail.show = true;" style="padding-top: 0;">
                <span class="add-con"><i class="iconfont icon-anzhuangdianbiaogongdan"></i></span>
                电表配置
            </el-button>
            <el-button type="text" @click.stop="elecPriceConfDetail.show = true;" style="padding-top: 0;">
                <span class="add-con"><i class="iconfont icon-jiagebiao"></i></span>
                电价配置
            </el-button>
            <!-- 表格区域 -->
            <div class="tableCon">
                <el-table
                    v-if="custStAcquElecGetCustStElecList.res && custStAcquElecGetCustStElecList.res.data"
                    :data="custStAcquElecGetCustStElecList.res.data.data"
                    v-loading="custStAcquElecGetCustStElecList.loading"
                    style="width: 100%"
                    border
                    :max-height="vh - 180"
                    :cell-style="cellStyle"
                    @cell-click='cellClick'
                    :row-style="{'cursor': 'pointer'}"
                    row-class-name="row-style"
                    cell-class-name="cell-style"
                    header-row-class-name="header-row-style"
                    header-cell-class-name="header-cell-style"
                    >
                    <el-table-column
                        type="expand">
                        <template slot-scope="props">
                            <el-form label-position="left" inline class="demo-table-expand">
                                <el-row>
                                    <el-col :span="3">
                                        <el-form-item label="电站:">
                                            <span>{{ props.row.stName }}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="3">
                                        <el-form-item label="期数:">
                                            <span>{{ props.row.acqumonth ? new Date(props.row.acqumonth).Format('yyyy-MM') : '' }}</span>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="3">
                                        <el-form-item label="抄表发电量(度):">
                                            <span>{{ props.row.genKwhDisp }}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="3">
                                        <el-form-item label="抄表上网电量(度):">
                                            <span>{{ props.row.sendKwhDisp }}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="3">
                                        <el-form-item label="企业用电量(度):">
                                            <span>{{ props.row.useKwh }}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="3">
                                        <el-form-item label="自发自用比例:">
                                            <span>{{ props.row.ownPercent ? (props.row.ownPercent + '%') : '' }}</span>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="3">
                                        <el-form-item label="国网电量(度):">
                                            <span>{{ props.row.netKwh ? props.row.netKwh : '未录入' }}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="3">
                                        <el-form-item label="开票日期:">
                                            <span>{{ props.row.createTicketDate ? new Date(props.row.createTicketDate).Format('yyyy-MM-dd') : '' }}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="3">
                                        <el-form-item label="回款日期:">
                                            <span>{{ props.row.backDate ? new Date(props.row.backDate).Format('yyyy-MM-dd') : '' }}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="3">
                                        <el-form-item label="回款金额(元):">
                                            <span>{{ props.row.backMoney }}</span>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="3">
                                        <el-form-item label="尖原电价(元):">
                                            <span>{{ props.row.price ? props.row.price.sharpOrigPrice : '' }}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="3">
                                        <el-form-item label="尖折扣电价(元):">
                                            <span>{{ props.row.price ? props.row.price.sharpPrice : '' }}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="3">
                                        <el-form-item label="峰原电价(元):">
                                            <span>{{ props.row.price ? props.row.price.peakOrigPrice : '' }}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="3">
                                        <el-form-item label="峰折扣电价(元):">
                                            <span>{{ props.row.price ? props.row.price.peakPrice : '' }}</span>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="3">
                                        <el-form-item label="平原电价(元):">
                                            <span>{{ props.row.price ? props.row.price.flatOrigPrice : '' }}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="3">
                                        <el-form-item label="平折扣电价(元):">
                                            <span>{{ props.row.price ? props.row.price.flatPrice : '' }}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="3">
                                        <el-form-item label="谷原电价(元):">
                                            <span>{{ props.row.price ? props.row.price.valleyOrigPrice : '' }}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="3">
                                        <el-form-item label="谷折扣电价(元):">
                                            <span>{{ props.row.price ? props.row.price.valleyPrice : '' }}</span>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="3">
                                        <el-form-item label="尖发电量(度):">
                                            <span>{{ props.row.sharpKwh }}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="3">
                                        <el-form-item label="峰发电量(度):">
                                            <span>{{ props.row.peakKwh }}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="3">
                                        <el-form-item label="平发电量(度):">
                                            <span>{{ props.row.flatKwh }}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="3">
                                        <el-form-item label="谷发电量(度):">
                                            <span>{{ props.row.valleyKwh }}</span>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="3">
                                        <el-form-item label="尖上网电量(度):">
                                            <span>{{ props.row.sharpSendKwh }}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="3">
                                        <el-form-item label="峰上网电量(度):">
                                            <span>{{ props.row.peakSendKwh }}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="3">
                                        <el-form-item label="平上网电量(度):">
                                            <span>{{ props.row.flatSendKwh }}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="3">
                                        <el-form-item label="谷上网电量(度):">
                                            <span>{{ props.row.valleySendKwh }}</span>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="3">
                                        <el-form-item label="尖光伏用电电费(度):">
                                            <span>{{ props.row.elecCost ? props.row.elecCost.sharpUseCost : '' }}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="3">
                                        <el-form-item label="峰光伏用电电费(度):">
                                            <span>{{ props.row.elecCost ? props.row.elecCost.peakUseCost : '' }}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="3">
                                        <el-form-item label="平光伏用电电费(度):">
                                            <span>{{ props.row.elecCost ? props.row.elecCost.flatUseCost : '' }}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="3">
                                        <el-form-item label="谷光伏用电电费(度):">
                                            <span>{{ props.row.elecCost ? props.row.elecCost.valleyUseCost : '' }}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="3">
                                        <el-form-item label="光伏用电总电费(度):">
                                            <span>{{ props.row.elecCost ? Number(props.row.elecCost.sharpUseCost) + Number(props.row.elecCost.peakUseCost) + Number(props.row.elecCost.flatUseCost) + Number(props.row.elecCost.valleyUseCost) : '' }}</span>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="3">
                                        <el-form-item label="尖光伏自耗电量(度):">
                                            <span>{{ props.row.sharpConsKwh }}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="3">
                                        <el-form-item label="峰光伏自耗电量(度):">
                                            <span>{{ props.row.peakConsKwh }}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="3">
                                        <el-form-item label="平光伏自耗电量(度):">
                                            <span>{{ props.row.flatConsKwh }}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="3">
                                        <el-form-item label="谷光伏自耗电量(度):">
                                            <span>{{ props.row.valleyConsKwh }}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="3">
                                        <el-form-item label="总耗电量(度):">
                                            <span>{{ props.row.consKwh }}</span>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="3">
                                        <el-form-item label="尖光伏自耗电电费(度):">
                                            <span>{{ props.row.elecCost ? props.row.elecCost.sharpConsCost : '' }}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="3">
                                        <el-form-item label="峰光伏自耗电电费(度):">
                                            <span>{{ props.row.elecCost ? props.row.elecCost.peakConsCost : '' }}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="3">
                                        <el-form-item label="平光伏自耗电电费(度):">
                                            <span>{{ props.row.elecCost ? props.row.elecCost.flatConsCost : '' }}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="3">
                                        <el-form-item label="谷光伏自耗电电费(度):">
                                            <span>{{ props.row.elecCost ? props.row.elecCost.valleyConsCost : '' }}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="3">
                                        <el-form-item label="光伏自耗电总电费(度):">
                                            <span>{{ props.row.elecCost ? Number(props.row.elecCost.sharpConsCost) + Number(props.row.elecCost.peakConsCost) + Number(props.row.elecCost.flatConsCost) + Number(props.row.elecCost.valleyConsCost) : '' }}</span>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="3">
                                        <el-form-item label="尖光伏用电量(度):">
                                            <span>{{ props.row.sharpUseKwh }}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="3">
                                        <el-form-item label="峰光伏用电量(度):">
                                            <span>{{ props.row.peakUseKwh }}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="3">
                                        <el-form-item label="平光伏用电量(度):">
                                            <span>{{ props.row.flatUseKwh }}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="3">
                                        <el-form-item label="谷光伏用电量(度):">
                                            <span>{{ props.row.valleyUseKwh }}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="3">
                                        <el-form-item label="光伏用电量(度):">
                                            <span>{{ props.row.UseKwh }}</span>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="3">
                                        <el-form-item label="光伏结算电费(度):">
                                            <span>{{ props.row.elecCost ? props.row.elecCost.settlCost : '' }}</span>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column prop="acqumonth" label="期数" width="90" sortable="custom" align="center"
                    :formatter="(row, column, cellValue, index) => cellValue ? new Date(cellValue).Format('yyyy-MM') : ''"></el-table-column>
                    <el-table-column prop="stName" label="电站名称" width="205" sortable="custom"></el-table-column>
                    <el-table-column prop="genKwhDisp" label="抄表发电量(度)" width="140" sortable="custom" align="right"></el-table-column>
                    <el-table-column prop="sendKwhDisp" label="抄表上网电量(度)" width="160" sortable="custom" align="right"></el-table-column>
                    <el-table-column prop="useKwh" label="企业用电量(度)" width="145" sortable="custom" align="right"></el-table-column>
                    <el-table-column prop="useKwhPv" label="光伏用电量(度)" width="145" sortable="custom" align="right"></el-table-column>
                    <el-table-column prop="ownPercent" label="自发自用比例" width="130" sortable="custom" align="right"
                    :formatter="(row, column, cellValue, index) => cellValue ? (cellValue + '%') : ''"></el-table-column>
                    <el-table-column prop="netKwh" label="国网电量(度)" width="130" sortable="custom" align="right"
                    :formatter="(row, column, cellValue, index) => cellValue ? cellValue : '未录入'"></el-table-column>
                    <el-table-column
                        prop="createTicketDate"
                        label="开票日期"
                        min-width="125"
                        sortable="custom"
                        align="center"
                        :formatter="(row, column, cellValue, index) => cellValue ? new Date(cellValue).Format('yyyy-MM-dd') : ''">
                    </el-table-column>
                    <el-table-column
                        prop="backDate"
                        label="回款日期"
                        min-width="125"
                        sortable="custom"
                        align="center"
                        :formatter="(row, column, cellValue, index) => cellValue ? new Date(cellValue).Format('yyyy-MM-dd') : ''">
                    </el-table-column>
                    <el-table-column prop="backMoney" label="回款金额(元)" min-width="125" sortable="custom"></el-table-column>
                    <el-table-column
                        fixed="right"
                        width="250px"
                        align="center"
                        label="操作">
                        <template slot-scope="scope">
                            <div
                                title="抄表"
                                @click.stop="checkWatchDetail.show = true;powerDetail.detail = scope.row"
                                class="btn look">
                                <i class="iconfont icon-chaobiaoguanli" style="font-size: 20px"></i>
                                <span style="vertical-align: middle;display:block">抄表</span>
                            </div>
                            <div
                                title="开票"
                                @click.stop="invoiceDetail.show = true;invoiceDetail.detail = scope.row"
                                class="btn look">
                                <i class="iconfont icon-kaipiaowancheng" style="font-size: 20px"></i>
                                <span style="vertical-align: middle;display:block">开票</span>
                            </div>
                            <div
                                title="回款"
                                @click.stop="moneyBackDetail.show = true;moneyBackDetail.detail = scope.row"
                                class="btn look">
                                <i class="iconfont icon-huikuanjihua" style="font-size: 20px"></i>
                                <span style="vertical-align: middle;display:block">回款</span>
                            </div>
                            <div
                                title="电表"
                                @click.stop="elecWatchDetail.show = true;powerDetail.detail = scope.row"
                                class="btn look">
                                <i class="iconfont icon-anzhuangdianbiaogongdan" style="font-size: 20px"></i>
                                <span style="vertical-align: middle;display:block">电表</span>
                            </div>
                            <div
                                title="电价"
                                @click.stop="elecPriceDetail.show = true;powerDetail.detail = scope.row"
                                class="btn look">
                                <i class="iconfont icon-jiagebiao" style="font-size: 20px"></i>
                                <span style="vertical-align: middle;display:block">电价</span>
                            </div>
                            <div
                                title="导出"
                                @click.stop="exportDetail.show = true;powerDetail.detail = scope.row"
                                class="btn look">
                                <i class="iconfont icon-daochu-" style="font-size: 17px"></i>
                                <span style="vertical-align: middle;display:block">导出</span>
                            </div>
                        </template>
                    </el-table-column>
                    <template slot="empty">
                        <span>暂无数据</span>
                    </template>
                </el-table>
            </div>
            <!-- 分页区域 -->
            <div class="page-footer" style="text-align: center">
                <solway-pagination
                    v-if="custStAcquElecGetCustStElecList.res && custStAcquElecGetCustStElecList.res.data"
                    :page-index="custStAcquElecGetCustStElecList.res.data.pageIndex"
                    :page-size="custStAcquElecGetCustStElecList.res.data.pageSize"
                    :total="custStAcquElecGetCustStElecList.res.data.total"
                    @change="search">
                </solway-pagination>
            </div>
        </div>
        <!-- 抄表 弹框 -->
        <el-dialog
        width="1350px"
        height="500px"
        title="抄表"
        class="elecDialog"
        center
        :visible.sync="checkWatchDetail.show"
        top='2vh'
        @opened="$bus.emit('openCheckWatch')"
        @close="powerDetail.detail = {};custStAcquElecGetCustStElecList.getData()"
        >
            <check-watch :detail="powerDetail.detail" v-if="checkWatchDetail.show"></check-watch>
        </el-dialog>

        <!-- 电价 弹框 -->
        <el-dialog
        width="1250px"
        height="500px"
        title="电价"
        class="elecDialog"
        center
        :visible.sync="elecPriceDetail.show"
        top='10vh'
        @opened="$bus.emit('updatePriceList')"
        @close="priceDetail.show = false"
        >
            <div style="padding-bottom: 10px" v-if="elecPriceDetail.show">电站：{{powerDetail.detail.stName}}</div>
            <el-button
            type="text"
            @click="delete priceDetail.detail;priceDetail.show = true;$forceUpdate();$bus.emit('openPrice');">
                <span class="add-con"><i class="iconfont icon-xinzeng"></i></span>
                新增
            </el-button>

            <new-price :detail="priceDetail.detail" :powerDetail="powerDetail.detail" v-show="priceDetail.show"></new-price>

            <price-list :detail="powerDetail.detail"></price-list>
        </el-dialog>

        <!-- 电价配置 弹框 -->
        <el-dialog
        width="1250px"
        height="500px"
        title="电价"
        class="elecDialog"
        center
        :visible.sync="elecPriceConfDetail.show"
        top='10vh'
        @close="priceDetail.show = false;elecPriceConfDetail.stId = null;$bus.emit('clearElecPriceConfList')"
        >
            <div style="padding-bottom: 10px">
                <label class="width-label" style="padding-right: 10px">电站</label>
                <el-select v-model="elecPriceConfDetail.stId" filterable collapse-tags
                placeholder="全部" style="width: 280px" @change='updateElecPriceList()'>
                    <el-option
                        v-for="item in getStByRoleAndComIds.res.body"
                        :key="item.stId"
                        :label="item.stName"
                        :value="item.stId">
                    </el-option>
                </el-select>
            </div>

            <el-button
            type="text"
            @click="adddElecPriceConf()">
                <span class="add-con"><i class="iconfont icon-xinzeng"></i></span>
                新增
            </el-button>

            <new-conf-price :detail="priceDetail.detail" v-show="priceDetail.show"></new-conf-price>

            <conf-price-list :detail="{stid: elecPriceConfDetail.stId}"></conf-price-list>
        </el-dialog>

        <!-- 电表 弹框 -->
        <el-dialog
        width="1250px"
        height="500px"
        title="电表"
        class="elecDialog"
        center
        :visible.sync="elecWatchDetail.show"
        top='10vh'
        @opened="$bus.emit('updateWatchList')"
        @close="watchDetail.show = false"
        >
            <el-button
            type="text"
            @click="delete watchDetail.detail;watchDetail.show = true;$forceUpdate();$bus.emit('openWatch')">
                <span class="add-con"><i class="iconfont icon-xinzeng"></i></span>
                新增
            </el-button>

            <new-watch :detail="watchDetail.detail" :powerDetail="powerDetail.detail" v-show="watchDetail.show"></new-watch>

            <watch-list :detail="powerDetail.detail"></watch-list>
        </el-dialog>

        <!-- 电表配置 弹框 -->
        <el-dialog
        width="1250px"
        height="500px"
        title="电表"
        class="elecDialog"
        center
        :visible.sync="elecWatchConfDetail.show"
        top='10vh'
        @close="watchDetail.show = false;elecWatchConfDetail.stId = null;$bus.emit('clearElecWatchConfList')"
        >
            <div style="padding-bottom: 10px">
                <label class="width-label" style="padding-right: 10px">电站</label>
                <el-select v-model="elecWatchConfDetail.stId" filterable collapse-tags
                placeholder="全部" style="width: 280px" @change='updateElecWatchList()'>
                    <el-option
                        v-for="item in getStByRoleAndComIds.res.body"
                        :key="item.stId"
                        :label="item.stName"
                        :value="item.stId">
                    </el-option>
                </el-select>
            </div>

            <el-button
            type="text"
            @click="adddElecWatchConf()">
                <span class="add-con"><i class="iconfont icon-xinzeng"></i></span>
                新增
            </el-button>

            <new-conf-watch :detail="watchDetail.detail" v-show="watchDetail.show"></new-conf-watch>

            <conf-watch-list></conf-watch-list>
        </el-dialog>

        <!-- 国网电量 弹框 -->
        <el-dialog
        width="800px"
        height="500px"
        title="国网电量"
        class="elecDialog"
        center
        :visible.sync="stateGridPowerDetail.show"
        top='10vh'
        @opened="$bus.emit('openStateGridPower')"
        >
            <state-grid-power v-if="stateGridPowerDetail.show" :detail="stateGridPowerDetail.detail"></state-grid-power>
            <div slot="footer" class="dialog-footer">
                <el-button @click="stateGridPowerDetail.show = false">取 消</el-button>
                <el-button type="primary" @click="$bus.emit('saveStateGridPower')">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 开票 弹框 -->
        <el-dialog
        width="800px"
        height="500px"
        title="开票"
        class="elecDialog"
        center
        :visible.sync="invoiceDetail.show"
        top='10vh'
        @opened="$bus.emit('openInvoice')"
        >
            <invoice v-if="invoiceDetail.show" :detail="invoiceDetail.detail"></invoice>
            <div slot="footer" class="dialog-footer">
                <el-button @click="invoiceDetail.show = false">取 消</el-button>
                <el-button type="primary" @click="$bus.emit('saveInvoice')">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 回款 弹框 -->
        <el-dialog
        width="800px"
        height="500px"
        title="回款"
        class="elecDialog"
        center
        :visible.sync="moneyBackDetail.show"
        top='10vh'
        @opened="$bus.emit('openMoneyBack')"
        >
            <money-back v-if="moneyBackDetail.show" :detail="moneyBackDetail.detail"></money-back>
            <div slot="footer" class="dialog-footer">
                <el-button @click="moneyBackDetail.show = false">取 消</el-button>
                <el-button type="primary" @click="$bus.emit('saveMoneyBack')">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 导出 弹框 -->
        <el-dialog
        width="500px"
        height="500px"
        title="导出"
        class="elecDialog"
        center
        :visible.sync="exportDetail.show"
        top='15vh'
        >
            <el-button type="primary" @click="Export('file:cust_st_meter_elec_001.ureport.xml', '电费结算')">电费结算</el-button>
            <el-button type="primary" @click="Export('file:cust_st_meter_elec_003.ureport.xml', '企业开票')">企业开票</el-button>
            <el-button type="primary" @click="Export('file:cust_st_meter_elec_002.ureport.xml', '供电局开票')">供电局开票</el-button>
        </el-dialog>
    </div>
</template>

<script>
import { api＿baseSearchConditionGetStByRoleAndComIds, api＿custStAcquElecGetCustStElecList, api＿ureportExcel } from '@newEnergyCloud/request/api'
import solwayPagination from '@/components/pagination'
import mixinWidthHeight from '@comm/mixin/widthHeight'
import newPrice from './elecTricPrice/newPrice'
import priceList from './elecTricPrice/priceList'
import newWatch from './elecTricWatch/newWatch'
import watchList from './elecTricWatch/watchList'
import checkWatch from './checkWatch'
import stateGridPower from './stateGridPower'
import invoice from './invoice'
import moneyBack from './moneyBack'
import newConfWatch from './elecTricConfWatch/newConfWatch'
import confWatchList from './elecTricConfWatch/confWatchList'
import newConfPrice from './elecTricConfPrice/newConfPrice'
import confPriceList from './elecTricConfPrice/confPriceList'
import {download} from '@comm/request/http'

export default {
    mixins: [mixinWidthHeight],
    components: {
        solwayPagination,
        newPrice,
        priceList,
        newWatch,
        watchList,
        checkWatch,
        stateGridPower,
        invoice,
        moneyBack,
        newConfWatch,
        confWatchList,
        newConfPrice,
        confPriceList
    },
    data () {
        return {
            getStByRoleAndComIds: api＿baseSearchConditionGetStByRoleAndComIds({
                later: true,
                data: {stClass: '01', comIds: []},
                res: { body: [] }
            }),
            custStAcquElecGetCustStElecList: api＿custStAcquElecGetCustStElecList({
                later: true,
                res: { body: [] },
                beforeSend (params) {
                    if (params.stId) {
                        params.stId = params.stId.join()
                    }
                    // if (params.date) {
                    //     params.date = new Date(params.date).Format('yyyy-MM')
                    // }
                    return params
                }
            }),
            powerDetail: {
                show: false
            },
            checkWatchDetail: {
                show: false
            },
            elecPriceDetail: {
                show: false
            },
            elecWatchDetail: {
                show: false
            },
            priceDetail: {
                show: false
            },
            watchDetail: {
                show: false
            },
            stateGridPowerDetail: {
                show: false
            },
            invoiceDetail: {
                show: false
            },
            moneyBackDetail: {
                show: false,
                stId: ''
            },
            elecPriceConfDetail: {
                show: false
            },
            elecWatchConfDetail: {
                show: false,
                stId: ''
            },
            exportDetail: {
                show: false
            },
            tableList: [
                {
                    a: 1,
                    b: 1,
                    c: 1,
                    d: 1,
                    e: 1,
                    f: 1,
                    valleyKwh: 1,
                    h: 1,
                    i: 1,
                    j: 1
                }
            ],
            pre_acqumonth: ''
        }
    },
    mounted () {
        this.getStByRoleAndComIds.getData({stClass: '01', comIds: []})
        this.custStAcquElecGetCustStElecList.getData()
        // 列表
        this.$bus.on('openNewPrice', this.openNewPrice)
        this.$bus.on('hideNewPrice', this.hideNewPrice)
        this.$bus.on('openNewWatch', this.openNewWatch)
        this.$bus.on('hideNewWatch', this.hideNewWatch)
        this.$bus.on('updateList', this.updateList)
    },
    beforeDestroy () {
        this.$bus.off('openNewPrice', this.openNewPrice)
        this.$bus.off('hideNewPrice', this.hideNewPrice)
        this.$bus.off('openNewWatch', this.openNewWatch)
        this.$bus.off('hideNewWatch', this.hideNewWatch)
        this.$bus.off('updateList', this.updateList)
    },
    methods: {
        // 打开编辑电价 弹框
        openNewPrice (row) {
            this.priceDetail.show = true
            this.priceDetail.detail = row
            this.$forceUpdate()
        },
        // 隐藏新增电价 弹框
        hideNewPrice () {
            this.priceDetail.show = false
            this.$forceUpdate()
        },
        // 打开编辑电表 弹框
        openNewWatch (row) {
            this.watchDetail.show = true
            this.watchDetail.detail = row
            this.$forceUpdate()
        },
        // 隐藏新增电表 弹框
        hideNewWatch () {
            this.watchDetail.show = false
            this.$forceUpdate()
        },
        updateList () {
            this.invoiceDetail.show = false
            this.moneyBackDetail.show = false
            this.stateGridPowerDetail.show = false
            this.custStAcquElecGetCustStElecList.getData()
        },
        // 更新电量配置列表
        updateElecWatchList () {
            this.$bus.emit('updateElecWatchList', this.elecWatchConfDetail.stId)
        },
        // 更新电价配置列表
        updateElecPriceList () {
            this.$bus.emit('updateElecPriceList', this.elecPriceConfDetail.stId)
        },
        // 国网电量蓝色字
        cellStyle ({ row, column, rowIndex, columnIndex }) {
            if (column.property === 'netKwh') return 'color: #349EFF'
            return ''
        },
        // 点击国网电量
        cellClick (row, column, cell, event) {
            if (column.property === 'netKwh') {
                this.stateGridPowerDetail.detail = row
                this.stateGridPowerDetail.show = true
            }
        },
        search (data = {}) {
            this.custStAcquElecGetCustStElecList.getData({...data})
        },
        // 电表配置新增
        adddElecWatchConf () {
            if (!this.elecWatchConfDetail.stId) return this.$message({message: '请选择电站', type: 'error'})
            delete this.watchDetail.detail
            this.watchDetail.show = true
            this.$forceUpdate()
            this.$bus.emit('openWatch')
        },
        // 电价配置新增
        adddElecPriceConf () {
            if (!this.elecPriceConfDetail.stId) return this.$message({message: '请选择电站', type: 'error'})
            delete this.priceDetail.detail
            this.priceDetail.show = true
            this.$forceUpdate()
            this.$bus.emit('openPrice')
        },
        // 导出
        Export (u, name) {
            let row = this.powerDetail.detail
            let month = new Date(row.acqumonth).Format('MM')
            this.pre_acqumonth = month === '03' ? (new Date(new Date(row.acqumonth).getTime() - 86400000 * 29)).Format('yyyy-MM') : (new Date(new Date(row.acqumonth).getTime() - 86400000 * 30)).Format('yyyy-MM')
            download({
                progress: false,
                url: api＿ureportExcel + '?' + '_u=' + u + '&stid=' + row.stid + '&curr_acqumonth=' + new Date(row.acqumonth).Format('yyyy-MM') + '&pre_acqumonth=' + this.pre_acqumonth + '&_n=' + name + '_' + new Date(row.acqumonth).Format('yyyy-MM')
            })
        }
    }
}
</script>

<style lang="scss">
.settlement-list {
    .elecDialog {
        .el-dialog__body {
            overflow: auto;
        }
    }
    .demo-table-expand label {
        line-height: 30px;
    }
    .demo-table-expand .el-form-item__content {
        line-height: 30px;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
    }
}
</style>

<style lang="scss" scoped>
.settlement-list {
    .content {
        padding: 20px 10px;
        .add-con {
            display: inline-block;
            width: 20px;
            height: 20px;
            margin-right: 5px;
            border-radius: 50%;
            vertical-align: middle;
            line-height: 20px;
            text-align: center;
            font-size: 14px;
            i {
                font-size: 16px;
            }
        }
        .tableCon {
            position: relative;
            height: calc(100vh - 165px);
            .btn {
                font-size: 12px;
                display: inline-block;
            }
            .look {
                margin-right: 8px;
                & i {
                    margin-right: 5px;
                    @include c(color, $text_c4);
                }
            }
            .edit {
                margin-right: 8px;
                & i {
                    margin-right: 5px;
                    @include c(color, $text_c1);
                }
            }
            .delete {
                & i {
                    margin-right: 5px;
                    @include c(color, $text_c3);
                }
            }
        }
    }
}
</style>
