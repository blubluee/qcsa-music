import request from '../request'

// 获取歌手分类列表
export const reqSingerCatList = (params) => {
  return request({
    url: '/artist/list',
    method: 'get',
    params
  })
}

// 获取歌手详情信息
export const reqSingerInfo = (id) => {
  return request({
    url: '/artist/detail',
    method: 'get',
    params: {
      id
    }
  })
}



