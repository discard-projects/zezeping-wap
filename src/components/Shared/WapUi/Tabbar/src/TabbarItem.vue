<template>
  <div class="wap-tabbar-item">
    <slot></slot>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
  @import "styleMix";
  @include wap-tabbar-item;
</style>
