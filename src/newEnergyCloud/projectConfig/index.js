import '@comm/tools/store'
import '@comm/assets/css/reset.css'
import '@comm/assets/themes/globalTheme.css'
import '@newEnergyCloud/assets/themes/globalTheme.css'
import '@comm/assets/themes/table/tableScroll.css'
import '@comm/tools/dateFormatter'
// import '@comm/projectConfig/singleWindow'
import czcPush from './cnzz'
import '@comm/projectConfig/iconfont'
import './iconfont'
import './iconfontHenan'
// 综合能源图标
import './iconfontComprehensive'
import '@systemModules/projectConfig/iconfont'
import switchStation from '@newEnergyCloud/components/station/switchStation'
import {changeTheme} from '@comm/assets/themes'
import { optionalChaining } from '@comm/tools'
// 定时刷新，防止隔天数据错误
import './timeReload'
// 浏览器退格键返回页面问题
import '@comm/tools/disableBackspace'
import '@comm/directive/fullPage'
import Vue from 'vue'
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
    , Transfer
} from 'element-ui'
import VeLine from 'v-charts/lib/line.common'
import VeHistogram from 'v-charts/lib/histogram.common'
import VeBar from 'v-charts/lib/bar.common'
import VePie from 'v-charts/lib/pie.common'
import VeScatter from 'v-charts/lib/scatter.common'
import VeGauge from 'v-charts/lib/gauge.common'

import jQuery from 'jquery'
const echarts = require('echarts/lib/echarts')
window.$ = window.jQuery = jQuery
Vue.prototype.$echarts = echarts

// v-charts
Vue.component(VeLine.name, VeLine)
Vue.component(VeHistogram.name, VeHistogram)
Vue.component(VeBar.name, VeBar)
Vue.component(VePie.name, VePie)
Vue.component(VeScatter.name, VeScatter)
Vue.component(VeGauge.name, VeGauge)

// Element Ui
Vue.use(DatePicker)
Vue.use(Row)
Vue.use(Col)
Vue.use(Badge)
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
Vue.use(Transfer)
Vue.prototype.$loading = Loading.service
Vue.prototype.$message = Message
Vue.prototype.$MessageBox = MessageBox
// 等待延时
Vue.prototype.$timeout = num => new Promise((resolve, reject) => setTimeout(() => resolve(), num))
Vue.prototype.$oc = optionalChaining
Vue.prototype.$useful = (attr, fill = '') => (attr === void 0 || attr === null) ? fill : attr

// 实例组件  切换电站弹窗
Vue.use(switchStation)

// 切换主题
changeTheme()

export {czcPush}
