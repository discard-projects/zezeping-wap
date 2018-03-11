<template>
  <img :src="calcData">
</template>

<script>
import Identicon from 'identicon.js'
export default {
  props: {
    text: {
      require: true
    },
    size: {
      default: 200
    }
  },
  computed: {
    calcData () {
      return `data:image/png;base64,${new Identicon(this.text, {
        // foreground: [0, 0, 0, 255],               // rgba black
        // background: [255, 255, 255, 255],         // rgba white
        size: this.size, // px square
        margin: 0.2 // 20% margin
        // format: 'svg'                             // use SVG instead of PNG
      }).toString()}`
    }
  }
}
</script>
