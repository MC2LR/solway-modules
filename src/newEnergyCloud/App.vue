<template>
    <div id="app">
        <transition name="slide-fade">
            <router-view class="router-view" />
        </transition>
    </div>
</template>

<script>
export default {
    name: 'App',
    created () {
        document.documentElement.dataset.pagetheme = this.pagetheme
    },
    computed: {
        pagetheme () {
            if (this.$route.meta?.pageTheme?.some(v => v === this.$store.getters.global_theme)) return this.$store.getters.global_theme
            return this.$route.meta?.pageTheme?.[0] || this.$store.getters.global_theme
        }
    },
    watch: {
        pagetheme (val) {
            document.documentElement.dataset.pagetheme = val
        }
    }
}
</script>

<style>
#app {
    position: relative;
}
.router-view {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
}
.slide-fade-enter-active {
  transition: all .2s ease;
}
.slide-fade-leave-active {
  transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(1366px);
  opacity: 0;
}
</style>
