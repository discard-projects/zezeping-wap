<template>
  <div class="wap-navbar-exist">
    <wap-navbar>
      <template slot="left">
        <wap-navbar-back-icon @click.native="$router.go(-1)">
          <span style="font-size: 17px">返回</span>
        </wap-navbar-back-icon>
      </template>
      个人信息
    </wap-navbar>
    <wap-list title="基本信息">
      <wap-list-item style="line-height: 44px">
        <template slot="left">昵称:</template>
        <wap-input v-model="form.nickname" placeholder="给个昵称吧"></wap-input>
      </wap-list-item>
      <div style="margin: 15px;">
        <wap-button type="primary" style="display: block" @click="onSubmit">提交</wap-button>
      </div>
    </wap-list>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        nickname: ''
      }
    }
  },
  methods: {
    getProfile () {
      return new Promise((resolve, reject) => {
        this.api.getMeProfile().then(res => {
          this.$store.dispatch('setUserInfo', res.data.item)
          this.form = res.data.item
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    onSubmit () {
      this.api.putProfile(this.form).then(res => {
        this.getProfile().then(() => {
          this.$router.push({name: 'Home'})
        })
      })
    }
  },
  mounted () {
    this.getProfile()
  }
}
</script>
