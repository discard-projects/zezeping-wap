// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import api from './api'
import '@/libs/prototype'
// ydui
import 'vue-ydui/dist/ydui.base.css'
import './assets/stylesheets/application.scss'
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
  if (store.state.user.authInfo) {
    return store.state.user.authInfo
  } else {
    Vue.prototype.wapUi.WapToastBox.new({message: '请先登录', timeout: 3000})
  }
}

Vue.prototype.validOwnStore = () => {
  if (Vue.prototype.validLogin()) {
    if (store.state.user.userInfo.store_id) {
      return store.state.user.userInfo.store_id
    } else {
      Vue.prototype.wapUi.WapToastBox.new({message: '请先绑定店铺', timeout: 3000})
    }
  }
}
