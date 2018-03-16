<template>
  <div class="moment-item clearfix" v-if="moment">
    <img :src="moment.store.logo_thumb.url" class="logo fl">
    <div class="content-box">
      <h4 class="store-name" @click="$router.push({name: 'storeDetail', params: {id: moment.store.id}})">{{ moment.store.name }}</h4>
      <div class="content like-pre">{{ moment.content }}</div>
      <div class="attachment-images" v-if="moment.attachment_images.length">
        <wap-img-box>
          <img :src="attachmentImage.file_thumb_url" :src2="attachmentImage.file_url" v-for="(attachmentImage,index) in moment.attachment_images" :key="index" :class="{[`img-count-${moment.attachment_images.length}`]: true}" class="preview att-img">
        </wap-img-box>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    moment: {
      type: Object,
      require: true
    }
  }
}
</script>

<style lang="scss" scoped>
.moment-item {
  display: flex;
  width: 100%;
  padding: 15px;
  line-height: 20px;
  background: #fff;
  border-bottom: 1px solid #e2e2e2;

  .logo {
    width: 50px;
    max-height: 50px;
  }

  .content-box {
    flex: 1;
    padding: 0 10px;
    font-size: 16px;

    .store-name {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #00d1da;
      line-height: 20px;
      @include tap;
    }

    .content {
      color: #444;
      padding-top: 5px;
    }

    .attachment-images {
      padding-top: 10px;
      .att-img {
        margin-right: 5px;
        &.img-count-1 {
          max-width: 120px;
          max-height: 120px;
        }
        &.img-count-2 {
          max-width: 60px;
          max-height: 60px;
        }
      }
    }
  }
}
</style>
