export default {
    data () {
        this._darkBlue = {
            $axisTextColor: 'rgba(26,127,161,1)',
            $chartTextColor: 'rgba(45,183,195,1)'
        }
        this._light = {
            $axisTextColor: 'rgba(110, 110,110,0.5)',
            $chartTextColor: 'rgba(110, 110,110,0.5)'
        }
        this._dark = {
            $axisTextColor: 'rgba(26,127,161,1)',
            $chartTextColor: '#BDC0C5'
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
