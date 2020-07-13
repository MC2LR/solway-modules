<template>
  <div class="device-log-statistics" :style="{height: winHeight - 75 + 'px'}">
    <!-- 统计分组 -->
    <div class="grop-wrap">
      <span class="title">统计分组</span>
      <!-- <el-select v-model="queryForm" filterable multiple clearable placeholder="全部" style="width: 300px" @change="getSort()" @remove-tag="removeTag()">
          <el-option
              v-for="item in groupCheckArr"
              :key="item.k"
              :label="item.v"
              :value="item.k"
              :disabled="item.disabled">
          </el-option>
      </el-select> -->
      <div class="grop-con" @mouseover="showPop('groupPopShow')" @mouseleave="hidePop()">
        <div style="display:inline-block;padding-right:20px;vertical-align: text-top;">
          <span style="margin-right:10px;" v-for="(item,index) in sortIds" :key="index">
            {{item.v}}
            <i class="iconfont iconguanbi" style="color:#FF6565;font-size: 12px;" @click.stop="deleteSort(item, index)"></i>
          </span>
        </div>
        <i class="el-icon-arrow-up icon-arrow" style="color: #C0C4CC;font-size: 14px;"></i>
      </div>
      <!-- 弹出框 -->
      <div class="group-pop-tpl sort-tpl" v-show="groupPopShow" style="width: 250px;padding: 15px 0;top: 27px;" @mouseover="showPop('groupPopShow')" @mouseleave="hidePop()">
        <ul class="sort-con">
          <li v-for="(item,index) in groupCheckArr" :key="index" v-show="item.show" @click="getSort(item)">{{item.v}}</li>
        </ul>
      </div>
    </div>
    <!-- 下拉框选择区域 -->
    <div class="tools-wrap">
      <div class="tools-l-con">
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
            <!-- <span class="select-con" @click="showPop('powerTypePopShow')">
              <span class="content" style>{{powerType}}</span>
              <i
                class="iconfont iconxialajiantou"
                style="vertical-align: middle;padding-left: 10px;display: block;"
              ></i>
            </span> -->
          </div>

          <!-- 弹出框 -->
          <!-- <div class="group-pop-tpl" v-show="powerTypePopShow">
            <div>
              <label class="group-radio" v-for="(item,index) in getSTClassLIst.res.data" :key="index">
                <input type="radio" name="queryPowerTypeRadio" :value="item.id" v-model="prIndex" @change="getPower(item)" />
                <i></i>
                <span>{{item.name}}</span>
              </label>
            </div>
          </div> -->
        </div>
        <div class="select-item">
          <span class="select-item-name" style="flex: 0 0 40px;">集团</span>
          <div class="select-wrap">
            <span class="select-con" @mouseover="showPop('blocPopShow')" @mouseleave="hidePop()">
              <span class="content" style>{{comValues.join()}}</span>
              <i class="el-icon-arrow-up icon-arrow" style="color: #C0C4CC;font-size: 14px;"></i>
            </span>
          </div>

          <!-- 弹出框 -->
          <div class="group-pop-tpl jituan-tpl" style="width: 320px;left: 0;" v-show="blocPopShow" @click.stop @mouseover="showPop('blocPopShow')" @mouseleave="hidePop()">
            <div>
              <label class="group-checks">
                <input type="checkbox" v-model="groupCheckAll" @change="getAllGroup()" />
                <i></i>
                <span>全部</span>
              </label>
              <label class="group-checks">
                <input type="checkbox" v-model="groupFilter" @change="checkboxFilter('groupArr')" />
                <i></i>
                <span>仅看选中</span>
              </label>
            </div>
            <div class="jituan-con">
              <label
                class="group-checks"
                style="width: 260px;"
                v-show="item.show"
                v-for="(item,index) in groupArr"
                :key="index"
              >
                <input type="checkbox" v-model="item.checked" @change="getGroup()" />
                <i></i>
                <span>{{item.comName}}</span>
              </label>
            </div>
          </div>
        </div>
        <div class="select-item">
          <span class="select-item-name" style="flex: 0 0 40px;">电站</span>

          <div class="select-wrap">
            <span class="select-con" @mouseover="showPop('powerStationPopShow')" @mouseleave="hidePop()">
              <span class="content" style>{{stValues.join()}}</span>
              <i class="el-icon-arrow-up icon-arrow" style="color: #C0C4CC;font-size: 14px;"></i>
            </span>
          </div>

          <div class="group-pop-tpl powerStation-tpl" style="width:320px;left: -28px;" v-show="powerStationPopShow" @mouseover="showPop('powerStationPopShow')" @mouseleave="hidePop()">
            <span class="search-con">
              <input type="text" placeholder="关键字" v-model="stationKeyword" @keydown.enter="searchGroup()"/>
              <i class="iconfont iconiconfontsousuokuangsousuo" @click="searchGroup()"></i>
            </span>
            <div>
              <label class="group-checks">
                <input type="checkbox" v-model="stationCheckAll" @change="getAllSt()" />
                <i></i>
                <span>全部</span>
              </label>
              <label class="group-checks">
                <input type="checkbox" v-model="powerStationFilter" @change="checkboxFilter('powerStationArr')" />
                <i></i>
                <span>仅看选中</span>
              </label>
            </div>
            <div class="station-con">
              <label
                class="group-checks"
                v-for="(item,index) in powerStationArr"
                :key="index"
                v-show="item.show"
              >
                <input type="checkbox" v-model="item.checked" @change="getCheckStation()" />
                <i></i>
                <span>{{item.stName.trim()}}</span>
              </label>
            </div>
          </div>
        </div>
        <div class="select-item">
          <span class="select-item-name">设备类型</span>

          <div class="select-wrap">
            <span class="select-con" @mouseover="showPop('deviceTypePopShow')" @mouseleave="hidePop()">
              <span class="content" style>{{deviceTypesValues.join()}}</span>
              <i class="el-icon-arrow-up icon-arrow" style="color: #C0C4CC;font-size: 14px;"></i>
            </span>
          </div>

          <div class="group-pop-tpl deviceType-tpl" style="width:260px;left: 0px;" v-show="deviceTypePopShow" @mouseover="showPop('deviceTypePopShow')" @mouseleave="hidePop()">
            <div>
              <label class="group-checks">
                <input type="checkbox" v-model="deviceCheckAll" @change="getAllDeviceType()" />
                <i></i>
                <span>全部</span>
              </label>
              <label class="group-checks">
                <input type="checkbox" v-model="deviceTypeFilter" @change="checkboxFilter('deviceTypeArr')" />
                <i></i>
                <span>仅看选中</span>
              </label>
            </div>
            <div class="deviceType-con">
              <label class="group-checks" v-show="item.show" v-for="(item,index) in deviceTypeArr" :key="index">
                <input type="checkbox" v-model="item.checked" @change="getChecksDeviceType()" />
                <i></i>
                <span>{{item.devtype}}</span>
              </label>
            </div>
          </div>
        </div>
        <div class="select-item">
          <span class="select-item-name">设备名称</span>
          <div class="select-wrap">
            <span class="select-con" @mouseover="showPop('deviceNamePopShow')" @mouseleave="hidePop()">
              <span class="content" style>{{deviceNameValues.join()}}</span>
              <i class="el-icon-arrow-up icon-arrow" style="color: #C0C4CC;font-size: 14px;"></i>
            </span>
          </div>

          <!-- 弹出框 -->
          <div class="deviceName-tpl" v-show="deviceNamePopShow" style="width: 920px;"  @mouseover="showPop('deviceNamePopShow')" @mouseleave="hidePop()">
            <!-- 全选按钮 -->
            <div>
              <label class="group-checks">
                <input type="checkbox" v-model="deviceNameCheckAll" @change="getAllDeviceName()" />
                <i></i>
                <span>全部</span>
              </label>
            </div>
            <!-- 设备类型单选 -->
            <div>
              <label class="group-radio" v-for="(item,index) in dtCheckedArr" :key="index" style="cursor: pointer;">
                <input type="radio" name="deviceNameRadio" :value="index" v-model="deviceNameRadio" @change="getDeviceType()" />
                <i></i>
                <span>{{item.devtype}}</span>
              </label>
            </div>
            <!-- 三列区域 -->
            <div class="third-col">
              <!-- 电站选择区域 -->
              <div class="group-pop-tpl" style="margin-right: 20px;height: 300px">
                <span class="search-con">
                  <input type="text" placeholder="关键字" v-model="stationKeyword" @keydown.enter="searchGroup()"/>
                  <i class="iconfont iconiconfontsousuokuangsousuo" @click="searchGroup()"></i>
                </span>
                <div class="pop-over-con" style="height: 240px">
                  <label
                    class="group-radio"
                    style="width: 190px;"
                    v-for="(item,index) in psCheckedArr"
                    :key="index"
                    v-show="item.show"
                  >
                    <input type="radio" name="psRadio" :value="index" v-model="powerStationRadio" @change="getStation()" />
                    <i></i>
                    <span>{{item.stName.trim()}}</span>
                  </label>
                </div>
              </div>
              <!-- 设备选择区域 -->
              <div class="group-pop-tpl" style="margin-right: 20px;height: 300px">
                <span class="search-con">
                  <input type="text" placeholder="关键字" v-model="deviceNameKeyword" @keydown.enter="gainDeviceName()"/>
                  <i class="iconfont iconiconfontsousuokuangsousuo" @click="gainDeviceName()"></i>
                </span>
                <div>
                  <my-paging
                      :pageSizeArr="[1, 5]"
                      v-if="getDeviceByStIdsAndDeviceTypePage.res.body && getDeviceByStIdsAndDeviceTypePage.res.body.total"
                      @change="data => getDeviceByStIdsAndDeviceTypePage.getData(data)"
                      v-bind="getDeviceByStIdsAndDeviceTypePage.res.body"/>
                </div>
                <div class="pop-over-con" style="height: 195px">
                  <label class="group-checks" style="width: 160px;" v-show="item.show" v-for="(item,index) in deviceNameArr" :key="index">
                    <input type="checkbox" v-model="item.checked" @change="getDeviceName(item)" />
                    <i></i>
                    <span>{{item.deviceName}}</span>
                  </label>
                </div>
              </div>
              <!-- 选择结果区域 -->
              <div class="chooseRight" style="height: 300px">
                <div class="cRtop">
                    <span style="display:inline-block;width:5px;height:5px;background:rgba(56,218,208,1);border-radius:50%;margin-bottom: 3px;margin-right: 5px;"></span>
                    <span>已选择</span>
                    <div class="deleteAll" @click="delRightAll()">
                        <i class="iconfont iconshanchu1" style="font-size:12px;"></i>
                        全部删除
                    </div>
                </div>
                <div class="cRlist" :style="{'margin-top': 20 +'px', 'height': 240 +'px'}">
                  <div class="cRlist-con" v-for="(item,index) in deviceNameMaps" :key="index">
                      <i class="iconfont iconguanbi" style="font-size:12px;cursor: pointer;color: rgba(255, 101, 101, 1);margin-right: 5px;display: inline-block;margin-top: 1.2px;" @click="delRight(index)"></i>
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
            <span class="select-con"  @mouseover="showPop('eventTypePopShow')" @mouseleave="hidePop()">
              <span class="content" style>{{eventTypesValues.join()}}</span>
              <i class="el-icon-arrow-up icon-arrow" style="color: #C0C4CC;font-size: 14px;"></i>
            </span>
          </div>

          <!-- 弹出框 -->
          <div class="group-pop-tpl eventType-tpl" v-show="eventTypePopShow" style="width: 270px;left: 0;"  @mouseover="showPop('eventTypePopShow')" @mouseleave="hidePop()">
            <div>
              <label class="group-checks">
                <input type="checkbox" v-model="eventTypeCheckAll" @change="getAllEventType()" />
                <i></i>
                <span>全部</span>
              </label>
              <label class="group-checks">
                <input type="checkbox" v-model="eventTypeFilter" @change="checkboxFilter('eventTypeArr')" />
                <i></i>
                <span>仅看选中</span>
              </label>
            </div>
            <div class="eventType-con">
              <label class="group-checks" style="width:120px" v-show="item.show" v-for="(item,index) in eventTypeArr" :key="index">
                <input type="checkbox" v-model="item.checked" @change="getEventType()" />
                <i></i>
                <span>{{item.dictName}}</span>
              </label>
            </div>
          </div>
        </div>
        <div class="select-item select-item-time">
          <span>统计时间</span>
          <div class="select-wrap countTime-con" style="margin-left: 5px;" @mouseover="showPop('countPopShow')" @mouseleave="hidePop()">
            <span class="countTime-name">{{ctType.v}}</span>
            <!-- 弹出框 -->
            <count-time
              :countPopShow="countPopShow"
              @listenRadioName="listenRadioName"
              @listenTimeArr="listenTimeArr"
              @listenCtFlag="listenCtFlag"
              @listenHover="listenHover"
              @listenleave="listenleave"
            />
          </div>
        </div>
        <!-- <div class="search-event">
          <input type="text" placeholder="事件描述" v-model="eventKeyword" @keydown.enter="queryFun()"/>
          <i class="iconfont iconiconfontsousuokuangsousuo" @click="queryFun()"></i>
        </div> -->
      </div>
      <div class="btn-con">
        <div class="tools-btn reset-btn" @click="reset()">重置</div>
        <div class="tools-btn search-btn" @click="queryFun()">查询</div>
      </div>
      <div class="clear"></div>
     </div>
    <!-- 表格区域 -->
    <div class="table-tools">
      <i
        class="iconfont icondaochu-"
        title="导出图表"
        style="color: #31d3c9;font-size: 25px;cursor: pointer;float:right;"
      ></i>
    </div>
    <!-- <el-table :data="sTableData" v-loading="deviceLogStat.loading" style="width: 100%" :height="winHeight - 210 + 'px'" :border='false' @cell-click="cellClick">
      <el-table-column v-for="(item,index) in tdHeader" :key="item.k" :fixed="index===0" :property="item.k" :label="item.v">
        <template slot-scope="scope">
              {{scope.row[scope.column.property]}}
        </template>
      </el-table-column>
      <template slot="empty">
        <img src="@/assets/img/noData.png" alt="暂无数据">
      </template>
    </el-table> -->
    <!-- 表格合并区域 -->
    <table>
      <tr>
        <th v-for="(item) in tdHeader" :key="item.k">{{item.v}}</th>
      </tr>
    </table>
    <mergeTable :TableData='sTableData' :sortKeys='sortKeys' :sortValues='sortValues'/>
    <!-- <table>
      <tr>
        <th v-for="(item) in tdHeader" :key="item.k">{{item.v}}</th>
      </tr>
      <tr v-for="(v, i) in sTableData" :key="i">
        <td>
          {{v.st_name}}
          <template v-if="Object.keys(v).some(vv => Array.isArray(v[vv]))">
            <table>
              <tr v-for="(vv, ii) in v[vv]" :key="ii">
                <td>{{vv.s_start_time}}</td>
              </tr>
            </table>
          </template>
        </td>
      </tr>
    </table> -->
    <!-- 设备运行日志明细弹出框 -->
    <div
      class="alertModal"
      :style="{'height':logDetail ? winHeight + 'px' : 0}"
      @click="closeCallback()"
    >
      <log-detail />
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
import countTime from '@/components/common/countTime'
import logDetail from '@/components/homePage/deviceLogStatistics/components/logDetail'
import mergeTable from './mergeTable'
import {
  api＿getAllComByRole,
  api＿getStByRoleAndComIds,
  api＿getDeviceTypeByStIds,
  api＿getDeviceByStIdsAndDeviceTypePage,
  api＿getDeviceEventType,
  api＿deviceLogListByPageAndThroughTime,
  api＿deviceLogListByPageAndStartTime,
  api＿getSTClassLIst,
  api＿deviceLogStat
} from '@dataQuery/request/api'
import myPaging from '@comm/components/paging'
import { Table, TableColumn, Select, Option, Message } from 'element-ui'
let obj = {}

export default {
  name: 'deviceLogStatistics',
  data () {
    return {
      isCreated: true,
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
        { later: true }
      ),
      deviceLogListByPageAndStartTime: api＿deviceLogListByPageAndStartTime({
        later: true
      }),
      deviceLogStat: api＿deviceLogStat({
        later: true
      }),
      winHeight: 0,
      logDetail: false,
      powerType: '',
      prIndex: '01',
      deviceNameRadio: 0,
      powerStationRadio: 0,
      queryForm: [3],
      // 统计时间的数据
      ctType: {},
      dates: [],
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
      // 弹框show名集合
      popShowArr: [
        'groupPopShow',
        'countPopShow',
        'deviceTypePopShow',
        'powerStationPopShow',
        'blocPopShow',
        'deviceNamePopShow',
        'eventTypePopShow',
        'powerTypePopShow'
      ],
      // 弹框内的数据
      // 统计分组
      groupCheckArr: [
        {
          k: 1,
          v: '设备类型',
          group: 1,
          show: true
        },
        {
          k: 2,
          v: '集团',
          group: 2,
          show: true
        },
        {
          k: 3,
          v: '电站',
          group: 3,
          show: true
        },
        {
          k: 4,
          v: '设备',
          group: 4,
          show: true
        },
        {
          k: 5,
          v: '事件类型',
          group: 5,
          show: true
        },
        {
          k: 8,
          v: '日',
          group: 6,
          show: true
        },
        {
          k: 7,
          v: '月',
          group: 6,
          show: true
        },
        {
          k: 6,
          v: '年',
          group: 6,
          show: true
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
      sTableData: [],
      tdHeader: [],
      eventKeyword: '',
      loopLevel: '',
      thArrMap: {
        1: 'device_type',
        2: 'companyid',
        3: 'pstationid',
        4: 'st_eqid',
        5: 'event_type',
        6: 's_start_time',
        7: 's_start_time',
        8: 's_start_time'
      },
      thNameMap: {
        1: 'device_type_str',
        2: 'com_name',
        3: 'st_name',
        4: 'device_name',
        5: 'event_type_str',
        6: 's_start_time',
        7: 's_start_time',
        8: 's_start_time'
      },
      level: 0,
      column_row_offset: {},
      now_col_row_num: {},
      now_col_offset: {},
      // 点击弹框内的多选框 获取的数据
      groupRadioModel: 8,
      sortIds: [],
      sortKeys: [],
      sortValues: [],
      comIds: [],
      psCheckds: [],
      stIds: '',
      stValues: [],
      deviceTypes: '',
      dtCheckeds: [],
      eventTypes: [],
      deviceNameIds: [],
      comValues: [],
      eventTypesValues: [],
      deviceNameValues: [],
      deviceTypesValues: [],
      deviceNameMaps: [],
      // 电站数据
      stationKeyword: '',
      // 设备名称数据
      deviceNameKeyword: ''
    }
  },
  components: {
    countTime,
    logDetail,
    myPaging,
    mergeTable,
    elTable: Table,
    elTableColumn: TableColumn,
    ElSelect: Select,
    ElOption: Option
  },
  created () {
    this.$bus.$emit('pageName', '设备运行日志统计')

    this.isCreated = true
    this.winHeight = document.body.clientHeight
    // 电站分类 -- 默认选中光伏或者风电
    this.getSTClassLIst.getData({}).then(res => {
      res.data.forEach(v => {
        if (res.data.length === 1) {
          this.prIndex = v.id
        } else {
          this.prIndex = '01'
        }
      })
      // 获取电站
      this.getPower()
    })
    // 统计分组 -> 默认选中
    this.getSort({
      k: 3,
      v: '电站',
      group: 3,
      show: true
    })
  },
  methods: {
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
      // 电站分类 -- 默认选中光伏或者风电
      this.getSTClassLIst.getData({}).then(res => {
        res.data.forEach(v => {
          if (res.data.length === 1) {
            this.prIndex = v.id
          } else {
            this.prIndex = '01'
          }
        })
        this.getPower()
      })
    },
    // 获取统计时间子组件发送的radio的name
    listenRadioName (v) {
      this.ctType = v
    },
    // 获取统计时间子组件发送的时间数组
    listenTimeArr (v) {
      this.dates = v
    },
    // 获取统计时间子组件发送的隐藏flag
    listenCtFlag (v) {
      this.countPopShow = v
    },
    // 监听鼠标移入
    listenHover () {
      this.showPop('countPopShow')
    },
    // 监听鼠标移出
    listenleave () {
      this.hidePop()
    },
    // 关闭日志明细
    closeCallback () {
      this.logDetail = false
    },
    // 点击表格 弹出明细组件
    cellClick (row, column, cell, event) {
      if (column.property === 'name') {
        this.logDetail = true
        this.popShowArr.forEach(v => {
          this[v] = false
        })
      }
    },
    // --------------------------------------------------------------------上部单选框按钮方法集合
    // 点击统计分组
    getSort (item) {
      // let arr = this.groupCheckArr.filter(v => v.k === this.queryForm[this.queryForm.length - 1])
      this.groupCheckArr.forEach(v => {
        if (v.k === item.k) {
          this.sortIds.push(item)
        }
        if (v.group === item.group) {
          v.show = false
        }
      })
    },
    // 删除统计分组
    deleteSort (item, i) {
      this.sortIds.splice(i, 1)
      this.groupCheckArr.forEach(v => {
        if (v.group === item.group) {
          v.show = true
        }
      })
    },
    // 点击电站类型
    getPower () {
      // 获取集团
      this.getAllComByRole.getData({ stClass: this.prIndex }).then(res => {
        this.groupArr = res.body
        this.groupArr.forEach(v => {
          v.show = v.checked = true
          this.comIds.push(v.comId)
          this.comValues.push(v.comName)
        })
        // 获取集团
        this.getGroup()
      })
      // 获取事件类型
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

      // 获取电站
      this.getStByRoleAndComIds.getData({
        stClass: this.prIndex,
        comIds: this.comIds.join()
      }).then(res => {
        this.powerStationArr = res.body
        if (this.powerStationArr.length === 0) {
          this.st_eqids = this.deviceNameMaps = this.deviceNameArr = []
          this.stIds = ''
          return
        }
        this.powerStationArr.forEach(v => {
          v.checked = v.show = true
        })
        // 多选电站
        this.getCheckStation()
      })
    },
    // 多选电站
    getCheckStation () {
      this.stValues = []
      this.psCheckds = []
      this.powerStationArr.forEach(v => {
        if (v.checked) {
          this.psCheckds.push(v.stId)
          this.stValues.push(v.stName)
        }
      })
      this.stationCheckAll = this.stValues.length === this.powerStationArr.length
      if (this.stationCheckAll) this.stValues = ['全部']
      this.powerStationRadio = 0
      this.psCheckedArr = this.powerStationArr.filter(v => v.checked)
      // 单选电站
      this.getStation()
      // 获取设备类型
      this.getDeviceTypeByStIds.getData({
        stClass: this.prIndex,
        stIds: this.psCheckds.join()
      }).then(res => {
        this.deviceTypeArr = res.body
        this.deviceTypeArr.forEach(v => {
          v.show = v.checked = true
        })
        // 多选设备类型
        this.getChecksDeviceType()
      })
    },
    // 单选电站
    getStation () {
      if (this.psCheckedArr.length === 0) {
        this.deviceTypeArr = this.st_eqids = this.deviceNameMaps = this.deviceNameArr = []
        this.deviceNameRadio = 0
        return
      }
      this.deviceNameKeyword = ''
      // 获取设备名称
      this.gainDeviceName()
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
      this.deviceTypes = this.deviceTypeArr[this.deviceNameRadio].devid
      // 获取设备名称
      this.gainDeviceName()
    },
    // 多选事件类型
    getEventType () {
      this.eventTypes = []
      this.eventTypesValues = []
      this.eventTypeArr.forEach(v => {
        if (v.checked) {
          this.eventTypes.push(v.id)
          this.eventTypesValues.push(v.dictName)
        }
      })

      if (this.eventTypes.length === this.eventTypeArr.length) {
        this.eventTypesValues = ['全部']
      }
      this.eventTypeCheckAll =
        this.eventTypes.length === this.eventTypeArr.length
    },
    // 多选设备名称
    getDeviceName (checkItem) {
      this.deviceNameIds = []
      this.deviceNameValues = []

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

      this.deviceNameMaps.forEach(v => {
        this.deviceNameIds.push(v.st_eqid)
        this.deviceNameValues.push(v.deviceName)
      })

      this.deviceNameCheckAll = this.deviceNameArr.filter(v => v.checked).length === this.deviceNameArr.length

      if (this.deviceNameCheckAll) this.deviceNameValues = ['全部']
    },
    // 获取设备名称
    gainDeviceName () {
      this.getDeviceByStIdsAndDeviceTypePage.getData({
        stClass: this.prIndex,
        comIds: this.comIds.join(),
        stIds: this.psCheckedArr[this.powerStationRadio].stId,
        deviceTypes: this.deviceTypes,
        keyword: this.deviceNameKeyword,
        pageIndex: 1,
        pageSize: 5
      })

      this.getDeviceByStIdsAndDeviceTypePage.subscribe(res => {
        this.deviceNameArr = res.body.data
        this.deviceNameArr.forEach(v => {
          if (this.isCreated) {
            v.show = v.checked = true
          } else {
            v.checked = false
            v.show = true
          }
          if (!v.checked) {
            this.deviceNameCheckAll = false
          }
        })
        if (this.isCreated) {
          this.getDeviceName()
        }
        this.isCreated = false
      })
    },
    // 获取事件类型
    gainDeviceEventType () {
      this.getDeviceEventType.getData({
        dictType: this.prIndex === '01' ? 'EVENT_TYPE' : 'EVENT_TYPE_WP'
      }).then(res => {
        this.eventTypeArr = res
        this.eventTypeArr.forEach(v => {
          v.show = v.checked = true
        })
        this.getEventType()
      })
    },
    // 电站的搜索框
    searchGroup () {
      this.powerStationArr.forEach(v => {
        if (v.stName.includes(this.stationKeyword)) {
          v.show = true
        } else {
          v.show = false
        }
      })
      this.$forceUpdate()
    },
    // --------------------------------------------------------------------弹出框的全部多选框方法组
    // 集团的全部多选框
    getAllGroup () {
      this.comIds = []
      this.comValues = []
      if (this.groupCheckAll === false) {
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
        this.powerStationArr = res.body
        if (this.powerStationArr.length === 0) {
          this.st_eqids = this.deviceNameMaps = this.deviceNameArr = []
          return
        }
        this.powerStationArr.forEach(v => {
          v.checked = v.show = true
        })
        // 单选电站
        this.getStation()
      })
    },
    // 电站的全部多选框
    getAllSt () {
      this.psCheckds = []
      this.stValues = []
      if (this.stationCheckAll === false) {
        this.powerStationFilter = false
      }
      this.powerStationArr.forEach(v => {
        v.checked = this.stationCheckAll
        if (v.checked) {
          this.psCheckds.push(v.stId)
          this.stValues.push(v.stName)
        }
      })
      if (this.stationCheckAll) this.stValues = ['全部']
      this.psCheckedArr = this.powerStationArr.filter(v => v.checked)
      // 单选电站
      this.getStation()
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
          this.eventTypes.push(v.id)
          this.eventTypesValues.push(v.dictName)
        }
      })
      if (this.eventTypeCheckAll) {
        this.eventTypesValues = ['全部']
      }
    },
    // 设备名称的全部多选框
    getAllDeviceName () {
      this.deviceNameIds = []
      this.deviceNameValues = []
      this.deviceNameArr.forEach(v => {
        v.checked = this.deviceNameCheckAll
        if (v.checked) {
          this.deviceNameValues.push(v.deviceName)
        }
      })
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

      this.deviceNameMaps.forEach(v => {
        this.deviceNameIds.push(v.st_eqid)
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
    delRight (i) {
      this.deviceNameMaps.splice(i, 1)
    },
    // 删除全部
    delRightAll () {
      this.deviceNameMaps = []
    },
    // 处理表格数据
    // thArrMap: {
    //   1: 'device_type',
    //   2: 'companyid',
    //   3: 'pstationid',
    //   4: 'st_eqid',
    //   5: 'event_type',
    //   6: 's_start_time',
    //   7: 's_start_time',
    //   8: 's_start_time'
    // },
    // thNameMap: {
    //   1: 'device_type_str',
    //   2: 'com_name',
    //   3: 'st_name',
    //   4: 'device_name',
    //   5: 'event_type_str',
    //   6: 's_start_time',
    //   7: 's_start_time',
    //   8: 's_start_time'
    // }
    // [1,2,3]
    initTableData (data, level) {
      this.sortKeys = [2, 1]
      data.forEach((v) => {
        var key = this.thNameMap[this.sortKeys[level]]
        // obj = {
        //       [key]: v[key],
        //       doc_count: v.doc_count
        //     }

        obj[key] = v[key]
        obj.doc_count = v.doc_count

        // let obj
        // if (level === this.loopLevel - 1) {
        //   for (var j = 0; j < this.loopLevel; j++) {
        //     var key = this.thNameMap[this.sortKeys[j]]
        //     obj[this.thNameMap[this.sortKeys[j]]] = v[key]
        //     obj.doc_count = v.doc_count
        //     obj = {
        //       [key]: v[key],
        //       doc_count: v.doc_count
        //     }
        //   }
        // }

        this.tableData.push(obj)
        // let arrName = this.thArrMap[this.sortKeys[level]]
        Object.keys(v).forEach(vv => {
          if (Array.isArray(v[vv])) {
            this.initTableData(v[vv], ++this.level)
          }
        })
      })
    },
    // --------------------------------------------------------------------查询按钮方法
    // 查询按钮
    queryFun () {
      if (this.dates.length === 0) {
        Message.error('统计时间必选')
        return
      }
      if (this.sortIds.length === 0) {
        Message.error('统计分组必选')
        return
      }
      this.sortKeys = this.sortIds.map(v => v.k)
      this.sortValues = this.sortKeys.map(v => {
        return this.thNameMap[v]
      })
      this.tdHeader = [...this.sortIds, {v: '事件发生次数', k: 'doc_count'}]
      this.deviceLogStat.getData({
          stClass: '01',
          dates: '2019-07-20_2019-07-30',
          dateType: 4,
          group: this.sortKeys.join()
          // stClass: this.prIndex,
          // comIds: this.comIds.join(),
          // stIds: this.psCheckds.join(),
          // deviceTypes: this.dtCheckeds.join(),
          // st_eqids: this.deviceNameIds.join(),
          // eventTypes: this.eventTypes.join(),
          // eventKeyword: this.eventKeyword,
          // group: this.sortIds.map(v => v.k).join(),
          // dateType: this.ctType.k,
          // dates: this.dates.join()
        })
        .then(res => {
          this.sTableData = res.body
          this.loopLevel = this.sortKeys.length
          this.sortKeys.forEach(v => {
            this.column_row_offset[this.thNameMap[v]] = []
          })
          this.column_row_offset.doc_count = []

          // this.initTableData(this.sTableData, 0)
          this.formatTable()
        })
    },
    formatTable () {
      // var key = this.thNameMap[this.sortKeys[0]]
      // this.sTableData.forEach(v => {
      //   v[key]
      // })
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/css/tableScroll.scss';

.device-log-statistics {
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

  .el-form-item__label {
      @include c(color, $text_c2);
  }

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

  .el-input__suffix {
      right: 10px;
  }
}
</style>

<style lang="scss" scoped>
@import './index.scss';
</style>
