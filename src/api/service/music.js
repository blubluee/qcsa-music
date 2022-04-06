import request from '../request'

// 发现音乐模块的接口
export const reqBannerList = () => {
  return request({
    url: '/banner',
    method: 'get'
  })
}

// 获取推荐歌单
export const reqRecommandList = () => {
  return request({
    url: '/personalized',
    method: 'get'
  })
}

// 获取推荐音乐
export const reqRecommandSong = () => {
  return request({
    url: '/personalized/newsong',
    method: 'get'
  })
}

// 获取歌曲详情
export const reqSongInfo = (ids) => {
  return request({
    url: '/song/detail',
    method: 'get',
    params: {
      ids
    }
  })
}

// 获取推荐歌手
export const reqRecommandSinger = (offset=0, limit=30) => {
  return request({
    url: '/top/artists',
    method: 'get',
    params: {
      offset,
      limit
    }
  })
}

// 获取热搜列表
export const reqHotSearchList = () => {
  return request({
    url: '/search/hot',
    method: 'get'
  })
}

// 获取音乐的url
export const getMusicUrl =  (id) => {
  return request({
    url: '/song/url',
    params: {
      id
    }
  })
}