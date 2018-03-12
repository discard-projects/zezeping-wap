<template>
  <div class="wap-radio-group">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number],
      require: true
    }
  },
  computed: {
    currentValue: {
      get () {
        return this.value
      },
      set (nv) {
        this.$emit('input', nv)
        this.$children.filter(item => item.$options.name === 'wap-radio').forEach((child) => {
          child.checked = nv === child.val
        })
      }
    }
  },
  methods: {
    change (val) {
      this.currentValue = val
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "styleMix";
  @include wap-radio-group;
</style>

<!--<wap-radio-group v-model="form.content">-->
  <!--<wap-radio val="333"></wap-radio>-->
  <!--<wap-radio val="444"></wap-radio>-->
<!--</wap-radio-group>-->
