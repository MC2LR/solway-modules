import Vue from 'vue'
import {addStylesheetRules} from '@comm/tools'

Vue.directive('fullpage', {
    bind (el, binding) {
        function eventHandler (event) {
            if (binding.modifiers.ctrl && !event.ctrlKey) return
            if (binding.modifiers.alt && !event.altKey) return
            if (binding.modifiers.shift && !event.shiftKey) return
            if (binding.modifiers.meta && !event.metaKey) return
            const diffId = binding.expression || 'v-fullpage'
            // const diffId = 'v-fullpage' + (binding.expression?.replace(/\[|\]|\s|:|\.|,|'/g, '') || '')
            const rules = [
                [
                    '.' + diffId,
                    ['position', 'fixed', true],
                    ['left', '0', true],
                    ['top', '0', true],
                    ['right', '0', true],
                    ['bottom', '0', true],
                    ['width', '100%', true],
                    ['height', '100%', true],
                    ['z-index', '999']
                ]
            ]
            addStylesheetRules(rules, diffId)
            // addStylesheetRules(rules.concat(binding.value || []), diffId)
            const classList = el.className.split(' ')
            el.className = classList.some(v => v === diffId) ? classList.filter(v => v !== diffId).join(' ') : (el.className + (' ' + diffId))
            window.dispatchEvent(new Event('resize'))
        }
        el.__eventHandler__ = eventHandler
        el.addEventListener(binding.arg || 'dblclick', eventHandler)
        // const tooltipEl = document.createElement('div')
        // tooltipEl.className = 'v-fullpage-tooltip'
        // tooltipEl.innerText = '双击切换全屏'
        // console.log(el.style)
        // el.appendChild(tooltipEl)
    },
    inserted (el) {
        el.setAttribute('title', '双击全屏查看此区域')
        // console.log('inserted', el.getClientRects())
        // el.addEventListener('resize', () => {
        //     console.log('resize', el.getClientRects())
        // })
    },
    unbind (el, binding) {
        el.removeEventListener(binding.arg || 'dblclick', el.__eventHandler__)
        delete el.__eventHandler__
    }
})
