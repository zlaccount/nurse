<template>
  <div class="operation">
    <van-nav-bar
      fixed
      title="绑定陪护床"
    > </van-nav-bar>
    <van-steps
      :active="stepsActive"
      active-color="#4FD6BC"
    >
      <van-step>扫码 </van-step>
      <van-step>绑定</van-step>
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
              <p>扫码开锁</p>
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
              <p>输入编码开锁</p>
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
export default {
  components: {},
  data() {
    return {
      // 初始化数据
      stepsActive: 0,
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
    _getData() {
     
    },
    wx() {
      console.log('微信扫描窗口')
    },
    handinput() {
      this.$router.push({
        path: `/operation/serial`
      })
    }
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
  width: 40%;
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
</style>
