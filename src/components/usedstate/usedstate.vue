<template>
  <div class="recommend">
    <scroll
      ref="scroll"
      class="recommend-content"
      :data="allOrder"
    >
      <div>
        <div
          class="cellCon"
          v-for="(item, index) in allOrder"
          :key="index"
          @click="selectItem(item)"
        >
          <div class="gray"></div>
          <div
            v-for="(i,index) in state"
            :key="index"
          >
            <van-cell
              v-if="item.lockState == index"
              :value="i.s"
              :value-class="item.lockState==1?'itemFinished':item.lockState==2?'':itemWaitPay"
            >
              <template slot="title">
                <div class="custom-text">
                  订单编号: {{ item.bedCode }}
                </div>
              </template>
            </van-cell>
          </div>

          <div class="detail">
            <van-cell>
              <template slot="title">
                <div class="custom-text">
                  陪护床编号 : {{ item.bedCode }}
                </div>
                <div class="custom-text">
                  病床号 : {{ item.bedNumber }}
                </div>
                <div class="custom-text">
                  开始时间 : {{ item.startTime }}
                </div>
                <div class="custom-text">
                  时长 : {{ item.serviceTime }}
                </div>
                <div class="custom-text">
                  电量 : {{ item.bedEnergy }}
                </div>
                <div class="custom-text">
                  流量 : {{ item.bedFlow }}
                </div>
                <div class="link">
                  <van-icon name="arrow" />
                </div>
              </template>
            </van-cell>
            <div class="white"></div>
          </div>
              
        </div>
      </div>
      <div
        class="loading-container"
        v-show="!allOrder.length"
      >
        <div class="noData">暂无数据</div>
        <!-- <loading></loading> -->
      </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
import Loading from 'base/loading/loading'
import Scroll from 'base/scroll/scroll'
import { ERR_OK } from 'api/config'
export default {
  props: {
    allOrder: {
      type: Array,
    }
  },
  data() {
    return {
      state: [{ s: "未知异常" }, { s: "正在使用" }, { s: "关闭" }, { s: "未启用" }, { s: "电量不足" }, { s: "流量不足" }, { s: "非法开启" }, { s: "电源关闭" }, { s: "维修中" }]
    }
  },
  created() {
    /* setTimeout(() => {
    }, 2000) */
  },
  methods: {
    selectItem(item) {
      this.$emit('select', item)
    },
    loadImgae() {
      if (!this.checkLoaded) {
        this.$refs.scroll.refresh()
        this.checkLoaded = true
      }
    },
    _getData() {
    }
  },
  computed: {
  },
  components: {
    Scroll,
    Loading
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this._getData()
  },
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';

.recommend {
  position: fixed;
  width: 100%;
  top: 87px;
  bottom: 0;

  .recommend-content {
    height: 100%;
    overflow: hidden;

    .noData {
      text-align: center;
    }

    .loading-container {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
