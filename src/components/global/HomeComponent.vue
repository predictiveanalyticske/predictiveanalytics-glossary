<template>
    <router-view name="view"></router-view>
</template>

<script>
    export default {
        name: "home",
        beforeCreate() {
            this.bralcoaxios({ url: process.env.VUE_APP_ENDPOINT_URL + "/api/v1/glossary/fetch/categories", request: "GET" }).then( (response) => {
                let resolve = this.bralcoresponse(response);
                this.$store.state.app.links = resolve.data.links;
            });
        },
    }
</script>