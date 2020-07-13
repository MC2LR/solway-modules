export default {
    data () {
        this._darkBlue = {
            $pageStatusNameColor: '#fff',
            $statusColor0: '#3fad22',
            $statusColor1: '#db412f',
            $statusColor2: '#f90',
            $statusColor3: '#999',
            $statusColor4: '#8ADCF7',
            $statusColor5: '#5eb7da',
            $statusColor6: '#fff'
        }
        this._light = {
            $pageStatusNameColor: '#fff'
        }
        this._dark = {
            $pageStatusNameColor: '#fff'
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
