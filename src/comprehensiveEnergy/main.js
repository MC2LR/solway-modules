import Vue from 'vue'
import App from '@comprehensiveEnergy/App'
import router from '@comprehensiveEnergy/router'
import VueBus from 'vue-bus'
import '@comprehensiveEnergy/projectConfig'
import store from '@comprehensiveEnergy/store'

Vue.use(VueBus)

document.body.removeChild(document.getElementById('gloablLoading'))
Vue.config.productionTip = false

store.dispatch('stationInfo')

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
