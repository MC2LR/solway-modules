<template>
    <child-header class="child-header">
        <template v-slot:left>
            <switch-station class="switch-station"></switch-station>
        </template>
        <template v-slot:center>

        </template>
    </child-header>
</template>

<script>
import ChildHeader from '../common/ChildHeader'
import SwitchStation from '@/components/station/switchStation/switchStation'

export default {
    components: {
        ChildHeader,
        SwitchStation
    }
}
</script>

<style lang="scss" scoped>
.child-header {
    padding: 0 18px;

    .left {
        padding-top: 5px;
        line-height: 25px;

        &.noToday {
            padding-top: 0px;
            line-height: 61px;
        }

        .real-scene {
            margin-left: 45px;
        }

        .update-time {
            @include c(color, $text_c2);
        }
    }

    .center {
        .date-picker-arrow {
            margin-top: 13px;
        }
    }
}
</style>
