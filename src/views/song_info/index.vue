<template>
  <div class="song-wrapper">
    <div class="body">
      <div class="main">
        <div class="main_head">
          <img :src="playlist.coverImgUrl">
          <div class="main_head_right">
            <p class="listname">{{ playlist.name}}</p>
            <div class="creator_info">
              <el-avatar size="medium"
                         :src="creator.avatarUrl"></el-avatar>
              <span class="nickname">{{ creator.nickname }}</span>
              <span class="createdTime">{{ createdTime + ' 创建'}}</span>
            </div>
            <div class="tag-wrapper">
              <span>标签：</span>
              <button class="tag"
                      v-for="(item, index) in playlist.tags"
                      :key="index">
                {{ item }}
              </button>
            </div>
            <div class="des">
              {{ playlist.description }}
            </div>
          </div>
        </div>
        <div class="fnbtn-wrapper">
          <div class="fnbtn">
            <button>播放全部</button>
            <button>收藏</button>
          </div>
        </div>
        <div class="list-wrapper">
          <SongList :songs="songlist"></SongList>
        </div>
      </div>
      <div class="right">
        <div class="like">
          <RightSlot title="喜欢这个歌单的人">
            <div class="like-body">
              <div class="avatar-wrapper"
                   v-for="(item, index) in subscribers"
                   :key="index">
                <el-avatar shape="square"
                           size="medium"
                           :src="item.avatarUrl"></el-avatar>
              </div>
            </div>
          </RightSlot>
        </div>
        <div class="rec-wrapper">
          <RightSlot title="相关推荐">
            <div class="rec"
                 v-for="(item, index) in rec"
                 :key="index">
              <el-avatar shape="square"
                         :size="50"
                         :src="item.coverImgUrl"></el-avatar>
              <div class="rec_right">
                <p class="rec_name">{{ item.name }}</p>
                <p class="rec_nickname">By {{ item.creator && item.creator.nickname }}</p>
              </div>
            </div>
          </RightSlot>
        </div>
        <div class="com-wrapper">
          <RightSlot title="精彩评论">
            <div class="com"
                 v-for="(item, index) in com"
                 :key="index">
              <div class="com-left">
                <el-avatar :size="50"
                           :src="item.user && item.user.avatarUrl"></el-avatar>
              </div>
              <div class="com-right">
                <span class="com-nickname">{{ item.user && item.user.nickname }}</span>
                <span class="com-time">{{ item.time }}天前</span>
                <p class="content">
                  {{ item.content }}
                </p>
              </div>
            </div>
          </RightSlot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import util from '@/util/util'
import SongList from '@/components/songList'
import RightSlot from '@/views/song_info/children'
export default {
  data () {
    return {
      id: 0,
      playlist: {},
      songlist: [],
      creator: {},
      subscribers: [],
      rec: [],
      com: []
    }
  },
  components: {
    SongList,
    RightSlot
  },
  mounted () {
    this.saveId()
    this.getInfo()
    this.getSuber()
    this.getRec()
    this.getCom()
  },
  methods: {
    // 获取歌单信息
    async getInfo () {
      const result = await this.$API.songlist.reqSlInfo(this.id)
      if (result.code === 200) {
        this.playlist = result.playlist
        this.creator = result.playlist.creator
        this.songlist = result.playlist.tracks
      }
    },
    // 获取歌单收藏者
    async getSuber () {
      const result = await this.$API.songlist.reqSubers(this.id)
      if (result.code === 200) {
        this.subscribers = result.subscribers
      }
    },
    // 获取相关歌单推荐
    async getRec () {
      const result = await this.$API.songlist.reqRec(this.id)
      if (result.code === 200) {
        this.rec = result.playlists
      }
    },
    // 获取歌单评论
    async getCom () {
      const result = await this.$API.songlist.reqCom(this.id)
      if (result.code === 200) {
        const length = result.hotComments.length > 5 ? 5 : result.hotComments.length
        this.com = result.hotComments.splice(0, length)
        this.com.map((item) => {
          item.time = parseInt(util.formatTime_D(item.time))
          return item
        })
      }
    },
    // 将歌单id保存到localStorage中
    saveId () {
      this.id = this.$route.params.id || localStorage.getItem('slId')
      if (this.id) {
        localStorage.setItem('slId', this.id)
      }
    }
  },
  computed: {
    createdTime () {
      return util.formatTime_Y(this.playlist.createTime)
    },
  }
}
</script>

<style lang='scss' scoped>
.song-wrapper {
  width: 65%;
  margin: 0 auto;
  .body {
    display: flex;
    .main {
      width: 64%;
      border-radius: 1em;
      box-shadow: 0 0 7px 0 rgba(0, 0, 0, 0.1);
      .main_head {
        display: flex;
        padding: 20px;
        height: 18em;
        img {
          height: 200px;
          margin-right: 1em;
        }
        .main_head_right {
          max-height: 100%;
          padding: 0.5em;
          .listname {
            font-size: 1.6em;
            font-weight: bold;
          }
          .creator_info {
            display: flex;
            height: 36px;
            line-height: 36px;
            margin: 1em 0;
            .nickname {
              margin: 0 1em;
            }
            .createdTime {
              color: rgba(0, 0, 0, 0.5);
            }
          }
          .tag-wrapper {
            margin-bottom: 1em;
            .tag {
              margin-right: 0.7em;
              padding: 0.2em 0.7em;
              color: #ffe;
              background-color: rgb(247, 74, 74);
              border-radius: 0.5em;
            }
          }
          .des {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
        }
      }
      .fnbtn-wrapper {
        display: flex;
        .fnbtn {
          margin-left: auto;
          padding: 0 1em;
          button {
            box-sizing: border-box;
            padding: 0.7em 0.7em;
            color: #ffe;
            background-color: rgb(247, 74, 74);
            border-radius: 0.5em;
            cursor: pointer;
          }
          & > button + button {
            margin-left: 1em;
            color: #004;
            background-color: gainsboro;
          }
        }
      }
    }
    .right {
      width: 32%;
      margin-left: 1em;
      .like {
        height: auto;
        .like-body {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          .avatar-wrapper {
            width: 15%;
          }
        }
      }
      .rec-wrapper {
        .rec {
          display: flex;
          align-items: center;
          margin-bottom: 1em;
          .rec_right {
            width: 80%;
            margin-left: 0.6em;
            .rec_name {
              font-size: 1.1em;
              font-weight: 500;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
            .rec_nickname {
              font-size: 0.9em;
              color: rgba(0, 0, 0, 0.4);
            }
          }
        }
      }
      .com-wrapper {
        .com {
          display: flex;
          margin-bottom: 1em;
          .com-left {
            margin-right: 1em;
          }
          .com-right {
            .com-nickname {
              margin-right: 0.6em;
            }
            .com-time {
              font-size: .8em;
              font-weight: 400;
              color: rgba(0, 0, 0, 0.5);
            }
            .content {
              color: #666;
              background-color: #f5f5f5;
              font-size: .5em;
              font-weight: 500;
              line-height: 1.5;
              margin-top: 1em;
              padding: 0.6em;
              border-radius: 1em;
            }
          }
        }
      }
    }
  }
}
</style>