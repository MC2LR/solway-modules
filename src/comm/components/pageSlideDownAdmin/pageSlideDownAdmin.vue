<template>
    <div class="page_slide_down_admin" v-if="ifShow">
       <div class="hover-header-con"></div>
        <div class="systems-page">
            <div style="width: 1000px;margin: 0px auto;position: relative;overflow: hidden;height: 100%;">
                <div class="content" style="overflow: auto;height: 100vh;position: relative;right: -17px;">
                    <h3>系统管理</h3>
                    <div class="clearfix">
                        <div v-for="item in adminPages" v-bind:key="item.id"
                            @click="jumpPage(item.state)"
                            class="item"
                            v-bind:class="{active: currentState === item.state}"
                            >{{item.name}}</div>
                    </div>
                    <h3 v-if="productLibrary">产品库</h3>
                    <div class="clearfix">
                        <div v-for="item in productLibrary" v-bind:key="item.id"
                            @click="jumpPage(item.state)"
                            class="item"
                            v-bind:class="{active: currentState === item.state}"
                            >{{item.name}}</div>
                    </div>
                </div>
            </div>
            <div class="fixed-circle-con">
                <i class="iconcomm commguanbi1" @click="ifShow = false"></i>
            </div>
        </div>
    </div>
</template>

<script>
import {api＿getUiStates} from '@comm/request/api'
export default {
    name: 'pageSlideDownAdmin',
    data () {
        return {
            ifShow: false,
            currentState: '',
            adminPages: [],
            specialRouteArr: ['systemModules'],
            productLibrary: []
        }
    },
    methods: {
        showPage () {
            this.ifShow = true
        },
        jumpPage (page) {
            // if (this.$route.path === '/' + page) {
            //     this.ifShow = false
            //     return
            // }
            if (page.includes(':module')) {
                this.$router.push({name: 'outer_' + page.split(':')[0]})
            } else {
                if (this.specialRouteArr.includes(page)) { // 只针对于某些新旧模块名称一样的情况，特殊处理吧
                    this.$router.push({name: 'outer_' + page + '_old'})
                } else {
                    this.$router.push({name: 'outer_' + page})
                }
            }
        }
    },
    created () {
        this.$bus.on('toSlideDown', this.showPage)
        // api＿getSTClassLIst().subscribe(res => {
        //     let data = res.data
        //     if (data && data.length === 1) {
        //         this.stClass = res.data[0].id
        //     } else if (data && data.length === 2) {
        //         this.switchStClassDisplay = true
        //     }
        // })
        api＿getUiStates().subscribe(res => {
            this.adminPages = res?.body?.[0]?.children && res.body[0].children.map(v => ({state: v.uiState, name: v.name, id: v.id}))
            this.productLibrary = res?.body?.[1]?.children && res.body[1].children.map(v => ({state: v.uiState, name: v.name, id: v.id}))
        })
    }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
