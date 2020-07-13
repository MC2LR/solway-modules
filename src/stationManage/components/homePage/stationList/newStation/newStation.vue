<template>
    <el-dialog
        width="1000px"
        center
        :visible="true"
        top='5vh'
        @close="$emit('close')">

        <el-divider content-position="left">基本信息</el-divider>

        <form-json-create :option="option" :rule="rule" :edit="!!stid" :initData="stationInfo"></form-json-create>

        <el-divider content-position="left">扩展信息</el-divider>

        <div class="formEditTips" v-show="!expand.api_all_params.busiId">请先填写并提交基本信息</div>

        <form-solway-create
            v-if="dynamicFormBusinessQueryField.res.data && expand.api_all_params.busiId"
            :expand="expand"
            :edit="!!stid"
            :option="dynamicFormBusinessQueryField.option"
            :rule="dynamicFormBusinessQueryField.res.data">
        </form-solway-create>

    </el-dialog>
</template>

<script>
import formJsonCreate from '@formCreate/components/common/formSolwayJsonCreate'
import formSolwayCreate from '@formCreate/components/common/formSolwayDbCreate'
import formJson from './newStationForm'
import {api＿dynamicFormBusinessQueryField} from '@/request/api'
import { Dialog, Divider, Message } from 'element-ui'

export default {
    props: ['stid', 'stationInfo'],
    components: {
        ElDialog: Dialog,
        ElDivider: Divider,
        formJsonCreate,
        formSolwayCreate
    },
    data () {
        return {
            option: formJson.option,
            rule: formJson.rule,
            expand: {
                api_all_params: {
                    busiId: this.stid || '',
                    fmCode: 'st_ext'
                }
            },
            dynamicFormBusinessQueryField: api＿dynamicFormBusinessQueryField({
                data: {
                    fmCode: 'st_ext'
                },
                option: {}
            })
        }
    },
    created () {
        this.$bus.on('stationFormsubmitSuccess', this.getFormId)
        this.$bus.on('stationFormCreateSuccess', this.createSuccess)
    },
    methods: {
        getFormId (stid) {
            this.expand.api_all_params.busiId = stid
        },
        createSuccess (res) {
            if (res.code === 0 || res.code === 200) {
                this.$emit('close')
                Message.success(res.msg || res.body)
            } else {
                Message.error(res.msg || res.body)
            }
        }
    },
    beforeDestroy () {
        this.$bus.off('stationFormsubmitSuccess', this.getFormId)
        this.$bus.off('stationFormCreateSuccess', this.createSuccess)
    }
}
</script>

<style lang="scss">
.el-dialog .el-divider__text {
    font-size: 20px;
}
</style>

<style lang="scss" scoped>
.formEditTips {
    font-size: 20px;
    padding: 30px;
}
</style>
