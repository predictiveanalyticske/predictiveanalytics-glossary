<template>
      <div class="uk-width-1-3@l uk-width-1-3@m uk-width-1-2@s uk-position-center uk-light">
        <vk-card padding="small">
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
                            <form class="uk-padding-small" @submit.prevent="attemptLogin" action="/api/v1/auth/login" method="POST">
                                <fieldset class="uk-fieldset">

                                    <div class="uk-margin">
                                        <label>Email</label>
                                        <input class="uk-input" v-model="fields.email" name="email" type="email" placeholder="Email Address">
                                    </div>

                                    <div class="uk-margin">
                                        <label>Password</label>
                                        <input class="uk-input" v-model="fields.password" name="password" type="password" placeholder="Password">
                                    </div>

                                    <div class="uk-margin">
                                        <vk-button htmlType="submit">Login</vk-button>
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

                var formData = new FormData();
                
                for(var item in this.fields){
                    formData.append(item,this.fields[item]);
                }   
                this.bralcoaxios({ url: process.env.VUE_APP_ENDPOINT_URL + el.attributes.action.value, request:el.attributes.method.value, form: formData }).then( (response) => {
                    this.bralcoresponse(response);
                });
            }
        },
        mounted() {
           stored.state.app.loader = false;
           var fields = {};
           document.querySelectorAll('input').forEach(function(index,item){
            fields[item.name] = null;
           });
           this.fields = fields;
        }
    }
</script>
<style scoped>

    .uk-card{ 
        background-color:#bf040f !important;
        color: #fff !important;
    }

    .uk-select > option{ 
        color: #1d1d1d;
    }

</style>