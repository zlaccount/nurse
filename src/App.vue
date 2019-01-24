<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <result></result>
    <deposit-manger></deposit-manger>
    <bed-manager></bed-manager>
    <directions></directions>
    <tab></tab>
    <!-- <audit-detail></audit-detail> -->
  </div>
</template>

<script type="text/ecmascript-6">
import result from "components/result/result";
import DepositManger from "components/deposit/deposit";
import BedManager from "components/bedmanager/bedmanager";
import Directions from "components/directions/directions";
import Tab from 'components/tab/tab'
import AuditDetail from 'components/maintenanceEnd/auditdetail'
export default {
  data() {
    return {

    }
  },
  components: {
    result,
    Tab,
    DepositManger,
    BedManager,
    Directions,
    AuditDetail
  }
}
</script>

<style scoped>
</style>
