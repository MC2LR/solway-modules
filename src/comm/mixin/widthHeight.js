const win = window
export default {
    data () {
        return {
            vw: win.innerWidth,
            vh: win.innerHeight
        }
    },
    created () {
        win.addEventListener('resize', this.__setWh)
    },
    methods: {
        __setWh () {
            this.vw = win.innerWidth
            this.vh = win.innerHeight
        }
    },
    beforeDestroy () {
        win.removeEventListener('resize', this.__setWh)
    }
}
