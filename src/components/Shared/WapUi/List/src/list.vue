<template>
  <div class="wap-list">
    <div class="title" v-html="title"></div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'WapList',
  props: {
    title: [String]
  }
}
</script>

<style lang="scss" scoped>
  @import "styleMix";
  @include wap-list;
</style>
