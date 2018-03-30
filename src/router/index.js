import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'Home', component: (resolve) => { require(['@/views/Home/Index'], resolve) } },
    { path: '/login', name: 'Login', component: (resolve) => { require(['@/views/Login'], resolve) } },
    { path: '/stores/:id', name: 'storeDetail', component: (resolve) => { require(['@/views/Store/Show'], resolve) } },
    { path: '/personal', name: 'Personal', component: (resolve) => { require(['@/views/Personal/Index'], resolve) } },
    { path: '/profile', name: 'Profile', component: (resolve) => { require(['@/views/Personal/parts/Profile'], resolve) } },
    // Category Home
    { path: '/categories/:id', name: 'CategoryHome', component: (resolve) => { require(['@/views/Category/Index'], resolve) } },
    // 商圈
    { path: '/moments', name: 'Moment', component: (resolve) => { require(['@/views/Moment/Index'], resolve) } },
    { path: '/subjects', name: 'Subject', component: (resolve) => { require(['@/views/Subject/Index'], resolve) } },
    { path: '*', redirect: '/' }
  ]
})

// When handling the refresh, vuex is cleared but the admin is already logged in
if (window.localStorage.authInfo) {
  store.dispatch('setAuthInfo', JSON.parse(window.localStorage.authInfo))
}
if (window.localStorage.userInfo) {
  store.dispatch('setUserInfo', JSON.parse(window.localStorage.userInfo))
}
// Log in the middle, the page needs to log in, without the login situation directly jump login
router.beforeEach((to, from, next) => {
  next()
  // if (to.matched.some(record => record.meta.auth)) {
  // }
})

export default router
