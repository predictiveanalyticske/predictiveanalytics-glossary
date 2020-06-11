<template>
<vk-offcanvas-content>
  <vk-offcanvas :show.sync="show">
     <vk-offcanvas-close @click="$store.commit('sidebar',false)"></vk-offcanvas-close>
    <vk-nav class="uk-margin-auto-vertical">
      <vk-nav-item title="Active" active></vk-nav-item>
      <vk-nav-item title="Item"></vk-nav-item>
      <vk-nav-item-header title="Header"></vk-nav-item-header>
      <vk-nav-item title="Item"></vk-nav-item>
      <vk-nav-item title="Item"></vk-nav-item>
      <vk-nav-item-divider></vk-nav-item-divider>
      <vk-nav-item title="Item"></vk-nav-item>
    </vk-nav>
  </vk-offcanvas>
</vk-offcanvas-content>
</template>

<script>
    export default {
        name: "sidebar",
        data () {
            return {
                
            }
        },
        computed:{
            show () {
                return this.$store.getters.sidebar;
            }
        }
    }
</script>