<template>
    <vk-grid class="uk-child-width-1-1">
        <div>
            <vk-navbar class="uk-margin">
                  <vk-navbar-toggle title="Menu" @click="slide = true"></vk-navbar-toggle>
            </vk-navbar>
        </div>
        <div>
            <vk-offcanvas-content>
                <vk-offcanvas overlay mode="slide" :show.sync="slide">
                    <vk-offcanvas-close @click="slide = false"></vk-offcanvas-close>
                        <vk-nav class="uk-margin-auto-vertical">
                            <vk-nav-item-header title="Glossary Categories"></vk-nav-item-header>
                            <vk-nav-item :title="value" v-for="(value,index) in data.links" :key="index" :href="$router.resolve({ name: 'filter', params: { category: value }}).href"></vk-nav-item>
                            <vk-nav-item-divider></vk-nav-item-divider>
                            <vk-nav-item title="Logout"></vk-nav-item>
                        </vk-nav>
                    </vk-offcanvas>
            </vk-offcanvas-content>
        </div>
    </vk-grid>
</template>
<script>
    export default {
        data() {
            return {
                filter: this.$router.resolve({name:"category"}).href,
                slide: false,
                data: {}
            }
        },
        created(){
            this.data = this.$store.getters;
        }
    }
</script>

<style>
    
</style>