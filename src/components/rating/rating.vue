<template>
  <div class="rating">
    <div class="rating-item" v-for="rating in ratings" v-show="needShow(rating.rateType, rating.text)">
      <div class="avatar">
        <img width="28" height="28" :src="rating.avatar">
      </div>
      <div class="content">
        <h1 class="name">{{rating.username}}</h1>
        <div class="star-wrapper">
          <star :size="24" :score="rating.score"></star>
          <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}</span>
        </div>
        <p class="text">{{rating.text}}</p>
        <div class="recommend" v-show="rating.recommend && rating.recommend.length">
          <span class="icon-thumb_up"></span>
          <span class="item" v-for="item in rating.recommend">{{item}}</span>
        </div>
        <div class="time">
          {{rating.rateTime | formatDate}}
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="sass" rel="stylesheet/sass">
  @import '../../common/style/mixin'
  .rating-item
    display: flex
    padding: 18px 0
    @include border-1px(rgba(7, 17, 27, 0.1))
    .avatar
      flex: 0 0 28px
      width: 28px
      margin-right: 12px
      img
        border-radius: 50%
    .content
      position: relative
      flex: 1
      .name
        margin-bottom: 4px
        line-height: 12px
        font-size: 10px
        color: rgb(7, 17, 27)
      .star-wrapper
        margin-bottom: 6px
        font-size: 0
        .star
          display: inline-block
          margin-right: 6px
          vertical-align: top
        .delivery
          display: inline-block
          vertical-align: top
          line-height: 12px
          font-size: 10px
          color: rgb(147, 153, 159)
      .text
        margin-bottom: 8px
        line-height: 18px
        color: rgb(7, 17, 27)
        font-size: 12px
      .recommend
        line-height: 16px
        font-size: 0
        .icon-thumb_up, .item
          display: inline-block
          margin: 0 8px 4px 0
          font-size: 9px
        .icon-thumb_up
          color: rgb(0, 160, 220)
        .item
          padding: 0 6px
          border: 1px solid rgba(7, 17, 27, 0.1)
          border-radius: 1px
          color: rgb(147, 153, 159)
          background: #fff
      .time
        position: absolute
        top: 0
        right: 0
        line-height: 12px
        font-size: 10px
        color: rgb(147, 153, 159)
</style>
<script type="text/ecmascript-6">
  import star from 'components/star/star';
  import {formatDate} from 'common/js/date';
  const ALL = 2;
  export default{
    props: {
      ratings: {
        type: Array
      },
      selectType: {
        type: Number
      },
      onlyContent: {
        type: true
      }
    },
    data() {
      return {
      };
    },
    methods: {
      needShow(type, text) {
        // console.log(`${type}+${text}`);
        if (this.onlyContent && !text) {
          return false;
        }
        if (this.selectType === ALL) {
          return true;
        } else {
          return type === this.selectType;
        }
      }
    },
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    components: {star}
  };
</script>
