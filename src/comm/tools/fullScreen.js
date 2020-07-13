function isFullscreen (el) {
    if (el) return (el.scrollHeight === window.screen.height && el.scrollWidth === window.screen.width) || false
    return document.fullScreenElement || document.msFullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || (document.body.scrollHeight === window.screen.height && document.body.scrollWidth === window.screen.width) || false
}

function requestFullScreen (element = document.documentElement) {
    var requestMethod = element.requestFullScreen ||
        element.webkitRequestFullScreen ||
        element.mozRequestFullScreen ||
        element.msRequestFullScreen
    if (requestMethod) {
        requestMethod.call(element)
    } else if (typeof window.ActiveXObject !== 'undefined') {
        var wscript = new window.ActiveXObject('WScript.Shell')
        if (wscript !== null) {
            wscript.SendKeys('{F11}')
        }
    }
}

function exitFull () {
    var exitMethod = document.exitFullscreen ||
        document.mozCancelFullScreen ||
        document.webkitExitFullscreen ||
        document.webkitExitFullscreen
    if (exitMethod) {
        exitMethod.call(document)
    } else if (typeof window.ActiveXObject !== 'undefined') {
        var wscript = new window.ActiveXObject('WScript.Shell')
        if (wscript !== null) {
            wscript.SendKeys('{F11}')
        }
    }
}

export {
    requestFullScreen,
    exitFull,
    isFullscreen
}
