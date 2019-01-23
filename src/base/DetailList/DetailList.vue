<template>
  <div>
    <div
      class="OrderDetail"
      ref="OrderDetail"
    >
      <scroll
        ref="scroll"
        class="OrderDetail-content"
        :data="orderDetail"
      >
        <div>
          <div class="cellCon">
            <div class="gray"></div>
            <van-cell
              title="订单号"
              :value="orderDetail.order_id"
            >
            </van-cell>
            <div class="detail">
              <van-cell-group>
                <van-cell
                  title="医院"
                  :value="orderDetail.hospital_name"
                >
                </van-cell>
                <van-cell
                  title="科室"
                  :value="orderDetail.department_name"
                >
                </van-cell>
                <van-cell
                  title="病房号"
                  :value="orderDetail.room_number"
                >
                </van-cell>
                <van-cell
                  title="陪护床编号"
                  :value="orderDetail.chaperonage_bed_code"
                >
                </van-cell>
                <van-cell
                  title="时长"
                  :value="orderDetail.service_time"
                >
                </van-cell>
                <van-cell
                  title="开始时间"
                  :value="orderDetail.start_time"
                >
                </van-cell>
                <van-cell
                  title="结束时间"
                  :value="orderDetail.end_time"
                >
                </van-cell>
                <van-cell
                  title="费用"
                  :value="orderDetail.cost"
                >
                </van-cell>
                <van-cell
                  v-if="orderDetail.end_way == 0"
                  value="异常关锁"
                  title="结束方式"
                >
                </van-cell>
                <van-cell
                  v-if="orderDetail.end_way == 1"
                  value="正常关锁"
                  title="结束方式"
                >
                </van-cell>
                <van-cell
                  v-if="orderDetail.pay_state == 0"
                  value="已完成"
                  title="状态"
                  value-class="itemFinished"
                >
                </van-cell>
                <van-cell
                  v-if="orderDetail.pay_state == 1"
                  value="未支付"
                  title="状态"
                  value-class="itemWaitPay"
                >
                </van-cell>
                <van-cell
                  v-if="orderDetail.pay_state == 2"
                  value="待审核"
                  title="状态"
                  value-class="itemAudit"
                >
                </van-cell>
              </van-cell-group>
            </div>
          </div>
        </div>
      </scroll>
    </div>

    <div
      class="del"
      v-if="orderDetail.pay_state == 0"
    >
      <van-button
        type="default"
        class="delBtn"
        @click="delClose"
      >
        删除订单
      </van-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Loading from 'base/loading/loading'
import Scroll from 'base/scroll/scroll'
import { mapGetters } from "vuex";

export default {
  props: {
    orderDetail: {
      type: Object
    }
  },
  data() {
    return {
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
    delClose() {

    },
    _getData() {
      if (!this.order.order_id) {
        this.$router.push('/order')
        return
      }

    },
    selectFile() {
      ImagePreview([this.$refs.uploadImg.src]);
    },
  },
  computed: {
    ...mapGetters(["order"])
  },
  mounted() {
    // if (this.orderDetail.pay_state === true) {
    //   console.log("1111", this.$refs.OrderDetail.$el)
    // }
  },
  components: {
    Scroll,
    Loading,
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
  bottom: 0px;

  .OrderDetail-content {
    height: 100%;
    overflow: hidden;

    .finishDiv {
      height: 70px;
      width: 100%;
    }

    h4 {
      padding: 10px 15px;
      font-weight: 600;
      font-size: 14px;
      border-bottom: 1px solid #ebedf0;
    }

    .textarea {
      padding: 10px 15px;

      p {
        color: #999;
        padding-bottom: 20px;
      }

      .uploader {
        .uploadImg {
          width: 60px;
          height: 60px;
        }
      }
    }

    .loading-container {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}

.del {
  position: fixed;
  bottom: 20px;
  margin-left: 3%;
  width: 94%;
  margin-right: 3%;

  .delBtn {
    width: 100%;
    background: #f39357;
    color: #fff;
    font-size: 16px;
    height: 40px;
    line-height: 40px;
    float: left;
  }
}
</style>
