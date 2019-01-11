<template>
  <div class="OrderDetail">
    <scroll
      ref="scroll"
      class="OrderDetail-content"
    >
      <div>
        <div class="cellCon">
          <div class="gray"></div>
          <van-cell
            title="订单号"
            :value="orderDetail.chaperonage_bed_code"
          >
          </van-cell>
          <div class="detail">
            <van-cell-group>
              <van-cell
                title="医院"
                :value="orderDetail.hospitalName"
              >
              </van-cell>
              <van-cell
                title="科室"
                :value="orderDetail.departmentName"
              >
              </van-cell>
              <van-cell
                title="病房号"
                :value="orderDetail.hospitalName"
              >
              </van-cell>
              <van-cell
                title="陪护床编号"
                :value="orderDetail.room_id"
              >
              </van-cell>
              <van-cell
                title="时长"
                :value="orderDetail.serviceTime"
              >
              </van-cell>
              <van-cell
                title="开始时间"
                :value="orderDetail.startTime"
              >
              </van-cell>
              <van-cell
                title="结束时间"
                :value="orderDetail.endTime"
              >
              </van-cell>
              <van-cell
                title="费用"
                :value="orderDetail.cost"
              >
              </van-cell>
              <van-cell
                title="结束方式"
                :value="orderDetail.hospitalName"
              >
              </van-cell>
              <van-cell
                v-if="orderDetail.payState == 0"
                value="已完成"
                title="状态"
                value-class="itemFinished"
              >
              </van-cell>
              <van-cell
                v-if="orderDetail.payState == 1"
                value="未完成"
                title="状态"
                value-class="itemWaitPay"
              >
              </van-cell>
              <van-cell
                v-if="orderDetail.payState == 2"
                value="待审核"
                title="状态"
                value-class="itemAudit"
              >
              </van-cell>
            </van-cell-group>
          </div>
        </div>
      </div>
      <div
        class="loading-container"
        v-show="!len.length"
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
import { orderDetail } from "api/bed";

export default {
  props: {

  },
  data() {
    return {
      orderDetail: {},
      len: [],
    }
  },

  methods: {
    loadImgae() {
      if (!this.checkLoaded) {
        this.$refs.scroll.refresh()
        this.checkLoaded = true
      }
    },
    _getData() {
      orderDetail(this.order.order_id).then(res => {
        this.orderDetail = res
        var arr = []
        for (let i in res) {
          let resData = {};
          resData[i] = res[i];
          arr.push(resData)
        }
        this.len = arr
      });
    }
  },
  computed: {
    ...mapGetters(["order"])
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

.OrderDetail {
  position: fixed;
  width: 100%;
  top: 45px;
  bottom: 0;

  .OrderDetail-content {
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
