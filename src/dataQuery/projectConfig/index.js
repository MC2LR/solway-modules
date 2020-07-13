import '@comm/projectConfig/singleWindow'
import '@comm/tools/store'
import '@/assets/css/reset.css'
import '@/assets/themes/globalTheme.css'
import {changeTheme} from '@/assets/themes'
import '@comm/projectConfig/iconfont'
import './iconfont'
import czcPush from '@comm/projectConfig/cnzz'
import Vue from 'vue'
import { Loading } from 'element-ui'

Vue.use(Loading.directive)
Vue.prototype.$loading = Loading.service

changeTheme()

export {czcPush}
