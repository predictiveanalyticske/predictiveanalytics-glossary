<template>
    <vk-navbar class="uk-width-1-1">
        <vk-navbar-logo slot="left" :class="'uk-light'">
            <img v-if="data.logo != null">
            <vk-icon v-else icon="home" ratio="1.3"></vk-icon>
        </vk-navbar-logo>
        <vk-navbar-nav slot="right">
            <vk-nav-item  v-for="(item,index) in this.links" :key="index" :title="item.title" :icon="item.icon" :href="item.to"></vk-nav-item>
        </vk-navbar-nav>
    </vk-navbar>
</template>
<script>
    export default {
        props:["links"]
    }
</script>