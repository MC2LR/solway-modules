const reloadTime = [
    '00:00',
    '00:30',
    '05:00',
    '06:00'
]
setInterval(function (params) {
    let dateTimeStr = (new Date()).Format('yyyy-MM-dd hh:mm').substr(-5)
    if (reloadTime.indexOf(dateTimeStr) > -1) window.location.reload()
    dateTimeStr = null
}, 55 * 1000)
