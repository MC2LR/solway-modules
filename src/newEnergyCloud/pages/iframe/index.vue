<template>
    <div class="container">
        <component :is="outerComponent"></component>
        <aside-menu theme="darkBlue" :fullpage="true"></aside-menu>
        <iframe ref="myIframe" id="myIframe" @load="iframeOnLoad" class="iframe" :src="src" frameborder="0"></iframe>
    </div>
</template>

<script>
/**
 * 这个页面主要用来展示兼容新能云2.0页面，并实现权限控制。权限控制在router/iframeRouter 控制
 * 每个页面可以自定义遮罩样式
 * 开发环境访问2.0页面，需要启动老系统访问的是本地8888端口。生产没问题
 * 开发环境菜单超级权限后刷新才能查看2.0版本页面。生产没问题
*/
import AsideMenu from '@/components/AsideMenu'
const outerComponents = {
    defaultOuterComponent: () => import('./outerComponents/default'),
    videoSurveillanceNew: () => import('./outerComponents/videoSurveillanceNew'),
    main: () => import('./outerComponents/main')
}
export default {
    props: ['path'],
    components: {
        AsideMenu,
        ...outerComponents
    },
    computed: {
        outerComponent () {
            return outerComponents[this.path] || 'defaultOuterComponent'
        },
        src () {
            if (process.env.NODE_ENV === 'development') {
                return '//local.solway.cn:8888' + '/#/' + this.path
            }
            return location.origin + '/#/' + this.path
        }
    },
    mounted () {
        window.addEventListener('message', this.iframeOnLoad)
    },
    methods: {
        iframeOnLoad (e) {
            const [iframeOrigin, iframeHash] = (e.data?.hashchange || '')?.split('/#/') || []
            if ((e.type === 'message' && iframeHash && e.origin === iframeOrigin && e.data?.hashchange)) {
                if (this.path !== iframeHash) this.$router.push({name: '404'})
            } else if (e.type === 'load') {
                if (process.env.NODE_ENV !== 'development') {
                    window.frames['myIframe'].contentWindow.addEventListener('click', function (_e) {
                        window.dispatchEvent(new Event('click'))
                    })
                }
                if (this.src.split('/#/')[1] !== this.path) this.$router.push({name: '404'})
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
