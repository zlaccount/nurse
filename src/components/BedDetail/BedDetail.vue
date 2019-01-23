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
      <!-- <div>
        <div class="cellCon">
          <div class="gray"></div>
          <van-cell
            title="匹配编号"
            value-class="itemFinished"
            :value="bedCode"
          >
          </van-cell>

          <van-cell
            title="陪护床编号"
            :value="res.chaperonage_bed_code"
          >
          </van-cell>
          <van-cell
            title="病房号"
            :value="res.bedNumber"
          >
          </van-cell>

          <van-cell
            title="开始时间"
            :value="res.start_time"
          >
          </van-cell>
          <van-cell
            title="结束时间"
            :value="res.end_time"
          >
          </van-cell>
          <van-cell
            title="使用时间"
            :value="res.service_time"
          >
          </van-cell>

          <van-cell
            value="当前电量"
            value-class="itemWaitPay"
            title="结束方式"
          >
          </van-cell>
          <van-cell
            value="当前流量"
            title="结束方式"
          >
          </van-cell>
        </div>
      </div> -->
      <div class="jiebangd">
        <van-button
          size="normal"
          @click="jiebang"
        >解绑</van-button>
      </div>
    </div>
  </transition>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { ERR_OK } from "api/config";
import { monitoring } from "api/nurse";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      res: {}
    };
  },
  //监听属性 类似于data概念
  computed: {
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    _getData() {
      this._monitoring();
    },
    jiebang() { },
    _monitoring() {
      var currentPage = "";
      var pageSize = "";
      var lockState = this.$route.query.lockState;
      var bedEnergy = '';
      var bedFlow = '';
      var serviceTime = '';
      var bedCode = this.$route.query.id;
      monitoring(currentPage, pageSize, lockState,bedEnergy,bedFlow,serviceTime, bedCode).then(
        res => {
          this.res = res;
        }
      );
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
      this._getData();
    
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
      console.log(this.res)

   },
  beforeCreate() {
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
  background: #fff;

  .jiebangd {
    width: 80%;
    margin: 0 auto;

    .van-button {
      width: 100%;
      font-size: 15px;
      margin-top: 10px;
      background: #4fd6bc;
      color: #fff;
      border-radius: 5px;
    }
  }
}
</style>
