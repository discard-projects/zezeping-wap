<template>
  <transition name="page-popup">
    <div v-show="currentValue" class="vmui-page-popup" :class="{[from]: from, page: page}">
      <div class="vmui-page-popup-mask" :class="{'mask': mask}" v-if="modal" @click.self.stop="!modalLock && closePopup()"></div>
      <div class="slot-wrap">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'vmPopup',
    props: {
      value: {
        type: Boolean,
        default: false
      },
      from: {
        type: String,
        default: 'left',
        validator (value) {
          return ['left', 'right', 'top', 'bottom'].indexOf(value) !== -1
        }
      },
      // 是否有遮罩
      modal: [Boolean],
      // 点击遮罩是否自动关闭
      modalLock: [Boolean],
      // 遮罩层视图是否可见
      mask: [Boolean],
      // 弹出层是否覆盖整个页面
      page: [Boolean]
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
    },
    methods: {
      closePopup () {
        this.currentValue = false
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "styleMix";
  @include vmui-page-popup;
</style>
