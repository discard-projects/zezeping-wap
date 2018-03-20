import geolocation from '@/libs/geolocation.js'
export default {
  state: {
    // {lat: 14.5580015, lng: 121.0230316}
    loc: null,
    support: true
  },
  actions: {
    getCurrentLocation ({state, commit}) {
      console.log('get location ...')
      geolocation.getGeoLocation().then(loc => {
        commit('setCurrentLoc', loc)
      })
    }
  },
  mutations: {
    setCurrentLoc (state, loc) {
      state.loc = loc
    }
  }
}
