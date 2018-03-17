import WapSwiper from './src/Swiper.vue'
import WapSwiperItem from './src/SwiperItem.vue'

export default {
  install (Vue) {
    Vue.component('WapSwiper', WapSwiper)
    Vue.component('WapSwiperItem', WapSwiperItem)
  }
}
