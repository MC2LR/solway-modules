export default {
    data () {
        this._darkBlue = {
            $axisTextColor: 'rgba(26,127,161,1)',
            $textColor: 'rgba(45,183,195,1)'
        }
        this._light = {
            $axisTextColor: 'rgba(110, 110,110,0.5)',
            $textColor: '#73767C'
        }
        this._dark = {
            $axisTextColor: 'rgba(45,183,195,0.5)',
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
