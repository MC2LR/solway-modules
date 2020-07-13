export default {
    data () {
        this._darkBlue = {
            $a: 'blue'
        }
        this._light = {
            $a: 'white'
        }
        this._dark = {
            $a: 'black'
        }
        return {}
    },
    computed: {
        theme () {
            return this['_' + this.themeName] || {}
        },
        themeName () {
            if (this.$route.meta?.pageTheme?.some(v => v === this.$store.getters.global_theme)) return this.$store.getters.global_theme
            return this.$route.meta?.pageTheme?.[0] || this.$store.getters.global_theme
        }
    }
}
