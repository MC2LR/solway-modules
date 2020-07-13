<template>
    <div class="section section-j" v-loading="pvMonitorGetRunBaseList.loading">
        <el-carousel v-if="list.length" :interval="4000" height="100%">
            <el-carousel-item v-for="(item, index) in list" :key="index">
                <img :src="item" alt="实景图">
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
import { Carousel, CarouselItem } from 'element-ui'
import { api＿pvMonitorGetRunBaseList } from '@comprehensiveEnergy/request/api'

export default {
    components: {
        ElCarousel: Carousel,
        ElCarouselItem: CarouselItem
    },
    data () {
        return {
            list: [],
            pvMonitorGetRunBaseList: api＿pvMonitorGetRunBaseList({
                later: true,
                res: {
                    body: {
                        resultList: {}
                    }
                }
            }).subscribe(res => this.getDataCallback(res))
        }
    },
    created () {
        this.$bus.on('stationChange', this.stationChange)
    },
    mounted () {
        this.pvMonitorGetRunBaseList.getData()
    },
    methods: {
        getDataCallback (res) {
            if (!res.body) {
                this.list = []
                return
            }
            const {filePath, scenepictures} = res.body.resultList
            if (!scenepictures) {
                this.list = []
            } else {
                this.list = scenepictures.split(',').map(v => '/' + filePath + v)
            }
        },
        stationChange () {
            this.pvMonitorGetRunBaseList.getData()
        }
    },
    beforeDestroy () {
        this.$bus.off('stationChange', this.stationChange)
    }
}
</script>

<style lang="scss">
.section-j {
    .el-carousel {

        .el-carousel__arrow {
            width: 25px;
            height: 40px;
            border-radius: 0;
            background: rgba(0, 0, 0, .25);
            &:hover {
                background: rgba(0, 0, 0, .35);
            }
        }
        .el-carousel__indicators {
            width: 100%;
            text-align: center;
            .el-carousel__button {
                width: 8px;
                height: 8px;
                border-radius: 50%;
            }
            .el-carousel__indicator.is-active button {
                @include c(background-color, $text_c1);
            }
        }
    }
}
</style>

<style lang="scss" scoped>
.section-j {
    height: 100%;
    .el-carousel {
        height: 100%;
        img {
            width: 100%;
            height: 100%;
        }
        .el-carousel__indicators {
            width: 100%;
        }
    }
}
</style>
