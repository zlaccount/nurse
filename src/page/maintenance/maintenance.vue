<!--  -->
<template>
  <div class="maintenance">
    <van-nav-bar
      fixed
      title="床柜维修"
    > </van-nav-bar>
    <div class="topblank"></div>

    <div class="tab">
      <div
        class="tab-item"
        v-for="(item, index) in tabTitle"
        :key="index"
        :class="{ orderActive: index == num }"
        @click="tab(index)"
      >
        <span class="tab-link">{{ item }}</span>
      </div>
    </div>
    <van-search
      placeholder="请输入医院名称"
      v-model="keyValue"
      @search="keyOnSearch"
    />
    <hospital-list :allOrder="expertList"></hospital-list>

  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import HospitalList from "base/hospitallist/hospitallist";

export default {
  //import引入的组件需要注入到对象中才能使用
  components: { HospitalList },
  data() {
    //这里存放数据

    return {
      orderActive: 0,
      num: 0,
      tabTitle: ["未维修（2个）", "已维修"],
      keyValue: "",
      expertList: [
        {
          hospitalname: "湖北省妇幼保健院",
          entry: 4,
        },
        {
          hospitalname: "武汉市第九医院",
          entry: 5,
        }, {
          hospitalname: "武汉大学中南医院",
          entry: 2,
        },
      ]
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    keyOnSearch() { },
    tab(index) {
      this.num = index;
      if (index === 0) {
      }
      if (index === 1) {
      }
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() { },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() { },
  beforeCreate() { }, //生命周期 - 创建之前
  beforeMount() { }, //生命周期 - 挂载之前
  beforeUpdate() { }, //生命周期 - 更新之前
  updated() { }, //生命周期 - 更新之后
  beforeDestroy() { }, //生命周期 - 销毁之前
  destroyed() { }, //生命周期 - 销毁完成
  activated() { } //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style scoped lang="stylus">
@import '~common/stylus/variable';

.maintenance {
  .tab {
    display: flex;
    height: 40px;
    line-height: 40px;
    font-size: $font-size-medium;
    background: #fff;
    outline: 1px solid #dbdcde;

    .tab-item {
      flex: 1;
      text-align: center;

      .tab-link {
        padding-bottom: 5px;
        color: $color-default;
      }
    }

    .orderActive {
      .tab-link {
        color: $color-theme;
        border-bottom: 2px solid $color-theme;
      }
    }
  }
}
</style>
