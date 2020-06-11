<template>
    <ICountUp
      :delay="delay"
      :endVal="endVal"
      :options="options"
      @ready="onReady"
    />
</template>
 
<script type="text/babel">
  import ICountUp from 'vue-countup-v2';

  export default {
    name: 'countup',
    components: {
      ICountUp
    },
    computed: {
      endVal () {
        return this.ceil;
      }
    },
    data() {
      return {
        delay: 1000,
        options: {
          useEasing: true,
          useGrouping: true,
          separator: ',',
          decimal: '.',
          prefix: '',
          suffix: ''
        }
      };
    },
    methods: {
      onReady: function(instance) {
        const that = this;
        instance.update(that.endVal + 50 - 50);
      }
    },
    props: ["ceil"]
  };
</script>
 
<style scoped>
  .iCountUp {
    font-size: 12em;
    margin: 0;
    color: #4d63bc;
  }
</style>