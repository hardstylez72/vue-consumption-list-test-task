import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import { store } from './store/index'
import datepicker from 'vue2-datepicker'

Vue.config.productionTip = false;

Vue.use(datepicker);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
