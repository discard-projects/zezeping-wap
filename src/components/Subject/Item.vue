<template>
  <div class="subject-item clearfix" v-if="subject">
    <div class="main-box">
      <img :src="subject.user.image" class="logo fl">
      <div class="content-box">
        <h4 class="user-name">{{ subject.user.nickname }}</h4>
        <div class="content like-pre">{{ subject.content }}</div>
        <div class="attachment-images" v-if="subject.attachment_images.length">
          <wap-img-box>
            <img :src="attachmentImage.file.thumb.url" :src2="attachmentImage.file.url" v-for="(attachmentImage,index) in subject.attachment_images" :key="index" :class="{[`img-count-${subject.attachment_images.length}`]: true}" class="preview att-img">
          </wap-img-box>
        </div>
        <p class="time_humane">{{subject.created_time_humane}}</p>
        <wap-button size="mini" class="fr" @click.native="$emit('shouldShowCommentDialog', subject)" style="margin-bottom: 5px">评论</wap-button>
      </div>
    </div>
    <div class="operations-box">
    </div>
    <div class="discussions-box">
      <slot name="discussions"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    subject: {
      type: Object,
      require: true
    }
  }
}
</script>

<style lang="scss" scoped>
.subject-item {
  width: 100%;
  padding: 15px;
  line-height: 20px;
  background: #fff;
  border-bottom: 1px solid #e2e2e2;

  .main-box {
    display: flex;
    .logo {
      width: 50px;
      max-height: 50px;
    }

    .content-box {
      flex: 1;
      padding: 0 10px;
      font-size: 16px;

      .user-name {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        // color: #00d1da;
        line-height: 20px;
        // @include tap;
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

      .time_humane {
        padding-top: 3px;
        font-size: 13px;
        color: #999;
      }
    }
  }
}
</style>
