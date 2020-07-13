<template>
    <component :is="fullpage ? 'fullpage' : (theme || 'darkBlue')" :theme="theme" :retract="retract"></component>
</template>

<script>
export default {
    props: ['theme', 'fullpage', 'retract'],
    components: {
        light: () => import('./themes/lightMenu'),
        dark: () => import('./themes/darkMenu'),
        darkBlue: () => import('./themes/darkBlueMenu'),
        fullpage: () => import('./fullPageMenu')
    }
}
</script>
