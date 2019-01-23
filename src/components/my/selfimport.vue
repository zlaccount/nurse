<!--  -->
<template>
  <div class="myView">
    <div class="cellLink">
      <div class="gray"></div>
      <!-- 客服服务 -->
      <van-cell
        is-link
        @click="service"
      >
        <template slot="title">
          <img
            :src="icon.ask"
            slot="right"
            class="leftIcon"
          />
          <span class="custom-text">客服服务</span>
        </template>
      </van-cell>
      <div class="gray"></div>
      <!-- 帮助 -->
      <van-cell
        is-link
        @click="directions"
      >
        <template slot="title">
          <img
            :src="icon.help"
            slot="right"
            class="leftIcon"
          />
          <span class="custom-text">帮助</span>
        </template>
      </van-cell>

      <div class="backLogin">
        <van-button
          size="normal"
          v-if="this.loginType == 0"
          @click="loginBack"
        >退出登录</van-button>
        <van-button
          size="normal"
          v-if="this.loginType == 1"
          @click="login"
        >登录</van-button>
      </div>
    </div>
    <!--客服服务-->
    <div class="serviceIsShow">
      <van-dialog
        v-model="serviceIsShow"
        show-cancel-button
        :before-close="beforeClose"
        confirm-button-text="呼叫"
      >
        <h4>温馨提示</h4>
        <p>客服在线时间为正常工作日：上午8:30-12:00，下午13:30-17:00</p>
        <a
          @click="callphone"
          :href="'tel:' + phone"
        >{{ phone }}</a>
      </van-dialog>
    </div>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { mapGetters, mapMutations } from "vuex";
import { ERR_OK, imgUrl } from "api/config";
import { getBasicData } from "api/myself";
import { deposit } from "api/bed";
import Login from "components/login/login";

import localImgUrl from "../../../static/img/invite@3x.png";
// 公共js
import common from "common/js/common.js";
import ask_active from "../../../static/img_icon/icon_ask.png";
import help_active from "../../../static/img_icon/icon_help.png";
import waitpay_active from "../../../static/img_icon/icon_waitpay.png";
import iconwode_active from "../../../static/img_icon/icon-wode.png";
import Theorder_active from "../../../static/img_icon/Theorder.png";
import icon_my_active from "../../../static/img_icon/icon-wode2-mall@2x.png";

export default {
  // import引入的组件需要注入到对象中才能使用
  components: { Login },
  data() {
    // 这里存放数据
    return {
      serviceIsShow: false, // 客服帮助
      finished: false,
      loading: false,
      parentMsg: "",
      loginType: 1,
      // 初始化数据
      accountImage: "",
      accountName: "",
      accountBalance: "",
      getDepositType: "",
      phone: "027-88112751",
      localImgUrl: localImgUrl,
      // 开关
      num: 0,
      type: 0,
      currentTabNav: ["押金管理", "缴纳押金", "使用说明"],
      currentTab: "direction_comp", // currentTab 用于标识当前触发的子组件
      icon: {
        ask: ask_active,
        help: help_active,
        waitpay: waitpay_active,
        iconwode: iconwode_active,
        Theorder: Theorder_active,
        myBalance: icon_my_active
      }
    };
  },
  // 监听属性 类似于data概念
  computed: {
    ...mapGetters(["islogin"])
  },
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    // 退出重新登录
    loginBack() {
      this.indexIsHide = 0;
      this.accountImage = "";
      this.accountName = "";
      window.localStorage.clear();
      this.$router.push({
        name: "login"
      });
    },
    login() {
      this.$router.push({
        name: "login"
      });
    },
    // 是否登录
    _getBasicData() {
      common.$on(
        "msg",
        function (data) {
          this.loginType = 0
        }.bind(this)
      );
      if (localStorage.getItem("nurseId")) {
        this.loginType = 0
      }
    },
    // 押金管理
    depositManger() {
      this.setDepositType(this.getDepositType);
    },
    // 使用说明
    directions() {
      this.setDirections(true);
    },
    // 未支付订单
    ItemWaitPay() { },
    // 个人资料
    person() {
      if (!localStorage.getItem("id")) {
        this.setIsLoin(true);
      } else {
        this.$router.push({
          name: "selfperson"
        });
        return false;
      }
    },
    // 账户充值
    balance() {
      // 测试
      this.$router.push({
        name: "selfbalance"
      });
    },

    //  订单管理
    order() {
      // 测试
      this.$router.push({
        name: "order"
      });
    },

    // 客服服务
    service() {
      this.serviceIsShow = true;
    },
    beforeClose(action, done) {
      if (action === "confirm") {
        this.callphone();
        setTimeout(done, 1000);
      } else {
        done();
      }
    },
    callphone() {
      console.log("拨打电话");
    },
    // 使用说明
    onClickLeft() {
      this.conponentIsShow = false;
    },
    tab(index) {
      this.conponentIsShow = true;
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
      setIsLoin: "SET_ISLOGIN",
      setDepositType: "SET_DEPOSIT_TYPE",
      setDirections: "SET_DIRECTIONS"
    })
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this._getBasicData();
  },
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
.myView {
  // 个人资料
  .Msg {
    .van-row {
      background: #4fd6bc;
      color: #fff;
      position: relative;
      padding-top: 20px;
      padding-bottom: 10px;

      .van-col:first-child {
        .van-button {
          background: #4fd6bc;
          height: 100%;
          color: #fff;
          border: 0;
          width: 100%;
          padding-right: 0;

          span {
            position: relative;
            float: left;
            padding-left: 5px;
            height: 20px;
            line-height: 20px;
            text-align: left;

            .van-icon {
              position: absolute;
              left: 60px;
              bottom: 2px;
            }
          }

          .person {
            float: left;

            img {
              width: 60px;
              height: 60px;
              display: inline-block;
              line-height: 30px;
              border-radius: 50%;
            }
          }

          .personText {
            float: left;
            margin-top: 18px;

            p {
              margin: 0;
              line-height: 20px;
              text-align: left;
              padding-left: 5px;
            }
          }
        }
      }

      .van-col:last-child {
        .van-button {
          background: #4fd6bc;
          color: #4fd6bc;
          position: absolute;
          right: 10px;
          top: 20px;
          height: 25px;
          line-height: 25px;
          width: 45px;
          font-size: 12px;
          padding: 0;
          text-align: center;
          border: 0;
        }
      }
    }
  }

  // 账户
  .account {
    .van-row {
      background: #8dd7c8;
      position: relative;
      padding-top: 20px;
      padding-bottom: 20px;
      margin-bottom: 10px;

      .van-col {
        .van-button {
          background: #8dd7c8;
          color: #fff;
          width: 100%;
          height: 100%;
          padding: 0;
          border: 0;

          span {
            display: block;
            height: 20px;
            line-height: 20px;
          }
        }
      }

      .van-col:last-child {
        .van-button {
          span {
            border-left: 1px solid #fff;
          }
        }
      }
    }
  }

  .serviceIsShow {
    text-align: center;

    h4 {
      line-height: 64px;
    }

    p {
      text-align: left;
      width: 90%;
      font-size: 12px;
      line-height: 22px;
      margin: 0 auto 20px;
    }

    a {
      // visibility:hidden
      display: none;
    }
  }

  // 跳转
  .cellLink {
    .van-cell {
      border-bottom: 1px solid #ebedf0;
    }

    .van-cell::after {
      border: 0;
    }
  }

  // 退出登录
  .backLogin {
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
