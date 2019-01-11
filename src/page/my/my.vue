<!--  -->
<template>
    <!-- 首页index -->
    <div class="my">
      <div class="myself">
        <h4>
          我的
          <van-button size="small" class="seeting" @click="selfsetting">
            <div>
              <!-- <img
                src="../../../static/img_icon/setting@2.png"
                slot="right"
                class="seeImg"
              /> -->
            </div>
          </van-button>
        </h4>
      </div>
      <!--设置  -->
      <div class="selfsetting">
        <van-popup
          v-model="selfmessageIsShow"
          position="right"
          :overlay="false"
        >
          <van-nav-bar fixed title="设置" left-arrow @click-left="settingBack">
          </van-nav-bar>
          <div class="topblank"></div>
          <Selfsetting_comp></Selfsetting_comp>
        </van-popup>
      </div>
      <!-- 我的入口 -->
      <Selfimport_comp></Selfimport_comp>
      <div class="loginView"><router-view></router-view></div>
    </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
//  信息管理
import common from 'common/js/common.js';

import Selfsetting_comp from 'components/my/selfsetting';
import Selfimport_comp from 'components/my/selfimport';

export default {
  // import引入的组件需要注入到对象中才能使用
  components: {
    Selfsetting_comp,
    Selfimport_comp
  },
  data() {
    // 这里存放数据
    return {
      // 开关
      selfmessageIsShow: false // 信息管理是否打开
      // 初始化数据
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    // 设置
    selfsetting() {
      // this.selfmessageIsShow = true
    },
    settingBack() {
      this.selfmessageIsShow = false
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
  },
  beforeCreate() {}, // 生命周期 - 创建之前
  beforeMount() {}, // 生命周期 - 挂载之前
  beforeUpdate() {}, // 生命周期 - 更新之前
  updated() {}, // 生命周期 - 更新之后
  beforeDestroy() {}, // 生命周期 - 销毁之前
  destroyed() {}, // 生命周期 - 销毁完成
  activated() {} // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style scoped lang="stylus">
//@import url(); 引入公共css类

  .myself {
    position: relative;
    h4 {
      margin: 0;
      text-align: center;
      line-height: 45px;
      background: #4fd6bc;
      color: #fff;
      font-weight: 400;
      .van-button {
        height: 45px;
        width: 45px;
        position: absolute;
        right: 0;
        top: 0px;
        border: 0;
        .seeImg {
          margin-top: 10px;
        }
      }
    }

    .van-button {
      background: #4fd6bc;
    }
  }

</style>
