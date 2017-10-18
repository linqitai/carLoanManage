// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import 'babel-polyfill'
import './common/scss/reset.scss'
import utils from './common/js/utils'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(utils)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
