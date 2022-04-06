// 接口统一暴露
import * as user from './service/user'
import * as music from './service/music'
import * as rank from './service/rank'
import * as songlist from './service/songlist'
import * as singer from './service/singer'
import * as video from './service/video'


export default {
  user,
  music,
  rank,
  songlist,
  singer,
  video
}

