import Vue from 'vue';
import VueRouter, { RouteConfig, Route } from 'vue-router';
import Vuex from 'vuex';
import Login from '../views/Login.vue';
import SignUp from '../views/SignUp.vue';

import store from '../store';

Vue.use(VueRouter);
Vue.use(Vuex);

const ifNotAuthenticated = (to: Route, from: Route, next: Function) => {
  if (!store.getters.isAuthenticated) {
    next();
    return;
  }
  next('/home');
};

const ifAuthenticated = (to: Route, from: Route, next: Function) => {
  if (store.getters.isAuthenticated) {
    next();
    return;
  }
  next('/login');
};

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    beforeEnter: ifNotAuthenticated
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: ifNotAuthenticated
  },
  {
    path: '/signup',
    name: 'Sign Up',
    component: SignUp,
    beforeEnter: ifNotAuthenticated
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    beforeEnter: ifAuthenticated
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../views/Settings.vue'),
    beforeEnter: ifAuthenticated
  },
  {
    path: '/interests',
    name: 'Interests',
    component: () => import('../views/Interests.vue'),
    beforeEnter: ifAuthenticated
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
