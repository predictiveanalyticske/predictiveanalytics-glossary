import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

var storage = window.localStorage;

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
          url: process.env.VUE_APP_ENDPOINT_URL,
        },
        global: {
          links: []
        },
        home: {
          searchBar: false,
          banner: {
            title: '',
            subtitle: ''
          }
        },
        loader: true,
        sidebar: false,
      }
  },
  getters: {
    global: state => {
      return state.app.data.global;
    },
    links: state => {
      return state.app.global.links;
    },
    loader: state => {
      return state.app.loader;
    },
    isAuthenticated: state => {
      return state.app.auth.isAuthenticated;
    },
    backendurl: state => {
      return state.app.env.url;
    },
    sidebar: state => {
      return state.app.sidebar;
    },
    searchBar: state => {
      return state.app.home.searchBar;
    },
    title: state => {
      return state.app.home.banner.title;
    },
    subtitle: state => {
      return state.app.home.banner.subtitle;
    }
  },
  mutations: {
    access_token (state, val){
      state.app.auth.access_token = val
    },
    links (state, val){
      state.app.global.links = val
    },
    refresh_token (state, val){
      state.app.auth.refresh_token = val
    },
    expires_in (state, val){
      state.app.auth.expires_in = val
    },
    loading (state, val){
      state.app.loader = val
    },
    isAuthenticated (state, val){
      state.app.auth.isAuthenticated = val
    },
    isAuthorized (state, val){
      state.app.auth.isAuthorized = val
    },
    token_type (state, val){
      state.app.auth.token_type = val
    },
    sidebar (state, val){
      state.app.sidebar = val
    },
    searchBar (state, val){
      state.app.home.searchBar = val
    },
    title (state, val){
      state.app.home.banner.title = val
    },
    subtitle (state, val){
      state.app.home.banner.subtitle = val
    }
  }
};

authenticate();

export default new Vuex.Store(VuexData);

function authenticate(){
  
  if( storage.length > 0 ){

     VuexData.state.app.auth.access_token    = storage.getItem('access_token');
     VuexData.state.app.auth.expires_in      = storage.getItem('expires_in');
     VuexData.state.app.auth.token_type      = storage.getItem('token_type');
     VuexData.state.app.auth.isAuthenticated = storage.getItem('access_token') != undefined ? true : false;

  }
  

}