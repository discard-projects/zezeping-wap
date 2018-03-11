<template>
  <div class="wap-navbar-exist">
    <wap-navbar>
      <template slot="left">
        <wap-navbar-back-icon @click.native="$router.go(-1)">
          <span style="font-size: 17px">返回</span>
        </wap-navbar-back-icon>
      </template>
      详情
    </wap-navbar>
    <div style="padding: 10px 20px; background: #fff">
      <store-item :store="store"></store-item>
    </div>
    <!--评论-->
    <comments :store="store"></comments>
  </div>
</template>

<script>
import StoreItem from '@/components/Store/Item'
import Comments from './parts/Comments.vue'
export default {
  data () {
    return {
      store: null
    }
  },
  methods: {
    getStoreInfo () {
      this.api.getStore(this.$route.params.id).then(res => {
        this.store = res.data.item
      })
    }
  },
  mounted () {
    this.getStoreInfo()
  },
  components: {
    StoreItem,
    Comments
  }
}
</script>
