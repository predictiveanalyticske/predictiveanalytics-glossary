<template>
    <vk-grid class="uk-child-width-1-1">
        <div>
            <navbar></navbar>
        </div>
        <div class="uk-margin-remove">
            <vk-card class="uk-card-red uk-card-no-shadow uk-light uk-padding-large">
                <vk-grid class="uk-child-width-1-2@xl uk-child-width-1-2@l uk-child-width-1-2@m uk-child-width-1-1@s">
                <div>
                    <h1>{{ glossary.title }}</h1>
                    <h5 class="uk-margin-remove">{{ glossary.summary }}</h5>
                </div>
                </vk-grid>
            </vk-card>
        </div>
        <div class="uk-margin-remove">
            <vk-card type="blank">
                <main>
                    <div class="item" v-for="(value,index) in activePage" :key="index">
                        <h2>{{ value.name }}</h2>
                        <p>{{ value.definition }}</p>
                    </div>
                </main>
                <div>
                    <vk-pagination align="center" :page.sync="pageNumber" :range="1" :perPage="perPage" :total="tableLength.value">
                        <vk-pagination-page-prev></vk-pagination-page-prev>
                        <vk-pagination-pages></vk-pagination-pages>
                        <vk-pagination-page-next></vk-pagination-page-next>
                    </vk-pagination>
                </div>
            </vk-card>
        </div>
    </vk-grid>
</template>

<script>

    import navbar from '../headers/NavbarComponent'
    import { chunk } from 'lodash'

    export default {
        name: "index",
        components: {
            navbar,
        },
        data () {
            return {
                activePage: {},
                data: {},
                glossaryChunk: {},
                glossary: {},
                pages: 0,
                pageNumber: 1,
                perPage: 10,
                tableLength: {
                    type: Number,
                    value: 0
                }
            }
        },
        methods: {
            makePage (){
                if( this.data.length > 0){
                    this.pages  = this.data.length % this.perPage
                    this.glossaryChunk = chunk(this.data, this.perPage);
                    this.activePage = this.glossaryChunk[this.pageNumber - 1];
                    this.tableLength.value = this.data.length;
                }
            }
        },
        beforeCreate() {
            this.bralcoaxios({ url: process.env.VUE_APP_ENDPOINT_URL + "/api/v1/glossary/fetch/view/" + this.$route.params.category, request: "GET" }).then( (response) => {
                let resolve = this.bralcoresponse(response);
                this.data   = resolve.data.items;
                this.glossary  = resolve.data.glossary;
                this.makePage();
            });
        },
        watch:{
            pageNumber () {
                this.activePage = this.glossaryChunk[this.pageNumber - 1];
            }
        }
    }
</script>

<style lang="scss">
    @import "@/assets/css/timeline.scss"
</style>