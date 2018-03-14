<template>
  <ul>
    <li v-for="(item,index) in attachmentImages" :key="index">
      <img :src="item.file.thumb.url" class="thumb" alt="">
    </li>
    <li>
      <label for="input" class="select-img-box">
        <input id="input" class="file-input" type="file" @change="selectedFile($event.target.files)">
        <i class="iconfont icon-add"></i>
      </label>
    </li>
  </ul>
</template>

<script>
import ImageCompressor from 'image-compressor.js'
export default {
  name: 'MultipleUploader',
  props: {
    value: {
      type: Array,
      require: true
    },
    attachmentImages: {
      type: Array,
      require: true
    }
  },
  computed: {
    selectValue: {
      get () {
        return this.value
      },
      set (newVal) {
        this.$emit('input', newVal.map(item => item.id))
        this.$emit('update:attachmentImages', newVal)
      }
    }
  },
  methods: {
    selectedFile (files) {
      if (files && files.length) {
        new ImageCompressor(files[0], {
          quality: 0.6,
          success (result) {
            const formData = new FormData()
            formData.append('file', result, result.name)
            this.api.postAttachmentImage(formData).then(res => {
              this.selectValue = [...this.attachmentImages, res.data.item]
            })
          },
          error (e) {
            console.log(e.message)
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .select-img-box {
    position: relative;
    display: inline-flex;
    width: 80px;
    height: 80px;
    text-align: center;
    border: 1px dashed #f2f2f2;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    .file-input {
      width: 100%;
      height: 100%;
      visibility: hidden;
      position: absolute;
      z-index: 1;
    }
  }
  ul {
    padding: 10px 0px;
    li {
      display: inline-block;
      max-height: 80px;
      overflow: hidden;
      margin: 2px;
      .thumb {
        width: 80px;
        height: 80px;
        border: 1px solid #f2f2f2;
      }
    }
  }
</style>
