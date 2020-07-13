<template>
    <component :is="pageName"></component>
</template>

<script>
export default {
    components: {
        PvStation: () => import('./pvStation'),
        WpStation: () => import('./wpStation')
    },
    computed: {
        pageName () {
            return this.$store.getters.station_data_type.split('_').map(v => this.firstWoldUpperCase(v.toLocaleLowerCase())).join('')
        }
    },
    methods: {
        firstWoldUpperCase (str) {
            return str.charAt(0).toUpperCase() + str.slice(1)
        }
    }
}
</script>
