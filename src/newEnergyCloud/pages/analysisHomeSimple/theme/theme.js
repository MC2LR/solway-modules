export default {
    data () {
        this._darkBlue = {
            $textColor: 'rgba(45,183,195,1)'
        }
        this._light = {
            $textColor: 'rgba(110, 110,110,0.5)'
        }
        this._dark = {
            $textColor: 'rgba(45,183,195,1)'
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
