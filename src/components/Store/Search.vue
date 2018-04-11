<template>
  <div>
    <wap-search v-model="currentValue" full-page placeholder="输入要搜索的店铺名称">
      <div is="wap-scroll-section" :infinite-scroll="infiniteScroll" style="height: 100%" ref="scrollSectionRef">
        <wap-list :title="`搜索结果(${paginateMeta.total_count})`">
          <wap-list-item class="wap-pointer" v-for="store in tableData.data" :key="store.id" @click.native.stop="$router.push({name: 'StoreDetail', params: {id: store.id}})">
            <template slot="left">
              <store-item :store="store"></store-item>
            </template>
            <template slot="right"><i class="iconfont icon-front"></i></template>
          </wap-list-item>
        </wap-list>
      </div>
    </wap-search>
  </div>
</template>

<script>
import StoreItem from '@/components/Store/Item'
import index from '@/components/Shared/Mixin/index'
import query from '@/components/Shared/Mixin/query'
export default {
  mixins: [index, query],
  props: {
    value: {
      require: true
    },
    categoryId: {
      type: [String, Number]
    }
  },
  data () {
    return {
      q: {
        page: 1,
        per_page: 10
      }
    }
  },
  computed: {
    currentValue: {
      get () {
        return this.value
      },
      set (nv) {
        this.$emit('input', nv)
        this.reInitData()
        this.q = {page: 1, per_page: 10}
        this.$refs['scrollSectionRef'].reset()
        this.fetchData(nv)
      }
    }
  },
  methods: {
    beforeFetch () {},
    fetchData (query) {
      return this._fetchData(this.api.getStores(Object.assign({}, this.q, {q_name_or_desc_cont: query, q_categories_id_eq: this.categoryId})))
    },
    afterFetch (data) {
      this.paginateMeta = data.pagination
      this.data = data
      this.tableData.data = this.tableData.data.concat(data.items)
    },
    infiniteScroll (finished) {
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
  components: {
    StoreItem
  }
}
</script>
