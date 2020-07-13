import Vue from 'vue'
import App from '@/App'
import store from '@/store'
import router from '@/router'
import VueBus from 'vue-bus'
import '@/projectConfig'

Vue.use(VueBus)

Vue.config.productionTip = false
document.body.removeChild(document.getElementById('gloablLoading'))
Vue.prototype.$loading({
    text: '资源已就绪\n数据初始化...'
})

/* eslint-disable no-new */
;
(async () => {
    await store.dispatch('user/initUserInfo')
    new Vue({
        el: '#app',
        router,
        store,
        render: h => h(App)
    })
})()
