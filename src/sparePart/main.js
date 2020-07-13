import Vue from 'vue'
import App from '@sparePart/App'
import router from '@sparePart/router'
import VueBus from 'vue-bus'
import '@sparePart/projectConfig'

Vue.use(VueBus)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})
