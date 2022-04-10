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

// 获取歌单详情
export const reqSlInfo = (id) => {
  return request({
    url: '/playlist/detail',
    method: 'get',
    params: {
      id
    }
  })
}

// 获取歌单收藏者
export const reqSubers = (id, limit = 30) => {
  return request({
    url: '/playlist/subscribers',
    method: 'get',
    params: {
      id,
      limit
    }
  })
}

// 获取相关歌单推荐
export const reqRec = (id) => {
  return request({
    url: '/related/playlist',
    method: 'get',
    params: {
      id
    }
  })
}

// 获取歌单评论
export const reqCom = (id) => {
  return request({
    url: '/comment/playlist',
    method: 'get',
    params: {
      id
    }
  })
}

