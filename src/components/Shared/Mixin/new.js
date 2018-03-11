export default {
  data () {
    return {
      dialogShow: false,
      form: {}
    }
  },
  methods: {
    _handlerCreate (promise) {
      return new Promise((resolve, reject) => {
        promise.then(res => {
          this.$emit('fetchData')
          this.dialogShow = false
          resolve()
        }).catch((err) => {
          reject(err)
        })
      })
    }
  }
}
