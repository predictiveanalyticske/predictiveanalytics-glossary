<template>
<div class="uk-position-relative br-parallax">
    <img src="@/assets/images/glossary-banner.png">
    <div class="uk-position-top">
        <vk-navbar transparent class="br-navbar">
            <vk-navbar-logo slot="left">
                <img src="@/assets/images/logo-full-white.png" width="100%"/>
            </vk-navbar-logo>
            <vk-navbar-nav slot="center">
            <vk-nav-item title="Home" :href="$router.resolve({name:'home'}).href"></vk-nav-item>
            <vk-navbar-nav-dropdown title="Item">
                <vk-navbar-nav-dropdown-nav>
                    <vk-nav-item-header title="Header"></vk-nav-item-header>
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
    <div class="uk-position-cover uk-overlay uk-overlay-custom uk-flex uk-flex-center uk-flex-middle" >
        <div class="uk-width-1-2 br-overlay-content uk-text-center uk-light" id="search-bar">
            <h1 class="br-search-title uk-margin-remove">Predictive Analytics Glossary</h1>
            <h2 class="uk-margin">Data Science Terminologies.</h2>
            <div class="uk-inline uk-width-1-1 uk-margin">
                <input class="uk-input br-search-input uk-form-large" type="text">
                <a class="uk-form-icon uk-form-icon-flip" href="#"><vk-icon icon="search" ratio="2"></vk-icon></a>
            </div>
        </div>
    </div>
    <div class="uk-position-bottom-center uk-light">
        <a href="#" class="br-blinking"><vk-icon icon="chevron-down" ratio="5"></vk-icon></a>
    </div>
</div>
</template>
<script>
    import gsap from 'gsap'
    import { TweenMax } from 'gsap/all'
    
    export default {
        created () {
            gsap.registerPlugin({TweenMax});
        },
        data() {
            return {
                filter: this.$router.resolve({name:"category"}).href,
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
            }
        },
        mounted () {
            // TweenMax.to(document.getElementById('search-bar'),1, {scaleY: 1, height: '100vh'});
        },
        computed:{
            data(){
                return this.$store.getters.links;
            }
        }
    }
</script>