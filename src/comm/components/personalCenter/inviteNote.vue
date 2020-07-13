<template>
    <div class="invite-note" @click="$event.stopPropagation();">
        <h2>邀请人员信息</h2>
        <div class="invite-list">
            <div v-for="item in inviteNoteList" :key="item.id"  class="invite-item">
                <p style="margin-bottom: 12px;">
                    <span style="width:28%;font-size: 14px;">{{item.sendusername}}</span>
                    <span style="font-size:12px;">{{new Date(item.updatetime).Format('yyyy-MM-dd hh:mm')}}</span>
                </p>
                <div class="clearfix">
                    <div class="pull-left" style="width:70%;font-size: 18px;height: 28px;line-height: 28px;">{{item.content}}</div>
                    <div class="pull-right">
                        <el-button size="mini" @click="handle(item.busino,item.id,0)">拒绝</el-button>
                        <el-button size="mini" @click="handle(item.busino,item.id,1)" class="accept-btn">接受</el-button>
                    </div>
                </div>
            </div>
        </div>
        <div style="text-align:center;margin-top: 40px;">
            <el-button @click="cancel" class="accept-btn">关闭</el-button>
        </div>
    </div>
</template>

<script>
import {api＿getCompanyInviteList, api＿getCompanyInviteHandle} from '@comm/request/api'
import {Button, Message} from 'element-ui'
export default {
    name: 'inviteNote',
    data () {
        return {
            inviteNoteList: [],
            getCompanyInviteList: api＿getCompanyInviteList({
                res: {
                    data: []
                }
            }),
            getCompanyInviteHandle: api＿getCompanyInviteHandle({
                res: {
                    data: []
                }
            })
        }
    },
    methods: {
        cancel () {
            this.$bus.$emit('closeInviteNote')
        },
        handle (inviteId, topMesId, isAccept) {
            this.getCompanyInviteHandle.getData({
                inviteId,
                topMesId,
                isAccept
            }).then(res => {
                if (res.code === 1) {
                    Message({
                        message: res.infoMsg,
                        type: 'success'
                    })
                    this.getCompanyInviteList.getData()
                } else {
                    Message({
                        message: res.infoMsg,
                        type: 'error'
                    })
                }
            })
        }
    },
    created () {
        this.getCompanyInviteList.getData()
        this.getCompanyInviteList.subscribe(res => {
            if (res.code === '1' && res.data.length) {
                this.inviteNoteList = res.data
            } else {
                this.$bus.$emit('noInviteNote')
            }
        })
    },
    components: {
        ElButton: Button
    }
}
</script>

<style lang="scss" scoped>
.invite-note{
    h2{
        font-size:24px;
        margin-bottom:45px;
        line-height: 26px;
    }
    width: 800px;
    margin: 75px auto 0;
    padding: 30px;
    border: 1px solid rgba(0,0,0,.2);
    border-radius: 6px;
    outline: 0;
    box-shadow: 0 5px 15px rgba(0,0,0,.5);
    background-color: #fff;
    color:rgba(0, 0, 0, 0.7);
    .invite-list{
        margin:20px;
        height: calc(100vh - 350px);
        overflow:auto;
        .invite-item{margin-bottom:10px;border:1px solid rgb(220,220,220);border-radius:2px;padding:15px;}
        .accept-btn{color:white;border:1px solid #2abdb5;background: #2abdb5;}
    }
}
</style>
