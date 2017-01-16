<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item,index) in goods"
            class="menu-item"
            :class="{'current': currentIndex === index}"
            @click="selectMenu(index,$event)"
        >
          <span class="text">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li
          v-for="(item,index) in goods"
          class="food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li
              v-for="(food,index) in item.foods"
              class="food-item" @click="selectFood(food,$event)">
              <div class="icon">
                <img :src="food.icon">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p v-show="food.description" class="description">{{food.description}}</p>
                <div class="extra" v-show="food.sellCount">
                  <span>月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="count"><span>¥</span>{{food.price}}</span>
                  <span v-show="food.oldPrice"><span>¥</span>{{food.oldPrice}}</span>
                </div>
                <div class="cartcontral-wrapper">
                  <cartcontral :food="food"></cartcontral>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <!-- 传入del-pri配送费和min-pri起送费 -->
    <!-- 传入选中商品的数量给shopcart组件 -->
    <shopcart :selected-foods="selectedFoods" :delivery-price="seller.deliveryPrice"
              :min-price="seller.minPrice" ref="shopcart"></shopcart>
    <food :food="selectedFood" ref="food"></food>
  </div>
</template>
<style lang="sass" rel="stylesheet/sass">
  @import '../../common/style/mixin.scss'
  .goods
    display: flex
    position: absolute
    top: 174px
    bottom: 46px
    width: 100%
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      /* width 解决安卓浏览器兼容问题 */
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        width: 56px
        height: 54px
        line-height: 14px
        padding: 0 12px
        &.current
          position: relative
          margin-top: -1px
          background: #fff
          .text
            font-weight: 700
            @include border-none()
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          @include border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
          &.decrease
            @include bg-img('decrease_3')
          &.discount
            @include bg-img('discount_3')
          &.guarantee
            @include bg-img('guarantee_3')
          &.invoice
            @include bg-img('invoice_3')
          &.special
            @include bg-img('special_3')

    .foods-wrapper
      /* 右侧商品列表自适应宽度 */
      flex: 1
      .food-list
        .title
          padding-left: 14px
          height: 26px
          line-height: 26px
          border-left: 2px solid #d9dde1
          font-size: 12px
          color: rgb(147, 153, 159)
          background-color: #f3f5f7
        .food-item
          display: flex
          margin: 18px
          padding-bottom: 18px
          @include border-1px(rgba(7, 17, 27, 0.1))
          &:last-child
            @include border-none()
            margin-bottom: 0
          .icon
            flex: 0 0 57px
            margin-right: 10px
            img
              width: 57px
              height: 57px
          .content
            margin-top: 2px
            .name
              line-height: 14px
              font-size: 14px
              color: rgb(7, 17, 27)
            .description
              margin-top: 8px
              font-size: 10px
              line-height: 10px
              color: rgb(147, 153, 159)
            .extra
              margin-top: 8px
              font-size: 0
              color: rgb(147, 153, 159)
              line-height: 10px
              span
                display: inline-block
                font-size: 10px
                &:first-child
                  margin-right: 12px
            .price
              font-size: 0
              color: rgb(147, 153, 159)
              margin-top: 8px
              .count
                margin-right: 8px
                color: red
              span
                display: inline-block
                font-size: 14px
                font-weight: 700
                &:last-child
                  font-size: 10px
                span
                  font-size: 10px
            .cartcontral-wrapper
              position: absolute
              right: 0
              bottom: 8px
</style>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import shopcart from 'components/shopcart/shopcart';
  import cartcontral from 'components/cartcontral/cartcontral';
  import food from 'components/food/food';
  /* eslint-disable no-unused-vars */
  import {eventHub} from 'common/js/eventHub.js';
  const ERR_OK = 0;

  export default{
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0,
        selectedFood: {}
      };
    },
    computed: {
      // 得到左侧当前索引
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;
          }
        }
        return 0;
      },
      selectedFoods() {
        let foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food);
            }
          });
        });
        // console.log(foods);
        return foods;
      }
    },
    components: {shopcart, cartcontral, food},
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
      this.$http.get('/api/goods').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          // 此时Dom还未更新
          this.goods = response.data;
          // 回调函数内DOM更新完毕
          this.$nextTick(() => {
            this._initScroll();
            this._calculateHeight();
          });
        }
      });
      // 监听子组件事件 回调addFood方法
      eventHub.$on('add-food', this.addFood);
    },
    beforeDestroy() {
      eventHub.$off('add-food', this.addFood);
    },
    methods: {
      selectFood(food, event) {
        // 将原生dom事件派发return掉，解决pc端点击事件派发两次的问题
        // better-scroll默认会将浏览器click事件取消掉
        if (!event._constructed) {
          return;
        }
        this.selectedFood = food;
        this.$refs.food.show();
      },
      addFood(target) {
        // 体验优化,异步执行下落动画
        this.$nextTick(() => {
          this.$refs.shopcart.drop(target);
          // console.log(this.$refs);
        });
      },
      selectMenu(index, event) {
        // 将原生dom事件派发return掉，解决pc端点击事件派发两次的问题
        // better-scroll默认会将浏览器click事件取消掉
        if (!event._constructed) {
          return;
        }
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        let el = foodList[index];

        // 调用goodsScroll实例的滚动方法，滚动时间为300ms
        this.foodsScroll.scrollToElement(el, 300);
        // console.log(index);
      },
      _initScroll() {
        // console.log(this.$refs);
        // 实例化 better-scroll
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
          // 打开click事件
        });

        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          click: true,
          // 打开click事件 or购物车加减click会失效
          probeType: 3
        });

        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        });
      },
      _calculateHeight() {
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      }
    }
  };
</script>
