<template>
  <div class="auditList">
    <scroll
      ref="scroll"
      class="auditList-content"
      :data="allOrder"
    >
      <div>
        <div
          class="cellCon"
          v-for="(item, index) in allOrder"
          :key="index"
        >
          <div class="detail">
            <van-cell
              :title="item.hospitalname"
              is-link
              value-class="entry"
              :value="item.entry+'条'"
            />
            <div class="auditListgray"></div>
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

.auditList {
  position: fixed;
  width: 100%;
  top: 130px;
  bottom: 51px;
  background: #fff;

  .auditList-content {
    height: 100%;
    overflow: hidden;

    .detail {
      position: relative;

      .auditListgray {
        height: 1px;
        background: #F5F3F4;
        position: absolute;
        width: 94%;
        left: 3%;
        z-index: 1;
        right: 3%;
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
</style>
