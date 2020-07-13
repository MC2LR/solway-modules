import Vue from 'vue'
import store from '@/store'
import router from '@/router'

export default (Ele, x = 0, y = 0, z = 2) => {
    const Component = Vue.extend({
        router,
        store,
        destroyed () {
            document.body.removeChild(this.$el)
        },
        render () {
            return <Ele style={{position: 'fixed', left: x, top: y, zIndex: z}}></Ele>
        }
    })
    const extendComponent = new Component().$mount()
    document.body.appendChild(extendComponent.$el)
    return extendComponent
}
