<template>
  <div class="moments wap-navbar-exist">
    <wap-navbar>
      <template slot="left">
        <wap-navbar-back-icon @click.native="$router.go(-1)">
          <span style="font-size: 17px">返回</span>
        </wap-navbar-back-icon>
      </template>
      <template slot="right">
        <span class="wap-pointer" @click="goNewMoment">发表</span>
        <NewMoment ref="newMomentRef" @fetchData="pullRefresh"></NewMoment>
      </template>
      商圈
    </wap-navbar>
    <!-- 分类下商家列表 -->
    <div is="wap-scroll-section" :pull-refresh="pullRefresh" :infinite-scroll="infiniteScroll" class="scroll-section">
      <ul>
        <li v-for="moment in tableData.data" :key="moment.id">
          <moment-item :moment="moment"></moment-item>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import MomentItem from '@/components/Moment/Item'
import index from '@/components/Shared/Mixin/index'
import query from '@/components/Shared/Mixin/query'
import NewMoment from './parts/NewMoment.vue'
export default {
  mixins: [index, query],
  methods: {
    beforeFetch () {
      if (this.action !== 'more') {
        this.tableData.data = []
      }
      this.tableData.loading = true
    },
    fetchData () {
      return this._fetchData(this.api.getMoments(Object.assign({}, this.q)))
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
        finished && finished(this.allFetched)
      }).catch(() => {
        finished && finished(this.allFetched)
      })
    },
    infiniteScroll (finished) {
      if (this.allFetched) {
        return finished(true)
      }
      this.action = 'more'
      if (this.q.page !== this.paginateMeta.total_pages) {
        this.q.page += 1
        this.fetchData().then(res => {
          finished(this.allFetched)
        }).catch(() => {
          finished()
        })
      }
    },
    goNewMoment () {
      if (this.validOwnStore()) {
        this.$refs['newMomentRef'].showPop = true
      }
    }
  },
  components: {
    MomentItem,
    NewMoment
  }
}
</script>

<style lang="scss" scoped>
  .moments {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;

    .scroll-section {
      flex: 1;
    }
  }
</style>
