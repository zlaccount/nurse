import {
  options
} from './config'
import axios from 'axios'

// 护士端
/* 陪护床床号所有数据 */

// export function bedAllData(serial) {
//   const url = 'bed/manager/queryList'
//   const data = Object.assign({}, {
//     currentPage: 1,
//     pageSize: '10',
//     hospitalId: localStorage.getItem("hospitalId"),
//     subName: localStorage.getItem("subName"),
//     chaperonageBedCode: serial
//   })

//   return axios.get(url, {
//     params: data
//   }).then((res) => {
//     return Promise.resolve(res.data)
//   })
// }

// 陪护床新增、修改、解绑接口
export function bedOperation(serial, way, floor, room) {
  const url = 'bed/manager/bedInfoSave'
  const data = Object.assign({}, {
    chaperonageBedCode: serial,
    way: way,
    nurseId: localStorage.getItem("nurseId"),
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
    hospitalId: localStorage.getItem("hospitalId"),
    subName: localStorage.getItem("subName"),
    id: "1"
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 9.陪护床租床及费用统计接口（公众号）
export function bedStatistical() {
  const url = 'bed/rent/queryList'
  const data = Object.assign({}, {
    currentPage: "1",
    pageSize: "10",
    hospitalId: localStorage.getItem("hospitalId"),
    subName: localStorage.getItem("subName"),
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}


// 某年、月、日统计接口
export function bedSelectTime(date) {
  const url = 'bed/rent/app/time'
  const data = Object.assign({}, {
    date: date,
    hospitalId: localStorage.getItem("hospitalId"),
    subName: localStorage.getItem("subName"),
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 11.陪护床监测接口
export function monitoring(currentPage, pageSize, bedCode) {
  const url = 'bed/monitor/queryList'
  const data = Object.assign({}, {
    currentPage: currentPage,
    pageSize: pageSize,
    lockState: "",
    bedEnergy: "",
    bedFlow: "",
    serviceTime: "",
    bedCode: bedCode,
    hospitalId: localStorage.getItem("hospitalId"),
    subName: localStorage.getItem("subName"),
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
    hospitalId: localStorage.getItem("hospitalId"),
    subName: localStorage.getItem("subName"),
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
    hospitalId: localStorage.getItem("hospitalId"),
    subName: localStorage.getItem("subName"),
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
    hospitalId: localStorage.getItem("hospitalId"),
    subName: localStorage.getItem("subName"),
    time: date,
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
