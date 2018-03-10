export default {
  data () {
    return {
      dialogShow: false,
      item: null,
      form: null,
      submiting: false
    }
  },
  computed: {
    itemId () {
      return (this.item && this.item.id) || (this.form && this.form.id)
    }
  },
  watch: {
    item (newVal) {
      if (newVal) {
        this.dialogShow = true
        this.fetchData()
      }
    },
    dialogShow () {
      this.item = null
    }
  },
  methods: {
    fetchData () {
    },
    _fetchData (promise) {
      promise.then((res) => {
        this.form = res.data.item
      }).catch(() => {
        // this.loading = false
      })
    },

    _handlerUpdate (promise, cb) {
      this.submiting = true
      promise.then(res => {
        this.submiting = false
        cb && cb(null, res)
        this.$emit('fetchData')
        this.dialogShow = false
      }).catch((err) => {
        this.submiting = false
        cb && cb(err)
      })
    }
  }
}
