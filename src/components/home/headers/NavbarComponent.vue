<template>
<div class="uk-position-relative br-parallax">
    <img src="@/assets/images/glossary-banner.png" v-if="$store.getters.searchBar">
    <img src="@/assets/images/glossary-banner-small.png" v-else>
    <div class="uk-position-top">
        <vk-navbar transparent class="br-navbar uk-hidden@xl uk-hidden@l uk-hidden@m">
            <vk-navbar-toggle title="Menu" @click="$store.commit('sidebar',true)"></vk-navbar-toggle>
            <vk-navbar-logo slot="center">
                <img src="@/assets/images/logo-full-white.png" width="50%"/>
            </vk-navbar-logo>
        </vk-navbar>
        <vk-navbar transparent class="br-navbar uk-visible@s uk-visible@m">
            <vk-navbar-logo slot="left">
                <img src="@/assets/images/logo-full-white.png" width="100%"/>
            </vk-navbar-logo>
            <vk-navbar-nav slot="center">
                <vk-nav-item title="Home" :href="$router.resolve({name:'home'}).href"></vk-nav-item>
                <vk-navbar-nav-dropdown title="Glossary Categories">
                    <vk-navbar-nav-dropdown-nav>
                        <vk-nav-item 
                        v-for="(value,index) in $store.getters.links" 
                        :key="index" 
                        :title="value"
                        :href="routerLink(value)"
                        ></vk-nav-item>
                    </vk-navbar-nav-dropdown-nav>
                </vk-navbar-nav-dropdown>
            </vk-navbar-nav>
        </vk-navbar>
    </div>
    <div class="uk-position-cover uk-overlay uk-overlay-custom uk-flex uk-flex-center uk-flex-middle">
        <div class="uk-width-1-2 br-overlay-content uk-text-center uk-light" id="search-bar"  v-if="$store.getters.searchBar">
            <h1 class="br-search-title uk-margin-remove uk-visible@s uk-visible@m">Predictive Analytics Glossary</h1>
            <h5 class="uk-margin-remove uk-hidden@xl uk-hidden@l uk-hidden@m">Predictive Analytics Glossary</h5>
            <h2 class="uk-margin br-search-subtitle uk-visible@s uk-visible@m">Data Science Terminologies & Unrelated Disciplines.</h2>
            <h6 class="uk-margin-small uk-hidden@xl uk-hidden@l uk-hidden@m">Data Science Terminologies & Unrelated Disciplines.</h6>
            <div class="uk-inline uk-width-1-1 uk-margin-remove">
                <input class="uk-input br-search-input uk-form-large uk-visible@s uk-visible@m" v-model="fields.search"  type="text">
                <input class="uk-input uk-hidden@xl uk-hidden@l uk-hidden@m" v-model="fields.search" type="text">
                <a class="uk-form-icon uk-form-icon-flip uk-visible@s uk-visible@m" @click.prevent="search" href="#"><vk-icon icon="search" ratio="2"></vk-icon></a>
                <a class="uk-form-icon uk-form-icon-flip  uk-hidden@xl uk-hidden@l uk-hidden@m" @click.prevent="search" href="#"><vk-icon icon="search"></vk-icon></a>
            </div>
        </div>
        <div v-else class="uk-width-1-1 uk-light uk-text-center uk-margin-large-top">
            <h1 class="br-search-title uk-margin-remove uk-visible@s uk-visible@m">{{ title }}</h1>
            <h5 class="uk-margin-remove uk-hidden@xl uk-hidden@l uk-hidden@m">{{ title }}</h5>
            <h2 class="uk-margin br-search-subtitle uk-visible@s uk-visible@m">{{ subtitle }}</h2>
            <h6 class="uk-margin-small uk-hidden@xl uk-hidden@l uk-hidden@m">{{ subtitle }}</h6>
        </div>
    </div>
</div>
</template>
<script>
    export default {
        data() {
            return {
                filter: this.$router.resolve({name:"category"}).href,
                fields: {
                    search: null
                }
            }
        },
        methods: {
            logout (){                
                this.bralcoaxios({ url: this.$store.getters.backendurl + "api/v1/auth/logout", request: "POST" });
                window.localStorage.clear();
                window.location.reload();
            },
            routerLink (value){
                return this.$router.resolve({ name: 'filter', params: { category: btoa(value) }}).href
            },
            search() {
                this.$router.push({name:'itemfilter',params:{scopeitem: this.fields.search }})
            }
        },
        computed:{
            data(){
                return this.$store.getters.links;
            },
            subtitle () {
                return this.$store.getters.subtitle;
            },
            title () {
                return this.$store.getters.title;
            }
        }
    }
</script>