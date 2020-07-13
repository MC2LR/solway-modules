/**
 * 在文档中添加一条样式表规则（这可能是动态改变 class 名的更好的实现方法，
 * 使得 style 样式内容可以保留在真正的样式表中，以斌面添加额外的元素到 DOM 中）。
 * 注意这里有必要声明一个数组，因为 ECMAScript 不保证对象按预想的顺序遍历，
 * 并且 CSS 也是依赖于顺序的。
 * 类型为数组的参数 decls 接受一个 JSON 编译的数组。
 * @example
addStylesheetRules([
  ['h2', // 还接受第二个参数作为数组中的数组
    ['color', 'red'],
    ['background-color', 'green', true] // 'true' for !important rules
  ],
  ['.myClass',
    ['background-color', 'yellow']
  ]
]);
 */
function addStylesheetRules (decls, styleId) {
    if (document.getElementById(styleId)) return
    const style = document.createElement('style')
    style.setAttribute('id', styleId)
    document.getElementsByTagName('head')[0].appendChild(style)
    if (!window.createPopup) { /* For Safari */
       style.appendChild(document.createTextNode(''))
    }
    const s = document.styleSheets[document.styleSheets.length - 1]
    for (let i = 0, dl = decls.length; i < dl; i++) {
        let j = 1
        let decl = decls[i]
        const selector = decl[0]
        let rulesStr = ''
        if (Object.prototype.toString.call(decl[1][0]) === '[object Array]') {
            decl = decl[1]
            j = 0
        }
        for (var rl = decl.length; j < rl; j++) {
            var rule = decl[j]
            rulesStr += rule[0] + ':' + rule[1] + (rule[2] ? ' !important' : '') + ';\n'
        }

        if (s.insertRule) {
            s.insertRule(selector + '{' + rulesStr + '}', s.cssRules.length)
        } else { /* IE */
            s.addRule(selector, rulesStr, -1)
        }
    }
}

export default addStylesheetRules
