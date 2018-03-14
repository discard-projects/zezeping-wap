<template>
  <div class="wap-navbar-exist wap-tabbar-exist" style="box-sizing: content-box">
    <wap-navbar>首页</wap-navbar>
    <store-search v-model="searchValue"></store-search>
    <div is="wap-scroll-section" :pull-refresh="getHome" dom-query="#app">
      <!--轮播图-->
      <wap-slider :autoplay="3000" loop style="height: 140px" v-if="home && home.banners.length">
        <div v-for="banner in home.banners" :key="banner.id"><img :src="banner.image.url"></div>
      </wap-slider>
      <!--滚动公告-->
      <wap-roll-notice style="background: #fff; padding: 0 5px; margin: 8px 0">
        <div>一家专门做菲律宾华人服务的网站</div>
        <div>各大店铺，期待你们的加入， 微信号：<span style="color: red">zezeping2018</span></div>
      </wap-roll-notice>
      <!-- 菜单 -->
      <wap-slider :showPagination="false" v-if="home">
        <div class="buttons-box">
          <ul class="buttons-wrap">
            <li v-for="category in home.categories" :key="category.id">
              <span class="button" style="background: #f5b94f;" @click="$router.push({name: 'CategoryHome', params: {id: category.id}})" v-if="category.name === '美食'">美食</span>
              <span class="button" style="background: #4e95d9;" @click="$router.push({name: 'CategoryHome', params: {id: category.id}})" v-if="category.name === '生活服务'">生活服务</span>
              <span class="button" style="background: #8351f5;" @click="$router.push({name: 'CategoryHome', params: {id: category.id}})" v-if="category.name === '休闲娱乐'">休闲娱乐</span>
              <span class="button" style="background: #5ba8d6;" @click="$router.push({name: 'CategoryHome', params: {id: category.id}})" v-if="category.name === '其他'">其他</span>
            </li>
          </ul>
        </div>
      </wap-slider>

      <!--<div>-->
      <!--<wap-search v-model="searchValue" placeholder="搜索"></wap-search>-->
      <!--</div>-->
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
  .buttons-box {
    width: 100%;
    background: #fff;

    .buttons-wrap {
      display: flex;
      align-items: center;
      justify-content: space-around;
      height: 80px;

      .button {
        display: inline-block;
        height: 60px;
        width: 60px;
        line-height: 60px;
        text-align: center;
        font-size: 13px;
        border-radius: 30px;

        @include tap;
      }
    }
  }
</style>
