<template>
  <label class="wap-radio" :class="{checked}">
    <input type="radio" @change="changeHandler" :disabled="disabled" :checked="checked"/>
    <span class="radio-icon"><i></i></span>
    <span class="radio-text">
      <slot>{{val}}</slot>
    </span>
  </label>
</template>

<script>
export default {
  name: 'wap-radio',
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
  @include wap-radio;
</style>
