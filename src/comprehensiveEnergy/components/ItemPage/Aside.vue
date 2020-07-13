<template>
    <div class="aside">
        <div class="rotate-hadle" :class="{active: panelIndex === 1}" v-show="panelIndex === 1" @click="() => somersault(2)"><i class="iconfont iconfanzhuan"></i></div>
        <div class="rotate-hadle" :class="{active: panelIndex === 2}" v-show="panelIndex === 2" @click="() => somersault(1)"><i class="iconfont iconfanzhuan"></i></div>
        <div class="panel" :class="{active: panelIndex === 1, somersaulting: somersaulting && (panelIndex === 2)}">
            <section-j v-if="panelIndex === 1 || (panelIndex === 2 && somersaulting)" class="section1"></section-j>
            <section-c v-if="panelIndex === 1 || (panelIndex === 2 && somersaulting)" class="section2"></section-c>
            <section-h v-if="panelIndex === 1 || (panelIndex === 2 && somersaulting)" class="section3"></section-h>
            <section-i v-if="panelIndex === 1 || (panelIndex === 2 && somersaulting)" class="section4"></section-i>

        </div>
        <div class="panel" :class="{active: panelIndex === 2, somersaulting: somersaulting && (panelIndex === 1)}">
            <section-a v-if="panelIndex === 2 || (panelIndex === 1 && somersaulting)" class="section1"></section-a>
            <section-b v-if="panelIndex === 2 || (panelIndex === 1 && somersaulting)" class="section2"></section-b>
            <section-g v-if="panelIndex === 2 || (panelIndex === 1 && somersaulting)" class="section3"></section-g>
            <section-d v-if="panelIndex === 2 || (panelIndex === 1 && somersaulting)" class="section4"></section-d>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            panelIndex: 1,
            somersaulting: false,
            transformation: false
        }
    },
    methods: {
        async somersault (index) {
            if (this.somersaulting || this.transformation) return
            this.somersaulting = true
            this.panelIndex = index
            await this.$timeout(1000)
            this.somersaulting = false
            this.transformation = true
            await this.$timeout(100)
            this.transformation = false
        }
    },
    components: {
        SectionA: () => import('./section/SectionA'),
        SectionB: () => import('./section/SectionB'),
        SectionC: () => import('./section/SectionC'),
        SectionD: () => import('./section/SectionD'),
        SectionG: () => import('./section/SectionG'),
        SectionH: () => import('./section/SectionH'),
        SectionI: () => import('./section/SectionI'),
        SectionJ: () => import('./section/SectionJ')
    }
}
</script>

<style lang="scss" scoped>
.item-page.ok .body {
    .aside {
        .section1, .section2, .section3, .section4 {
            transform: translateX(0);
        }

        .rotate-hadle {
            display: block;
        }
    }
}
.aside {

    .rotate-hadle {
        background-color: rgba(#B7CCE5, .2);
        position: absolute;
        width: 100%;
        height: 0.18rem;
        left: 0;
        bottom: 0.2rem;
        line-height: 0.18rem;
        text-align: center;
        z-index: 9;
        cursor: pointer;
        display: none;

        &:hover {
            i.iconfont.iconfanzhuan {
                transform: rotate(-360deg);
                @include c(color, $text_c1);
            }
        }

        i.iconfont.iconfanzhuan {
            display: inline-block;
            @include c(color, $text_c2);
            transition: all .5s ease;
        }
    }

    .panel {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        transition: all .1s ease;
        // background-color: pink;
        transform: perspective(100vw) translate3d(50%, 0, -8.5vw) rotateY(90deg);
        opacity: 0;

        &.active {
            transform: perspective(100vw) translate3d(0, 0, 0) rotateY(0);
            z-index: 2;
            opacity: 1;
            transition: all 1s ease;
        }

        &.somersaulting {
            transform: perspective(100vw) translate3d(-50%, 0, -8.5vw) rotateY(-90deg);
            transition: all 1s ease;

            .section1, .section2, .section3, .section4 {
                background: transparent;
                box-shadow: none;
            }
        }
    }

    .section1, .section2, .section3, .section4 {
        width: 100%;
        height: calc((100vh - 1.5rem) / 4);
        margin-top: 0.12rem;
        transform: translateX(150%);
        transition: all 0.2s ease;
        background:rgba(0,56,138,.2);
        box-shadow:0px 3px 3px 0px rgba(0,1,1,0.36);

        &.section2 {
            transition: all 0.2s ease 0.2s;
        }

        &.section3 {
            transition: all 0.2s ease 0.4s;
        }

        &.section4 {
            transition: all 0.2s ease 0.6s;
        }
    }
}
</style>
