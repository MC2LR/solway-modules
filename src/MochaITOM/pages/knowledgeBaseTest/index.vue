<template>
    <div class="knowledgeBaseTest ">
        <div class="knowledgeHeader">
            <knowledge-header @update-knowledge-class="changeKnowledgeClass"></knowledge-header>
        </div>
        <div class="knowledgeContent">
            <product-information v-show="knowledgeClass==1"></product-information>
            <fault-guidance v-show="knowledgeClass==2"></fault-guidance>
            <historical-maintenance v-show="knowledgeClass==3"></historical-maintenance>
        </div>
    </div>
</template>
<script>
import AsideMenu from '@/components/AsideMenu'
import knowledgeHeader from './knowledgeHeader'
import productInformation from './modules/product/productInformation'
import faultGuidance from './modules/faultGuid/faultGuidance'
import historicalMaintenance from './modules/historical/historicalMaintenance'
export default {
    components: {
        AsideMenu,
        knowledgeHeader,
        productInformation,
        faultGuidance,
        historicalMaintenance
    },
    data () {
        return {
            knowledgeClass: 1
        }
    },
    created () {
    },
    methods: {
        changeKnowledgeClass (data) {
            this.knowledgeClass = data
        }
    }
}
</script>

<style lang="scss" scoped>
.knowledgeBaseTest {
    color:white;
    background-color:#EDEFF9;
    background-size: cover;
    height:100vh;
}
.knowledgeHeader{
    margin:25px 0 0 20px;
}
.knowledgeContent{
    margin:0 0 0 20px;
    height: calc(100vh - 80px);
}
.knowledgeClass{
    color: #333333;
    font-size: 16px;
}
</style>
