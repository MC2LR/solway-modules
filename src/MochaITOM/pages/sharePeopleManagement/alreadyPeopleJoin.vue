<template>
    <div class="alreadyPeopleJoin">
        <el-form ref="Form" :model="detail" :inline='true' label-width="100px">
            <el-row>
                <el-col :span="24">
                    <el-form-item
                        style="width: 100%"
                        prop="stids"
                        label="选择所属电站"
                        class="selectStation">
                        <el-select
                          v-model="detail.stids"
                          style="width: 650px"
                          filterable
                          clearable
                          multiple
                          placeholder=""
                          >
                            <el-option
                            v-for="item in apiAuthUserAccessQueryStWithList.res.data"
                            :key="item.busiId"
                            :label="item.name"
                            :value="item.busiId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script>
import { api＿apiAuthUserAccessQueryStWithList, api＿apiAuthWechatUnbindUser2Company, api＿apiAuthWechatBindUser2Company } from '@MochaITOM/request/api'
export default {
  props: {
      detail: {
          type: Object
      }
  },
  data () {
    return {
        detailObj: {},
        apiAuthUserAccessQueryStWithList: api＿apiAuthUserAccessQueryStWithList({
            later: true,
            res: {
                body: []
            }
        }),
        apiAuthWechatUnbindUser2Company: api＿apiAuthWechatUnbindUser2Company({
            later: true,
            res: {
                body: []
            }
        }),
        apiAuthWechatBindUser2Company: api＿apiAuthWechatBindUser2Company({
            later: true,
            res: {
                body: []
            }
        })
    }
  },
  mounted () {
    this.$bus.on('openAlreadyAddGroup', this.openAlreadyAddGroup)
    this.$bus.on('saveAlreadyAddGroup', this.saveAlreadyAddGroup)
  },
  methods: {
    openAlreadyAddGroup () {
        this.detailObj = JSON.parse(JSON.stringify(this.detail))
        this.detailObj.stids = this.detailObj.stations.map(v => { return v.stationId })
        if (this.detail.stations.length) {
            this.detail.stids = this.detail.stations.map(v => { return v.stationId })
        } else {
            this.detail.stids = []
        }
        this.getStationList()
    },
    getStationList () {
        this.apiAuthUserAccessQueryStWithList.getData({
            stClass: '01'
        })
    },
    // 提交
    saveAlreadyAddGroup () {
        // detailObj  [3002, 3333]
        // detail     [3333, 3047, 3049, 3011, 3044, 3045]
        // middleArr  [3002, 3047, 3049, 3011, 3044, 3045]

        // 3002
        let middleArr
        let deleteArr = []
        let addArr = []
        middleArr = this.detailObj.stids.concat(this.detail.stids).filter((v, i, arr) => {
            return arr.indexOf(v) === arr.lastIndexOf(v)
        })
        middleArr.forEach(v => {
            this.detailObj.stids.forEach(vv => {
                if (v === vv) {
                    deleteArr.push(v)
                }
            })
        })
        addArr = deleteArr.concat(middleArr).filter((v, i, arr) => {
            return arr.indexOf(v) === arr.lastIndexOf(v)
        })
        if (!addArr.length && !deleteArr.length) return this.$message({message: '请删除或者添加电站', type: 'error'})
        // console.log(deleteArr, addArr)
        addArr.length && this.apiAuthWechatBindUser2Company.getData({
            id: this.detail.id,
            stationIds: addArr.join()
        }).then(res => {
            if (res.code !== 200) return this.$message({message: res.msg || '提交失败', type: 'error'})
            this.$message({message: res.msg || '提交成功', type: 'success'})
            this.$bus.emit('updateList')
        })

        deleteArr.length && this.apiAuthWechatUnbindUser2Company.getData({
            id: this.detail.id,
            stationIds: deleteArr.join()
        }).then(res => {
            if (res.code !== 200) return this.$message({message: res.msg || '提交失败', type: 'error'})
            this.$message({message: res.msg || '提交成功', type: 'success'})
            this.$bus.emit('updateList')
        })
    }
  },
  destroyed () {
      this.$bus.off('openAlreadyAddGroup', this.openAlreadyAddGroup)
      this.$bus.off('saveAlreadyAddGroup', this.saveAlreadyAddGroup)
  }
}
</script>

<style lang="scss">
.alreadyPeopleJoin {
    margin-top: 5px;
    .el-form--inline .el-form-item {
      margin-right: 0;
    }
    .el-dialog--center .el-dialog__body {
      padding: 25px 50px 25px;
    }
    .selectStation {
        .el-form-item__content {
            width: calc(100% - 100px);
        }
    }
}
</style>

<style lang="scss" scoped>
.alreadyPeopleJoin {
    text-align: center;
    .title {
        color: #585858;
        font-size: 15px;
        margin-bottom: 20px;
        padding-top: 6px;
        text-align: left;
        span {
            padding-right: 50px;
        }
    }
    // .width-label{
    //     width: 6em;
    //     display: inline-block;
    //     margin-left: -73px;
    // }
    .dialog-footer {
        text-align: center;
    }
}
</style>
