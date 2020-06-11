<template>
    <vk-card class="uk-card-dark" padding="large">
        <vk-grid class="uk-child-width-1-1">
            <div>
                <vk-grid class="uk-child-width-1-2@xl uk-child-width-1-2@l uk-child-width-1-2@m uk-child-width-1-1@s uk-padding-small">
                    <div class="uk-position-relative uk-padding-large">
                        <img src="@/assets/images/logo-full-white.png" class="uk-position-center"/>
                    </div>
                    <div class="uk-light">
                        <h3>Contact Us</h3>
                        <form @submit.prevent="attemptLogin" :action="$store.getters.backendurl+'/api/v1/auth/login'" method="POST">
                            <fieldset class="uk-fieldset">

                                <div class="uk-margin uk-light">
                                    <label>Message</label>
                                    <textarea class="uk-textarea" rows="5" name="message"></textarea>
                                </div>
                                <div class="uk-margin">
                                    <label>Email</label>
                                    <input class="uk-input" name="email" type="email" placeholder="Email Address">
                                </div>

                                <div class="uk-margin uk-light">
                                    <vk-button htmlType="submit" size="large">Send</vk-button>
                                </div>

                            </fieldset>
                        </form>
                    </div>
                </vk-grid><hr>
            </div>
            <div>
                <vk-grid class="uk-child-width-1-2@xl uk-child-width-1-2@l uk-child-width-1-2@m uk-child-width-1-1@s">
                    <div>
                        <vk-iconnav>
                            <vk-iconnav-item href="https://predictiveanalytics.co.ke" target="blank" icon="world"></vk-iconnav-item>
                        </vk-iconnav>
                    </div>
                    <div class="uk-text-right@xl uk-text-right@l uk-text-right@m uk-text-center@s">
                        <p>&copy; Predictive Analytics {{ year }}</p>
                    </div>
                </vk-grid>
            </div>
        </vk-grid>
    </vk-card>
</template>

<script>
    export default {
        name: "footernav",
        data () {
            return {
                year: new Date().getFullYear()
            }
        },
        mounted (){

        }
    }
</script>