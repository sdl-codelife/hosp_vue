import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/icon/iconfont.js'
import './assets/css/style.css'


import {RequestValue} from './axios/index'
import {postRequest} from './axios/index'
import {putRequest} from './axios/index'
import {getRequest} from './axios/index'
import {deleteRequest} from './axios/index'
import {fileRequest} from './axios/index'


Vue.prototype.$RequestValue = RequestValue
Vue.prototype.$postRequest = postRequest
Vue.prototype.$putRequest = putRequest
Vue.prototype.$getRequest = getRequest
Vue.prototype.$deleteRequest = deleteRequest
Vue.prototype.$fileRequest = fileRequest

Vue.config.productionTip = false
Vue.prototype.$baseUrl = 'http://127.0.0.1:8787',
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')