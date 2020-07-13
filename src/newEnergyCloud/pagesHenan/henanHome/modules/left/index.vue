<template>
    <div class="page-left">
        <div class="container">
            <div class="rotation-view">
                <henan-select @change="goPanel('rotation3dTop', 'topPanels', topCurrentPanel)" v-model="topCurrentPanel" :options="topPanelOptions" class="henan-select"></henan-select>
                <rotation3d ref="rotation3dTop" :timeInterval="0" reRender :panels="topPanels" to="toTop">
                    <template></template>
                    <template v-slot:a>
                        <div class="grid-view">
                            <kwh-top></kwh-top>
                        </div>
                    </template>
                    <template v-slot:b>
                        <div class="grid-view">
                            <pr-top></pr-top>
                        </div>
                    </template>
                    <template v-slot:c>
                        <div class="grid-view">
                            <output-power-top></output-power-top>
                        </div>
                    </template>
                </rotation3d>
            </div>
            <div class="rotation-view">
                <henan-select @change="goPanel('rotation3dBottom', 'bottomPanels', bottomCurrentPanel)" v-model="bottomCurrentPanel" :options="bottomPanelOptions" class="henan-select"></henan-select>
                <rotation3d ref="rotation3dBottom" :timeInterval="0" reRender :panels="bottomPanels" to="toTop">
                    <template></template>
                    <template v-slot:a>
                        <div class="grid-view">
                            <day-kwh></day-kwh>
                        </div>
                    </template>
                    <template v-slot:b>
                        <div class="grid-view">
                            <month-kwh></month-kwh>
                        </div>
                    </template>
                </rotation3d>
            </div>
        </div>
    </div>
</template>

<script>
import rotation3d from '@comm/components/rotation3d'
import HenanSelect from '../../components/HenanSelect'
export default {
    components: {
        rotation3d,
        HenanSelect,
        prTop: () => import('./charts/prTop'),
        kwhTop: () => import('./charts/kwhTop'),
        outputPowerTop: () => import('./charts/outputPowerTop'),
        dayKwh: () => import('./charts/dayKwh'),
        monthKwh: () => import('./charts/monthKwh')
    },
    data () {
        const topPanelOptions = [
            {name: '发电量前十的场站', station: false, company: true, value: 'a', component: 'kwhTop'},
            {name: 'PR前十的场站', station: false, company: true, value: 'b', component: 'prTop'},
            {name: '实时出力效率', station: false, company: true, value: 'c', component: 'outputPowerTop'}
        ]
        const bottomPanelOptions = [
            {name: '日发电量', station: true, company: true, value: 'a', component: 'dayKwh'},
            {name: '月发电量', station: true, company: true, value: 'b', component: 'monthKwh'}
        ]
        return {
            topPanelOptions,
            topPanels: topPanelOptions.map(v => v.value),
            topCurrentPanel: 'a',
            bottomPanelOptions,
            bottomPanels: bottomPanelOptions.map(v => v.value),
            bottomCurrentPanel: 'a'
        }
    },
    methods: {
        async goPanel (rotation3dName, panelsName, panelName) {
            const rotation3d = this.$refs[rotation3dName]
            const currentPannerName = this[panelsName][rotation3d.panelIndex]
            if (currentPannerName === panelName) return
            this[panelsName] = [currentPannerName, panelName, ...this[panelsName]].reduce((a, b) => {
                if (a.find(v => v === b)) return a
                a.push(b)
                return a
            }, [])
            rotation3d.panelIndex = 0
            await this.$timeout(200)
            rotation3d.next()
        }
    }
}
</script>

<style lang="scss" scoped>
.page-left {
    width: 35%;
    height: calc(100vh - 145px);
    position: absolute;
    left: 0;
    bottom: 0;
    padding: 30px;

    .container {
        width: 100%;
        height: 100%;

        .rotation-view {
            position: relative;
            z-index: 9;
            height: calc((100% - 30px) / 2);
            background-color: rgba(19,46,95,0.17);;

            &:first-child {
                margin-bottom: 30px;
            }

            .henan-select, .view-title {
                position: absolute;
                z-index: 9;
                left: 10px;
                top: 10px;
                width: 150px;
                height: 19px;
                line-height: 19px;
                font-size: 14px;
                background:linear-gradient(to right, rgba(40,189,217,.5), transparent);
                color: rgba(69,228,247,.8);
                padding-left: 5px;
            }

            .rotation3d {
                height: 100%;

                .corner-border {
                    position: absolute;
                    right: 0;
                    top: 0;
                    cursor: pointer;
                }

                .grid-view {
                    height: 100%;
                    background: linear-gradient(90deg,rgba(20,49,129,0.28) 10%,transparent 0),linear-gradient(rgba(20,49,129,0.28) 10%,transparent 0);
                    background-size: 20px 20px;
                    position: relative;
                    // font-size: 30px;
                    // text-align: center;
                    // padding-top: 20px;

                    &::before {
                        content: '';
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        left: 0;
                        top: 0;
                        background: linear-gradient(to left, rgba(40,194,221, .5), rgba(40,194,221, .5)) left top no-repeat,
                                    linear-gradient(to bottom, rgba(40,194,221, .5), rgba(40,194,221, .5)) left top no-repeat,
                                    linear-gradient(to left, rgba(40,194,221, .5), rgba(40,194,221, .5)) right bottom no-repeat,
                                    linear-gradient(to left, rgba(40,194,221, .5), rgba(40,194,221, .5)) right bottom no-repeat;
                        background-size: 1px 20px, 20px 1px, 1px 20px, 20px 1px;
                    }
                }
            }
        }

    }
}
</style>
