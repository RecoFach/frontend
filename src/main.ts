import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vuex from 'vuex';
import store from './store';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;
Vue.use(Vuex);
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
