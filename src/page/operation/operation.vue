<template>
  <div class="operation">
    <van-nav-bar
      fixed
      title="绑定陪护床"
    > </van-nav-bar>
    <div class="topblank"></div>
    <yd-step
      :current="stepsActive"
      current-color="#4fd6bc"
    >
      <yd-step-item>
        <span slot="bottom">扫码</span>
      </yd-step-item>
      <yd-step-item>
        <span slot="bottom">绑定</span>
      </yd-step-item>
    </yd-step>
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
  </div>
</template>

<script>
import { ERR_OK } from "api/config";
import wx from "weixin-js-sdk";
import { RichScan, bedOperation } from "api/nurse";
export default {
  components: {},
  data() {
    return {
      // 初始化数据
      stepsActive: 1,
      serialIsShow: false, // 是否编号开锁
      openLockIsShow: true,
      dataType: 1
    };
  },
  computed: {},
  watch: {},
  methods: {
    // 输入密码开锁
    showIndexChild(val) { },
    _getData() { },
    wx() {
      const vm = this;
      if (localStorage.getItem("nurseId") != null) {
        var url = location.href.split("#")[0];
        // 扫一扫
        RichScan(url).then(res => {
          let sign = res; //后端返回的微信的数据
          wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: sign.appId, // 必填，公众号的唯一标识
            timestamp: sign.timestamp, // 必填，生成签名的时间戳
            nonceStr: sign.nonce_str, // 必填，生成签名的随机串
            signature: sign.signature, // 必填，签名，见附录1
            jsApiList: ["scanQRCode", "openLocation", "getLocation"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          });
          wx.ready(function () {
            wx.scanQRCode({
              needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果
              scanType: ["qrCode"],
              success: function (res) {
                var id = ''
                var result = res.resultStr;
                var way = 0
                var floor = ''
                var room = ''
                bedOperation(id, result, way, floor, room).then(res => {
                  if (res === 3) {
                    Toast('编号已绑定，请勿重新绑定');
                    return false
                  }
                  setTimeout(() => {
                    vm.$router.push({
                      name: 'bindingroom',
                      params: {
                        id: result
                      }
                    })
                  }, 1000)
                })
              }
            });
          });
        });
      } else {
        this.$toast("您还未登录");
      }
    },
    handinput() {
      var nurseId = localStorage.getItem("nurseId");
      if (nurseId != null) {
        this.$router.push({
          path: `/operation/serial`
        });
      } else {
        this.$toast("您还未登录");
      }
    },
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
.yd-step {
  padding-top: 30px;
}
</style>
