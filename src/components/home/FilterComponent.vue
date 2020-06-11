<template>
    <vk-grid class="uk-child-width-1-1">
        <div class="uk-margin-remove">
            <vk-card type="blank" padding="large">
                <vk-grid class="uk-margin uk-flex-center" id="pagination">
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
                glossary: {},
            }
        },
        methods: {
            initData(){
                this.bralcoaxios({ url: this.$store.getters.backendurl + "/api/v1/glossary/item/filter/" + this.$route.params.scopeitem, request: "GET" }).then( (response) => {
                    let resolve = this.bralcoresponse(response);
                    this.data   = resolve.data.filter;
                    this.data.forEach( (item, ) => {
                        this.letters.push(item.name.charAt(0));
                        this.chunks[item.name.charAt(0)] = [];
                    });
                    this.initPagination();
                });
            },
            watchData(category){
                this.bralcoaxios({ url: this.$store.getters.backendurl + "/api/v1/glossary/item/filter/" + category, request: "GET" }).then( (response) => {
                    let resolve = this.bralcoresponse(response);
                    this.data   = resolve.data.filter;
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
                document.getElementById('pagination').scrollIntoView({behavior: "smooth", block: "end", inline: "end"});
            },
            scrollTo (value) {
                var elmnt = document.getElementById(value);
                elmnt.scrollIntoView();
            }
        },
        mounted () {
            this.$store.commit('searchBar',true);
        },
        beforeRouteEnter(to,from,next) {
            next( vm => {
                vm.initData();
                next();
            });
        },
        watch: {
            $route (to){
                this.watchData(to.params.scopeitem);
            }
        }
    }
</script>

<style lang="scss">
    @import "@/assets/css/timeline.scss"
</style>