export default {
  data () {
    return {
      paginateMeta: {},
      tableData: {
        data: [],
        dataIntros: [],
        loading: false
      },
      data: null
    }
  },
  watch: {
    '$route': {
      handler () {
        this.fetchData()
      },
      immediate: true
    }
  },
  computed: {
    items () { return this.tableData.data }
  },
  methods: {
    reInitData () {
      this.paginateMeta = {}
      this.tableData = {
        data: [],
        dataIntros: [],
        loading: false
      }
      this.data = null
    },
    beforeFetch () {
      this.tableData.data = []
      this.tableData.loading = true
    },
    fetchData () {},
    _fetchData (promise) {
      return new Promise((resolve, reject) => {
        this.beforeFetch()
        promise.then((res) => {
          this.afterFetch(res.data)
          resolve(res)
        }).catch((err) => {
          this.tableData.loading = false
          reject(err)
        })
      })
    },
    afterFetch (data) {
      this.tableData.loading = false
      this.paginateMeta = data.pagination
      this.data = data
      this.tableData.data = data.items
    }
  }
}
