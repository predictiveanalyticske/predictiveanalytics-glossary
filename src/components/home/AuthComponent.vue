<template>
      <div class="uk-width-1-3@l uk-width-1-3@m uk-width-1-2@s uk-position-center uk-light">
        <vk-card padding="small" class="uk-card-red uk-light">
                <div class="uk-width-1-1 uk-text-center">
                    <vk-icon icon="user" ratio="6"></vk-icon>
                </div>
                <vk-tabs align="center" :keepAlive="true" :activeTab="tab">
                    <vk-tabs-item title="Login">

                        <div slot="header">
                            <vk-card-title>
                                <p>Account Login</p>
                            </vk-card-title>
                        </div>
                        <div class="uk-padding-small">
                            <form class="uk-padding-small" @submit.prevent="attemptLogin" :action="$store.getters.backendurl+'/api/v1/auth/login'" method="POST">
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
                        </div>
                    </vk-tabs-item>
                    <vk-tabs-item title="One Time Access">
                       <div slot="header">
                            <vk-card-title>
                                <p>Reset Password</p>
                            </vk-card-title>
                        </div>
                        <div class="uk-padding-small">
                            <form class="uk-padding-small" method="POST" :action="$store.getters.backendurl + '/glossary/auth/login'">
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
                        </div>
                    </vk-tabs-item>
                    <vk-tabs-item title="Forgot Password">
                       <div slot="header">
                            <vk-card-title>
                                <p>Reset Password</p>
                            </vk-card-title>
                        </div>
                        <div class="uk-padding-small">
                            <form class="uk-padding-small">
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
                        </div>
                    </vk-tabs-item>
                </vk-tabs>
        </vk-card>
     </div>
</template>

<script>
    import stored from '../../stores';
    import router from '../../router';
    export default {
        name: "login",
        data () {
            return  {
                tab: 0,
                fields: {}
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