<template>
  <transition name="date">
    <div class="month">
      <month-picker
        @select="selectOrder"
        :data="monthData"
      ></month-picker>
      <router-view></router-view>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import { ERR_OK } from 'api/config'
import MonthPicker from 'base/monthPicker/monthPicker'
import { mapMutations } from 'vuex'
import {
  bedStatistical
} from "api/nurse";

export default {
  data() {
    return {
      monthData: [],
    }
  },
  created() {
    this._getData()
  },
  methods: {
    selectOrder(singer) {
      console.log(11111)
      // this.$router.push({
      //   path: `/singer/${singer.id}`
      // })
    },

    _getData() {
      this._bedStatistical()
    },
    _bedStatistical(time) {
      // 某年、月、日统计接口
      bedStatistical(time).then(res => {
        console.log(res)
        this.monthData = res
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
