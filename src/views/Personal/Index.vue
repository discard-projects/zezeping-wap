<template>
  <div class="wap-navbar-exist wap-tabbar-exist">
    <wap-navbar>个人中心</wap-navbar>
    <wap-list title="登录" v-if="!userInfo">
      <wap-list-item style="line-height: 44px" class="wap-pointer" @click.native="facebookLogin">
        <template slot="left">
          <span>Facebook登录</span>
        </template>
        <template slot="right"><i class="iconfont icon-front"></i></template>
      </wap-list-item>
    </wap-list>
    <wap-list title="用户名" v-if="userInfo">
      <wap-list-item style="line-height: 44px" class="wap-pointer" @click.native="$router.push({name: 'Profile'})">
        <template slot="left">
          <span>{{userInfo.nickname}}</span>
        </template>
        <template slot="right"><i class="iconfont icon-front"></i></template>
      </wap-list-item>
    </wap-list>
    <wap-tabbar>
      <wap-tabbar-item @click.native="$router.push({name: 'Home'})">首页</wap-tabbar-item>
      <wap-tabbar-item class="active" @click.native="$router.push({name: 'Personal'})">个人中心</wap-tabbar-item>
    </wap-tabbar>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },
  methods: {
    facebookLogin () {
      window.location.href = `${process.env.API_ROOT}/auth/facebook?auth_origin_url=${process.env.WEB_HOST}/login`
    }
  }
}
</script>
