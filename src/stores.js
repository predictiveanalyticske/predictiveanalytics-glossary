import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

var storage = window.localStorage;
var env     = process.env;

var VuexData = {
  state: {
      app: {
        auth: {
          access_token:    null,
          expires_in:      null,
          isAuthenticated: false,
          isAuthorized:    false,
          token_type:      null
        },
        env: {
          state: process.env.MIX_APP_ENV,
          url: process.env.MIX_APP_URL,
        },
        home: {
          popups: false
        },
        loader: true,
        links: {}
      }
  },
  getters: {
    links: state => {
      return state.app.links
    }
  }
};

authenticate();

environment();

export default new Vuex.Store(VuexData);

function authenticate(){
  
  if( storage.length > 0 ){

     VuexData.state.app.auth.access_token    = storage.getItem('access_token');
     VuexData.state.app.auth.expires_in      = storage.getItem('expires_in');
     VuexData.state.app.auth.token_type      = storage.getItem('token_type');
     VuexData.state.app.auth.isAuthenticated = storage.getItem('access_token') != undefined ? true : false;

  }
  

}

function environment() {

  if( process.env.length > 0 ){

    VuexData.state.app.env.state = env.MIX_APP_ENV;
    VuexData.state.app.env.url   = env.MIX_APP_URL;

  }
}