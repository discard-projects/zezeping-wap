<template>
  <span class="wap-button" :class="calcButtonClass" @click="handleClick">
    <i class="iconfont wap-icon" :class="{[this.icon]: this.icon, [this.loadingIcon]: this.loading}"></i>
    <slot></slot>
  </span>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'default'
    },
    size: {
      type: String,
      validator (value) {
        return ['large', 'small', 'mini', 'normal'].indexOf(value) > -1
      },
      default: 'normal'
    },
    disabled: [Boolean],
    icon: [String],
    loading: [Boolean],
    loadingIcon: {
      type: String,
      default: 'icon-loading'
    }
  },
  computed: {
    calcButtonClass () {
      return {
        [this.type]: true,
        'is-disabled': this.disabled,
        [this.size]: true
      }
    }
  },
  methods: {
    handleClick (evt) {
      !this.disabled && this.$emit('click', evt)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "styleMix";
  @include wap-button;
</style>
