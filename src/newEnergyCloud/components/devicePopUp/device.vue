<template>
    <el-dialog class="device-pop-up" :visible.sync="dialogVisible" :fullscreen="fullscreen" top="50px" @close="destroy" @closed="destroy" :destroy-on-close="true" :show-close="false" width="1250px">
        <div class="content" v-loading="getDeviceInfo.loading">
            <i class="iconfont icon-guanbi close" v-show="!fullscreen" @click="dialogVisible = false"></i>
            <component
                class="device"
                @fullscreen="fullscreen = true"
                @close="destroy"
                :key="getDeviceInfo.res.body.stid + '_' + getDeviceInfo.res.body.sn"
                :class="{fullscreen: fullscreen}"
                :defaultTab="tab"
                :deviceInfo="getDeviceInfo.res.body"
                :is="device">
            </component>
        </div>
    </el-dialog>
</template>

<script>
import {api＿getDeviceInfo} from '@newEnergyCloud/request/api'
export default {
    components: {
        bigInverter: () => import('./bigInverter'),
        boxChange: () => import('./boxChange'),
        electricMeter: () => import('./electricMeter'),
        junctionBox: () => import('./junctionBox'),
        smallInverter: () => import('./smallInverter'),
        superInverter: () => import('./superInverter'),
        weather: () => import('./weather'),
        windGenerator: () => import('./windGenerator'),
        windTower: () => import('./windTower')
    },
    data () {
        return {
            getDeviceInfo: api＿getDeviceInfo({
                later: !(this.stid && this.eqid),
                data: {stid: this.stid, eqid: this.eqid},
                res: {
                    body: {}
                }
            }).subscribe(this.openDevice),
            dialogVisible: true,
            fullscreen: false,
            device: null,
            tab: this.defaultTab
        }
    },
    created () {
        if (!this.stid || !this.eqid) {
            this.$message('缺少id，请检查')
            return this.destroy()
        }
        this.$bus.on('switchDevice', this.switchDevice)
        this.$bus.on('deviceFullscreen', this.changeFullscreen)
    },
    methods: {
        switchDevice ({stid, eqid}, tab) {
            this.tab = tab || this.defaultTab
            this.getDeviceInfo.getData({stid, eqid})
        },
        changeFullscreen () {
            this.fullscreen = !this.fullscreen
        },
        openDevice (res) {
            const {type, version, hasJB} = res.body
            switch (type) {
                case '1':
                    this.device = 'junctionBox'
                    break

                case '2':
                    if (version === '2' && hasJB === '1') {
                        this.device = 'superInverter'
                    } else if (hasJB === '1') {
                        this.device = 'smallInverter'
                    } else {
                        this.device = 'bigInverter'
                    }
                    break

                case '3':
                    this.device = 'boxChange'
                    break

                case '4':
                    this.device = 'electricMeter'
                    break

                case '5':
                    this.device = 'weather'
                    break

                case '17':
                    this.device = 'windTower'
                    break

                case '18':
                    this.device = 'windGenerator'
                    break

                default:
                    this.destroy()
                    break
            }
        },
        destroy () {
            this.device = null
            this.dialogVisible = false
            setTimeout(() => this.$destroy(), 500)
        }
    },
    beforeDestroy () {
        this.$bus.off('switchDevice', this.switchDevice)
        this.$bus.off('deviceFullscreen', this.changeFullscreen)
    }
}
</script>

<style lang="scss">
.device-pop-up {
    .el-dialog {
        .el-dialog__header {
            display: none;
        }
        .el-dialog__body {
            padding: 0;
        }
    }
}
</style>

<style lang="scss" scoped>
.device-pop-up {
    .content {
        position: relative;
        min-height: 400px;

        i.close {
            position: absolute;
            top: 0;
            right: -1.5em;
            cursor: pointer;
            color: #fff;
        }

        .device {
            min-height: 500px;

            &.fullscreen {
                height: 100vh;
            }
        }
    }
}
</style>
