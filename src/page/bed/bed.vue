<template>
  <div class="bed">
    <div class="navbed">
      <van-nav-bar
        fixed
        title="共享陪护床"
        @click-right="manger"
      >
        <img
          src="../../../static/img_icon/more.png"
          slot="right"
          class="mangerIcon"
        />
      </van-nav-bar>
    </div>
    <van-steps
      :active="stepsActive"
      active-color="#4FD6BC"
    >
      <van-step>扫码 </van-step>
      <van-step>开锁</van-step>
      <van-step>支付</van-step>
    </van-steps>
    <!-- 开锁方式 -->
    <div class="way">
      <van-popup v-model="openLockIsShow">
        <div class="topservice">
          <van-row>
            <van-col span="24">
              <div class="topImg">
                <img
                  src="../../../static/img/Sweeptheyard.png"
                  class="more"
                  @click="wx()"
                />
              </div>
              <p>扫码绑定</p>
            </van-col>
          </van-row>
          <van-row>
            <van-col span="24">
              <div class="topImg">
                <img
                  src="../../../static/img/Theinput.png"
                  class="more"
                  @click="handinput()"
                />
              </div>
              <p>输入编码绑定</p>
            </van-col>
          </van-row>
        </div>
      </van-popup>
      <div class="pleaseSelect">
        <p class="pleaseText">请选择开锁方式</p>
        <p class="tip">提示:未在医院工作时间内不能成功开锁</p>
      </div>
    </div>
    <router-view></router-view>
    <!-- 解锁 -->
    <div class="lockresult">
      <!-- 开锁失败 -->
      <div class="lockTopay">
        <van-popup v-model="toPayPop">
          <div class="fail">
            <p>
              <img
                src="../../../static/img/fail.png"
                alt=""
                class="failImg"
              />
            </p>
            <div class="unfinished">
              <p v-if="typeResult == 1">
                <span class="nopaytitle">您还未缴纳押金</span>
                <a
                  href="javascript:void(0)"
                  @click="toPayRouter(typeResult)"
                  class="payClickTitle"
                >
                  <van-cell
                    title="点击缴纳押金"
                    is-link
                  /></a>
              </p>
              <p v-if="typeResult == 2">
                <span class="nopaytitle">您有未缴纳的费用</span>
                <a
                  href="javascript:void(0)"
                  @click="toPayRouter(typeResult)"
                  class="payClickTitle"
                >
                  <van-cell
                    title="点击查看详情"
                    is-link
                  /></a>
              </p>
            </div>
          </div>
        </van-popup>
      </div>
      <div class="locking">
        <!-- 开锁中 -->
        <div
          class="lockLoading"
          v-show="lockLoading"
        >
          <div class="loadingBg"></div>
          <div class="live">
            <div class="liveimg">
              <img src="../../../static/img/lock.png" />
            </div>
            <span></span> <span></span> <span></span>
          </div>
          <!-- 开锁结果-->
          <div class="locked">
            <div
              class="success"
              v-if="typeResult == 0"
            >
              <img
                src="../../../static/img/success.png"
                slot="right"
              />
              <p>开锁成功</p>
            </div>

            <div
              class="failure"
              v-if="typeResult == -1"
            >
              <img
                src="../../../static/img/failure.png"
                slot="right"
              />
              <p>开锁失败!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import common from "common/js/common.js";
import { mapMutations } from "vuex";
import { handSerial, deposit, order, orderDetail } from "api/bed";
import wx from "weixin-js-sdk";
export default {
  components: {},
  data() {
    return {
      // 初始化数据
      stepsActive: 0,
      openLockIsShow: true,
      // -1 开锁失败 0 开锁成功 1 未缴纳押金 2未支付订单
      typeResult: "",
      toPayPop: false, // 解锁失败(未缴纳押金或者未支付订单)
      lockLoading: false // 解锁中
    };
  },
  computed: {},
  watch: {},
  methods: {
    // 信息管理
    manger() {
      this.setTrueManger(true);
    },
    wx() {
      console.log("微信扫描窗口");
    },
    handinput() {
      this.$router.push({
        name: "bedserial"
      });
    },
    _getData() {
      //根据key名获取传递回来的参数，data就是map
      common.$on(
        "handresult",
        function (data) {
          // 解锁成功
          if (data === 0) {
            this.lockLoading = true;
            this.typeResult = data;
            this.timer = setInterval(() => {
              clearInterval(this.timer);
              this.lockLoading = false;
              //  成功解锁跳转页面
              this.$router.push({
                name: "useding",
                params: {
                  // id: that.dataType
                }
              });
            }, 5000);
            return false;
          }
          // 解锁失败，原因是未缴纳押金或者有未支付订单
          if (data === 1 || data === 2) {
            this.toPayPop = true;
            this.typeResult = data;
          }
          //网络原因解锁失败
          if (data === -1) {
          }
        }.bind(this)
      );
      //接口对接
      // handSerial().then(res => {
      //     console.log(res);
      // });
      // deposit().then(res => {
      //     console.log(res);
      // });
      // order().then(res => {
      //     console.log(res);
      // });
      // orderDetail().then(res => {
      //     console.log(res);
      // });
    },
    toPayRouter(index) {
      this.openLockIsShow = false;
      this.toPayPop = false;
      this.setDepositType(index);
    },
    ...mapMutations({
      setDepositType: "SET_DEPOSIT_TYPE",
      setTrueManger: "SET_BEDMANAGER"
    })
  },
  created() {
    this._getData();
  },
  mounted() { },
  beforeCreate() { },
  beforeMount() { },
  beforeUpdate() { },
  updated() { },
  beforeDestroy() { },
  destroyed() { },
  activated() { }
};
</script>
<style scoped lang="stylus">
.van-steps {
  width: 72%;
  margin: 36px auto 0;
  background: #f5f3f4;
  height: 72px;

  .van-steps__items .van-steps__items--alone {
    height: 70px !important;
  }

  .van-step__title {
    position: relative;
    top: 50px;
  }

  .van-step--horizontal {
    line-height: 100px;
    height: 60px;
  }
}

.lockresult {
  // 开锁失败
  .lockTopay {
    .van-popup {
      text-align: center;
      width: 60%;
      height: 320px;
      font-size: 13px;

      .failImg {
        margin: 50px 0 0;
      }

      .unfinished {
        color: #999;
        font-size: 14px;
        display: block;
        height: 100px;

        p {
          span {
            display: block;
            line-height: 62px;
          }

          a {
            display: block;
            height: 45px;
            letter-spacing: 1px;
            position: absolute;
            z-index: 10000;
            width: 100%;
            margin: 0;
            bottom: 25px;
            left: 0;
            line-height: 30px;
          }
        }
      }
    }
  }

  .locking {
    // 开锁中
    .lockLoading {
      .loadingBg {
        position: fixed;
        width: 200px;
        height: 302px;
        top: 50%;
        left: 50%;
        z-index: 10;
        background: #f5f3f4;
        margin-left: -100px;
        margin-top: -151px;
      }

      .live {
        position: fixed;
        top: 50%;
        left: 50%;
        z-index: 12;
        width: 120px;
        height: 120px;
        margin-left: -60px;
        margin-top: -105px;
        z-index: 12;

        .liveimg {
          width: 120px;
          height: 120px;
          background: #b0e2d7;
          border-radius: 50%;
          position: relative;

          img {
            z-index: 0;
            position: absolute;
            top: 50%;
            left: 50%;
            margin-top: -30px;
            margin-left: -25px;
          }
        }

        @keyframes living {
          0% {
            transform: scale(1);
            opacity: 0.5;
          }

          50% {
            transform: scale(1.5);
            opacity: 0; /* 圆形放大的同时，透明度逐渐减小为0 */
          }

          100% {
            transform: scale(1);
            opacity: 0.5;
          }
        }

        span {
          position: absolute;
          width: 100px;
          height: 100px;
          left: 0;
          bottom: 0;
          border-radius: 50%;
          background: #b0e2d7;
          -webkit-animation: living 3s linear infinite;
          border: 10px solid #bce5dd;
          z-index: -1;
        }

        span:nth-child(2) {
          -webkit-animation-delay: 1s; /* 第二个span动画延迟1.5秒 */
        }

        span:nth-child(3) {
          -webkit-animation-delay: 1.5s; /* 第三个span动画延迟1.5秒 */
        }
      }
    }

    // 开锁成功
    .locked {
      position: fixed;
      width: 200px;
      height: 302px;
      top: 50%;
      left: 50%;
      z-index: 10;
      background: #f5f3f4;
      margin-left: -100px;
      margin-top: -151px;

      div {
        position: fixed;
        top: 50%;
        left: 50%;
        width: 105px;
        height: 105px;
        margin-left: -52px;
        margin-top: -105px;
        z-index: 12;
        text-align: center;
      }

      .success {
        p {
          margin: 40px 0 0px;
          color: #4fd6bc;
        }
      }

      .failure {
        p {
          margin: 40px 0 0px;
          color: orange;
        }
      }

      h4 {
        font-size: 24px;
        font-weight: 400;
        margin: 0;
      }
    }
  }
}
</style>
