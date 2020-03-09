import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router';
import store from './store';
import ConfirmDialog from './components/ConfirmDialog'

Vue.config.productionTip = false

Vue.component('main-confirm-dialog', ConfirmDialog);

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
