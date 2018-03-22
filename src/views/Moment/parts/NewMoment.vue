<template>
  <wap-popup v-model="showPop" from="bottom" page class="wap-navbar-exist">
    <wap-navbar>
      <template slot="left">
        <span class="wap-pointer" @click="showPop = false">取消</span>
      </template>
      <template slot="right">
        <span class="wap-pointer" @click="handlerCreate" style="color: #009688">提交内容</span>
      </template>
      发表
    </wap-navbar>
    <wap-list>
      <wap-list-item>
        <wap-textarea v-model="form.content" placeholder="说点什么..." maxlength="100" show-counter style="height: 90px;"></wap-textarea>
      </wap-list-item>
      <wap-list-item>
        <template slot="left">
          <multiple-uploader v-model="form.attachment_image_ids" :attachment-images.sync="form.attachment_images"></multiple-uploader>
        </template>
      </wap-list-item>
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
          content: '',
          attachment_image_ids: [],
          attachment_images: []
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
      this._handlerCreate(this.api.postMoment(this.form)).then(res => {
        this.showPop = false
      })
    }
  },
  components: {
    MultipleUploader
  }
}
</script>
