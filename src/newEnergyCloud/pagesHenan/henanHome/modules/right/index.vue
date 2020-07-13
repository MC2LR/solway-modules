<template>
    <div class="page-left">
        <div class="container">
            <div class="grid-view">
                <span class="view-title">近十日出力曲线</span>
                <power-line></power-line>
            </div>
            <div class="grid-view">
                <span class="view-title">运营故障情况</span>
                <code-cloud></code-cloud>
                <fault-label class="fault-label"></fault-label>
            </div>
        </div>
    </div>
</template>

<script>
import powerLine from './charts/powerLine'
import codeCloud from './charts/codeCloud'
import faultLabel from './charts/faultLabel'
export default {
    components: {
        powerLine,
        codeCloud,
        faultLabel
    }
}
</script>

<style lang="scss" scoped>
.page-left {
    width: 35%;
    height: calc(100vh - 145px);
    position: absolute;
    right: 0;
    bottom: 0;
    padding: 30px;

    .container {
        width: 100%;
        height: 100%;

        .grid-view {
            height: calc((100% - 30px) / 2);
            position: relative;

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

            .fault-label {
                position: absolute;
                left: 0;
                top: 30px;
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

            &:first-child {
                margin-bottom: 30px;
                background: linear-gradient(90deg,rgba(20,49,129,0.28) 10%,transparent 0),linear-gradient(rgba(20,49,129,0.28) 10%,transparent 0);
                background-size: 20px 20px;
            }

            &:last-child {
                background-image: radial-gradient( circle, rgba(255,255,255,.05) 4px, transparent 4px );
                background-size: 40px 40px;
            }
        }
    }
}
</style>
