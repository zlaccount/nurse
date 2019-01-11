import {
  commonParams
} from './config'
import axios from 'axios'

// 护士端
/* 陪护床床号所有数据 */
export function bedAllData(serial) {
  const url = 'bed/manager/queryList'
  const data = Object.assign({}, {
    currentPage: 1,
    pageSize: '10',
    hospitalId: '030b7bef56fe5f783357075d6264fe22',
    subName: '儿童保健科',
    chaperonageBedCode: serial
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 陪护床新增、修改、解绑接口
export function bedOperation(serial, floor, room) {
  const url = 'bed/manager/bedInfoSave'
  const data = Object.assign({}, {
    chaperonageBedCode: serial,
    way: '0',
    nurseId: 'f171802156fe5f781685c1d5b475d638',
    roomId: room,
    bedNumber: room,
    bedAddress: floor
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 陪护床详情查看接口
export function bedDetail() {
  const url = 'bed/manager/search'
  const data = Object.assign({}, {
    id: "1"
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 统计所有数据接口
export function bedStatistical() {
  const url = 'bed/rent/queryList'
  const data = Object.assign({}, {
    subName: "儿童保健科",
    hospitalId: "030b7bef56fe5f783357075d6264fe22",
    currentPage: "1",
    pageSize: "10"
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}


// 某年、月、日统计接口
export function bedSelectTime() {
  const url = 'bed/rent/app/time'
  const data = Object.assign({}, {
    date: "2016-12",
    subName: "儿童保健科",
    hospitalId: "030b7bef56fe5f783357075d6264fe22"
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
// PC端接口
// 年统计接口
export function bedYear() {
  const url = 'bed/rent/year'
  const data = Object.assign({}, {
    currentPage: "1",
    pageSize: "10",
    subName: "儿童保健科",
    hospitalId: "030b7bef56fe5f783357075d6264fe22"
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 月统计接口
export function bedMonth() {
  const url = 'bed/rent/month'
  const data = Object.assign({}, {
    currentPage: "1",
    pageSize: "10",
    time: "2018",
    subName: "儿童保健科",
    hospitalId: "030b7bef56fe5f783357075d6264fe22"
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 日统计接口
export function bedDay(date) {
  const url = 'bed/rent/day'
  const data = Object.assign({}, {
    currentPage: "1",
    pageSize: "10",
    time: date,
    subName: "儿童保健科",
    hospitalId: "030b7bef56fe5f783357075d6264fe22"
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
