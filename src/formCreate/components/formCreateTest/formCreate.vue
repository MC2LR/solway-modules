<template>
    <form-create
        v-if="option && rule"
        v-model="fApi"
        @mounted="formMounted"
        :option="option"
        :rule="rule">
    </form-create>
</template>
<script>
import formCreate from '@form-create/element-ui'
import * as ajax from '@comm/request/http'
import Vue from 'vue'
import { Button, Form, FormItem, Row, Col, Input, Select, Option } from 'element-ui'
import json from './1'
Vue.component(Button.name, Button)
Vue.component(Form.name, Form)
Vue.component(FormItem.name, FormItem)
Vue.component(Row.name, Row)
Vue.component(Col.name, Col)
Vue.component(Input.name, Input)
Vue.component(Select.name, Select)
Vue.component(Option.name, Option)
export default {
    components: {
        formCreate: formCreate.$form()
    },
    data () {
        return {
            fApi: {},
            option: null,
            rule: null
        }
    },
    created () {
        setTimeout(() => {
            this.option = this.processOption()
            this.rule = json.rule
        }, 1000)
    },
    methods: {
        formMounted ($f) {
            this.evil(json.option.mounted, {$solwayApi: ajax})($f)
            $f.updateOptions({ onSubmit: this.evil(json.option.onSubmit, {$f, $solwayApi: ajax}) })
            $f.fields().forEach(v => {
                const rule = $f.getRule('cate_id')
                $f.updateRule(v, {
                    on: Object.keys(rule.on).reduce((a, b) => {
                        a[b] = this.evil(rule.on[b], {$f, $solwayApi: ajax})
                        return a
                    }, {})
                })
            })
        },
        processOption (option = json.option) {
            const processedOption = {...option}
            delete processedOption.mounted
            delete processedOption.onSubmit
            return processedOption
        },
        evil (innerScript, argOption = {}, outerScript = 'return ') {
            const formalParameter = Object.keys(argOption)
            let Fn = Function
            return new Fn(...formalParameter, outerScript + innerScript)(...formalParameter.map(k => argOption[k]))
        }
    }
}
</script>
