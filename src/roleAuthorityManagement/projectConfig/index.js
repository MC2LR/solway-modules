import '@comm/tools/store'
import '@comm/assets/css/reset.css'
import '@comm/assets/themes/globalTheme.css'
import '@comm/assets/themes/table/tableScroll.css'
import '@comm/tools/dateFormatter'
import '@comm/projectConfig/singleWindow'
import czcPush from '@comm/projectConfig/cnzz'
import '@comm/projectConfig/iconfont'
import './iconfont'
import {changeTheme} from '@comm/assets/themes'
import Vue from 'vue'
import { Loading, Pagination } from 'element-ui'

import jQuery from 'jquery'
window.$ = window.jQuery = jQuery

Vue.use(Loading.directive)
Vue.use(Pagination)
Vue.prototype.$loading = Loading.service
Vue.prototype.$timeout = num => new Promise((resolve, reject) => setTimeout(() => resolve(), num))

changeTheme()

export {czcPush}
