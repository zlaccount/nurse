import {
  options
} from './config'
import axios from 'axios'

// 护士端
/* 陪护床床号所有数据 */

// 扫一扫
export function RichScan(LocationHref) {
  const url = "RichScan";
  const data = Object.assign({}, {
    url: LocationHref
  });
  return axios
    .get(url, {
      params: data
    })
    .then(res => {
      return Promise.resolve(res.data);
    });
}
// 陪护床新增、修改、解绑接口
export function bedOperation(id,serial, way, room,floor ) {
  const url = 'bed/manager/bedInfoSave'
  const data = Object.assign({}, {
    id: id,
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
export function monitoring(currentPage, pageSize, lockState, bedEnergyState, bedEnergy, bedFlow, serviceTime, bedCode) {
  const url = 'bed/monitor/queryList'
  const data = Object.assign({}, {
    currentPage: currentPage,
    pageSize: pageSize,
    lockState: lockState,
    bedEnergyState: bedEnergyState,
    bedEnergy: bedEnergy,
    bedFlow: bedFlow,
    serviceTime: serviceTime,
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
