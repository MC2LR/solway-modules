export default {
    data () {
        this._darkBlue = {
            $sectionWaterColor: '#fff',
            $axisTextColor: 'rgba(255,255,255,0.7)'
        }
        this._light = {
            $sectionWaterColor: '#606369',
            $axisTextColor: 'rgba(96,99,105,0.8)'
        }
        this._dark = {
            $sectionWaterColor: '#2FBFCC',
            $axisTextColor: 'rgba(44,175,189,1)'
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
