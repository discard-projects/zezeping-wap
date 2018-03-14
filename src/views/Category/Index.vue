<template>
  <div class="wap-navbar-exist categories">
    <wap-navbar>
      <template slot="left">
        <wap-navbar-back-icon @click.native="$router.go(-1)">
          <span style="font-size: 17px">返回</span>
        </wap-navbar-back-icon>
      </template>
      {{category && category.name || '分类'}}
    </wap-navbar>
    <store-search v-model="searchValue" :categoryId="$route.params.id"></store-search>
    <!-- 分类下商家列表 -->
    <div is="wap-scroll-section" :pull-refresh="pullRefresh" :infinite-scroll="infiniteScroll" class="scroll-section">
      <wap-list>
        <wap-list-item class="wap-pointer" v-for="store in tableData.data" :key="store.id" @click.native="$router.push({name: 'storeDetail', params: {id: store.id}})">
          <template slot="left">
            <store-item :store="store"></store-item>
          </template>
          <template slot="right"><i class="iconfont icon-front"></i></template>
        </wap-list-item>
      </wap-list>
    </div>
  </div>
</template>

<script>
import StoreSearch from '@/components/Store/Search.vue'
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
      searchValue: '',
      category: null,
      action: ''
    }
  },
  methods: {
    beforeFetch () {
      if (this.action !== 'more') {
        this.tableData.data = []
      }
      this.tableData.loading = true
    },
    fetchData () {
      return this._fetchData(this.api.getCategoryStores(this.$route.params.id, Object.assign({}, this.q)))
    },
    afterFetch (data) {
      this.tableData.loading = false
      this.paginateMeta = data.pagination
      if (this.action === 'more') {
        this.data = data
        this.tableData.data = this.tableData.data.concat(data.items)
      } else {
        this.data = data
        this.tableData.data = data.items
      }
    },
    pullRefresh (finished) {
      this.action = 'refresh'
      this.fetchData().then(res => {
        finished && finished()
      }).catch(() => {
        finished && finished()
      })
    },
    infiniteScroll (finished) {
      this.action = 'more'
      if (this.q.page !== this.paginateMeta.total_pages) {
        this.q.page += 1
        this.fetchData().then(res => {
          if (this.q.page >= this.paginateMeta.total_pages) {
            finished(true)
          } else {
            finished()
          }
        }).catch(() => {
          finished()
        })
      }
    }
  },
  mounted () {
    this.api.getCategory(this.$route.params.id).then(res => {
      this.category = res.data.item
    })
  },
  components: {
    StoreSearch,
    StoreItem
  }
}
</script>

<style lang="scss" scoped>
.categories {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;

  .scroll-section {
    flex: 1;
  }
}
</style>
