<template>
    <div>
      <div class="common label-left">厂家名称</div><div class="common content-left"> {{this.product.manuFName}}</div>
      <div class="common label-right">产品型号</div><div class="common content-right"> {{this.product.productName}}</div><div style="clear:both"></div>
      <div class="common label-left">协议名称</div><div style="width:580px" class="common content-left"> {{this.product.keywords}}</div><div style="clear:both"></div>
      <div class="common label-left">故障码</div><div class="common content-left"> {{this.product.manuFName}}</div>
      <div class="common label-right">故障分类</div><div class="common content-right"> {{this.product.productName}}</div><div style="clear:both"></div>
      <div class="common label-left">故障中文描述</div><div class="common content-left"> {{this.product.manuFName}}</div>
      <div class="common label-right">故障英文描述</div><div class="common content-right"> {{this.product.productName}}</div><div style="clear:both"></div>
      <div class="common label-left">故障原因及处理流程</div><div style="width:580px" class="common content-left"> {{this.product.keywords}}</div><div style="clear:both"></div>
      <div class="common label-left">处理建议</div><div style="width:580px" class="common content-left content-core" v-html="this.product.content"></div><div style="clear:both"></div>
      <div class="common label-left">备注</div><div style="width:580px" class="common content-left content-core" v-html="this.product.content"></div><div style="clear:both"></div>
      <div class="common label-left">附件</div>
      <div style="width:580px;border-style: none;color:#49BFAE" class="common content-left"
      ><div v-for="item in this.product.attachment"
      :key="item.id"
      :label="item.fileName"
      :value="item.id">
        <a :href="item.attachment" :download="item.fileName">{{item.fileName}}</a>
      </div></div><a></a>
      <div style="clear:both"></div>
    </div>
</template>

<script>
  export default {
    props: ['product'],
    data () {
        return {
        }
    },
    methods: {
    }
  }
</script>

<style lang="scss" scoped>
  .common{
    float: left;
    line-height: 20px;
    min-height: 20px;
  }
  .label-left{
      margin: 20px 0px 0px 10px;
      text-align: right;
      width: 60px;
    }
    .label-right{
      margin: 20px 0px 0px 30px;
      text-align: right;
      width: 60px;
    }
    .content-left{
      margin: 20px 0px 0px 10px;
      width: 240px;
      border-bottom-style: solid;
      border-width: 1px;
      border-color: #ccc;
    }
    .content-right{
      margin: 20px 0px 0px 10px;
      width: 240px;
      border-bottom-style: solid;
      border-width: 1px;
      border-color: #ccc;
    }
    .content-core{
      height:120px;
      border-style: solid;
      padding: 10px;
    }
</style>
