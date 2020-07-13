<template>
    <div class="bottom clearfix">
        <img :src="((havePv && haveWp) || isBeikong) ? require('./pvWp1366.png') : (havePv && !haveWp) ? require('./pvWp1366.png') : require('./wp1366.png')" alt="" class="base-img">
        <div class="sunlight" v-if="havePv"></div>
        <img src="./dianshan.gif" alt="" class="zhuan1" v-if="haveWp || isBeikong">
        <img src="./dianshan.gif" alt="" class="zhuan2" v-if="haveWp || isBeikong">
        <img src="./dianshan.gif" alt="" class="zhuan3" v-if="haveWp || isBeikong">
    </div>
</template>

<script>
export default {
    data () {
        return {
            havePv: true,
            haveWp: true
        }
    },
    created () {
        this.judge()
    },
    computed: {
        isBeikong () {
            const beiKongRole = this.$store.getters.role_list.find(v => v.comId === 196)
            if (beiKongRole && beiKongRole.roleId === this.$store.getters.current_role) {
                return true
            }
            return false
        }
    },
    methods: {
        judge () {
            const list = this.$store.getters.station_class_list
            // const list = [
            //     {
            //         id: '01'
            //     },
            //                     {
            //         id: '02'
            //     }
            // ]
            this.havePv = list.some(v => v.id === '01')
            this.haveWp = list.some(v => v.id === '02')
        }
    }
}
</script>

<style lang="scss" scoped>
.bottom {
    // width: max-content;
    // height: max-content;
    width: 161px;
    height: 108px !important;
    margin: auto;
}
.zhuan1 {
    width: 42px;
    height: 47px;
    position: absolute;
    left: -13px;
    // top: 33px;
    transform: translateY(33px);
}
.zhuan2 {
    width: 42px;
    height: 47px;
    position: absolute;
    left: 20px;
    top: 18px;
}
.zhuan3 {
    width: 42px;
    height: 47px;
    position: absolute;
    right: 10px;
    top: 20px;
}
.base-img {
    // display: block;
    // float: left;
    position: absolute;
    bottom: 0;
    left: 0;
}
.sunlight {
    width: 75%;
    height: 85%;
    position: absolute;
    top: 13%;
    left: 46%;
    transform: rotate(43deg) translate3d(0, 0, 0);
    transform-origin: left top;
    animation: sunLight 3s infinite linear;
}
@keyframes sunLight {
    0% { background: linear-gradient(135deg, rgba(254, 205, 105, 0.43), transparent, transparent, transparent, transparent, transparent) }
    50% { background: linear-gradient(135deg, rgba(254, 205, 105, 0.43), transparent, transparent, transparent) }
    75% { background: linear-gradient(135deg, rgba(254, 205, 105, 0.43), transparent, transparent) }
    100% { background: linear-gradient(135deg, rgba(254, 205, 105, 0.43), transparent, transparent) }
}
</style>
