<!--  -->
<template>
  <transition name="date">
    <div class="year">
      <van-cell
        title="2018年"
        is-link
      />
      <van-cell
        title="2017年"
        is-link
      />
      <van-cell
        title="2016年"
        is-link
      />
    </div>
  </transition>

</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { mapMutations } from "vuex";
import { ERR_OK } from 'api/config'
import {
  bedStatistical
} from "api/nurse";
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    // 这里存放数据
    return {

    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
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
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
this._getData()
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
</style>
