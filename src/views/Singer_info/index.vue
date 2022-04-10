<template>
  <div class="wrapper">
    <div class="top">
      <div class="top-mask">
        <div class="info_header">
          <div class="avatar">
            <el-avatar :size="120"
                       :src="singerInfo.artist && singerInfo.artist.cover"
                       style="{width:auto; margin: 0 auto;}"></el-avatar>
          </div>
          <div class="name">
            <p>{{singerInfo.artist && singerInfo.artist.name}}</p>
          </div>
          <div class="subscribe">
            <div class="sub_wrapper">
              <i class="el-icon-plus"></i>
              <span>关注Ta</span>
            </div>
          </div>
        </div>
        <div class="describe">
          <div class="des_flex">
            <p>{{singerInfo.artist && singerInfo.artist.briefDesc}}</p>
          </div>
        </div>
        <div class="info_footer">
          <div class="footer_flex">
            <li>
              <p>{{singerInfo.artist && singerInfo.artist.musicSize}}</p>
              <p class="word">单曲数</p>
            </li>
            <li>
              <p>{{singerInfo.artist && singerInfo.artist.albumSize}}</p>
              <p class="word">专辑数</p>
            </li>
            <li>
              <p>{{singerInfo.artist && singerInfo.artist.mvSize}}</p>
              <p class="word">MV数</p>
            </li>
          </div>
        </div>
      </div>
    </div>
    <div class="bar">
      <div class="bar_flex">
        <li v-for="(item, index) in barList"
            :key="index"
            @click="isActive(index)"
            :class="currentIndex==index ? 'active' : ''">{{ item }}</li>
      </div>
    </div>
    <div class="button_wrapper">
      <div class="button">
        <button>
          播放全部
        </button>
      </div>
    </div>
    <div class="songList_wrapper">
      <div class="songList">
        <SongList :songs="songs"></SongList>
      </div>
    </div>
  </div>
</template>

<script>
import util from '@/util/util'
import SongList from '@/components/songList'
export default {
  data () {
    return {
      singerInfo: {},
      songs: [],
      barList: ['作品', '专辑', 'MV', '歌手详情', '相似歌手'],
      currentIndex: 0
    }
  },
  components: {
    SongList
  },
  mounted () {
    this.getInfo()
    this.getSongs()
    document.documentElement.scrollTop = 0
  },
  methods: {
    // 获取歌手信息
    async getInfo () {
      const id = this.$route.params.id || localStorage.getItem('singerId')
      const result = await this.$API.singer.reqSingerInfo(id)
      if (result.code === 200) {
        this.singerInfo = result.data
      }
    },
    // 获取歌手单曲信息
    async getSongs () {
      const id = this.$route.params.id || localStorage.getItem('singerId')
      const result = await this.$API.singer.reqSingerSongs(id)
      if (result.code === 200) {
        this.songs = result.hotSongs
        for (const item of this.songs) {
            item.dt = util.formatSecond(item.dt)
        }
        if (this.$route.params.id) {
          localStorage.setItem('singerId', this.$route.params.id)
        }
      }
    },
    // 修改bar中的活跃状态
    isActive (index) {
      this.currentIndex = index
    }
  }
}
</script>

<style lang='scss' scoped>
.wrapper {
  height: auto;
  margin: -80px 0 0 0;
  .top {
    position: relative;
    top: 5em;
    margin-bottom: 7em;
    height: 580px;
    clip-path: polygon(0 0, 100% 0, 100% 80%, 50% 100%, 0 80%);
    background-image: url("~@/assets/images/singer_background.jpg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    .top-mask {
      max-width: 60%;
      margin: 0 auto;
      padding: 9em 0;
      .info_header {
        max-width: 70%;
        margin: 0 auto;
        .avatar {
          display: flex;
          justify-content: center;
        }
        .name {
          display: flex;
          justify-content: center;
          font-size: 2em;
          color: #fff;
          margin: 10px 0;
        }
        .subscribe {
          display: flex;
          justify-content: center;
          align-items: center;
          .sub_wrapper {
            font-size: 1.3em;
            color: #fff;
            padding: 0.6em 0.5em;
            border-radius: 2em;
            border: 1px solid #fff;
            i {
              margin-right: 0.7em;
            }
          }
        }
      }
      .describe {
        width: 100%;
        margin: 1em 0;
        .des_flex {
          width: 100%;
          font-size: 1.1em;
          color: gray;
          text-align: center;
          overflow: hidden;
          text-overflow: ellipsis;
          /*弹性伸缩盒子模型显示*/
          display: -webkit-box;
          /*限制在一个块元素显示的文本的行数*/
          -webkit-line-clamp: 2;
          /*设置或检索伸缩盒子对象的子元素的排列方式*/
          -webkit-box-orient: vertical;
        }
      }
      .info_footer {
        display: flex;
        justify-content: center;
        .footer_flex {
          font-size: 1.8em;
          width: 20em;
          display: flex;
          justify-content: space-between;
          text-align: center;
          li {
            & > p:not(.word) {
              color: #fff;
            }
            & > .word {
              font-size: 0.8em;
              color: rgb(196, 191, 191);
            }
          }
        }
      }
    }
  }
  .bar {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 1em;
    .bar_flex {
      width: 30%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 1.3em;
      font-weight: bold;
      li {
        height: 2em;
        line-height: 2em;
        cursor: pointer;
        user-select: none;
        &.active {
          color: rgb(226, 63, 63);
        }
      }
    }
  }
  .button_wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    .button {
      display: flex;
      width: 65%;
      button {
        margin-left: auto;
        margin-right: 3em;
        padding: 0.5em 1.3em;
        border-radius: 1em;
        color: whitesmoke;
        background-color: rgb(250, 83, 83);
      }
    }
  }
  .songList_wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    .songList {
      width: 65%;
    }
  }
}
</style>