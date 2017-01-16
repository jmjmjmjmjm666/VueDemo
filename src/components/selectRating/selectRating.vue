<template>
  <div class="select-rating">
    <div class="rating-type">
      <span
        @click="select(2,$event)"
        class="block positive"
        :class="{'active':selectedType===2}">{{desc.all}}
        <span class="count">{{ratings.length}}</span>
      </span>
      <span
        @click="select(0,$event)"
        class="block positive"
        :class="{'active':selectedType===0}"
      >{{desc.positive}}
        <span class="count">{{positives.length}}</span>
      </span>
      <span
        @click="select(1,$event)"
        class="block negative"
        :class="{'active':selectedType===1}">{{desc.negative}}
        <span class="count">{{negatives.length}}</span>
      </span>
    </div>
    <div class="switch" @click="toggleContent($event)">
      <span class="icon-check_circle" :class="{'on':onlyedContent}"></span>
      <span class="text">只看有内容的评论</span>
    </div>
  </div>
</template>
<style lang="sass" rel="stylesheet/sass">
  @import '../../common/style/mixin'

  .select-rating
    .rating-type
      padding: 18px 0
      margin: 0 18px
      @include border-1px(rgba(7, 17, 27, 0.1))
      font-size: 0
      .block
        display: inline-block
        padding: 8px 12px
        margin-right: 8px
        line-height: 16px
        border-radius: 1px
        font-size: 12px
        color: rgb(77, 85, 93)
        &.active
          color: #fff
        .count
          margin-left: 2px
          font-size: 8px
        &.positive
          background: rgba(0, 160, 220, 0.2)
          &.active
            background: rgb(0, 160, 220)
        &.negative
          background: rgba(77, 85, 93, 0.2)
          &.active
            background: rgb(77, 85, 93)

    .switch
      padding: 12px 18px
      line-height: 24px
      border-bottom: 1px solid rgba(7, 17, 27, 0.1)
      color: rgb(147, 153, 159)
      font-size: 0
      .on
        &.icon-check_circle
          color: #00c850
      .icon-check_circle
        display: inline-block
        vertical-align: top
        margin-right: 4px
        font-size: 24px
      .text
        display: inline-block
        vertical-align: top
        font-size: 12px
</style>
<script type="text/ecmascript-6">
  import {eventHub} from 'common/js/eventHub';

  // 推荐
  const POSITIVE = 0;
  // 吐槽
  const NEGATIVE = 1;
  // 全部
  const ALL = 2;
  export default{
    props: {
      // 评价
      ratings: {
        type: Array,
        default() {
          return [];
        }
      },
      // 默认选择的ratingtype
      selectType: {
        type: Number,
        default: ALL
      },
      // 当有内容时
      onlyContent: {
        type: Boolean,
        default: false
      },
      // 描述选项卡内容
      desc: {
        type: Object,
        default() {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          };
        }
      }
    },
    data() {
      return {
        // 不应该直接改变props 组件内尽量用data，否则会导致状态的不可捉摸
        selectedType: this.selectType,
        onlyedContent: this.onlyContent
      };
    },
    computed: {
      positives() {
        return this.ratings.filter((rating) => {
          return rating.rateType === POSITIVE;
        });
      },
      negatives() {
        return this.ratings.filter((rating) => {
          return rating.rateType === NEGATIVE;
        });
      }
    },
    methods: {
      select(type, event) {
        if (!event._constructed) {
          return;
        }
        this.selectedType = type;
        eventHub.$emit('select-Type', this.selectedType);
      },
      toggleContent(event) {
        if (!event._constructed) {
          return;
        }
        this.onlyedContent = !this.onlyedContent;
        eventHub.$emit('content-Toggle', this.onlyedContent);
      }
    }
  };
</script>
