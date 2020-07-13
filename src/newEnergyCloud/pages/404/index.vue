<template>
    <div class="container">
        <aside-menu theme="darkBlue" :fullpage="true" v-if="$route.name === '404'"></aside-menu>
        <span> 页面不存在或角色权限受限，请联系管理员或</span>
        <br>
        <span @click="goBack" class="goback">返回</span>上一页
        <br>
        <router-link class="goback" :to="{name: 'home'}">返回</router-link>首页
    </div>
</template>

<script>
import AsideMenu from '@/components/AsideMenu'
export default {
    components: {
        AsideMenu
    },
    methods: {
        goBack () {
            window.history.length > 1
                ? this.$router.go(-1)
                : this.$router.push('/')
        }
    }
}
</script>

<style lang="scss" scoped>
.container {
    @include c(background-color, $bg_c1);
    height: 100vh;
    padding: 100px 300px;
    line-height: 2em;
    @include c(color, #fff);

    .goback {
        @include c(color, $text_c1);
        cursor: pointer;
    }
}
</style>
