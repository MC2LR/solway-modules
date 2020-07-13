export default [
    {
        // 数据查询
        path: '/dataQuery',
        name: 'dataQuery',
        redirect: { name: 'iframeModule', query: { path: 'dataQuery' } }
    },
    // {
    //     // 合同管理
    //     path: '/contractManage',
    //     name: 'contractManage',
    //     redirect: { name: 'iframeModule', query: { path: 'contractManage' } }
    // },
    {
        // 状态调整
        path: '/runStatus',
        name: 'runStatus',
        redirect: { name: 'iframeModule', query: { path: 'runStatus' } }
    },
    {
        // 智能视频
        path: '/smartVideo',
        name: 'smartVideo',
        redirect: { name: 'iframeModule', query: { path: 'smartVideo' } }
    }
]
