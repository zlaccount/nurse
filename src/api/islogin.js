import {
  commonParams
} from './config'
import axios from 'axios'

// 获取验证码
export function getcode(phone) {
  const url = 'EDoctor_service/app/manager/account/user/userCodeLogin'
  const data = Object.assign({}, {
    sid: '123',
    mobileNo: phone
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 校验账户密码
export function checkcode(phone, sms) {
  const url = 'admin/hospitalUser/login'
  const data = Object.assign({}, {
    username: phone,
    password: sms
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
