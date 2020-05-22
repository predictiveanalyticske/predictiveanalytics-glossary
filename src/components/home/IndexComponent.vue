<template>
    <navbar></navbar>
</template>

<script>
    import navbar from './headers/NavbarComponent'

    export default {
        name: "index",
        components: {
            navbar
        },
        beforeCreate() {
            this.bralcoaxios({ url: process.env.VUE_ENDPOINT_URL + "/api/v1/glossary", request: "GET" }).then( (response) => {
                let resolve = this.bralcoresponse(response);
                console.log(resolve);
                // this.data   = resolve.data.glossary;
                // this.pages  = this.data.length % this.perPage
                // if( this.data.length > 0){
                //     this.data = Object.entries(this.data).map( ([key, value]) =>
                //     {
                //     return value;
                //     });
                //     this.glossaryChunk = chunk(this.data, this.perPage);
                //     this.activePage = this.glossaryChunk[1];
                //     this.tableLength.value = this.activePage.length;
                // }
            });
        }
    }
</script>