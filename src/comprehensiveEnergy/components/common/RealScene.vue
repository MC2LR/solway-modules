<template>
    <div class="real-scene">
        <el-button @click="visible = true" type="text">
            <i class="iconfont iconditu"></i>
            <span>实景图</span>
        </el-button>
        <el-dialog
            @open="() => pvMonitorGetRunBaseList.getData()"
            :visible.sync="visible"
            :modal-append-to-body="false"
            top="calc((100vh - 500px) / 2)"
            width="800px">

            <span v-if="imgs.length === 0">当前项目还没有上传实景图。</span>

            <el-carousel v-if="imgs.length" :interval="4000" height="400px">
                <el-carousel-item v-for="item in imgs" :key="item">
                    <img :src="item" alt="实景图">
                </el-carousel-item>
            </el-carousel>

        </el-dialog>
    </div>
</template>

<script>
import {Dialog, Button, Carousel, CarouselItem} from 'element-ui'
import { api＿pvMonitorGetRunBaseList } from '@comprehensiveEnergy/request/api'

export default {
    props: {
        options: {
            type: Object
        }
    },
    data () {
        return {
            visible: false,
            pvMonitorGetRunBaseList: api＿pvMonitorGetRunBaseList({
                later: true,
                res: {
                    body: {
                        resultList: {}
                    }
                }
            })
        }
    },
    computed: {
        imgs () {
            const {filePath, scenepictures} = this.pvMonitorGetRunBaseList.res.body.resultList
            if (!scenepictures) return []
            return scenepictures.split(',').map(v => '/' + filePath + v)
        }
    },
    components: {
        ElDialog: Dialog,
        ElButton: Button,
        ElCarousel: Carousel,
        ElCarouselItem: CarouselItem
    }
}
</script>

<style lang="scss" scoped>
.real-scene {
    display: inline-block;

    .el-button {
        line-height: 1;
        padding: 0;
    }

    .iframe {
        width: 100%;
        height: 500px;
    }

    .el-carousel {
        img {
            width: 100%;
            height: 100%;
        }
    }
}
</style>
