<template>
  <transition name="slide">
    <div class="routerViewPage">
      <van-nav-bar
        fixed
        title="绑定病房号"
        left-arrow
        @click-left="onClickLeft"
      >
      </van-nav-bar>
      <div class="topblank"></div>
      <div class="room">
        <div class="roomTip">
          <p>陪护床编号 : {{ serialVal }}</p>
          <van-cell-group>
            <van-field
              v-model="floor"
              placeholder="请输入楼层"
            />
          </van-cell-group>
          <p><span>请输入要绑定的病房号</span></p>
        </div>
        <!-- 数字框 -->
        <div class="inputNumber">
          <div
            class="tip"
            ref="errortip"
          >
            该病房已陪护床已满，请重新选择
          </div>
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
      <div class="resultView">
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
      serialVal: '',
      floor: ''
    }
  },
  watch: {
    keyValue(curVal, oldVal) {
      let that = this
      that.curVal = curVal
      // 清空键盘值
      if (that.curVal.length === that.keyLis.length) {
        var val = that.curVal * 1
        var way = 0
        var id = ''
        bedOperation(id, this.serialVal, way, val, this.floor).then(res => {
          console.log(res)
          if (res === 2) {
            Toast('该陪护床已绑定，请重新选择');
            return false
          }
          this.$router.push({
            name: 'bindingresult',
            params: {
              id: res
            }
          })
        })

        // common.$emit('serialVal', this.dataType)
        // that.$emit('listenChildSerial', this.dataType)
        // 清空
        that.keyValue = []
      }
    }
  },
  computed: {

  },
  methods: {
    onClickLeft() {
      this.$router.back()
    },
    onInput(key) {
      this.keyValue = (this.keyValue + key).slice(0, 6)
    },
    onDelete() {
      this.keyValue = this.keyValue.slice(0, this.keyValue.length - 1)
    }
  },
  created() {
    this.serialVal = this.$route.params.id

  },
  mounted() { }
}
</script>

<style scoped lang="stylus">
@import '~common/stylus/variable';

.room {
  // background #fff
  .roomTip {
    margin: 20px;

    .van-cell-group {
      height: 35px;

      .van-field {
        padding: 5px 10px;
      }
    }

    p {
      line-height: 25px;
      font-size: 14px;

      span {
        font-size: 12px;
      }
    }
  }

  .light {
    height: 20px;
    width: 15px;
    position: relative;
    top: 5px;
  }

  .inputNumber {
    position: absolute;
    width: 90%;
    top: 50%;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    margin-top: -20%;

    .tip {
      display: none;
      color: red;
      top: 78px;
      position: relative;
      text-align: center;
    }

    .van-row {
      position: fixed;
      width: 90%;
      top: 50%;
      left: 0;
      right: 0;
      margin-left: auto;
      margin-right: auto;
      margin-top: -20%;

      .van-col {
        padding: 0px 9px;

        .textNumber {
          background: #f5f3f4;
          border: 1px solid #4fd6bc;
          height: 62px;
          line-height: 62px;
          text-align: center;
        }
      }
    }
  }
}
</style>
