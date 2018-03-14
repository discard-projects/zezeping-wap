<template>
  <div class="wap-navbar-exist">
    <wap-navbar>
      <template slot="left">
        <wap-navbar-back-icon @click.native="$router.go(-1)">
          <span style="font-size: 17px">返回</span>
        </wap-navbar-back-icon>
      </template>
      <template slot="right">
        <span class="wap-pointer" @click="$refs['newCommentRef'].showPop = true">评论</span>
        <NewComment :store="store" ref="newCommentRef" @fetchData="getStoreInfo"></NewComment>
      </template>
      详情
    </wap-navbar>
    <div style="padding: 10px 20px; background: #fff">
      <store-item :store="store"></store-item>
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
import StoreItem from '@/components/Store/Item'
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
    }
  },
  mounted () {
    this.getStoreInfo()
  },
  components: {
    StoreItem,
    Comments,
    NewComment,
    Map
  }
}
</script>
