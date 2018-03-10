<template>
  <header class="wap-navbar">
    <div class="navbar-item navbar-left">
      <slot name="left"></slot>
    </div>
    <div class="navbar-center-box" :style="{flex}">
      <div class="navbar-center">
        <slot><span v-html="title" class="navbar-title"></span></slot>
      </div>
    </div>
    <div class="navbar-item navbar-right">
      <slot name="right"></slot>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    title: [String],
    flex: {
      type: Number,
      default: 2
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "styleMix";
  @include wap-navbar;
</style>

<style lang="scss">
  .wap-navbar-exist {
    padding-top: pxRem(50);
  }
</style>
