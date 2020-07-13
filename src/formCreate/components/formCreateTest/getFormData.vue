<template>
    <div class="form-create-test-root">
        <form-create-packing
            v-if="rule && option"
            :rule="rule"
            :option="option">
        </form-create-packing>
    </div>
</template>

<script>
import json from './1'
import FormCreatePacking from './formCreatePacking'
export default {
    data () {
        return {
            option: null,
            rule: null
        }
    },
    created () {
        setTimeout(() => {
            this.option = json.option
            this.rule = json.rule
        }, 1000)
    },
    components: {
        FormCreatePacking
    }
}
</script>

<style lang="scss" scoped>
.form-create-test-root {
    width: 100vw;
    height: 100vh;
    background-color: #fff;
    padding: 30px;
}
</style>
