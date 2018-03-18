<template>
  <googlemaps-map style="min-height: 200px" :center="position" :zoom="14">
    <googlemaps-marker :position="position"></googlemaps-marker>
  </googlemaps-map>
</template>

<script>
import Vue from 'vue'
import 'vue-googlemaps/dist/vue-googlemaps.css'
import VueGoogleMaps from 'vue-googlemaps'
Vue.use(VueGoogleMaps, {
  load: {
    apiKey: 'AIzaSyCReic9VFOA3eL5pfWjntW92WlMtTMnlJk',
    libraries: ['places']
  }
})
export default {
  props: {
    // {lat: 1.42, lng: 103.8}
    position: {
      type: Object,
      require: true
    }
  }
}
</script>
