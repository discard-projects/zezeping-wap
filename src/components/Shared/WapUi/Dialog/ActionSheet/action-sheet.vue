<template>
  <div class="wap-dialog wap-action-sheet">
    <div class="mask" @click.self.stop="closeActionSheet()"></div>
    <div class="action-sheet">
      <div v-for="(item,index) in items" :key="index" v-show="!(item && item.hidden)" class="action-sheet-item" :class="{'color-primary': item.color === true, 'color-disabled': item.disabled}" :style="{color: item.color}" @click.stop="!item.disabled && closeActionSheet(item)" v-html="item.text"></div>
      <div v-if="!(cancel && cancel.hidden)" class="action-sheet-item cancel" @click.stop="closeActionSheet(cancel)" v-html="cancel && cancel.text || '取消'"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: Array,
    cancel: Object,
    callback: Function
  }
}
</script>

<style lang="scss" scoped>
  @import "styleMix";
  @include wap-action-sheet;
</style>
