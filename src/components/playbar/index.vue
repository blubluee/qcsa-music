<template>
  <div class="wrapper">
    <div class="player">
      <div class="player-left">
        <span class="iconfont icon-shangyishou"></span>
        <span v-if="!playing"
              class="iconfont icon-24gf-playCircle play"
              @click="playOrPause('play')"></span>
        <span v-else
              class="iconfont icon-zanting play"
              @click="playOrPause('pause')"></span>
        <span class="iconfont icon-xiayishou"></span>
      </div>
      <div class="player-middle">
        <div class="img">
          <el-image :src="(currentSong[0] && currentSong[0].al && currentSong[0].al.picUrl)"
                    fit="cover"
                    style="width:50px;height:50px;border-radius:5px;"></el-image>
        </div>
        <div class="play-body">
          <div class="songInfo">
            <div>
              <span class="song">{{ (currentSong[0] && currentSong[0].al && currentSong[0].al.name) || "" }}</span>
              <span class="singer">{{ (currentSong[0] && currentSong[0].ar[0] &&  currentSong[0].ar[0].name) || "" }}</span>
            </div>
            <div class="time"><span>{{ currentPro }} / {{currentSong[0] && currentSong[0].dt || ""}}</span></div>
          </div>
          <div class="progress-wrapper">
            <el-slider v-model="process"
                       class="slider"
                       :min="0"
                       :max="100"
                       :show-tooltip="false"
                       @change="changeProcess"></el-slider>
            <!-- :format-tooltip="formatTime" -->
          </div>
        </div>
      </div>
      <div class="player-right">
        <div class="volume"><span class="iconfont icon-shengyin"></span></div>
        <div class="volume-wrapper">
          <el-slider v-model="volume"
                     class="slider"
                      @change="changeVolume"></el-slider>
        </div>
        <div class="mode"
             @click="changeMode">
          <span class="iconfont icon-shunxubofang"
                v-show="mode===0"></span>
          <span class="iconfont icon-24gl-repeat  "
                v-show="mode===1"></span>
          <span class="iconfont icon-suijibofang"
                v-show="mode===2"></span>
        </div>
        <div class="lyric"><span class="iconfont icon-geci"></span></div>
        <div class="list"><span class="iconfont icon-24gl-playlistHeart"></span></div>
      </div>
    </div>
    <audio :src="musicUrl"
           @playing="audioPlay"
           @ended="audioEnd"
           @pause="audioPause"
           ref="audio"></audio>
  </div>
</template>

<script>
import BarProgress from './bar-progress'
import util from '@/util/util'
import { mapState, mapGetters } from 'vuex'
export default {
  data () {
    return {
      process: 0, //  播放进度
      currentTime: 0, //  目前播放时间（毫秒）
      volume: 50, //  音量大小
      mode: 0,  //  播放模式
    }
  },
  mounted () {
    const audio = this.$refs.audio
    audio.addEventListener('timeupdate', () => {
      this.currentTime = Math.round(audio.currentTime) || 0
      const duration = audio.duration || 1
      this.process = (this.currentTime / duration * 100).toFixed(15)
      this.process = Number(this.process)
    })
  },
  components: {
    BarProgress
  },
  methods: {
    formatTime (value) {
      return util.formatSecond(value)
    },
    // 改变播放模式
    changeMode () {
      this.mode++
      if (this.mode > 2) {
        this.mode = 0
      }
    },
    playOrPause (type) {
      if (type === 'play') {
        this.$store.commit('player/CHANGEPLAYING', true)
      } else {
        this.$store.commit('player/CHANGEPLAYING', false)
      }
    },
    // 音乐播放事件
    audioPlay () {

    },
    // 音乐暂停事件
    audioPause () {

    },
    // 音乐结束事件
    audioEnd () {

    },
    // 改变进度
    changeProcess (value) {
      this.process = value
      console.log(value);
      const audio = this.$refs.audio
      this.currentTime = audio.duration * (value / 100)
      audio.currentTime = this.currentTime
    },
    // 改变音量
    changeVolume(newValue) {
      const value = newValue / 100
      const audio = this.$refs.audio
      this.volume = newValue
      audio.volume = value
      console.log(audio.volume);
    }
  },
  computed: {
    // format当前进度
    currentPro () {
      return util.formatSecond(this.currentTime * 1000)
    },
    totalTime () {
      this.$nextTick(() => {
        const audio = this.$refs.audio
        return audio.duration
      })
    },
    // process() {
    //   if (this.playing) {
    //     const audio = this.$refs.audio
    //     const duration = audio.duration
    //     const currentTime = audio.currentTime
    //     return currentTime / duration * 100
    //   } else {
    //     return 0
    //   }
    // },
    ...mapState({
      currentSong: (state) => state.player.currentSong,
      musicUrl: (state) => state.player.url
    }),
    ...mapGetters({
      playing: 'player/playing'
    })
  },
  watch: {
    playing: {
      handler (newValue) {
        this.$nextTick(() => {
          const audio = this.$refs.audio
          newValue ? audio.play() : audio.pause()
        })
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.wrapper {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 5em;
  box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.1);
  background-color: rgba(255, 255, 255, 0.95);
  display: flex;
  align-content: center;
  .player {
    display: flex;
    align-items: center;
    width: 65%;
    margin: 0 auto;
    .player-left {
      height: 100%;
      display: flex;
      align-items: center;
      span {
        font-size: 1.6em;
        color: rgb(255, 30, 30);
        cursor: pointer;
      }
      .play {
        font-size: 3em;
        margin: 0 0.5em;
      }
    }
    .player-middle {
      display: flex;
      width: 60%;
      justify-content: space-between;
      margin-right: 1em;
      .img {
        width: 50px;
        height: 50px;
        margin: 0 0.5em;
      }
      .play-body {
        width: 100%;
        padding: 0 0.5em 0 0;
        .progress-wrapper {
          width: 100%;
          height: 60%;
          display: flex;
          // justify-content: center;
          align-items: center;
          font-size: 1.2em;
          padding: 0 0.3em;
          .slider {
            width: 100%;
          }
        }
        .songInfo {
          width: 100%;
          display: flex;
          justify-content: space-between;
          .song {
            font-weight: bold;
            margin-right: 0.6em;
          }
          .singer {
            font-size: 0.9em;
            color: rgb(179, 179, 179);
          }
          .time {
            i {
              margin: 0 0.3em;
            }
          }
        }
      }
    }
    .player-right {
      display: flex;
      width: 35%;
      justify-content: space-between;
      .volume-wrapper {
        width: 45%;
        height: auto;
        display: flex;
        align-items: center;
        font-size: 1.13em;
        .slider {
          width: 100%;
        }
      }
      div {
        display: flex;
        align-items: center;
        cursor: pointer;
        span {
          font-size: 1.2em;
        }
      }
    }
  }
}
</style>