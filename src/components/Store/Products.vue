<template>
  <div style="min-height: 500px">
    <yd-scrolltab v-if="storeDetail">
      <yd-scrolltab-panel v-for="(proCate,index) in storeDetail.product_categories" :label="proCate.name" :key="index">
        <wap-list style="background: #f6f6f6; padding: 5px 0">
          <wap-list-item v-for="(product, index) in proCate.products" :key="index" v-if="proCate.products.length">
            <template slot="left">
              <div class="product-item-box">
                <wap-img-box style="line-height: 0">
                  <img :src="product.image.thumb.url" :src2="product.image.small.url">
                </wap-img-box>
                {{product.name}}
              </div>
            </template>
            <template slot="right">
              ₱{{product.price}}
            </template>
          </wap-list-item>
        </wap-list>
      </yd-scrolltab-panel>
    </yd-scrolltab>
  </div>
</template>

<script>
import {ScrollTab, ScrollTabPanel} from 'vue-ydui/dist/lib.px/scrolltab'
export default {
  props: {
    store: {
      type: Object,
      require: true
    }
  },
  data () {
    return {
      storeDetail: null
    }
  },
  methods: {
    fetchStoreDetail () {
      this.api.getStoreDetail(this.store.id).then(res => {
        console.log(res.data)
        this.storeDetail = res.data
      })
    }
  },
  mounted () {
    this.fetchStoreDetail()
  },
  components: {
    [ScrollTab.name]: ScrollTab,
    [ScrollTabPanel.name]: ScrollTabPanel
  }
}
</script>

<style lang="scss" scoped>
  .product-item-box {
    display: flex;
    align-items: center;

    img {
      max-height: 40px;
      margin: 5px;
    }
  }
</style>
