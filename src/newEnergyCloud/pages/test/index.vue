<template>
    <div class="testPage">
        <aside-menu theme="darkBlue" :fullpage="true"></aside-menu>
        <span>请选择测试内容</span>
        <el-select v-model="tplName" filterable placeholder="请选择">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
        </el-select>
        <el-divider></el-divider>
        <component :is="tplName"></component>
    </div>
</template>

<script>
import AsideMenu from '@/components/AsideMenu'
export default {
    data () {
        return {
            tplName: 'videoTest',
            options: [
                { value: 'videoTest', label: '视频直播hls流' },
                { value: 'angularSvg', label: 'angularSvg' }
            ]
        }
    },
    components: {
        AsideMenu,
        videoTest: () => import('./components/video'),
        angularSvg: () => import('./components/angularSvg/')
    }
}
</script>

<style lang="scss" scoped>
.testPage {
    padding: 1em;
}
</style>
