import vue from 'vue'
import devicePopUp from './device'
import store from '@/store'

const SwitchStationComponent = vue.extend(devicePopUp)

function showSwitchStation ({stid, eqid}, defaultTab) {
    const toastDom = new SwitchStationComponent({
        store,
        el: document.createElement('div'),
        props: {
            stid: {
                type: Number,
                default: stid
            },
            eqid: {
                type: Number,
                default: eqid
            },
            defaultTab: {
                type: String,
                default: defaultTab
            }
        },
        destroyed () {
            document.body.removeChild(toastDom.$el)
        }
    })
    document.body.appendChild(toastDom.$el)
}

export default showSwitchStation
