<template>
  <div class="wap-list">
    <div class="title" v-if="!noTitle">
      <slot name="title">
        <span v-html="title"></span>
      </slot>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'WapList',
  props: {
    title: [String],
    noTitle: [Boolean]
  }
}
</script>

<style lang="scss" scoped>
  @import "styleMix";
  @include wap-list;
</style>
