// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import api from './api'
import '@/libs/prototype'
import './assets/stylesheets/application.scss'
// ydui
import 'vue-ydui/dist/ydui.base.css'
import './components/common'

Vue.config.productionTip = false

Vue.use(api, {store})

store.dispatch('getCurrentLocation')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

Vue.prototype.validLogin = () => {
  console.log(store)
  if (store.state.user.authInfo) {
    return store.state.user.authInfo
  } else {
    Vue.prototype.wapUi.WapToastBox.new({message: '请先登录', timeout: 3000})
  }
}
