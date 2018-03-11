<template>
  <div>
    <div>login...</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      text: '无效的请求'
    }
  },
  mounted () {
    if (this.$route.query) {
      this.$store.dispatch('setAuthInfo', this.$route.query)
      this.api.getMeProfile().then(res => {
        this.$store.dispatch('setUserInfo', res.data.item)
        if (res.data.item.nickname) {
          this.$router.push({name: 'Home'})
        } else {
          this.$router.push({name: 'Profile'})
        }
      })
    }
  }
}
</script>
