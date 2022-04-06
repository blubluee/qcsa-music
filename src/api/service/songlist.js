import request from '../request'

// 获取全部歌单标签
export const reqSonglistCatogory = () => {
  return request({
    url: '/playlist/catlist',
    method: 'get'
  })
}

// 获取热门歌单标签
export const reqHotList = () => {
  return request({
    url: '/playlist/hot',
    method: 'get'
  })
}

// 根据分类获取歌单
export const reqSongList = ({order, cat, limit, offset}) => {
  return request({
    url: '/top/playlist',
    method: 'get',
    params: {
      order,
      cat,
      limit,
      offset
    }
  })
} 