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
      orderData: [],
      currentPage: "1",
      pageSize: "10",
      lockState: '',
      bedEnergy: '',
      bedFlow: '',
      serviceTime: '',
      bedCode: '',
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
      var arr = []
      for (let i in v) {
        arr.push(v[i]); //属性
      }
      console.log(arr[0].selectIndex);

      switch (arr[0].selectIndex) {
        case 0:
          var lockState = arr[0].value
          break;
        case 1:
          var lockState = arr[0].value
          break;
        case 2:
          var lockState = arr[0].value
          break;
        case 3:
          var serviceTime = arr[0].value
          break;
        case 4:
          var serviceTime = arr[0].value
          break;
        case 5:
          var serviceTime = arr[0].value
          break;
        case 6:
          var serviceTime = arr[0].value
          break;
        case 7:
          var serviceTime = arr[0].value
          break;
        case 8:
          var bedEnergy = arr[0].value
          var bedEnergyState = 0
          break;
        case 9:
          var bedEnergy = arr[0].value
          var bedEnergyState = 0
          break;
        case 10:
          var bedEnergy = arr[0].value
          var bedEnergyState = 1
          break;
        case 11:
          var bedFlow = arr[0].value
          break;
        case 12:
          var bedFlow = arr[0].value
          break;
        case 13:
          var bedFlow = arr[0].value
          break;
      }
      monitoring(this.currentPage, this.pageSize, lockState, bedEnergyState, bedEnergy, bedFlow, serviceTime, this.bedCode).then(res => {
        if (res.errcode * 1 === ERR_OK) {
          this.orderData = res.list;
          var lockState = ''
          var bedEnergyState = ''
          var bedEnergy = ''
          var bedFlow = ''
          var serviceTime = ''
        }
      })
    },
    changeData(v) {
    },
    _getData() {
      monitoring(this.currentPage, this.pageSize, this.lockState, this.bedEnergy, this.bedEnergyState, this.bedFlow, this.serviceTime, this.bedCode).then(res => {
        if (res.errcode * 1 === ERR_OK) {
          this.orderData = res.list;
        }
      })
    },
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
