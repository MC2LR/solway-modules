<template>
    <div class="new-watch">
        <el-form ref="Form" :model="custDeviceMeterSaveDeviceMeter.params" :inline='true' label-width="108px">
            <el-row>
                <el-col :span="12" style="text-align: right;padding-right: 70px">
                    <el-form-item prop="name" label="计量点名称"
                    :rules="{ required: true, message: '请输入计量点名称' }">
                        <el-input
                            v-model="custDeviceMeterSaveDeviceMeter.params.name"
                            style="width: 210px"
                            placeholder="请输入计量点名称"
                        ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12" style="text-align: left;padding-left: 20px">
                    <el-form-item prop="code" label="表计编号"
                    :rules="{ required: true, message: '请输入表计编号' }">
                        <el-input
                            v-model="custDeviceMeterSaveDeviceMeter.params.code"
                            style="width: 210px"
                            placeholder="请输入表计编号"
                        ></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12" style="text-align: right;padding-right: 70px">
                    <el-form-item prop="dt" label="电表类型"
                    :rules="{ required: true, message: '请选择电表类型' }">
                        <el-select placeholder="请选择" style="width: 202px" v-model="custDeviceMeterSaveDeviceMeter.params.dt">
                            <el-option label="上网" :value="1"></el-option>
                            <el-option label="发电" :value="2"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12" style="text-align: left;padding-left: 20px">
                    <el-form-item prop="multpw" label="倍率"
                    :rules="{ required: true, message: '请输入倍率' }">
                        <el-input
                          v-model="custDeviceMeterSaveDeviceMeter.params.multpw"
                          style="width: 210px"
                          placeholder="请输入倍率"
                        ></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancel()">取 消</el-button>
            <el-button type="primary" @click="submit()">提 交</el-button>
        </div>
    </div>
</template>

<script>
import { api＿custDeviceMeterSaveDeviceMeter } from '@newEnergyCloud/request/api'
export default {
  props: {
      detail: {
          type: Object
      },
      powerDetail: {
          type: Object
      }
  },
  data () {
    return {
      custDeviceMeterSaveDeviceMeter: api＿custDeviceMeterSaveDeviceMeter({
          later: true,
          params: {
            id: null,
            deviceId: null,
            stId: '',
            dt: '',
            multpw: '',
            name: '',
            code: ''
          },
          res: { body: [] },
          beforeSend (params) {
              delete params.createTime
              delete params.updateTime
              delete params.stid
              return params
          }
      })
    }
  },
  mounted () {
    this.$bus.on('openWatch', this.openWatch)
  },
  methods: {
    async openWatch () {
      await this.$timeout(100)
      this.$refs.Form.resetFields()
      this.custDeviceMeterSaveDeviceMeter.params = {}
      if (this.detail) {
        this.custDeviceMeterSaveDeviceMeter.params = {
            ...this.custDeviceMeterSaveDeviceMeter.params,
            ...this.detail
        }
          this.custDeviceMeterSaveDeviceMeter.params.stId = this.powerDetail.stid
      } else {
          delete this.custDeviceMeterSaveDeviceMeter.params.id
          delete this.custDeviceMeterSaveDeviceMeter.params.deviceId
          this.custDeviceMeterSaveDeviceMeter.params.stId = this.powerDetail.stid
      }
    },
    // 取消
    cancel () {
        this.$refs.Form.resetFields()
        this.$bus.emit('hideNewWatch')
    },
    // 提交
    submit () {
        this.$refs.Form.validate(valid => {
          if (!valid) return false
          this.custDeviceMeterSaveDeviceMeter.getData(this.custDeviceMeterSaveDeviceMeter.params).then(res => {
            if (res.code !== 200) return this.$message({message: res.msg, type: 'error'})
            this.$message({message: res.msg, type: 'success'})
            this.$bus.emit('hideNewWatch')
            this.$bus.emit('updateWatchList')
          })
      })
    }
  },
  destroyed () {
      this.$bus.off('openWatch', this.openWatch)
  }
}
</script>

<style lang="scss">
.new-watch {
    margin-top: 5px;
    .el-form--inline .el-form-item {
      margin-right: 0;
    }
    .el-dialog--center .el-dialog__body {
      padding: 25px 50px 25px;
    }
}
</style>

<style lang="scss" scoped>
.new-watch {
    .dialog-footer {
        text-align: center;
    }
}
</style>
