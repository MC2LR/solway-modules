export default {
    rule: [
        {
            type: 'input',
            title: '商品名称',
            field: 'goods_name',
            value: 'iphone 7',
            col: {
                span: 12
            },
            props: {
                'type': 'text'
            },
            validate: [
                { required: true, message: '请输入goods_name', trigger: 'blur' }
            ]
        },
        {
            type: 'select',
            field: 'cate_id',
            title: '产品分类',
            value: [],
            col: {
                span: 12
            },
            options: [
                { 'value': '104', 'label': '生态蔬菜', 'disabled': false },
                { 'value': '105', 'label': '新鲜水果', 'disabled': false }
            ],
            props: {
                multiple: true
            },
            on: {
                change: `function (val) {
                    $f.updateRule('goods_name', {
                        value: val.toString()
                    })
                }`
            }
        }
    ],
    option: {
        onSubmit: `function (formData) {
            console.log('submit')
            $f.submitBtnProps({loading:true})
            setTimeout(function(){
                $f.submitBtnProps({loading:false})
                $f.destroy()
            }, 1000)
        }`,
        mounted: `function ($f) {

        }`
    }
}
