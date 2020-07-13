document.addEventListener('keydown', check)
function check (e) {
    if (!e) e = window.event
    var obj = e.srcElement ? e.srcElement : e.target
    var keycode = e.keyCode ? e.keyCode : e.which
    if (
        ((keycode === 8) && // BackSpace
        ((obj.type !== 'text' &&
            obj.type !== 'textarea' &&
            obj.type !== 'password') ||
            obj.readOnly === true))
            // || ((e.ctrlKey) && ((keycode === 78) || (keycode === 82))) || // CtrlN,CtrlR
            // (keycode === 116)
    ) { // F5
        if (window.event) {
            event.keyCode = 0
            event.returnValue = false
        } else {
            e.preventDefault()
        }
    }
    return true
}
