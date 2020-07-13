import vue from 'vue'
import switchStation from './switchStation'
import store from '@/store'

const SwitchStationComponent = vue.extend(switchStation)

function showSwitchStation (types = ['PV_STATION', 'PV_COMPANY', 'WP_STATION', 'WP_COMPANY']) {
    let _resolve
    const toastDom = new SwitchStationComponent({
        store,
        el: document.createElement('div'),
        props: {
            types: {
                type: [String, Array],
                default () {
                    return [].concat(types)
                }
            }
        },
        data () {
            return {
                hideBtn: true,
                dialogVisible: true
            }
        },
        watch: {
            dialogVisible (newValue) {
                if (newValue === false) {
                    setTimeout(() => {
                        this.$destroy()
                        _resolve(this.result)
                    }, 400)
                }
            }
        },
        destroyed () {
            document.body.removeChild(toastDom.$el)
        }
    })
    document.body.appendChild(toastDom.$el)
    return new Promise(resolve => { _resolve = resolve })
}

function registrySwitchStation () {
    vue.prototype.$switchStation = showSwitchStation
}

export { showSwitchStation }

export default registrySwitchStation
