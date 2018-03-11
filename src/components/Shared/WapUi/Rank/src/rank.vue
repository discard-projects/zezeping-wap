<template>
  <div class="wap-rank">
    <div class="bottom-star" ref="bottomRef">
      <i v-for="i in maxScore" class="star-item iconfont" @click.self="chooseScore(i)" :class="{[icon]: true}" :key="i" :style="{fontSize: fontSize}"></i>
    </div>
    <div class="top-star" ref="topRef" :style="{width: `${score / maxScore * 100}%`, color}">
      <i v-for="i in maxScore" class="star-item iconfont" @click.self="chooseScore(i)" :class="{[icon]: true}" :key="i" :style="{fontSize: fontSize}"></i>
    </div>
  </div>
</template>

<script>

export default {
  name: 'WapRank',
  props: {
    fontSize: {
      type: String,
      default: '16px',
      validator (value) {
        return value.match(/px$/)
      }
    },
    color: {
      type: String,
      default: '#ee6f43'
    },
    icon: {
      type: String,
      default: 'icon-full-star'
    },
    score: {
      type: [Number, String],
      default: 1
    },
    maxScore: {
      type: Number,
      default: 5
    }
  },
  methods: {
    chooseScore (score) {
      this.$emit('update:score', score)
    }
  }
}
</script>

<style lang="scss" scoped>
  .wap-rank {
    display: inline-block;
    position: relative;
    overflow: hidden;
    .top-star {
      position: absolute;
      top: 0; left: 0;
      overflow: hidden;
      white-space:nowrap;
      width: 45%;
    }
    .bottom-star {
      color: #999;
    }
  }
</style>
