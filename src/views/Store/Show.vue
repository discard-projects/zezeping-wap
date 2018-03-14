<template>
  <div class="wap-navbar-exist">
    <wap-navbar>
      <template slot="left">
        <wap-navbar-back-icon @click.native="$router.go(-1)">
          <span style="font-size: 17px">返回</span>
        </wap-navbar-back-icon>
      </template>
      <template slot="right">
        <span class="wap-pointer" @click="goComment">评论</span>
        <NewComment :store="store" ref="newCommentRef" @fetchData="getStoreInfo"></NewComment>
      </template>
      详情
    </wap-navbar>
    <div style="padding: 10px 20px; background: #fff">
      <store-item-detail :store="store"></store-item-detail>
    </div>
    <div>
      <Map :position="store.position" v-if="store && store.position"></Map>
    </div>
    <!--评论-->
    <comments :store="store"></comments>
  </div>
</template>

<script>
import Map from '@/components/Shared/Base/Map.vue'
import StoreItemDetail from '@/components/Store/ItemDetail'
import Comments from './parts/Comments.vue'
import NewComment from './parts/NewComment.vue'
export default {
  data () {
    return {
      store: null,
      newCommentForm: null
    }
  },
  methods: {
    getStoreInfo () {
      this.api.getStore(this.$route.params.id).then(res => {
        this.store = res.data.item
      })
    },
    goComment () {
      if (this.validLogin()) {
        this.$refs['newCommentRef'].showPop = true
      }
    }
  },
  mounted () {
    this.getStoreInfo()
  },
  components: {
    StoreItemDetail,
    Comments,
    NewComment,
    Map
  }
}
</script>
