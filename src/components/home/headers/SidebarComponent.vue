<template>
<vk-offcanvas-content>
  <vk-offcanvas :show.sync="show" class="uk-light">
     <vk-offcanvas-close @click="$store.commit('sidebar',false)"></vk-offcanvas-close>
     <vk-nav class="uk-margin-auto-vertical">
        <vk-nav-item :href="$router.resolve({name:'home'}).href" title="Home"></vk-nav-item>
        <vk-nav-item-parent href="#" title="Category">
           <vk-nav-item 
            v-for="(value,index) in $store.getters.links" 
            :key="index" 
            :title="value"
            :href="routerLink(value)"
            ></vk-nav-item>
        </vk-nav-item-parent>
        <vk-nav-item href="#" @click.prevent="logout" title="Logout"></vk-nav-item>
     </vk-nav>
  </vk-offcanvas>
</vk-offcanvas-content>
</template>

<script>
    export default {
        name: "sidebar",
        computed:{
            show () {
                return this.$store.getters.sidebar;
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
        },
    }
</script>