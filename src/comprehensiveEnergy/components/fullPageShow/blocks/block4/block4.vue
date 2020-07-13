<template>
    <div class="energy-save">
        <div>节能减排</div>
        <div class="content">
            <div class="content-middle">
                <div class="item font12 orange">
                    <p>节省标煤</p>
                    <div class="circle-con"><img src="./images/circle-orange.png" class="rotate-img-left"><i class="iconfont iconmei1"></i></div>
                    <p><span class="font18">{{data.coal}}</span><span>{{units.coal}}</span></p>
                </div>
                <div class="item font12 blue">
                    <p>CO2减排</p>
                    <div class="circle-con"><img src="./images/circle-blue.png" class="rotate-img-left"><i class="iconfont iconCO-"></i></div>
                    <p><span class="font18">{{data.co2}}</span><span>{{units.co2}}</span></p>
                </div>
                <div class="item font12 green">
                    <p>植树</p>
                    <div class="circle-con"><img src="./images/circle-green.png" class="rotate-img"><i class="iconfont iconshu"></i></div>
                    <p><span class="font18">{{data.planted_tree}}</span><span>{{units.planted_tree}}</span></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            data: {},
            units: {}
        }
    },
    created () {
        this.$bus.on('monitoringData', this.getData)
    },
    methods: {
        getData (res) {
            if (res.code === 0) {
                this.data = res.body.accum.data
                this.units = res.body.accum.units
            }
        }
    },
    beforeDestroy () {
        this.$bus.off('monitoringData', this.getData)
    }
}
</script>

<style lang="scss" scoped>
.energy-save{
    padding: 0.07rem 0.16rem;
    font-size: 0.14rem;
    .width3-1{
        width:33.33%;
    }
    .font18{
        font-size:0.18rem;
    }
    .font12{
        font-size:0.12rem;
    }
    .m-l-10{
        margin-left:0.05rem;
    }
    .content{
        height: calc(100% - 10px);
        display: flex;
        align-items: center;
        justify-content: center;
        .content-middle{
            align-items: center;
            width:100%;
        }
        .item{
            display:inline-block;
            width:32.5%;
            text-align: center;
        }
        .circle-con{
            position:relative;
            height:0.45rem;
            margin-bottom:0.05rem;
            .iconfont{
                position: absolute;
                left: 0.53rem;
                top: 0.19rem;
            }
            .iconmei1{
                font-size:0.13rem;
                color:#FEC658;
            }
            .iconCO-{
                font-size:0.14rem;
                color:#70FFF5;
            }
            .iconshu{
                font-size:0.12rem;
                color:#5AF05E;
            }
        }
        .orange{
            color:#FEC658;
        }
        .green{
            color:#5AF05E;
        }
        .blue{
            color:#70FFF5;
        }
    }
    .rotate-img{
        width: 0.4rem;
        position: absolute;
        left: 0.4rem;
        top: 0.05rem;
        animation: rotation 3s linear infinite;
    }
    .rotate-img-left{
        width: 0.4rem;
        position: absolute;
        left: 0.4rem;
        top: 0.05rem;
        animation: rotationLeft 3s linear infinite;
    }
    .iconmei1{
        position: absolute;
        left: 0.42rem;
        top: 0.18rem;
    }
    @keyframes rotation{
        from {-webkit-transform: rotate(0deg);}
        to {-webkit-transform: rotate(360deg);}
    }

    @keyframes rotationLeft{
        from {-webkit-transform: rotate(360deg);}
        to {-webkit-transform: rotate(0deg);}
    }
}
</style>
