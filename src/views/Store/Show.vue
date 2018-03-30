<template>
  <div class="full-page wap-navbar-exist">
    <wap-navbar>
      <template slot="left">
        <wap-navbar-back-icon @click.native="$router.go(-1)">
          <span style="font-size: 17px">返回</span>
        </wap-navbar-back-icon>
      </template>
      <template slot="right">
        <span class="wap-pointer" @click="goComment">评论</span>
        <NewComment :store="store" ref="newCommentRef" @fetchData="getStoreInfo"></NewComment>
      </template>
      详情
    </wap-navbar>
    <!--info -->
    <div style="padding: 10px 20px; background: #fff">
      <store-item :store="store"></store-item>
    </div>
    <!--info detail-->
    <yd-tab class="more-detail-box" v-if="store">
      <yd-tab-panel label="详情" class="item-box detail-box">
        <wap-list>
          <wap-list-item v-if="store.store_detail.wechat_qrcode.thumb.url" style="line-height: 0;">
            <template slot="left">
              <span style="line-height: 44px">微信二维码</span>
            </template>
            <wap-img-box style="line-height: 0">
              <img :src="store.store_detail.wechat_qrcode.thumb.url" :src2="store.store_detail.wechat_qrcode.small.url" style="width: 40px;">
            </wap-img-box>
            <template slot="right"><i class="iconfont icon-front"></i></template>
          </wap-list-item>
          <wap-list-item v-if="store.store_detail.phones.length" @click.native="callPhone(store.store_detail.phones)">
            <template slot="left">联系电话</template>
            <span class="phone" v-for="(phone, index) in store.store_detail.phones" :key="index">{{phone}}</span>
            <template slot="right"><i class="iconfont icon-front"></i></template>
          </wap-list-item>
          <wap-list-item v-if="store.open_time_des">
            <template slot="left">营业时间</template>
            <template slot="right">{{ store.open_time_desc }}</template>
          </wap-list-item>
          <wap-list-item v-if="store.address" class="address-box" @clicl="$refs['mapPopRef'].showPop = true">
            <template slot="left">
              <div class="fl" style="width: 40px; color: #333">地址</div>
              <div style="overflow: auto">
                <span>{{ store.address }}</span>
              </div>
            </template>
          </wap-list-item>
          <wap-list-item v-if="store.desc" class="address-box">
            <template slot="left">
              <span class="fl" style="width: 40px; color: #333">描述</span>
              <div style="overflow: auto">
                <pre>{{ store.desc }}</pre>
              </div>
            </template>
          </wap-list-item>
        </wap-list>
        <div class="item-box images-box" v-if="store.attachment_images.length" style="line-height: 0">
          <wap-img-box class="clearfix" style="width: 100%">
            <img :src="attachmentImage.file_thumb_url" :src2="attachmentImage.file_url" v-for="(attachmentImage,index) in store.attachment_images" :key="index">
          </wap-img-box>
        </div>
        <div v-if="store && store.position">
          <Map :position="store.position" style="height: 320px"></Map>
        </div>
      </yd-tab-panel>
      <yd-tab-panel :label="`产品(${store.products_count})`" v-if="store.products_count">
        <store-products :store="store"></store-products>
      </yd-tab-panel>
      <yd-tab-panel :label="`评论(${store.comments_count})`" v-if="store.comments_count">
        <!--评论-->
        <comments :store="store"></comments>
      </yd-tab-panel>
      <yd-tab-panel :label="`商圈(${store.moments_count})`" v-if="store.moments_count">
        <!--商圈-->
        <moments :store="store"></moments>
      </yd-tab-panel>
    </yd-tab>
  </div>
</template>

<script>
import Map from '@/components/Shared/Base/Map.vue'
import StoreItem from '@/components/Store/Item'
import {Tab, TabPanel} from 'vue-ydui/dist/lib.px/tab'
import Comments from './parts/Comments.vue'
import Moments from './parts/Moments.vue'
import NewComment from './parts/NewComment.vue'
import StoreProducts from '@/components/Store/Products'
export default {
  data () {
    return {
      store: null,
      newCommentForm: null
    }
  },
  methods: {
    getStoreInfo () {
      this.api.getStore(this.$route.params.id).then(res => {
        this.store = res.data.item
      })
    },
    goComment () {
      if (this.validLogin()) {
        this.$refs['newCommentRef'].showPop = true
      }
    },
    callPhone (phones) {
      console.log(phones)
      this.wapUi.WapActionSheet.new({
        items: phones.map(phone => {
          return {text: phone}
        }),
        callback: (item) => {
          console.log(item)
          if (item) {
            this.wapUi.WapMessageBox.new({
              title: '拨打电话',
              message: `联系时，请告诉我是在【仄仄平】上看到的`,
              showCancelBtn: true,
              buttons: [{
                text: '取消',
                key: 'cancel',
                class: {'btn-cancel': true}
              }, {
                text: `<a href="tel:${item.text}" style="display: block;">拨打</a>`,
                key: 'confirm',
                class: {'btn-confirm': true}
              }]
            })
          }
        }
      })
    }
  },
  mounted () {
    this.getStoreInfo()
  },
  components: {
    StoreItem,
    Comments,
    Moments,
    NewComment,
    Map,
    [Tab.name]: Tab,
    [TabPanel.name]: TabPanel,
    StoreProducts
  }
}
</script>

<style lang="scss" scoped>
  .full-page {
    height: 100%;
  }
  .more-detail-box {
    .item-box {
      padding: 5px 10px;
      .label {
        color: #666;
        line-height: 24px;
      }
      .phone {
        padding-left: 10px;
        @include tap
      }
    }
    .detail-box {
      li {
        padding-bottom: 10px;
        border-bottom: 1px solid #f2f2f2;
      }
    }

    .address-box {
      line-height: 24px;
      padding: 10px 0;
      color: #333;
      div {
        color: #666;
        line-height: 20px;
      }
    }

    .images-box {
      padding-left: 0;
      margin: 15px 0;
      img {
        width: 33%;
        padding: 0 10px 10px;
      }
    }
  }
</style>
