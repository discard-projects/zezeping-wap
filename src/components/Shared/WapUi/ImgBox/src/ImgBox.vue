<template>
  <div class="wap-img-box" :class="{'open-preview': isPreviewMode}" @touchstart.stop>
    <div class="bg-wrapper" v-if="isPreviewMode"></div>
    <div class="preview-wrapper" ref="previewRef" v-show="isPreviewMode" @click="closePreview()"></div>
    <div class="images-wrapper">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isPreviewMode: false
    }
  },
  methods: {
    closePreview () {
      let imgEl = this.$refs['previewRef'].querySelector('img.preview')
      imgEl && imgEl.click()
    }
  },
  mounted () {
    Array.prototype.forEach.call(this.$el.querySelectorAll('img.preview'), (el) => {
      el.addEventListener('click', (ev) => {
        this.isPreviewMode = !this.isPreviewMode
        if (this.isPreviewMode) {
          let cloneEl = el.cloneNode(true)
          let rect = el.getBoundingClientRect()
          this.$refs['previewRef'].appendChild(cloneEl)
          cloneEl.style.top = `${rect.top}px`
          cloneEl.style.left = `${rect.left}px`
          cloneEl.style.maxWidth = 'none'
          cloneEl.style.maxHeight = 'none'
          setTimeout(() => {
            cloneEl.style.left = '50%'
            cloneEl.style.width = '90%'
            cloneEl.style.top = '50%'
            cloneEl.style.transform = 'translate(-50%, -50%)'
          })

          if (cloneEl.getAttribute('src2')) {
            cloneEl.setAttribute('src', cloneEl.getAttribute('src2'))
          }

          cloneEl.addEventListener('click', (ev) => {
            ev.stopPropagation()
            cloneEl.style.top = `${rect.top}px`
            cloneEl.style.left = `${rect.left}px`
            cloneEl.style.transform = 'translate(0, 0)'
            this.isPreviewMode = false
            cloneEl.parentNode.removeChild(cloneEl)
          })
        }
      })
    })
  }
}
</script>

<style lang="scss" scoped>
  @import "styleMix";
  @include wap-img-box;
</style>

<!--<wap-img-box ref="imgBoxRef">-->
  <!--<img src="/static/wechat_logo.jpeg" class="preview" alt="">-->
<!--</wap-img-box>-->
