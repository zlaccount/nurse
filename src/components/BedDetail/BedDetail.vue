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
      <div class="gray"></div>
      <div
        v-for="(i,index) in state"
        :key="index"
      >
        <van-cell
          v-if="res.lockState == index"
          :value="i.s"
          :value-class="res.lockState==1?'itemFinished':res.lockState==2?'':itemWaitPay"
        >
          <template slot="title">
            <div class="custom-text">
              匹配编号: {{ res.bedCode }}
            </div>
          </template>
        </van-cell>
      </div>
      <div class="cellCon">
        <van-cell
          title="陪护床编号"
          :value="res.bedCode"
        >
        </van-cell>
        <van-cell
          title="病房号"
          :value="res.bedNumber"
        >
        </van-cell>
        <van-cell
          title="开始时间"
          :value="res.startTime"
        >
        </van-cell>
        <van-cell
          title="使用时间"
          :value="serviceTime"
        >
        </van-cell>
        <van-cell
          :value="res.bedEnergy+'%'"
          title="当前电量"
        >
        </van-cell>
        <van-cell
          :value="res.bedFlow+'MB'"
          title="当前流量"
        >
        </van-cell>
      </div>

      <div class="jiebangd">
        <van-button
          size="normal"
          @click="jiebang"
        >解绑</van-button>
      </div>
      <!-- 余额支付弹框 -->
      <div class="certainPop">
        <van-dialog
          v-model="certainPop"
          :closeOnClickOverlay=true
          :showCancelButton=true
          confirm-button-text="确定"
          :before-close="payBeforeClose"
        >
          <div class="confirmCon">
            <div class="middleImg">
              <img
                src="../../../static/img/jiebang.png"
                class="more"
                @click="wx()"
              />
            </div>
            <p>是否解除绑定</p>
          </div>
        </van-dialog>
      </div>
    </div>
  </transition>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { ERR_OK } from "api/config";
import { mapGetters, mapMutations } from "vuex";
import { monitoring, bedOperation } from "api/nurse";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      res: {},
      state: [{ s: "未知异常" }, { s: "正在使用" }, { s: "关闭" }, { s: "未启用" }, { s: "电量不足" }, { s: "流量不足" }, { s: "非法开启" }, { s: "电源关闭" }, { s: "维修中" }],
      certainPop: false, // 是否开启余额支付
      timelong: {},
      currentPage: "1",
      pageSize: "10",
      bedEnergyState: '',
      bedEnergy: '',
      bedFlow: '',
      serviceTime: '',
    };
  },
  //监听属性 类似于data概念
  computed: {
    ...mapGetters(["resultType"])
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
    sec_to_time(s) {
      var t;
      if (s > -1) {
        var hour = Math.floor(s / 3600);
        var min = Math.floor(s / 60) % 60;
        var sec = s % 60;
        if (hour < 10) {
          t = '0' + hour + ":";
        } else {
          t = hour + ":";
        }

        if (min < 10) { t += "0"; }
        t += min + ":";
        if (sec < 10) { t += "0"; }
        t += sec
      }
      return t;
    },
    _monitoring() {
      var lockState = this.$route.query.lockState;
      var bedCode = this.$route.query.id;
      monitoring(this.currentPage, this.pageSize, lockState, this.bedEnergyState, this.bedEnergy, this.bedFlow, this.serviceTime, bedCode).then(res => {
        this.serviceTime = this.sec_to_time(res.list[0].serviceTime)
        // var arr = []
        // for (let i in res) {
        //   arr.push(res[i]); //属性
        // }
        this.res = res.list[0]
        // console.log(sec_to_time(res.serviceTime))
      }
      );
    },
    jiebang() {
      this.certainPop = true
    },
    payBeforeClose(action, done) {
      if (action === 'confirm') {
        setTimeout(done, 1000);
        this.certainDone()
      } else {
        this.$toast("已取消")
        done()
      }
    },
    certainDone() {
      var way = 1
      var bedAddress = ''
      bedOperation(this.res.id, this.res.bedCode, way, this.res.bedNumber, bedAddress).then(res => {
        if (res === 5) {
          this.$toast('该陪护床正在使用，无法解绑');
          return false
        }
        this.setResult({
          state: true,
          type: res
        })
      })
    },
    ...mapMutations({
      setResult: "SET_RESULT_TYPE",
    })
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this._getData();

  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
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

  .custom-text {
    color: #999;
  }

  .certainPop {
    .van-dialog {
      border-radius: 5px;

      .confirmCon {
        width: 90%;
        margin: 0 auto;
        font-size: 12px;
        text-align: left;

        .middleImg {
          width: 72px;
          margin: 20px auto 0;

          img {
            width: 72px;
          }
        }

        p {
          text-align: center;
          font-size: 16px;
          margin: 0;
          padding-bottom: 10px;
          line-height: 40px;
          color: #999;
        }
      }
    }
  }

  .cellCon {
    .van-cell {
      color: #999;
    }
  }

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
