<template>
    <div class="update-password" @click="$event.stopPropagation();">
        <h2>用户密码修改</h2>
        <div class="form">
            <div class="clearfix form-con">
                <label class="pull-left width-per2 form-label">旧密码</label>
                <div class="pull-left width-per8">
                    <input type="password" v-model="oldpwd" class="form-input">
                </div>
            </div>
            <div class="clearfix form-con">
                <label class="pull-left width-per2 form-label">新密码</label>
                <div class="pull-left width-per8">
                    <input type="password" v-model="newpwd" class="form-input" placeholder="大写字母,小写字母,数字,特殊字符,4选3,至少8位">
                </div>
            </div>
            <div class="clearfix form-con">
                <label class="pull-left width-per2 form-label">确认密码</label>
                <div class="pull-left width-per8">
                    <input type="password" v-model="confirmpwd" class="form-input">
                </div>
            </div>
        </div>
        <div class="text-right" style="margin:15px 0;line-height: 39px;">
            <button class="btn btn-save" @click="save()">保存</button>
            <button class="btn btn-cancel" @click="cancel()">取消</button>
        </div>
        <div class="validate-error" v-if="errorTip">
            <alert
                v-bind:title=errorTip
                type="error">
            </alert>
        </div>
    </div>
</template>

<script>
import {api＿userPasswordChangeModel} from '@comm/request/api'
import { Message, Alert } from 'element-ui'
export default {
    name: 'updatePassword',
    data () {
        return {
            regPass: /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\W_!@#$%^&*`~()-+=]+$)(?![0-9\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\W_!@#$%^&*`~()-+=]{8,30}$/,
            errorTip: null,
            oldpwd: '',
            newpwd: '',
            confirmpwd: ''
        }
    },
    components: {
        Alert
    },
    methods: {
        cancel () {
            this.$bus.$emit('closeUpdatePassword')
        },
        save () {
            this.errorTip = ''
            let { oldpwd, newpwd, confirmpwd } = this
            if (oldpwd.length < 6) {
                this.errorTip = '旧密码应该不小于6位'
                return
            }
            if (!this.regPass.test(newpwd)) {
                this.errorTip = '请输入强类型的密码' + '(大写字母,小写字母,数字,特殊字符,4选3,至少8位)'
                return
            }
            if (newpwd !== confirmpwd) {
                this.errorTip = '两次输入密码不一致'
                return
            }
            api＿userPasswordChangeModel({data: { oldpwd, newpwd }}).subscribe(res => {
                if (res) {
                    Message({
                        message: '修改成功！',
                        type: 'success'
                    })
                    this.$bus.$emit('closeUpdatePassword')
                } else {
                    Message({
                        message: '修改失败！',
                        type: 'error'
                    })
                }
            })
        }
    },
    created () {
    }
}
</script>

<style lang="scss" scoped>
.update-password{
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
        margin-bottom: 15px;
        &:last-child {
            margin-bottom: 0;
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
    .width-per8{
        width:80%;
    }
    .validate-error{
        padding-left:112px;
    }
}
</style>
