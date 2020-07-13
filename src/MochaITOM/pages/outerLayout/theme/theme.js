export default {
    data () {
        this._darkBlue = {
            $bg: '#131F32'
        }
        this._light = {
            $bg: '#edeff9'
        }
        this._dark = {
            $bg: '#131F32'
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
