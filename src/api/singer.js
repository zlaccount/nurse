import jsonp from 'common/js/jsonp'
import {
  commonParams,
  options
} from './config'
import axios from 'axios'

/* 歌单列表 */
export function getSingerList() {
  const url = '/api/getSingerList'

  const data = Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq'
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/* 歌手详情 */
export function getSingerDetail(singerId) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'

  const data = Object.assign({}, commonParams, {
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    beging: 0,
    num: 100,
    songstatus: 1,
    g_tk: 1983434883,
    singermid: singerId
  })

  return jsonp(url, data, options)
}

/* 音乐播放源 */
export function getMusic(songmid) {
  const url = '/api/music'

  const data = Object.assign({}, commonParams, {
    songmid: songmid,
    filename: 'C400' + songmid + '.m4a',
    guid: 6233887275,
    platform: 'yqq',
    loginUin: 0,
    hostUin: 0,
    needNewCode: 0,
    cid: 205361747,
    uid: 0,
    format: 'json',
    g_tk: 1928111839
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
