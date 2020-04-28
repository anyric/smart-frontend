import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router';
import store from './store';
import ConfirmDialog from './components/ConfirmDialog';
import PasswordDialog from './components/ChangePassword';
import EditProfileDialog from './components/EditProfile';
import Container from './components/Container';

import vueCookie from 'vue-cookie';
Vue.config.productionTip = false
Vue.use(vueCookie);
Vue.component('main-container', Container);
Vue.component('main-confirm-dialog', ConfirmDialog);
Vue.component('main-password-dialog', PasswordDialog);
Vue.component('main-profile-dialog', EditProfileDialog);

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
