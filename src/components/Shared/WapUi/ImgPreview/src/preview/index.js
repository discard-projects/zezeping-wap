import ImgPreview from './ImgPreview.vue'
import pageScroll from '../../../_utils/libs/pageScroll'
ImgPreview.install = function (Vue, options) {
  ImgPreview.new = (options = {event: null, imgDoms: []}) => {
    if (!options['onEl']) {
      options['onEl'] = document.body
    }
    const instance = new Vue({
      data: options,
      render (h) {
        return h(ImgPreview, {
          props: options
        })
      }
    })
    const component = instance.$mount()
    options['onEl'].appendChild(component.$el)
    pageScroll.lock(component.$el)

    component.nowIndex = options.index

    const imgPreview = instance.$children[0]
    function hashChange () {
      pageScroll.unlock()
      const el = imgPreview.$el
      el.parentNode && el.parentNode.removeChild(el)
    }
    window.addEventListener('hashchange', hashChange)
    // methods
    imgPreview.close = (trigger) => {
      const el = imgPreview.$el
      pageScroll.unlock(el)
      el.parentNode && el.parentNode.removeChild(el)
      window.removeEventListener('hashchange', hashChange)
      imgPreview.callback && imgPreview.callback(trigger)
    }
  }
}
export default ImgPreview
