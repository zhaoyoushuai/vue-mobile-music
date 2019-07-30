import Vue from 'vue'
import 'babel-polyfill'
import App from './App'
import fastclick from 'fastclick'
import router from './router'
import VueLazyLoad from 'vue-lazyload'
import 'common/stylus/index.styl'
import store from './store/index'

fastclick.attach(document.body)

Vue.config.productionTip = false

Vue.use(VueLazyLoad,{
  loading:require('common/image/default.png')
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})