<template>
    <my-form-create
        v-if="processedOption && processedRule"
        :rule="processedRule"
        :option="processedOption">
    </my-form-create>
</template>

<script>
import myFormCreate from './formCreate'
export default {
    props: {
        rule: {
            type: Array,
            required: true
        },
        option: {
            type: Object,
            required: true
        }
    },
    data () {
        return {
            processedOption: this.processOption(),
            processedRule: this.rule
        }
    },
    methods: {
        processOption () {
            const processedOption = {...this.option}

            processedOption.mounted = this.evil(this.option.mounted)

            processedOption.onSubmit = this.evil(this.option.onSubmit)

            return processedOption
        },
        evil (scriptStr, argOption = {}) {
            const formalParameter = Object.keys(argOption)
            let Fn = Function
            return new Fn(...formalParameter, 'return ' + scriptStr)(...formalParameter.map(k => argOption[k]))
        }
    },
    components: {
        myFormCreate
    }
}
</script>
