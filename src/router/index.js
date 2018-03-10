import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'Home', component: (resolve) => { require(['@/views/Home/Index'], resolve) } }
    // { path: '/login', name: 'Login', component: (resolve) => { require(['@/views/Login'], resolve) } },
    // { path: '/profile', name: 'Profile', component: (resolve) => { require(['@/views/Profile'], resolve) } },
    // { path: '/stores/:id', name: 'storeDetail', component: (resolve) => { require(['@/views/Store/Show'], resolve) } }
  ]
})

// When handling the refresh, vuex is cleared but the admin is already logged in
if (window.localStorage.authInfo) {
  store.dispatch('setAuthInfo', JSON.parse(window.localStorage.authInfo))
}
if (window.localStorage.userInfo) {
  store.dispatch('setUserInfo', JSON.parse(window.localStorage.userInfo))
}

export default router
