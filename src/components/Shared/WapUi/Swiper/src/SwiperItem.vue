<template>
  <div class="wap-swiper-item" @click="$emit('click')">
    <slot></slot>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
  @import "styleMix";
  @include wap-swiper-item;
</style>
