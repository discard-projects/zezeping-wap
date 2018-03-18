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
    // swiper swiper-item
    Vue.component('WapSwiper', (resolve) => {
      resolve(require('./Swiper/src/Swiper.vue'))
    })
    Vue.component('WapSwiperItem', (resolve) => {
      resolve(require('./Swiper/src/SwiperItem.vue'))
    })
    // RollNotice 垂直滚动
    Vue.component('WapRollNotice', (resolve) => {
      resolve(require('./RollNotice/src/rollNotice.vue'))
    })
    // ScrollNotice 水平滚动
    Vue.component('WapScrollNotice', (resolve) => {
      resolve(require('./ScrollNotice/src/scrollNotice.vue'))
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
    // List ListItem
    Vue.component('WapList', (resolve) => {
      resolve(require('./List/src/list.vue'))
    })
    Vue.component('WapListItem', (resolve) => {
      resolve(require('./List/src/listItem.vue'))
    })
    // Rank
    Vue.component('WapRank', (resolve) => {
      resolve(require('./Rank/src/rank.vue'))
    })
    // Tabbar TabbarItem
    Vue.component('WapTabbar', (resolve) => {
      resolve(require('./Tabbar/src/Tabbar.vue'))
    })
    Vue.component('WapTabbarItem', (resolve) => {
      resolve(require('./Tabbar/src/TabbarItem.vue'))
    })
    // Popup
    Vue.component('WapPopup', (resolve) => {
      resolve(require('./Popup/src/popup.vue'))
    })
    // Switch
    Vue.component('WapSwitch', (resolve) => {
      resolve(require('./Switch/src/switch.vue'))
    })
    // RadioGroup Radio
    Vue.component('WapRadioGroup', (resolve) => {
      resolve(require('./Radio/src/RadioGroup.vue'))
    })
    Vue.component('WapRadio', (resolve) => {
      resolve(require('./Radio/src/Radio.vue'))
    })
    // CheckBoxGroup CheckBox
    Vue.component('WapCheckboxGroup', (resolve) => {
      resolve(require('./Checkbox/src/CheckboxGroup.vue'))
    })
    Vue.component('WapCheckbox', (resolve) => {
      resolve(require('./Checkbox/src/Checkbox.vue'))
    })
    // img-box
    // Vue.component('WapImgBox', (resolve) => {
    //   resolve(require('./ImgBox/src/ImgBox.vue'))
    // })
    Vue.component('WapImgBox', (resolve) => {
      resolve(require('./ImgPreview/src/ImgBox.vue'))
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
