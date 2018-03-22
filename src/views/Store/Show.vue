<template>
  <div class="wap-navbar-exist">
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
        <ul>
          <li v-if="store.store_detail.wechat_qrcode.thumb.url">
            <span class="label">微信二维码</span>
            <div class="desc">
              <wap-img-box>
                <img :src="store.store_detail.wechat_qrcode.thumb.url" :src2="store.store_detail.wechat_qrcode.small.url" style="width: 80px">
              </wap-img-box>
            </div>
          </li>
          <li v-if="store.store_detail.phones.length">
            <span class="label">联系电话</span>
            <div class="desc">
              <span class="phone" v-for="(phone, index) in store.store_detail.phones" :key="index" @click="callPhone(phone)">{{phone}}</span>
            </div>
          </li>
          <li v-if="store.open_time_desc">
            <span class="label">营业时间</span>
            <div class="desc">{{ store.open_time_desc }}</div>
          </li>
          <li v-if="store.address">
            <span class="label">地址</span>
            <div class="desc">{{ store.address }}</div>
          </li>
          <li v-if="store.desc">
            <span class="label">描述</span>
            <div class="desc">
              <pre>{{ store.desc }}</pre>
            </div>
          </li>
        </ul>
      </yd-tab-panel>
      <yd-tab-panel :label="`图片(${store.attachment_images.length})`" class="item-box images-box" v-if="store.attachment_images.length">
        <wap-img-box style="width: 100%">
          <img :src="attachmentImage.file_thumb_url" :src2="attachmentImage.file_url" v-for="(attachmentImage,index) in store.attachment_images" :key="index">
        </wap-img-box>
      </yd-tab-panel>
      <yd-tab-panel label="地图" v-if="store && store.position">
        <Map :position="store.position" style="height: 400px"></Map>
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
    callPhone (phone) {
      console.log(phone)
      this.wapUi.WapMessageBox.new({
        title: '拨打电话',
        message: `联系时，请告诉我是在【仄仄平】上看到的`,
        showCancelBtn: true,
        buttons: [{
          text: '取消',
          key: 'cancel',
          class: {'btn-cancel': true}
        }, {
          text: `<a href="tel:${phone}" style="display: block;">拨打</a>`,
          key: 'confirm',
          class: {'btn-confirm': true}
        }]
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
    [TabPanel.name]: TabPanel
  }
}
</script>

<style lang="scss" scoped>
  .more-detail-box {
    .item-box {
      padding: 5px 10px;
      .label {
        color: #666;
        line-height: 24px;
      }
      .desc {
        font-size: 14px;

        .phone {
          padding-right: 10px;
          @include tap
        }
      }
    }
    .detail-box {
      li {
        padding-bottom: 10px;
        border-bottom: 1px solid #f2f2f2;
      }
    }

    .images-box {
      img {
        width: 30%;
        padding: 10px;
      }
    }
  }
</style>
