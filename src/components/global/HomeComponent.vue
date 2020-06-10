<template>
    <div class="uk-width-1-1 uk-position-relative">
        <navbar />
        <router-view name="view"></router-view>
        <footernav />
        <div class="uk-position-bottom-right">
            <vk-button class="br-floating" @click="scrollToTop"><vk-icon icon="chevron-up"></vk-icon></vk-button>
        </div>
    </div>
</template>

<script>
    import navbar from '@/components/home/headers/NavbarComponent'
    import footernav from '@/components/home/footer/FooterComponent'

    export default {
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.initData()
                next()
            });
        },
        components: {
            navbar,
            footernav,
        },
        name: "home",
        methods: {
            initData(){
                this.bralcoaxios({ url: this.$store.getters.backendurl + "/api/v1/glossary/fetch/categories", request: "GET" }).then( (response) => {
                    let resolve = this.bralcoresponse(response);
                    this.$store.commit('links',resolve.data.links);
                    this.$store.commit('loading',false);
                });
            },
            scrollToTop () {
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
            }
        },
    }
</script>