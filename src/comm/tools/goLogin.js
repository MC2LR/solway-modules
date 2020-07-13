import { independent } from '@comm/tools/env'
export default () => {
    if (independent) {
        window.location.href = '//' + window.location.host + `/static/static-${process.env.name}/login.html?_=` + Math.random()
    } else {
        window.location.href = '//' + window.location.host + '/login.html?_=' + Math.random()
    }
}
