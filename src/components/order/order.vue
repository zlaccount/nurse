<!--  -->
<template>
  <transition name="slide">
    <div class="orderViewPage">
      <van-nav-bar
        fixed
        left-arrow
        @click-left="onClickLeft"
        title="订单管理"
      >
      </van-nav-bar>
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
      <used-state
        :allOrder="orderData"
        @select="selectOrder"
      ></used-state>
      <router-view></router-view>
    </div>
  </transition>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import UsedState from "components/usedstate/usedstate";
import { order } from "api/bed";
import { mapGetters, mapMutations } from "vuex";

export default {
  //import引入的组件需要注入到对象中才能使用
  components: { UsedState },
  data() {
    //这里存放数据
    return {
      orderActive: 0,
      num: 0,
      tabTitle: ["全部订单", "已完成", "未完成", "待审核"],
      orderData: [],
      allData: [],
      orderList: {},
      noData: ["暂无数据"]
    };
  },

  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    selectOrder(order) {
      this.$router.push({
        path: `/order/${order.order_id}`
      });
      this.setOrder(order);
    },
    tab(index) {
      this.num = index;
      var obj = this.orderList;
      if (obj.length != 0) {
      }
      for (let i = 0; i < obj.length; i++) {
        if (index == 0) {
          this.orderData = this.allData;
        }
        if (obj[i].payState == index - 1) {
          this.orderData = obj[i].listInfo;
        }
      }
      // var allData = this.allData;
      // for (let j = 0; j < allData.length; j++) {
      //     var nm =
      //         allData[j].payState * 1 +
      //         +console.log(allData[j].payState++);
      //     // if (index == 0) {
      //     //     this.orderData = this.allData
      //     //   }
      //     // if (nm !== (index-1)) {
      //     //   this.orderData = this.noData

      //     // } else {

      //     // }
      // }
    },
    _getData() {
      order().then(res => {
        this.orderData = res;
        this.allData = res;
        this.dataDeal(res);
      });
    },
    dataDeal(data) {
      var that = this;
      var arr = data;
      var listArr = [];

      arr.forEach(function (el, index) {
        for (var i = 0; i < listArr.length; i++) {
          // 对比相同的字段key，相同放入对应的数组
          if (listArr[i].payState === el.payState) {
            listArr[i].listInfo.push({
              order_id: el.order_id,
              payState: el.payState,
              hospitalName: el.hospitalName,
              departmentName: el.departmentName,
              serviceTime: el.serviceTime,
              startTime: el.startTime,
              endTime: el.endTime
            });
            return;
          }
        }
        // 第一次对比没有参照，放入参照
        listArr.push({
          payState: el.payState,
          listInfo: [
            {
              order_id: el.order_id,
              payState: el.payState,
              hospitalName: el.hospitalName,
              departmentName: el.departmentName,
              serviceTime: el.serviceTime,
              startTime: el.startTime,
              endTime: el.endTime
            }
          ]
        });
      });
      that.orderList = listArr;
    },
    ...mapMutations({
      setOrderState: "SET_ORDER_STATE",
      setOrder: "SET_ORDER"
    })
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
<style scoped lang="stylus">
@import '~common/stylus/variable';

.orderViewPage {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 152;
  background: #f5f3f4;

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
