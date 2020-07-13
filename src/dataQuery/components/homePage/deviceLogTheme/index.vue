<template>
  <div class="device-theme-query" :style="{height: winHeight - 75 + 'px'}">
    <!-- 下拉框选择区域 -->
    <div class="tools-wrap" v-show="!detailFullPage">
      <!-- 第一栏下拉框 -->
      <div class="tools-t-con">
        <!-- 电站分类 -->
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
        <!-- 对象分组 -->
        <div class="select-item">
          <span class="select-item-name">对象分组</span>

          <div class="select-wrap powerType-con">
            <el-select v-model="objGroupOneKey" style="width: 100px;margin-right: 20px" @change="getOneObjGroup()">
                <el-option
                    v-for="(item,index) in objGroupOneArr"
                    :key="index"
                    :label="item.typeName"
                    :value="item.typeCode">
                </el-option>
            </el-select>
            <!-- <select name="" v-model="objGroupOneKey" @change="getOneObjGroup()" style="margin-right: 20px">
              <option :value="item.typeCode" v-for="(item,index) in objGroupOneArr" :key="index">{{item.typeName}}</option>
            </select> -->
            <el-select v-model="objGroupTwoKey" style="width: 88px;" @change="getTwoObjGroup()">
                <el-option
                    v-for="(item,index) in objGroupTwoArr"
                    :key="index"
                    :label="item.typeName"
                    :value="item.typeCode">
                </el-option>
            </el-select>
            <!-- <select name="" v-model="objGroupTwoKey" @change="getTwoObjGroup()">
              <option :value="item.typeCode" v-for="(item,index) in objGroupTwoArr" :key="index">{{item.typeName}}</option>
            </select> -->
          </div>
        </div>
        <!-- 时间分组 -->
        <div class="select-item" style="margin-left:60px;">
          <span class="title">时间分组</span>
          <div class="radioBox">
            <label class="group-radio" v-for="(item,index) in ctimeRadioArr" :key="index" @change.stop="getTimeIndex()">
              <input
                type="radio"
                name="timeIndex"
                :value="item.k"
                v-model="timeIndex"
              />
              <i></i>
              <span style="vertical-align: middle;">{{item.v}}</span>
            </label>
          </div>
        </div>
      </div>
      <!-- 第二栏下拉框 -->
      <div class="tools-t-con">
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

              <!-- <label class="group-checks" @change.stop="getAllGroup()" >
                <input type="checkbox" v-model="groupCheckAll" />
                <i></i>
                <span>全部</span>
              </label> -->

              <!-- <label class="group-checks" @change.stop="checkboxFilter('groupArr')" >
                <input type="checkbox" v-model="groupFilter" />
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
                @change.stop="getGroup()"
              >
                <input type="checkbox" v-model="item.checked" />
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
              <span class="content">{{stValues.join()}}</span>
              <i class="el-icon-arrow-up icon-arrow" style="color: #C0C4CC;font-size: 14px;"></i>
            </span>
          </div>

          <div class="group-pop-tpl station-tpl" style="width:320px;left: 0px;" v-show="powerStationPopShow" @mouseenter="showPop('powerStationPopShow')" @mouseleave="hidePop()">
            <span class="search-con">
              <input type="text" placeholder="关键字" class="input-place-hoder" v-model="stationKeyword" @keyup="searchGroup()" @keydown.enter="searchGroup()"/>
              <i class="iconfont iconiconfontsousuokuangsousuo" @click="searchGroup()"></i>
            </span>
            <div>
              <el-checkbox v-model="stationCheckAll" @change="getAllSt()">全部</el-checkbox>
              <el-checkbox v-model="powerStationFilter" @change="checkboxFilter('powerStationArr')">仅看选中</el-checkbox>

              <!-- <label class="group-checks" @change.stop="getAllSt()" >
                <input type="checkbox" v-model="stationCheckAll"/>
                <i></i>
                <span>全部</span>
              </label> -->

              <!-- <label class="group-checks" @change.stop="checkboxFilter('powerStationArr')" >
                <input type="checkbox" v-model="powerStationFilter"/>
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
                @change.stop="getCheckStation()"
              >
                <input type="checkbox" v-model="item.checked"/>
                <i></i>
                <span>{{item.stName.trim()}}</span>
              </label> -->
            </div>
          </div>
        </div>
        <div class="select-item" v-show="(prIndex === '01' && objGroupOneKey != 11) || (prIndex === '02' && objGroupOneKey != 12)">
          <span class="select-item-name">设备</span>
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
              <el-checkbox
              style="margin-bottom: 15px;"
              v-model="deviceNameCheckAll"
              @change="getAllDeviceName()"
              >全部</el-checkbox>

              <!-- <label class="group-checks" @change.stop="getAllDeviceName()" >
                <input type="checkbox" v-model="deviceNameCheckAll"/>
                <i></i>
                <span>全部</span>
              </label> -->
            </div>
            <!-- 设备类型单选 -->
            <!-- <div>
              <label class="group-radio" v-for="(item,index) in deviceTypeArr" :key="index">
                <input type="radio" name="deviceNameRadio" :value="index" v-model="deviceNameRadio" @change="getDeviceType()" />
                <i></i>
                <span>{{item.devtype}}</span>
              </label>
            </div> -->
            <!-- 三列区域 -->
            <div class="third-col">
              <!-- 电站选择区域 -->
              <div class="group-pop-tpl" :style="{'margin-right': 20 + 'px','height':300 + 'px'}">
                <span class="search-con">
                  <input type="text" placeholder="关键字" class="input-place-hoder" v-model="stationKeyword" @keyup="searchGroup()" @keydown.enter="searchGroup()"/>
                  <i class="iconfont iconiconfontsousuokuangsousuo" @click="searchGroup()"></i>
                </span>
                <div class="pop-over-con" :style="{'height':240 + 'px'}">
                  <label
                    class="group-radio"
                    style="width: 190px;"
                    v-for="(item,index) in psCheckedArr"
                    :key="index"
                    v-show="item.show"
                    @change.stop="getStation()"
                  >
                    <input type="radio" name="psRadio" :value="index" v-model="powerStationRadio"/>
                    <i></i>
                    <span>{{item.stName.trim()}}</span>
                  </label>
                </div>
              </div>
              <!-- 设备选择区域 -->
              <div class="group-pop-tpl" :style="{'margin-right': 20 + 'px','height':300 + 'px'}">
                <span class="search-con">
                  <input type="text" placeholder="关键字" class="input-place-hoder" v-model="deviceNameKeyword" @keyup="gainDeviceName()" @keydown.enter="gainDeviceName()"/>
                  <i class="iconfont iconiconfontsousuokuangsousuo" @click="gainDeviceName()"></i>
                </span>
                <div>
                  <my-paging
                      :pageSizeArr="[10, 20, 30]"
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

                  <!-- <label class="group-checks" style="width: 160px;" v-show="item.show" v-for="(item,index) in deviceNameArr" :key="index" @change.stop="getDeviceName(item)" >
                    <input type="checkbox" v-model="item.checked"/>
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
                <div class="cRlist" :style="{'margin-top': 20 +'px', 'height': 240 + 'px'}">
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
          <span class="select-item-name">指标</span>
          <div class="select-wrap">
            <span class="select-con" @mouseenter="showPop('indexPopShow')" @mouseleave="hidePop()">
              <span class="content" style>{{indexValues.join()}}</span>
              <i class="el-icon-arrow-up icon-arrow" style="color: #C0C4CC;font-size: 14px;"></i>
            </span>
          </div>

          <!-- 弹出框 -->
          <div class="group-pop-tpl index-tpl" style="width: 300px" v-show="indexPopShow" @mouseenter="showPop('indexPopShow')" @mouseleave="hidePop()">
            <span class="search-con">
              <input type="text" placeholder="关键字" class="input-place-hoder" v-model="indexKeyword" @keyup="searchIndex()" @keydown.enter="searchIndex()"/>
              <i class="iconfont iconiconfontsousuokuangsousuo" @click="searchIndex()"></i>
            </span>
            <div>
              <el-checkbox v-model="indexCheckAll" @change="getAllIndex()">全部</el-checkbox>
              <el-checkbox v-model="indexFilter" @change="checkboxFilter('indexArr')">仅看选中</el-checkbox>
            </div>
            <div class="index-con">
              <el-checkbox
                style="width: 200px;margin-top: 15px;"
                v-show="item.show"
                v-for="(item,index) in indexArr" :key="index"
                :label="item.fieldName"
                v-model="item.checked"
                @change="getIndex()">
              </el-checkbox>

              <!-- <label class="group-checks" style="width: 200px;" v-show="item.show" v-for="(item,index) in indexArr" :key="index">
                <input type="checkbox" v-model="item.checked" @change.stop="getIndex()"/>
                <i></i>
                <span>{{item.fieldName}}</span>
              </label> -->
            </div>
          </div>
        </div>
        <div class="select-item select-item-time">
          <span>统计时间</span>
          <div class="select-wrap countTime-con" style="margin-left: 5px;" @mouseenter="showPop('countPopShow')" @mouseleave="hidePop()">
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
        <!-- 按钮区域 -->
        <div class="btn-con">
          <div class="tools-btn reset-btn" @click="reset()">重置</div>
          <div class="tools-btn search-btn" @click="queryFun()">查询</div>
        </div>
        <div class="clear"></div>
      </div>
    </div>
    <!-- 表格区域 -->
    <div class="table-tools" :style="{'padding-top': detailFullPage ? '20px' : 0}">
      <i
        class="iconfont icondaochu-"
        title="导出图表"
        style="color: #31d3c9;font-size: 25px;cursor: pointer;float:right;"
        @click="exportTable()"
      ></i>
      <my-paging
        @change="data => getSubjectList.getData(data)"
        v-bind="getSubjectList.res.body"
        :total='getSubjectList.res.body.total > 10000 ? 10000 : getSubjectList.res.body.total'/>
    </div>
    <div class="tableCon">
      <el-table
        :data="tableData"
        v-loading="getSubjectList.loading"
        style="width: 100%"
        :max-height="detailFullPage ? winHeight -  150 : winHeight - 250"
        :border='false'
        >
        <el-table-column
          v-for="(item,index) in tdHeader" :key="index"
          :fixed="index===0"
          :property="item.fieldKey"
          :label="item.fieldName + (item.fieldUnit ? `(${item.fieldUnit})` : '')"
          :width="tableScroll ? index === 0 ? 200 : 180 : ''"
          sortable>
          <template slot-scope="scope">
            <span :style="{'text-align': typeof(scope.row[scope.column.property]) === 'number' ? 'right': '', 'display': 'inline-block', 'width': '100%'}">{{ scope.row[scope.column.property] }}</span>
          </template>
        </el-table-column>
        <template slot="empty">
          <img src="@/assets/img/noData.png" alt="暂无数据">
        </template>
      </el-table>
      <i
      :class="{iconfont: true, iconshousuoshang: !detailFullPage, iconshousuoxia: detailFullPage}"
      @click="switchDetailFullPage()"
      :title="detailFullPage ? '缩小': '放大'"
      v-show="tdHeader.length > 0"
      style="position: absolute;
            right: 0;top: 0px;
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
import countTime from '@/components/common/countTime'
import { Table, TableColumn, Select, Option, Message, Checkbox, CheckboxGroup } from 'element-ui'
import {
  api＿getAllComByRole,
  api＿getStByRoleAndComIds,
  api＿getDeviceTypeByStIds,
  api＿getDeviceByStIdsAndDeviceTypePage,
  api＿getDeviceEventType,
  api＿deviceLogListByPageAndThroughTime,
  api＿deviceLogListByPageAndStartTime,
  api＿getSTClassLIst,
  api＿getSubjectGroup,
  api＿getSubjectPoint,
  api＿getSubjectList,
  api＿subjectDateExportSubjectData
} from '@dataQuery/request/api'
import {download} from '@comm/request/http'
import myPaging from '@comm/components/paging'

export default {
  name: 'deviceLogQuery',
  data () {
    return {
      isCreated: true,
      isCheckStation: false,
      isReset: false,
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
        { later: true }
      ),
      deviceLogListByPageAndStartTime: api＿deviceLogListByPageAndStartTime({
        later: true
      }),
      getSubjectGroup: api＿getSubjectGroup({
        later: true
      }),
      getSubjectPoint: api＿getSubjectPoint({
        later: true
      }),
      getSubjectList: api＿getSubjectList({
        later: true,
        res: {
          body: {
            total: 0
          }
        }
      }),
      winHeight: 0,
      winWidth: 0,
      tableScroll: false,
      // 单选电站分类
      prIndex: '01',
      powerType: '',
      // 单选设备类型
      deviceNameRadio: 0,
      // 单选电站
      powerStationRadio: 0,
      // 对象分组
      objGroupOneKey: '',
      objGroupTwoKey: '',
      objGroupOneArr: [],
      objGroupTwoArr: [],
      // 时间分组
      ctimeRadioArr: [
        {
          k: 1,
          v: '日'
        },
        {
          k: 2,
          v: '月'
        },
        {
          k: 3,
          v: '年'
        },
        {
          k: 4,
          v: '自定义'
        }
      ],
      timeIndex: 1,
      // 统计时间的数据
      trIndex: 1,
      timeReset: true,
      timeQueryKey: 0,
      ctType: '',
      dates: [],
      // 弹框的全部按钮
      groupCheckAll: true,
      stationCheckAll: true,
      deviceCheckAll: true,
      eventTypeCheckAll: true,
      deviceNameCheckAll: true,
      indexCheckAll: true,
      // 弹框的仅看选中
      groupFilter: false,
      deviceTypeFilter: false,
      powerStationFilter: false,
      eventTypeFilter: false,
      deviceNameFilter: false,
      indexFilter: false,
      // 弹框显示隐藏
      groupPopShow: false,
      countPopShow: true,
      deviceTypePopShow: false,
      powerStationPopShow: false,
      blocPopShow: false,
      deviceNamePopShow: true,
      eventTypePopShow: false,
      powerTypePopShow: false,
      indexPopShow: false,
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
        'indexPopShow'
      ],
      // 弹框内的数据
      deviceTypeArr: [],
      powerStationArr: [],
      psCheckedArr: [],
      groupArr: [],
      deviceNameArr: [],
      indexArr: [],
      // 表格的数据
      tableData: [],
      tdHeader: [],
      exportArr: [],
      eventKeyword: '',
      objGroupMap: {
        '01': 'st_name',
        '02': 'city_name',
        '03': 'province_name',
        '04': 'company_name',
        '05': 'eq_name',
        '06': 'product_name',
        '07': 'manuf_name'
      },
      // 点击弹框内的多选框 的数据
      comIds: [],
      psCheckeds: [],
      eventTypes: [],
      deviceNameIds: [],
      comValues: [],
      stValues: [],
      eventTypesValues: [],
      deviceNameValues: ['全部'],
      deviceNameMaps: [],
      indexValues: [],
      indexKeys: [],
      // 查询数据
      stationKeyword: '',
      deviceNameKeyword: '',
      indexKeyword: ''
    }
  },
  components: {
    countTime,
    myPaging,
    elTable: Table,
    elTableColumn: TableColumn,
    ElSelect: Select,
    ElOption: Option,
    ElCheckbox: Checkbox,
    ElCheckboxGroup: CheckboxGroup
  },
  created () {
    this.$bus.$emit('pageName', '主题数据查询')

    this.isCreated = true
    this.winHeight = document.body.clientHeight
    this.winWidth = document.body.clientWidth

    // 电站分类 -- 默认选中光伏或者风电
    this.getSTClassLIst.getData({}).then(res => {
      this.prIndex = res.data.length === 1 ? res.data[0].id : '01'
      // 获取电站
      this.getPower()
    })
    // 获取表格默认数据
    var time = setInterval(res => {
      if (this.indexKeys.length > 0) {
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
      this.isReset = true
      // 电站分类 -- 默认选中光伏或者风电
      this.getSTClassLIst.getData({}).then(res => {
        this.prIndex = res.data.length === 1 ? res.data[0].id : '01'
        this.getPower()
      })
      // 重置统计时间
      this.$bus.$emit('resetFlag')
      this.deviceNameMaps = []
    },
    // 统计分组切换 重置
    objectReset () {
      this.isReset = true
      this.groupArr.forEach(v => {
        v.show = v.checked = true
        this.comIds.push(v.comId)
        this.comValues.push(v.comName)
      })
      // 多选集团
      this.getGroup()
      // 重置统计时间
      this.$bus.$emit('resetFlag', this.timeIndex)
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
    // --------------------------------------------------------------------对象分组、时间分组方法集合
    // 点击第一级对象分组
    getOneObjGroup () {
      this.getSubjectGroup
        .getData({ stClass: this.prIndex, parentCode: this.objGroupOneKey })
        .then(res => {
          this.objGroupTwoArr = res.body
          this.objGroupTwoKey = res.body[0].typeCode
          this.getTwoObjGroup()
        })
    },
    // 点击第二级对象分组
    getTwoObjGroup () {
      this.indexArr = []
      this.gainIndex()
      if (!this.isCreated) {
        this.objectReset()
      }
    },
    // 点击时间分组
    getTimeIndex () {
      this.gainIndex()
      // 重置统计时间
      this.$bus.$emit('resetFlag', this.timeIndex)
    },
    // --------------------------------------------------------------------上部单选框按钮方法集合
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
        // 多选集团
        this.getGroup()
      })
      // 获取对象分组第一级
      this.getSubjectGroup.getData({ stClass: this.prIndex, parentCode: 0 })
        .then(res => {
          this.objGroupOneArr = res.body
          this.objGroupOneKey = res.body[0].typeCode
          this.getOneObjGroup()
        })
    },
    // 多选集团
    getGroup () {
      this.comIds = []
      this.comValues = []
      this.groupArr.forEach(v => {
        if (v.checked) {
          this.comIds.push(v.comId)
          this.comValues.push(v.comName)
          if (this.comIds.length === this.groupArr.length) { this.comValues = ['全部'] }
        }
      })
      this.groupCheckAll = this.comIds.length === this.groupArr.length

      // 获取电站
      this.getStByRoleAndComIds.getData({
          stClass: this.prIndex,
          comIds: this.comIds.join()
        })
        .then(res => {
          this.powerStationArr = res.body
          if (this.powerStationArr.length === 0) {
            this.st_eqids = this.deviceNameMaps = this.deviceNameArr = []
            return
          }
          this.powerStationArr.forEach(v => {
            v.checked = v.show = true
          })
          // 多选电站
          this.getCheckStation()
          this.isCreated = false
        })
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
      this.isCheckStation = true

      if ((this.prIndex === '01' && this.objGroupOneKey === 11) ||
        (this.prIndex === '02' && this.objGroupOneKey === 12)) {
          return
      }
      if ((this.prIndex === '01' && (this.objGroupOneKey !== 11 && this.objGroupOneKey !== '')) ||
        (this.prIndex === '02' && (this.objGroupOneKey !== 12 && this.objGroupOneKey !== ''))) {
        this.getStation()
      } else {
        if (this.isCreated === false) {
          this.getStation()
        }
      }
    },
    // 单选电站
    getStation () {
      if (this.psCheckedArr.length === 0) {
        this.deviceTypeArr = this.st_eqids = this.deviceNameMaps = this.deviceNameArr = []
        this.deviceNameRadio = 0
        return
      }
      // 获取设备名称
      this.gainDeviceName()

      // 获取设备类型
      // this.getDeviceTypeByStIds.getData({
      //   stClass: this.prIndex,
      //   stIds: this.psCheckedArr[this.powerStationRadio].stId
      // }).then(res => {
      //   this.deviceTypeArr = res.body
      //   this.deviceNameRadio = 0
      //   // 单选设备类型
      //   this.getDeviceType()
      // })
    },
    // 单选设备类型
    getDeviceType () {
      // this.deviceTypes = []
      // this.deviceTypesValues = []
      // this.deviceTypes = this.deviceTypeArr[this.deviceNameRadio].devid
      // this.deviceTypeArr.forEach(v => {
      //   if (v.checked) {
      //     this.deviceTypes.push(v.devid)
      //     this.deviceTypesValues.push(v.devtype)
      //   }
      // })
      // this.deviceCheckAll =
      //   this.deviceTypes.length === this.deviceTypeArr.length
      // 获取设备名称
      // this.gainDeviceName()
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
      this.getDeviceByStIdsAndDeviceTypePage.getData({
        stClass: this.prIndex,
        comIds: this.comIds.join(),
        stIds: this.psCheckedArr[this.powerStationRadio].stId,
        deviceTypes: this.objGroupOneKey === 13 ? 1 : this.objGroupOneKey === 14 ? 2 : '',
        keyword: this.deviceNameKeyword,
        pageIndex: 0,
        pageSize: 10
      })
      this.getDeviceByStIdsAndDeviceTypePage.subscribe(res => {
        this.deviceNameArr = res.body.data
        this.deviceNameArr.forEach(v => {
          v.checked = false
          v.show = true

          // if (this.isCreated) {
          //   v.show = v.checked = true
          // } else if (this.isReset) {
          //   v.show = v.checked = true
          // } else {
          //   v.checked = false
          //   v.show = true
          // }

          // else if (!this.isCreated && this.isCheckStation) {
          //   v.show = v.checked = true
          // }
        })
        // if (this.isCreated) {
        //   this.getDeviceName()
        // } else if (this.isReset) {
        //   this.deviceNameMaps = []
        //   this.getDeviceName()
        // }
        // else if (!this.isCreated && this.isCheckStation) {
        //   this.getDeviceName()
        // }
        this.isReset = this.isCheckStation = this.isCreated = false
      })
    },
    // 多选指标
    getIndex () {
      this.indexKeys = []
      this.indexValues = []
      this.indexArr.forEach(v => {
        if (v.checked) {
          this.indexKeys.push(v.fieldKey)
          this.indexValues.push(v.fieldName)
        }
      })

      if (this.indexKeys.length === this.indexArr.length) this.indexValues = ['全部']
      this.indexCheckAll = this.indexKeys.length === this.indexArr.length
    },
    // 获取指标
    gainIndex () {
      this.getSubjectPoint.getData({
          groupId: this.objGroupTwoKey,
          dateType: this.timeIndex
        })
        .then(res => {
          if (!res.body) {
            this.indexValues = this.indexKeys = this.indexArr = []
            this.indexCheckAll = false
            return
          }

          this.indexArr.forEach(v => {
            if (v.checked) {
              res.body.forEach(vv => {
                if (v.fieldKey === vv.fieldKey) {
                  vv.checked = true
                }
              })
            }
          })

          if (this.indexArr.length === 0) {
            res.body.forEach(v => {
              if (v.selectDefault === '1') {
                v.checked = true
              } else {
                v.checked = false
              }
            })
          }
          this.indexArr = res.body
          this.indexArr.forEach(v => {
            v.show = true
            // if (v.selectDefault === '1') {
            //   v.checked = true
            // } else {
            //   v.checked = false
            // }
          })
          this.getIndex()
        })
    },
    // 电站的搜索框
    searchGroup () {
      this.powerStationArr.forEach(v => {
        v.show = v.stName.includes(this.stationKeyword)
      })
      this.$forceUpdate()
    },
    // 指标的搜索框
    searchIndex () {
      this.indexArr.forEach(v => {
        v.show = v.fieldName.includes(this.indexKeyword)
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
          if (this.comIds.length === this.groupArr.length) { this.comValues = ['全部'] }
        }
      })
      // 获取电站
      this.getStByRoleAndComIds
        .getData({
          stClass: this.prIndex,
          comIds: this.comIds.join()
        })
        .then(res => {
          this.powerStationArr = res.body
          if (this.powerStationArr.length === 0) {
            this.st_eqids = this.deviceNameMaps = this.deviceNameArr = []
            return
          }
          this.powerStationArr.forEach(v => {
            v.checked = v.show = true
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
      this.isCheckStation = true

      if ((this.prIndex === '01' && this.objGroupOneKey === 11) ||
        (this.prIndex === '02' && this.objGroupOneKey === 12)) {
          return
      }
      if ((this.prIndex === '01' && (this.objGroupOneKey !== 11 && this.objGroupOneKey !== '')) ||
        (this.prIndex === '02' && (this.objGroupOneKey !== 12 && this.objGroupOneKey !== ''))) {
        this.getStation()
      } else {
        if (this.isCreated === false) {
          this.getStation()
        }
      }
    },
    // 设备名称的全部多选框
    getAllDeviceName () {
      this.deviceNameMaps = []
      this.deviceNameArr.forEach(v => {
        v.checked = false
      })
    },
    // 指标的全部多选框
    getAllIndex () {
      this.indexKeys = []
      this.indexValues = []
      if (this.indexCheckAll === false) {
        this.indexFilter = false
      }
      this.indexArr.forEach(v => {
        v.checked = this.indexCheckAll
        if (v.checked) {
          this.indexKeys.push(v.fieldKey)
          this.indexValues.push(v.fieldName)
        }
      })
      if (this.indexCheckAll) this.indexValues = ['全部']
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
      if (this.timeIndex === 1 && this.dates.length === 0) {
        Message.error('请选择时间')
        return
      } else if (this.indexKeys.length === 0) {
        Message.error('请选择指标')
        return
      }
      this.requestParams = {
        stClass: this.prIndex,
        dateType: this.timeIndex,
        groupId: this.objGroupTwoKey,
        comIds: this.groupCheckAll ? '' : this.comIds.join(),
        stIds: this.stationCheckAll ? '' : this.psCheckeds.join(),
        deviceTypes:
          this.objGroupOneKey === 11 || this.objGroupOneKey === 12
            ? null
            : this.objGroupOneKey === 13
            ? 1
            : this.objGroupOneKey === 14
            ? 2
            : '',
        st_eqids:
          this.objGroupOneKey !== 11 &&
          this.objGroupOneKey !== 12 &&
          this.deviceNameCheckAll
            ? ''
            : this.objGroupOneKey === 11 || this.objGroupOneKey === 12
            ? null
            : this.deviceNameIds.join(),
        searchDateType: this.ctType.k,
        date: this.dates.join(),
        point: this.indexKeys.join()
      }
      this.getSubjectList.getData({...this.requestParams, pageIndex: 0, pageSize: 10})

      this.getSubjectList.subscribe(res => {
        this.tableData = res.body.result.data
        if (this.timeIndex === 4) {
          this.tdHeader = [
            {
              fieldKey: this.objGroupMap[this.objGroupTwoKey.toString().substr(2)],
              fieldName: '对象分组'
            },
            ...this.indexArr.filter(v => v.checked)
          ]
        } else {
          this.tdHeader = [
            {
              fieldKey: this.objGroupMap[this.objGroupTwoKey.toString().substr(2)],
              fieldName: '对象分组'
            },
            { fieldKey: 'dtime', fieldName: '时间分组' },
            ...this.indexArr.filter(v => v.checked)
          ]
        }
        this.$nextTick(function () {
            if (this.tdHeader.length * 200 >= this.winWidth - 60) {
              this.tableScroll = true
            } else {
              this.tableScroll = false
            }
        })
      })
    },
    // 导出图表
    exportTable () {
      if (this.getSubjectList.res.body.total >= 10000) {
        Message.error('导出数据超过10000条,请重新选择条件')
        return
      }
      this.getSTClassLIst.res.data.forEach(v => {
        if (v.id === this.prIndex) {
          this.fileName1 = v.name
        }
      })
      this.objGroupOneArr.forEach(v => {
        if (v.typeCode === this.objGroupOneKey) {
          this.fileName2 = v.typeName
        }
      })
      this.ctimeRadioArr.forEach(vv => {
        if (vv.k === this.timeIndex) {
          this.fileName3 = vv.v
        }
      })
      let params = ''
      for (const key in this.requestParams) {
        if (this.requestParams.hasOwnProperty(key)) {
          if (this.requestParams[key]) {
            params += (key + '=' + this.requestParams[key] + '&')
          } else {
            params += (key + '=' + '&')
          }
        }
      }
      download({
        url: api＿subjectDateExportSubjectData + '?' + params + 'fileName=' + (this.fileName1 + '-' + this.fileName2 + '-' + this.fileName3)
      })
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/css/tableScroll.scss';

body .el-table th.gutter {
  display: table-cell !important;
}
body .el-table colgroup.gutter {
  display: table-cell !important;
}

.device-theme-query {
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

  padding: 0px 30px 0px 30px;

  .el-input input {
      // width: calc(100vw - 930px);
      // max-width: 500px;
  }

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
