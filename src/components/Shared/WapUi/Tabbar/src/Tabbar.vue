<template>
  <header class="wap-tabbar">
    <slot></slot>
  </header>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
  @import "styleMix";
  @include wap-tabbar;
</style>
