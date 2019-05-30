import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'

import start from './components/start';

Vue.config.productionTip = false

Vue.component("start", start);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
