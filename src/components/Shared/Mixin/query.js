export default {
  data () {
    return {
      q: {}
    }
  },
  watch: {
    '$route': {
      handler () {
        this.initQ()
      },
      immediate: true
    }
  },
  methods: {
    initQ () {
      let q = {
        page: 1,
        per_page: this.q.per_page || 25
      }
      // full data from url query, if admin just refresh page, can not load q_xxx keys.
      this.q = q
    }
  }
}
