<template>
  <div style="line-height: 20px; padding: 6px 0">
    <span class="category">{{item.category_name}}</span>
    <span class="title">{{item.title}}</span>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      require: true,
      type: Object
    }
  }
}
</script>

<style lang="scss" scoped>
  .category {
    color: #777;
  }
</style>
