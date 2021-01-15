import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router';
import store from './store';
import ConfirmDialog from './components/ConfirmDialog';
import PasswordDialog from './components/ChangePassword';
import EditProfileDialog from './components/EditProfile';
import PrintTicket from './components/PrintTicket';
import Container from './components/Container';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import UniversalSchedule from './components/Universal';

import vueCookie from 'vue-cookie';
Vue.config.productionTip = false
Vue.use(vueCookie);
Vue.component('main-container', Container);
Vue.component('main-navbar', NavBar);
Vue.component('main-footer', Footer);
Vue.component('main-confirm-dialog', ConfirmDialog);
Vue.component('main-password-dialog', PasswordDialog);
Vue.component('main-profile-dialog', EditProfileDialog);
Vue.component('main-print-ticket', PrintTicket);
Vue.component('universal-schedule', UniversalSchedule);
require('@/assets/css/linearicons.css')
require('@/assets/css/font-awesome.min.css')
require('@/assets/css/bootstrap.css')
require('@/assets/css/magnific-popup.css')
require('@/assets/css/jquery-ui.css')
require('@/assets/css/nice-select.css')
require('@/assets/css/animate.min.css')
require('@/assets/css/owl.carousel.css')
require('@/assets/css/main.css')

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
