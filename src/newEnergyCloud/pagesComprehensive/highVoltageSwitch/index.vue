<template>
    <div class="highVoltageSwitch">
        <child-header></child-header>
        <child-section></child-section>
        <section-switch></section-switch>
    </div>
</template>

<script>
import ChildHeader from './header'
import childSection from './section/section'
import sectionSwitch from './sectionSwitch'

export default {
    components: {
        childSection,
        sectionSwitch,
        ChildHeader
    },
    data () {
        return {

        }
    }
}
</script>

<style lang="scss" scoped>
.highVoltageSwitch {
    padding: 10px;
    height: calc(100vh - 67px);
}
</style>
