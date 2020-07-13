<template>
    <div class="device-monitor">
        <page-header></page-header>
        <page-handle></page-handle>
        <device-list></device-list>
    </div>
</template>

<script>
import PageHeader from './header'
import PageHandle from './handle'
import deviceList from './device'
export default {
    components: {
        PageHeader,
        PageHandle,
        deviceList
    }
}
</script>

<style lang="scss" scoped>
[data-pagetheme="dark"] {
    .device-monitor {
        background-image: radial-gradient( circle, rgba(255,255,255,.03) 2px, transparent 2px );
        background-size: 20px 20px;

        &::before {
            content: '';
            position: absolute;
            width: 30%;
            height: 60%;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            border-radius: 50%;
            background-color: rgba(69, 103, 164, .3);
            box-shadow: 0 0 100px 100px rgba(69, 103, 164, .3);
        }
    }
}

.device-monitor {
}
</style>
