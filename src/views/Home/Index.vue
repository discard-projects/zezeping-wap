<template>
  <div class="wap-navbar-exist">
    <wap-navbar>首页</wap-navbar>
    <wap-slider :autoplay="3000" loop style="height: 200px">
      <div><img src="http://www.3987.com/uploadfile/2016/0418/20160418031310369.jpg"></div>
      <div><img src="http://www.ylmfu.com/zhuti/UploadPic/2017-2/201722819541986395.jpg"></div>
      <div><img src="http://gb.cri.cn/mmsource/images/2014/01/02/96/5479834386156741828.jpg"></div>
    </wap-slider>
    <wap-roll-notice style="background: #fff">
      <div>hello1</div>
      <div>hello2</div>
      <div>hello3</div>
      <div>hello4</div>
    </wap-roll-notice>
    <div>
      <wap-search v-model="searchValue" placeholder="搜索"></wap-search>
    </div>
    <div style="margin-top: 15px">
      <wap-search v-model="searchValue" full-page placeholder="搜索 with full page">
        I'm slot， 哈哈 {{searchValue}}
      </wap-search>
    </div>
    <div v-if="home">
      <category-stores :name="category.name" v-for="category in home.categories" :key="category.id"></category-stores>
    </div>

  </div>
</template>

<script>
import CategoryStores from './parts/CategoryStores.vue'
import index from '@/components/Shared/Mixin/index'
import query from '@/components/Shared/Mixin/query'
export default {
  mixins: [index, query],
  data () {
    return {
      home: null,
      searchValue: ''
    }
  },
  methods: {
    getHome () {
      this.api.getHome().then(res => {
        this.home = res.data
      })
    }
  },
  mounted () {
    this.getHome()
  },
  components: {
    CategoryStores
  }
}
</script>

<style lang="scss" scoped>
</style>
