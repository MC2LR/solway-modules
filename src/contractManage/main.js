import Vue from 'vue'
import App from '@contractManage/App'
import router from '@contractManage/router'
import VueBus from 'vue-bus'
import '@contractManage/projectConfig'

Vue.use(VueBus)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})
