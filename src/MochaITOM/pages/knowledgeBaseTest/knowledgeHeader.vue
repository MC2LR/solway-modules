<template>
    <div>
        <div class="buttonCommon" :class="{ 'buttionActive': isActive==1, 'buttionUnActive': isActive!=1}"  @click="changeTab(1)">产品资料</div>
        <div class="buttonCommon" :class="{ 'buttionActive': isActive==2, 'buttionUnActive': isActive!=2}" @click="changeTab(2)">故障指导</div>
        <div class="buttonCommon" :class="{ 'buttionActive': isActive==3, 'buttionUnActive': isActive!=3}" @click="changeTab(3)">历史维修</div>
        <div style="clear:both;"></div>
    </div>
</template>
<script>
export default {
    components: {
    },
    data () {
        return {
            isActive: 1
        }
    },
    created () {
    },
    methods: {
        changeTab: function (data) {
              this.$emit('update-knowledge-class', data)
              this.isActive = data
            }
    }
}
</script>
<style lang="scss">
.buttonCommon{
    width:360px;
    height:40px;
    line-height:22px;
    margin: 0px 35px 0px 0px;
    font-size: 16px;
    float: left;
    text-align: center;
    line-height: 40px;
    cursor: pointer;
    border-radius:5px;
}
.buttionActive{
    background-color:#49BFAD;
    color:#FFFFFF;
}
.buttionUnActive{
    background-color:#FFFFFF;
    color:#333333;
}

</style>
