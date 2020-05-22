<template>
    <vk-grid class="uk-child-width-1-1">
        <div>
            <navbar></navbar>
        </div>
        <div>
            <timeline/>
        </div>
    </vk-grid>
</template>

<script>
    import navbar from '../headers/NavbarComponent'
    import timeline from '../plugins/TimelineComponent'
    import { chunk } from 'lodash'

    export default {
        name: "index",
        components: {
            navbar,
            timeline
        },
        data () {
            return {
                activePage: {},
                data: {},
                glossaryChunk: {},
                pages: 0,
                perPage: 5
                
            }
        },
        created() {
            this.bralcoaxios({ url: process.env.VUE_APP_ENDPOINT_URL + "/api/v1/glossary/fetch/view/" + this.$route.params.category, request: "GET" }).then( (response) => {
                let resolve = this.bralcoresponse(response);
                this.data   = resolve.data.items;
                this.pages  = this.data.length % this.perPage
                if( this.data.length > 0){
                    // this.data = Object.entries(this.data).map( ( [, value] ) => { return value; } );
                    this.glossaryChunk = chunk(this.data, this.perPage);
                    this.activePage = this.glossaryChunk[1];
                    this.tableLength.value = this.activePage.length;
                }
            });
        }
    }
</script>