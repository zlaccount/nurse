import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import axios from 'axios'
import { Tabbar, TabbarItem } from 'vant'
import { Swipe, SwipeItem } from 'vant'
import { Lazyload } from 'vant'
import { NavBar } from 'vant'
import { Search } from 'vant'
import { Icon } from 'vant'
import { Step, Steps } from 'vant'
import { Row, Col  } from 'vant'
import { Button } from 'vant'
import { PasswordInput, NumberKeyboard } from 'vant'
import { Dialog } from 'vant'
import { RadioGroup, Radio } from 'vant'
import { Cell, CellGroup } from 'vant'
import { Popup } from 'vant'
import { Field } from 'vant'
import { Toast } from 'vant'
import { Uploader } from 'vant'
import { ImagePreview } from 'vant'
import { List } from 'vant'
import { Tab, Tabs } from 'vant'
import { Area } from 'vant'
import { Checkbox, CheckboxGroup } from 'vant'
import { Collapse, CollapseItem } from 'vant';

Vue.use(Swipe).use(SwipeItem)
Vue.use(Lazyload)
Vue.use(Tabbar).use(TabbarItem)
Vue.use(NavBar)
Vue.use(Search)
Vue.use(Icon)
Vue.use(Step).use(Steps)
Vue.use(Row).use(Col)
Vue.use(Button)
Vue.use(PasswordInput).use(NumberKeyboard)
Vue.use(Dialog)
Vue.use(RadioGroup)
Vue.use(Radio)
Vue.use(Cell).use(CellGroup)
Vue.use(Popup)
Vue.use(Field)
Vue.use(Uploader)
Vue.use(List)
Vue.use(Tab).use(Tabs)
Vue.use(Area)
Vue.use(Toast)
Vue.use(Checkbox).use(CheckboxGroup)
Vue.use(Collapse).use(CollapseItem);

 //细节处理一：可以给axios的ajax请求设置统一的主机和端口号
 axios.defaults.baseURL = "http://192.168.1.11:8333/eht/"; //鲁能
//  axios.defaults.baseURL = "http://192.168.1.7:8080/app/"; //江岩
//  axios.defaults.baseURL = "http://www.51edoctor.cn/eht/";
 //细节处理二: 可以将axios这个对象添加到Vue的原型对象中，将来在使用的时候就只需要使用this.对象名就可以了
 Vue.prototype.$http = axios;
import 'common/stylus/index.styl'

fastclick.attach(document.body)

Vue.use(VueLazyload, {
  loading: require('./common/image/default.png')
})

/* Vue.config.productionTip = false */

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  store,
  router
})
