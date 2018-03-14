<template>
  <!-- 分类下商家列表 -->
  <wap-list :title="name">
    <wap-list-item class="wap-pointer" v-for="store in tableData.data" :key="store.id" @click.native="$router.push({name: 'storeDetail', params: {id: store.id}})">
      <template slot="left">
        <store-item :store="store"></store-item>
      </template>
      <template slot="right"><i class="iconfont icon-front"></i></template>
    </wap-list-item>
  </wap-list>
</template>

<script>
import StoreItem from '@/components/Store/Item'
import index from '@/components/Shared/Mixin/index'
import query from '@/components/Shared/Mixin/query'
export default {
  mixins: [index, query],
  props: {
    name: {
      require: true
    }
  },
  data () {
    return {
    }
  },
  methods: {
    fetchData () {
      this._fetchData(this.api.getHomeStores(Object.assign({}, this.q, {category_name: this.name, per_page: 5})))
    }
  },
  components: {
    StoreItem
  }
}
</script>
