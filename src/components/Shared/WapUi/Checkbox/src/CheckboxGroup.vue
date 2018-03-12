<template>
  <div class="wap-checkbox-group">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      require: true
    }
  },
  methods: {
    change (val) {
      console.log(11, this.value, val)
      let index = this.value.indexOf(val)
      if (index === -1) {
        this.value.push(val)
      } else {
        this.value.splice(index, 1)
      }
      this.$children.filter(item => item.$options.name === 'wap-checkbox').forEach((child) => {
        child.checked = this.value.indexOf(child.val) !== -1
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "styleMix";
  @include wap-checkbox-group;
</style>

<!--<wap-checkbox-group v-model="arr">-->
  <!--<wap-checkbox val="111">aaaa</wap-checkbox>-->
  <!--<wap-checkbox val="222">bbbb</wap-checkbox>-->
<!--</wap-checkbox-group>-->
