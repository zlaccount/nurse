<!--  -->
<template>
  <transition name="slide">
    <div class="routerViewPage">
      <van-nav-bar
        fixed
        left-arrow
        @click-left="onClickLeft"
        title="共享陪护床"
      >
      </van-nav-bar>
      <div class="topblank">
        <filter-bar
          top="46"
          :bar-menus="barMenus"
          @showDialog="handleShowDialog"
          @closeDialog="handleCloseDialog"
          @changeTab="handleChangeTab"
          @changeMainItem="handleChangeMainItem"
          @changeSelect="changeData"
        >
        </filter-bar>
        <used-state
          :allOrder="orderData"
          @select="selectOrder"
        ></used-state>
        <router-view></router-view>
      </div>
    </div>
  </transition>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import FilterBar from "components/nurse/FilterBar";
import barMenus from "src/router/data";
import UsedState from "components/usedstate/usedstate";
import { ERR_OK } from "src/api/config";
import { monitoring } from "api/nurse";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: { FilterBar, UsedState },
  data() {
    //这里存放数据
    return {
      barMenus: barMenus,
      orderData: []
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    onClickLeft() {
      // this.$router.push({
      //   path: `/nurse`
      // })
      this.$router.back();
    },
    selectOrder(order) {
      //接口对接
      this.$router.push({
        path: `/nurse/monitoring/${order.bedCode}`,
        query: {
          id: order.bedCode,
          lockState: order.lockState
        }
      });
    },
    handleShowDialog(v) {
      // console.log(v);
    },
    handleCloseDialog(v) {
      // console.log(v);
    },
    handleChangeTab(v) {
      // console.log(v);
    },
    handleChangeMainItem(v) {
      console.log(v);
    },
    changeData(v) {
      console.log(v);
    },
    _getData() {

      this._monitoring();
    },
    _monitoring() {
      var bedCode = "";
      var currentPage = "1";
      var pageSize = "10";
      monitoring(currentPage, pageSize, bedCode).then(res => {
        if (res.errcode * 1 === ERR_OK) {
          this.orderData = res.list;
        }
      });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this._getData();
  },
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
<style scoped lang="stylus"></style>
