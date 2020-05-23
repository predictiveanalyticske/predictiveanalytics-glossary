<template>
    <vk-grid class="uk-child-width-1-1">
        <div>
            <vk-navbar class="uk-margin uk-light">
                  <vk-navbar-toggle title="Menu" @click="show = true"></vk-navbar-toggle>
            </vk-navbar>
        </div>
        <div>
            <vk-offcanvas-content>
                <vk-offcanvas :show.sync="show">
                    <vk-offcanvas-close @click="show = false"></vk-offcanvas-close>
                        <vk-nav class="uk-margin-auto-vertical">
                            <vk-nav-item-header title="Glossary Categories"></vk-nav-item-header>
                            <vk-nav-item :title="value" v-for="(value,index) in data.links" :key="index" :href="routerLink(value)"></vk-nav-item>
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
                show: false,
                data: {}
            }
        },
        methods: {
            routerLink (value){
                return this.$router.resolve({ name: 'filter', params: { category: btoa(value) }}).href
            }
        },
        created(){
            this.data = this.$store.getters;
        }
    }
</script>

<style scoped>
    .uk-navbar {
        background-color:#bf040f !important;
    }
</style>