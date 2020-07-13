import '@comm/tools/store'
import '@comm/assets/css/reset.css'
import '@comm/assets/themes/globalTheme.css'
import '@comm/assets/themes/table/tableScroll.css'
import '@comm/tools/dateFormatter'
import '@comm/projectConfig/singleWindow'
// import czcPush from '@comm/projectConfig/cnzz'
import '@comm/projectConfig/iconfont'
import switchStation from '@/components/station/switchStation'
import { optionalChaining } from '@comm/tools'
import '@comm/directive/fullPage'

import './iconfont'
import {
     DatePicker
    , Row
    , Col
    , Loading
    , Tooltip
    , Popover
    , Badge
    , Dialog
    , Input
    , Tabs
    , TabPane
    , Message
    , MessageBox
    , Select
    , Option
    , Table
    , TableColumn
    , Form
    , FormItem
    , ButtonGroup
    , Button
    , Checkbox
    , CheckboxGroup
    , Pagination
    , InputNumber
    , RadioGroup
    , Radio
    , Divider
    , TimePicker
    , Progress
} from 'element-ui'
import {changeTheme} from '@comm/assets/themes'
import Vue from 'vue'
import jQuery from 'jquery'
const echarts = require('echarts/lib/echarts')
Vue.prototype.$echarts = echarts
window.$ = window.jQuery = jQuery

// Element Ui
Vue.use(DatePicker)
Vue.use(Progress)
Vue.use(Row)
Vue.use(Col)
Vue.use(Badge)
Vue.use(TimePicker)
Vue.use(Tooltip)
Vue.use(Popover)
Vue.use(Dialog)
Vue.use(Input)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Loading.directive)
Vue.use(Select)
Vue.use(Option)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(ButtonGroup)
Vue.use(Button)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Pagination)
Vue.use(InputNumber)
Vue.use(RadioGroup)
Vue.use(Radio)
Vue.use(Divider)
Vue.prototype.$loading = Loading.service
Vue.prototype.$message = Message
Vue.prototype.$MessageBox = MessageBox
Vue.prototype.$timeout = num => new Promise((resolve, reject) => setTimeout(() => resolve(), num))
Vue.prototype.$oc = optionalChaining
Vue.prototype.$useful = (attr, fill = '') => (attr === void 0 || attr === null) ? fill : attr
Vue.use(switchStation)

changeTheme()

// export {czcPush}
