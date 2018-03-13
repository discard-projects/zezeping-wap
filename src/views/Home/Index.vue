<template>
  <div class="wap-navbar-exist wap-tabbar-exist" style="box-sizing: content-box">
    <wap-navbar>首页</wap-navbar>

    <div is="wap-scroll-section" :pull-refresh="getHome" style="height: 100%" dom-query="body">
      <wap-slider :autoplay="3000" loop style="height: 140px" v-if="home && home.banners.length">
        <div v-for="banner in home.banners" :key="banner.id"><img :src="banner.image.url"></div>
      </wap-slider>
      <wap-roll-notice style="background: #fff; padding: 0 5px">
        <div>一家专门做菲华服务的网站</div>
        <div>各大店铺，期待你们的加入</div>
      </wap-roll-notice>
      <!--<div>-->
      <!--<wap-search v-model="searchValue" placeholder="搜索"></wap-search>-->
      <!--</div>-->
      <store-search v-model="searchValue"></store-search>
      <div v-if="home">
        <category-stores :name="category.name" v-for="category in home.categories" :key="category.id"></category-stores>
      </div>
    </div>

    <wap-tabbar>
      <wap-tabbar-item class="active" @click.native.stop="$router.push({name: 'Home'})">首页</wap-tabbar-item>
      <wap-tabbar-item @click.native.stop="$router.push({name: 'Personal'})">个人中心</wap-tabbar-item>
    </wap-tabbar>
  </div>
</template>

<script>
import CategoryStores from './parts/CategoryStores.vue'
import StoreSearch from '@/components/Store/Search.vue'
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
    getHome (finished) {
      this.api.getHome().then(res => {
        this.home = res.data
        finished && finished()
      }).catch(() => {
        finished && finished()
      })
    }
  },
  mounted () {
    this.getHome()
  },
  components: {
    CategoryStores,
    StoreSearch
  }
}
</script>

<style lang="scss" scoped>
</style>
