<template>
  <wap-list noTitle v-if="store">
    <wap-list-item v-for="comment in comments" :key="comment.id">
      <template slot="left">
        <comment-item :comment="comment"></comment-item>
      </template>
    </wap-list-item>
  </wap-list>
</template>

<script>
import CommentItem from '@/components/Comment/Item.vue'
export default {
  props: {
    store: {
      require: true
    }
  },
  data () {
    return {
      comments: []
    }
  },
  watch: {
    store (nv) {
      this.getStoreComments()
    }
  },
  methods: {
    getStoreComments () {
      this.api.getStoreComments(this.$route.params.id).then(res => {
        this.comments = res.data.items
      })
    }
  },
  mounted () {
    this.getStoreComments()
  },
  components: {
    CommentItem
  }
}
</script>
