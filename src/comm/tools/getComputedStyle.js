function getStyle (element, attr) {
    if (!element) return attr ? '' : {}
    const style = element.currentStyle ? element.currentStyle : getComputedStyle(element, false)
    return attr ? style[attr] : style
}

export default getStyle
