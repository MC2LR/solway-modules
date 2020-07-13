<template>
    <form-json-create :option="option" :rule="rule" :edit="edit" :expand="all_expand"></form-json-create>
</template>

<script>
import formJsonCreate from './formJsonCreate'
import * as ajax from '@comm/request/http'
import {baseApi} from '@comm/request/api'
import Vue from 'vue'
import { Button, Form, FormItem, Row, Col, Input, Select, Option, DatePicker, Upload, Progress } from 'element-ui'
Vue.component(Button.name, Button)
Vue.component(Form.name, Form)
Vue.component(FormItem.name, FormItem)
Vue.component(Row.name, Row)
Vue.component(Col.name, Col)
Vue.component(Input.name, Input)
Vue.component(Select.name, Select)
Vue.component(Option.name, Option)
Vue.component(DatePicker.name, DatePicker)
Vue.component(Upload.name, Upload)
Vue.component(Progress.name, Progress)

export default {
    props: {
        initData: {
            type: Object
        },
        option: {
            type: Object
        },
        rule: {
            type: Array
        },
        edit: {
            type: Boolean,
            default: false
        },
        expand: {
            type: Object,
            default () {
                return {}
            }
        }
    },
    components: {
        formJsonCreate
    },
    data () {
        return {
            all_expand: {$solwayApi: ajax, $baseApi: baseApi, ...this.expand, initData: this.initData}
        }
    }
}
</script>
