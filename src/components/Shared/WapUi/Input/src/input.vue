<template>
  <div class="wap-input">
    <input v-model="currentValue" :type="type" :placeholder="placeholder" :readonly="readonly" autocomplete="off" ref="input">
    <i class="input-clear iconfont icon-clear" @click="currentValue = ''" v-show="showClear && currentValue"></i>
  </div>
</template>

<script>
export default {
  name: 'WapInput',
  props: {
    value: [String],
    type: [String],
    placeholder: [String],
    readonly: [Boolean],
    showClear: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    currentValue: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "styleMix";
  @include wap-input;
</style>
