<!---->
<template>
  <div class="orderCon">
    <van-radio-group>
      <van-cell-group>
        <div v-for="(item, index) in res" :key="index">
          <van-cell>
            <template slot="title">
              <span class="custom-text">订单号:</span>
              {{ item.nopayordernumber }}
            </template>
          </van-cell>
          <div class="nopaycontent">
            <van-cell
              title="医院"
              :value="item.nopayhospital"
            />
            <van-cell
              title="科室"
              :value="item.nopaydepartment"
            />
            <van-cell
              title="病房号"
              :value="item.nopayward"
            />
            <van-cell
              title="时长"
              :value="item.nopaytimeLenth"
            />
            <van-cell
              title="开始时间"
              :value="item.nopaytimeBegin"
            />
            <van-cell
              title="结束时间"
              :value="item.nopaytimeEnd"
            />
            <van-cell
              title="费用"
              :value="item.nopaycost"
            />
            <van-cell
              title="结束方式"
              :value="item.nopayendWay"
            />
            <van-cell
              title="结束方式"
              :value="item.nopayorderStatus"
            />
          </div>
        </div>
      </van-cell-group>
    </van-radio-group>
    <!-- 付款 -->
    <payed_comp></payed_comp>
  </div>
</template>

<script>
// 付款
import payed_comp from 'components/bed/payed';

export default {
  // import引入的组件需要注入到对象中才能使用
  components: {
    payed_comp
  },
  // 接受父组件的值
  props: {},
  data() {
    // 这里存放数据
    return {
      // 开关
      // 初始化数据
      res: [
        {
          nopayordernumber: '123xxxxxx1',
          nopayhospital: '湖北妇幼保健院',
          nopaydepartment: '急诊科',
          nopayward: '201病房',
          nopaytimeLenth: '5小时18分0秒',
          nopaytimeBegin: '2018-05-10 17:18:00',
          nopaytimeEnd: '2018-05-10 17:18:00',
          nopaycost: '22元',
          nopayendWay: '正常关锁',
          nopayorderStatus: '0'
        }
      ]
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {

  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() { },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() { },
  beforeCreate() { }, // 生命周期 - 创建之前
  beforeMount() { }, // 生命周期 - 挂载之前
  beforeUpdate() { }, // 生命周期 - 更新之前
  updated() { }, // 生命周期 - 更新之后
  beforeDestroy() { }, // 生命周期 - 销毁之前
  destroyed() { }, // 生命周期 - 销毁完成
  activated() { } // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style scoped lang="stylus">
//@import url(); 引入公共css类
.orderCon {
  width: 100%;
  text-align: center;
  font-size: 16px;
  z-index: 100;
  .orderTitle {
    margin-top: 10px;
  }
  .van-cell-group {
    .van-cell {
      text-align: left;
    }
    .nopaycontent {
      .van-cell {
        text-align: left;
        color: #999;
      }
    }
  }
}
</style>
