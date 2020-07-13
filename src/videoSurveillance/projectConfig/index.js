import '@comm/tools/store'
import '@comm/assets/css/reset.css'
import '@comm/assets/themes/globalTheme.css'
import '@/assets/themes/globalTheme.css'
import '@comm/assets/themes/table/tableScroll.css'
import '@comm/tools/dateFormatter'
// import '@comm/projectConfig/singleWindow'
import czcPush from '@comm/projectConfig/cnzz'
import '@comm/projectConfig/iconfont'
import './iconfont'
import { Loading, Message } from 'element-ui'
import {changeTheme} from '@comm/assets/themes'
import { optionalChaining } from '@comm/tools'
import Vue from 'vue'
import jQuery from 'jquery'
// const echarts = require('echarts/lib/echarts')
window.$ = window.jQuery = jQuery
Vue.use(Loading.directive)
Vue.prototype.$message = Message
Vue.prototype.$loading = Loading.service
Vue.prototype.$oc = optionalChaining
Vue.prototype.$timeout = num => new Promise((resolve, reject) => setTimeout(() => resolve(), num))

changeTheme()

export {czcPush}
