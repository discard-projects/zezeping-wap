<template>
  <div>
    <wap-search v-model="searchValue" full-page placeholder="输入要搜索的店铺名称">
      <wap-list title="搜索结果">
        <wap-list-item class="wap-pointer" v-for="store in stores" :key="store.id" @click.native.stop="$router.push({name: 'storeDetail', params: {id: store.id}})">
          <template slot="left">
            <store-item :store="store"></store-item>
          </template>
          <template slot="right"><i class="iconfont icon-front"></i></template>
        </wap-list-item>
      </wap-list>
    </wap-search>
  </div>
</template>

<script>
import StoreItem from '@/components/Store/Item'
export default {
  data () {
    return {
      searchValue: '',
      stores: []
    }
  },
  watch: {
    searchValue: {
      handler (nv) {
        this.searchStores(nv)
      },
      immediate: true
    }
  },
  methods: {
    searchStores (query) {
      this.api.getStores({q_name_cont: query}).then(res => {
        this.stores = res.data.items
      })
    }
  },
  components: {
    StoreItem
  }
}
</script>
