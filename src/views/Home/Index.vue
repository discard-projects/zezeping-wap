<template>
  <div class="wap-navbar-exist wap-tabbar-exist" style="box-sizing: content-box">
    <wap-navbar>首页</wap-navbar>
    <store-search v-model="searchValue"></store-search>
    <div is="wap-scroll-section" :pull-refresh="getHome" dom-query="#app">
      <!--轮播图-->
      <wap-swiper :interval="3000" v-if="home && home.banners.length" style="height: 140px">
        <wap-swiper-item  v-for="banner in home.banners" :key="banner.id" style="display: flex; justify-content: center">
          <img :src="banner.image.url" style="max-width: 100%;">
        </wap-swiper-item>
      </wap-swiper>
      <!--滚动公告-->
      <wap-roll-notice style="background: #fff; padding: 0 5px; margin: 8px 0">
        <div>一家专门做菲律宾华人服务的网站</div>
        <div>各大店铺，期待你们的加入， 微信号：<span style="color: red">zezeping2018</span></div>
      </wap-roll-notice>
      <!-- 菜单 -->
      <wap-swiper :interval="0" :loop="false" v-if="home">
        <wap-swiper-item class="buttons-box" v-for="(categories,index) in calCategoryGroups" :key="index">
          <ul class="buttons-wrap">
            <li v-for="category in categories" :key="category.id" style="flex: 1; text-align: center" @click="clickButtonGo(category)">
              <div class="button-item">
                <img :src="category.logo_thumb.url" style="max-width: 100%">
                <p>{{category.name}}</p>
              </div>
            </li>
          </ul>
        </wap-swiper-item>
      </wap-swiper>
      <!--stores-->
      <div v-if="home">
        <category-stores :name="category.name" v-for="category in home.categories" :key="category.id"></category-stores>
      </div>
    </div>
    <!-- tabbar -->
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
  computed: {
    calCategoryGroups () {
      let data = [{
        logo_thumb: {
          url: require('../../assets/images/stores_moments.png')
        },
        route: { name: 'Moment' },
        name: '商圈'
      }]
      if (this.home && this.home.categories.length) {
        return data.concat(this.home.categories).chunk(4)
      }
      return data
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
    },
    clickButtonGo (category) {
      if (category.route) {
        this.$router.push(category.route)
      } else {
        this.$router.push({name: 'CategoryHome', params: {id: category.id}})
      }
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
    padding-bottom: 10px;

    .buttons-wrap {
      display: flex;
      align-items: center;
      justify-content: space-around;
      height: 80px;
      line-height: 18px;
      color: #333;

      .button-item {
        display: inline-block;
        height: 40px;
        width: 100%;
        text-align: center;
        font-size: 12px;
        border-radius: 20px;

        @include tap;
        img {
          width: 40px;
        }
      }
    }
  }
</style>
