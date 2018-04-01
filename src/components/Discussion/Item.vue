<template>
  <div class="discussion-item">
    <img :src="discussion.user.image" class="user-avatar fl" v-if="discussion.user.image">
    <avatar :text="discussion.user.id_hash" class="user-avatar fl" v-else></avatar>
    <div class="content">
      <span style="overflow: hidden">{{discussion.content}}</span>
      <span class="zanicon fr" @click="$emit('approve', discussion)">
        <i class="iconfont icon-zan" :class="{'is-approved': discussion.is_approved}">
          <span style="padding-left: 2px" v-if="discussion.votes_count">{{discussion.votes_count}}</span>
        </i>
      </span>
    </div>
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
  padding: 3px 10px;
  padding-left: 0;
  line-height: 22px;
  font-size: 14px;

  .user-avatar {
    width: 30px;
    max-height: 30px;
    margin-right: 5px;
  }
  .content {
    position: relative;
    background: #f2f2f2;
    line-height: 20px;
    padding: 5px;
    color: #999;
    overflow: hidden;

    .is-approved {
      color: #ff0066;
    }
  }
}
</style>
