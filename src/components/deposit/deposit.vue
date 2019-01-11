<!--  -->
<template>
  <transition name="slide">
    <!-- 退还押金 -->
    <div
      class="depositViewPage"
      v-if="depositType == 1"
    >
      <van-nav-bar
        fixed
        title="押金管理"
        left-arrow
        @click-left="onClickLeft"
      >
      </van-nav-bar>
      <div class="topblank"></div>
      <div class="deposit">
        <p>押金（元）</p>
        <h4><span>￥</span>58元</h4>
        <p class="tip">押金随心退，安全速到账</p>
      </div>
      <div class="backdMoney">
        <a
          href="javascript:void(0)"
          @click="directionsManager"
          class="seeQuestion"
        >
          对押金规则不清楚？</a>
        <van-button
          type="default"
          @click="tab(1)"
        >退还 </van-button>
      </div>
    </div>
    <!-- 缴纳押金 -->
    <div
      class="depositViewPage toPayDeposit"
      v-if="depositType == 0"
    >
      <van-nav-bar
        fixed
        title="缴纳押金"
        left-arrow
        @click-left="onClickLeft"
      >
      </van-nav-bar>
      <div class="topblank"></div>
      <div class="deposit">
        <p class="moneyTitle">金额</p>
        <h4>58元</h4>
        <p class="tip">押金随心退，安全速到账</p>
      </div>
      <pay-way></pay-way>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

// 支付结果
import PayWay from "components/payway/payway";
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {
    PayWay
  },
  data() {
    // 这里存放数据
    return {
      resultType: "",
      num: 0,
      currentTabNav: ["使用说明", "退还结果"]
    };
  },
  // 监听属性 类似于data概念
  computed: {
    ...mapGetters(["depositType"])
  },
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    //返回
    onClickLeft() {
      this.setDepositType(2);
    },
    // 使用说明
    directionsManager() {
      this.setDirections(true);
    },
    tab(index) {
      this.conponentIsShow = true;
      this.num = index;
      if (index === 0) {
        this.toggleTab("direction_comp");
      }
      if (index === 1) {
        this.toggleTab("result_comp");
      }
    },
    toggleTab(tab) {
      this.currentTab = tab; // tab 为当前触发标签页的组件名
    },
    ...mapMutations({
      setDepositType: "SET_DEPOSIT_TYPE",
      setDirections: "SET_DIRECTIONS"
    })
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() { },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() { },
  beforeCreate() { }, // 生命周期 - 创建之前
  beforeMount() { }, // 生命周期 - 挂载之前
  beforeUpdate() { }, // 生命周期 - 更新之前
  updated() { }, // 生命周期 - 更新之后
  beforeDestroy() { }, // 生命周期 - 销毁之前
  destroyed() { }, // 生命周期 - 销毁完成
  activated() { } // 如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="stylus" scoped>
// @import url(); 引入公共css类
@import '~common/stylus/variable';
@import '~common/stylus/mixin';

.depositViewPage {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 152;
  background: $color-background;

  .deposit {
    text-align: center;
    position: relative;

    h4 {
      color: orange;
      font-size: 23px;
      font-weight: 400;
      line-height: 10px;
      margin: 10px 0;
    }

    .moneyTitle {
      padding-top: 20px;
    }

    p {
      line-height: 48px;
    }

    .tip {
      color: #333;
      font-size: 14px;
    }
  }

  .backdMoney {
    position: relative;

    .seeQuestion {
      position: fixed;
      bottom: 72px;
      text-align: center;
      color: #999;
      width: 100%;
      left: 0;
    }

    .van-button {
      position: fixed;
      bottom: 20px;
      left: 0px;
      right: 0px;
      width: 92%;
      margin-left: auto;
      margin-right: auto;
      background: #4fd6bc;
      color: #fff;
      font-size: 16px;
    }
  }

  .toPayDeposit {
    text-align: center;
    position: absolute;
    width: 200px;
    margin-left: -100px;
    left: 50%;
    height: 200px;
    margin-top: -200px;
    top: 50%;

    h4 {
      color: orange;
      font-size: 26px;
      font-weight: 400;
      line-height: 10px;
      margin: 10px 0;

      span {
        font-size: 17px;
      }
    }

    p {
      line-height: 48px;
    }

    .tip {
      color: #999;
      font-size: 14px;
    }
  }
}
</style>
