export default {
    data () {
        this._darkBlue = {
            $pageStatusNameColor: '#fff'
        }
        this._light = {
            $pageStatusNameColor: '#2FBFCC'
        }
        this._dark = {
            $pageStatusNameColor: '#2FBFCC'
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
