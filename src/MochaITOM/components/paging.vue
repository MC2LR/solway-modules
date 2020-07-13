<template>
    <div class="paging my-paging" :class="'size-' + size">

        <span>每页显示 :</span>

        <select
            @change="change()"
            v-model="page_size">

            <option
                v-for="option in options"
                v-bind:key="option.value"
                v-bind:value="option.value">
                {{ option.text }}
            </option>
        </select>

        <span>页数</span>

        <span class="num">
            {{currentIndex}}/{{totalPage}}
        </span>

        <span
            @click="prePage($event)"
            :class="{disabled: pageIndex <= firstIndex}"
            class="left iconcomm commzuo">
        </span>

        <input
            v-model="index"
            class="goPage"
            :min="1"
            @keydown.enter="changeIndex()"
            :max="totalPage"
            type="number">

        <span
            @click="changeIndex()"
            class="go">
            跳转
        </span>

        <span
            @click="nextPage($event)"
            :class="{disabled: (pageIndex - firstIndex + 1) >= totalPage}"
            class="right iconcomm commyou">
        </span>
    </div>
</template>

<script>
export default {
    name: 'myPaging',
    props: {
        pageSizeArr: {
            type: Array,
            default () {
                return [10, 30, 50, 100]
            }
        },
        pageSize: {
            type: Number,
            default: 10
        },
        pageIndex: {
            type: Number,
            default: 0
        },
        total: {
            type: Number,
            default: 0
        },
        firstIndex: {
            type: Number,
            default: 0
        },
        size: {
            type: String,
            default: 'mini'
        }
    },
    data () {
        return {
            page_size: this.pageSize,
            page_index: this.pageIndex,
            index: this.pageIndex - this.firstIndex + 1
        }
    },
    watch: {
        pageIndex (v) {
            this.page_index = v
            this.index = v - this.firstIndex + 1
        },
        pageSize (v) {
            this.page_size = v
        }
    },
    computed: {
        options () {
            if (typeof this.pageSizeArr[0] !== 'number') return this.pageSizeArr
            return this.pageSizeArr.map(v => ({
                value: v, text: '' + v
            }))
        },
        currentIndex () {
            return this.pageIndex - this.firstIndex + 1
        },
        totalPage () {
            const remainder = this.total % this.pageSize
            return Math.floor(this.total / this.pageSize) + (remainder ? 1 : 0)
        }
    },
    methods: {
        change () {
            if (this.page_size === this.pageSize && this.page_index === this.pageIndex) return
            this.$emit('change', {pageSize: this.page_size, pageIndex: this.page_index})
            this.page_size = this.pageSize
            this.page_index = this.pageIndex
        },
        changeIndex () {
            if (!this.index) return
            this.page_index = this.index - this.firstIndex - 1
            this.change()
        },
        prePage (e) {
            if (e.currentTarget.className.split(' ').some(v => v === 'disabled')) return
            this.page_index = this.pageIndex - 1
            this.change()
        },
        nextPage (e) {
            if (e.currentTarget.className.split(' ').some(v => v === 'disabled')) return
            this.page_index = this.pageIndex + 1
            this.change()
        }
    }
}
</script>
<style lang="scss" scoped>
$height-small: 30px;
$height-mini: 26px;

$input-widht-small: 55px;
$input-widht-mini: 55px;

$font-size-small: 14px;
$font-size-mini: 12px;

.paging {
  display: inline-block;
  width: max-content;
  font-size: $font-size-small;

  select {
    width: $input-widht-small;
    height: $height-small;
    background: #214c77;
    border: 1px solid #556d98;
    border-radius: 2px;
    vertical-align: middle;
    color: #fff;
    margin-right: 7px;
    outline: 0 !important;
  }

  input {
    width: $input-widht-small;
    height: $height-small - 4px;
    border: 1px solid #556d98;
    background: #214c77;
    text-align: center;
    vertical-align: middle;
    color: #fff;
    outline: 0 !important;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }

  .left {
    margin-left: 7px;
  }

  .left,
  .right {
    display: inline-block;
    width: $height-small;
    height: $height-small;
    line-height: $height-small;
    vertical-align: middle;
    text-align: center;
    background-color: #1cb09a;
    cursor: pointer;
  }

  span.disabled {
    border: 1px solid #556d98;
    background: #214c77;
    cursor: no-drop;
  }
  .go {
    display: inline-block;
    width: 60px;
    height: $height-small;
    line-height: $height-small;
    background-color: #1cb09a;
    color: #fff;
    cursor: pointer;
    text-align: center;
  }

    &.size-mini {
        font-size: $font-size-mini;

        select, input {
            width: $input-widht-mini;
        }

        select {
            height: $height-mini;
        }

        input {
            height: $height-mini - 4px;
        }

        .left,.right {
            width: $height-mini;
            height: $height-mini;
            line-height: $height-mini;
        }
    }
}
</style>
