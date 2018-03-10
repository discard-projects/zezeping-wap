import Navbar from './src/navbar.vue'
import NavbarBackIcon from './src/navbarBackIcon.vue'
export default {
  install (Vue) {
    Vue.component('WapNavbar', Navbar)
    Vue.component('WapNavbarBackIcon', NavbarBackIcon)
  }
}
