<template>
  <transition name="slide">
    <div class="routerViewPage">
      <div class="keyBoradImport ">
        <van-nav-bar
          fixed
          title="输入编号"
          left-arrow
          @click-left="onClickLeft"
        >
        </van-nav-bar>
        <div class="topblank"></div>
        <!-- 数字框 -->
        <div class="inputNumber">
          <van-row>
            <van-col
              span="4"
              v-for="(item, index) in keyLis"
              :key="index"
            >
              <div class="textNumber"></div>
            </van-col>
          </van-row>
          <van-row>
            <van-col
              span="4"
              v-for="(item, index) in curVal"
              :key="index"
            >
              <div class="textNumber">{{ item }}</div>
            </van-col>
          </van-row>
        </div>
        <!-- 数字键盘 -->
        <van-number-keyboard
          :show="showKeyboard"
          @input="onInput"
          @delete="onDelete"
        />
      </div>
      <div class="roomView">
        <router-view></router-view>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import common from 'common/js/common.js'
import { bedOperation } from "api/nurse";
import Vue from 'vue'
import { Toast } from 'vant';

Vue.use(Toast);
export default {
  components: {},
  props: {},
  data() {
    return {
      // 开关
      showKeyboard: true, // 是否开启数字键盘
      // 初始化数据
      keyValue: '',
      curVal: [],
      keyLis: [1, 2, 3, 4, 5, 6],
    }
  },
  watch: {
    keyValue(curVal, oldVal) {
      let that = this
      that.curVal = curVal
      // 清空键盘值
      if (that.curVal.length === that.keyLis.length) {
        var id = ''
        var val = that.curVal * 1
        var way = 0
        var floor = ''
        var room = ''
        // 判断是否已绑定
        bedOperation(id, val, way, floor, room).then(res => {
          if (res === 3) {
            Toast('编号已绑定，请勿重新绑定');
            return false
          }
          setTimeout(() => {

            this.$router.push({
              name: 'bindingroom',
              params: {
                id: val
              }
            })
            setTimeout(() => {
              // 清空
              that.keyValue = []
            }, 1000)
          }, 1000)
        })

      }
    }
  },
  computed: {},
  methods: {
    onClickLeft() {
      this.$router.push({
        path: `/operation`
      })
    },
    onInput(key) {
      this.keyValue = (this.keyValue + key).slice(0, 6)
    },
    onDelete() {
      this.keyValue = this.keyValue.slice(0, this.keyValue.length - 1)
    }
  },
  created() { },
  mounted() { }
}
</script>

<style scoped lang="stylus">
// 数字键盘
.keyBoradImport {
  .light {
    height: 20px;
    width: 15px;
    position: relative;
    top: 5px;
  }

  .inputNumber {
    .van-row {
      position: fixed;
      width: 90%;
      top: 50%;
      left: 0;
      right: 0;
      margin-left: auto;
      margin-right: auto;
      margin-top: -30%;

      .van-col {
        padding: 0px 9px;

        .textNumber {
          background: #f5f3f4;
          border: 1px solid #ccc;
          height: 62px;
          line-height: 62px;
          text-align: center;
        }
      }
    }
  }
}
</style>
