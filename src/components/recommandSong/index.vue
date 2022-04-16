<template>
  <div class="rs-wrapper">
    <p class="title">推荐新歌曲</p>
    <div class="body"
         v-show="!loading">
      <div class="item"
           v-for="(item, index) in recommandSong"
           :key="item[0].id"
           @click="currentSong(item, index)">
        <div class="avatar"
             @click="PlayOrPause">
          <el-image style="width: 80px; height: 80px;"
                    :src="item[0].al && item[0].al.picUrl"
                    fit="fill"
                    class="img"></el-image>
          <i class="el-icon-video-play"
             v-if="playIndex!=index && !playing"></i>
          <i class="el-icon-video-pause"
             v-else></i>
        </div>
        <div class="songInfo">
          <p class="song">{{ item[0].name}}</p>
          <div style="display: flex; align-items: center; justify-content:space-between">
            <p class="singer">{{ item[0].ar[0].name }}</p>
            <p class="duration">{{ item.dt }}</p>
          </div>
        </div>

      </div>
    </div>
    <div class="body loading"
         v-show="loading">
      <div class="item"
           v-for="item in 10"
           :key="item">
        <div class="avatar">
        </div>
        <div class="songInfo">
          <p class="song"></p>
          <div class="songInfo_bot"
               style="display: flex; align-items: center; justify-content:space-between">

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import util from '@/util/util'
import { mapGetters, mapState } from 'vuex'
export default {
  data () {
    return {
      recommandSong: [],
      playIndex: -1,
      loading: true
    }
  },
  mounted () {
    this.getRecommandSong()
  },
  methods: {
    // 获取歌曲信息
    async getRecommandSong () {
      try {
        const result = await this.$API.music.reqRecommandSong()
        if (result.code === 200) {
          let idList = []
          result.result.map((item) => {
            if (item.id) {
              idList.push(item.id)
            }
            return;
          })
          this.getSongInfo(idList)
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 获取歌曲详情
    async getSongInfo (idList) {
      try {
        for (let item of idList) {
          let result = await this.$API.music.reqSongInfo(item)
          if (result.code === 200) {
            result.songs.dt = this.getTime(result.songs[0].dt)
            this.recommandSong.push(result.songs)
          }
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 获取格式化后的歌曲时长
    getTime (time) {
      return util.formatSecond(time)
    },
    PlayOrPause () {
      this.isPlay = !this.isPlay
      if (!this.isPlay) {
        this.$store.commit('player/CHANGEPLAYING', false)
      }
    },
    async currentSong (item, index) {
      // 如果歌曲正在播放，则暂停播放
      if (this.playIndex === index) {
        this.playIndex = -1
        this.$store.commit('player/CHANGEPLAYING', false)
        return;
      }
      // 如果歌曲还未播放，则播放歌曲
      await this.$store.dispatch('player/getMusicUrl', item[0].id)
      item[0].dt = item.dt
      this.playIndex = index
      this.$store.commit('player/CURRENTSONGINFO', item)
      this.$store.commit('player/CHANGEPLAYING', true)
    }
  },
  computed: {
    ...mapState({
      playing: (state) => state.player.playing
    })
  },
  watch: {
    recommandSong (newValue) {
      if (newValue != {}) {
        setTimeout(() => {
          this.loading = false
        }, 500);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$loading-gray: #ededed;
.rs-wrapper {
  width: 100%;
  user-select: none;
  .title {
    margin: 60px 0 30px;
    font-size: 20px;
  }
  .body {
    // width: 65%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    // .item:nth-of-type(2n+1) {
    //   margin-right: 0.5em;
    // }
    .item {
      // width: 50%;
      display: flex;
      height: 80px;
      flex: 0 1 49%;
      // position: relative;
      margin-bottom: 15px;
      .songInfo {
        height: 80px;
        line-height: 80px;
        padding-left: 2em;
        .song {
          width: 350px;
          height: 40px;
          line-height: 40px;
          font-size: 15px;
          font-weight: bold;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
        .singer {
          height: 40px;
          line-height: 40px;
        }
      }
      .avatar {
        width: 80px;
        height: 80px;
        margin: 0;
        position: relative;
        i {
          display: none;
          font-size: 35px;
          position: absolute;
          left: 22px;
          top: 22px;
          color: rgb(101, 125, 192);
        }
        &:hover {
          i {
            display: block;
            font-size: 35px;
          }
          & .img::after {
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            width: 80px;
            height: 80px;
            z-index: 100;
            background-color: rgba(0, 0, 0, 0.2);
            i {
              display: inline;
            }
          }
        }
      }
      .duration {
        // position: absolute;
        // top: 40px;
        // right: 40px;
        margin-right: 1em;
        font-weight: bold;
        line-height: 1em;
      }
    }
  }
}
.avatar:empty,
.song:empty,
.songInfo_bot:empty {
  background-color: $loading-gray;
  background: linear-gradient(
      100deg,
      rgba(255, 255, 255, 0) 40%,
      rgba(255, 255, 255, 0.5) 50%,
      rgba(255, 255, 255, 0) 60%
    )
    $loading-gray;
  background-size: 200% 100%;
  background-position-x: 180%;
  animation: 1s loading ease-in-out infinite;
}

@keyframes loading {
  to {
    background-position-x: -20%;
  }
}

.avatar:empty {
  width: 80px;
  height: 80px;
  animation-delay: 0.1s;
}

.song:empty {
  width: 6em !important;
  height: 2em !important;
  margin-top: 0.3em;
  margin-bottom: 1em;
  animation-delay: .1s;
}

.songInfo_bot:empty {
  width: 20em !important;
  height: 2em !important;
  animation-delay: .15s;
}
</style>