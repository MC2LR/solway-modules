import '@comm/tools/store'
import '@comm/assets/css/reset.css'
import '@comm/tools/dateFormatter'
// import '@comm/projectConfig/singleWindow'
// import czcPush from '@comm/projectConfig/cnzz'
import '@comm/projectConfig/iconfont'
import './iconfont'
import { Loading } from 'element-ui'
// import {changeTheme} from '@comm/assets/themes'
import Vue from 'vue'
import { addCss, addJs } from '@comm/tools/addCssJs'
import { independent } from '@comm/tools/env'
const echarts = require('echarts/lib/echarts')
const staticSrc = independent ? '/static/static-wechatOfficialAccounts' : '/module/wechatOfficialAccounts/static'

addCss(staticSrc + '/wxCss/weui.min.css')
addJs(staticSrc + '/wxCss/weui.min.js')

Vue.use(Loading.directive)
Vue.prototype.$echarts = echarts
Vue.prototype.$loading = Loading.service
Vue.prototype.$timeout = num => new Promise((resolve, reject) => setTimeout(() => resolve(), num))

// changeTheme()

// export {czcPush}
