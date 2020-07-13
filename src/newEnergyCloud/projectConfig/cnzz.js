import { isProduction } from '@comm/tools/env'
import { addJs } from '@comm/tools/addCssJs'
import store from '@newEnergyCloud/store'

const win = window

const callback = () => {
    win._czc.push(['_setAutoPageview', false])
    // win._czc.push(['_trackPageview', '?_=' + Date.now() + '_$_' + win.localStorage.username + win.location.pathname + win.location.hash, '/'])
}

if (isProduction) {
    addJs('//s4.cnzz.com/z_stat.php?id=1278811917&web_id=1278811917', callback)
} else {
    addJs('//s5.cnzz.com/z_stat.php?id=1277802183&web_id=1277802183', callback)
}

export default (from, to) => {
    if (win._czc) {
        win._czc.push(['_trackPageview', '?_=' + Date.now() + '_$_' + store.getters.real_name + '_' + store.getters.user_phone + win.location.pathname + '#/' + to.path, from.path])
    }
}
