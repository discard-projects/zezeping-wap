<template>
  <div id="app">
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted () {
    if (this.$store.state.user.authInfo) {
      this.api.getMeProfile().then(res => {
        this.$store.dispatch('setUserInfo', res.data.item)
      })
    }
  }
}
</script>

<style>
  #app {
    height: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
</style>
