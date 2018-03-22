<template>
  <wap-list v-if="store">
    <wap-list-item v-for="moment in moments" :key="moment.id">
      <template slot="left">
        <moment-item :moment="moment"></moment-item>
      </template>
    </wap-list-item>
  </wap-list>
</template>

<script>
import MomentItem from '@/components/Moment/Item'
export default {
  props: {
    store: {
      require: true
    }
  },
  data () {
    return {
      moments: []
    }
  },
  watch: {
    store (nv) {
      this.getStoreMoments()
    }
  },
  methods: {
    getStoreMoments () {
      this.api.getStoreMomments(this.$route.params.id).then(res => {
        this.moments = res.data.items
      })
    }
  },
  mounted () {
    this.getStoreMoments()
  },
  components: {
    MomentItem
  }
}
</script>
