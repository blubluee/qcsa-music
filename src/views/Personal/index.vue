<template>
  <div class="wra">
    <div class="wrapper">
      <img src="@/assets/images/search-bg.png"
           class="bg">
      <div class="grid">
        <div class="record">
          <div class="header">
            <span>听歌排行<span>（累计听歌{{ songRecord.length }}首）</span></span>
            <span><a :class="{active:isActive}">最近一周</a><a>所有时间</a></span>
          </div>
          <div class="body">
            <SongList :list="songRecord"
                      v-if="songRecord.length>0"></SongList>
            <el-empty description="有没有一种可能是网卡了"
                      v-else></el-empty>
          </div>
        </div>
        <div class="right">
          <div class="info">
            <img :src="profile.backgroundUrl">
            <div class="info-body">
              <div class="info-header">
                <img :src="profile.avatarUrl">
                <span>{{ profile.nickname }}</span>
                <a>签到</a>
              </div>
              <div class="info-middle">
                <p>等级：<span style="font-weight:bolder;font-style:italic;font-size:1.1em;">level {{infoById.level}}</span></p>
                <p>年龄：<span style="font-weight:bolder;font-style:italic;font-size:1.1em;">{{ age }}后</span></p>
                <p>性别：<span style="font-weight:bolder;font-style:italic;font-size:1.1em;">{{ gender }}</span></p>
              </div>
              <div class="info-footer">
                <div>
                  <p>动态</p>
                  <p>{{ infoById.profile && infoById.profile.eventCount }}</p>
                </div>
                <div>
                  <p>关注</p>
                  <p>{{ infoById.profile && infoById.profile.follows }}</p>
                </div>
                <div>
                  <p>粉丝</p>
                  <p>{{ infoById.profile && infoById.profile.followeds }}</p>
                </div>
              </div>
              <div class="button">
                <button>个人设置</button>
                <button>我的等级</button>
              </div>
            </div>
          </div>
          <div class="songsheet">
            <div class="ss-wrapper">
              <div class="header">我创建的歌单</div>
            </div>
            <Songsheet :recommandList='userSongsheet'
                       :isTwo="true"></Songsheet>
          </div>
          <div class="songsheet like">
            <div class="ss-wrapper">
              <div class="header">我收藏的歌单</div>
            </div>
            <Songsheet :recommandList='userSubSongsheet'
                       :isTwo="true"></Songsheet>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import util from '@/util/util'
import Songsheet from '@/components/songsheet'
import SongList from '@/components/songList'
export default {
  data () {
    return {
      isActive: true,
      account: {},
      profile: {},
      infoById: {},
      userSongsheet: [],  //用户自己创建的歌单
      userSubSongsheet: [],  //用户收藏的歌单
      songRecord: [],  //用户听歌记录
    }
  },
  components: {
    Songsheet,
    SongList
  },
  mounted () {
    this.getIdInfo()
    this.getInfoById()
    this.getUserSongsheet()
    this.getUserSongRecord()
  },
  methods: {
    // 获取账号信息
    async getIdInfo () {
      try {
        const result = await this.$API.user.reqIdInfo()
        if (result.code === 200) {
          this.account = result.account
          this.profile = result.profile
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 根据id获取用户信息
    async getInfoById () {
      try {
        const id = localStorage.getItem('id')
        const result = await this.$API.user.reqInfoById(id)
        if (result.code === 200) {
          this.infoById = result
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 获取用户歌单
    async getUserSongsheet () {
      try {
        const id = localStorage.getItem('id')
        const result = await this.$API.user.reqUserSongsheet(id)
        if (result.code === 200) {
          this.userSongsheet = result.playlist.filter((item, index, array) => {
            return !item.subscribed
          })
          this.userSubSongsheet = result.playlist.filter((item, index, array) => {
            return this.profile.nickname !== item.creator.nickname
          })
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 获取用户听歌记录
    async getUserSongRecord () {
      try {
        const id = localStorage.getItem('id')
        const result = await this.$API.user.reqUserSongRecord(id)
        if (result.code === 200) {
          this.songRecord = result.allData
          for (const item of this.songRecord) {
            if (item.song) {
              item.song.dt = util.formatSecond(item.song.dt)
            }
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  },
  computed: {
    age () {
      return util.formatTime(this.profile.birthday)
    },
    gender () {
      return this.profile.gender === 1 ? '男' : '女'
    }
  }
}
</script>

<style lang="scss" scoped>
.wra {
  width: 100vw;
  .wrapper {
    width: 65%;
    margin: 0 auto;
    height: auto;
    .bg {
      position: absolute;
      width: 100vw;
      height: 300px;
      left: 0;
      top: 70px;
    }
    .grid {
      margin: 0;
      position: relative;
      height: auto;
      top: 18em;
      display: flex;
      // // grid-template-rows: ;
      // grid-template-columns: 4fr 2fr;
      // grid-gap: 1.5em;
      // margin-bottom: 200px;
      .record {
        // grid-row: auto;
        // grid-column: 1;
        width: 65%;
        border-radius: 5px;
        box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.1);
        .header {
          display: flex;
          margin: 0.7em 0.8em;
          > span:nth-of-type(1) {
            font-weight: bolder;
            padding-left: 1em;
            border-left: 3px solid red;
            span {
              font-weight: 200;
              font-size: 0.9em;
            }
          }
          span:nth-of-type(2) {
            margin-left: auto;
            > a + a {
              padding-left: 1em;
              border-left: 1px solid rgb(95, 94, 94);
            }
            a:nth-of-type(1) {
              padding-right: 1em;
            }
            a.active {
              color: red;
            }
          }
        }
        .body {
          width: 100%;
          margin: 0;
          
        }
      }
      .right {
        box-sizing: border-box;
        width: 35%;
        height: 100%;
        margin-left: 0.5em;
        .info {
          position: relative;
          margin-bottom: 1em;
          height: 100%;
          img {
            position: static;
            width: 100%;
            background-size: contain;
            border-radius: 5px;
          }
          .info-body {
            width: 100%;
            // height: 60%;
            position: absolute;
            top: 40%;
            background-color: #fff;
            box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.1);
            padding: 10px;
            border-radius: 5px;
            .info-header {
              display: flex;
              img {
                width: 50px;
                height: 50px;
                margin-top: -20px;
                margin-right: 10px;
                border-radius: 5px;
              }
              span {
                font-size: 1.1em;
                font-weight: bold;
              }
              a {
                height: 100%;
                padding: 3px 5px;
                margin-top: -3px;
                border-radius: 5px;
                color: rgb(236, 236, 236);
                background-color: rgb(245, 78, 78);
                margin-left: auto;
              }
            }
            .info-middle {
              width: 100%;
              height: auto;
              padding: 0 10px;
              font-size: 0.8em;
              margin-bottom: 16px;
              :not(p:nth-of-type(3)) {
                margin-bottom: 3px;
              }
            }
            .info-footer {
              display: flex;
              width: 100%;
              padding: 0 40px;
              justify-content: space-between;
              color: rgb(194, 193, 193);
              div {
                text-align: center;
              }
            }
            .button {
              width: 100%;
              padding: 10px 30px 0;
              display: flex;
              justify-content: space-around;
              button {
                display: inline-block;
                width: 80px;
                height: 2em;
                line-height: 1;
                border-radius: 5px;
                color: rgb(236, 236, 236);
                background-color: rgb(245, 78, 78);
              }
            }
          }
        }
        .songsheet {
          padding: 10px;
          margin-bottom: 1em;
          box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.1);
          border-radius: 5px;
          .ss-wrapper {
            .header {
              padding-left: 0.5em;
              border-left: 3px solid red;
              font-size: 0.9em;
              font-weight: bold;
              margin-bottom: 10px;
            }
          }
        }
      }
    }
  }
}
</style>