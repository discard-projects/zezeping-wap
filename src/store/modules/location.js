import geolocation from '@/libs/geolocation.js'
export default {
  state: {
    loc: null,
    support: true
  },
  actions: {
    getCurrentLocation ({state, commit}) {
      console.log('get location ...')
      geolocation.getGeoLocation().then(loc => {
        commit('setCurrentLoc', loc)
        commit('setSupportLoc', true)
        console.log(loc)
      }).catch(err => {
        console.log(err)
        commit('setSupportLoc', false)
      })
    }
  },
  mutations: {
    setCurrentLoc (state, loc) {
      state.loc = loc
    },
    setSupportLoc (state, isSupport) {
      state.support = isSupport
    }
  }
}
