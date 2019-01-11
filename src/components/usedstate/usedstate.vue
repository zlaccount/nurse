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
          <van-cell
            v-if="item.payState == 0"
            value="已完成"
            value-class="itemFinished"
          >
            <template slot="title">
              <div class="custom-text">
                订单编号 : {{ item.order_id }}
              </div>
            </template>
          </van-cell>
          <van-cell
            v-if="item.payState == 1"
            value="未完成"
            value-class="itemWaitPay"
          >
            <template slot="title">
              <div class="custom-text">
                订单编号 : {{ item.order_id }}
              </div>
            </template>
          </van-cell>
          <van-cell
            v-if="item.payState == 2"
            value="待审核"
            value-class="itemAudit"
          >
            <template slot="title">
              <div class="custom-text">
                订单编号 : {{ item.order_id }}
              </div>
            </template>
          </van-cell>
          <div class="detail">
            <van-cell>
              <template slot="title">
                <div class="custom-text">
                  医院 : {{ item.hospitalName }}
                </div>
                <div class="custom-text">
                  科室 : {{ item.departmentName }}
                </div>
                <div class="custom-text">
                  开始时间 : {{ item.startTime }}
                </div>
                <div class="custom-text">
                  结束时间 : {{ item.endTime }}
                </div>
                <div class="custom-text">
                  时长 : {{ item.serviceTime }}
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
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
import Loading from 'base/loading/loading'
import Scroll from 'base/scroll/scroll'
import { ERR_OK } from 'api/config'
import { mapGetters } from "vuex";
import { order, orderDetail } from "api/bed";

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
      console.log(this.orderState)
    }
  },
  computed: {
    ...mapGetters(["orderState"])
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

    .loading-container {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
