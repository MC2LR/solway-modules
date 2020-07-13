// import { independent } from '@comm/tools/env'
// import {api＿logout} from '@comm/request/api'
// import goLoging from '@comm/tools/goLogin'

// function xx () {
//     window.opener = null
//     window.open('', '_self', '')
//     window.close()
//     api＿logout()
//     location.href = 'about:blank'
// }

// if (!independent) {
//     if (window.localStorage.hasWindow) {
//         alert('检测到多窗口访问系统或异常退出系统，请关闭或重新登录。')
//         window.localStorage.hasWindow = ''
//         if (confirm('确定继续访问将重新登录系统')) {
//             api＿logout.subscribe(() => goLoging())
//         } else {
//             xx()
//         }
//     } else {
//         window.addEventListener('beforeunload', function (e) {
//             window.localStorage.hasWindow = ''
//         })
//         window.localStorage.hasWindow = 'true'
//     }
// }
