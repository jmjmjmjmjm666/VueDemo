<template>
  <div class="star" :class="starType">
    <span v-for="itemClass in items" :class="itemClass" class="star-item"></span>
  </div>
</template>
<style lang="sass" rel="stylesheet/sass">
  @import '../../common/style/mixin.scss'
  .star
    font-size: 0
    .star-item
      display: inline-block
      background-repeat: no-repeat
    &.star-48
      .star-item
        width: 20px
        height: 20px
        margin-right: 22px
        background-size: 20px 20px
        &:last-child
          margin-right: 0
        &.on
          @include bg-img('star48_on')
        &.half
          @include bg-img('star48_half')
        &.off
          @include bg-img('star48_off')
    &.star-36
      .star-item
        width: 15px
        height: 15px
        margin-right: 6px
        background-size: 15px 15px
        &:last-child
          margin-right: 0
        &.on
          @include bg-img('star36_on')
        &.half
          @include bg-img('star36_half')
        &.off
          @include bg-img('star36_off')
    &.star-24
      .star-item
        width: 10px
        height: 10px
        margin-right: 3px
        background-size: 10px 10px
        &:last-child
          margin-right: 0
        &.on
          @include bg-img('star24_on')
        &.half
          @include bg-img('star24_half')
        &.off
          @include bg-img('star24_off')

</style>
<script type="text/ecmascript-6">
  const LENGTH = 5;
  const FULL_STAR = 'on';
  const HALF_STAR = 'half';
  const NO_STAR = 'off';

  export default{
    props: {
      size: {
        type: Number
      },
      score: {
        type: Number
      }
    },
    data() {
      return {};
    },
    components: {},
    computed: {
      starType() {
        return 'star-' + this.size;
      },
      items() {
        // 结果
        let result = [];
        // 得到score对应星数算法
        let score = Math.floor(this.score * 2) / 2;
        // 得到是否有小数，有小数则显示半颗心 true:有 false:无
        let hasDot = score % 1 !== 0;
        // 得到整数部分
        let getInt = Math.floor(score);
        for (let i = 0; i < getInt; i++) {
          result.push(FULL_STAR);
          // 推入整颗星的类名
        }
        // 判断是否有半颗星
        if (hasDot) {
          result.push(HALF_STAR);
        }
        // 将无星部分填充上
        while (result.length < LENGTH) {
          result.push(NO_STAR);
        }
        return result;
      }
    }
  };
</script>
