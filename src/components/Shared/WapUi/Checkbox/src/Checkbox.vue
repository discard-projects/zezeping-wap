<template>
  <label class="wap-checkbox" :class="{checked}">
    <input type="checkbox" v-model="checked" :value="val" @change="changeHandler" :disabled="disabled" />
    <span class="checkbox-icon"><i class="iconfont icon-success"></i></span>
    <span class="checkbox-text">
      <slot>{{val}}</slot>
    </span>
  </label>
</template>

<script>
export default {
  name: 'wap-checkbox',
  props: {
    val: [String, Number],
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      checked: false
    }
  },
  methods: {
    changeHandler (event) {
      if (this.disabled) {
        return
      }
      this.checked = event.target.checked
      this.$parent.change(this.val)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "styleMix";
  @include wap-checkbox;
</style>
