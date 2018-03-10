import Navbar from './Navbar'
import WapToastBox from './Dialog/ToastBox'
import WapMessageBox from './Dialog/MessageBox'
import WapActionSheet from './Dialog/ActionSheet'
export default {
  install (Vue) {
    Vue.prototype.wapUi = Vue.prototype.wapUi || {}
    // NavBar
    Vue.use(Navbar)
    // button
    Vue.component('WapButton', (resolve) => {
      resolve(require('./Button/button.vue'))
    })
    // scroll-section
    Vue.component('WapScrollSection', (resolve) => {
      resolve(require('./ScrollSection/scrollSection.vue'))
    })
    // slider
    Vue.component('WapSlider', (resolve) => {
      resolve(require('./Slider/src/slider.vue'))
    })
    // RollNotice
    Vue.component('WapRollNotice', (resolve) => {
      resolve(require('./RollNotice/src/rollNotice.vue'))
    })
    // Input TextArea
    Vue.component('WapInput', (resolve) => {
      resolve(require('./Input/src/input.vue'))
    })
    Vue.component('WapTextarea', (resolve) => {
      resolve(require('./Textarea/src/textarea.vue'))
    })
    // Search
    Vue.component('WapSearch', (resolve) => {
      resolve(require('./Search/src/search.vue'))
    })
    // dialog
    Vue.use(WapToastBox)
    Vue.prototype.wapUi.WapToastBox = WapToastBox
    Vue.use(WapMessageBox)
    Vue.prototype.wapUi.WapMessageBox = WapMessageBox
    Vue.use(WapActionSheet)
    Vue.prototype.wapUi.WapActionSheet = WapActionSheet
  }
}
