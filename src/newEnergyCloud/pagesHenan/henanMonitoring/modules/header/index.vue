<template>
    <div class="header">
        <h2>分布式新能源数据归集及监测平台</h2>
        <switch-station class="switch-station"></switch-station>
    </div>
</template>

<script>
import SwitchStation from '@/components/station/switchStation/switchStation'
export default {
    components: {
        SwitchStation
    }
}
</script>

<style lang="scss" scoped>
.header {
    width: 100%;
    height: 70px;
    background-image: url('./images/line.png');
    background-position: bottom center;
    background-repeat: no-repeat;
    position: relative;

    h2 {
        width: max-content;
        margin: 0 auto;
        line-height: 70px;
        font-size: 18px;
    }

    .switch-station {
        position: absolute;
        left: 30px;
        top: 0;
        line-height: 70px;

        .switch-btn {
            width: max-content;

            i {
                font-size: 20px;
            }
        }
    }
}
</style>
