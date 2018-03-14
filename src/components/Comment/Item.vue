<template>
  <div class="comment-item">
    <img :src="comment.user.image" class="user-avatar" v-if="comment.user.image">
    <avatar :text="comment.user.id_hash" class="user-avatar" v-else></avatar>
    <div class="content-box">
      <ul>
        <li class="username">{{comment.user.nickname || comment.user.name}}</li>
        <li class="clearfix"><wap-rank class="fl" :score="comment.rank"></wap-rank></li>
        <li class="content">{{comment.content}}</li>
        <li class="attachments-box">
          <wap-img-box>
            <img :src="attachmentImage.file_small.url" v-for="(attachmentImage,index) in comment.attachment_images" :key="index" class="preview att-img">
          </wap-img-box>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Avatar from '../Shared/Base/Avatar.vue'
export default {
  props: {
    comment: {
      require: true
    }
  },
  components: {
    Avatar
  }
}
</script>

<style lang="scss" scoped>
.comment-item {
  display: flex;
  padding: 10px;
  padding-left: 0;
  line-height: 22px;
  font-size: 14px;

  .user-avatar {
    width: 50px;
    max-height: 50px;
  }
  .content-box {
    padding-left: 15px;
    flex: 1;

    .username {
      font-size: 16px;
    }

    .content {
      color: #999;
    }

    .att-img {
      max-height: 80px;
      max-width: 80px;
      margin: 8px 4px 4px;
    }
  }
}
</style>
