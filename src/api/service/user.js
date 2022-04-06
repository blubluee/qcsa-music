import { url } from 'stylus/lib/stylus'
import request from '../request.js'

// 手机登录
export const reqPhoneLogin = ({ phone, password }) => {
  return request({
    url: `/login/cellphone`,
    method: 'get',
    params: {
      phone,
      password
    }
  })
}

// 获取用户详情
export const reqUserInfo = (uid) => {
  return request({
    url: `/user/detail`,
    method: 'get',
    params: {
      uid
    }
  })
}

// 退出登录
export const reqLogout = () => {
  return request({
    url: '/logout',
    method: 'get'
  })
}

// 获取账号信息
export const reqIdInfo = () => {
  return request({
    url: '/user/account',
    method: 'get'
  })
}

// 获取用户详情
export const reqInfoById = (uid) => {
  return request({
    url: '/user/detail',
    method: 'get',
    params: {
      uid
    }
  })
}

// 获取用户歌单
export const reqUserSongsheet = (uid) => {
  return request({
    url: '/user/playlist',
    method: 'get',
    params: {
      uid
    }
  })
}

// 获取用户听歌记录
export const reqUserSongRecord = (uid, type = 0) => {
  return request({
    url: '/user/record',
    method: 'get',
    params: {
      uid,
      type
    }
  })
}
