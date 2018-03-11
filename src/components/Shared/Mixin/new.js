export default {
  data () {
    return {
      dialogShow: false,
      form: {}
    }
  },
  methods: {
    _handlerCreate (promise) {
      promise.then(res => {
        this.$emit('fetchData')
        this.dialogShow = false
      }).catch(() => {
      })
    }
  }
}
