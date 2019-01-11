<!--  -->
<template>
    <div class='datewrapper'>
      <div @click="openDatePicker"
           class="dateCon">{{selectedDate}}</div>
      <date-picker v-if="showDatePicker"
                   :date="date"
                   :min-date="minDate"
                   :max-date="maxDate"
                   @confirm="confirm"
                   @cancel="cancel"></date-picker>
    </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import DatePicker from 'base/DatePicker/DatePicker'

export default {
  // import引入的组件需要注入到对象中才能使用
  components: { DatePicker },
  data() {
    // 这里存放数据
    return {
      date: '2018-12-27',
      minDate: '2000-09-11',
      maxDate: '2020-09-11',
      showDatePicker: true,
      selectedDate: ''
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    _getDate() {
      let nowDate = this.getFormatDate()
      let now = nowDate.trim().split(' ')
      this.date = now[0]
      this.nowTime = now[1]
      console.log(this.date)
      console.log(this.nowTime)
    },
    openDatePicker() {
      this.showDatePicker = true
    },
    confirm(value) {
      this.showDatePicker = false
      this.selectedDate = value
    },
    cancel() {
      this.showDatePicker = false
    },
    getFormatDate() {
      var date = new Date()
      var month = date.getMonth() + 1
      var strDate = date.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      var currentDate = date.getFullYear() + '-' + month + '-' + strDate +
        ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
      return currentDate
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this._getDate()
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {

  },
  beforeCreate() { }, // 生命周期 - 创建之前
  beforeMount() { }, // 生命周期 - 挂载之前
  beforeUpdate() { }, // 生命周期 - 更新之前
  updated() { }, // 生命周期 - 更新之后
  beforeDestroy() { }, // 生命周期 - 销毁之前
  destroyed() { }, // 生命周期 - 销毁完成
  activated() { } // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style scoped lang='stylus'>
.datewrapper {
  position: fixed;
  left: 0;
  right: 0;
  top: 91px;
  bottom: 0;
  z-index: 151;
  background: #fff;
}
</style>
