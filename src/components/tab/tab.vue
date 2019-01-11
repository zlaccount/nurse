<template>
  <div class="tab">
    <van-tabbar v-model="active">
      <van-tabbar-item to='/bed'>
        <span>陪护床</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? icon.bed.active : icon.bed.normal"
        >
      </van-tabbar-item>
      <van-tabbar-item to='/operation'>
        <span>陪护床</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? icon.operation.active : icon.operation.normal"
        >
      </van-tabbar-item>
      <van-tabbar-item to='/nurse'>
        <span>管理</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? icon.manage.active : icon.manage.normal"
        >
      </van-tabbar-item>
      <van-tabbar-item to='/audit'>
        <span>审核</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? icon.audit.active : icon.audit.normal"
        >
      </van-tabbar-item>
      <van-tabbar-item to='/maintenance'>
        <span>维修</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? icon.maintenance.active : icon.maintenance.normal"
        >
      </van-tabbar-item>
      <van-tabbar-item
        to='/my'
        icon="contact"
      >
        <span>我的</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? icon.my.active : icon.my.normal"
        >
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import e_icon from '../../../static/img_icon/greybed.png'
import e_icon_active from '../../../static/img_icon/bed.png'
import guanli from '../../../static/img_icon/guanli_grey.png'
import guanli_active from '../../../static/img_icon/guanli_green.png'
import audit from '../../../static/img_icon/shenhe_grey.png'
import audit_active from '../../../static/img_icon/shenhe_green.png'
import maintenance from '../../../static/img_icon/weixiu_grey.png'
import maintenance_active from '../../../static/img_icon/weixiu_green.png'
import icon_my from '../../../static/img_icon/icon-wode2-mal.png'
import icon_my_active from '../../../static/img_icon/icon-wode2-mall@2x.png'

export default {
  data() {
    return {
      active: 0,
      icon: {
        bed: {
          normal: e_icon,
          active: e_icon_active
        },
        operation: {
          normal: e_icon,
          active: e_icon_active
        },
        manage: {
          normal: guanli,
          active: guanli_active
        },
        audit: {
          normal: audit,
          active: audit_active
        },
        maintenance: {
          normal: maintenance,
          active: maintenance_active
        },
        my: {
          normal: icon_my,
          active: icon_my_active
        }
      }
    }
  },
  mounted() {
    if (this.$route.fullPath === '/bed') {
      this.active = 0
    } else if (this.$route.fullPath === '/operation') {
      this.active = 1
    } else if (this.$route.fullPath === '/nurse') {
      this.active = 2
    } else if (this.$route.fullPath === '/audit') {
      this.active = 3
    } else if (this.$route.fullPath === '/maintenance') {
      this.active = 4
    } else {
      this.active = 5
    }
  }
}
</script>

<style scoped lang="stylus">
@import '~common/stylus/variable';

.index {
  .van-tabbar-item--active {
    color: #4fd6bc;
  }

  .tabbar_line {
    width: 100%;
    position: fixed;
    bottom: 50px;
  }
}
</style>
