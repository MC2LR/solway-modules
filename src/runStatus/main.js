import Vue from 'vue'
import App from '@runStatus/App'
import router from '@runStatus/router'
import VueBus from 'vue-bus'
import '@runStatus/projectConfig'

Vue.use(VueBus)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})
