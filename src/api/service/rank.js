import request from '../request'

// 获取排行榜歌单
export const reqTopList = () => {
  return request({
    url: '/toplist/detail',
    method: 'get'
  })
}