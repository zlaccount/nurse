<template>
  <transition name="date">
    <div class="month">
      <month-picker
        v-if="showMonthPicker"
        @select="selectOrder"
        :data="monthData"
      ></month-picker>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import { ERR_OK } from 'api/config'
import MonthPicker from 'base/monthPicker/monthPicker'
import common from 'common/js/common.js'
import { mapMutations } from 'vuex'
import {
  bedStatistical
} from "api/nurse";

export default {
  data() {
    return {
      showMonthPicker: true,
      objData: [{ 'year': '2019', 'month': ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'] },{ 'year': '2018', 'month': ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'] }, { 'year': '2017', 'month': ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'] }, { 'year': '2016', 'month': ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'] }],
      monthData: [],
    }
  },
  created() {
    this._getData()
  },
  methods: {
    selectOrder(group, item) {
      common.$emit('selectedTime', group.time + "-" + item.time);
      this.$router.go(-1);
      this.showMonthPicker = false
    },

    _getData() {
      this._bedStatistical()
    },
    _bedStatistical(time) {
      // 某年、月、日统计接口
      bedStatistical(time).then(res => {
        console.log(res)
        this.monthData = this.objData
        // this.monthData = res
      });
    },

    ...mapMutations({
      setDateTime: "SET_DATE_TIME",
    })
  },
  components: {
    MonthPicker
  }
}
</script>

<style scoped lang="stylus">
.month {
  position: fixed;
  top: 90px;
  bottom: 0;
  width: 100%;
}
</style>
