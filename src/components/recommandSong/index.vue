<template>
  <div id="wrapper">
    <p id="title">推荐新歌曲</p>
    <div id="body">
      <div id="item"
           v-for="(item, index) in recommandSong"
           :key="item[0].id"
           @click="currentSong(item, index)">
        <div id="avatar" @click="PlayOrPause">
          <el-image style="width: 80px; height: 80px;"
                    :src="item[0].al.picUrl"
                    fit="fill"
                    class="img"></el-image>
          <i class="el-icon-video-play"
             
             v-if="playIndex!=index && !playing"></i>
          <i class="el-icon-video-pause"
             v-else></i>
        </div>
        <div id="songInfo">
          <p id="song">{{ item[0].name}}</p>
          <p id="singer">{{ item[0].ar[0].name }}</p>
        </div>
        <p id="duration">{{ item.dt }}</p>
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
      playIndex: -1
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
    PlayOrPause() {
      this.isPlay = !this.isPlay
      if (!this.isPlay) {
        this.$store.commit('player/CHANGEPLAYING', false)
      }
    },
    async currentSong(item, index) {
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
  }
}
</script>

<style lang="scss" scoped>
#wrapper {
  width: 100%;
  user-select: none;
  #title {
    margin: 60px 0 30px;
    font-size: 20px;
  }
  #body {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    #item {
      height: 80px;
      flex: 0 0 50%;
      position: relative;
      margin-bottom: 15px;
      #songInfo {
        position: absolute;
        left: 150px;
        top: 0;
        height: 80px;
        line-height: 80px;
        #song {
          width: 350px;
          height: 40px;
          line-height: 40px;
          font-size: 15px;
          font-weight: bold;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;       
        }
        #singer {
          height: 40px;
          line-height: 40px;

        }
      }
      #avatar {
        width: 80px;
        height: 80px;
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
            display:block;
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
      #duration {
        position: absolute;
        top: 40px;
        right: 40px;
        font-weight: bold;
      }
    }
  }
}
</style>