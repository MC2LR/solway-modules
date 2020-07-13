<template>
    <div class="index">
        <header>
            <div class="heads">
                <p>
                    <i class="iconfont icondianzhanqiehuan_huaban1fuben14" @click="change"> </i> <span style="font-size:18px;color:#333333;font-weight:bold">马鞍山蒙牛</span>
                </p>
                <p>
                    <span class="names">报警数量:</span>
                    <span class="val">
                        60
                    </span>
                </p>
                <p>
                    <span class="names">
                        报警设备:
                    </span>
                    <span class="val">
                        10
                    </span>
                </p>
            </div>
            <section>
                <div class="timeOption">
                    <p class="timeSelect" @click="selectDate(index)" v-for="(item,index) in dateData" :key="index" :class="{bck:isData === index}">{{item}}</p>
                        <el-date-picker
                        v-if="custom"
                        class="pick"
                        v-model="value1"
                        @change="changDate"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                        </el-date-picker>
                </div>
                <div class="config">
                    <p class="p" @click="conEvent(2)">通知策略配置</p>
                    <p class="p" @click="conEvent(1)">报警规则配置</p>
                    <p class="p" @click="detail">查看报警详情</p>
                </div>
            </section>
        </header>
        <div class="content">
            <div class="pub">
                <machine ref="machines"></machine>
                <div class="line"></div>
            </div>
            <div class="pub">
                <statess ref="statessed"></statess>
            </div>
            <div class="pub">
                <alarm-class ref="alar"></alarm-class>
            </div>
            <div class="pub">
                <times ref="timess"></times>
            </div>
        </div>
        <alarm-config ref="alarms"></alarm-config>
        <alarm-detaile ref="detaile"></alarm-detaile>
        <add-config></add-config>
        <peralarm></peralarm>
        <info-config ref="infos"></info-config>
    </div>
</template>

<script>
import times from './component/times'
import statess from './component/staClass'
import alarmClass from './component/alarmClass'
import machine from './component/machineStatus'
import alarmConfig from './component/compo/alarmConfig'
import alarmDetaile from './component/compo/alarmDetaile'
import addConfig from './component/compo/addAlarmConfig'
import peralarm from './component/compo/perAlarmDetaile'
import infoConfig from './component/compo/infoConfig'
export default {
    name: 'index',
    data () {
        return {
            isData: 0,
            value1: [],

            dateData: ['今日', '最近7天', '最近30天', '最近365天', '自定义'],
            custom: false
        }
    },
    methods: {
        // 显示切换电站pop
        change () {
            // this.$switchStation()
        },
        // 选择时间
        changDate (val) {

        },
        // 配置事件
        conEvent (val) {
            if (val === 1) {
                this.$refs.alarms.open()
            } else {
                this.$refs.infos.opens()
            }
        },
        // 显示详情页面
        detail () {
                this.$refs.detaile.open()
        },
        // 选择时间
        selectDate (index) {
                this.isData = index
                index === 4 ? this.custom = true : this.custom = false
        }

    },
    components: {
        times, statess, alarmClass, machine, alarmConfig, alarmDetaile, addConfig, peralarm, infoConfig
    }
}
</script>

<style lang="scss" scoped>
    .index{
        width: 100%;
        height: 100vh;
        overflow: auto;
        background: #EDEFF9;
        header{
            width: 100%;
            height: 95px;
            overflow: hidden;
            .heads{
                width: 100%;
                height: 45%;
                overflow: hidden;
                display: flex;
                align-items: center;
                p{
                    width: 150px;
                    height: 20px;
                    line-height: 20px;
                    // text-align: center;
                    margin-left: 9px;
                    overflow: hidden;
                    .icondianzhanqiehuan_huaban1fuben14{
                        cursor: pointer;
                    }
                    .names{
                        font-size: 14px;
                        font-family:Microsoft YaHei;
                        font-weight:400;
                        color:rgba(96,99,105,1);
                    }
                    .val{
                        color: #2FBFCC;
                    }
                }
            }
            section{
                width: 99%;
                margin: 0 auto;
                height: 55%;
                overflow: hidden;
                .timeOption{
                    width: 65%;
                    height: 40px;
                    float: left;
                      .pick{
                                width:30%;
                                height: 30px;
                                float: left;
                            }
                            >>> .el-range-separator{
                                height:auto;
                                width: 30px;
                            }
                            >>> .el-date-editor .el-range__icon{
                                line-height: 24px;
                            }

                    .timeSelect{
                        width: 80px;
                        height: 30px;
                        float: left;
                        font-size: 14px;
                        text-align: center;
                        line-height: 30px;
                        background:rgba(255,255,255,1);
                        border-radius:4px;
                        margin-right: 20px;
                        cursor: pointer;
                    }
                    .timeSelect:nth-child(1){
                        width: 60px;
                    }
                    .timeSelect:nth-child(5){
                        width: 60px;
                    }
                    .bck{
                        background: #2FBFCC;
                        color: #D8F3F6;
                    }
                }
                .config{
                    width: 35%;
                    height: 40px;
                    overflow: hidden;
                    float: right;
                    .bck{
                        background: #2FBFCC;
                        color: #D8F3F6;
                    }
                    .p{
                        width: 110px;
                        height: 30px;
                        float: right;
                        background:rgba(255,255,255,1);
                        border-radius:4px;
                        text-align: center;
                        line-height: 30px;
                        font-size:14px;
                        font-family:Microsoft YaHei;
                        font-weight:400;
                        cursor: pointer;
                    }
                    .p:nth-child(2){
                        margin-right: 20px;
                        margin-left: 60px;
                    }
                }
            }
        }
        .content{
            width: 100%;
            height:calc(100vh - 95px);
            overflow: auto;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;

            .pub{
                width: 49%;
                height: 48%;
                overflow: auto;
                background: #FFFFFF;
                position: relative;
                .line{
                    position: absolute;
                    left: 47%;
                    width: 3px;
                    top: 15%;
                    height: 50%;
                    border-right: 1px dotted rgba(234,234,234,1);
                }
            }
        }
    }
</style>
