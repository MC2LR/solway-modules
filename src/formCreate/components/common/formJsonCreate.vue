<template>
    <form-create
        v-if="option && rule"
        v-model="fApi"
        @mounted="formMounted"
        :option="processedOption"
        :rule="processedRule">
    </form-create>
</template>
<script>
import formCreate from '@form-create/element-ui'

export default {
    props: {
        option: {
            type: Object,
            required: true
        },
        rule: {
            type: Array,
            required: true
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
        formCreate: formCreate.$form()
    },
    data () {
        return {
            fApi: {},
            processedRule: JSON.parse(JSON.stringify(this.rule)),
            processedOption: this.processOption()
        }
    },
    methods: {
        formMounted ($f) {
            this.evil(this.option.mounted, {...this.expand, vm: this})($f)
            if (this.edit && this.option.writeBack) {
                this.evil(this.option.writeBack, {...this.expand, $f, vm: this})()
            }
            $f.updateOptions({onSubmit: this.evil(this.option.onSubmit, {$f, ...this.expand, vm: this})})
            $f.fields().forEach(v => {
                const rule = $f.getRule(v)
                $f.updateRule(v, {
                    on: Object.keys(rule.on).reduce((a, b) => {
                        a[b] = this.evil(rule.on[b], {$f, ...this.expand, vm: this})
                        return a
                    }, {})
                })
            })
        },
        processOption (option = this.option) {
            const processedOption = {...option}
            delete processedOption.mounted
            delete processedOption.onSubmit
            return JSON.parse(JSON.stringify(processedOption))
        },
        evil (innerScript, argOption = {}, outerScript = 'return ') {
            const formalParameter = Object.keys(argOption)
            let Fn = Function
            return new Fn(...formalParameter, outerScript + innerScript)(...formalParameter.map(k => argOption[k]))
        }
    }
}
</script>
