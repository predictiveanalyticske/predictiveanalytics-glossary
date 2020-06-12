<template>
    <vk-grid class="uk-child-width-1-2@xl uk-child-width-1-2@l uk-child-width-1-2@m uk-child-width-1-1@s br-fixed">
        <div class="uk-background-default uk-flex uk-flex-center uk-flex-middle uk-visible@s">
            <vk-card type="blank" padding="small" class="uk-text-center uk-position-relative">
                <img src="@/assets/images/login-banner.png" width="50%" class="uk-visible@m"/>
                <img src="@/assets/images/login-banner.png" width="50%" class="uk-visible@xl"/>
                <h2 class="uk-heading-line uk-text-center"><span>Predictive Analytics Glossary</span></h2>
                <img src="@/assets/images/login-banner.png" width="40%" class="uk-hidden@xl uk-hidden@l uk-hidden@m"/>
                <div class="uk-flex-center">
                    <span><a href="https://predictiveanalytics.co.ke" target="_blank"><vk-icon icon="world"></vk-icon></a></span>
                    <span><p>&copy; Predictive Analytics {{ year }}</p></span>
                </div>
            </vk-card>
        </div>
        <div class="uk-flex uk-flex-center uk-flex-middle">
            <div>
                <div class="uk-text-center">
                 <img src="@/assets/images/logo-full-red.png"/>
                </div>
                <vk-tabs flipped align="center" :keepAlive="true" :activeTab="tab" animation="fade">
                    <vk-tabs-item title="Login">
                        <vk-card padding="small" class="uk-card-dark uk-light">
                            <form class="uk-padding-small" @submit.prevent="attemptLogin" :action="$store.getters.backendurl+'/api/v1/auth/login'" method="POST">
                                <h2 class="uk-heading-bullet">Account Login</h2>
                                <fieldset class="uk-fieldset">

                                    <div class="uk-margin">
                                        <label>Email</label>
                                        <input class="uk-input" name="email" type="email" placeholder="Email Address">
                                    </div>

                                    <div class="uk-margin">
                                        <label>Password</label>
                                        <input class="uk-input" name="password" type="password" placeholder="Password">
                                    </div>

                                    <div class="uk-margin">
                                        <vk-button htmlType="submit">Login</vk-button>
                                    </div>

                                </fieldset>
                            </form>
                        </vk-card>
                    </vk-tabs-item>
                    <vk-tabs-item title="One Time Access">
                    <vk-card padding="small" class="uk-card-dark uk-light">
                        <form class="uk-padding-small" method="POST" :action="$store.getters.backendurl + '/glossary/auth/login'">
                            <h2 class="uk-heading-bullet">One Time Access</h2>
                            <fieldset class="uk-fieldset">

                                <div class="uk-margin">
                                    <label>Email</label>
                                    <input class="uk-input" type="email" id="email" placeholder="Email Address">
                                </div>

                                <div class="uk-margin">
                                    <label>Phone</label>
                                    <input class="uk-input" type="phone" placeholder="">
                                </div>

                                <div class="uk-margin">
                                    <vk-button>Request</vk-button>
                                </div>

                            </fieldset>
                        </form>
                    </vk-card>
                    </vk-tabs-item>
                    <vk-tabs-item title="Forgot Password">
                    <vk-card padding="small" class="uk-card-dark uk-light">
                        <form class="uk-padding-small" >
                            <h2 class="uk-heading-bullet">Reset Password</h2>
                            <fieldset class="uk-fieldset">

                                <div class="uk-margin">
                                    <label>Email</label>
                                    <input class="uk-input" type="email" id="email" placeholder="Email Address">
                                </div>

                                <div class="uk-margin">
                                    <vk-button>Reset</vk-button>
                                </div>

                            </fieldset>
                        </form>
                    </vk-card>
                    </vk-tabs-item>
                </vk-tabs>
            </div>
        </div>
    </vk-grid>
</template>

<script>
    import stored from '../../stores';
    import router from '../../router';
    export default {
        name: "login",
        data () {
            return  {
                tab: 0,
                fields: {},
                year: new Date().getFullYear()
            }
        },
        methods: {
            attemptLogin (event) {
                let el = event.target
                let formData = new FormData(el);
                this.bralcoaxios({ url: el.attributes.action.value, request:el.attributes.method.value, form: formData }).then( (response) => {
                    this.bralcoresponse(response);
                });
            },
        },
        beforeRouteEnter(to,from,next){
            switch( stored.getters.isAuthenticated ){
                case true: 
                    router.push({name:'home'})
                break;
                case false: 
                    next();
                    stored.commit('loading',false);
                break;
            }
        },
    }
</script>