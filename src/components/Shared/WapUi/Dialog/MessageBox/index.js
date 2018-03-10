import MessageBox from './message-box.vue'
import pageScroll from '../../_utils/libs/pageScroll'

MessageBox.install = function (Vue, options) {
  MessageBox.new = (options = {}) => {
    const instance = new Vue({
      data: options,
      render (h) {
        return h(MessageBox, {
          props: options
        })
      }
    })
    const component = instance.$mount()
    document.body.appendChild(component.$el)
    pageScroll.lock(component.$el)

    const messageBox = instance.$children[0]
    function hashChange () {
      pageScroll.unlock()
      const el = messageBox.$el
      el.parentNode && el.parentNode.removeChild(el)
    }
    window.addEventListener('hashchange', hashChange)
    // methods
    messageBox.close = (trigger) => {
      const el = messageBox.$el
      pageScroll.unlock(el)
      el.parentNode && el.parentNode.removeChild(el)
      window.removeEventListener('hashchange', hashChange)
      messageBox.callback && messageBox.callback(trigger)
    }
  }
}

export default MessageBox
