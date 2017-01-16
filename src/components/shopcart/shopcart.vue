<template>
  <!-- 将遮罩层与内容区分开 -->
  <div class="shop-cart-wrapper">
    <div class="shop-cart">
      <div class="content" @click="toggleList">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo" :class="{highlight:totalCount>0}">
              <i class="icon-shopping_cart" :class="{highlight:totalCount>0}"></i>
            </div>
            <!-- 显示购物车里有多少个商品 -->
            <div class="num" v-show="totalCount>0">{{totalCount}}</div>
          </div>
          <div class="price" :class="{highlight:totalCount>0}">￥{{totalPrice}}</div>
          <div class="description">另需配送费￥{{deliveryPrice}}元</div>
        </div>
        <div class="content-right">
          <!-- 修饰符组织事件冒牌 -->
          <div class="pay" :class="payClass" @click.stop.prevent="pay">{{payDes}}</div>
        </div>
      </div>
      <div class="ball-container">
        <!-- transition-groun默认tag为span 这里改为div -->
        <!-- 每个子节点需要独立的key -->
        <transition-group
          tag="div"
          name="ball"
          v-on:before-enter="beforeEnter"
          v-on:enter="enter"
          v-on:after-enter="afterEnter"
        >
          <!-- 小球在X,Y轴上产生过度，所以分两层，分别控制两轴的过渡效果 -->
          <div class="ball" v-for="(ball,index) in balls" v-show="ball.show" :key="index">
            <div class="inner inner-hook"></div>
          </div>
        </transition-group>
      </div>
      <transition name="fold">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <div class="empty" @click="empty">清空</div>
          </div>
          <div class="list-content" ref="listContent">
            <ul>
              <li class="list-item" v-for="food in selectedFoods">
                <span class="name">{{food.name}}</span>
                <div class="price">¥{{food.price*food.count}}</div>
                <div class="cartcontral-wrapper">
                  <cartcontral :food="food"></cartcontral>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <div class="list-mask" @click="hideList" v-show="listShow"></div>
    </transition>
  </div>
</template>
<style lang="sass" rel="stylesheet/sass">
  @import '../../common/style/mixin.scss'

  .shop-cart
    position: fixed
    left: 0
    bottom: 0
    z-index: 50
    width: 100%
    height: 48px
    .content
      display: flex
      color: rgba(255, 255, 255, 0.4)
      background: #141d27
      .content-left
        /* fz=0 解决缝隙问题 */
        font-size: 0
        flex: 1
        .logo-wrapper
          display: inline-block
          position: relative
          top: -10px
          margin: 0 12px
          padding: 6px
          width: 56px
          height: 56px
          /* ie盒模型计算方式 */
          box-sizing: border-box
          vertical-align: top
          /* 圆形 */
          border-radius: 50%
          background: #141d27
          .logo
            /* 盛满父元素 */
            width: 100%
            height: 100%
            font-size: 24px
            background: #2b343c
            border-radius: 50%
            text-align: center
            line-height: 44px
            color: rgba(255, 255, 255, 0.4)
            /* logo激活时样式 */
            &.highlight
              background: rgb(0, 160, 220)
            .icon-shopping_cart
              line-height: 44px
              font-size: 24px
              color: #80858a
              /* iconfont激活时样式 */
              &.highlight
                color: #fff
          .num
            position: absolute
            top: 0
            right: 0
            width: 24px
            height: 16px
            line-height: 16px
            text-align: center
            border-radius: 16px
            font-size: 9px
            font-weight: 700
            color: #fff
            background: rgb(240, 20, 20)
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
        .price
          display: inline-block
          vertical-align: top
          margin-top: 12px
          line-height: 24px
          padding-right: 12px
          box-sizing: border-box
          border-right: 1px solid rgba(255, 255, 255, 0.1)
          font-size: 16px
          font-weight: 700
          &.highlight
            color: #fff
        .description
          display: inline-block
          vertical-align: top
          margin: 12px 0 0 12px
          line-height: 24px
          font-size: 10px
      .content-right
        flex: 0 0 105px
        width: 105px
        .pay
          height: 48px
          line-height: 48px
          text-align: center
          font-size: 12px
          font-weight: 700
          &.not-enough
            background: #2b333b
          &.enough
            background: #00b43c
            color: #fff
    .ball-container
      .ball
        /* 相对视口产生的动画，所以采用fixed定位 */
        position: fixed
        left: 32px
        bottom: 22px
        z-index: 200
        &.ball-enter-active
          transition: all 0.5s cubic-bezier(0.49, -0.29, 0.75, 0.41)
          .inner
            width: 16px
            height: 16px
            border-radius: 50%
            background: rgb(0, 160, 220)
            transition: all 0.5s linear
    .shopcart-list
      position: absolute
      left: 0
      top: 0
      z-index: -1
      width: 100%
      transform: translate3d(0, -100%, 0)
      &.fold-enter-active, &.fold-leave-active
        transition: all 0.5s
      &.fold-enter, &.fold-leave-active
        transform: translate3d(0, 0, 0)
      &.fold-leave
        transform: translate3d(0, -100%, 0)
      .list-header
        height: 40px
        line-height: 40px
        padding: 0 18px
        background: #f3f5f7
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        .title
          float: left
          font-size: 14px
          color: rgb(7, 17, 27)
        .empty
          float: right
          font-size: 12px
          color: rgb(0, 160, 220)
      .list-content
        padding: 0 18px
        max-height: 217px
        overflow: hidden
        background: #fff
        .list-item
          position: relative
          padding: 12px 0
          box-sizing: border-box
          @include border-1px(rgba(7, 17, 27, 0.1))
          .name
            line-height: 24px
            font-size: 14px
            color: rgb(7, 17, 27)
          .price
            position: absolute
            right: 90px
            bottom: 12px
            line-height: 24px
            font-size: 14px
            font-weight: 700
            color: rgb(240, 20, 20)
          .cartcontral-wrapper
            position: absolute
            right: 0
            bottom: 6px

  .list-mask
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 40
    backdrop-filter: blur(10px)
    background: rgba(7, 17, 27, 0.6)
    &.fade-enter-active, &.fade-leave-active
      transition: all 0.5s
      opacity: 1
    &.fade-enter, &.fade-leave-active
      opacity: 0
      background: rgba(7, 17, 27, 0)

</style>
<script type="text/ecmascript-6">
  // 购物车加减组件是通过better-scroll进行click事件派发的
  // 为了在此页面中cartcontral实现click点击事件
  import BScroll from 'better-scroll';
  import cartcontral from 'components/cartcontral/cartcontral';
  /* eslint-disable no-unused-vars */
  import {eventHub} from 'common/js/eventHub.js';

  export default{
    props: {
      selectedFoods: {
        type: Array,
        default() {
          return [];
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        // 添加购物车小球动画
        balls: [
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
        ],
        dropBalls: [],
        // 是否展开购物车
        fold: false
      };
    },
    computed: {
      // 所有选中商品的总价
      totalPrice() {
        let total = 0;
        this.selectedFoods.forEach((food) => {
          total += food.price * food.count;
        });
        return total;
      },
      // 所有选中商品的数量
      totalCount() {
        let count = 0;
        this.selectedFoods.forEach((food) => {
          count += food.count;
        });
        return count;
      },
      // 切换结算按钮的样式
      payClass() {
        if (this.totalPrice >= this.minPrice) {
          return 'enough';
        } else {
          return 'not-enough';
        }
      },
      payDes() {
        if (!this.totalPrice) {
          return `￥${this.minPrice}元起送`;
        } else if (this.totalPrice >= this.minPrice) {
          // es6 `` 用法，可在字符串中通过${variable}插入变量
          return '去结算';
        } else if (this.totalPrice < this.minPrice) {
          let diff = 0;
          diff = this.minPrice - this.totalPrice;
          return `还差￥${diff}元起送`;
        }
      },
      // 是否显示购物车细节
      listShow() {
        if (!this.totalCount) {
          this.fold = true;
          return false;
        }
        let show = !this.fold;
        if (show) {
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.listContent, {
                click: true
              });
            } else {
              // 实例化后刷新即可,不需要重新实例化
              this.scroll.refresh();
            }
          });
        }
        return show;
      }
    },
    methods: {
      // 隐藏购物车遮罩层
      hideList() {
        this.fold = true;
      },
      // 点击购物车栏，显示细节
      toggleList() {
        // 如果购物车为空，则fold取反
        if (!this.totalCount) {
          return;
        }
        this.fold = !this.fold;
      },
      // 购买商品后落入购物车动画
      drop(el) {
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i];
          if (!ball.show) {
            // 触发动画
            ball.show = true;
            ball.el = el;
            this.dropBalls.push(ball);
            // console.log(this.dropBalls);
            return;
          }
        }
      },
      // javascript钩子
      // 创建动画
      beforeEnter(el) {
        let count = this.balls.length;
        while (count--) {
          let ball = this.balls[count];
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect();
            let x = rect.left - 32;
            let y = -(window.innerHeight - rect.top - 22);
            el.style.display = '';
            el.style.webkitTransform = `translate3d(0,${y}px,0)`;
            el.style.transform = `translate3d(0,${y}px,0)`;
            let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
            inner.style.transform = `translate3d(${x}px,0,0)`;
          }
        }
      },
      enter(el) {
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight;
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0,0,0)';
          el.style.transform = 'translate3d(0,0,0)';
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform = 'translate3d(0,0,0)';
          inner.style.transform = 'translate3d(0,0,0)';
        });
      },
      afterEnter(el) {
        let ball = this.dropBalls.shift();
        if (ball) {
          ball.show = false;
          el.style.display = 'none';
        }
      },
      // 清空购物车
      empty() {
        this.selectedFoods.forEach((food) => {
          food.count = 0;
        });
      },
      pay() {
        // 如果总价小于最低消费，什么都不做
        if (this.totalPrice < this.minPrice) {
          return;
        }
        window.alert(`共消费${this.totalPrice}元`);
      }
    },
    components: {
      cartcontral
    }
  };
</script>
