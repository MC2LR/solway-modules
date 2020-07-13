<template>
    <div class="expert-analysis">
        <page-left class="left"></page-left>
        <history-template class="right"></history-template>
        <div class="center">
            <page-body class="page-body"></page-body>
        </div>
    </div>
</template>

<script>
import store from '@/store'
import storeModule, {moduleName} from './store'
import PageLeft from './left'
import HistoryTemplate from './histtoryTemplate'
import PageBody from './body'
export default {
    components: {
        PageLeft,
        PageBody,
        HistoryTemplate
    },
    created () {
        if (!this.$store.state[moduleName]) {
            store.registerModule(moduleName, storeModule)
        }
    }
}
</script>

<style lang="scss" scoped>
@import './theme/theme.scss';
[data-pagetheme="dark"] {
    .expert-analysis >>> {
        @import '@comm/assets/themes/input/pageTheme/input_dark1.scss';
    }
}
.expert-analysis {
    padding: 20px 15px;
    height: 100%;
    @include page_c(color, $fontColor);

    .left {
        float: left;
        width: 183px;
        height: 100%;
    }

    .right {
        float: right;
        width: 151px;
        height: 100%;
        // background-color: #fff;
    }

    .center {
        overflow: hidden;
        height: 100%;
        padding: 0 10px;

        .page-body {
            height: 100%;
        }
    }
}
</style>
