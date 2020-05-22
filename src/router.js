import Vue from 'vue';
import Router from 'vue-router';
import Vuex from './stores'

/**
 * Import components from the
 */
import App from './App';

// Home Landing View
import Home from './components/global/HomeComponent.vue';
import HomeIndex from './components/home/IndexComponent.vue';
import HomeAuth from './components/home/AuthComponent.vue';

Vue.use(Router);

export default new Router({
   routes: [
        {
            path: '/',
            children:[
                {
                    path: '',
                    components: {
                        view: HomeIndex,
                    },
                    beforeEnter(to,from,next){
                        if( Vuex.state.app.auth.isAuthenticated ){
                            next();
                        } else {
                            next({name: "auth"});
                        }
                    }
                },
                {
                    name: "auth",
                    path: '/auth',
                    components: {
                        view: HomeAuth,
                    }
                }
            ],
            components: {
                default: App,
                global: Home
            }
        },
   ]

});
