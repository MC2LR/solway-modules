<template>
    <div class="henan-monitoring">
        <aside-menu theme="dark" :fullpage="true"></aside-menu>
        <page-header></page-header>
        <page-top></page-top>
        <page-bottom></page-bottom>
    </div>
</template>

<script>
import pageHeader from './modules/header/index'
import pageTop from './modules/top'
import pageBottom from './modules/bottom/index'
import AsideMenu from '@/components/AsideMenu'

export default {
    components: {
        pageHeader,
        pageTop,
        pageBottom,
        AsideMenu
    }
}
</script>

<style>
.henan-monitoring {
    width: 100%;
    height: 100vh;
    background-color: #0E152D;
    color: #fff;
    user-select: none;
}
</style>
