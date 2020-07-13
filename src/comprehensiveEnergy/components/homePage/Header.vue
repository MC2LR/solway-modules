<template>
    <div class="header">
        <switch-station></switch-station>
        <span class="time">{{dateTime}}</span>
        <personal-center :userName="true"></personal-center>
        <full-screen></full-screen>
        <h1>综合能源大数据平台</h1>
    </div>
</template>

<script>
import personalCenter from '@comm/components/personalCenter/index'
import fullScreen from '@comm/components/fullScreen/index'
import SwitchStation from '@comprehensiveEnergy/components/common/SwitchStation'

export default {
    data () {
        return {
            dateTime: new Date().Format('yyyy-MM-dd hh:mm:ss')
        }
    },
    mounted () {
        this.timer = setInterval(this.getDate, 1000)
    },
    methods: {
        getDate () {
            this.dateTime = new Date().Format('yyyy-MM-dd hh:mm:ss')
        }
    },
    components: {
        personalCenter,
        fullScreen,
        SwitchStation
    }
}
</script>

<style lang="scss">
.header {
    .full-screen .iconcomm.commgerenzhongxin {
        font-size: 0.18rem !important;
    }

    .personal-center {
        .iconcomm.commicon-- {
            font-size: 0.16rem !important;
        }

        .dropdown-menu {
            top: 75% !important;
        }
    }
}
</style>

<style lang="scss" scoped>
.header {
    padding: 0 0.4rem;
    height: 0.6rem;
    line-height: 0.6rem;

    h1 {
        text-align: center;
        font-size: 0.218rem;
        position: relative;
        width: 5rem;
        margin: 0 auto;

        &:before {
            content: '';
            position: absolute;
            z-index: -1;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            background: rgba(16, 49, 84, 1);
            opacity: 0.7;
            border: 1px solid rgba(100, 150, 214, 1);
            box-shadow: 0px 3px 3px 0px rgba(0, 1, 1, 0.36);
            transform: perspective(.5em) rotateX(-2deg) scaleY(1.1);
        }
    }

    .switch-station {
        float: left;
        font-size: 0.17rem;
    }

    .time {
        float: left;
        font-size: 0.1363rem;
        margin-left: 0.87rem;
    }

    .full-screen {
        float: right;
        margin-right: 0.3rem;
    }

    .personal-center {
        float: right;
    }
}
</style>
