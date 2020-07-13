import '@comm/tools/store'
import '@comm/assets/css/reset.css'
import '@comprehensiveEnergy/assets/themes/globalTheme.css'
import '@comm/assets/themes/table/tableScroll.css'
import '@comm/tools/dateFormatter'
import '@comm/projectConfig/singleWindow'
import czcPush from '@comm/projectConfig/cnzz'
import '@comm/projectConfig/iconfont'
import './iconfont'
import { Loading } from 'element-ui'
import {changeTheme} from '@comm/assets/themes'
import Vue from 'vue'
const echarts = require('echarts/lib/echarts')

Vue.use(Loading.directive)
Vue.prototype.$loading = Loading.service
Vue.prototype.$echarts = echarts
Vue.prototype.$timeout = num => new Promise((resolve, reject) => setTimeout(() => resolve(), num))

changeTheme()

export {czcPush}
