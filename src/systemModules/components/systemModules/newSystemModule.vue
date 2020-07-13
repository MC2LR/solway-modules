<template>
    <el-form label-width="150px" :model="formData" :rules="rules" class="newSystemModule" ref="formData">
        <el-form-item label="菜单名称">
            <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="前端所属模块">
            <el-input v-model="formData.uiPrefix"></el-input>
        </el-form-item>
        <el-form-item label="路由名称(问前端)">
            <el-input v-model="formData.uiState"></el-input>
        </el-form-item>
        <el-form-item label="唯一编码" v-if="versionId === 3" prop="code">
            <el-input v-model="formData.code"></el-input>
        </el-form-item>
        <el-form-item label="顺序号" prop="weight">
            <el-input v-model="formData.weight"></el-input>
        </el-form-item>
        <el-form-item label="图标" style="position:relative;">
            <!-- <el-input @focus="showIcon = !showIcon" v-model="formData.uiIcon"></el-input> -->
            <div class="icon-selected-con" @click="showIcon = !showIcon"><span :class="formData.uiIcon"></span></div>
            <div class="icon-list" v-show="showIcon">
                <span v-for="icon in iconListData" :key="icon" :class="icon" @click="selectIcon(icon)" class="icon-class"></span>
            </div>
        </el-form-item>
        <el-form-item label="服务模式" prop="serviceMode">
            <el-select v-model="formData.serviceMode" placeholder="请选择">
                <el-option
                    v-for="item in serviceModeList"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="上级菜单" style="position:relative;">
            <el-input @focus="showTree = !showTree" v-model="parentName"></el-input>
            <div class="tree-con" v-show="showTree">
                <ul :id="treeId" class="ztree"></ul>
            </div>
        </el-form-item>
    </el-form>
</template>

<script>
import {api＿moduleList, api＿moduleUpdate} from '@/request/api'
import {Select, Option, FormItem, Form, Input, Message} from 'element-ui'
import mixinWidthHeight from '@comm/mixin/widthHeight'
import '@ztree/ztree_v3/js/jquery.ztree.all'
import '@ztree/ztree_v3/js/jquery.ztree.exhide'
const $ = window.jQuery
export default {
    mixins: [mixinWidthHeight],
    props: {
        detail: {
            type: Object
        },
        visible: {
            type: Boolean
        },
        category: {},
        versionId: {}
    },
    data () {
        return {
            showTree: false,
            showIcon: false,
            serviceModeList: [{'name': '免费服务', value: '00'}, {'name': '收费服务', value: '01'}, {'name': '子模块收费', value: '02'}],
            formData: {
                id: '', // 编辑时传
                weight: 100
            },
            parentName: '',
            rules: {
                name: [
                    {required: true, message: '请输入名称', trigger: 'blur'}
                ],
                serviceMode: [
                    {required: true, message: '请选择服务模式', trigger: 'blur'}
                ],
                code: [{required: true, message: '请输入唯一编码', trigger: 'blur'}],
                weight: [{required: true, message: '请输入顺序号', trigger: 'blur'}]
            },
            treeId: 'ztree_' + parseInt(Math.random() * 1e10),
            ztreeObj: null,
            setting: {
                data: {
                    simpleData: {
                        enable: true,
                        pIdKey: 'pid'
                    }
                },
                callback: {
                    beforeClick: this.nodeBeforeClick,
                    onClick: this.nodeClick
                }
            },
            saveLoading: false,
            iconListData: [],
            moduleList: api＿moduleList({
                later: true,
                onlyLatest: true
            }),
            moduleUpdate: api＿moduleUpdate({
                later: true,
                sameTimeOnce: true
            })
        }
    },
    created () {
    },
    mounted () {
        this.$bus.on('saveModule', this.saveModule)
        this.$bus.on('openEditModule', this.openModal)
    },
    methods: {
        openModal () {
            this.resetForm()
            let svgList = $('body').find('svg')
            let theSvgData = null
            svgList.each((i, v) => {
                $(v).find('symbol').each((index, item) => {
                    if ($(item).attr('id') === 'menuangry') {
                       theSvgData = $(v).find('symbol')
                    }
                })
            })
            theSvgData.each((i, v) => {
                this.iconListData.push('iconfont ' + $(v).attr('id'))
            })
            this.getModuleLevelTreeData()
            if (this.detail) {
                let detail = this.detail
                if (this.versionId === 3) {
                    this.formData = {
                        id: detail.id,
                        name: detail.name,
                        uiState: detail.uiState,
                        uiPrefix: detail.uiPrefix,
                        uiIcon: detail.uiIcon,
                        serviceMode: detail.serviceMode,
                        code: detail.code,
                        weight: detail.weight
                    }
                } else if (this.versionId === 2) {
                    this.formData = {
                        id: detail.id,
                        name: detail.name,
                        uiState: detail.uiState,
                        uiPrefix: detail.uiPrefix,
                        uiIcon: detail.uiIcon,
                        serviceMode: detail.serviceMode,
                        weight: detail.weight
                    }
                }
            }
        },
        initTree (data) {
            const ztreeObj = this.ztreeObj = $.fn.zTree.init($('#' + this.treeId), this.setting, data)
            ztreeObj.expandNode(ztreeObj.getNodes()[0], true)
        },
        nodeClick (event, treeId, data, clickFlag) {
            this.formData.pid = data.id
            this.parentName = data.name
            this.showTree = false
        },
        getModuleLevelTreeData () {
            this.moduleList.getData({'category': this.category, 'version': this.versionId}).then(res => {
                if (res.code === 0) {
                    this.initTree(res.body)
                    if (this.detail) {
                        res.body.map(v => {
                            if (this.detail.pid === v.id) this.parentName = v.name
                        })
                    }
                }
            })
        },
        selectIcon (icon) {
            this.formData['uiIcon'] = icon
            this.showIcon = false
        },
        saveModule () { // 保存
            if (this.saveLoading) return false
            if ((this.formData.uiPrefix && !this.formData.uiState) || (!this.formData.uiPrefix && this.formData.uiState)) {
                return Message.error('所属模块和路由名称，都填，或者都不填，请保持一致')
            }
            this.$refs.formData.validate((valid, a) => { // 校验
                if (!valid) return false
                this.formData['category'] = this.category
                this.formData['version'] = this.versionId
                if (!this.parentName) this.formData.pid = 0
                let formData = {...this.formData}
                this.saveLoading = true
                this.moduleUpdate.getData(formData).then(res => {
                    setTimeout(() => {
                        this.saveLoading = false
                    }, 3000)
                    if (res.code !== 0) return Message.error(res.msg || res.body || '保存失败')
                    this.$emit('updateSuccess')
                    Message.success(res.msg || res.body || '保存成功')
                })
            })
        },
        resetForm () { // 重置form
            // this.$refs.formData.resetFields()
            this.formData = {
                id: '',
                name: null,
                uiState: null,
                uiPrefix: null,
                uiIcon: null,
                serviceMode: null,
                weight: 100
            }
            this.showTree = false
            this.parentName = ''
            this.treeId = 'ztree_' + parseInt(Math.random() * 1e10)
            this.ztreeObj = null
            this.iconListData = []
            this.showIcon = false
        }
    },
    beforeDestroy () {
        this.$bus.off('saveModule', this.saveModule)
        this.$bus.off('openEditModule', this.openModal)
    },
    components: {
        ElSelect: Select,
        ElOption: Option,
        ElForm: Form,
        ElFormItem: FormItem,
        ElInput: Input
    }
}
</script>

<style lang="scss">
.newSystemModule {
    .el-input {
        &.is-disabled {
            .el-input__inner {
                background-color: #FFFFFF;
                cursor: pointer;
            }
        }
    }
}
</style>
<style lang="scss" scoped>
@import "./ztree.css";
.newSystemModule {
    max-height: calc(100vh - 280px);
    overflow:auto;
    .require{
        color: #F56C6C;
        position:absolute;
    }
    .tree-con{
        position:absolute;
        bottom:25px;
        width:100%;
        background:#f1f1f1;
        border:1px solid rgba(110,110,110,0.6);
        height: 200px;
        overflow: auto;
        margin: 15px 0;
    }
    .icon-list{
        position:absolute;
        bottom:25px;
        width:100%;
        background:#f1f1f1;
        border:1px solid rgba(110,110,110,0.6);
        height: 100px;
        overflow: auto;
        margin: 15px 0;
    }
    .icon-selected-con{
        height: 34px;
        border: 1px solid #dedede;
        border-radius: 2px;
        text-indent: 8px;
        line-height: 34px;
    }
    .icon-class{
        margin-left: 14px;
        font-size: 20px;
        cursor: pointer;
        display: inline-block;
    }
}
</style>
