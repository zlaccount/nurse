<!---->
<template>
  <transition name="slide">
    <div class="routerViewPage">
      <div class="useding">
        <!-- <input id="mytime" type="text" name="" value="显示时间"> -->
        <!-- <button
        id="stop"
        name="button"
        @click="stop"
      >stop</button>
      <button
        id="start"
        name="button"
        @click="start"
      >start</button>
      <button
        id="reset"
        name="button"
        @click="reset"
      >reset</button> -->
        <van-nav-bar
          fixed
          title="共享陪护床"
          @click-right="bedmanager"
        >
          <img
            src="../../../static/img_icon/more.png"
            slot="right"
            class="mangerIcon"
          /></van-nav-bar>
        <div class="topblank orderTitle"></div>
        <div class="beginUse">
          <div class="flexItem useTimeTitle">
            <div class="flex-item">开锁时间</div>
            <div class="flex-item">使用时间</div>
          </div>
          <div class="flexItem dateText">
            <div class="flex-item">
              <div class="times">{{nowTime}}</div>
              <div class="date">{{yearMonthDate}}</div>
            </div>
            <div class="flex-item leftLine">
              <div
                class="times"
                id=mytime
              >{{str}}</div>
              <div class="date">{{yearMonthDate}}</div>
            </div>
          </div>
          <div class="beginBlank"></div>
          <div class="cell">
            <van-radio-group>
              <van-cell-group>
                <div
                  v-for="(item, index) in res"
                  :key="index"
                >
                  <div class="nopaycontent">
                    <van-cell
                      title="医院"
                      :value="item.nopayhospital"
                    />
                    <van-cell
                      title="科室"
                      :value="item.nopaydepartment"
                    />
                    <van-cell
                      title="病房号"
                      :value="item.nopayward"
                    />
                    <van-cell
                      title="陪护床编号"
                      :value="item.bedNumber"
                    />
                    <van-cell
                      title="管理员"
                      :value="item.manger"
                    />
                    <van-cell
                      title="联系方式"
                      :value="item.concat"
                    />
                    <van-cell
                      title="预计消费"
                      :value="item.ExpectedFee"
                    />
                  </div>
                </div>
              </van-cell-group>
            </van-radio-group>
          </div>
          <div class="question">
            <p>手动将陪护床推进床柜即可关锁</p>
            <van-button
              type="default"
              @click="close"
            >
              故障关闭
            </van-button>
          </div>
        </div>

      </div>
    </div>
  </transition>
</template>

<script>
import { mapMutations } from "vuex";
// 信息管理
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {
  },
  // 接受父组件的值
  props: {},
  data() {
    // 这里存放数据
    return {
      // 初始化数据
      yearMonthDate: '',
      nowTime: '',
      h: 0, // 定义时，分，秒，毫秒并初始化为0；
      m: 0,
      ms: 0,
      s: 0,
      time: 0,
      str: '',
      mytime: '',
      res: [
        {
          nopayordernumber: '123xxxxxx1',
          nopayhospital: '湖北妇幼保健院',
          nopaydepartment: '急诊科',
          nopayward: '201病房',
          bedNumber: '1000023456',
          manger: '王晓梅',
          concat: '13545401233',
          ExpectedFee: '6.00'
        }
      ]
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    // 信息管理
    bedmanager() {
      this.setTrueManger(true)
    },
    mangerBack() {
      this.mangerIsShow = false
    },
    _getDate() {
      let nowDate = this.getFormatDate()
      let now = nowDate.trim().split(' ')
      this.yearMonthDate = now[0]
      this.nowTime = now[1]
      console.log(this.yearMonthDate)
      console.log(this.nowTime)
    },
    getFormatDate() {
      var date = new Date()
      var month = date.getMonth() + 1
      var strDate = date.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      var currentDate = date.getFullYear() + '-' + month + '-' + strDate +
        ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
      return currentDate
    },
    timer() { // 定义计时函数
      this.ms = this.ms + 50 // 毫秒
      if (this.ms >= 1000) {
        this.ms = 0
        this.s = this.s + 1 // 秒
      }
      if (this.s >= 60) {
        this.s = 0
        this.m = this.m + 1 // 分钟
      }
      if (this.m >= 60) {
        this.m = 0
        this.h = this.h + 1 // 小时
      }
      this.str = this.toDub(this.h) + ':' + this.toDub(this.m) + ':' + this.toDub(this.s) + ''/* +this.toDubms(this.ms)+"毫秒" */
      // document.getElementById('mytime').innerHTML=h+"时"+m+"分"+s+"秒"+ms+"毫秒";
    },

    reset() { // 重置
      clearInterval(this.time)
      this.h = 0
      this.m = 0
      this.ms = 0
      this.s = 0
      this.str = '00:00:00'
    },

    start() { // 开始
      this.time = setInterval(this.timer, 50)
    },

    stop() { // 暂停
      clearInterval(this.time)
    },

    toDub(n) { // 补0操作
      if (n < 10) {
        return '0' + n
      } else {
        return '' + n
      }
    },

    toDubms(n) { // 给毫秒补0操作
      if (n < 10) {
        return '00' + n
      } else {
        return '0' + n
      }
    },
    // 故障反馈
    close() {
      clearInterval(this.time)
      this.mangerIsShow = true
    },
    ...mapMutations({
      setTrueManger: 'SET_BEDMANAGER',
    })

  },
  // 实例创建完成后调用，此阶段完成了数据的观测等，但尚未挂载，$el 还不可用。需要初始化处理一些数据时会比较有用
  created: function () {
    this._getDate()
  },
  // //生命周期 - 创建完成（可以访问当前this实例）
  // created() { },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.time = setInterval(this.timer, 50)
    let _this = this // 声明一个变量指向Vue实例this，保证作用域一致
    this.timer = setInterval(() => {
      _this.nowDate = new Date() // 修改数据date
    }, 1000)
  },
  beforeCreate() { }, // 生命周期 - 创建之前
  beforeMount() { }, // 生命周期 - 挂载之前
  beforeUpdate() { }, // 生命周期 - 更新之前
  updated() { }, // 生命周期 - 更新之后
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer) // 在Vue实例销毁前，清除我们的定时器
    }
  }, // 生命周期 - 销毁之前
  destroyed() { }, // 生命周期 - 销毁完成
  activated() { } // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style scoped lang="stylus">
// @import url(); 引入公共css类
.useding {
  position: relative;

  .beginUse {
    .flexItem {
      display: flex;
      align-items: center; /* 垂直居中 */
      justify-content: center; /* 水平居中 */
      width: 100%;
      height: 100%;
      text-align: center;

      .flex-item {
        flex: 1;
      }
    }

    .useTimeTitle {
      line-height: 36px;
      background: #fff;
      margin-top: 10px;
      font-size: 16px;
    }

    .dateText {
      .leftLine {
        border-left: 1px solid #ccc;
        margin: 10px 0;
      }

      .times {
        color: orange;
        font-size: 20px;
        line-height: 34px;
      }

      .date {
        font-size: 14px;
        color: #999;
      }
    }

    .beginBlank {
      height: 10px;
      background: #fff;
      margin-bottom: 10px;
    }

    .cell {
      .van-cell {
        color: #999;
      }
    }

    .van-popup {
      background: #f5f3f4;
    }
  }

  .question {
    width: 94%;
    position: fixed;
    bottom: 20px;
    left: 0px;
    right: 0px;
    margin-left: auto;
    margin-right: auto;

    p {
      color: #999;
      text-align: center;
      font-size: 12px;
    }

    .van-button {
      width: 100%;
      background: #f39357;
      color: #fff;
      font-size: 16px;
      height: 40px;
      line-height: 40px;
    }
  }
}
</style>
