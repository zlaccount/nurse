<template>
  <transition name="slide">
    <div class="routerViewPage">
      <van-nav-bar
        fixed
        v-if="type == 1"
        title="租床统计"
        left-arrow
        @click-left="onClickLeft"
      >
      </van-nav-bar>
      <van-nav-bar
        fixed
        v-if="type == 2"
        title="费用统计"
        left-arrow
        @click-left="onClickLeft"
      >
      </van-nav-bar>
      <div class="topblank"></div>
      <div class="statisticalresults">
        <van-button
          size="large"
          @click="selectDate"
        >{{name}}<span class="title">{{ selectTime }}</span><i> </i>
        </van-button>
        <van-cell-group>
          <van-cell title="总计(管辖区内两张陪护床)" />
          <div
            class="con"
            v-if="type == 1"
          >
            <p>总使用次数：{{ amount }}次</p>
            <p>总使用时间：{{ second }}</p>
          </div>
          <div
            class="con"
            v-if="type == 2"
          >
            <p>总收入：{{ money }}元</p>
          </div>
          <div class="white"></div>
        </van-cell-group>
      </div>
      <div class="date">
        <router-view></router-view>
      </div>
    </div>
  </transition>
</template>

<script>
import { getFormatDate } from "common/js/dom";
import { ERR_OK } from "src/api/config";
import {
  bedOperation,
  bedYear,
  bedMonth,
  bedDay,
  bedSelectTime,
  bedStatistical
} from "api/nurse";
import { mapGetters } from "vuex";
import common from "common/js/common.js";

export default {
  components: {},
  data() {
    return {
      type: "",
      amount: "",
      second: "",
      money: "",
      selectTime: "",
      backDate: "",
      name:'日统计'
    };
  },

  computed: {
    ...mapGetters(["dateTime"])
  },
  watch: {},
  methods: {
    _getData() {
      let nowDate = getFormatDate();
      let now = nowDate.trim().split(" ");
      common.$on(
        "selectedTime",
        function (data) {
          this.selectTime = data[1];
          this.name=data[0]
          this._bedSelectTime(this.selectTime);
          return false
        }.bind(this)
      );
      this.selectTime = now[0];
      this._bedSelectTime(this.selectTime);
    },
    _bedSelectTime(time) {
      // 某年、月、日统计接口
      bedSelectTime(time).then(res => {
        if (res.state * 1 === ERR_OK) {
          this.amount = res.data.orderNum;
          this.second = res.data.totalTime;
          this.money = res.data.cost;
        } else {
          this.amount = 0;
          this.second = 0;
          this.money = 0;
        }
      });
    },
    onClickLeft() {
      this.$router.push({
        name: "nurse"
      });
    },
    selectDate() {
      this.$router.push({
        name: "selectDate",
        params: {
          id: 1
        }
      });
    }
  },
  created() {
    this._getData();
    this.type = this.$route.params.id;
  },
  mounted() { },
  beforeCreate() { },
  beforeMount() { },
  beforeUpdate() { },
  updated() { },
  beforeDestroy() { },
  destroyed() { },
  activated() { }
};
</script>
<style scoped lang="stylus">
.statisticalresults {
  .van-button {
    height: 42px;
    line-height: 42px;
    margin-bottom: 10px;

    span {
      margin-right: 5px;
      margin-left: 5px;
    }

    i {
      display: inline-block;
      width: 0;
      height: 0;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 10px solid #b4b4b4;
      position: relative;
    }
  }

  .van-cell-group {
    letter-spacing: 1px;

    .van-cell {
      font-size: 12px;
    }

    .con {
      padding: 10px 15px;
      background: #f5f3f4;
      font-size: 12px;
      line-height: 20px;
    }
  }
}
</style>
