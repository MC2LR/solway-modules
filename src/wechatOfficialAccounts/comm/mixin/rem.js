import { getRem } from '@comm/tools'
const win = window
export default {
    mounted () {
        this.__setRem()
        win.addEventListener('resize', this.__setRem)
    },
    methods: {
        __setRem () {
            getRem(375, 100)
        }
    },
    beforeDestroy () {
        win.removeEventListener('resize', this.__setRem)
        document.documentElement.style.fontSize = ''
    }
}
