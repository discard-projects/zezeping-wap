<template>
  <div class="store-item" v-if="store">
    <img :src="store.logo.url" class="logo">
    <div class="content-box">
      <h3 class="title">{{store.name}}</h3>
      <div class="sub">
        <wap-rank :score="store.rank"></wap-rank><span>{{store.comments_count}}条</span>
      </div>
      <p class="categories">
        <span v-for="(categoryName,index) in store.category_names" :key="index">{{categoryName}}</span>
      </p>
    </div>
    <wap-img-box >
      <img :src="store.store_detail.wechat_qrcode.small.url" class="preview" style="width: 60px">
    </wap-img-box>
  </div>
</template>

<script>
export default {
  props: {
    store: {
      type: Object,
      require: true
    }
  }
}
</script>

<style lang="scss" scoped>
.store-item {
  display: flex;
  padding: 10px;
  padding-left: 0;
  line-height: 20px;

  .content-box {
    padding-left: 15px;
    flex: 1;
  }
}
.logo {
  width: 70px;
  max-height: 70px;
}
.title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 16px;
  color: #323232;
  margin-right: 3px;
}
.sub {
  display: flex;
  align-items: center;
  color: #333;
  line-height: 30px;

  span {
    padding-left: 10px;
    font-size: 12px;
    line-height: 12px;
  }
}
.categories {
  font-size: 12px;
  line-height: 20px;
  color: #999;
  span {
    padding-right: 10px;
  }
}
</style>
