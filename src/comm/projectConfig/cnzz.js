import {isProduction} from '@comm/tools/env'
import {addJs} from '@comm/tools/addCssJs'

const win = window

const callback = () => {
    win._czc.push(['_setAutoPageview', false])
    // win._czc.push(['_trackPageview', '?_=' + Date.now() + '_$_' + win.localStorage.username + win.location.pathname + win.location.hash, '/'])
}

if (isProduction) {
    addJs('//s96.cnzz.com/z_stat.php?id=1277657171&web_id=1277657171', callback)
} else {
    addJs('//s5.cnzz.com/z_stat.php?id=1277802183&web_id=1277802183', callback)
}

export default (from, to) => {
    if (win._czc) {
        win._czc.push(['_trackPageview', '?_=' + Date.now() + '_$_' + win.localStorage.username + win.location.pathname + '#/' + to.path, from.path])
    }
}
