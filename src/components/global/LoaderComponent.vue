<template>
  <div :class="isLoading">
      <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
  </div>
</template>
<script>
  export default {
    computed: {
      isLoading () {
        return this.isActive ? "overlay" : "overlay hidden";
      }
    },
    name: "loader",
    props: ["isActive"],
  }
</script>
