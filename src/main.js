import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BralcoHelper from './bralcohelpers'

Vue.use(BralcoHelper);

require('./vuikit');

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
