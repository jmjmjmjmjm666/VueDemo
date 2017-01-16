<template>
  <div id="app">
    <v-header :seller = "seller"></v-header>
    <div class="tab">
      <router-link class="tab-item" to="/goods">商品</router-link>
      <router-link class="tab-item" to="/ratings">评论</router-link>
      <router-link class="tab-item" to="/seller">商家</router-link>
    </div>
    <router-view :seller="seller" class="content" keep-alive></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
   import header from 'components/header/header';
  // 请求成功的状态码，方便统一管理，判断时更加语义化
  const ERR_OK = 0;

  export default {
    name: 'app',
    data() {
      'use strict';
      return {
        seller: {}
      };
    },
    components: {
       'v-header': header
    },
    created() {
      'use strict';
      // vue-resource 发起get请求
      this.$http.get('/api/seller').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.seller = response.data;
        }
      });
    }

  };
</script>

<style lang="sass" rel="stylesheet/sass">
  @import "./common/style/mixin.scss"
  #app
    .tab
      @include border-1px(rgba(7, 17, 27, 0.1))
      display: flex
      width: 100%
      height: 40px
      line-height: 40px
      .tab-item
        flex: 1
        text-align: center
        font-size: 14px
        color: rgb(77, 85, 93)
      .router-active
        color: rgb(240, 20, 20)


</style>
