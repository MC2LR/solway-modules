<template>
    <div class="container">
        <component :is="outerComponent"></component>
        <aside-menu theme="darkBlue" :fullpage="true"></aside-menu>
        <iframe :key="iframeKey" ref="myIframe" @load="iframeOnLoad" class="iframe" :src="src" frameborder="0"></iframe>
    </div>
</template>

<script>
/**
 * 这个页面主要用来引入其他模块打包后的module文件夹的模块，并实现权限控制。权限控制在router/iframeRouter 控制
 * 每个页面可以自定义遮罩样式
 * 开发环境访问其他模块页面，需要配置并启动相关模块，不配置默认启动老系统访问的是本地8888端口。生产没问题
 * 开发环境菜单超级权限后刷新才能查看其他模块。生产没问题
*/
import AsideMenu from '@/components/AsideMenu'
import localDevelopment from './development'
import v2module from './2.0default'
const outerComponents = {
    v2defaultOuterComponent: () => import('./outerComponents/2.0default'),
    emptyOuterComponent: () => import('./outerComponents/empty')
}
export default {
    props: ['path'],
    components: {
        AsideMenu,
        ...outerComponents
    },
    data () {
        return {
            iframeKey: Math.random(),
            loaded: false
        }
    },
    computed: {
        outerComponent () {
            if (outerComponents[this.path]) return outerComponents[this.path]
            if (v2module.includes(this.path)) return 'v2defaultOuterComponent'
            return 'emptyOuterComponent'
        },
        rootPath () {
            return '/module/' + this.path
        },
        src () {
            if (process.env.NODE_ENV === 'development') {
                if (localDevelopment[this.path]) return localDevelopment[this.path]
                this.$message('开发环境，请配置开发地址。当前查看为：本地8080')
                return '//local.solway.cn:8888' + this.rootPath
            }
            return location.origin + this.rootPath
        }
    },
    mounted () {
        window.addEventListener('message', this.iframeOnLoad)
    },
    methods: {
        iframeOnLoad (e) {
            if (this.loaded) {
                if (process.env.NODE_ENV === 'development') return
                this.iframeKey = Math.random()
            }
            this.loaded = true
        }
    },
    watch: {
        rootPath (newValue, oldValue) {
            if (oldValue && newValue) {
                if (oldValue !== newValue) {
                    this.loaded = false
                }
            }
        }
    },
    beforeDestroy () {
        window.removeEventListener('message', this.iframeOnLoad)
    }
}
</script>

<style lang="scss" scoped>
.container {
    position: relative;
    height: 100vh;

    iframe.iframe {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100vh;
        overflow: auto;
    }
}
</style>
