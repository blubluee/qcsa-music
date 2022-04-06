import request from '../request'

// 获取歌手分类列表
export const reqSingerCatList = (params) => {
  return request({
    url: '/artist/list',
    method: 'get',
    params
  })
}


