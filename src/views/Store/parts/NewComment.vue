<template>
  <wap-popup v-model="showPop" from="bottom" page>
    <wap-list>
      <template slot="title">
        <span style="line-height: 22px">新增评论 - {{store && store.name}}</span>
      </template>
      <wap-list-item>
        <template slot="left">评分</template>
        <template slot="right">
          <wap-rank :score.sync="form.rank" class="fl"></wap-rank>
        </template>
      </wap-list-item>
      <wap-list-item>
        <wap-textarea v-model="form.content" placeholder="说点什么..." maxlength="100" show-counter style="height: 90px;"></wap-textarea>
      </wap-list-item>
      <wap-list-item style="line-height: 44px">
        <template slot="left">匿名评论</template>
        <template slot="right">
          <wap-switch v-model="form.anonymous"></wap-switch>
        </template>
      </wap-list-item>
      <wap-list-item>
        <template slot="left">
          <multiple-uploader v-model="form.attachment_image_ids" :attachment-images.sync="form.attachment_images"></multiple-uploader>
        </template>
      </wap-list-item>
      <div style="margin: 15px;">
        <wap-button type="primary" size="large" style="display: block" @click="handlerCreate">提交</wap-button>
      </div>
      <div style="margin: 15px;">
        <wap-button @click="showPop = false" size="large" style="display: block">关闭</wap-button>
      </div>
    </wap-list>
  </wap-popup>
</template>

<script>
import newMix from '@/components/Shared/Mixin/new'
import MultipleUploader from '@/components/Shared/Uploader/MultipleUploader.vue'
export default {
  mixins: [newMix],
  props: {
    store: {
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
          rank: 0,
          content: '',
          anonymous: false,
          attachment_image_ids: [],
          attachment_images: []
        }
      },
      immediate: true
    }
  },
  methods: {
    handlerCreate () {
      if (!this.form.rank) {
        return this.wapUi.WapToastBox.new({message: '给点评分吧', timeout: 2000})
      } else if (!this.form.content) {
        return this.wapUi.WapToastBox.new({message: '请输入评论内容', timeout: 2000})
      }
      this._handlerCreate(this.api.postStoreComment(this.store.id, this.form)).then(res => {
        this.showPop = false
      })
    }
  },
  components: {
    MultipleUploader
  }
}
</script>
