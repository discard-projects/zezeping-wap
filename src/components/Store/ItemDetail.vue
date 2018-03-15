<template>
  <div class="store-item" v-if="store">
    <div class="base-info">
      <img :src="store.logo.url" class="logo">
      <div class="content-box">
        <h3 class="title">{{store.name}}</h3>
        <div class="sub">
          <wap-rank :score="store.rank"></wap-rank><span>{{store.comments_count}}条</span>
        </div>
        <p class="desc" v-if="store.store_detail.phones.length">
          <span>电话：</span> {{store.store_detail.phones.join(',')}}
        </p>
        <p class="desc categories">
          分类：
          <span v-for="(categoryName,index) in store.category_names" :key="index">{{categoryName}}</span>
        </p>
      </div>
      <wap-img-box >
        <img :src="store.store_detail.wechat_qrcode.small.url" class="preview" style="width: 60px">
      </wap-img-box>
    </div>
    <div class="detail-info">
      <p class="desc address" v-if="store.address">
        地址：{{store.address}}
      </p>
      <div class="desc address" v-if="store.desc">
        <pre>描述：{{store.desc}}</pre>
      </div>
      <div class="attachment-images" v-if="store.attachment_images.length">
        <wap-img-box>
          <img :src="attachmentImage.file_thumb_url" :src2="attachmentImage.file_url" v-for="(attachmentImage,index) in store.attachment_images" :key="index" class="preview att-img">
        </wap-img-box>
      </div>
    </div>
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
.base-info {
  display: flex;
  padding-top: 10px;
  line-height: 20px;

  .content-box {
    padding-left: 15px;
    flex: 1;
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

  .desc {
    font-size: 12px;
    line-height: 20px;
    color: #999;
  }
  .categories {
    span {
      padding-right: 10px;
    }
  }
}
.detail-info {
  .desc {
    font-size: 12px;
    line-height: 20px;
    color: #999;
  }

  .attachment-images {
    .att-img {
      margin-right: 5px;
      max-width: 60px;
      max-height: 60px;
    }
  }
}
</style>
