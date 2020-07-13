<template>
    <div class='people-organization-management'>
        <div class="header-line">
            <el-button class="button-tab" @click="openChildDialog()">添加子机构</el-button>
            <el-button class="button-tab" @click="openMainDialog()">添加一级机构</el-button>
            <el-button @click="deleteBatch()">批量删除</el-button>
        </div>
        <div class="page-content-area">
            <el-row>
                <el-col :span="12">
                    <div>
                        <el-input v-model="input" ref="nodeKeyWords" placeholder="关键字搜索" style="width:300px;"></el-input>
                        <div class="tree-con">
                            <ul :id="treeId" class="ztree"></ul>
                        </div>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="edit-area">
                        <el-form label-width="100px" :model="formData" :rules="rules" ref="formData" v-if="formData.name && organizationTreeList.res.data">
                            <el-form-item label="机构名称" prop="name">
                                <el-input v-model="formData.name" class="input-edit"></el-input>
                            </el-form-item>
                            <el-form-item label="机构编码">
                                <div>{{formData.orgCode}}</div>
                            </el-form-item>
                             <el-form-item label="上级机构">
                                <el-select v-model="formData.parentId" placeholder="无" disabled>
                                    <el-option
                                        v-for="item in organizationTreeList.res.data"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="排序">
                                <el-input v-model="formData.weight" class="input-edit"></el-input>
                            </el-form-item>
                            <el-form-item label="备注">
                                <el-input v-model="formData.memo" class="input-edit"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button class="button-tab"  @click="editCurrentOrganization(formData)">修改并保存</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-col>
            </el-row>
        </div>
        <!-- 添加一级机构 -->
        <el-dialog
            width="600px"
            center
            @opened="$bus.emit('openAddMainOrganization')"
            :visible.sync="mainOrganizationParams.visible"
            :title="'添加一级机构'">
            <add-main-organization v-bind="mainOrganizationParams" @updateSuccess="updateSuccess"></add-main-organization>
            <div slot="footer" class="dialog-footer">
                <el-button type="b2" @click="mainOrganizationParams.visible = false">取 消</el-button>
                <el-button class="button-tab" @click="$bus.emit('saveMainOrganization')">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 添加子机构 -->
        <el-dialog
            width="600px"
            center
            @opened="$bus.emit('openAddChildOrganization')"
            :visible.sync="childOrganizationParams.visible"
            :title="'添加子机构'">
            <add-child-organization v-bind="childOrganizationParams" @updateSuccess="updateSuccess"></add-child-organization>
            <div slot="footer" class="dialog-footer">
                <el-button type="b2" @click="childOrganizationParams.visible = false">取 消</el-button>
                <el-button class="button-tab" @click="$bus.emit('saveChildOrganization')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {Input, Button, Row, Col, FormItem, Form, Dialog, Message, MessageBox} from 'element-ui'
import {api＿organizationTreeList, api＿organizationUpdate, api＿organizationDeleteBatch} from '@/request/api'
import '@ztree/ztree_v3/js/jquery.ztree.all'
import '@ztree/ztree_v3/js/jquery.ztree.exhide'
import fuzzySearch from './fuzzysearch'
import mixinWidthHeight from '@comm/mixin/widthHeight'
const $ = window.jQuery
export default {
    mixins: [mixinWidthHeight],
    data () {
        return {
            input: '',
            treeId: 'ztree_' + parseInt(Math.random() * 1e10),
            ztreeObj: null,
            setting: {
                data: {
                    simpleData: {
                        enable: true,
                        pIdKey: 'parentId'
                    }
                },
                check: {
                    enable: true
                },
                callback: {
                    onClick: this.nodeClick,
                    onCheck: this.nodeOnCheck
                }
            },
            checkboxDataArr: [],
            formData: {},
            rules: {
                name: [
                    {required: true, message: '请输入名称', trigger: 'blur'}
                ]
            },
            mainOrganizationParams: {
                visible: false
            },
            childOrganizationParams: {
                visible: false
            },
            selectedOrganizationItem: {},
            organizationTreeList: api＿organizationTreeList({
                later: true,
                onlyLatest: true
            }),
            organizationUpdate: api＿organizationUpdate({
                later: true,
                sameTimeOnce: true
            }),
            organizationDeleteBatch: api＿organizationDeleteBatch({
                later: true,
                sameTimeOnce: true
            })
        }
    },
    methods: {
        nodeClick (event, treeId, data, clickFlag) {
            this.selectCurrentItem(data)
        },
        initTree (data) {
            const ztreeObj = this.ztreeObj = $.fn.zTree.init($('#' + this.treeId), this.setting, data)
            ztreeObj.expandNode(ztreeObj.getNodes()[0], true)
            let node = ztreeObj.getNodeByParam('id', data[0].id)
            ztreeObj.selectNode(node)
            fuzzySearch(this.treeId, this.$refs.nodeKeyWords.$el.children[0], null, true)
        },
        nodeOnCheck (event, treeId, treeNode) {
            this.checkboxDataArr.map(v => {
                if (treeNode.id === v.id) v.checked = treeNode.checked
            })
        },
        selectCurrentItem (data) {
            this.selectedOrganizationItem = data
            if (data.parentId === 0) {
                this.formData = {...data, parentId: null}
            } else {
                this.formData = data
            }
        },
        getOrganizationLevelTreeData () {
            this.organizationTreeList.getData().then(res => {
                if (res.code === 200) {
                    this.checkboxDataArr = res.data.map(v => ({id: v.id, checked: false}))
                    this.selectCurrentItem(res.data[0])
                    this.initTree(res.data)
                }
            })
        },
        editCurrentOrganization (formData) {
            this.$refs.formData.validate((valid, a) => { // 校验
                if (!valid) return false
                let data = {
                    id: formData.id,
                    name: formData.name,
                    weight: formData.weight,
                    memo: formData.memo
                }
                this.organizationUpdate.getData(data).then(res => {
                    if (res.code !== 200) return Message.error(res.msg || '修改失败')
                    Message.success(res.msg || '修改成功')
                    this.getOrganizationLevelTreeData()
                })
            })
        },
        openMainDialog () {
            this.mainOrganizationParams = {
                visible: true
            }
        },
        openChildDialog () {
            if (!this.selectedOrganizationItem.id) {
                Message.warning('请选择一个机构作为父级机构')
                return false
            }
            this.childOrganizationParams = {
                visible: true,
                detail: this.selectedOrganizationItem
            }
        },
        // 统一保存成功回调
        updateSuccess () {
            this.mainOrganizationParams.visible = false
            this.childOrganizationParams.visible = false
            this.getOrganizationLevelTreeData()
        },
        deleteBatch () {
            let checkedNodes = this.ztreeObj.getCheckedNodes(true)
            let checkedArr = []
            checkedNodes.map(v => {
                if ((v.children && v.check_Child_State === 2) || !v.children) checkedArr.push(v.id)
            })
            if (!checkedArr.length) {
                Message.warning('请至少选择一个机构')
                return false
            }
            MessageBox.confirm('确定删除所选的机构吗?', '提示', {
                type: 'warning'
            }).then(() => {
                this.organizationDeleteBatch.getData({ids: checkedArr.join(',')}).then(res => {
                    if (res.code !== 200) return Message.error(res.msg || res.body || '删除失败')
                    Message.success(res.msg || res.body || '删除成功')
                    this.getOrganizationLevelTreeData()
                })
            }).catch(() => {})
        }
    },
    mounted () {
        this.getOrganizationLevelTreeData()
    },
    components: {
        ElForm: Form,
        ElFormItem: FormItem,
        ElInput: Input,
        ElButton: Button,
        ElDialog: Dialog,
        ElRow: Row,
        ElCol: Col,
        addMainOrganization: () => import('./dialog/addMainOrganization'),
        addChildOrganization: () => import('./dialog/addChildOrganization')
    },
    beforeDestroy () {
    }
}
</script>

<style lang="scss">
.people-organization-management{
    .el-button{
        &.button-tab{
            background: rgb(47, 191, 204);
            color: white;
        }
    }
}
</style>
<style lang='scss' scoped>
@import "./ztree.css";
.people-organization-management {
    height: 100%;
    padding: 0px 10px 15px;
    .header-line{
        height:60px;
        line-height: 60px;
    }
    .page-content-area{
        margin: 0px 0 15px;
        background: white;
        padding: 15px;
        .tree-con{
            margin: 15px 15px 0 15px;
            height: calc(100vh - 160px);
            overflow: auto;
        }
        .edit-area{
            border-left:1px solid #f3f3f3;
            margin: 40px 15px 0 15px;
            height: calc(100vh - 145px);
            overflow: auto;
            padding:15px;
            .input-edit{
                width:200px;
            }
        }
    }
}
</style>
