import request from '../request'

// 获取视频标签列表
export const reqVideoTagList = () => {
  return request({
    url: '/video/group/list',
    method: 'get'
  })
}

// 获取热门视频标签列表
export const reqVideoCatList = () => {
  return request({
    url: 'video/category/list',
    method: 'get'
  })
}

// 获取视频标签/分类下的视频
export const reqVideoByTagOrCat = (params) => {
  return request({
    url: '/video/group',
    method: 'get',
    params
  })
}

// 获取全部视频列表
export const reqAllVideoList = (offset) => {
  return request({
    url: '/video/timeline/all',
    method: 'get',
    params: {
      offset
    }
  })
}

