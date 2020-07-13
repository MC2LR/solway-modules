<template>
    <div class="child-section-switch" ref="switchSection">
        <div class="child-switch-con clearfix" v-loading="getDeviecList.loading">
            <div class="block-con" :style="{marginRight: marginRight[index] + 'px'}" v-for="(item, index) in arr" :key="index">
                <block
                :title='item.name'
                name='温度'
                :value='item.status == -9 || (!item.tmp && item.tmp != 0) ? "-" : item.tmp == 0 ? 0 : parseFloat(item.tmp.toFixed(2))'
                units='℃'
                icon='icongaoyagui-'
                :backgroundColor='bgColor(item.status)'
                :backgroundColorOpacity='bgColorOpacity(item.status)'
                >
                </block>
            </div>
        </div>
    </div>
</template>

<script>
import block from './block'
import { api＿getDeviecList } from '@comprehensiveEnergy/request/api'

export default {
    components: {
        block
    },
    data () {
        return {
            getDeviecList: api＿getDeviecList({
                later: true
            }),
            time: null,
            maxNum: 0,
            marginRight: [],
            arr: []
        }
    },
    computed: {
        bgColor () {
            return function (status) {
                return status === 99 ? 'rgba(93, 182, 108, 1)' : status === 2 ? 'rgba(201, 91, 91, 1)' : status === 3 ? 'rgba(214, 157, 101, 1)' : status === -9 ? 'rgba(179, 179, 179, 1)' : ''
            }
        },
        bgColorOpacity () {
            return function (status) {
                return status === 99 ? 'rgba(93, 182, 108, .2)' : status === 2 ? 'rgba(201, 91, 91, .2)' : status === 3 ? 'rgba(214, 157, 101, .2)' : status === -9 ? 'rgba(179, 179, 179, .2)' : ''
            }
        }
    },
    mounted () {
        window.addEventListener('resize', this.changeMargin)

        this.getStatusData()
        this.time = setInterval(() => {
            this.getStatusData()
        }, this.$store.state.stationMonitoring.dataInterval)
    },
    methods: {
        getStatusData () {
            this.getDeviecList.getData({type: 42}).then(res => {
                this.arr = res.data
                this.changeMargin()
            })
        },
        async changeMargin () {
            await this.$timeout(10)
            this.marginRight = []
            this.$nextTick(() => {
                this.maxNum = parseInt(this.$el.offsetWidth / 156)
                this.setMargin()
                if (this.marginRight[0] <= 10) {
                    this.marginRight = []
                    this.maxNum--
                    this.setMargin()
                }
            })
        },
        setMargin () {
            this.arr.forEach((v, i) => {
                if (this.arr.length < this.maxNum) {
                    if ((i + 1) === this.arr.length) {
                        this.marginRight.push(0)
                    } else {
                        this.marginRight.push(20)
                    }
                } else {
                    if ((i + 1) % this.maxNum === 0 && i !== 0) {
                        this.marginRight.push(0)
                    } else {
                        this.marginRight.push((this.$el.offsetWidth - this.maxNum * 156) / (this.maxNum - 1))
                    }
                }
            })
        }
    },
    beforeDestroy () {
        clearInterval(this.time)
        window.removeEventListener('resize', this.changeMargin)
    }
}
</script>

<style lang="scss" scoped>
.child-section-switch {
    margin-top: 15px;
    height: calc(100% - 187px);
    overflow: auto;
    // display: flex;
    // justify-content: space-between;
    // flex-direction: row;
    // flex-wrap: wrap;
    // align-content: flex-start;
    .block-con {
        width: 156px;
        height: 136px;
        float: left;
        // margin-right: 20px;
        margin-bottom: 30px;
    }
    .seat {
        flex: 1;
        height: 136px;
        // margin-right: 20px;
    }
}
</style>
