// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import MuseUI from 'muse-ui';
// import 'muse-ui/dist/muse-ui.css';
// import 'muse-ui/dist/theme-teal.css' // 使用主题

import VuePreview from 'vue-preview'
import 'babel-polyfill'
import './common/scss/index.scss'
// import utils from './common/js/utils'

Vue.config.productionTip = false
Vue.use(ElementUI)
// Vue.use(MuseUI)
Vue.use(VuePreview)
// Vue.use(utils)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
