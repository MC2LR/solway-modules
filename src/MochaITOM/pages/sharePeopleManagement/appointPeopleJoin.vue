<template>
    <div class="appointPeopleJoin">
        <div class="title">
            邀请该人员加入创维互联
        </div>
        <el-form ref="Form" :model="detail" :inline='true' :rules="rules" label-width="100px">
            <el-row>
                <el-col :span="10">
                    <el-form-item
                        prop="name"
                        label="姓名">
                        <el-input v-model="detail.name" placeholder="请输入姓名"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item
                        prop="phone"
                        label="手机号">
                        <el-input v-model="detail.phone" placeholder="请输入手机号"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item
                        style="width: 100%"
                        prop="stids"
                        label="选择所属电站">
                        <el-select
                          style="width: 650px"
                          v-model="detail.stids"
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
import { api＿apiAuthQueryWechatUserWithPhone, api＿apiAuthUserAccessQueryStWithList, api＿apiAuthWechatBindUser2Company } from '@MochaITOM/request/api'
export default {
  data () {
    var validatePhone = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('请输入手机号'))
        } else {
            if (!this.phoneReg.test(value)) {
                callback(new Error('请输入正确的手机号格式'))
            }
        }
    }
    return {
        phoneReg: /^[1][3,4,5,7,8][0-9]{9}$/,
        rules: {
          phone: [
            { validator: validatePhone, trigger: 'blur' }
          ]
        },
        detail: {
            stids: []
        },
        apiAuthUserAccessQueryStWithList: api＿apiAuthUserAccessQueryStWithList({
            later: true,
            res: {
                body: []
            }
        }),
        apiAuthQueryWechatUserWithPhone: api＿apiAuthQueryWechatUserWithPhone({
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
    this.$bus.on('openSearchSharePeople', this.open)
    this.$bus.on('saveSearchSharePeople', this.save)
  },
  methods: {
    open () {
        this.getStationList()
    },
    getStationList () {
        this.apiAuthUserAccessQueryStWithList.getData({
            stClass: '01'
        })
    },
    // 提交
    save () {
        if (!this.phoneReg.test(this.detail.phone)) return this.$message({message: '请输入正确的手机号格式', type: 'error'})
        // this.$refs.Form.validate(valid => {
        //     if (!valid) return false
        const that = this
            this.apiAuthQueryWechatUserWithPhone.getData({
                phone: this.detail.phone,
                busiType: '02'
            }).then(res => {
                if (res.code !== 200) return this.$message({message: res.msg, type: 'error'})
                if (!res.data.length) return this.$message({message: '请联系用户先注册小程序', type: 'error'})
                if (!this.detail.stids.length) return this.$message({message: '请选择电站', type: 'error'})
                that.apiAuthWechatBindUser2Company.getData({
                    id: res.data[0].id,
                    stationIds: that.detail.stids.join()
                }).then(res2 => {
                    if (res2.code !== 200) return that.$message({message: res2.msg || '提交失败', type: 'error'})
                    that.$message({message: res2.msg || '提交成功', type: 'success'})
                    that.$bus.emit('updateList')
                })
            })
        // })
    }
  },
  destroyed () {
      this.$bus.off('openSearchSharePeople', this.open)
      this.$bus.off('saveSearchSharePeople', this.save)
  }
}
</script>

<style lang="scss">
.appointPeopleJoin {
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
.appointPeopleJoin {
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
