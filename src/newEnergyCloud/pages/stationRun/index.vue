<template>
    <component :is="pageName"></component>
</template>

<script>
export default {
    components: {
        pvStationPage: () => import('./pvStation/index'),
        pvCompanyPage: () => import('./pvCompany/index'),
        wpStationPage: () => import('./wpStation/index'),
        wpCompanyPage: () => import('./wpCompany/index')
    },
    computed: {
        pageName () {
            switch (this.$store.getters.station_data_type) {
                case 'PV_STATION':
                    return 'pvStationPage'
                case 'PV_COMPANY':
                    return 'pvCompanyPage'
                case 'WP_STATION':
                    return 'wpStationPage'
                case 'WP_COMPANY':
                    return 'wpCompanyPage'

                default:
                    return null
            }
        }
    }
}
</script>
