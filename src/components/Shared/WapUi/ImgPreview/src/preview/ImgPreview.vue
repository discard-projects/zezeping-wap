<template>
  <div class="wap-img-box-img-preview">
    <div class="preview-wrapper">
      <div class="pagination">{{nowIndex + 1}}/{{urls.length}}</div>
      <img src="./close.svg" class="close-btn" @click="closePreview()"/>
      <wap-swiper :interval="0" :loop="false" :pagination="false" @change="indexChange" ref="swiperRef" style="height: 100%; background: inherit; position: relative; z-index: 1000">
        <wap-swiper-item v-for="(url, index) in urls" :key="index" style="display: flex; align-items: center; justify-content: center">
          <img :src="url" alt="">
        </wap-swiper-item>
      </wap-swiper>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imgDoms: {
      type: Array
    },
    event: {
      default: null
    }
  },
  data () {
    return {
      firstInit: false,
      currentEl: null,
      nowIndex: -1
    }
  },
  computed: {
    urls () {
      if (this.imgDoms) {
        return Array.prototype.map.call(this.imgDoms, dom => dom.getAttribute('src2') || dom.getAttribute('src'))
      }
      return []
    }
  },
  methods: {
    indexChange (nowIndex) {
      this.nowIndex = nowIndex
      if (this.currentEl !== this.imgDoms[nowIndex]) {
        this.recover(this.currentEl, false)
        this.currentEl = this.imgDoms[nowIndex]
        this.openScaleElement(this.currentEl)
      }
    },
    openScaleElement (el) {
      el.beforeProperty = el.beforeProperty ? el.beforeProperty : this.getProperty(el)
      el.style.transformOrigin = 'left top'
      el.style.position = 'relative'
      el.style.zIndex = '1100'
      el.style.transition = 'transform 333ms cubic-bezier(0.4, 0, 0.22, 1)'
      this.transform(el, this.calEndStatus(el))
      this.currentEl = el
      let transitionend = (ev) => {
        let el = ev.target
        if (!this.firstInit) {
          this.firstInit = true
          this.$el.style.opacity = 1
          this.nowIndex = this.imgDoms.indexOf(el)
          this.initSwiperPosition()
        }
        el.removeEventListener('transitionend', transitionend)
      }
      el.addEventListener('transitionend', transitionend, false)
    },
    calEndStatus (img) {
      /* 首先计算出缩放的比例 */
      /*
        先确定图片在 img-browser 里面显示的宽度;
        如果图片的真实宽度, 小于屏幕的宽度, 则不再缩放, 按照真实的宽度进行显示
        如果图片的真实宽度大于屏幕的宽度, 图片的宽度需要是屏幕的宽度;
        如果图片宽度为屏幕宽度
        查看当前的显示的宽度, 然后计算出 x 方向的缩放比例
        图片的真实宽度, 到图片显示的宽度的比例, 再将这个比例和图片的真实高度比较
        就能拿到图片在 img-browser 中显示的高度.
      */
      let xRadio = 0
      let yRadio = 0
      /* 这个值在后面还要用 */
      let height = 0
      let xTranslate = 0
      let yTranslate = 0
      xRadio = parseFloat(window.innerWidth / img.width)
      let radio = window.innerWidth / img.naturalWidth
      height = radio * img.naturalHeight
      yRadio = parseFloat(height / img.height)
      /*
          先算一下如果元素距离顶部的距离为 0 的时候, 垂直居中, y 需要偏移多少;
          再拿到当前元素实际距离顶部的距离
          如果实际距离, 大于需要的距离.
      */
      let offset = (window.innerHeight - height) / 2
      let top = img.getBoundingClientRect().top
      /* x 轴位移 */
      xTranslate = -img.getBoundingClientRect().left
      /*
          这样计算是错误的.
          if (top < offset) {
          } else {
              yTranslate = top - offset;
          }
      */
      yTranslate = parseFloat(offset - top)
      return {
        xRadio: xRadio,
        yRadio: yRadio,
        xTranslate: xTranslate,
        yTranslate: yTranslate
      }
    },
    getProperty (img) {
      let m = getComputedStyle(img)
      return {
        position: m.position,
        zIndex: m.zIndex
      }
    },
    recover (img, transition = true) {
      /* 因为有时候有些图片没加载出来, 会报错 */
      if (img) {
        if (!transition) {
          img.style.transition = 'no'
          if (img.beforeProperty) {
            img.style.zIndex = img.beforeProperty.zIndex
            img.style.position = img.beforeProperty.position
          }
        } else {
          let transitionend = (ev) => {
            let el = ev.target
            if (el.beforeProperty) {
              el.style.zIndex = el.beforeProperty.zIndex
              el.style.position = el.beforeProperty.position
            }
            el.removeEventListener('transitionend', transitionend)
          }
          img.addEventListener('transitionend', transitionend, false)
        }
        img.style.transform = 'scale(1)'
      }
    },
    transform (el, {xRadio, yRadio, xTranslate, yTranslate}) {
      el.style.transform = `translate3d(${xTranslate}px, ${yTranslate}px, 0px) scale(${xRadio}, ${yRadio})`
    },
    initSwiperPosition () {
      this.$refs['swiperRef'].goToIndex(this.nowIndex, false)
    },
    closePreview () {
      this.recover(this.currentEl)
      this.currentEl = null
      this.close()
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.indexChange(this.imgDoms.indexOf(this.event.target))
    })
  }
}
</script>

<style lang="scss" scoped>
  @import "../styleMix";
  @include wap-img-box-img-preview;
</style>

<style lang="scss">
  .wap-img-box-img-preview {
    img {
      max-width: 100%;
    }
  }
</style>
