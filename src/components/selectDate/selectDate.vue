<!--  -->
<template>
  <transition name="slide">
    <div class="routerViewPage">
      <van-nav-bar fixed
                   left-arrow
                   @click-left="onClickLeft"
                   title="选择日期">
      </van-nav-bar>
      <div class="topblank"></div>
      <ul class="tab">
        <li class="tab-item"
            v-for="(item, index) in tabTitle"
            :key="index"
            :class="{ orderActive: index == num }"
            @click="tab(index)">
          <span class="tab-link">{{ item }}</span>
        </li>
      </ul>
      <div class="selectCon">
        <!-- 日统计 -->
        <Date_comp :is="currentTab"
                   v-if="currentTab == 'Date_comp'"
                   keep-alive></Date_comp>
        <!-- 月统计 -->
        <Date_comp :is="currentTab"
                   v-if="currentTab == 'Month_comp'"
                   keep-alive></Date_comp>
        <!-- 年统计 -->
        <Date_comp :is="currentTab"
                   v-if="currentTab == 'Year_comp'"
                   keep-alive></Date_comp>
      </div>
    </div>
  </transition>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import Date_comp from 'components/nurse/date'
import Month_comp from 'components/nurse/month'
import Year_comp from 'components/nurse/year'
export default {
  // import引入的组件需要注入到对象中才能使用
  components: { Date_comp, Month_comp, Year_comp },
  data() {
    // 这里存放数据
    return {
      orderActive: 0,
      tabTitle: ['日统计', '月统计', '年统计'],
      num: 0,
      currentTab: 'Date_comp' // currentTab 用于标识当前触发的子组件
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    onClickLeft() {
      this.$router.push({
        name: 'statisticalresults',
        params: {
          id: 1
        }
      })
    },
    tab(index) {
      this.num = index
      console.log(index)
      if (index === 0) {
        this.toggleTab('Date_comp')
      } else if (index === 1) {
        this.toggleTab('Month_comp')
      } else if (index === 2) {
        this.toggleTab('Year_comp')
      }
    },
    toggleTab(tab) {
      this.currentTab = tab // tab 为当前触发标签页的组件名
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
@import '~common/stylus/variable';

.tab {
  display: flex;
  height: 44px;
  line-height: 44px;
  font-size: $font-size-medium;
  background: #fff;
      z-index: 100;
    border-bottom: 1px solid #f5f3f4;
  .tab-item {
    flex: 1;
    text-align: center;
    .tab-link {
      // padding-bottom: 8px;
    }
  }
  .orderActive {
    .tab-link {
      color: $color-theme;
      border-bottom: 1px solid $color-theme;
      padding: 10px 10px;
    }
  }
}
</style>
