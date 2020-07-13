import Vue from 'vue'
import App from '@messageManage/App'
import router from '@messageManage/router'
import VueBus from 'vue-bus'
import '@messageManage/projectConfig'

Vue.use(VueBus)

Vue.config.productionTip = false
document.body.removeChild(document.getElementById('gloablLoading'))
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})
