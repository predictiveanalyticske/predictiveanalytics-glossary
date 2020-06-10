<template>
    <div class="uk-width-1-1">
        <loader :isActive="load" />
        <router-view name="global"></router-view>
    </div>
</template>

<script>
    import loader from './components/global/LoaderComponent';
    export default {
      components: {
          loader
      },
      computed: {
        load (){
          if( this.$store.getters.loader ){
            return true;
          }
          return false;
        }
      },
      name: 'app',
    }
</script>

<style lang="css">
  @import './assets/css/style.css';
</style>