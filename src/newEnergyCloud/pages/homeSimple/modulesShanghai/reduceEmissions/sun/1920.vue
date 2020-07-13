<template>
    <div class="bottom clearfix">
        <img :src="((havePv && haveWp) || isBeikong) ? require('./pvWp1920.png') : (havePv && !haveWp) ? require('./pvWp1920.png') : require('./wp1920.png')" alt="" class="base-img">
        <div class="sunlight" :style="{left: haveWp ? '49%' : '47%'}" v-if="havePv"></div>
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
    width: 180px;
    height: 126px !important;
    margin: auto;
}
.base-img {
    position: absolute;
    bottom: -20px;
    left: 0;
    width:170px;
    // vertical-align: bottom;
}
.zhuan1 {
    width: 56px;
    height: 63px;
    position: absolute;
    left: -13px;
    top: 53px;
}
.zhuan2 {
    width: 56px;
    height: 63px;
    position: absolute;
    left: 28px;
    top: 30px;
}
.zhuan3 {
    width: 56px;
    height: 63px;
    position: absolute;
    right: 10px;
    top: 35px;
}
.sunlight {
    width: 65%;
    height: 95%;
    position: absolute;
    top: 24%;
    // left: 47%;
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
