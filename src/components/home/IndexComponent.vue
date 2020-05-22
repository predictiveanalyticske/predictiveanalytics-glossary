<template>
    <vk-grid class="uk-child-width-1-1">
        <div>
            <navbar></navbar>
        </div>
        <div>
        </div>
    </vk-grid>
</template>

<script>
    import navbar from './headers/NavbarComponent'
    import vuex from '../../stores'

    export default {
        name: "index",
        components: {
            navbar,
        },
        data () {
            return {
                data: {},
            }
        },
        beforeCreate() {
            this.bralcoaxios({ url: process.env.VUE_APP_ENDPOINT_URL + "/api/v1/glossary/fetch", request: "GET" }).then( (response) => {
                let resolve = this.bralcoresponse(response);
                this.data   = resolve.data.glossary;
                vuex.state.app.links  = resolve.data.links;
            });
        }
    }
</script>