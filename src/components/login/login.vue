<!---->
<template>
  <transition name="slide">
    <div class="routerViewPage">
      <van-nav-bar
        fixed
        title="登录"
        left-arrow
        @click-left="loginBack"
      >
      </van-nav-bar>
      <div class="topblank"></div>
      <div class="loginImport">
        <div class="loginBg">
          <img
            src="../../../static/img/background-login.png"
            slot="right"
          />
        </div>
        <div class="loginCon">
          <van-cell-group>
            <van-field
              v-model="phone"
              required
              clearable
              icon="contact"
              label="账号"
              placeholder="请输入账号"
              @click-icon="$toast('question')"
            />
            <van-field
              v-model="sms"
              required
              center
              clearable
              icon="closed-eye"
              label="密码"
              placeholder="请输入密码"
            >
            </van-field>
          </van-cell-group>
          <div class="confirmLogin">
            <van-button
              size="normal"
              @click="login"
            >登录</van-button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { mapGetters, mapMutations } from "vuex";
import { getcode, checkcode } from "api/islogin";
import { ERR_OK } from "api/config";
import common from "common/js/common.js";

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      // 初始化数据
      persons: [],
      phone: "",
      sms: "",
      content: "发送验证码",
      totalTime: 60,
      canClick: true //添加canClick
    };
  },

  //监听属性 类似于data概念
  computed: {
    ...mapGetters(["islogin"])
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    loginBack() {
      // this.setIsLoin({
      //     state: false
      // });
      this.$router.back();
    },
    login() {
      let phone = this.phone;
      let sms = this.sms;
      // 校验验证码登录
      if (phone != "" && sms != "") {
        checkcode(phone, sms).then(res => {
          if (res.roleId === "陪护床科室管理员") {
            common.$emit('msg', res);
            this.$router.go(-1);
            localStorage.setItem("hospitalId", res.hospitalId);
            localStorage.setItem("nurseId", res.userId);
            localStorage.setItem(
              "subName",
              res.departmentName
            );
          } else {
            this.$toast("账户或者密码有误");
          }
          this.phone = "";
          this.sms = "";
        });
      } else {
        this.$toast("手机号码或验证码有误，请重填");
        return false;
      }
    },
    ...mapMutations({
      setIsLoin: "SET_ISLOGIN",
      setMsg: "SET_MSG"
    })
  },

  //生命周期 - 创建完成（可以访问当前this实例）
  created() { },
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
<style lang="stylus" scoped>
// @import url(); 引入公共css类
.loginImport {
  .loginBg {
    img {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
  }

  .loginCon {
    z-index: 1000;
    width: 80%;
    position: relative;
    margin: 150px auto;
    flex-direction: row;
    align-items: center;

    .van-cell {
      border-bottom: 1px solid #eee;
      background-color: transparent;
    }

    .confirmLogin {
      margin-top: 20px;

      .van-button {
        width: 100%;
        background-color: #4fd6bc;
        color: white;
        font-size: 16px;
      }
    }

    .van-cell-group {
      background-color: transparent;

      .van-button {
        width: 100%;
        padding: 0 4px !important;
        color: white;
      }

      .disabled {
        background-color: #ddd;
        border-color: #ddd;
        color: #000;
        cursor: not-allowed; // 鼠标变化
      }
    }
  }
}
</style>
