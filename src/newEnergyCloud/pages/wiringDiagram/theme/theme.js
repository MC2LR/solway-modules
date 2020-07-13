export default {
    data () {
        this._darkBlue = {
            $footAreaBorderColor: '#d3d3d4'
        }
        this._light = {
            $footAreaBorderColor: '#d3d3d4'
        }
        this._dark = {
            $footAreaBorderColor: '#39393a'
        }
        return {}
    },
    computed: {
        theme () {
            return this['_' + this._pageTheme] || {}
        },
        _pageTheme () {
            if (this.$route.meta?.pageTheme?.some(v => v === this.$store.getters.global_theme)) return this.$store.getters.global_theme
            return this.$route.meta?.pageTheme?.[0] || this.$store.getters.global_theme
        }
    }
}
