<template>
    <div class="chart-view">
        <div class="header clearfix">
            <el-button type="text"><i @click="saveImg" title="下载图片" class="iconfont icon-xiazaitupian"></i></el-button>
            <el-button type="text"><i @click="saveCsv" title="下载数据" class="iconfont icon-xiazaishuju"></i></el-button>
            <el-button type="text"><i @click="clearChart" title="清空条件与画布" class="iconfont icon-qingkong-"></i></el-button>
            <el-button @click="saveTpl" size="mini" type="primary">保存模板</el-button>
            <el-input v-model="tplName" size="mini" type="text" placeholder="请输入模板名称"></el-input>
        </div>
        <div class="chart-box" v-loading="chartLoading">
            <component ref="chart" :is="chartTpl" v-if="!chartLoading && (typeof chartType === 'number')"></component>
            <div class="tips" v-else>
                <span>Tips：点击图表中 --&gt; 这个位置 &lt;-- 可修改颜色等参数</span>
                <br>
                <span>拖拽到区域时，请在看到有蓝色背景时再松手结束拖拽</span>
                <br>
                <span>X轴为时间时，可选择电站或设备分组</span>
                <br>
                <span>分组查询可选择两个维度（时间+电站 / 时间+设备）</span>
                <br>
                <span>原始数据查询不能以电站为条件筛选，必须精确到设备筛选</span>
                <br>
                <span>原始数据查询(设备、时间)筛选必填, 且设备数量不能大于10，时间不能大于7天</span>
                <br>
                <span>还没有查询到图表...</span>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import {moduleName} from '../store'
import {api＿analysisTplUpdate} from '@/request/api'
import {dataUrlToFile, downloadBlob, jsonToCsv} from '@comm/tools'
export default {
    components: {
        LineBarChart: () => import('./lineBar'),
        LineBarChart2: () => import('./lineBar2'),
        ScatterChart: () => import('./scatter'),
        ScatterChart2: () => import('./scatter2')
    },
    data () {
        return {
            tplName: '',
            analysisTplUpdate: api＿analysisTplUpdate({ later: true })
        }
    },
    computed: {
        ...mapState(moduleName, [
            'changed',
            'dataType',
            'dataSource',
            'filtersResult',
            'filters',
            'xAxis',
            'yAxis',
            'group',
            'chartType',
            'chartLoading',
            'lineBarChartConfig',
            'scatterChartConfig',
            'version'
        ]),
        chartTpl () {
            return typeof this.chartType === 'number' ? ['LineBarChart', 'ScatterChart', 'ScatterChart2', 'LineBarChart2'][this.chartType] : null
        }
    },
    methods: {
        ...mapActions(moduleName, [
            'clearChart'
        ]),
        saveTpl () {
            if (this.changed) return this.$message('请先查询后保存模板')
            const {dataType, dataSource, filtersResult, filters, xAxis, yAxis, group, lineBarChartConfig, scatterChartConfig, version} = this
            const tplJson = {dataType, dataSource, filtersResult, filters, xAxis, yAxis, group, lineBarChartConfig, scatterChartConfig, version}
            const jsonStr = JSON.stringify(tplJson)
            if (!this.tplName) return this.$message('请填写模板名称')
            let dataUrl
            let imgWidth = 500
            do {
                dataUrl = this.$refs.chart?.$refs?.chart?.echarts?.getDataURL({excludeComponents: ['legend', 'xAxis', 'yAxis', 'dataZoom', 'zoom'], pixelRatio: imgWidth / Math.max(this.$el.clientWidth, this.$el.clientHeight)})
                imgWidth -= 100
            } while (dataUrl.length > 60000)
            this.analysisTplUpdate.getData({
                name: this.tplName,
                description: '',
                img: dataUrl,
                content: jsonStr
            }).then(res => {
                if (res.code !== 200) return this.$message(res.msg || '保存失败')
                this.$message('保存成功')
                this.tplName = ''
                this.$bus.emit('updateTplList')
            })
        },
        saveImg () {
            if (!this.$refs.chart) return
            const base64Str = this.$refs.chart?.$refs?.chart?.echarts?.getDataURL({backgroundColor: '#fff'})
            if (!base64Str) return this.$message('没有可保存的图片，请先查询')
            const blob = dataUrlToFile(base64Str, '专家分析-' + new Date().Format('yyyy-MM-dd hh:mm:ss'))
            return downloadBlob(blob)
        },
        saveCsv () {
            if (!this.$refs.chart) return
            const {columns, rows} = this.$refs.chart?.chartData
            const result = []
            if (Array.isArray(rows)) {
                result.push(columns.reduce((a, b) => {
                    a[b] = b
                    return a
                }, {}), ...rows)
            } else if (Object.keys(rows).length === 1) {
                result.push(columns.reduce((a, b) => {
                    a[b] = b
                    return a
                }, {}), ...rows[Object.keys(rows)[0]])
            } else if (Object.keys(rows).length > 1) {
                const header = {}
                const title = {}
                const body = []
                for (const key in rows) {
                    const lines = rows[key]
                    header[key + '1'] = key
                    header[key + '2'] = ''
                    header[key + '3'] = ''
                    header[key + '4'] = ''
                    title[key + '1'] = columns[0]
                    title[key + '2'] = columns[1]
                    title[key + '3'] = columns[2]
                    title[key + '4'] = ''
                    lines.forEach((line, i) => {
                        if (!body[i]) body[i] = {}
                        columns.forEach((k, xi) => (body[i][key + (xi + 1) + ''] = line[k]))
                        body[i][key + '4'] = ''
                    })
                }
                result.push(header)
                result.push(title)
                result.push(...body)
            }
            const blob = jsonToCsv(result)
            return downloadBlob(blob, '专家分析-' + new Date().Format('yyyy-MM-dd hh:mm:ss') + '.csv')
        }
    }
}
</script>

<style lang="scss">
.chart-view {
    .header {
        .el-input {
            input {
                border-left: none;
                border-right: none;
                border-top: none;
                border-radius: 0;
            }
        }
    }
}
</style>

<style lang="scss" scoped>
.chart-view {
    .header {
        padding: 10px;

        .el-button.el-button--text {
            float: left;
            margin-right: 20px;
            padding: 0;

            i.iconfont {
                font-size: 25px;
                line-height: 28px;
            }
        }

        .el-button.el-button--primary {
            float: right;
        }

        .el-input {
            float: right;
            width: 200px;
            margin-right: 15px;
        }
    }

    .chart-box {
        height: calc(100% - 50px);
        -webkit-user-select: none;

        .tips {
            text-align: center;
            line-height: 2.5em;
            font-size: 20px;
            color: #ccc;
        }
    }
}
</style>
