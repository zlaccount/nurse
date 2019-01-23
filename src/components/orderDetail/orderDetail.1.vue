<!--  -->
<template>
  <transition name="slide">
    <div class="detailViewPage">
      <van-nav-bar
        fixed
        left-arrow
        @click-left="onClickLeft"
        title="订单详情"
      >
      </van-nav-bar>
      <div class="topblank"></div>

      <detail-list :orderDetail="res"></detail-list>

    </div>
  </transition>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import DetailList from "base/DetailList/DetailList";
import { ERR_OK } from "api/config";
// import { orderDetail } from "api/bed";
import { mapGetters } from "vuex";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: { DetailList },
  data() {
    //这里存放数据
    return {
      res: {}
    };
  },
  //监听属性 类似于data概念
  computed: {
    ...mapGetters(["order"])

  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    _getData() {

    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this._getData();
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() { },
  beforeCreate() {
    // var user_id = localStorage.getItem("id")
    //     ? localStorage.getItem("id")
    //     : "";
    // if (user_id != "") {
    //     //接口对接
    //     orderDetail(user_id, this.$route.params.id).then(res => {
    //         this.res = res;
    //     });
    // }
  }, //生命周期 - 创建之前
  beforeMount() { }, //生命周期 - 挂载之前
  beforeUpdate() { }, //生命周期 - 更新之前
  updated() { }, //生命周期 - 更新之后
  beforeDestroy() { }, //生命周期 - 销毁之前
  destroyed() { }, //生命周期 - 销毁完成
  activated() { } //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style scoped lang="stylus">
// @import url(); 引入公共css类
.detailViewPage {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 152;
  background: #f5f3f4;
}
</style>
