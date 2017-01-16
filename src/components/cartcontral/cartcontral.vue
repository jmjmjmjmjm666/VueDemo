<template>
  <div class="cartcontral">
    <!-- 数量大于0时显示 -->
    <transition name="move">
      <!-- 组织默认点击，冒泡，穿透 -->
      <div class="minus" v-show="food.count>0" @click.stop.prevent="minusFood">
        <i class="inner icon-remove_circle_outline"></i>
      </div>
    </transition>
    <div class="count" v-show="food.count>0">{{food.count}}</div>
    <!-- 组织默认点击，冒泡，穿透 -->
    <div class="addition icon-add_circle" @click.stop.prevent="addFood"></div>
  </div>
</template>
<style lang="sass" rel="stylesheet/sass">
  .cartcontral
    font-size: 0
    .minus
      display: inline-block
      padding: 6px
      .inner
        display: inline-block
        line-height: 24px
        font-size: 24px
        color: rgb(0, 160, 220)
        transform: rotate(0deg)
      &.move-enter-active, &.move-leave-active
        transform: translate3d(0,0,0)
        transition: all .4s linear
        .inner
          transition: all .4s linear
      &.move-enter, &.move-leave-active
        opacity: 0
        transform: translate3d(24px,0,0)
        .inner
          transform: rotate(180deg)
    .addition
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color: rgb(0, 160, 220)
    .count
      display: inline-block
      vertical-align: top
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align: center
      font-size: 10px
      color: rgb(147, 153, 159)
</style>
<script type="text/ecmascript-6">
  /* eslint-disable no-unused-vars */
  import {eventHub} from 'common/js/eventHub.js';
  export default{
    props: {
      food: {
        type: Object
      }
    },
    data() {
      return {};
    },
    created() {
      // console.log(this.food);
    },
    methods: {
      addFood(event) {
        if (!event._constructed) {
          return;
        }
        // 引入了better-scroll,pc端会响应两次click事件
        if (!this.food.count) {
          // Vue实例化时没有count，所以在这里以this.food.count = 0不会响应
          // 应用Vue中的set方法可以加入响应的数据，DOM响应的变化
          this.$set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }
        // console.log(this.food.count);
        // 事件分发
         eventHub.$emit('add-food', event.target);
      },
      minusFood(event) {
        if (!event._constructed) {
          return;
        }
        if (this.food.count) {
          this.food.count--;
        }
      }
    }
  };
</script>
