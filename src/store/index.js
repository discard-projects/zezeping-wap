import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import location from './modules/location'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    location
  }
})

export default store
