export default {
    data () {
        this._darkBlue = {
            $pageStatusNameColor: '#fff',
            $pageDeviceStatusBorderColor: 'transparent'
        }
        this._light = {
            $pageStatusNameColor: '#2FBFCC',
            $pageDeviceStatusBorderColor: 'transparent'
        }
        this._dark = {
            $pageStatusNameColor: '#2FBFCC',
            $pageDeviceStatusBorderColor: 'rgba(52, 210, 238, 0.5)'
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
