<template>
    <div class="section section-j station-image" v-loading="getImages.loading">
        <div class="station-name">{{stName}}</div>
        <!-- <image-frame :imgList="list" class="image-frame"></image-frame> -->
        <el-carousel v-show="list.length" :interval="interval" indicator-position="none" arrow="never" height="100%" :loop="false">
            <el-carousel-item v-for="item in list" :key="item">
                <!-- <img :src="item" alt="图片不存在"> -->
                <!-- <span>{{item}}</span> -->
                <div class="bgImg" :style="{backgroundImage: 'url(' + item + ')'}"></div>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
import { Carousel, CarouselItem } from 'element-ui'
import { api＿stationPics } from '@/request/api'
import ImageFrame from './imageFrame'

export default {
    components: {
        ElCarousel: Carousel,
        ElCarouselItem: CarouselItem,
        ImageFrame
    },
    data () {
        return {
            interval: 5000,
            list: [],
            getImages: api＿stationPics({later: true}),
            stName: '',
            stImg: {}
        }
    },
    created () {
        this.$bus.on('changeStationImage', this.getData)
    },
    methods: {
        async getData ({stid, name}) {
            this.stName = name
            const res = this.stImg[stid] || await this.getImages.getData({stids: stid})
            this.stImg[stid] = res
            const path = res.body.path
            this.list = res.body.pics.filter(v => v).map(imgName => '/' + path + imgName)
            await this.$timeout((this.list.length * this.interval) || 5000)
            this.$emit('slideTop', '0')
            this.$bus.emit('changeMapStation')
            await this.$timeout(400)
            this.list = []
        }
    },
    beforeDestroy () {
        this.$bus.off('changeStationImage', this.getData)
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
    position: relative;

    .station-name {
        position: absolute;
        left: 0;
        top: 10px;
        width: 100%;
        text-align: center;
        z-index: 9;
        font-size: 16px;
        color: #fff;
        line-height: 1.5;

        &::before {
            content: '';
            width: 200px;
            height: 1.5em;
            display: inline-block;
            position: absolute;
            top: 0;
            left: 50%;
            margin-left: -100px;
            background:linear-gradient(to right, transparent, #082F61, transparent);
            z-index: -1;
        }
    }

    .image-frame {
        width: 100%;
        height: 100%;
    }

    .el-carousel {
        height: 100%;
        img {
            width: 100%;
            height: 100%;
        }
        .bgImg {
            width: 100%;
            height: 100%;
            background-size: 100% 100%;
        }
        .el-carousel__indicators {
            width: 100%;
        }
    }
}
</style>
