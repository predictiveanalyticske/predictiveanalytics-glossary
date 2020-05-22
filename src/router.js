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
import HomeCategory from './components/home/CategoryComponent.vue';
import HomeFilter from './components/home/show/CategoryFilterComponent.vue';
import HomeAuth from './components/home/AuthComponent.vue';

Vue.use(Router);

export default new Router({
   routes: [
        {
            path: '/',
            children:[
                {
                    name:"home",
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
                    name:"category",
                    path: '/glossary',
                    children: [
                        {   
                            name: "filter",
                            path: ":category",
                            components: {
                                page: HomeFilter,
                            }
                        }
                    ],
                    components: {
                        view: HomeCategory,
                    },
                    beforeEnter(to,from,next){
                        if( Vuex.state.app.auth.isAuthenticated ){
                            next();
                        } else {
                            next({name: "auth"});
                        }
                    }
                }
            ],
            components: {
                default: App,
                global: Home
            }
        },
        {
            name: "auth",
            path: "/auth/login",
            components: {
                default: App,
                global: HomeAuth,
            },
            beforeEnter(to,from,next){
                if( !Vuex.state.app.auth.isAuthenticated ){
                    next();
                } else {
                    next({name: "home"});
                }
            }
        }
   ]

});
