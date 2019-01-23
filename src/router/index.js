import Vue from 'vue';
import Router from 'vue-router';

// 用户端使用
import Bed from 'src/page/bed/bed';
// 手动输入编号
import Bedserial from 'components/bed/serial';
import Useding from 'components/bed/useding';
// 订单管理

// 护士端绑定操作
import Operation from 'src/page/operation/operation';
import Serial from 'components/operation/serial';
import Bindingroom from 'components/operation/bindingroom';
import Bindingresult from 'components/operation/bindingresult';
// 管理
import Nurse from 'components/nurse/nurse';
// 使用监测
import Monitoring from 'src/page/monitoring/monitoring';
import BedDetail from 'components/BedDetail/BedDetail';

// 租床、费用统计选择日期
import SelectDate from 'components/selectDate/selectDate';
// 统计结果
import Statisticalresults from 'components/statisticalresults/statisticalresults';

// 审核
import Audit from 'src/page/audit/audit';
// import AuditDetail from "components/audit/auditdetail";

//  维修
import Maintenance from 'src/page/maintenance/maintenance';

// 我的
import My from 'src/page/my/my';
// 登录
import Login from "components/login/login";
// 个人资料
import Selfperson from 'components/my/selfperson';
// 账户充值
import Selfbalance from 'components/my/selfbalance';

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      redirect: '/operation'
    },
    {
      path: '/bed',
      name: 'bed',
      component: Bed,
      children: [{
          path: '/bed/serial',
          name: 'bedserial',
          component: Bedserial
        },
        {
          path: '/bed/useding',
          name: 'useding',
          component: Useding
        }
      ]
    },
    {
      path: '/operation',
      name: 'operation',
      component: Operation,
      children: [{
        path: '/operation/serial',
        name: 'serial',
        component: Serial,
        children: [{
          path: '/operation/serial/bindingroom',
          name: 'bindingroom',
          component: Bindingroom,
          children: [{
            path: '/operation/serial/bindingroom/bindingresult',
            name: 'bindingresult',
            component: Bindingresult
          }]
        }]
      }]
    },
    {
      path: '/nurse',
      name: 'nurse',
      component: Nurse,
      children: [{
          path: '/nurse/monitoring',
          name: 'monitoring',
          component: Monitoring,
           children: [{
            path: ':id',
            component: BedDetail
          }]
        },
        {
          path: '/nurse/statisticalresults',
          name: 'statisticalresults',
          component: Statisticalresults,
          children: [{
            path: '/nurse/statisticalresults/selectDate',
            name: 'selectDate',
            component: SelectDate
          }]
        }
      ]
    },
    {
      path: '/audit',
      name: 'audit',
      component: Audit
      // children: [{
      //   path: ':id',
      //   component: AuditDetail
      // }]
    },
    {
      path: '/maintenance',
      name: 'maintenance',
      component: Maintenance
    },
    {
      path: '/my',
      name: 'my',
      component: My,
      children: [{
          path: '/my/login',
          name: 'login',
          component: Login
        },
        {
          path: '/my/selfperson',
          name: 'selfperson',
          component: Selfperson
        },
        {
          path: '/my/selfbalance',
          name: 'selfbalance',
          component: Selfbalance
        }
      ]
    }
  ]
})
