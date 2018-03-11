<template>
  <div class="wap-list-item">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="content">
      <slot></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WapListItem',
  props: {
  }
}
</script>

<style lang="scss" scoped>
  @import "styleMix";
  @include wap-list-item;
</style>
