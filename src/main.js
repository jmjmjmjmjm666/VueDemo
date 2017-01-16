// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import Goods from 'components/goods/goods';
import Ratings from 'components/ratings/ratings';
import Seller from 'components/seller/seller';

// 开启debug模式
// Vue.config.debug = true;
import 'common/style/index.css';
Vue.use(VueRouter);
Vue.use(VueResource);

const routes = [
  { path: '/', redirect: '/goods' },
  { path: '/goods', component: Goods },
  { path: '/ratings', component: Ratings },
  { path: '/seller', component: Seller }
];

const router = new VueRouter({
  routes,
  linkActiveClass: 'router-active'
  // 改变tab-item选中时的默认class名
});

/* eslint-disable no-new */
/* eslint-disable no-unused-vars */
var vm = new Vue({
  el: '#app',
  template: '<App/>',
  components: {
    App: App
  },
  router
});
