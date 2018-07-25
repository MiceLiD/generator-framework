import Vue from 'vue'
import router from './router/index.js'
import App from './App.vue'
import f_Request from './utils/request.js'
window.f_Request = f_Request

import './favicon.ico'

new Vue({
  el: '#app',
  router,
  template: '<App />',
  components: { App }
})