import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import kommuner from './components/kommuner';
import lan from './components/lan';

Vue.config.productionTip = false

Vue.component("Kommuner", kommuner);
Vue.component("Lan", lan);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
