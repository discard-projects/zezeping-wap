<template>
  <div class="wap-img-box">
    <slot></slot>
  </div>
</template>

<script>
import Vue from 'vue'
import ImgPreview from './preview'
Vue.use(ImgPreview)
export default {
  props: {
    imgClass: {
      type: String
    }
  },
  data () {
    return {
      imgDoms: []
    }
  },
  methods: {
    openPreviewBox (event) {
      ImgPreview.new({event, imgDoms: this.imgDoms})
    },
    getImgDoms () {
      this.$nextTick(() => {
        let imgDoms = []
        if (this.imgClass) {
          let imgClass = this.imgClass.match(/^\./) ? this.imgClass : `.${this.imgClass}`
          imgDoms = this.$el.querySelectorAll(imgClass)
        } else {
          imgDoms = this.$el.querySelectorAll('img')
        }
        if (imgDoms.length) {
          this.imgDoms = [...imgDoms]
          Array.prototype.forEach.call(imgDoms, (dom) => {
            dom.addEventListener('click', this.openPreviewBox, false)
          })
        }
      })
    }
  },
  updated () {
    this.getImgDoms()
  },
  mounted () {
    this.getImgDoms()
  }
}
</script>

<style lang="scss" scoped>
  @import "styleMix";
  @include wap-img-box;
</style>

<!--<wap-img-box>-->
  <!--<img src="" alt="">-->
<!--</wap-img-box>-->
