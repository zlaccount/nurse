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
        >
          <div class="gray"></div>
          <van-cell
            v-if="item.finishstate==0"
            value="已完成"
            value-class="itemFinished"
          >
            <template slot="title">
              <div class="custom-text">订单编号 : {{item.serialnumber}}</div>
            </template>
          </van-cell>
          <van-cell
            v-if="item.finishstate==1"
            value="未完成"
            value-class="itemWaitPay"
          >
            <template slot="title">
              <div class="custom-text">订单编号 : {{item.serialnumber}}</div>
            </template>
          </van-cell>
          <van-cell
            v-if="item.finishstate==2"
            value="待审核"
            value-class="itemAudit"
          >
            <template slot="title">
              <div class="custom-text">订单编号 : {{item.serialnumber}}</div>
            </template>
          </van-cell>
          <div class="detail">
            <van-cell>
              <template slot="title">
                <div class="custom-text">医院 : {{item.hospitalname}}</div>
                <div class="custom-text">科室 : {{item.subname}}</div>
                <div class="custom-text">开始时间 : {{item.begintime}}</div>
                <div class="custom-text">结束时间 : {{item.endtime}}</div>
                <div class="custom-text">时长 : {{item.timelong}}</div>
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
        <loading></loading>
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
    return {}
  },
  created() {
    /* setTimeout(() => {
    }, 2000) */
  },
  methods: {

    loadImgae() {
      if (!this.checkLoaded) {
        this.$refs.scroll.refresh()
        this.checkLoaded = true
      }
    }
  },
  components: {
    Scroll,
    Loading
  }
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

    .loading-container {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
