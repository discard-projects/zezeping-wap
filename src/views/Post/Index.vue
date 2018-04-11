<template>
  <div class="wap-navbar-exist wap-tabbar-exist" style="box-sizing: content-box">
    <wap-navbar>
      帖子
      <template slot="right">
        <wap-dropdown :options="kindOfSortObjects" :selected="nowSortObject" @updateOption="sortOnSelect" v-if="nowSortObject"></wap-dropdown>
      </template>
    </wap-navbar>
    <wap-list :title="nowSortObject && nowSortObject.name">
      <wap-list-item class="wap-pointer" v-for="post in tableData.data" :key="post.id" @click.native="$router.push({name: 'PostShow', params: {id: post.id}})">
        <template slot="left">
          <post-item :item="post"></post-item>
        </template>
        <template slot="right"><i class="iconfont icon-front"></i></template>
      </wap-list-item>
    </wap-list>
    <!-- tabbar -->
    <wap-tabbar>
      <wap-tabbar-item @click.native.stop="$router.push({name: 'Home'})">首页</wap-tabbar-item>
      <wap-tabbar-item class="active" @click.native.stop="$router.push({name: 'Post'})">帖子</wap-tabbar-item>
      <wap-tabbar-item @click.native.stop="$router.push({name: 'Personal'})">个人中心</wap-tabbar-item>
    </wap-tabbar>
  </div>
</template>

<script>
import index from '@/components/Shared/Mixin/index'
import query from '@/components/Shared/Mixin/query'
import PostItem from '@/components/Post/Item'
export default {
  mixins: [index, query],
  data () {
    return {
      nowSortObject: null
    }
  },
  computed: {
    kindOfSortObjects () {
      return [{
        name: '最新创建',
        key: 'new',
        disabled: this.nowSortObject && this.nowSortObject.key === 'new'
      }, {
        name: '浏览最多',
        key: 'views-hot',
        disabled: this.nowSortObject && this.nowSortObject.key === 'views-hot'
      }, {
        name: '点赞最多',
        key: 'votes-hot',
        disabled: this.nowSortObject && this.nowSortObject.key === 'votes-hot'
      }, {
        name: '收藏最多',
        key: 'collections-hot',
        disabled: this.nowSortObject && this.nowSortObject.key === 'collections-hot'
      }, {
        name: '我的收藏',
        key: 'collected',
        disabled: this.nowSortObject && this.nowSortObject.key === 'collected'
      }, {
        name: '我的',
        key: 'my',
        disabled: this.nowSortObject && this.nowSortObject.key === 'my'
      }]
    }
  },
  watch: {
    nowSortObject (newVal, oldVal) {
      if (newVal && oldVal) {
        switch (newVal.key) {
          case 'new':
            this.fetchData({qs_sorts: 'created_at desc', q_page: 1})
            break
          case 'views-hot':
            this.fetchData({qs_sorts: 'views_count desc', q_page: 1})
            break
          case 'votes-hot':
            this.fetchData({qs_sorts: 'votes_count desc', q_page: 1})
            break
          case 'collections-hot':
            this.fetchData({qs_sorts: 'collections_count desc', q_page: 1})
            break
          case 'collected':
            this.fetchData({q_collections_user_id_eq: this.userInfo && this.userInfo.id, q_page: 1})
            break
          case 'my':
            this.fetchData({q_user_id_eq: this.userInfo && this.userInfo.id, q_page: 1})
            break
        }
      }
    }
  },
  methods: {
    fetchData (extraQuery) {
      if (!extraQuery) {
        extraQuery = {qs_sorts: 'created_at desc'}
      }
      this._fetchData(this.api.getPosts(Object.assign({}, this.q, extraQuery)))
    },
    sortOnSelect (selectObject) {
      this.nowSortObject = selectObject
    }
  },
  mounted () {
    this.nowSortObject = this.kindOfSortObjects[0]
  },
  components: {
    PostItem
  }
}
</script>
