<template>
  <div id="app">
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  #app {
    height: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    transform: translate(0, 0);
  }
</style>
