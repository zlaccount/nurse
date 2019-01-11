<!--  -->
<template>
  <transition name="slide">
    <div
      class="managerViewPage"
      v-if="bedmanager == true"
    >
      <van-nav-bar
        fixed
        left-arrow
        class="TabNavActive"
        @click-left="onClickLeft"
        title="信息管理"
      >
      </van-nav-bar>
      <div class="topblank"></div>
      <div class="manger">
        <van-cell
          is-link
          @click="depositManager"
        >
          <template slot="title">
            <img
              :src="icon.Thedeposit"
              slot="right"
              class="leftIcon"
            />
            <span class="custom-text">押金管理</span>
          </template>
        </van-cell>
        <van-cell
          is-link
          @click="order"
        >
          <template slot="title">
            <img
              :src="icon.report"
              slot="right"
              class="leftIcon"
            />
            <span class="custom-text">我的订单</span>
          </template>
        </van-cell>
        <van-cell
          is-link
          @click="directionsManager"
        >
          <template slot="title">
            <img
              :src="icon.using"
              slot="right"
              class="leftIcon"
            />
            <span class="custom-text">使用说明</span>
          </template>
        </van-cell>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import report from "../../../static/img_icon/report.png";
import using from "../../../static/img_icon/icon_using.png";
import Thedeposit from "../../../static/img_icon/Thedeposit.png";
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    // 这里存放数据
    return {
      // 开关
      num: 0,
      type: 0,
      currentTabNav: ["押金管理", "缴纳押金", "使用说明"],
      currentTab: "direction_comp", // currentTab 用于标识当前触发的子组件
      icon: {
        report: report,
        using: using,
        Thedeposit: Thedeposit
      }
    };
  },
  // 监听属性 类似于data概念
  computed: {
    ...mapGetters(["bedmanager", "orderState"])
  },
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    onClickLeft() {
      this.setFalseManger(false);
    },
    // 押金管理
    depositManager() {
      this.setDepositType(1);
    },
    // 使用说明
    directionsManager() {
      this.setDirections(true);
    },
    // 订单管理
    order() {
      // this.setOrderState(true)
      this.$router.push({
          name: "order"
          // params: {
          //   id: 1
          // }
      });
    },
    tab(index) {
      this.num = index;
      if (index === 0) {
        this.toggleTab("Deposit_comp");
      }
      if (index === 1) {
        this.toggleTab("ToPaydeposit_comp");
      }
      if (index === 2) {
        this.toggleTab("direction_comp");
      }
    },
    toggleTab(tab) {
      this.currentTab = tab; // tab 为当前触发标签页的组件名
    },

    ...mapMutations({
      setDepositType: "SET_DEPOSIT_TYPE",
      setFalseManger: "SET_BEDMANAGER",
      setDirections: "SET_DIRECTIONS",
      setOrderState: "SET_ORDER_STATE",
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
<style scoped lang="stylus">
// @import url(); 引入公共css类
.managerViewPage {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 150;
  background: #f5f3f4;

  .manger {
    // 使用说明导航
    .van-nav-bar {
      z-index: 13 !important;
    }

    .van-cell {
      margin-top: 10px;
    }
  }
}
</style>
