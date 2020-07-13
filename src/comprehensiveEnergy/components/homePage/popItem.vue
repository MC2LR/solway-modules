<script>
export default {
    props: ['label', 'value', 'unit'],
    render () {
        return <div class="popItem pop-item">
            <span class="label">{this.label}</span>
            <br/>
            <span class="value">{this.value}</span>
            <span class="unit">{this.unit}</span>
        </div>
    }
}
</script>

<style lang="scss" scoped>
.popItem {
    display: inline-block;
    font-size: 0;

    span {
        display: inline-block;
    }

    .label {
        font-size: 14px;
        margin-bottom: 8px;
        @include c(color, $text_c0);
        line-height: 1;
    }

    .value {
        font-size: 18px;
        line-height: 1;
    }

    .unit {
        font-size: 12px;
    }
}
</style>
