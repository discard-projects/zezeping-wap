<template>
  <div class="wap-slider" :class="{horizontal: direction == 'horizontal', vertical: direction == 'vertical'}">
    <div class="slider-wrap" :style="dragStyleObject" ref="sliderWrap" @touchstart="onTouchStart($event)" @touchmove="onTouchMove($event)" @touchend="onTouchEnd($event)">
      <div class="wap-slider-item first" v-html="lastItemHtml" v-if="loop"></div>
      <slot></slot>
      <div class="wap-slider-item last" v-html="firstItemHtml" v-if="loop"></div>
    </div>
    <slot name="pagination">
      <div class="slider-pagination-wrap" v-if="showPagination && itemsCount > 1">
        <span class="slider-pagination-item" v-for="index in itemsCount" :class="{active: index - 1 === nowRealItemIndex}"  :key="index"></span>
      </div>
    </slot>
  </div>
</template>

<script>
import touchMixin from '../../_utils/mixins/touchMixin'
export default {
  name: 'vmSlider',
  mixins: [touchMixin],
  props: {
    speed: {
      default: 200,
      validator (val) {
        return /^\d*$/.test(val)
      }
    },
    autoplay: {
      default: 0,
      validator (val) {
        return /^\d*$/.test(val)
      }
    },
    direction: {
      validator (val) {
        return ['horizontal', 'vertical'].indexOf(val) > -1
      },
      default: 'horizontal'
    },
    loop: {
      type: Boolean,
      default: false
    },
    showPagination: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      nowItemIndex: 0,
      nowRealItemIndex: 0,
      wrapSize: 0,
      firstItemHtml: '',
      lastItemHtml: '',
      items: [],
      dragStyleObject: {
        transform: 0,
        speed: 0
      },
      autoPlayTimer: null,
      supportTouch: false
    }
  },
  computed: {
    isVertical () {
      return this.direction === 'vertical'
    },
    itemsCount () {
      return this.items.length
    }
  },
  watch: {
    'touchInfo.current' (newVal) {
      if (newVal === 'start') {
        this.stopAutoPlay()
      } else if (newVal === 'end') {
        this.autoPlay()
      }
    }
  },
  methods: {
    init () {
      let children = this.$refs.sliderWrap.children
      this.items = this.loop ? Array.prototype.slice.call(children, 1, -1) : Array.prototype.slice.call(children, 0)
      if (this.itemsCount <= 0) return
      Array.prototype.forEach.call(children, (child) => { child.classList.add('wap-slider-item') })
      this.nowItemIndex = 0
      this.wrapSize = this.isVertical ? this.$el.offsetHeight : this.$refs.sliderWrap.clientWidth
      if (this.loop) {
        this.firstItemHtml = this.items[0].innerHTML
        this.lastItemHtml = this.items[this.itemsCount - 1].innerHTML
        this.nowItemIndex = 1
        this.setTranslate(0, -this.nowItemIndex * this.wrapSize)
        this.sendIndex(0)
      }
      this.initItemPosition(this.nowItemIndex)
      this.autoPlay()
    },
    initItemPosition (index) {
      if (this.isVertical) {
        this.setTranslate(0, -this.$el.offsetHeight * index)
      } else {
        this.setTranslate(0, -this.$refs.sliderWrap.offsetWidth * index)
      }
    },
    setTranslate (speed, translate) {
      this.dragStyleObject.transitionDuration = speed + 'ms'
      if (this.isVertical) {
        this.dragStyleObject.transform = 'translate3d(0, ' + translate + 'px, 0)'
      } else {
        this.dragStyleObject.transform = 'translate3d(' + translate + 'px, 0, 0)'
      }
    },
    autoPlay () {
      if (this.autoplay <= 0 || this.itemsCount.length <= 1) return
      this.stopAutoPlay()
      this.autoPlayTimer = setInterval(() => {
        this.wrapSize = this.isVertical ? this.$el.offsetHeight : this.$refs.sliderWrap.clientWidth
        const size = this.wrapSize
        if (!this.loop) {
          if (this.nowItemIndex + 1 >= this.itemsCount) {
            this.nowItemIndex = -1
          }
        }
        this.setTranslate(this.speed, -(++this.nowItemIndex * size))
        this.sendIndex(this.speed)
      }, this.autoplay)
    },
    sendIndex (delay) {
      let index = this.nowItemIndex
      if (this.loop) {
        if (this.nowItemIndex > this.itemsCount) {
          index = 0
        } else if (this.nowItemIndex <= 0) {
          index = this.itemsCount - 1
        } else {
          index = this.nowItemIndex - 1
        }
      }
      setTimeout(() => {
        this.nowRealItemIndex = index
        this.$emit('change', index)
      }, delay / 2)
      // 播放完动画后
      setTimeout(() => {
        if (this.loop) {
          if (this.nowItemIndex > this.itemsCount) {
            this.nowItemIndex = 1
            this.setTranslate(0, -this.nowItemIndex * this.wrapSize)
          } else if (this.nowItemIndex <= 0) {
            this.nowItemIndex = this.itemsCount
            this.setTranslate(0, -this.nowItemIndex * this.wrapSize)
          }
        }
      }, delay)
    },
    stopAutoPlay () {
      if (this.autoPlayTimer) {
        clearInterval(this.autoPlayTimer)
      }
      this.autoPlayTimer = null
    },
    destroy () {
      this.stopAutoPlay()
    },
    _onTouchStart (start, event) {
      if (!this.loop) {
        if (this.nowItemIndex === -1) {
          this.nowItemIndex = this.itemsCount - 1
          this.setTranslate(0, -(this.itemsCount - 1) * (this.isVertical ? this.$el.offsetHeight : this.$refs.sliderWrap.offsetWidth))
        }
        if (this.nowItemIndex > this.itemsCount - 1) {
          this.nowItemIndex = 1
          this.setTranslate(0, this.isVertical ? -this.$el.offsetHeight : -this.$refs.sliderWrap.offsetWidth)
        }
      } else {
        if (this.nowItemIndex === 0) {
          this.nowItemIndex = this.itemsCount
          this.setTranslate(0, -this.itemsCount * (this.isVertical ? this.$el.offsetHeight : this.$refs.sliderWrap.offsetWidth))
        }
        if (this.nowItemIndex > this.itemsCount) {
          this.nowItemIndex = 1
          this.setTranslate(0, this.isVertical ? -this.$el.clientHeight : -this.$refs.sliderWrap.offsetWidth)
        }
      }
    },
    _onTouchMove (moving, event) {
      if (!this.supportTouch || this.isVertical) {
        event.preventDefault()
      }
      if ((!this.isVertical ? moving.touchAngle > 45 : (90 - moving.touchAngle > 45)) && this.supportTouch) {
        this.setTranslate(0, -this.nowItemIndex * (this.isVertical ? this.$el.offsetHeight : this.$refs.sliderWrap.offsetWidth))
        return
      }
      const deltaSlide = this.isVertical ? (moving.y - this.touchInfo.start.y) : (moving.x - this.touchInfo.start.x)
      if (deltaSlide !== 0) {
        this.setTranslate(0, -this.nowItemIndex * (this.isVertical ? this.$el.offsetHeight : this.$refs.sliderWrap.offsetWidth) + deltaSlide)
      }
    },
    _onTouchEnd (end, event) {
      let moveOffset
      if (this.isVertical) {
        moveOffset = this.touchInfo.offset.y
      } else {
        moveOffset = this.touchInfo.offset.x
      }
      let wrapSize = this.wrapSize
      if ((Math.abs(moveOffset) <= wrapSize * 0.05) || this.itemsCount <= 1 || (!this.loop && ((moveOffset > 0 && this.nowItemIndex === 0) || (moveOffset < 0 && this.nowItemIndex === this.itemsCount - 1)))) {
        this.setTranslate(this.speed, -this.nowItemIndex * wrapSize)
      } else {
        this.setTranslate(this.speed, -((moveOffset > 0 ? --this.nowItemIndex : ++this.nowItemIndex) * wrapSize))
        this.sendIndex(this.speed)
      }
    }
  },
  mounted () {
    this.supportTouch = (window.Modernizr && !!window.Modernizr.touch) || (function () {
      return !!('ontouchstart' in window)
    })()
    this.$nextTick(() => {
      setTimeout(() => {
        this.init()
      })
    })
  },
  destroyed () {
    this.destroy()
  }
}
</script>

<style lang="scss">
  @import "styleMix";
  @include wap-slider;
</style>
