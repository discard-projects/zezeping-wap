<template>
  <div class="discussion-item">
    <img :src="discussion.user.image" class="user-avatar fl" v-if="discussion.user.image">
    <avatar :text="discussion.user.id_hash" class="user-avatar fl" v-else></avatar>
    <p class="content">{{discussion.content}}</p>
  </div>
</template>

<script>
import Avatar from '../Shared/Base/Avatar.vue'
export default {
  props: {
    discussion: {
      require: true
    }
  },
  components: {
    Avatar
  }
}
</script>

<style lang="scss" scoped>
.discussion-item {
  padding: 10px;
  padding-left: 0;
  line-height: 22px;
  font-size: 14px;

  .user-avatar {
    width: 30px;
    max-height: 30px;
    margin-right: 5px;
  }
  .content {
    background: #f2f2f2;
    line-height: 20px;
    padding: 5px;
    color: #999;
    overflow: hidden;
  }
}
</style>
