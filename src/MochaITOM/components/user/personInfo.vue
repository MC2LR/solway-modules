<template>
    <div class="personal-info" @click="$event.stopPropagation();">
        <h2>修改个人信息</h2>
        <div class="form">
            <div class="clearfix form-con">
                <label class="pull-left width-per2 form-label">用户名</label>
                <div class="pull-left width-per3">
                    <input type="text" v-model="formData.userName" class="form-input">
                </div>
                <label class="pull-left width-per2 form-label">真实姓名</label>
                <div class="pull-left width-per3">
                    <input type="text" v-model="formData.realName" class="form-input">
                </div>
            </div>
            <div class="clearfix form-con">
                <label class="pull-left width-per2 form-label">手机号码</label>
                <div class="pull-left width-per3">
                    <input type="text" v-model="formData.tel" class="form-input">
                </div>
                <label class="pull-left width-per2 form-label">邮箱</label>
                <div class="pull-left width-per3">
                    <input type="text" v-model="formData.email" class="form-input">
                </div>
            </div>
        </div>
        <div class="text-right" style="margin:15px 0;line-height: 39px;">
            <button class="btn btn-save" @click="save()">保存</button>
            <button class="btn btn-cancel" @click="cancel()">取消</button>
        </div>
    </div>
</template>

<script>
import {api＿updateDataSelective, api＿getLoginUser} from '@comm/request/api'
import { Message } from 'element-ui'
import '@comm/tools/dateFormatter'
export default {
    name: 'personalInfo',
    data () {
        return {
            formData: {}
        }
    },
    methods: {
        cancel () {
            this.$bus.$emit('closePersonInfo')
        },
        save () {
            let params = {
                userId: this.formData.userId,
                realName: this.formData.realName,
                email: this.formData.email,
                tel: this.formData.tel
            }
            api＿updateDataSelective({data: params}).subscribe(res => {
                Message({
                    message: '修改成功，将在重新登录后生效!',
                    type: 'success'
                })
                this.$bus.$emit('closePersonInfo')
            })
        }
    },
    created () {
        api＿getLoginUser().subscribe(res => {
            this.formData = res
        })
    }
}
</script>

<style lang="scss" scoped>
.personal-info{
    h2{
        font-size:24px;
        margin-bottom:45px;
        line-height: 26px;
    }
    width: 600px;
    margin: 75px auto 0;
    padding: 30px;
    border: 1px solid rgba(0,0,0,.2);
    border-radius: 6px;
    outline: 0;
    box-shadow: 0 5px 15px rgba(0,0,0,.5);
    background-color: #fff;
    color:rgba(0, 0, 0, 0.7);
    .form-con {
        line-height: 36px;
        &:first-child {
            margin-bottom: 20px;
        }
        label {
            height: 40px;
        }
        div {
            height: 40px;
        }
        input {
            height: calc(100% - 4px);
        }
    }
    .form-label{
        // line-height: 34px;
        padding-right: 20px;
        font-size: 13px;
        text-align: right;
    }
    .form-input{
        width:100%;
        border: 1px solid #ccc;
        text-indent: 6px;
        border-radius: 2px;
        height: 32px;
        font-size: 14px;
        color: #555;
        background-color: #fff;
    }
    .btn{
        display: inline-block;
        width:90px;
        border-radius: 2px;
        line-height: 32px;
        cursor: pointer;
        &.btn-save{
            color: #fff;
            background-color: #1caf9a;
            border:1px solid #1caf9a;
            margin-right: 5px;
        }
        &.btn-cancel{
            color: #58666e;
            background-color: #fff;
            border: 1px solid #dee5e7;
        }
    }
    .width-per2{
        width:20%;
    }
    .width-per3{
        width:30%;
    }
}
</style>
