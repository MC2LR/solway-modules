<template>
    <div class="tenglong-home">
        <aside-menu theme="dark" :fullpage="true"></aside-menu>
        <page-header></page-header>
        <top-box></top-box>
        <center-map></center-map>
        <left-box></left-box>
        <right-box></right-box>
    </div>
</template>

<script>
import AsideMenu from '@/components/AsideMenu'
import PageHeader from './modules/header'
import TopBox from './modules/top'
import CenterMap from './modules/centerMap'
import LeftBox from './modules/left'
import RightBox from './modules/right'
import {api＿changeLocaleUnit} from '@/request/henanApi'
export default {
    components: {
        AsideMenu,
        PageHeader,
        TopBox,
        CenterMap,
        LeftBox,
        RightBox
    },
    data () {
        return {
            changeLocaleUnit: api＿changeLocaleUnit({
                data: {
                    locale: (process.env.isHenan === 'true') ? 'zh_HENAN' : 'zh_CN'
                    // locale: 'zh_HENAN'
                }
            })
        }
    },
    created () {
        this.$store.dispatch('userActionRecord/setState', {key: this.$route.name + '_selectedStid', value: ''})
    },
    computed: {
        stid () {
            return this.$store.state.userActionRecord[this.$route.name + '_selectedStid']
        }
    }
}
</script>

<style lang="scss" scoped>
.tenglong-home {
    width: 100%;
    height: 100vh;
    background-color: #0E152D;
    color: #fff;
    user-select: none;
}
</style>
