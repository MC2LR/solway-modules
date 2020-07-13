<template>
    <div class="put-in-storage-detail" v-loading="opWorkFittingsReqTasks.loading">
        <el-steps
            direction="vertical"
            :space="80"
            :active="opWorkFittingsReqTasks.res.body.length">
            <el-step
                v-for="item in opWorkFittingsReqTasks.res.body"
                :key="item.id"
                :title="item.content">
                <div slot="description">
                    <p>备注：{{item.suggest}}</p>
                </div>
            </el-step>
        </el-steps>
    </div>
</template>

<script>
import {api＿opWorkFittingsReqTasks} from '@sparePart/request/api'
import {Steps, Step} from 'element-ui'

export default {
    props: {
        row: {
            type: Object,
            required: true
        }
    },
    data () {
        return {
            opWorkFittingsReqTasks: api＿opWorkFittingsReqTasks({
                data: {
                    id: this.row.id
                },
                res: {
                    body: []
                }
            })
        }
    },
    components: {
        ElSteps: Steps,
        ElStep: Step
    }
}
</script>

<style lang="scss">
.put-in-storage-detail {
    @import '@comm/assets/themes/table/t2.scss';
}
</style>

<style lang="scss" scoped>
.put-in-storage-detail {
    @include c(color, $text_c2);

    .header {
        span {
            margin-right: 50px;

            &:last-child {
                margin-right: 0;
            }
        }
    }

    .list {
        margin: 20px 0;
    }
}
</style>
