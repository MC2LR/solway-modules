<template>
    <form-json-create :option="solwayOption" :rule="solwayRule" :edit="edit" :expand="all_expand"></form-json-create>
</template>

<script>
import formJsonCreate from './formJsonCreate'
import * as ajax from '@comm/request/http'
import {baseApi} from '@comm/request/api'
import Vue from 'vue'
import { Button, Form, FormItem, Row, Col, Input, Select, Option, DatePicker } from 'element-ui'
Vue.component(Button.name, Button)
Vue.component(Form.name, Form)
Vue.component(FormItem.name, FormItem)
Vue.component(Row.name, Row)
Vue.component(Col.name, Col)
Vue.component(Input.name, Input)
Vue.component(Select.name, Select)
Vue.component(Option.name, Option)
Vue.component(DatePicker.name, DatePicker)

export default {
    props: {
        option: {
            type: Object
        },
        rule: {
            type: Array
        },
        edit: {
            type: Boolean,
            default: false
        },
        expand: {
            type: Object,
            default () {
                return {}
            }
        }
    },
    components: {
        formJsonCreate
    },
    data () {
        return {
            solwayRule: this.getRule(),
            solwayOption: this.getOption(),
            all_expand: {$solwayApi: ajax, $baseApi: baseApi, ...this.expand}
        }
    },
    methods: {
        getRule () {
            return this.rule.map(v => {
                let expandConfig = {}
                try {
                    expandConfig = JSON.parse(v.attrConfig || '{}')
                } catch (error) {
                    console.error(v.fdDesc + '：扩展配置不是一个有效的json')
                    expandConfig = {}
                }

                let attrValidator = []
                try {
                    attrValidator = JSON.parse(v.attrValidator || '[]')
                } catch (error) {
                    console.error(v.fdDesc + '：校验不是一个有效的json')
                    attrValidator = []
                }

                return {
                    field: v.fdCode,
                    title: v.fdDesc + (v.fdUnit ? '(' + v.fdUnit + ')' : ''),
                    type: this.getType(v.attrType),
                    props: this.getProps(v || {}, v.attrType, expandConfig.props),
                    value: this.getDefaultValue(v || {}, v.attrType),
                    validate: (v.attrRequired ? [{ required: true, message: v.fdDesc + '必填', trigger: 'blur' }] : []).concat(attrValidator),
                    col: expandConfig.col,
                    attrDataUrl: v.attrDataUrl,
                    attrConfig: v.attrConfig,
                    on: {
                        change: `function (val) {
                            var cid = '${expandConfig.cid}';
                            if (!cid || (cid === 'undefined')) return;
                            var c_rule = $f.getRule(cid);
                            if (!c_rule.attrDataUrl) return;
                            $f.setValue({ [cid]: '' })
                            var param_required = ${expandConfig.param_required}
                            param_required = param_required === 'undefined' ? '' : param_required
                            var param = param_required ? (attrConfig.param_required.map(function (p) {
                                return '&' + p + '=' + api_all_params[p];
                            })) : '';
                            $solwayApi.get($baseApi + c_rule.attrDataUrl + '&pid=' + val + param).then(function (res) {
                                $f.updateRule(cid, {
                                    options: (res.data || res.body || []).map(function (v) {
                                        return {
                                            label: v.name,
                                            value: v.id
                                        }
                                    })
                                })
                            })
                        }`
                    }
                }
            })
        },
        getOption () {
            return {
                onSubmit: `function (formData) {
                    formData.busiId = api_all_params.busiId;
                    formData.fmCode = api_all_params.fmCode;
                    $f.submitBtnProps({loading:true})
                    $solwayApi.postForm($baseApi + '/dynamic/form/business/update/field/val.htm', formData).then(function (res) {
                        $f.submitBtnProps({loading:false});
                        vm.$bus.emit('stationFormCreateSuccess', res);
                    });
                }`,
                writeBack: `function () {
                    $solwayApi.get($baseApi + "/dynamic/form/business/query/field/val.htm", {
                        fmCode: api_all_params.fmCode,
                        busiId: api_all_params.busiId
                    }).then(function (res) {
                        $f.setValue(res.data);
                    });
                }`,
                mounted: `function ($f) {
                    $f.fields().map(function (filedName) {
                        var rule = $f.getRule(filedName);
                        var attrConfig = JSON.parse(rule.attrConfig || '{}');
                        if (rule.attrDataUrl && !attrConfig.pid) {
                            var param = attrConfig.param_required ? (attrConfig.param_required.map(function (p) {
                                return '&' + p + '=' + api_all_params[p];
                            })) : '';
                            $solwayApi.get($baseApi + rule.attrDataUrl + param).then(function (res) {
                                $f.updateRule(filedName, {
                                    options: (res.data || res.body || []).map(function (v) {
                                        return {
                                            label: v.name,
                                            value: v.id
                                        }
                                    })
                                });
                            });
                        }
                    })
                }`,
                global: {
                    '*': {
                        col: {
                            span: 8
                        }
                    }
                },
                submitBtn: {
                    col: {
                        span: 4,
                        offset: 20
                    }
                },
                ...this.option
            }
        },
        getType (v) {
            const typeMap = {
                text: 'input',
                textarea: 'input',
                input: 'input',
                number: 'input',
                select: 'select',
                radio: 'select',
                date: 'DatePicker',
                datetime: 'DatePicker',
                time: 'TimePicker'
            }
            return typeMap[v] || v
        },
        getProps (o = {}, type, props) {
            switch (type) {
                case 'text':
                    return {
                        type: 'text',
                        placeholder: o.attrPlaceholder,
                        ...props
                    }
                case 'textarea':
                    return {
                        type: 'textrea',
                        placeholder: o.attrPlaceholder,
                        ...props
                    }

                case 'input':
                    return {
                        type: 'text',
                        placeholder: o.attrPlaceholder,
                        ...props
                    }

                case 'number':
                    return {
                        type: 'number',
                        placeholder: o.attrPlaceholder,
                        ...props
                    }

                case 'radio':
                    return {
                        placeholder: o.attrPlaceholder,
                        ...props
                    }

                case 'select':
                    return {
                        filterable: true,
                        multiple: !!o.attrMultiple,
                        placeholder: o.attrPlaceholder,
                        ...props
                    }

                case 'date':
                    return {
                        type: 'date',
                        format: o.attrFormat || 'yyyy-MM-dd',
                        style: 'width: 100%;',
                        placeholder: o.attrPlaceholder,
                        ...props
                    }

                case 'month':
                    return {
                        type: 'month',
                        format: o.attrFormat || 'yyyy-MM',
                        style: 'width: 100%;',
                        placeholder: o.attrPlaceholder,
                        ...props
                    }

                case 'year':
                    return {
                        type: 'year',
                        format: o.attrFormat || 'yyyy',
                        style: 'width: 100%;',
                        placeholder: o.attrPlaceholder,
                        ...props
                    }

                case 'datetime':
                    return {
                        type: 'datetime',
                        format: o.attrFormat || 'yyyy-MM-dd hh:mm:ss',
                        style: 'width: 100%;',
                        placeholder: o.attrPlaceholder,
                        ...props
                    }

                case 'time':
                    return {
                        type: 'time',
                        format: o.attrFormat || 'hh:mm:ss',
                        style: 'width: 100%;',
                        placeholder: o.attrPlaceholder,
                        ...props
                    }

                default:
                    return {...props}
            }
        },
        getDefaultValue (o = {}, type) {
            switch (type) {
                case 'text':
                    return o.attrDefVal || ''
                case 'textarea':
                    return o.attrDefVal || ''

                case 'input':
                    return o.attrDefVal || ''

                case 'number':
                    return o.attrDefVal || ''

                case 'radio':
                    return o.attrDefVal || void 0

                case 'select':
                    if (o.attrMultiple) {
                        return o.attrDefVal && o.attrMultiple.split(',')
                    } else {
                        return o.attrDefVal || void 0
                    }

                case 'date':
                    return o.attrDefVal && new Date(o.attrDefVal)

                case 'datetime':
                    return o.attrDefVal && new Date(o.attrDefVal)

                case 'time':
                    return o.attrDefVal && new Date(o.attrDefVal)

                default:
                    return {}
            }
        }
    }
}
</script>
