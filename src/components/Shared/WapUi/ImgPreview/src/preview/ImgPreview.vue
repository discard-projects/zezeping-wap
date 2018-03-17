<template>
  <div class="wap-img-box-img-preview">
    <div class="preview-wrapper">
      <div class="pagination">{{nowIndex + 1}}/{{urls.length}}</div>
      <img src="./close.svg" alt="" class="close-btn" @click="close()">
      <wap-swiper :interval="0" :loop="false" :pagination="false" @change="indexChange" style="height: 100%; background: inherit" ref="swiperRef">
        <wap-swiper-item v-for="(src, index) in urls" :key="index" style="display: flex; align-items: center">
          <img :src="src" alt="">
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
      nowIndex: 0
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
    }
  },
  mounted () {
    this.$nextTick(() => {
      let url = this.event && (this.event.target.getAttribute('src2') || this.event.target.getAttribute('src'))
      this.nowIndex = this.urls.indexOf(url)
      setTimeout(() => {
        this.$refs['swiperRef'].goToIndex(this.nowIndex, false)
      })
    })
  }
}
</script>

<style lang="scss">
  @import "../styleMix";
  @include wap-img-box-img-preview;
</style>
