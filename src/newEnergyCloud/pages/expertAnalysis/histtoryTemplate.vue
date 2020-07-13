<template>
    <div class="history-template">
        <div @click="scroll(-125)" class="headle-top" :class="{disabeld: disableTop}">
            <i class="iconfont icon-fanye-copy-copy"></i>
        </div>
        <div @scroll="onScroll" ref="scroll" class="scroll">
            <div class="block" v-for="item in 20" :key="item">
                <div @click="review(analysisTplList.res.data[item - 1].content)" v-if="$oc(analysisTplList, 'res', 'data', item - 1)">
                    <h4>{{analysisTplList.res.data[item - 1].name}}</h4>
                    <img v-if="analysisTplList.res.data[item - 1].img" :src="analysisTplList.res.data[item - 1].img" alt="模板展示图">
                    <div @click.stop="deleteTpl(analysisTplList.res.data[item - 1].id)" class="delete">删除</div>
                </div>
                <div v-else @click="clearChart"></div>
            </div>
        </div>
        <div @click="scroll(125)" class="headle-bottom" :class="{disabeld: disableBottom}">
            <i class="iconfont icon-fanye-copy"></i>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import {moduleName} from './store'
import {getComputedStyle} from '@comm/tools'
import {api＿analysisTplList, api＿analysisTplDelete} from '@/request/api'
export default {
    data () {
        return {
            disableTop: true,
            disableBottom: false,
            analysisTplList: api＿analysisTplList({
                res: {data: []}
            }),
            analysisTplDelete: api＿analysisTplDelete({ later: true })
        }
    },
    created () {
        this.$bus.on('updateTplList', this.getList)
        this.analysisTplList.subscribe(res => {
            if (this.analysisTplList.resNumber === 1 && res?.data?.[0]) {
                if (this.filters.length === 0 && this.group.length === 0 && this.xAxis.length === 0 && this.yAxis.length === 0) {
                    this.review(res.data[0].content)
                }
            }
        })
    },
    methods: {
        ...mapActions(moduleName, [
            'tplDataReview',
            'queryData',
            'filters',
            'group',
            'xAxis',
            'yAxis',
            'clearChart'
        ]),
        scroll (value) {
            this.$refs.scroll.scrollTop += value
        },
        onScroll () {
            const scrollView = this.$refs.scroll
            this.disableTop = scrollView.scrollTop === 0
            const scrollViewHeight = parseInt(getComputedStyle(scrollView, 'height'))
            this.disableBottom = scrollView.scrollHeight <= (scrollView.scrollTop + scrollViewHeight + 1)
        },
        getList () {
            this.analysisTplList.getData()
        },
        review (jsonStr) {
            try {
                this.tplDataReview(JSON.parse(jsonStr.trim()))
                this.queryData()
            } catch (error) {
                this.$message('模板回写失败：请重试。')
                console.log(jsonStr, error)
            }
        },
        deleteTpl (id) {
            this.$MessageBox.confirm('此操作将永久删除该模板, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.analysisTplDelete.getData({id}).then(res => {
                    if (res.code === 200) {
                        this.$message({ type: 'success', message: '删除成功!' })
                    } else {
                        this.$message({ type: 'success', message: res.msg })
                    }
                    this.analysisTplList.getData()
                })
            }).catch(() => {
                this.$message({ type: 'info', message: '已取消删除' })
            })
        }
    },
    beforeDestroy () {
        this.$bus.off('updateTplList', this.getList)
    }
}
</script>

<style lang="scss" scoped>
@import './theme/theme.scss';
.history-template {
    overflow: hidden;

    .headle-top, .headle-bottom {
        height: 29px;
        line-height: 29px;
        border-radius: 4px;
        // background-color: #fff;
        @include page_c(background-color, $bgColor);
        text-align: center;
        @include c(color, $text_c1);
        cursor: pointer;

        &.disabeld {
            cursor: no-drop;
            color: inherit;
        }
    }

    .scroll {
        height: calc(100% - 58px - 20px);
        margin: 10px auto;
        overflow: auto;

        .block {
            width: 100%;
            height: 115px;
            margin-bottom: 10px;
            border-radius: 4px;
            // background-color: #fff;
            @include page_c(background-color, $bgColor);
            padding: 5px;

            &:last-child {
                margin-bottom: 0;
            }

            > div {
                position: relative;
                width: 100%;
                height: 100%;
                cursor: pointer;

                &:empty {
                    @include page_c(background-color, transparent #eee transparent);
                    // background-color: #eee;
                    // cursor: auto;
                }

                h4 {
                    position: relative;
                    z-index: 2;
                    // background-color: rgba(#fff, .5);
                    @include page_c(background-color, rgba(#18305B, .5) rgba(#fff, .5) rgba(#18305B, .5));
                }

                img {
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    max-width: 100%;
                    max-height: 100%;
                }

                .delete {
                    position: absolute;
                    z-index: 2;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    background-color: rgba(0,0,0,.5);
                    color: #fff;
                    text-align: center;
                    line-height: 1.5;
                    overflow: hidden;
                    height: 0;
                    transition: height .4s ease;
                }

                &:hover {
                    .delete {
                        height: 1.5em;
                    }
                }
            }
        }
    }

}
</style>
