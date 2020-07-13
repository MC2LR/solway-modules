<template>
    <div class="home-nav">
        <div class="content">
            <div v-for="item in items" v-bind:key="item.pageName" class="btn">
                <router-link class="text" :to="{ name: item.routeName }">{{item.pageName}}</router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HomeNav',
    data () {
        return {
            items: [
                {
                    pageName: '设备运行日志查询',
                    routeName: 'deviceLogQuery'
                },
                // {
                //     pageName: '设备运行日志统计',
                //     routeName: 'deviceLogStatistics'
                // },
                {
                    pageName: '秒级数据查询',
                    routeName: 'deviceLogSecond'
                },
                {
                    pageName: '主题数据查询',
                    routeName: 'deviceLogTheme'
                }
            ]
        }
    },
    created () {
        this.$bus.$emit('pageName', '')
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .home-nav {
        .content {
            width: calc(100% - 60px);
            height: calc(100vh - 100px);
            background:linear-gradient(209deg,rgba(110,125,139,.1),rgba(100,140,183,.1),rgba(255,0,114,.1));
            margin: 12px auto;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            .btn {
                width:183px;
                height:59px;
                background:rgba(65,158,255,.2);
                border:2px solid rgba(162,207,255,.2);
                margin: 15px 0;
                cursor: pointer;

                .text {
                    display: block;
                    width:149px;
                    height:30px;
                    border:2px solid rgba(162,207,255,.2);
                    margin: 13px auto;
                    text-align: center;
                    line-height: 26px;
                    font-size: 14px;
                    box-shadow: 0 0 8px 5px inset rgba(162,207,255,.2);
                }

                &:hover {
                    background-color: rgba(65,204,157,.2);
                    border-color: rgba(118,223,217,.2);

                    .text {
                        border-color: rgba(67,205,164,.6);
                        box-shadow: 0 0 8px 5px inset rgba(67,205,164,.6);
                    }
                }
            }
        }
    }
</style>
