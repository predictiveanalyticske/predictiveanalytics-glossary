<template>
    <vk-grid class="uk-child-width-1-1">
        <div>
            <vk-card type="secondary" padding="large" class="uk-card-dark uk-text-center">
                <h1>Ready To Learn ?</h1>
                <h4 class="uk-margin">Predictive Analytics Glossary has a wide range of data science terminologies to help you boost your knowledge.</h4>
            </vk-card>
        </div>
        <div class="uk-margin-remove">
            <vk-card padding="large" class="uk-text-center">
                <h1>Total Number of Glossary Items.</h1>
                <div class="br-countup">
                    <countup 
                    :ceil="countvalue"
                    />
                </div>
            </vk-card>
        </div>
        <div class="uk-margin-remove">
            <vk-grid class="uk-child-width-1-2@xl uk-child-width-1-2@l uk-child-width-1-2@m uk-child-width-1-1@s">
                <div></div>
                <div></div>
            </vk-grid>
        </div>
    </vk-grid>
</template>

<script>
    import countup from '@/components/plugins/CountUpComponent';
    export default {
        beforeRouteEnter(to,from,next){
            next( vm => {
                vm.initData();
                next();
            });
        },
        components: {
            countup
        },
        data () {
            return {
                data: {},
                countvalue: 0
            }
        },
        methods: {
            initData(){
                this.bralcoaxios({ url: this.$store.getters.backendurl + "/api/v1/glossary/fetch/items", request: "GET" }).then( (response) => {
                    let resolve = this.bralcoresponse(response);
                    this.data   = resolve.data;
                });
            }
        },
        mounted () {
            this.$store.commit('searchBar',true);
            this.$store.commit('sidebar',false);
        },
        name: "index",
        watch: {
            data: {
                handler (val) {
                    if( Object.keys(val).length > 0 ){
                        this.countvalue = val.total;
                    }
                },
                deep:true
            }
        }
    }
</script>