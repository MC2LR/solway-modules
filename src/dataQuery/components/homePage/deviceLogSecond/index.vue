<template>
  <div class="device-second-query" :style="{height: winHeight - 75 + 'px'}">
    <!-- 下拉框选择区域 -->
    <div class="tools-wrap" v-show="!detailFullPage">
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
          </div>
        </div>
        <div class="select-item">
          <span class="select-item-name" style="flex: 0 0 40px;">集团</span>
          <div class="select-wrap">
            <span class="select-con" @mouseover="showPop('blocPopShow')" @mouseleave="hidePop()">
              <span class="content" style>{{comValues}}</span>
              <i class="el-icon-arrow-up icon-arrow" style="color: #C0C4CC;font-size: 14px;"></i>
            </span>
          </div>

          <!-- 弹出框 -->
          <div class="group-pop-tpl jituan-tpl" style="width: 320px;left: 0;" v-show="blocPopShow" @mouseover="showPop('blocPopShow')" @mouseleave="hidePop()">
            <div>
              <el-radio
              style="width: 260px;margin-bottom: 10px;"
              v-for="(item,index) in groupArr"
              :key="index"
              v-model="groupRadio"
              v-show="item.show"
              :label="index"
              @change="getGroup()"
              >
              {{item.comName}}
              </el-radio>

              <!-- <label
                class="group-radio"
                style="width: 260px;"
                v-show="item.show"
                v-for="(item,index) in groupArr"
                :key="index"
              >
                <input type="radio" name="jtRadio" :value="index" v-model="groupRadio" @change="getGroup()" />
                <i></i>
                <span>{{item.comName}}</span>
              </label> -->
            </div>
          </div>
        </div>
        <div class="select-item">
          <span class="select-item-name">设备名称</span>
          <div class="select-wrap">
            <span class="select-con" @mouseenter="showPop('deviceNamePopShow')" @mouseleave="hidePop()">
              <span class="content" style>{{deviceNameValue}}</span>
              <i class="el-icon-arrow-up icon-arrow" style="color: #C0C4CC;font-size: 14px;"></i>
            </span>
          </div>

          <!-- 弹出框 -->
          <div class="deviceName-tpl" v-show="deviceNamePopShow" style="width: 920px" @mouseenter="showPop('deviceNamePopShow')" @mouseleave="hidePop()">
            <!-- 设备类型单选 -->
            <div>
              <label class="group-radio" v-for="(item,index) in deviceTypeArr" :key="index">
                <input type="radio" name="deviceTypeRadio" :value="index" v-model="deviceTypeRadio" @change="getDeviceType()" />
                <i></i>
                <span>{{item.devtype}}</span>
              </label>
            </div>
            <!-- 三列区域 -->
            <div class="third-col">
              <!-- 电站选择区域 -->
              <div class="group-pop-tpl" :style="{'margin-right': 20 + 'px','height':300 + 'px'}">
                <span class="search-con">
                  <input type="text" placeholder="关键字" class="input-place-hoder" v-model="stationKeyword" @keyup="searchGroup()" @keydown.enter="searchGroup()"/>
                  <i class="iconfont iconiconfontsousuokuangsousuo" @click="searchGroup()"></i>
                </span>
                <div class="pop-over-con" :style="{'height': 240 + 'px'}">
                  <label
                    class="group-radio"
                    style="width: 190px;"
                    v-for="(item,index) in powerStationArr"
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
              <div class="group-pop-tpl" :style="{'margin-right': 20 + 'px','height': 300 + 'px'}">
                <span class="search-con">
                  <input type="text" placeholder="关键字" class="input-place-hoder" v-model="deviceNameKeyword" @keyup="gainDeviceName()" @keydown.enter="gainDeviceName()"/>
                  <i class="iconfont iconiconfontsousuokuangsousuo" @click="gainDeviceName()"></i>
                </span>
                <div>
                  <my-paging
                      :pageSizeArr="[10, 20, 30, 50]"
                      v-if="getDeviceByStIdsAndDeviceTypePage.res.body && getDeviceByStIdsAndDeviceTypePage.res.body.total"
                      @change="data => getDeviceByStIdsAndDeviceTypePage.getData(data)"
                      v-bind="getDeviceByStIdsAndDeviceTypePage.res.body"/>
                </div>
                <div class="pop-over-con" :style="{'height': 195 + 'px'}">
                  <label class="group-radio" style="width: 160px;" v-show="item.show" v-for="(item,index) in deviceNameArr" :key="index">
                    <input type="radio" name="secDnRadio" :value="index" v-model="deviceNameRadio" @change="getDeviceName()" style="display: none"/>
                    <i></i>
                    <span>{{item.deviceName}}</span>
                  </label>
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
                <div class="cRlist" :style="{'margin-top': 20 + 'px', 'height': 240 + 'px'}">
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
            <span class="select-con" @mouseover="showPop('indexPopShow')" @mouseleave="hidePop()">
              <span class="content" style>{{indexValues.join()}}</span>
              <i class="el-icon-arrow-up icon-arrow" style="color: #C0C4CC;font-size: 14px;"></i>
            </span>
          </div>

          <!-- 弹出框 -->
          <div class="group-pop-tpl index-tpl" style="width: 290px;" v-show="indexPopShow" @mouseover="showPop('indexPopShow')" @mouseleave="hidePop()">
            <div>
              <el-checkbox v-model="indexCheckAll" @change="getAllIndex()">全部</el-checkbox>
              <el-checkbox v-model="indexFilter" @change="checkboxFilter('indexArr')">仅看选中</el-checkbox>

              <!-- <label class="group-checks">
                <input type="checkbox" v-model="indexCheckAll" @change="getAllIndex()" />
                <i></i>
                <span>全部</span>
              </label>
              <label class="group-checks" style="margin-right: 0;">
                <input type="checkbox" v-model="indexFilter" @change="checkboxFilter('indexArr')" />
                <i></i>
                <span>仅看选中</span>
              </label> -->
            </div>
            <div class="index-con">
              <el-checkbox
                style="width: 130px;margin-top: 15px;"
                v-show="item.show"
                v-for="(item,index) in indexArr" :key="index"
                :label="item.name"
                v-model="item.checked"
                @change="getIndex()">
              </el-checkbox>

              <!-- <label class="group-checks" style="width:130px" v-show="item.show" v-for="(item,index) in indexArr" :key="index">
                <input type="checkbox" v-model="item.checked" @change="getIndex()" />
                <i></i>
                <span>{{item.name}}</span>
              </label> -->
            </div>
          </div>
        </div>
        <div class="select-item">
          <span class="select-item-name">时间</span>
          <div class="select-wrap">
            <input type="text" class="laydate1" />
          </div>
        </div>
        <!-- 按钮区域 -->
        <div class="btn-con">
          <div class="tools-btn reset-btn" @click="reset()">重置</div>
          <div class="tools-btn search-btn" @click="queryFun()">查询</div>
        </div>
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
        @change="data => getNewHistoryData.getData(data)"
        v-bind="getNewHistoryData.res"
        :firstIndex="1"
        :total='getNewHistoryData.res.total > 10000 ? 10000 : getNewHistoryData.res.total'
        />
    </div>
    <div class="tableCon">
      <el-table
      :data="tableData"
      v-loading="getNewHistoryData.loading"
      style="width: 100%"
      :max-height="detailFullPage ? winHeight - 156 : winHeight - 210"
      :border='false'>
        <el-table-column
        v-for="(item,index) in tdHeader" :key="index"
        :fixed="index===0"
        :property="item.fieldKey"
        :label="item.name + (item.unit ? `(${item.unit})` : '')"
        :width="tableScroll ? 200 : ''"
        sortable
        >
          <template slot-scope="scope">
              <span :style="{'text-align': typeof(scope.row[scope.column.property]) === 'number' ? 'right': '', 'display': 'inline-block', 'width': '100%'}">{{ scope.row[scope.column.property] }}</span>
          </template>
        </el-table-column>
        <template slot="empty">
          <img src="@/assets/img/noData.png" alt="暂无数据" style="margin-top: 40px">
        </template>
      </el-table>
      <i
      :class="{iconfont: true, iconshousuoshang: !detailFullPage, iconshousuoxia: detailFullPage}"
      @click="switchDetailFullPage()"
      :title="detailFullPage ? '缩小': '放大'"
      v-show="tdHeader.length > 0"
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
import {locationOrigin} from '@dataQuery/tools/env'
import addCssJs, {deleteFile} from '@comm/tools/addCssJs'
import { Table, TableColumn, Select, Option, Message, Checkbox, Radio } from 'element-ui'
import {
  api＿getAllComByRole,
  api＿getStByRoleAndComIds,
  api＿getDeviceTypeByStIds,
  api＿getDeviceByStIdsAndDeviceTypePage,
  api＿getDeviceEventType,
  api＿deviceLogListByPageAndThroughTime,
  api＿deviceLogListByPageAndStartTime,
  api＿getSTClassLIst,
  api＿getSecondDateIndex,
  api＿getNewHistoryData,
  api＿exportSecondData
} from '@dataQuery/request/api'
import {download} from '@comm/request/http'
import myPaging from '@comm/components/paging'

export default {
  name: 'deviceLogQuery',
  data () {
    return {
      tableScroll: false,
      detailFullPage: false,
      requestParams: {},
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
      getSecondDateIndex: api＿getSecondDateIndex({
        later: true
      }),
      getNewHistoryData: api＿getNewHistoryData({
        later: true,
        res: {
          total: 0
        }
      }),
      winHeight: 0,
      winWidth: 0,
      powerType: '',
      timeRange: '',
      prIndex: '01',
      groupRadio: 0,
      deviceTypeRadio: 0,
      powerStationRadio: 0,
      deviceNameRadio: 0,
      // 统计时间的数据
      trIndex: 1,
      timeReset: true,
      timeQueryKey: 0,
      startTime: '',
      endTime: '',
      timeType: '',
      // 弹框的全部按钮
      stationCheckAll: true,
      deviceCheckAll: true,
      indexCheckAll: true,
      // 弹框的仅看选中
      deviceTypeFilter: false,
      powerStationFilter: false,
      indexFilter: false,
      deviceNameFilter: false,
      // 弹框显示隐藏
      groupPopShow: false,
      countPopShow: false,
      deviceTypePopShow: false,
      powerStationPopShow: false,
      blocPopShow: false,
      deviceNamePopShow: false,
      indexPopShow: false,
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
        'indexPopShow',
        'powerTypePopShow',
        'timeRangePopShow'
      ],
      // 弹框内的数据
      deviceTypeArr: [],
      powerStationArr: [],
      groupArr: [],
      deviceNameArr: [],
      indexArr: [],
      // 表格的数据
      tableData: [],
      tdHeader: [],
      // 点击弹框内的多选框 的数据
      deviceTypes: '',
      indexKeys: [],
      deviceNameId: '',
      comValues: '',
      indexValues: [],
      deviceNameValue: '',
      deviceNameMaps: [],
      // 电站数据
      stationKeyword: '',
      // 设备名称数据
      deviceNameKeyword: ''
    }
  },
  components: {
    myPaging,
    elTable: Table,
    elTableColumn: TableColumn,
    ElSelect: Select,
    ElOption: Option,
    ElCheckbox: Checkbox,
    ElRadio: Radio
  },
  created () {
    this.$bus.$emit('pageName', '秒级数据查询')

    this.winHeight = document.body.clientHeight
    this.winWidth = document.body.clientWidth

    // 电站分类 -- 默认选中光伏或者风电
    this.getSTClassLIst.getData({}).then(res => {
      this.prIndex = res.data.length === 1 ? res.data[0].id : '01'
      // 获取电站
      this.getPower()
    })
  },
  mounted () {
    const _this = this

    let initEnd = new Date().Format('yyyy-MM-dd hh:mm:ss')
    let initStart = new Date(new Date().getTime() - 24 * 60 * 60 * 1000).Format('yyyy-MM-dd hh:mm:ss')

    _this.endTime = initEnd.substring(0, initEnd.length - 3)
    _this.startTime = initStart.substring(0, initStart.length - 3)

    addCssJs([
        locationOrigin + '/laydate/css/laydate.css',
        locationOrigin + '/laydate/js/laydate.js'
    ]).then(() => {
        // 自定义
        window.laydate.render({
        elem: '.laydate1',
        type: 'datetime',
        range: true,
        theme: '#245182',
        trigger: 'click',
        value: initStart + ' - ' + initEnd,
        max: new Date().toString(),
        done: function (value, date) {
          var timrArr = value.split(' - ')
          _this.startTime = timrArr[0].substring(0, timrArr[0].length - 3)
          _this.endTime = timrArr[1].substring(0, timrArr[1].length - 3)
        }
      })
    })

    // 获取表格默认数据
    const time = setInterval(res => {
      if (!this.deviceTypes || !this.deviceNameId) return
      if ([...this.indexKeys, 'dtime'].join() === 'dtime') return

      if (this.startTime && this.endTime) {
        this.queryFun()
        clearInterval(time)
      }
    }, 500)
  },
  beforeDestroy () {
    deleteFile([
        locationOrigin + '/laydate/css/laydate.css',
        locationOrigin + '/laydate/js/laydate.js'
    ])
  },
  methods: {
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
      this.deviceNameId = ''
      this.deviceNameValue = ''
      this.deviceNameMaps = []
      this.deviceNameArr = []
      this.getSTClassLIst.getData({}).then(res => {
        this.prIndex = res.data.length === 1 ? res.data[0].id : '01'
        const _this = this

        let initEnd = new Date().Format('yyyy-MM-dd hh:mm:ss')
        let initStart = new Date(new Date().getTime() - 24 * 60 * 60 * 1000).Format('yyyy-MM-dd hh:mm:ss')

        _this.endTime = initEnd.substring(0, initEnd.length - 3)
        _this.startTime = initStart.substring(0, initStart.length - 3)

        window.laydate.render({
          elem: '.laydate1',
          type: 'datetime',
          range: true,
          theme: '#245182',
          trigger: 'click',
          value: initStart + ' - ' + initEnd,
          max: new Date().toString(),
          done: function (value, date) {
            var timrArr = value.split(' - ')
            _this.startTime = timrArr[0].substring(0, timrArr[0].length - 3)
            _this.endTime = initStart.substring(0, timrArr[0].length - 3)
          }
        })

        this.groupRadio = 0
        this.powerStationRadio = 0
        this.deviceTypeRadio = 0
        this.deviceNameRadio = 0
        // 获取电站
        this.getPower()
      })
    },
    // --------------------------------------------------------------------上部单选框按钮方法集合
    // 点击电站类型
    getPower () {
      // 获取集团
      this.getAllComByRole.getData({ stClass: this.prIndex }).then(res => {
        this.groupRadio = 0
        this.powerStationRadio = 0
        this.deviceTypeRadio = 0
        this.deviceNameRadio = 0

        this.groupArr = res.body
        this.groupArr.forEach(v => {
          v.show = true
        })
        // 单选集团
        this.getGroup()
      })
    },
    // 单选集团
    getGroup () {
      this.comValues = this.groupArr[this.groupRadio].comName
      this.powerStationRadio = 0
      this.deviceTypeRadio = 0
      this.deviceNameRadio = 0

      // 获取电站
      this.getStByRoleAndComIds.getData({
        stClass: this.prIndex,
        comIds: this.groupArr[this.groupRadio].comId
      }).then(res => {
        this.powerStationArr = res.body
        this.powerStationArr.forEach(v => {
          v.show = true
        })
        // 单选电站
        this.getStation()
      })
    },
    // 单选电站
    getStation () {
      // 获取设备类型
      this.getDeviceTypeByStIds.getData({
        stClass: this.prIndex,
        comIds: this.groupArr[this.groupRadio].comId
        // stIds: this.powerStationArr[this.powerStationRadio].stId
      }).then(res => {
        this.deviceTypeArr = res.body
        // 单选设备类型
        this.getDeviceType()
      })
    },
    // 单选设备类型
    getDeviceType () {
      this.deviceNameRadio = 0
      this.deviceTypes = this.deviceTypeArr[this.deviceTypeRadio].devid
      // 获取设备名称
      this.gainDeviceName()
      // 获取指标
      this.gainIndex()
    },
    // 获取设备名称
    gainDeviceName () {
      this.getDeviceByStIdsAndDeviceTypePage.getData({
        stClass: this.prIndex,
        comIds: this.groupArr[this.groupRadio].comId,
        stIds: this.powerStationArr[this.powerStationRadio].stId,
        deviceTypes: this.deviceTypes,
        keyword: this.deviceNameKeyword,
        pageIndex: 0,
        pageSize: 10
      })
      this.getDeviceByStIdsAndDeviceTypePage.subscribe(res => {
        this.deviceNameArr = res.body.data
        this.deviceNameArr.forEach(v => {
          v.show = true
        })
        // this.deviceNameArr.forEach((v, i) => {
        //   if (v.st_eqid === this.deviceNameId) this.deviceNameRadio = i
        // })
        // if (this.deviceNameId) return
        this.getDeviceName()
      })
    },
    // 获取指标
    gainIndex () {
      this.getSecondDateIndex.getData({
        deviceType: this.deviceTypes
      }).then(res => {
        res.body.forEach((v, i) => {
          if (v.fieldKey === 'dtime') {
            res.body.splice(i, 1)
          }
          v.checked = v.selectDefault === '1'
        })
        this.indexArr = res.body
        this.indexArr.forEach(v => {
          v.show = true
        })
        this.getIndex()
      })
    },
    // 多选指标
    getIndex () {
      this.indexKeys = []
      this.indexValues = []
      this.indexArr.forEach(v => {
        if (v.checked) {
          this.indexKeys.push(v.fieldKey)
          this.indexValues.push(v.name)
        }
      })

      if (this.indexKeys.length === this.indexArr.length) this.indexValues = ['全部']
      this.indexCheckAll = this.indexKeys.length === this.indexArr.length
    },
    // 单选设备名称
    getDeviceName () {
      if (this.deviceNameArr.length === 0 || !this.deviceNameArr[this.deviceNameRadio] || !this.deviceNameArr[this.deviceNameRadio].st_eqid) return
      this.deviceNameId = this.deviceNameArr[this.deviceNameRadio].st_eqid
      this.deviceNameValue = this.deviceNameArr[this.deviceNameRadio].deviceName

      // 获取右侧列表数据
      this.deviceNameMaps[0] = this.deviceNameArr[this.deviceNameRadio]
      // debugger
    },
    // 电站的搜索框
    searchGroup () {
      this.powerStationArr.forEach(v => {
        v.show = v.stName.includes(this.stationKeyword)
      })
      this.$forceUpdate()
    },
    // --------------------------------------------------------------------弹出框的全部多选框方法组
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
          this.indexValues.push(v.name)
        }
      })
      if (this.indexKeys.length === this.indexArr.length) this.indexValues = ['全部']
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
      this.deviceNameMaps.splice(0, 1)
      this.deviceNameValue = ''
      this.deviceNameId = ''
    },
    // 删除全部
    delRightAll () {
      this.deviceNameMaps = []
      this.deviceNameValue = ''
      this.deviceNameId = ''
    },
    // --------------------------------------------------------------------查询按钮方法
    // 查询按钮
    queryFun () {
      if (!this.startTime || !this.endTime) {
        Message.error('请选择时间范围')
        return
      }
      if (!this.deviceNameId) {
        Message.error('请选择设备')
        return
      }

      this.requestParams = {
        deviceType: this.deviceTypes,
        st_eqid: this.deviceNameId,
        point: [...this.indexKeys, 'dtime'].join(),
        startDate: this.startTime,
        endDate: this.endTime
      }
      this.getNewHistoryData.getData({...this.requestParams, pageIndex: 1})
      this.getNewHistoryData.subscribe(res => {
        this.tableData = res.data
        this.tdHeader = [{fieldKey: 'dtime', name: '数据采集时间'}, ...this.indexArr.filter(v => v.checked)]
        this.$nextTick(() => {
          this.tableScroll = this.tdHeader.length * 200 >= this.winWidth - 60
        })
      })
    },
    // 导出图表
    exportTable () {
      if (this.getNewHistoryData.res.total >= 10000) {
        Message.error('导出数据超过10000条,请重新选择条件')
        return
      }
      var filename1 = this.powerStationArr[this.powerStationRadio].stName.trim()
      var filename2 = this.deviceNameMaps[0].deviceName
      let params = ''
      for (const key in this.requestParams) {
        if (this.requestParams.hasOwnProperty(key)) {
          params += (key + '=' + this.requestParams[key] + '&')
        }
      }
      download({
        url: api＿exportSecondData + '?' + params + 'fileName=' + (filename1 + '-' + filename2)
      })
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/css/tableScroll.scss';

.device-second-query {
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
