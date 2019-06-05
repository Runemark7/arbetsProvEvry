import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import kommuner from './components/kommuner';

Vue.config.productionTip = false

//Gör kommuner gloal
Vue.component("Kommuner", kommuner);

//svg map dependencies
import svgJs from "./plugins/vueSvgPlugin"

Vue.use(svgJs);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
