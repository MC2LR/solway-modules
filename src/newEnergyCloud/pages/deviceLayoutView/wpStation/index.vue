<template>
    <div class="wp-device-matrix">
        <page-header></page-header>
        <page-body></page-body>
    </div>
</template>

<script>
import PageHeader from './header'
import PageBody from './body'
export default {
    components: {
        PageHeader,
        PageBody
    }
}
</script>

<style lang="scss" scoped>
.wp-device-matrix {
    height: 100%;
    background: #131F32;
}
</style>
