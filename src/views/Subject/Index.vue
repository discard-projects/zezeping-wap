<template>
  <div class="subjects wap-navbar-exist">
    <wap-navbar>
      <template slot="left">
        <wap-navbar-back-icon @click.native="$router.go(-1)">
          <span style="font-size: 17px">返回</span>
        </wap-navbar-back-icon>
      </template>
      <template slot="right">
        <span class="wap-pointer" @click="goNewSubject">提问</span>
        <NewSubject ref="newSubjectRef" @fetchData="pullRefresh"></NewSubject>
        <NewSubjectDiscussion ref="newSubjectDiscussionRef" :subject="nowSubjectForDiscussion" @fetchData="pullRefresh"></NewSubjectDiscussion>
      </template>
      问答
    </wap-navbar>
    <!-- 分类下商家列表 -->
    <div is="wap-scroll-section" :pull-refresh="pullRefresh" :infinite-scroll="infiniteScroll" class="scroll-section">
      <ul>
        <li v-for="subject in tableData.data" :key="subject.id">
          <subject-item :subject="subject" @shouldShowCommentDialog="showCreateCommentDialog">
            <template slot="discussions">
              <ul class="subject-discusstions">
                <li v-for="(discussion, index) in subject.discussions" :key="index">
                  <DiscussionItem :discussion="discussion" @approve="approveDiscussion"></DiscussionItem>
                </li>
              </ul>
            </template>
          </subject-item>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import SubjectItem from '@/components/Subject/Item'
import DiscussionItem from '@/components/Discussion/Item'
import index from '@/components/Shared/Mixin/index'
import query from '@/components/Shared/Mixin/query'
import NewSubject from './parts/NewSubject.vue'
import NewSubjectDiscussion from './parts/NewSubjectDiscussion.vue'
export default {
  mixins: [index, query],
  data () {
    return {
      nowSubjectForDiscussion: null
    }
  },
  methods: {
    beforeFetch () {
      if (this.action !== 'more') {
        this.tableData.data = []
      }
      this.tableData.loading = true
    },
    fetchData () {
      return this._fetchData(this.api.getSubjects(Object.assign({}, this.q)))
    },
    afterFetch (data) {
      this.tableData.loading = false
      this.paginateMeta = data.pagination
      if (this.action === 'more') {
        this.data = data
        this.tableData.data = this.tableData.data.concat(data.items)
      } else {
        this.data = data
        this.tableData.data = data.items
      }
    },
    pullRefresh (finished) {
      this.action = 'refresh'
      this.fetchData().then(res => {
        finished && finished(this.allFetched)
      }).catch(() => {
        finished && finished(this.allFetched)
      })
    },
    infiniteScroll (finished) {
      if (this.allFetched) {
        return finished(true)
      }
      this.action = 'more'
      if (this.q.page !== this.paginateMeta.total_pages) {
        this.q.page += 1
        this.fetchData().then(res => {
          finished(this.allFetched)
        }).catch(() => {
          finished()
        })
      }
    },
    goNewSubject () {
      if (this.validLogin()) {
        this.$refs['newSubjectRef'].showPop = true
      }
    },
    showCreateCommentDialog (subject) {
      if (this.validLogin()) {
        this.nowSubjectForDiscussion = subject
        this.$refs['newSubjectDiscussionRef'].showPop = true
      }
    },
    approveDiscussion (discussion) {
      this.api.putToggleSubjectDiscussionApprove(discussion.subject_id, discussion.id).then(res => {
        discussion.is_approved = res.data.is_approved
        discussion.votes_count = res.data.votes_count
      })
    }
  },
  components: {
    SubjectItem,
    NewSubject,
    NewSubjectDiscussion,
    DiscussionItem
  }
}
</script>

<style lang="scss" scoped>
  .subjects {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;

    .scroll-section {
      flex: 1;
    }

    .subject-discusstions {
      padding-left: 20px;
    }
  }
</style>
