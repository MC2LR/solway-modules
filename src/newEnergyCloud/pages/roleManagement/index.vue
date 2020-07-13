<template>
    <div class='role-management'>
        <role-manage></role-manage>
    </div>
</template>

<script>
import {rem} from '@comm/mixin'
import roleManage from '@roleAuthorityManagement/components/roleAuthorityManagement/index'
export default {
    mixins: [rem],
    components: {
        roleManage
    },
    data () {
        return {
        }
    },
    beforeDestroy () {
    }
}
</script>

<style lang='scss' scoped>
.role-management {
    height: 100%;
    padding: 0px 10px 15px;
}
</style>
