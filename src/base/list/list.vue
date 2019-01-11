<template>
  <div class="recommend">
    <scroll
      ref="scroll"
      class="recommend-content"
      :data="itemAudit"
    >
      <div>
        <div
          class="cellCon"
          v-for="(item, index) in itemAudit"
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
        v-show="!itemAudit.length"
      >
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
import Loading from 'base/loading/loading'
import Scroll from 'base/scroll/scroll'
import { getRecommend, getDiscList } from 'api/recommend'
import { ERR_OK } from 'api/config'

export default {
  data() {
    return {
      expertList: [{
        serialnumber: '5xxxxxxxxxx1',
        finishstate: 0,
        hospitalname: '湖北省妇幼保健院',
        subname: '急救科',
        begintime: '2018-12-12 15:300',
        endtime: '2018-12-12 15:300',
        timelong: '40:01'
      },
      {
        serialnumber: '5xxxxxxxxxx2',
        finishstate: 1,
        hospitalname: '湖北省妇幼保健院',
        subname: '急救科',
        begintime: '2018-12-12 15:300',
        endtime: '2018-12-12 15:300',
        timelong: '40:02'
      }, {
        serialnumber: '5xxxxxxxxxx3',
        finishstate: 2,
        hospitalname: '湖北省中西结合医院',
        subname: '医学影像科',
        begintime: '2018-12-12 15:300',
        endtime: '2018-12-12 15:300',
        timelong: '40:03'
      },
      {
        serialnumber: '5xxxxxxxxxx4',
        finishstate: 0,
        hospitalname: '武汉市第九医院',
        subname: '急救科',
        begintime: '2018-12-12 15:300',
        endtime: '2018-12-12 15:300',
        timelong: '40:05'
      },
      {
        serialnumber: '5xxxxxxxxxx5',
        finishstate: 0,
        hospitalname: '湖北省妇幼保健院',
        subname: '急救科',
        begintime: '2018-12-12 15:300',
        endtime: '2018-12-12 15:300',
        timelong: '40:06'
      }, {
        serialnumber: '5xxxxxxxxxx6',
        finishstate: 0,
        hospitalname: '湖北省妇幼保健院',
        subname: '医学影像科',
        begintime: '2018-12-12 15:300',
        endtime: '2018-12-12 15:300',
        timelong: '40:07'
      }, {
        serialnumber: '5xxxxxxxxxx7',
        finishstate: 1,
        hospitalname: '湖北省妇幼保健院',
        subname: '急救科',
        begintime: '2018-12-12 15:300',
        endtime: '2018-12-12 15:300',
        timelong: '40:08'
      }, {
        serialnumber: '5xxxxxxxxxx8',
        finishstate: 2,
        hospitalname: '湖北省中西结合医院',
        subname: '医学影像科',
        begintime: '2018-12-12 15:300',
        endtime: '2018-12-12 15:300',
        timelong: '40:09'
      }, {
        serialnumber: '5xxxxxxxxxx9',
        finishstate: 1,
        hospitalname: '湖北省妇幼保健院',
        subname: '急救科',
        begintime: '2018-12-12 15:300',
        endtime: '2018-12-12 15:300',
        timelong: '40:10'
      }, {
        serialnumber: '5xxxxxxxxxx10',
        finishstate: 0,
        hospitalname: '武汉市第九医院',
        subname: '医学影像科',
        begintime: '2018-12-12 15:300',
        endtime: '2018-12-12 15:300',
        timelong: '40:11'
      },
      {
        serialnumber: '5xxxxxxxxxx11',
        finishstate: 0,
        hospitalname: '湖北省妇幼保健院',
        subname: '急救科',
        begintime: '2018-12-12 15:300',
        endtime: '2018-12-12 15:300',
        timelong: '40:01'
      }, {
        serialnumber: '5xxxxxxxxxx12',
        finishstate: 1,
        hospitalname: '湖北省妇幼保健院',
        subname: '急救科',
        begintime: '2018-12-12 15:300',
        endtime: '2018-12-12 15:300',
        timelong: '40:02'
      }, {
        serialnumber: '5xxxxxxxxxx13',
        finishstate: 2,
        hospitalname: '湖北省中西结合医院',
        subname: '医学影像科',
        begintime: '2018-12-12 15:300',
        endtime: '2018-12-12 15:300',
        timelong: '40:03'
      }, {
        serialnumber: '5xxxxxxxxxx14',
        finishstate: 1,
        hospitalname: '湖北省妇幼保健院',
        subname: '急救科',
        begintime: '2018-12-12 15:300',
        endtime: '2018-12-12 15:300',
        timelong: '40:04'
      }, {
        serialnumber: '5xxxxxxxxxx15',
        finishstate: 0,
        hospitalname: '湖北省妇幼保健院',
        subname: '急救科',
        begintime: '2018-12-12 15:300',
        endtime: '2018-12-12 15:300',
        timelong: '40:06'
      }, {
        serialnumber: '5xxxxxxxxxx16',
        finishstate: 0,
        hospitalname: '湖北省妇幼保健院',
        subname: '医学影像科',
        begintime: '2018-12-12 15:300',
        endtime: '2018-12-12 15:300',
        timelong: '40:07'
      }, {
        serialnumber: '5xxxxxxxxxx17',
        finishstate: 1,
        hospitalname: '湖北省妇幼保健院',
        subname: '急救科',
        begintime: '2018-12-12 15:300',
        endtime: '2018-12-12 15:300',
        timelong: '40:08'
      }, {
        serialnumber: '5xxxxxxxxxx18',
        finishstate: 2,
        hospitalname: '湖北省中西结合医院',
        subname: '医学影像科',
        begintime: '2018-12-12 15:300',
        endtime: '2018-12-12 15:300',
        timelong: '40:09'
      }, {
        serialnumber: '5xxxxxxxxxx19',
        finishstate: 1,
        hospitalname: '湖北省妇幼保健院',
        subname: '急救科',
        begintime: '2018-12-12 15:300',
        endtime: '2018-12-12 15:300',
        timelong: '40:10'
      }, {
        serialnumber: '5xxxxxxxxxx20',
        finishstate: 0,
        hospitalname: '武汉市第九医院',
        subname: '医学影像科',
        begintime: '2018-12-12 15:300',
        endtime: '2018-12-12 15:300',
        timelong: '40:11'
      },
      {
        serialnumber: '5xxxxxxxxxx21',
        finishstate: 0,
        hospitalname: '武汉市第九医院',
        subname: '急救科',
        begintime: '2018-12-12 15:300',
        endtime: '2018-12-12 15:300',
        timelong: '40:05'
      }, {
        serialnumber: '5xxxxxxxxxx22',
        finishstate: 1,
        hospitalname: '湖北省妇幼保健院',
        subname: '急救科',
        begintime: '2018-12-12 15:300',
        endtime: '2018-12-12 15:300',
        timelong: '40:04'
      }
      ]
    }
  },
  created() {
    this.dataDeal(this.expertList)
    /* setTimeout(() => {
    }, 2000) */
  },
  methods: {
    dataDeal(data) {
      var that = this
      var arr = data
      var listArr = []
      arr.forEach(function (el, index) {
        for (var i = 0; i < listArr.length; i++) {
          // 对比相同的字段key，相同放入对应的数组
          if (listArr[i].finishstate === el.finishstate) {
            listArr[i].listInfo.push({
              serialnumber: el.serialnumber,
              finishstate: el.finishstate,
              hospitalname: el.hospitalname,
              subname: el.subname,
              timelong: el.timelong,
              begintime: el.begintime,
              endtime: el.endtime
            })
            return
          }
        }
        // 第一次对比没有参照，放入参照
        listArr.push({
          finishstate: el.finishstate,
          listInfo: [{
            serialnumber: el.serialnumber,
            finishstate: el.finishstate,
            hospitalname: el.hospitalname,
            subname: el.subname,
            timelong: el.timelong,
            begintime: el.begintime,
            endtime: el.endtime
          }]
        })
      })
      that.allorder = this.expertList
      that.itemFinished = listArr[0].listInfo
      that.itemWaitPay = listArr[1].listInfo
      that.itemAudit = listArr[2].listInfo
      console.log('所有订单', that.allorder)
      console.log('已完成', that.itemFinished)
      console.log('未完成', that.itemWaitPay)
      console.log('待审核', that.itemAudit)
    },
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
  top: 92px;
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
