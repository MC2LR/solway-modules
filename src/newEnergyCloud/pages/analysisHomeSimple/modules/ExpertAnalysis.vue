<template>
    <div class="expert-analysis">
        <div class="title"><span class="title-bg">专家分析</span></div>
        <div class="img-con" @click="$router.push({name: 'expertAnalysis'})">
            <img v-if="lastTpl.img" :src="lastTpl.img" alt="专家分析">
            <span>{{ lastTpl.name || '开始分析' }}</span>
            <!-- <span>开始分析</span> -->
        </div>
    </div>
</template>

<script>
import {api＿analysisTplPage} from '@/request/api'
export default {
    data () {
        return {
            analysisTplListPage: api＿analysisTplPage({data: {'page.size': 1, 'page.pn': 1}})
        }
    },
    computed: {
        lastTpl () {
            return this.analysisTplListPage.res?.data?.list?.[0] || {}
        }
    }
}
</script>

<style lang="scss" scoped>
.expert-analysis {
    padding: 10px 10px;
    .title {
        color: #30C6F9;
        font-size: 14px;
        padding-bottom: 12px;
        .title-bg{
            display: inline-block;
            height: 19px;
            line-height: 19px;
            width:206px;
        }
    }
    .img-con {
        height: calc(100% - 26px);
        position: relative;
        cursor: pointer;

        img {
            width: 100%;
            height: 100%;
            max-width: 100%;
            max-height: 100%;
        }

        span {
            position: absolute;
            left: 0;
            right: 0;
            top: 40%;
            text-align: center;
            height: 1.5em;
            color: #fff;
            font-weight: bold;
            font-size: 30px;
            transform: scale(1, 1.5);
        }
    }
}
</style>
