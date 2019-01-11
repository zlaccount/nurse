import {
  commonParams,
  options
} from "./config";

import axios from "axios";
// 用户端
// 1.扫码或输入编号开锁接口（写好待测）
export function handSerial() {
  const url = "/api/user/openLock";
  const data = Object.assign({}, {
    user_id: "8be665d43fa838010e8ba95ba20d5a8f",
    chaperonage_bed_code: 1800100
    // chaperonage_bed_code: serial
  });
  return axios
    .get(url, {
      params: data
    })
    .then(res => {
      return Promise.resolve(res.data);
    });
}
// 4.用户进入缴纳押金界面或查看押金接口（写好待测）
export function deposit() {
  const url = "/api/user/pay_deposit";
  const data = Object.assign({}, {
    user_id: "a8dc75be56fe5f7833eed2f88d7d701e"
  });
  return axios
    .get(url, {
      params: data
    })
    .then(res => {
      return Promise.resolve(res.data);
    });
}

// 9.我的订单接口（写好待测）
export function order() {
  const url = "/api/user/my_order";
  const data = Object.assign({}, {
    user_id: "a8dc75be56fe5f7833eed2f88d7d701e",
    pay_state: "-1"
  });
  return axios
    .get(url, {
      params: data
    })
    .then(res => {
      return Promise.resolve(res.data);
    });
}
// 10.详情订单接口（写好待测）
export function orderDetail(order_id) {
  const url = "/api/user/order_form";
  const data = Object.assign({}, {
    user_id: "a8dc75be56fe5f7833eed2f88d7d701e",
    order_id: order_id
  });
  return axios
    .get(url, {
      params: data
    })
    .then(res => {
      return Promise.resolve(res.data);
    });
}
// 微信支付
export function pay(order_id) {
  const url = "/E2306_service/app/rescheduAppletPay";
  const data = Object.assign({}, {
    user_id: "a8dc75be56fe5f7833eed2f88d7d701e",
    order_id: order_id
  });
  return axios
    .get(url, {
      params: data
    })
    .then(res => {
      return Promise.resolve(res.data);
    });
}
// 搜索条件接口
// export function bedSearch(serial) {
//   const url = 'admin/hospitalUser/QueryList'
//   const data = Object.assign({}, {
//     currentPage: 1,
//     pageSize: '10',
//     hospitalId: '030b7bef56fe5f783357075d6264fe22',
//     subName: '儿童保健科',
//     chaperonageBedCode: serial
//   })

//   return axios.get(url, {
//     params: data
//   }).then((res) => {
//     return Promise.resolve(res.data)
//   })
// }
//微信支付方法（点击按键调用）
let wx = require('weixin-js-sdk');
/*
微信支付方法
获取微信加签信息
@param{data}:获取的微信加签
@param{cb}:成功回调
*/
export function wexinPay(data, cb, errorCb) {
  let appId = data.appId;
  let timestamp = data.timeStamp;
  let nonceStr = data.nonceStr;
  let signature = data.signature;
  let packages = data.package;
  let paySign = data.paySign;
  wx.config({
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: appId, // 必填，公众号的唯一标识
    timestamp: timestamp, // 必填，生成签名的时间戳
    nonceStr: nonceStr, // 必填，生成签名的随机串
    signature: signature, // 必填，签名，见附录1
    jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
  });
  wx.ready(function () {
    wx.chooseWXPay({
      timestamp: timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
      nonceStr: nonceStr, // 支付签名随机串，不长于 32 位
      package: packages, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
      signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
      paySign: paySign, // 支付签名
      success: function (res) {
        // 支付成功后的回调函数
        cb(res);
      },
      fail: function (res) {
        errorCb(res);
      }
    });
  });
  wx.error(function (res) {
    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
    /*alert("config信息验证失败");*/
  });
}
