<template>
  <div class="wap-textarea" :class="{'exist-counter': showCounter && maxlength}">
    <textarea v-model="currentValue" :placeholder="placeholder" :maxlength="maxlength" :readonly="readonly" ref="textarea"></textarea>
    <i class="input-clear iconfont icon-clear" @click="currentValue = ''" v-show="showClear && currentValue"></i>
    <div class="textarea-counter" v-if="showCounter && maxlength">{{nowCount}}/{{maxlength}}</div>
  </div>
</template>

<script>
export default {
  name: 'WapTextarea',
  props: {
    value: [String],
    placeholder: [String],
    readonly: [Boolean],
    showClear: {
      type: Boolean,
      default: false
    },
    maxlength: {
      type: [Number, String],
      default: ''
    },
    showCounter: [Boolean]
  },
  computed: {
    currentValue: {
      get () {
        let value = this.value
        if (value && value.length > this.maxlength) {
          value = value.substr(0, this.maxlength)
        }
        return value || ''
      },
      set (val) {
        this.$emit('input', val)
      }
    },
    nowCount () {
      return this.currentValue.length
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "styleMix";
  @include wap-textarea;
</style>
