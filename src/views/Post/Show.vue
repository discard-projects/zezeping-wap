<template>
  <div class="wap-navbar-exist wap-tabbar-exist" style="box-sizing: content-box">
    <wap-navbar>
      <template slot="left">
        <wap-navbar-back-icon @click.native="$router.go(-1)">
          <span style="font-size: 17px">返回</span>
        </wap-navbar-back-icon>
      </template>
      {{ '帖子详情' }}
    </wap-navbar>
    <div class="post-detail" v-if="post">
      <h3 class="title">{{post.title}}</h3>
      <div class="info">
        <span>分类:{{post.category_name}}</span>
      </div>
      <div class="post-content" v-html="post.content"></div>
      <div class="info foot clearfix">
        <i class="iconfont icon-view disabled" style="margin-right: 15px">{{ post.views_count }}</i>
        <i @click="toggleCollection" class="iconfont icon-collection pointer" :class="{'active': post.is_collected}" style="margin-right: 15px">{{ post.collections_count }}</i>
        <i @click="toggleVote" class="iconfont icon-vote pointer" :class="{'active': post.is_approved}">{{ post.votes_count }}</i>
        <span class="fr">创建于:{{post.created_time_humane}}</span>
      </div>
    </div>
    <div class="discussions-show bg-white" v-if="post">
      <wap-list title="评论">
        <wap-list-item v-for="discussion in post.discussions" :key="discussion.id">
          <discussion-item :discussion="discussion" @approve="toggleDiscussionVote" style="padding-right: 0"></discussion-item>
        </wap-list-item>
        <wap-list-item>
          <wap-textarea v-model="discussionForm.content" placeholder="想说点什么呢.." maxlength="100" show-counter style="height: 90px;"></wap-textarea>
          <wap-button @click.native="createDiscussion" type="primary" style="display: block; margin-bottom: 10px">提交</wap-button>
        </wap-list-item>
      </wap-list>
      <!--<discussion-new @handler="createDiscussion"></discussion-new>-->
    </div>
  </div>
</template>

<script>
import DiscussionItem from '@/components/Discussion/Item'
export default {
  data () {
    return {
      title: '帖子详情',
      post: null,
      discussionForm: {
        content: ''
      }
    }
  },
  methods: {
    getPostInfo () {
      this.api.getPost(this.$route.params.id).then(res => {
        this.post = res.data.item
      })
    },
    toggleCollection () {
      if (this.validLogin()) {
        this.api.putTogglePostCollect(this.post.id).then(res => {
          this.post = Object.assign(this.post, res.data)
        })
      }
    },
    toggleVote () {
      if (this.validLogin()) {
        this.api.putTogglePostApprove(this.post.id).then(res => {
          this.post = Object.assign(this.post, res.data)
        })
      }
    },
    toggleDiscussionVote (discussion) {
      if (this.validLogin()) {
        this.api.putTogglePostDiscussionApprove(discussion.discussable_id, discussion.id).then(res => {
          Object.assign(discussion, res.data)
        })
      }
    },
    createDiscussion () {
      if (this.validLogin()) {
        this.api.postPostDiscussions(this.$route.params.id, this.discussionForm).then(res => {
          this.discussionForm.content = ''
          this.getPostInfo()
        })
      }
    }
  },
  mounted () {
    this.getPostInfo()
  },
  components: {
    DiscussionItem
  }
}
</script>

<style lang="scss">
  .post-detail {
    margin-top: 10px;
    background: #fff;
    padding: 0 10px;
    & > {
      .title {
        text-align: center;
        font-size: 15px;
        line-height: 26px;
      }
      .info {
        text-align: left;
        line-height: 20px;
        font-size: 13px;
        color: #888;
      }
      .post-content {
        padding: 10px 0;
        word-break: break-all;
        img {
          max-width: 100%;
        }
      }
    }
  }
</style>
