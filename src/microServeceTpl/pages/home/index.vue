<template>
    <div class="home">
        <aside-menu theme="darkBlue" :fullpage="true"></aside-menu>
        <div>模块首页</div>
    </div>
</template>

<script>
import AsideMenu from '@/components/AsideMenu'
export default {
    components: {
        AsideMenu
    }
}
</script>

<style>
.home {
    color: #fff;
}
</style>
