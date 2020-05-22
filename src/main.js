import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './stores'
import BralcoHelper from './bralcohelpers'

Vue.use(BralcoHelper);

require('./vuikit');

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
