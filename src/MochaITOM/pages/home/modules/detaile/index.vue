<template>
  <div class="index">
    <el-dialog
      :visible.sync="visible"
      :modal-append-to-body="false"
      title="任务详情"
      center
      custom-class="dialogs"
      @close="showName = 'pub'"
      top="40px"
      width="65%"
    >
      <el-tabs :tab-position="tabPosition" style="height: 100%" v-model="showName">
        <el-tab-pane label="发布详情" name="pub">
          <div class="pubs">
            <div class="lines sd">
              <p>
                <span class="pubFont">发布时间:</span>
                {{$useful($oc(getTaskDetail.res, 'data', 'publishTime'), '--')}}
              </p>
              <p>
                <span class="pubFont">任务类型</span>
                {{type}}
              </p>
            </div>
            <div class="lines sd">
              <p>
                <span class="pubFont">任务电站:</span>
                {{$useful($oc(getTaskDetail.res, 'data', 'stationName'), '--')}}
              </p>
              <p>
                <span class="pubFont">任务名称:</span>
                {{$useful($oc(getTaskDetail.res, 'data', 'name'), '--')}}
              </p>
            </div>
            <div class="lines dss">
              <p>
                <span class="pubFont">任务内容:</span><span class="contentss">{{$useful($oc(getTaskDetail.res, 'data', 'content'), '--')}}</span>
              </p>
            </div>

            <div class="lines sd">
              <p>
                <span class="pubFont">执行人:</span>
                {{$useful($oc(getTaskDetail.res, 'data', 'handlerName'), '--')}}
              </p>
              <p>
                <span class="pubFont">抄送人:</span>
                {{toName}}
              </p>
            </div>
            <div class="lines sd">
              <p>
                <span class="pubFont">计划开始时间:</span>
                {{$useful($oc(getTaskDetail.res, 'data', 'startTime'), '--')}}
              </p>
              <p>
                <span class="pubFont">计划结束时间:</span>
                {{$useful($oc(getTaskDetail.res, 'data', 'endTime'), '--')}}
              </p>
            </div>
            <div class="lines sd">
              <p v-if="typeIsMeter">
                <span class="pubFont">抄表期数:</span>
                {{$useful($oc(getTaskDetail.res, 'data', 'meterReadTerm'), '--')}}
              </p>
              <p v-if="redShow">
                <span class="pubFont">红包金额(元):</span>
                {{$useful($oc(getTaskDetail.res, 'data', 'redEnvAmount'), '--')}}
              </p>
            </div>
            <p class="lines">
              <span class="pubFont">附件:</span>
              <span style="color:#2FBFCC;cursor:pointer" @click="downLoad">{{fileName}}</span>
            </p>
            <div class="tasK_dot">
              <div
                v-for="(item,index) in taskPoint"
                :key="index"
                style="font-size:14px;text-indent:10px"
              >
                任务点-{{index+1}}
                <p style="text-indent:35px" class="taskContent sing">
                  任务内容:
                  <span style="display:inline;line-height:30px" class="content">{{item.name}}</span>
                </p>
                <div class="taskContent">
                  任务地理位置:
                  <span
                    style="display:inline;color:#0FBBF4;cursor:pointer"
                    @click="getMap(index)"
                  >{{item.position}}</span>
                </div>
                <br />
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="执行结果">
          <div class="pubs">
            <div class="lines sd">
              <p>
                <span class="pubFont">受理时间:</span>
                {{$useful($oc(getTaskDetail.res, 'data', 'acceptTime'), '--').slice(0,10)}} {{$useful($oc(getTaskDetail.res, 'data', 'acceptTime'), '--').slice(14,19)}}
              </p>
              <p>
                <span class="pubFont">完成时间:</span>
                {{$useful($oc(getTaskDetail.res, 'data', 'endTime'), '--')}}
              </p>
            </div>
            <p class="lines sd">
              <span>
                <span class="pubFont">完成说明:</span>
              </span>
              <span>{{$useful($oc(getTaskDetail.res, 'data', 'completeDesc'), '--')}}</span>
            </p>
            <div class="tasK_dot">
              <div v-for="(item,index) in taskPoint" :key="index" style="font-size:14px;text-indent:10px">
                任务点-{{index+1}}
                <div class="lines sd clear">
                  <p><span class="pubFont ">启动时间:</span> {{item.startTime !==null?item.startTime.slice(0,10):item.startTime}} {{item.startTime!==null?item.startTime.slice(14,19):item.startTime}}</p>
                  <p><span class="pubFont">到达时间:</span>{{item.arriveTime}}</p>
                </div>
                <div class="lines sd ">
                  <p><span class="pubFont">结束时间:</span>{{item.completeTime!==null?item.completeTime.slice(0,10):item.completeTime}} {{item.completeTime!==null?item.completeTime.slice(14,19):item.completeTime}}</p>
                </div>
                 <div class="lines sd ">
                  <p style="width:100%"><span class="pubFont">完成说明:</span>{{item.completeDesc}}</p>
                </div>
                <div class="lines sd">
                  <div ><span class="pubFont">维修方案:</span> <span class="contentss"></span> </div>
                </div>
                <div class="lines sd">
                  <p><span class="pubFont">附件：</span></p>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="任务过程">
          <div class="pubs">
            <div class="lines sd process" v-for="(item,index) in taskProccess" :key="index">
              <!-- <p style="text-indent:30px;width:40%;overflow:auto">{{item.logTime.slice(0,10)}} {{item.logTime.slice(14,19)}}</p> -->
              <p style="text-indent:30px;width:40%;overflow:auto">{{item.logTime}}</p>
              <p class="Pro" style="width:60%;text-indent:20px">{{item.content}}</p>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="评论">
          <div class="pubs">
            <div id="messag" style="max-height:295px;overflow:auto;">
              <div v-for="(item,index) in commit" :key="index">
                <p class="to_name">
                  <i class="el-icon-chat-dot-round" style="color:green"></i>
                  <span style="color:#72D0D9;font-size:12px">{{item.reviewName}}</span>
                  &nbsp;发表了评论&nbsp;&nbsp;&nbsp; {{item.reviewTime}}
                </p>
                <p class="infosed">
                  {{item.content}}
                  <span style="color:#72D0D9">{{item.atName}}</span>
                </p>
              </div>
              <br />
            </div>
            <h1 style="font-size:12px;font-weight:400;color:black">添加评论</h1>
            <br />
            <textarea
              style="font-size:14px;width:90%;resize:none;margin-bottom:5px"
              v-model="textArea"
              rows="10"
              required
              placeholder="请输入评论内容(必填)"
            ></textarea>
            <p>
              <span style="font-size:20px;color:#0099FF;cursor:pointer">@</span>
              <el-select @change="at()" multiple v-model="atVlaue" placeholder="请选择">
                <el-option
                  v-for="item in atData"
                  :key="item.value"
                  :label="item.realname"
                  :value="item.id"
                ></el-option>
              </el-select>
              <el-button type="primary" @click="sent">发表评论</el-button>
            </p>
          </div>
        </el-tab-pane>
      </el-tabs>
      <el-dialog width="40%" title="地图详情" :visible.sync="innerVisible" append-to-body>
        <div style="height:50vh;overflow:hidden;width:100%" id="con"></div>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import { Dialog } from 'element-ui'
import {
  api＿apiAuthtaskDetail,
  api＿apiAuthcomment,
  api＿apiAuthGetAtperson,
  api＿apiAuthgetdownloadOss
} from '@MochaITOM/request/api'
import BMap from 'BMap'
export default {
  name: 'index',
  data () {
    return {
      visible: false,
      commit: [],
      type: '',
      toName: '',
      fileName: '',
      typeIsMeter: false,
      redShow: false,
      taskPoint: [

      ],
      taskProccess: [],
      innerVisible: false,
      tabPosition: 'left',
      showName: 'pub',
      temAtData: [],
      atVlaue: [],
      atData: [],

      textArea: '',
      setComment: api＿apiAuthcomment({
        later: true
      }), // 添加评论
      getTaskDetail: api＿apiAuthtaskDetail({
        later: true
      }), // 获取任务详情
      getAtPer: api＿apiAuthGetAtperson({
        later: true
      }), // 获取at人员信息
      downloadOss: api＿apiAuthgetdownloadOss({
        later: true
      }) // 附件下载
    }
  },

  components: {
    ElDialog: Dialog
  },
  updated () {
    if (document.getElementById('messag') !== null) {
      let ele = document.getElementById('messag')
      ele.scrollTop = ele.scrollHeight
    }
  },
  mounted () {
    this.$bus.on('detaile', this.event)
  },
  methods: {
    // 附件下载
    downLoad () {
        console.log('没有下载')
        this.downloadOss.getData({
            fileName: '文件',
            url: 'www.baidu.com'
        }).then(() => {

        })
    },
    event (val) {
      console.log(val)

      this.getTaskDetail.getData({ id: val.id }).then(res => {
        if (res.code === 200) {
          console.log(res)

          this.fileName = res.data.fileInfolist === null ? '' : res.data.fileInfolist.originalName
          res.data.publishTime = res.data.pointTime + ' ' + res.data.publishTime
          res.data.startTime = res.data.startPoint + ' ' + res.data.startTime
          res.data.endTime = res.data.endPoint + ' ' + res.data.endTime
          if (res.data.endTime === 'null null') {
            res.data.endTime = '---'
          }
          this.commit = res.data.taskReviewlist
          if (res.data.type === '04') {
            this.typeIsMeter = true
          }
           if (res.data.mode === '02') {
            this.redShow = false
          }
          console.log(this.commit)

          this.commit.forEach(item => {
            if (item.atName !== null) {
              if (item.atName.indexOf(',') !== -1) {
                let a = item.atName.split(',')
                item.atNames = ''
                for (let i = 0; i < a.length; i++) {
                  item.atNames += '@' + a[i]
                }
                item.atName = item.atNames
              } else {
                item.atName = '@' + item.atName
              }
            }
            if (item.reviewTime !== null) {
                if ((item.reviewTime + '').length >= 19) {
                  item.reviewTime =
                    item.reviewTime.slice(0, 10) +
                    ' ' +
                    item.reviewTime.slice(14, 19)
                }
            }
          })

          localStorage.setItem('id', val)
          this.type = this.getTypes(res.data.type) // 判断类型
          this.toName = ''
          res.data.ccNameList.forEach(item => {
            this.toName += ' ' + item
          }) // 添加抄送人
          this.taskPoint = res.data.itemTaskList
          this.taskProccess = res.data.taskLogList
          this.getAtPer.getData().then(res => {
            this.atData = res.data
            this.visible = true
          })
        }
      })
    },
    //   获取类型
    getTypes () {
      switch (this.getTaskDetail.res.data.type) {
        case '01':
          return '通用'
        case '02':
          return '检修'
        case '03':
          return '清洗'
        case '04':
          return '抄表'
      }
    },
    at () {
      //   将被艾特的人信息存起来
      this.temAtData = []
      for (let i = 0; i < this.atVlaue.length; i++) {
        for (let j = 0; j < this.atData.length; j++) {
          if (this.atVlaue[i] === this.atData[j].id) {
            this.temAtData.push(this.atData[j])
          }
        }
      }
      localStorage.setItem('atData', JSON.stringify(this.temAtData))
    }, //   添加评论
    sent () {
      let parameId = []
      let parameName = []
      if (this.temAtData.length > 0) {
        this.temAtData.forEach(item => {
          parameId.push(item.id + '')
          parameName.push(item.realname)
        })
      }
      if (this.textArea !== '') {
        this.setComment
          .getData({
            reviewName: this.$store.getters['real_name'],
            reviewId: this.$store.getters['user_id'],
            atNameList: parameName,
            atIdList: parameId,
            mainTaskId: localStorage.getItem('id') * 1,
            content: this.textArea
          })
          .then(res => {
            // 删除at数据
            localStorage.removeItem('atData')
            this.textArea = ''
            this.temAtData = []
            this.atVlaue = []
            this.event(localStorage.getItem('detaileId'))
          })
      }
    },
    //   显示子任务地图详情
    getMap (index) {
      this.innerVisible = true
      setTimeout(() => {
        let map = new BMap.Map('con') // 创建地图实例
        let point = new BMap.Point(
          this.taskPoint[index].longitude,
          this.taskPoint[index].latitude,
          11
        ) // 创建点坐标
        map.centerAndZoom(point, 6)
        let marker = new BMap.Marker(point)
        map.addOverlay(marker)
        map.enableScrollWheelZoom(true)
      }, 0)
    }
  },
  beforeDestroy () {
    this.$bus.off('detaile')
  }
}
</script>
<style lang="scss">
.anchorBL {
  display: none;
}
</style>
<style lang="scss" scoped>
.index {
  height: 100%;
  position: relative;
  >>> .el-dialog__header {
    box-shadow: 0px 1px 14px 0px rgba(81, 149, 245, 0.2);
  }
  >>> .el-dialog__title {
    color: #343434;
    font-size: 16px;
  }
  >>> .el-dialog {
    height: 85%;
    overflow: auto;
  }
  >>> .el-tabs__item {
    color: rgba(47, 191, 204, 1);
    border: 1px solid rgba(47, 191, 204, 1);
    border-radius: 3px;
    margin-bottom: 3px;
    text-align: center;
    font-size: 16px;
    height: 35px;
    line-height: 35px;
    font-family: Microsoft YaHei;
  }
  >>> .el-tabs__nav-wrap::after {
    width: 0;
  }
  >>> .el-tabs--left .el-tabs__active-bar.is-left {
    display: none;
  }
  >>> .is-active {
    background: #0fbbf4;
    color: white;
    font-size: 16px;
  }
  >>> .anchorBL {
    display: none;
  }
  >>> .el-input__inner{
    width: 180px;
    height: 34px !important;
  }
  .pubs {
    width: 95%;
    margin: 0 auto;
    border-radius: 8px;
    background: #f1f3f4;
    overflow-y: scroll;
    background: rgba(18, 46, 90, 0);
    .Pro{
      overflow: auto;
    }
    .sd {
      display: flex;
      p {
        width: 50%;
        line-height: 30px;
      }
    }

    .dss {
      p {
        width: 100%;
        height: 30px;
        line-height: 30px;

      }
    }
    .ds {
      p {
        width: 40%;
        text-align: center;
      }
    }
    .lines {
      padding-bottom: 5px;
      font-size: 12px;
      color: rgba(51, 51, 51, 1);
      overflow: hidden;
      font-family: Microsoft YaHei;
      .pubFont {
        color: rgba(102, 102, 102, 1);
        width: 71px;
        text-align: right;
        display: inline-block;
        margin-right: 15px;
        vertical-align: top;
      }
      .contentss{
        display: inline-block;
        width:75%;
        height: 30px;
        max-height: 150px;
        overflow: auto;
      }
    }
    .process{
      color: #666666;
      font-size: 12px;
        margin-bottom: 4px;
        padding: 0;
        background:rgba(236,238,248,0.6);
      p{
        height: 32px;
        line-height: 32px;
      }
    }
      .clear{
      padding: 0;
      margin-top: 10px;
    }
    .bb {
      background: rgba(40, 65, 104, 0.4);
      border-radius: 4px;
      margin-bottom: 3px;
    }
    .to_name {
      height: 20px;
      width: 96%;
      margin: 0 auto;
      line-height: 25px;
      color: black;
      font-size: 12px;
      .el-icon-chat-dot-round {
        font-size: 16px;
      }
    }
    .infosed {
      min-height: 30px;
      width: 93%;
      margin: 0 auto;
      color: black;
      line-height: 40px;
      font-size: 12px;
      text-indent: 30px;
      border-left: 1px solid #a9a9a9;
    }
    .tasK_dot {
      width: 99%;
      padding-top: 15px;
      height: 300px;
      overflow: auto;
      margin: 0 auto;
      margin-top: 15px;
      font-size: 12px;
      background: rgba(236, 238, 248, 1);
      opacity: 0.7;
      color: rgba(51, 51, 51, 1);
      .taskContent {
        // margin: 5px 0 0 0;
        color: #666666;
      }
      .sing {
        margin-top: 13px;
      }
      .content {
        color: #343434;
      }
      span {
        display: block;
        height: 30px;
        line-height: 30px;
      }
      >>> .el-input {
        width: 400px;
      }
      >>> .el-input-group__append {
        padding: 0;
        background: #3385ff;
        .el-icon-search::before {
          color: white;
          margin-right: 25px;
          font-size: 26px;
        }
      }

      >>> .el-input__prefix {
        text-align: center;
        line-height: 34px;
        text-indent: 0;
        width: 30px;
        .el-icon-location {
          color: #3300ff;
          display: inline;
          font-size: 30px;
        }
      }
    }
  }
}
</style>
