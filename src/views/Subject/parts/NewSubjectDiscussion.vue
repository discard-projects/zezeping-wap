<template>
  <wap-popup v-model="showPop" from="right" page class="wap-navbar-exist" v-if="subject">
    <wap-navbar>
      <template slot="left">
        <span class="wap-pointer" @click="showPop = false">取消</span>
      </template>
      <template slot="right">
        <span class="wap-pointer" @click="handlerCreate" style="color: #009688">提交内容</span>
      </template>
      我的回答
    </wap-navbar>
    <p class="question-desc">{{ subject.content }}</p>
    <wap-list>
      <wap-list-item>
        <wap-textarea v-model="form.content" placeholder="我来解答..." maxlength="150" show-counter style="height: 150px;"></wap-textarea>
      </wap-list-item>
    </wap-list>
  </wap-popup>
</template>

<script>
import newMix from '@/components/Shared/Mixin/new'
export default {
  mixins: [newMix],
  props: {
    subject: {
      require: true
    }
  },
  data () {
    return {
      showPop: false,
      form: null
    }
  },
  watch: {
    showPop: {
      handler (nv) {
        this.form = {
          content: ''
        }
      },
      immediate: true
    }
  },
  methods: {
    handlerCreate () {
      if (!this.form.content) {
        return this.wapUi.WapToastBox.new({message: '请输入评论内容', timeout: 2000})
      }
      this._handlerCreate(this.api.postSubjectDiscussions(this.subject.id, this.form)).then(res => {
        this.showPop = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .question-desc {
    background: #f2f2f2;
    text-align: left;
    line-height: 20px;
    padding: 12px;
    font-size: 13px;
    color: #666;
  }
</style>
