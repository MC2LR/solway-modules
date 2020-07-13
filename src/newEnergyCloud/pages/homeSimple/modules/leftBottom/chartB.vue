<template>
    <div class="wrap">
        <div class="type">光伏月发电量</div>
        <ve-histogram
            ref="myChart"
            :data="chartData"
            :after-config="afterConfig"
            height='100%'
            v-loading='comLineGetStAComRkLine.loading'
        ></ve-histogram>
    </div>
</template>

<script>
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/component/dataZoom'
import { api＿comLineGetStAComRkLine } from '@newEnergyCloud/request/api'
export default {
    data () {
        return {
            comLineGetStAComRkLine: api＿comLineGetStAComRkLine({
                later: true
            }),
            imgDataUrl0: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAABPCAYAAAA0jp8mAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQwIDc5LjE2MDQ1MSwgMjAxNy8wNS8wNi0wMTowODoyMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RTY3Qjc1REUxQUE4MTFFQTlEOTU5QzMyQTAzRjgwRDciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RTY3Qjc1REYxQUE4MTFFQTlEOTU5QzMyQTAzRjgwRDciPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpFNjdCNzVEQzFBQTgxMUVBOUQ5NTlDMzJBMDNGODBENyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpFNjdCNzVERDFBQTgxMUVBOUQ5NTlDMzJBMDNGODBENyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PpaC5TAAAALASURBVHjazFjPa9RAFH4zmWS3ravWrT+KqAd7ES9ePHgQPAj+GYJ/gGdvFsF/QPAgePLUixfRo4gXC0U8VQQprEIrFdGu6NbdTfKeX5ZUdtdkJ8x00YGPTSbzvbwf875koy62hAqGAm4At4BHwD3g+/giXUA8D7wEHgJLwB2gBdwGDpeRZ4C7wBvg8pjBeWA5N7Kcn5PK3b4G3AfOUrXRToSu60Yc38TJ46rEVGizy/QU5AVzMO5+nkv6K+2ofrIbBJdw/VAhiShmpjX8vsNpks0ZQALhX83e7kaq1Md2NHu0G+grmD+Sk0iYNrH6FQ6/DRs0+e8g8ECk3+x1tmBkZSeabexqfZWFNmDg7d4aW6kyI+lCr9OeidMHIK4XEbM5k1/gkvxICXGELBPIpcNG5kkGTIU7WN1mV7I1NteYxRazK7lSzFa3ySFhf8hpWQf+s2x7bRLvxrAmrPjOyk4mx5YcuM2OMduyLZW66n/LtkUkfHYY+chQJbfFsc5KPFpSvEpVqZ/LlET5qOfE3WchK/FxW1fJNrlqGE8zYW7qKeUeVSArDxlCoWRaLekvQzYBdEsYombb3mbflmQf0ZeSOrNvqVzdtqunTQzYsVTis8OUe8xS4T1sao9Yq3q6vumTz0sc78uzav8TJhW2p+1pMZW/Rn51Ln0KxiqYI61O4DAccn8Yf9+ZlTK9wBxnpRtojFm0RmbgBxa1xz0c2WF9bebjQB8DSY+5fgBG6rmBzkjCEqWjfmAWRamZglj3jgMYaGaGMPE1m9e7YWR6JjwDYr0ktnFEMLII9MxOWGvVU/5pJL1gRJoVsp25/qym6f0g5m6gvyDxz0OW0zVOzxnhos8djESsQlxehIri4YQNLsZafYi12TZMSzVOTu197sDY0oqegLRdlO3h0U00rSfafIqFIi30Glq0FhbI2W8BBgAYIZydqHAxKwAAAABJRU5ErkJggg==',

            imgDataUrl1: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAABPCAYAAAA0jp8mAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQwIDc5LjE2MDQ1MSwgMjAxNy8wNS8wNi0wMTowODoyMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RTY3REU3QUQxQUE4MTFFQTlEOTU5QzMyQTAzRjgwRDciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RTY3REU3QUUxQUE4MTFFQTlEOTU5QzMyQTAzRjgwRDciPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpFNjdERTdBQjFBQTgxMUVBOUQ5NTlDMzJBMDNGODBENyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpFNjdERTdBQzFBQTgxMUVBOUQ5NTlDMzJBMDNGODBENyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PtwOIhIAAAI6SURBVHja1JjLLgRBFIarGcQlcb9F2GAh8QATCQt7s7Emlp7AMyA2dgRbD9CxtjV2NkLcCYkVGeIyoev4a9REGT1VrUotVPJ1Op3+q06dOnU7ARGxHyWbqcZzDkyBZbDB0mG+9LfghzibGcNzBQwpX6/BPFhXK/kSZzNteC6CGfGdxZcbsADWUMlrQDsT4sdpsATaWLJyBSZTsk+zoCqh8BDsglYhvgCboA+MgJoyomfROXAMCn1NyZdHsA9OQTcYB7WK8ATsgCe1tqK46PIXcAYuQTsYBXvgPMYSSilCtUTgFqyCjnKdL4q5xkGkE2t/0JWUbJV8tEwmMdf0WWcVOfeZLM0mk5i59JlMZpuK1mwuw/G33naKMDJFGCVpmbtEmPVQ2U5JY5DwJFOS24antylJrkFiDE/rieE8n7mPIAlM4kgjrvC19CZaw4zhGVmYnWhicFsxuZhdmcRs5hIkkY81jFzXMGYr5i7j7G0ZIpdlyNiycaMzOYx7m5Lka5fk/zPCmMnbtmfPvzlve+uz36EiF7O5y5S09rau9sj7CZD5GCrnA41xnONKk7zBig3+PWnL4ubeJS/f9aAZ5MBDaUNqhIljU6tMOgQlzmqUFd3JC/o3cZ1srTrGw6Rs9O0yd3BfNFuY11tmWOK8XSsbyX8mWbIZIR6W5qmlE7SUfBPpgJClwxs1QyOsGJA0xIjfwHYh3ZEOebnckBAOgh7QL8VHYAuinD6x9FlBIMd4tJA/SYcHcYHwIcAAQDI8KNjbpsUAAAAASUVORK5CYII=',
            chartData: {
                columns: ['时间', '本期电量(度)', '同期电量(度)', '完成率(%)'],
                rows: []
            },
            options: {
                // dataZoom: [
                //     {
                //         type: 'slider',
                //         start: 0,
                //         end: 50,
                //         show: true,
                //         handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                //         handleSize: '110%',
                //         height: 10,
                //         bottom: 10,
                //         borderColor: 'rgba(0, 0, 0, .6)',
                //         fillerColor: '#269cdb',
                //         borderRadius: 5,
                //         backgroundColor: 'rgba(51, 56, 75, .4)', // 两边未选中的滑动条区域的颜色
                //         showDataShadow: false,
                //         showDetail: false
                //     }
                // ],
                color: ['rgba(66, 223, 255, 1)', 'rgba(254, 198, 88, 1)'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'line'
                    },
                    formatter: function (params) {
                        params = params.filter(v => {
                            return v.seriesName === '本期电量(度)' || v.seriesName === '同期电量(度)' || v.seriesName === '完成率(%)'
                        })
                        var str = params[0].name + '<br>'
                        params.forEach(v => {
                            str += v.seriesName + ': ' + (v.value || '-') + '<br>'
                        })
                        return str
                    }
                },
                legend: {
                    data: ['本期电量(度)', '同期电量(度)', '完成率(%)'],
                    textStyle: {
                        fontSize: 12,
                        color: '#fff'
                    },
                    icon: 'rect',
                    itemWidth: 20,
                    itemHeight: 4,
                    itemGap: 30,
                    top: 10,
                    right: 16
                },
                xAxis: {
                    show: true,
                    type: 'category',
                    axisLabel: {
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: 'rgba(39, 79, 133, 1)',
                            width: 1
                        }
                    }
                },
                yAxis: [
                    {
                        show: true,
                        type: 'value',
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: 'rgba(39, 79, 133, 1)',
                                width: 1
                            }
                        },
                        splitLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            textStyle: {
                                color: '#fff'
                            }
                        }
                    },
                    {
                        show: true,
                        type: 'value',
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: 'rgba(39, 79, 133, 1)',
                                width: 1
                            }
                        },
                        splitLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            textStyle: {
                                color: '#fff'
                            }
                        }
                    }
                ],
                series: [
                    {
                        name: '本期电量(度)',
                        type: 'bar',
                        barWidth: 6.5,
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                        { offset: 0, color: 'rgba(66, 223, 255, 1)' },
                                        { offset: 0.5, color: 'rgba(66, 223, 255, .5)' },
                                        { offset: 1, color: 'rgba(66, 223, 255, .1)' }
                                    ]
                                ),
                                barBorderRadius: [0, 0, 0, 0]
                            }
                        },
                        data: []
                    },
                    {
                        name: 'a',
                        tooltip: {
                            show: true
                        },
                        type: 'bar',
                        barWidth: 6.5,
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                       { offset: 0, color: 'rgba(66, 223, 255, .3)' },
                                       { offset: 0.5, color: 'rgba(66, 223, 255, .5)' },
                                       { offset: 1, color: 'rgba(66, 223, 255, .3)' }
                                    ]
                                ),
                                barBorderRadius: [0, 0, 0, 0]
                            }
                        },
                        data: [],
                        barGap: 0,
                        legendHoverLink: false
                    },
                    {
                        name: 'b',
                        tooltip: {
                            show: true
                        },
                        type: 'pictorialBar',
                        itemStyle: {
                            normal: {
                                color: '#73bbff'
                            }
                        },
                        symbol: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMCAYAAABiDJ37AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQwIDc5LjE2MDQ1MSwgMjAxNy8wNS8wNi0wMTowODoyMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RjJBMDI3MUMyOUZGMTFFQUJCMDFDMUUyOUExQzgwMzciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RjJBMDI3MUQyOUZGMTFFQUJCMDFDMUUyOUExQzgwMzciPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGMjdFOEE3NTI5RkYxMUVBQkIwMUMxRTI5QTFDODAzNyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGMjdFOEE3NjI5RkYxMUVBQkIwMUMxRTI5QTFDODAzNyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PuFAwbcAAAD9SURBVHjapNOxasJQFMbxRFz1BdpBsLi1VNo8gpODVEoXh4IIdRBdOnXq5qqgBZ/AQRSXIhSco0OlIupS0cGxe0VB/V84BZGYhPTAb8nlfvdyzo1uzHeaizrHFTqw3eBzCPKjgAne8YkEdC+Bt+ihhIB8i6KNAe6sgq0Cgyijj5sTh12jhS8kD4OPA+8xRd5FOzTpaxND2evzy0IIFcQ1b3WJBj7ULdIY/yNM1RZveFA3rEvfnnHmIWyEJ5h/PfyVSV4gh6XLILXvRQZnWg1lhSrCyGJhE9aVgRSxcXo2a9QQQQazg7UfPCKGb6uTdBe/nupzCgZeJfRk7QUYAOsvL6LvHWAyAAAAAElFTkSuQmCC',
                        symbolRotate: 0,
                        symbolSize: ['14', '10'],
                        symbolOffset: ['-6.5', '-6'],
                        symbolPosition: 'end',
                        data: [],
                        z: 5
                    },
                    {
                        name: 'b',
                        tooltip: {
                            show: true
                        },
                        type: 'pictorialBar',
                        itemStyle: {
                            normal: {
                                color: '#73bbff'
                            }
                        },
                        symbol: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAYAAACpUE5eAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQwIDc5LjE2MDQ1MSwgMjAxNy8wNS8wNi0wMTowODoyMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OEJBMjdGRDIyQTA1MTFFQUJCMDFDMUUyOUExQzgwMzciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OEJCRDM4Q0MyQTA1MTFFQUJCMDFDMUUyOUExQzgwMzciPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4QkEyN0ZEMDJBMDUxMUVBQkIwMUMxRTI5QTFDODAzNyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4QkEyN0ZEMTJBMDUxMUVBQkIwMUMxRTI5QTFDODAzNyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PuZs1goAAADeSURBVHjapNPZCoJAFMZxNcuCFlpoX26CnqD3f49upKyIKKONNsr+A0eICKfswO/G0W/0zNEcuoGhqTQ6OGKBR9TNdsSaibqwkEcJHra/BmbRk7d7LQd9bDDFVReYQBsVTRuKKGCOJYJPgUXpVdL4rizZvIwJDmFgCl3ZMU5lMMAKMxXY+iPstVSbrirQhS+f68QMO2GsRivsoRqDPRqoych8U4/3g7HfFmdYS09zmrCdHMZFN4dnjGSI2x9O/SYz6P/6p/jSiiaqcm0lYfc4v54hD3rSBiuctah6CjAAXrUxOIx6E/8AAAAASUVORK5CYII=',
                        symbolRotate: 0,
                        symbolSize: ['14', '10'],
                        symbolOffset: ['-6.5', '2'],
                        symbolPosition: 'start',
                        data: [],
                        z: 5
                    },

                    // {
                    //     name: 'e',
                    //     type: 'bar',
                    //     barWidth: 8,
                    //     itemStyle: {
                    //         normal: {
                    //             color: new echarts.graphic.LinearGradient(
                    //                 0, 0, 0, 1,
                    //                 [
                    //                     { offset: 0, color: 'rgba(66, 223, 255, 0)' },
                    //                     { offset: 0.5, color: 'rgba(66, 223, 255, 0)' },
                    //                     { offset: 1, color: 'rgba(66, 223, 255, 0)' }
                    //                 ]
                    //             ),
                    //             barBorderRadius: [0, 0, 0, 0]
                    //         }
                    //     },
                    //     data: []
                    // },

                    {
                        // yAxisIndex: 1,
                        name: '同期电量(度)',
                        type: 'bar',
                        barWidth: 6.5,
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                        { offset: 0, color: 'rgba(254, 198, 88, 1)' },
                                        { offset: 0.5, color: 'rgba(254, 198, 88, .5)' },
                                        { offset: 1, color: 'rgba(254, 198, 88, .1)' }
                                    ]
                                ),
                                barBorderRadius: [0, 0, 0, 0]
                            }
                        },
                        data: []
                    },
                    {
                        // yAxisIndex: 1,
                        name: 'c',
                        tooltip: {
                            show: true
                        },
                        type: 'bar',
                        barWidth: 6.5,
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                       { offset: 0, color: 'rgba(254, 198, 88, .3)' },
                                       { offset: 0.5, color: 'rgba(254, 198, 88, .5)' },
                                       { offset: 1, color: 'rgba(254, 198, 88, .3)' }
                                    ]
                                ),
                                barBorderRadius: [0, 0, 0, 0]
                            }
                        },
                        data: [],
                        barGap: 0,
                        legendHoverLink: false
                    },
                    {
                        // yAxisIndex: 1,
                        name: 'd',
                        tooltip: {
                            show: true
                        },
                        type: 'pictorialBar',
                        itemStyle: {
                            normal: {
                                color: '#73bbff'
                            }
                        },
                        symbol: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMCAYAAABiDJ37AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQwIDc5LjE2MDQ1MSwgMjAxNy8wNS8wNi0wMTowODoyMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RjJBMDI3MjQyOUZGMTFFQUJCMDFDMUUyOUExQzgwMzciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RjJBMDI3MjUyOUZGMTFFQUJCMDFDMUUyOUExQzgwMzciPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGMkEwMjcyMjI5RkYxMUVBQkIwMUMxRTI5QTFDODAzNyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGMkEwMjcyMzI5RkYxMUVBQkIwMUMxRTI5QTFDODAzNyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PjnHfHkAAAEFSURBVHjaYvz//z8DHJzwY8ABRIHYBog3AvE/XIoYLDYxMDHgB4xAnAzE14F4HRBfBeIoIMapD5+B2kB8EIjnALEwVEwDiJcC8TUgjgFiZmIM5ATiViA+B8S2OCxTB+LFUBfHAjEL3EtoYegOJKcCsTIDaeA2ELcA8TKIgSf8JIGcPiCOYKAMnGQCGhYEDRNKDQMFgS8oDLcAcRkQ3yfToLtA7ArEccBk8xoRhif8WKExVwXEKkQY9BuIe4C4GYi/Y6ZDi00gBfOBWBMaczfxGHYciI2hln8nlGz+APESINaCJuKrSHKfgDgXmmsuk5qwQVlsORDrAXEoEM+GWjIFX/YDCDAA0NhAafAEfRoAAAAASUVORK5CYII=',
                        symbolRotate: 0,
                        symbolSize: ['14', '10'],
                        symbolOffset: ['6.5', '-6'],
                        symbolPosition: 'end',
                        data: [],
                        z: 5
                    },
                    {
                        // yAxisIndex: 1,
                        name: 'd',
                        tooltip: {
                            show: true
                        },
                        type: 'pictorialBar',
                        itemStyle: {
                            normal: {
                                color: '#73bbff'
                            }
                        },
                        symbol: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAYAAACpUE5eAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQwIDc5LjE2MDQ1MSwgMjAxNy8wNS8wNi0wMTowODoyMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OEJCRDM4RDMyQTA1MTFFQUJCMDFDMUUyOUExQzgwMzciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OEJCRDM4RDQyQTA1MTFFQUJCMDFDMUUyOUExQzgwMzciPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4QkJEMzhEMTJBMDUxMUVBQkIwMUMxRTI5QTFDODAzNyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4QkJEMzhEMjJBMDUxMUVBQkIwMUMxRTI5QTFDODAzNyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pqzu+EcAAAD4SURBVHjarJPNCoJQEIVV1KJF5qIfi1oEQdQL9BL1sL1EPUGrNmVFQWVoC0nSzpW5IHLVsAa+zf0ZzsyZkaPVXCoIHfTBC5zAOz6dLYWP1ZxEMmiCHlDozAQ2cLI+KRnnNTAmZck3GhiCkbReVIQqUiWzz13QIoV5EYILOKP8UKTQAFPQ/iIZ/2uBCdTWkwo1Ks2UfgvWV5uZ0vlDMm5YoJJrDzAA1ZLJfLBHLz0+Nh7YUP+sHPfTEcWmJIxRBZd3UmsUJHuCHRL5RYPNNmILGmSWnrpnm3IAV9G25G0K66tLLeCj5FDPgzKrx4f3CG6k1C1q6keAAQC+izpnnOHAjgAAAABJRU5ErkJggg==',
                        symbolRotate: 0,
                        symbolSize: ['14', '10'],
                        symbolOffset: ['6.5', '2'],
                        symbolPosition: 'start',
                        data: [],
                        z: 5
                    },

                    {
                        yAxisIndex: 1,
                        name: '完成率(%)',
                        type: 'line',
                        symbol: 'none',
                        data: []
                    }
                ],
                grid: {
                    top: '20%',
                    bottom: '5%',
                    left: '5%',
                    right: '3%'
                }
            }
        }
    },
    created () {
        // 定时resize，看看能不能解决大屏不显示的问题
        this.timer = setTimeout(() => this.$refs.myChart.echartsResize(), 20 * 1000)
        this.comLineGetStAComRkLine.getData({
                date: new Date().Format('yyyy-MM-dd')
            }).then(res => {
                const { data } = res.body
                let arr1 = []
                let arr2 = []
                let arr3 = []
                let arr4 = []
                data.dtime.forEach(v => {
                    arr1.push({'时间': v})
                })
                data.real_kwh_chk.forEach(v => {
                    arr2.push({'本期电量(度)': v})
                })
                data.real_kwh_chk_tb.forEach(v => {
                    arr3.push({'同期电量(度)': v})
                })
                data.finish_r.forEach(v => {
                    arr4.push({'完成率(%)': v})
                })
                data.dtime.forEach((v, i) => {
                    this.chartData.rows.push({...arr1[i], ...arr2[i], ...arr3[i], ...arr4[i]})
                })
                // 加了一行 看看能不能解决大屏翻转消失的问题
                // this.$refs.myChart.echartsResize()
            })
    },
    methods: {
        afterConfig (options) {
            if (this.comLineGetStAComRkLine.res.body) {
                const { data } = this.comLineGetStAComRkLine.res.body
                this.options.xAxis.data = data.dtime
                this.options.series[0].data = data.real_kwh_chk
                this.options.series[1].data = data.real_kwh_chk
                this.options.series[2].data = data.real_kwh_chk
                this.options.series[3].data = data.real_kwh_chk

                this.options.series[4].data = data.real_kwh_chk_tb
                this.options.series[5].data = data.real_kwh_chk_tb
                this.options.series[6].data = data.real_kwh_chk_tb
                this.options.series[7].data = data.real_kwh_chk_tb

                this.options.series[8].data = data.finish_r
            }

            options = { ...this.options }
            return options

            // options.color = ['#42DFFF', '#FFC74D']
            // options.xAxis[0].axisLabel = {
            //     textStyle: {
            //         color: '#fff'
            //     }
            // }
            // options.xAxis[0].axisLine = {
            //     show: true,
            //     lineStyle: {
            //         color: 'rgba(39, 79, 133, 1)',
            //         width: 1
            //     }
            // }

            // new Array(2).fill(0).forEach((v, i) => {
            //     options.yAxis[i].axisLine = {
            //         show: true,
            //         lineStyle: {
            //             color: 'rgba(39, 79, 133, 1)',
            //             width: 1
            //         }
            //     }
            //     options.yAxis[i].splitLine = {
            //         show: false
            //     }
            //     options.yAxis[i].axisLabel = {
            //         textStyle: {
            //             color: '#fff'
            //         }
            //     }
            // })

            // options.legend = {
            //     data: ['本期电量(度)', '同期电量(度)', '完成率(%)'],
            //     textStyle: {
            //         fontSize: 12,
            //         color: '#fff'
            //     },
            //     icon: 'rect',
            //     itemWidth: 20,
            //     itemHeight: 4,
            //     itemGap: 30,
            //     top: 10,
            //     right: 16
            // }
            // options.grid = {
            //     top: '20%',
            //     bottom: '5%',
            //     left: '5%',
            //     right: '3%'
            // }
            // new Array(2).fill(0).forEach((v, i) => {
            //     options.series[i].type = 'pictorialBar'
            //     options.series[i].barWidth = 16
            //     options.series[i].barGap = '20%'
            //     options.series[i].symbol = this['imgDataUrl' + i]
            // })
            // options.series[2].type = 'line'
            // options.series[2].symbol = 'none'
            // options.series[2].yAxisIndex = 1
        }
    },
    beforeDestroy () {
        clearInterval(this.timer)
    }
}
</script>

<style lang="scss" scoped>
.wrap {
    width: 100%;
    height: 100%;
    position: relative;
    .type {
        color: #fff;
        position: absolute;
        left: 120px;
        top: 14px;
        z-index: 11111;
        font-size: 12px;
    }
}
</style>
