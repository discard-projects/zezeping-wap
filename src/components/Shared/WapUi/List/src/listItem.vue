<template>
  <div class="wap-list-item">
    <div class="main-wap-list-item">
      <div class="left" v-if="$slots.left">
        <slot name="left"></slot>
      </div>
      <div class="content" v-if="$slots.default">
        <slot></slot>
      </div>
      <div class="right" v-if="$slots.right">
        <slot name="right"></slot>
      </div>
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
