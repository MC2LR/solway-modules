<template>
    <div class="home-index">
        <component :is="shanghai ? 'shanghaiIndex' : 'commonIndex'"></component>
    </div>
</template>

<script>
export default {
    data () {
        return {
            shanghai: false
        }
    },
    created () {
        this.shanghai = this.$store.getters.current_companyid === 189
    },
    components: {
        shanghaiIndex: () => import('./indexShanghai'),
        commonIndex: () => import('./indexCommon')
    }
}
</script>

<style lang="scss" scoped>
.home-index {
   // adf
}
</style>
