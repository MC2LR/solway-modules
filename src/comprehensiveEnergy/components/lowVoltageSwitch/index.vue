<template>
    <div class="highVoltageSwitch">
        <child-section></child-section>
        <section-switch></section-switch>
    </div>
</template>

<script>
import childSection from './section/section'
import sectionSwitch from './sectionSwitch'

export default {
    components: {
        childSection,
        sectionSwitch
    },
    data () {
        return {

        }
    }
}
</script>

<style lang="scss" scoped>
.highVoltageSwitch {
    padding: 10px 30px;
    height: calc(100vh - 67px);
}
</style>
