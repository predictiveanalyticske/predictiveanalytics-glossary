<template>
    <vk-grid class="uk-child-width-1-1">
        <div>
            <vk-card type="secondary" padding="large" class="uk-card-dark uk-text-center">
                <h1>Ready To Learn ?</h1>
                <h2 class="uk-margin">Predictive Analytics Glossary has a wide range of data science terminologies to help you boost your knowledge.</h2>
                <div class="br-countup">
                    <countup 
                    :ceil="countvalue"
                    />
                </div>
            </vk-card>
        </div>
        <div class="uk-margin-remove">
            <vk-card padding="large" class="uk-text-center">
                
            </vk-card>
        </div>
        <div class="uk-margin-remove">
            <vk-card padding="large" type="blank" class="uk-text-center">
               
            </vk-card>
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