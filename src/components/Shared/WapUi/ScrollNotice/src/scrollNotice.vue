<template>
  <marquee behavior="scroll" :direction="direction" :scrollamount="speed">
    <slot></slot>
  </marquee>
</template>

<script>
export default {
  props: {
    direction: {
      type: String,
      default: 'left'
    },
    speed: {
      type: [String, Number],
      default: 5
    }
  }
}
</script>

<!--<WapScrollNotice>hahhahhahah</WapScrollNotice>-->
