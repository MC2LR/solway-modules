<template>
  <div class="device-log-query" :style="{height: winHeight - 75 + 'px'}">
    <!-- 下拉框选择区域 -->
    <div class="tools-wrap" v-show="!detailFullPage" ref="filter">
      <div class="tools-t-con">
        <div class="select-item" v-if="getSTClassLIst.res.data.length !== 1">
          <span class="select-item-name">电站分类</span>

          <div class="select-wrap powerType-con">
            <el-select v-model="prIndex" style="width: 100px;" @change="getPower()">
                <el-option
                    v-for="(item,index) in getSTClassLIst.res.data"
                    :key="index"
                    :label="item.name"
                    :value="item.id">
                </el-option>
            </el-select>
          </div>
        </div>
        <div class="select-item">
          <span class="select-item-name" style="flex: 0 0 40px;">集团</span>
          <div class="select-wrap">
            <span class="select-con" @mouseenter="showPop('blocPopShow')" @mouseleave="hidePop()">
              <span class="content" style>{{comValues.join()}}</span>
              <i class="el-icon-arrow-up icon-arrow" style="color: #C0C4CC;font-size: 14px;"></i>
            </span>
          </div>

          <!-- 弹出框 -->
          <div class="group-pop-tpl jituan-tpl" style="width: 320px;left: 0;" v-show="blocPopShow" @mouseenter="showPop('blocPopShow')" @mouseleave="hidePop()">
            <div>
              <el-checkbox v-model="groupCheckAll" @change="getAllGroup()">全部</el-checkbox>
              <el-checkbox v-model="groupFilter" @change="checkboxFilter('groupArr')">仅看选中</el-checkbox>

              <!-- <label class="group-checks">
                <input type="checkbox" v-model="groupCheckAll" @change="getAllGroup()" />
                <i></i>
                <span>全部</span>
              </label>
              <label class="group-checks">
                <input type="checkbox" v-model="groupFilter" @change="checkboxFilter('groupArr')" />
                <i></i>
                <span>仅看选中</span>
              </label> -->
            </div>
            <div class="jituan-con">
              <el-checkbox
                style="width: 260px;margin-top: 15px;"
                v-show="item.show"
                v-for="(item,index) in groupArr" :key="index"
                :label="item.comName"
                v-model="item.checked"
                @change="getGroup()">
              </el-checkbox>

              <!-- <label
                class="group-checks"
                style="width: 260px;"
                v-show="item.show"
                v-for="(item,index) in groupArr"
                :key="index"
              >
                <input type="checkbox" v-model="item.checked" @change="getGroup()" />
                <i></i>
                <span>{{item.comName}}</span>
              </label> -->
            </div>
          </div>
        </div>
        <div class="select-item">
          <span class="select-item-name" style="flex: 0 0 40px;">电站</span>

          <div class="select-wrap">
            <span class="select-con" @mouseenter="showPop('powerStationPopShow')" @mouseleave="hidePop()">
              <span class="content" style>{{stValues.join()}}</span>
              <i class="el-icon-arrow-up icon-arrow" style="color: #C0C4CC;font-size: 14px;"></i>
            </span>
          </div>

          <div class="group-pop-tpl station-tpl" style="width:300px;left: -28px;" v-show="powerStationPopShow" @mouseenter="showPop('powerStationPopShow')" @mouseleave="hidePop()">
            <span class="search-con">
              <input type="text" placeholder="关键字" class='input-place-hoder' v-model="stationKeyword" @keydown.enter="searchGroup()"/>
              <i class="iconfont iconiconfontsousuokuangsousuo" @click="searchGroup()"></i>
            </span>
            <div>
              <el-checkbox v-model="stationCheckAll" @change="getAllSt()">全部</el-checkbox>
              <el-checkbox v-model="powerStationFilter" @change="checkboxFilter('powerStationArr')">仅看选中</el-checkbox>

              <!-- <label class="group-checks">
                <input type="checkbox" v-model="stationCheckAll" @change="getAllSt()" />
                <i></i>
                <span>全部</span>
              </label>
              <label class="group-checks">
                <input type="checkbox" v-model="powerStationFilter" @change="checkboxFilter('powerStationArr')" />
                <i></i>
                <span>仅看选中</span>
              </label> -->
            </div>
            <div class="station-con">
              <el-checkbox
                style="width: 230px;margin-top: 15px;"
                v-show="item.show"
                v-for="(item,index) in powerStationArr" :key="index"
                :label="item.stName.trim()"
                v-model="item.checked"
                @change="getCheckStation()">
              </el-checkbox>

              <!-- <label
                class="group-checks"
                style="width: 230px;"
                v-for="(item,index) in powerStationArr"
                :key="index"
                v-show="item.show"
              >
                <input type="checkbox" v-model="item.checked" @change="getCheckStation()" />
                <i></i>
                <span>{{item.stName}}</span>
              </label> -->
            </div>
          </div>
        </div>
        <div class="select-item">
          <span class="select-item-name">设备类型</span>

          <div class="select-wrap">
            <span class="select-con" @mouseenter="showPop('deviceTypePopShow')" @mouseleave="hidePop()">
              <span class="content" style>{{deviceTypesValues.join()}}</span>
              <i class="el-icon-arrow-up icon-arrow" style="color: #C0C4CC;font-size: 14px;"></i>
            </span>
          </div>

          <div class="group-pop-tpl deviceType-tpl" style="width:260px;left: 0px;" v-show="deviceTypePopShow" @mouseenter="showPop('deviceTypePopShow')" @mouseleave="hidePop()">
            <div>
              <el-checkbox v-model="deviceCheckAll" @change="getAllDeviceType()">全部</el-checkbox>
              <el-checkbox v-model="deviceTypeFilter" @change="checkboxFilter('deviceTypeArr')">仅看选中</el-checkbox>

              <!-- <label class="group-checks">
                <input type="checkbox" v-model="deviceCheckAll" @change="getAllDeviceType()" />
                <i></i>
                <span>全部</span>
              </label>
              <label class="group-checks">
                <input type="checkbox" v-model="deviceTypeFilter" @change="checkboxFilter('deviceTypeArr')" />
                <i></i>
                <span>仅看选中</span>
              </label> -->
            </div>
            <div class="deviceType-con">
              <el-checkbox
                style="margin-top: 15px;margin-right: 0;"
                v-show="item.show"
                v-for="(item,index) in deviceTypeArr" :key="index"
                :label="item.devtype"
                v-model="item.checked"
                @change="getChecksDeviceType()">
              </el-checkbox>

              <!-- <label class="group-checks" v-show="item.show" v-for="(item,index) in deviceTypeArr" :key="index">
                <input type="checkbox" v-model="item.checked" @change="getChecksDeviceType()" />
                <i></i>
                <span>{{item.devtype}}</span>
              </label> -->
            </div>
          </div>
        </div>
        <div class="select-item">
          <span class="select-item-name">设备名称</span>
          <div class="select-wrap">
            <span class="select-con" @mouseenter="showPop('deviceNamePopShow')" @mouseleave="hidePop()">
              <span class="content" style>{{deviceNameValues.join()}}</span>
              <i class="el-icon-arrow-up icon-arrow" style="color: #C0C4CC;font-size: 14px;"></i>
            </span>
          </div>

          <!-- 弹出框 -->
          <div class="deviceName-tpl" v-show="deviceNamePopShow" style="width: 920px" @mouseenter="showPop('deviceNamePopShow')" @mouseleave="hidePop()">
            <!-- 全选按钮 -->
            <div>
              <el-checkbox style="margin-bottom: 15px;" v-model="deviceNameCheckAll" @change="getAllDeviceName()">全部</el-checkbox>

              <!-- <label class="group-checks">
                <input type="checkbox" v-model="deviceNameCheckAll" @change="getAllDeviceName()" />
                <i></i>
                <span>全部</span>
              </label> -->
            </div>
            <!-- 设备类型单选 -->
            <div>
              <label class="group-radio" v-for="(item,index) in dtCheckedArr" :key="index">
                <input type="radio" name="deviceNameRadio" :value="index" v-model="deviceNameRadio" @change="getDeviceType()" style="display: none"/>
                <i></i>
                <span>{{item.devtype}}</span>
              </label>
            </div>
            <!-- 三列区域 -->
            <div class="third-col">
              <!-- 电站选择区域 -->
              <div class="group-pop-tpl" :style="{'margin-right': 20 + 'px','height':300 + 'px'}">
                <span class="search-con">
                  <input type="text" placeholder="关键字" class="input-place-hoder" v-model="stationKeyword" @keyup="searchGroup()"/>
                  <i class="iconfont iconiconfontsousuokuangsousuo" @click="searchGroup()"></i>
                </span>
                <div class="pop-over-con" :style="{'height': 240 + 'px'}">
                  <label
                    class="group-radio"
                    style="width: 190px;"
                    v-for="(item,index) in psCheckedArr"
                    :key="index"
                    v-show="item.show"
                  >
                    <input type="radio" name="psRadio" :value="index" v-model="powerStationRadio" @change="getStation()" style="display: none"/>
                    <i></i>
                    <span>{{item.stName.trim()}}</span>
                  </label>
                </div>
              </div>
              <!-- 设备选择区域 -->
              <div class="group-pop-tpl" :style="{'margin-right': 20 + 'px','height':300 + 'px'}">
                <span class="search-con">
                  <input type="text" placeholder="关键字" class="input-place-hoder" v-model="deviceNameKeyword" @keyup="gainDeviceName()"/>
                  <i class="iconfont iconiconfontsousuokuangsousuo" @click="gainDeviceName()"></i>
                </span>
                <div>
                  <my-paging
                      :pageSizeArr="[10, 20, 30, 50]"
                      v-if="getDeviceByStIdsAndDeviceTypePage.res.body && getDeviceByStIdsAndDeviceTypePage.res.body.total"
                      @change="data => getDeviceByStIdsAndDeviceTypePage.getData(data)"
                      v-bind="getDeviceByStIdsAndDeviceTypePage.res.body"/>
                </div>
                <div class="pop-over-con" :style="{'height':195 + 'px'}">
                  <el-checkbox
                    style="width: 160px;margin-top: 15px;margin-right: 0;"
                    v-show="item.show"
                    v-for="(item,index) in deviceNameArr" :key="index"
                    :label="item.deviceName"
                    v-model="item.checked"
                    @change="getDeviceName(item)">
                  </el-checkbox>

                  <!-- <label class="group-checks" style="width: 160px;" v-show="item.show" v-for="(item,index) in deviceNameArr" :key="index">
                    <input type="checkbox" v-model="item.checked" @change="getDeviceName(item)" />
                    <i></i>
                    <span>{{item.deviceName}}</span>
                  </label> -->
                </div>
              </div>
              <!-- 选择结果区域 -->
              <div class="chooseRight" :style="{'height':300 + 'px'}">
                <div class="cRtop">
                    <span style="display:inline-block;width:5px;height:5px;background:rgba(56,218,208,1);border-radius:50%;margin-bottom: 3px;margin-right: 5px;"></span>
                    <span>已选择</span>
                    <div class="deleteAll" @click="delRightAll()">
                        <i class="iconfont iconshanchu1" style="font-size:12px;"></i>
                        全部删除
                    </div>
                </div>
                <div class="cRlist" :style="{'margin-top': 20 +'px', 'height':240 + 'px'}">
                  <div class="cRlist-con" v-for="(item,index) in deviceNameMaps" :key="index">
                      <i class="iconfont iconguanbi" style="font-size:12px;cursor: pointer;color: rgba(255, 101, 101, 1);margin-right: 5px;display: inline-block;margin-top: 1.2px;" @click="delRight(item, index)"></i>
                      <span class="cRlist-item">{{item.deviceName}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="select-item">
          <span class="select-item-name">事件类型</span>
          <div class="select-wrap">
            <span class="select-con"  @mouseenter="showPop('eventTypePopShow')" @mouseleave="hidePop()">
              <span class="content" style>{{eventTypesValues.join()}}</span>
              <i class="el-icon-arrow-up icon-arrow" style="color: #C0C4CC;font-size: 14px;"></i>
            </span>
          </div>

          <!-- 弹出框 -->
          <div class="group-pop-tpl eventType-tpl" v-show="eventTypePopShow" style="width: 240px;left: 0px;"  @mouseenter="showPop('eventTypePopShow')" @mouseleave="hidePop()">
            <div>
              <el-checkbox v-model="eventTypeCheckAll" @change="getAllEventType()">全部</el-checkbox>
              <el-checkbox v-model="eventTypeFilter" @change="checkboxFilter('eventTypeArr')">仅看选中</el-checkbox>

              <!-- <label class="group-checks">
                <input type="checkbox" v-model="eventTypeCheckAll" @change="getAllEventType()" />
                <i></i>
                <span>全部</span>
              </label>
              <label class="group-checks">
                <input type="checkbox" v-model="eventTypeFilter" @change="checkboxFilter('eventTypeArr')" />
                <i></i>
                <span>仅看选中</span>
              </label> -->
            </div>
            <div class="eventType-con">
              <el-checkbox
                style="width: 100px;margin-top: 15px;"
                v-show="item.show"
                v-for="(item,index) in eventTypeArr" :key="index"
                :label="item.dictName"
                v-model="item.checked"
                @change="getEventType()">
              </el-checkbox>

              <!-- <label class="group-checks" style="width:120px" v-show="item.show" v-for="(item,index) in eventTypeArr" :key="index">
                <input type="checkbox" v-model="item.checked" @change="getEventType()" />
                <i></i>
                <span>{{item.dictName}}</span>
              </label> -->
            </div>
          </div>
        </div>
        <div class="select-item select-item-time">
          <span>统计时间</span>
          <div class="select-wrap" style="margin-left: 5px;">
            <span
              class="select-con"
              style="justify-content:center;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
              @mouseenter="showPop('countPopShow')" @mouseleave="hidePop()"
            >{{ctType}}</span>
          </div>
          <!-- 弹出框 -->
          <count-time-query
            :countPopShow="countPopShow"
            @listenRadioName="listenRadioName"
            @listenCtFlag="listenCtFlag"
            @listenTime="listenTime"
            @listenHover="listenHover"
            @listenleave="listenleave"
          />
        </div>
        <div class="search-event">
          <input type="text" placeholder="事件描述" class="input-place-hoder" v-model="eventKeyword" @keydown.enter="queryFun()"/>
          <i class="iconfont iconiconfontsousuokuangsousuo" @click="queryFun()"></i>
        </div>
        <!-- 按钮区域 -->
        <div class="btn-con">
          <div class="tools-btn reset-btn" @click="reset()">重置</div>
          <div class="tools-btn search-btn" @click="queryFun()">查询</div>
        </div>
        <div class="clear"></div>
      </div>
    </div>
    <!-- 表格工具区域 -->
    <div class="table-tools" :style="{'padding-top': detailFullPage ? '20px' : 0}">
      <!-- <i
        class="iconfont icondaochu-"
        title="导出图表"
        style="color: #31d3c9;font-size: 25px;cursor: pointer;float:right;"
        @click="exportTable()"
      ></i> -->

      <my-paging
        v-if="this.timeType === 0"
        @change="data => deviceLogListByPageAndThroughTime.getData(data)"
        v-bind="deviceLogListByPageAndThroughTime.res.body"
        :total='deviceLogListByPageAndThroughTime.res.body.total > 10000 ? 10000 : deviceLogListByPageAndThroughTime.res.body.total'
        />
      <my-paging
        v-if="this.timeType != 0"
        @change="data => deviceLogListByPageAndStartTime.getData(data)"
        v-bind="deviceLogListByPageAndStartTime.res.body"
        :total='deviceLogListByPageAndStartTime.res.body.total > 10000 ? 10000 : deviceLogListByPageAndStartTime.res.body.total'
        />
    </div>
    <!-- 表格区域 -->
    <div class="tableCon">
      <el-table
      :data="tableData"
      v-loading="this.timeType === 0 ? deviceLogListByPageAndThroughTime.loading : deviceLogListByPageAndStartTime.loading"
      style="width: 100%"
      :max-height="detailFullPage ? winHeight -  100 - filterHeight : winHeight - 130 - filterHeight">
        <el-table-column fixed :prop="tdKey.stName" label="电站名称" width="180" sortable></el-table-column>
        <el-table-column :prop="tdKey.deviceTypeStr" label="设备类型" width="180" sortable></el-table-column>
        <el-table-column :prop="tdKey.deviceName" label="设备名称" width="180" sortable></el-table-column>
        <el-table-column :prop="tdKey.sStartTime" label="发生时间" width="180" sortable></el-table-column>
        <el-table-column :prop="tdKey.sEndTime" label="消缺时间" width="180" sortable></el-table-column>
        <el-table-column :prop="tdKey.eventDesc" label="事件类型"></el-table-column>
        <el-table-column :prop="tdKey.faultDesc" label="事件描述" width="250"></el-table-column>
        <el-table-column :prop="tdKey.handStatusStr" label="确认状态"></el-table-column>
        <el-table-column :prop="tdKey.sureUserRealName" label="确认人"></el-table-column>
        <el-table-column :prop="tdKey.sureTime" label="确认时间" width="180" ></el-table-column>
        <template slot="empty">
          <img src="@/assets/img/noData.png" alt="暂无数据">
        </template>
      </el-table>
      <i
      :class="{iconfont: true, iconshousuoshang: !detailFullPage, iconshousuoxia: detailFullPage}"
      @click="switchDetailFullPage()"
      :title="detailFullPage ? '缩小': '放大'"
      style="position: absolute;
            right: 0px;top: 0px;
            cursor: pointer;
            font-size: 15px;
            display: inline-block;
            width: 30px;
            height: 30px;
            text-align: center;
            line-height: 30px;
            color: rgba(255,255,255,.5);
            background: #18344c;"></i>
    </div>
    <!-- 动画 圆圈 -->
    <div class="goIndex-con">
      <div class="goIndex" @click="goIndex()">
        <div class="quan-big"></div>
        <div class="quan-middle"></div>
        <div class="quan-small"></div>
        <div class="qiu"></div>
      </div>
    </div>
  </div>
</template>

<script>
import countTimeQuery from '@/components/common/countTimeQuery'
import { Table, TableColumn, Select, Option, Message, Checkbox, CheckboxGroup } from 'element-ui'
import {
  api＿getAllComByRole,
  api＿getStByRoleAndComIds,
  api＿getDeviceTypeByStIds,
  api＿getDeviceByStIdsAndDeviceTypePage,
  api＿getDeviceEventType,
  api＿deviceLogListByPageAndThroughTime,
  api＿deviceLogListByPageAndStartTime,
  api＿getSTClassLIst
} from '@dataQuery/request/api'
// import {download} from '@comm/request/http'
import myPaging from '@comm/components/paging'

export default {
  name: 'deviceLogQuery',
  data () {
    return {
      // isCreated: true,
      filterHeight: 0,
      detailFullPage: false,
      requestParams: {},
      fileName1: '',
      fileName2: '',
      fileName3: '',
      getSTClassLIst: api＿getSTClassLIst({
        res: {
          data: []
        }
      }),
      getAllComByRole: api＿getAllComByRole({ later: true }),
      getStByRoleAndComIds: api＿getStByRoleAndComIds({ later: true }),
      getDeviceTypeByStIds: api＿getDeviceTypeByStIds({ later: true }),
      getDeviceByStIdsAndDeviceTypePage: api＿getDeviceByStIdsAndDeviceTypePage(
        { later: true }
      ),
      getDeviceEventType: api＿getDeviceEventType({ later: true }),
      deviceLogListByPageAndThroughTime: api＿deviceLogListByPageAndThroughTime(
        {
          later: true,
          res: {
            body: {
              total: 0
            }
          }
        }
      ),
      deviceLogListByPageAndStartTime: api＿deviceLogListByPageAndStartTime({
        later: true,
        res: {
          body: {
            total: 0
          }
        }
      }),
      winHeight: 0,
      logDetail: false,
      ctType: '流经时间',
      powerType: '',
      timeRange: '',
      prIndex: '01',
      deviceNameRadio: 0,
      powerStationRadio: 0,
      // 统计时间的数据
      trIndex: 1,
      timeReset: true,
      timeQueryKey: 0,
      startDate: '',
      endDate: '',
      timeType: '',
      timeTypeCopy: '',
      // 弹框的全部按钮
      groupCheckAll: true,
      stationCheckAll: true,
      deviceCheckAll: true,
      eventTypeCheckAll: true,
      deviceNameCheckAll: true,
      // 弹框的仅看选中
      groupFilter: false,
      deviceTypeFilter: false,
      powerStationFilter: false,
      eventTypeFilter: false,
      deviceNameFilter: false,
      // 弹框显示隐藏
      groupPopShow: false,
      countPopShow: false,
      deviceTypePopShow: false,
      powerStationPopShow: false,
      blocPopShow: false,
      deviceNamePopShow: false,
      eventTypePopShow: false,
      powerTypePopShow: false,
      timeRangePopShow: false,
      // 弹框show名集合
      popShowArr: [
        'groupPopShow',
        'countPopShow',
        'deviceTypePopShow',
        'powerStationPopShow',
        'blocPopShow',
        'deviceNamePopShow',
        'eventTypePopShow',
        'powerTypePopShow',
        'timeRangePopShow'
      ],
      // 弹框内的数据
      groupCheckArr: [
        {
          k: 0,
          v: '设备类型'
        },
        {
          k: 1,
          v: '集团'
        },
        {
          k: 2,
          v: '电站'
        },
        {
          k: 3,
          v: '设备'
        },
        {
          k: 4,
          v: '事件类型'
        }
      ],
      groupradioArr: [
        {
          k: 0,
          v: '日'
        },
        {
          k: 1,
          v: '月'
        },
        {
          k: 2,
          v: '年'
        }
      ],
      deviceTypeArr: [],
      powerStationArr: [],
      groupArr: [],
      deviceNameArr: [],
      eventTypeArr: [],
      psCheckedArr: [],
      dtCheckedArr: [],
      // 表格的数据
      tableData: [],
      tdKey: {
          stName: 'stName',
          deviceTypeStr: 'deviceTypeStr',
          deviceName: 'deviceName',
          sStartTime: 'sStartTime',
          sEndTime: 'sEndTime',
          eventDesc: 'eventDesc',
          faultDesc: 'faultDesc',
          handStatusStr: 'handStatusStr',
          sureTime: 'sureTime',
          sureUserRealName: 'sureUserRealName'
        },
      eventKeyword: '',
      // 点击弹框内的多选框 的数据
      comIds: [],
      stIds: '',
      deviceTypes: '',
      eventTypes: [],
      deviceNameIds: [],
      comValues: [],
      eventTypesValues: [],
      deviceNameValues: ['全部'],
      deviceNameMaps: [],
      stValues: [],
      psCheckeds: [],
      deviceTypesValues: [],
      dtCheckeds: [],
      // 电站数据
      stationKeyword: '',
      // 设备名称数据
      deviceNameKeyword: ''
    }
  },
  components: {
    countTimeQuery,
    myPaging,
    elTable: Table,
    elTableColumn: TableColumn,
    ElSelect: Select,
    ElOption: Option,
    ElCheckbox: Checkbox,
    ElCheckboxGroup: CheckboxGroup
  },
  mounted () {
    this.$nextTick(() => {
      this.filterHeight = this.$refs.filter.clientHeight
    })
  },
  created () {
    this.$bus.$emit('pageName', '设备运行日志查询')

    // this.isCreated = true
    this.winHeight = document.body.clientHeight

    // 电站分类 -- 默认选中光伏或者风电
    this.getSTClassLIst.getData({}).then(res => {
      this.prIndex = res.data.length === 1 ? res.data[0].id : '01'
      // 获取电站
      this.getPower()
    })
    // 获取表格默认数据
    var time = setInterval(res => {
      if (this.dtCheckeds.length > 0 && this.psCheckeds.length > 0) {
        this.queryFun()
        clearInterval(time)
      }
    }, 500)
  },
  watch: {
    // 选择的设备
    'deviceNameMaps': {
        handler: function (val, oldVal) {
            if (this.deviceNameMaps.length === 0) {
                this.deviceNameCheckAll = true
                this.deviceNameValues = ['全部']
                this.deviceNameIds = []
            } else {
                this.deviceNameCheckAll = false
                this.deviceNameValues = []
                this.deviceNameIds = []
                this.deviceNameMaps.forEach(v => {
                  this.deviceNameValues.push(v.deviceName)
                  this.deviceNameIds.push(v.st_eqid)
                })
            }
        },
        deep: true
    }
  },
  methods: {
    // 格式化时间
    FormatDateTime (UnixTime) {
      var date = new Date(UnixTime)
      var y = date.getFullYear()
      var m = date.getMonth() + 1
      m = m < 10 ? '0' + m : m
      var d = date.getDate()
      d = d < 10 ? '0' + d : d
      var h = date.getHours()
      h = h < 10 ? '0' + h : h
      var minute = date.getMinutes()
      minute = minute < 10 ? '0' + minute : minute
      return y + '-' + m + '-' + d + ' ' + h + ':' + minute
    },
    // 放大显示详情操作
    switchDetailFullPage () {
      this.detailFullPage = !this.detailFullPage
    },
    // 返回导航页
    goIndex () {
      this.$router.push({
        name: 'HomeNav'
      })
    },
    // 转换弹框
    showPop (self) {
      this.popShowArr.forEach(v => {
        if (v !== self) {
          this[v] = false
        }
      })
      this[self] = true
    },
    hidePop () {
      this.popShowArr.forEach(v => {
        this[v] = false
      })
    },
    // 重置按钮
    reset () {
      this.deviceNameMaps = []
      // 电站分类 -- 默认选中光伏或者风电
      this.getSTClassLIst.getData({}).then(res => {
        this.prIndex = res.data.length === 1 ? res.data[0].id : '01'
        this.getPower()
      })
      this.$bus.emit('resetTime')
    },
    // 获取统计时间子组件发送的radio的name
    listenRadioName (v) {
      this.ctType = v.name
      this.timeTypeCopy = v.radioIndex
    },
    // 获取统计时间子组件发送的隐藏flag
    listenCtFlag (v) {
      this.countPopShow = v
    },
    // 关闭日志明细
    closeCallback () {
      this.logDetail = false
    },
    // 获取统计时间
    listenTime (v) {
      this.startDate = v.startTime
      this.endDate = v.endTime
      this.timeTypeCopy = v.radioIndex
      this.trIndex = v.trIndex
    },
    // 监听鼠标移入
    listenHover () {
      this.showPop('countPopShow')
    },
    // 监听鼠标移出
    listenleave () {
      this.hidePop()
    },
    // --------------------------------------------------------------------上部单选框按钮方法集合
    // 点击电站类型
    getPower () {
      // 获取集团
      this.getAllComByRole.getData({ stClass: this.prIndex }).then(res => {
        this.groupArr = res.body || []
        this.groupArr.forEach(v => {
          v.show = v.checked = true
          this.comIds.push(v.comId)
          this.comValues.push(v.comName)
        })
        // 获取集团
        this.getGroup()
      })
      // 获取设备事件类型
      this.gainDeviceEventType()
    },
    // 多选集团
    getGroup () {
      this.comIds = []
      this.comValues = []
      this.groupArr.forEach(v => {
        if (v.checked) {
          this.comIds.push(v.comId)
          this.comValues.push(v.comName)
          if (this.comIds.length === this.groupArr.length) this.comValues = ['全部']
        }
      })
      this.groupCheckAll = this.comIds.length === this.groupArr.length

      if (this.comIds.length === 0) {
        this.powerStationArr = []
        this.deviceTypeArr = []
        this.dtCheckedArr = []
        this.deviceTypesValues = []
        this.dtCheckeds = []
        this.st_eqids = []
        this.deviceNameMaps = []
        this.deviceNameArr = []
        this.stValues = []
        this.deviceNameRadio = 0
        this.deviceNameKeyword = ''
        this.stIds = ''
      } else {
        // 获取电站
        this.getStByRoleAndComIds.getData({
          stClass: this.prIndex,
          comIds: this.comIds.join()
        }).then(res => {
          this.powerStationArr = res.body || []
          if (this.powerStationArr.length === 0) {
            this.st_eqids = this.deviceNameMaps = this.deviceNameArr = []
            this.stIds = ''
          }
          this.powerStationArr.forEach(v => {
            v.checked = v.show = true
            // this.stIds = this.powerStationArr[this.powerStationRadio].stId
            // this.stValues.push(v.stName)
          })
          // 多选电站
          this.getCheckStation()
        })
      }
    },
    // 多选电站
    getCheckStation () {
      this.stValues = []
      this.psCheckeds = []
      this.powerStationArr.forEach(v => {
        if (v.checked) {
          this.psCheckeds.push(v.stId)
          this.stValues.push(v.stName)
        }
      })
      this.stationCheckAll = this.stValues.length === this.powerStationArr.length
      if (this.stationCheckAll) this.stValues = ['全部']
      this.powerStationRadio = 0
      this.psCheckedArr = this.powerStationArr.filter(v => v.checked)

      // 获取设备类型
      if (this.psCheckeds.length === 0) {
        this.deviceTypeArr = []
        this.dtCheckedArr = []
        this.deviceTypesValues = []
        this.dtCheckeds = []
        this.st_eqids = []
        this.deviceNameMaps = []
        this.deviceNameArr = []
        this.deviceNameRadio = 0
        this.deviceNameKeyword = ''
      } else {
        this.getDeviceTypeByStIds.getData({
          stClass: this.prIndex,
          stIds: this.psCheckeds.join()
        }).then(res => {
          this.deviceTypeArr = res.body ? res.body : []
          this.deviceTypeArr.forEach(v => {
            v.show = v.checked = true
          })

          // 多选设备类型
          this.getChecksDeviceType()
        })
      }
    },
    // 单选电站
    getStation () {
      if (this.psCheckedArr.length === 0) {
        this.deviceTypeArr = this.st_eqids = this.deviceNameMaps = this.deviceNameArr = []
        this.deviceNameRadio = 0
      }
      // this.stIds = []
      // this.stValues = []
      // this.stIds = this.powerStationArr[this.powerStationRadio].stId

      this.deviceNameKeyword = ''
      // 获取设备名称
      this.gainDeviceName()

      // this.powerStationArr.forEach(v => {
      //   if (v.checked) {
      //     this.stIds.push(v.stId)
      //     this.stValues.push(v.stName)
      //   }
      // })

      // this.stationCheckAll = this.stIds.length === this.powerStationArr.length
      // 获取设备类型
      // this.getDeviceTypeByStIds.getData({
      //   stClass: this.prIndex,
      //   stIds: this.stIds
      // }).then(res => {
      //   this.deviceTypeArr = res.body
      //   // this.deviceTypeArr.forEach(v => {
      //   //   v.show = v.checked = true
      //   // })
      //   // 单选设备类型
      //   this.getDeviceType()
      // })
    },
    // 多选设备类型
    getChecksDeviceType () {
      this.deviceTypesValues = []
      this.dtCheckeds = []
      this.deviceTypeArr.forEach(v => {
        if (v.checked) {
          this.dtCheckeds.push(v.devid)
          this.deviceTypesValues.push(v.devtype)
        }
      })
      this.deviceCheckAll = this.deviceTypesValues.length === this.deviceTypeArr.length
      if (this.deviceCheckAll) this.deviceTypesValues = ['全部']
      this.deviceNameRadio = 0
      this.dtCheckedArr = this.deviceTypeArr.filter(v => v.checked)
      // 单选设备类型
      this.getDeviceType()
    },
    // 单选设备类型
    getDeviceType () {
      this.deviceTypes = this.dtCheckedArr[this.deviceNameRadio].devid
      // 获取设备名称
      this.gainDeviceName()
    },
    // 多选事件类型
    getEventType () {
      this.eventTypes = []
      this.eventTypesValues = []
      this.eventTypeArr.forEach(v => {
        if (v.checked) {
          this.eventTypes.push(v.dictValue)
          this.eventTypesValues.push(v.dictName)
        }
      })

      if (this.eventTypes.length === this.eventTypeArr.length) this.eventTypesValues = ['全部']
      this.eventTypeCheckAll =
        this.eventTypes.length === this.eventTypeArr.length
    },
    // 多选设备名称
    getDeviceName (checkItem) {
      // 获取右侧列表数据
      this.deviceNameMaps = [
        ...this.deviceNameMaps,
        ...JSON.parse(JSON.stringify(this.deviceNameArr))
      ]
      // 去重
      let hash = {}
      this.deviceNameMaps = this.deviceNameMaps.reduce((item, next) => {
        if (!hash[next.st_eqid] && next.checked) {
          hash[next.st_eqid] = true
          item.push(next)
        }
        return item
      }, [])

      // 取消勾选 -> 右侧列表删除
      this.deviceNameMaps.forEach((v, i) => {
        if (checkItem && !checkItem.checked && checkItem.st_eqid === v.st_eqid) {
          this.deviceNameMaps.splice(i, 1)
        }
      })
    },
    // 获取设备名称
    gainDeviceName () {
      if (this.psCheckedArr.length === 0) {
        this.deviceNameArr = []
        return
      }
      this.getDeviceByStIdsAndDeviceTypePage.getData({
        stClass: this.prIndex,
        comIds: this.comIds.join(),
        stIds: this.psCheckedArr[this.powerStationRadio].stId,
        deviceTypes: this.deviceTypes,
        keyword: this.deviceNameKeyword,
        pageIndex: 0,
        pageSize: 10
      })

      this.getDeviceByStIdsAndDeviceTypePage.subscribe(res => {
        this.deviceNameArr = res.body.data || []
        this.deviceNameArr.forEach(v => {
          // if (this.isCreated) {
          //   v.checked = true
          //   v.show = true
          // } else {
            v.checked = false
            v.show = true
          // }
        })
        // if (this.isCreated) {
        //   this.getDeviceName()
        // }
        // this.isCreated = false
      })
    },
    // 获取事件类型
    gainDeviceEventType () {
      this.getDeviceEventType.getData({
        dictType: this.prIndex === '01' ? 'EVENT_TYPE' : 'EVENT_TYPE_WP'
      }).then(res => {
        this.eventTypeArr = res
        this.eventTypeArr.forEach(v => {
          v.checked = true
          v.show = true
        })
        this.getEventType()
      })
    },
    // 电站的搜索框
    searchGroup () {
      this.powerStationArr.forEach(v => {
        v.show = v.stName.includes(this.stationKeyword)
      })
      this.$forceUpdate()
    },
    // --------------------------------------------------------------------弹出框的全部多选框方法组
    // 集团的全部多选框
    getAllGroup () {
      this.comIds = []
      this.comValues = []
      if (!this.groupCheckAll) {
        this.groupFilter = false
      }
      this.groupArr.forEach(v => {
        if (v.show === true) {
          v.checked = this.groupCheckAll
        }
        if (v.checked) {
          this.comIds.push(v.comId)
          this.comValues.push(v.comName)
          if (this.comIds.length === this.groupArr.length) this.comValues = ['全部']
        }
      })
      // 获取电站
      this.getStByRoleAndComIds.getData({
        stClass: this.prIndex,
        comIds: this.comIds.join()
      }).then(res => {
        this.powerStationArr = res.body || []
        this.powerStationArr.forEach(v => {
          v.show = true
          v.checked = true
          // this.stIds = this.powerStationArr[this.powerStationRadio].stId
        })

        // 多选电站
        this.getCheckStation()
      })
    },
    // 电站的全部多选框
    getAllSt () {
      this.psCheckeds = []
      this.stValues = []
      if (this.stationCheckAll === false) {
        this.powerStationFilter = false
      }
      this.powerStationArr.forEach(v => {
        v.checked = this.stationCheckAll
        if (v.checked) {
          this.psCheckeds.push(v.stId)
          this.stValues.push(v.stName)
        }
      })
      if (this.stationCheckAll) this.stValues = ['全部']
      this.psCheckedArr = this.powerStationArr.filter(v => v.checked)

      if (this.psCheckeds.length === 0) {
        this.deviceTypeArr = []
        this.dtCheckedArr = []
        this.deviceTypesValues = []
        this.dtCheckeds = []
        this.st_eqids = []
        this.deviceNameMaps = []
        this.deviceNameArr = []
        this.deviceNameRadio = 0
        this.deviceNameKeyword = ''
      } else {
        // 获取设备类型
        this.getDeviceTypeByStIds.getData({
          stClass: this.prIndex,
          stIds: this.psCheckeds.join()
        }).then(res => {
          this.deviceTypeArr = res.body ? res.body : []
          this.deviceTypeArr.forEach(v => {
            v.show = v.checked = true
          })

          // 多选设备类型
          this.getChecksDeviceType()
        })
      }
    },
    // 设备类型的全部多选框
    getAllDeviceType () {
      this.deviceTypes = []
      this.deviceTypesValues = []
      if (this.deviceCheckAll === false) {
        this.deviceTypeFilter = false
      }
      this.deviceTypeArr.forEach(v => {
        v.checked = this.deviceCheckAll
        if (v.checked) {
          this.deviceTypes.push(v.devid)
          this.deviceTypesValues.push(v.devtype)
        }
      })
      if (this.deviceCheckAll) this.deviceTypesValues = ['全部']
      this.dtCheckedArr = this.deviceTypeArr.filter(v => v.checked)
      // 单选设备类型
      this.getDeviceType()
    },
    // 事件类型的全部多选框
    getAllEventType () {
      this.eventTypes = []
      this.eventTypesValues = []
      if (this.eventTypeCheckAll === false) {
        this.eventTypeFilter = false
      }
      this.eventTypeArr.forEach(v => {
        if (v.show === true) {
          v.checked = this.eventTypeCheckAll
        }
        if (v.checked) {
          this.eventTypes.push(v.dictValue)
          this.eventTypesValues.push(v.dictName)
        }
      })
      if (this.eventTypeCheckAll) this.eventTypesValues = ['全部']
    },
    // 设备名称的全部多选框
    getAllDeviceName () {
      this.deviceNameMaps = []
      this.deviceNameArr.forEach(v => {
          v.checked = false
      })
    },
    // --------------------------------------------------------------------仅看选中按钮
    checkboxFilter (k) {
      var filterName = k.substr(0, k.length - 3)
      this[k].forEach(v => {
        v.show = this[filterName + 'Filter'] ? v.checked : true
      })
      this.$forceUpdate()
    },
    // --------------------------------------------------------------------设备名称 删除方法组
    // 删除单个
    delRight (v, i) {
      this.deviceNameMaps.splice(i, 1)
      this.deviceNameArr.forEach((vv, ii) => {
        if (vv.deviceId === v.deviceId) {
          vv.checked = false
        }
      })
    },
    // 删除全部
    delRightAll () {
      this.deviceNameMaps = []
      this.deviceNameArr.forEach(v => {
        v.checked = false
      })
    },
    // --------------------------------------------------------------------查询按钮方法
    // 查询按钮
    queryFun () {
      if (this.comIds.length === 0) {
        Message.error('请选择集团')
        return
      } else if (this.psCheckeds.length === 0) {
        Message.error('请选择电站')
        return
      } else if (this.dtCheckeds.length === 0) {
        Message.error('请选择设备类型')
        return
      }
      this.timeType = this.timeTypeCopy
      const interfaceName = this.timeType === 0 ? 'deviceLogListByPageAndThroughTime' : 'deviceLogListByPageAndStartTime'
      this.requestParams = {
          stClass: this.prIndex,
          comIds: this.groupCheckAll ? '' : this.comIds.join(),
          stIds: this.stationCheckAll ? '' : this.psCheckeds.join(),
          deviceTypes: this.deviceCheckAll ? '' : this.dtCheckeds.join(),
          st_eqids: this.deviceNameCheckAll ? '' : this.deviceNameIds.join(),
          eventTypes: this.eventTypeCheckAll ? '' : this.eventTypes.join(),
          isToday: this.trIndex,
          startDate: this.startDate,
          endDate: this.endDate
      }
      this[interfaceName].getData({
          ...this.requestParams,
          eventKeyword: this.eventKeyword,
          pageIndex: 0,
          pageSize: 10
      })
      this[interfaceName].subscribe(res => {
        this.tableData = res.body.data
        this.tableData.forEach(v => {
          v.sStartTime = v.sStartTime ? this.FormatDateTime(v.sStartTime) : null
          v.sEndTime = v.sEndTime ? this.FormatDateTime(v.sEndTime) : null
          v.sureTime = v.sureTime ? this.FormatDateTime(v.sureTime) : null
        })
      })
    }
    // 导出按钮
    // exportTable () {
    //   if (this.getSubjectList.res.body.total >= 10000) {
    //     Message.error('导出数据超过10000条,请重新选择条件')
    //     return
    //   }
    //   this.getSTClassLIst.res.data.forEach(v => {
    //     if (v.id === this.prIndex) {
    //       this.fileName1 = v.name
    //     }
    //   })
    //   this.objGroupOneArr.forEach(v => {
    //     if (v.typeCode === this.objGroupOneKey) {
    //       this.fileName2 = v.typeName
    //     }
    //   })
    //   this.ctimeRadioArr.forEach(vv => {
    //     if (vv.k === this.timeIndex) {
    //       this.fileName3 = vv.v
    //     }
    //   })
    //   let params = ''
    //   for (const key in this.requestParams) {
    //     if (this.requestParams.hasOwnProperty(key)) {
    //       if (this.requestParams[key]) {
    //         params += (key + '=' + this.requestParams[key] + '&')
    //       } else {
    //         params += (key + '=' + '&')
    //       }
    //     }
    //   }
    //   download({
    //     url: api＿subjectDateExportSubjectData + '?' + params + 'fileName=' + (this.fileName1 + '-' + this.fileName2 + '-' + this.fileName3)
    //   })
    // }
  }
}
</script>

<style lang="scss">
@import '@/assets/css/tableScroll.scss';

.device-log-query {
  $thBackground: #0d2d4f;
  $borderColor: #092139;
  $tbodyBackground: #124271;
  $tbodyHoverBackground: #1b4980;
  $thColor: #fff;
  $tbodyColor: #b2d8ff;
  $borderLeftDisplay: none;
  $thPadding: 15px 0;
  $tdPadding: 15px 0;
  @import '@/assets/css/table.scss';

  .el-input__inner, .el-textarea__inner {
      height: 28px;
      line-height: 28px;
      font-size: 12px;
      @include c(background-color, $bg_input_c1);
      @include c(border-color, $line_c1);
      @include c(color, $text_c2);

      &:focus, &:hover {
          @include c(border-color, $line_c1);
      }
  }
  .el-input__icon {
      line-height: 28px;
  }
}
</style>

<style lang="scss" scoped>
@import './index.scss';
</style>
