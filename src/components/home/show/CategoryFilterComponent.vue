<template>
    <vk-grid class="uk-child-width-1-1">
        <div class="uk-margin-remove">
            <vk-card type="blank" padding="large">
                <vk-grid class="uk-margin uk-flex-center">
                    <div v-for="(value,index) in letters" :key="index">
                        <a href="#" @click.prevent="scrollTo(value)" class="uk-button uk-button-primary">{{ value }}</a>
                    </div>
                </vk-grid>
                <div v-for="(value,index) in chunks" :key="index">
                    <h1 :id="index">{{ index }}</h1><hr>
                    <main>
                        <div class="item" v-for="(item,key) in value" :key="key" >
                            <h2>{{ item.name }}</h2>
                            <p>{{ item.definition }}</p>
                        </div>
                    </main>
                </div>
                <div>
                  
                </div>
            </vk-card>
        </div>
    </vk-grid>
</template>

<script>    
    export default {
        name: "index",
        data () {
            return {
                chunks: {},
                data: {},
                letters: [],
                pagination: [],
                glossary: {},
            }
        },
        methods: {
            initData(){
                this.bralcoaxios({ url: this.$store.getters.backendurl + "/api/v1/glossary/fetch/view/" + this.$route.params.category, request: "GET" }).then( (response) => {
                    let resolve = this.bralcoresponse(response);
                    this.data   = resolve.data.items;
                    this.glossary  = resolve.data.glossary;
                    this.data.forEach( (item, ) => {
                        this.letters.push(item.name.charAt(0));
                        this.chunks[item.name.charAt(0)] = [];
                    });
                    this.initPagination();
                });
            },
            initPagination (){
                this.letters = this.letters.filter((v, i, a) => a.indexOf(v) === i); 
                this.data.forEach( (item) => {
                   this.letters.forEach( (value) => {
                        if( value == item.name.charAt(0)){
                            this.chunks[value].push(item);
                        }
                     });
                });
            },
            scrollTo (value) {
                var elmnt = document.getElementById(value);
                elmnt.scrollIntoView();
            }
        },
        beforeRouteEnter(to,from,next) {
            next( vm => {
                vm.initData();
                next();
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