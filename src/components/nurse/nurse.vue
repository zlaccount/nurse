<!--  -->
<template>
  <div class="nurse">
    <van-nav-bar
      fixed
      title="信息管理"
    > </van-nav-bar>
    <div class="topblank"></div>
    <div class="message">
      <van-cell
        is-link
        @click="monitoring"
      >
        <template slot="title">
          <img
            :src="icon.monitoring"
            slot="right"
            class="leftIcon"
          />
          <span class="custom-text">使用监测</span>
        </template>
      </van-cell>

      <van-cell
        is-link
        @click="rent"
      >
        <template slot="title">
          <img
            :src="icon.rent"
            slot="right"
            class="leftIcon"
          />
          <span class="custom-text">租床统计</span>
        </template>
      </van-cell>
      <van-cell
        is-link
        @click="cost"
      >
        <template slot="title">
          <img
            :src="icon.money"
            slot="right"
            class="leftIcon"
          />
          <span class="custom-text">费用统计</span>
        </template>
      </van-cell>

    </div>
    <!-- 使用监测 -->
    <div class="nurseView">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
// 使用监测
import money from "../../../static/img_icon/icon_money.png";
import monitoring from "../../../static/img_icon/icon_monitoring.png";
import rent from "../../../static/img_icon/icon_rent.png";
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {
  },
  data() {
    // 这里存放数据
    return {
      // 开关
      icon: {
        money: money,
        monitoring: monitoring,
        rent: rent
      }
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    monitoring() {
      this.$router.push({
        path: `/nurse/monitoring`
      })
    },
    // 租床统计
    rent() {
      this.$router.push({
        name: 'statisticalresults',
        params: {
          id: 1
        }
      })
    },
    // 费用统计
    cost() {
      this.$router.push({
        name: 'statisticalresults',
        params: {
          id: 2
        }
      })
    }
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
}
</script>
<style scoped lang="stylus">
// @import url(); 引入公共css类
.message {
  // 使用说明导航
  .van-nav-bar {
    z-index: 13 !important;
  }

  .van-cell {
    margin-top: 10px;
  }
}
</style>
