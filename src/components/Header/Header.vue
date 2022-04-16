<template>
  <div class="wra">
    <div id="wrapper">
      <router-link id="logo"
                   :to="{name:'music'}"
                   custom><img src="@/assets/images/logo.png"></router-link>
      <Bar></Bar>
      <div id='middle'>
        <el-button type="text"
                   icon="el-icon-search"
                   size="medium"
                   plain
                   style="color:#4a4a4a"
                   @click="showSearch">搜索</el-button>
      </div>
      <div id="right"
           v-if="!loginStatu">
        <div>
          <router-link :to="{ name: 'login' }"
                       custom>登录</router-link>
        </div>
      </div>
      <div v-else
           id="right_login">
        <div>
          <el-avatar shape='square'
                     size="large"
                     :src="profile.avatarUrl"
                     id="avatar"></el-avatar>
        </div>

        <el-dropdown trigger="click"
                     @command="handleCommand">
          <span class="el-dropdown-link">
            <span id="userName">{{profile.nickname}}</span><i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown"
                            id="opList"
                            style="user-select:none">
            <el-dropdown-item icon="el-icon-user"
                              command="personal">个人主页</el-dropdown-item>
            <el-dropdown-item icon="el-icon-medal">我的等级</el-dropdown-item>
            <el-dropdown-item icon="el-icon-setting">个人设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-switch-button"
                              divided
                              command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="wrapper-search"
           v-show="isSearch">
        <div class="main">
          <div class="above">
            <div><input type="text"
                     v-model="keyword"
                     placeholder="请输入关键字并回车"
                     v-on:keyup.enter="search"></div>
          </div>
          <div class="below">
            <div class="body-below">
              <div class="history">
                <div class="his-header">
                  <h2><i class="el-icon-time"
                       style="color:red"></i><span>历史搜索</span></h2>
                </div>
                <div class="his-tags">
                  <el-tag closable
                          @close="closeTag(index)"
                          type="info"
                          size="small"
                          class="tags"
                          v-for="(item, index) in tags" :key="index">{{ item }}
                  </el-tag>
                </div>
              </div>
              <div class="hot">
                <div class="hot-header">
                  <h2><i class="el-icon-star-off"
                       style="color:red"></i><span>热门搜索</span></h2>
                </div>
                <div class="hot-tags">
                  <el-tag closable
                          type="info"
                          size="small"
                          class="tags"
                          v-for="(item, index) in hotSearch"
                          :key="index"
                          style="margin: 0 10px 8px 0;">{{ item.first }}
                  </el-tag>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="shadow"
           v-show="isSearch"
           @click="isSearch=false"></div>
    </div>
  </div>
</template>

<script>
import { Message } from 'element-ui'
import { mapState } from 'vuex'
import Bar from './Bar'
export default {
  data () {
    return {
      isOpen: false,
      isSearch: false,
      hotSearch: [],
      keyword: "",
    }
  },
  components: {
    Bar,
  },
  mounted () {
    // 刷新后根据用户登录状态和cookie获取用户信息
    const id = localStorage.getItem('id')
    const loginStatu = localStorage.getItem('loginStatu')
    if (id && loginStatu) {
      this.getUserInfo(id)
    }
  },
  computed: {
    ...mapState({
      profile: (state) => state.user.profile,
      tags: (state) => state.music.keywordList
    }),
    // 获取用户登录状态
    loginStatu () {
      return window.localStorage.getItem('loginStatu')
    }
  },
  methods: {
    async handleCommand (command) {
      switch (command) {
        case 'logout':
          const result = await this.$API.user.reqLogout()
          if (result.code === 200) {
            this.$router.push({ name: 'login' })
            localStorage.setItem('loginStatu', false)
            localStorage.setItem('token', '')
          }
          break;
        case 'personal':
          this.$router.push({ name: 'personal' })
          break;
        default:
          break;
      }
    },
    async getUserInfo (id) {
      try {
        await this.$store.dispatch("user/getUserInfo", id)
      } catch (err) {
        Message({
          message: "请求超时",
          type: 'error',
          duration: 3 * 1000
        })
        console.log(err);
      }
    },
    // 获取热搜关键词列表
    async getHotSearchList () {
      const result = await this.$API.music.reqHotSearchList()
      if (result.code === 200) {
        this.hotSearch = result.result.hots
      }
    },
    search () {
      this.isSearch = false
      this.$store.dispatch('music/saveSearchList', this.keyword)
    },
    // 显示搜索框
    showSearch () {
      this.isSearch = true
      this.keyword = ''
      this.getHotSearchList()
    },
    closeTag(index) {
      this.$store.commit('music/DELETEKEYWORD', index)
    }
  }
}
</script>
<style lang="scss" scoped>
.wra {
  width: 100%;
  #wrapper {
    width: 65%;
    margin: 0 auto; 
    position: relative;
    display: flex;
    user-select: none;

    .wrapper-search {
      width: 55vw;
      height: auto;
      position: fixed;
      top: 18%;
      left: 22%;
      z-index: 10000;
      .main {
        // width: 50%;
        height: 500px;
        border-radius: 5px;
        z-index: 10000;
        .above {
          width: 100%;
          height: 45%;
          position: relative;
          background-image: url("~@/assets/images/search-bg.png");
          background-size: cover;
          background-position: center;
          div {
            min-width: 70%;
            height: 25%;
            text-align: center;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            input {
              width: 100%;
              height: 100%;
              font-size: 18px;
              font-weight: 700;
              text-align: center;
              border-color: transparent;
              color: rgb(241, 241, 241);
              background-color: rgba(255, 255, 255, 0.05);
            }
          }
        }
        .below {
          width: 100%;
          height: 55%;
          position: relative;
          background-color: #fff;
          box-shadow: 0 0 20px 0 gray;
          .body-below {
            width: 90%;
            height: 80%;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            .history {
              width: 100%;
              height: 50%;
              .his-header {
                h2 {
                  margin-bottom: 18px;
                  i {
                    margin-right: 8px;
                  }
                }
              }
              .his-tags {
                cursor: pointer;
                .tags {
                  color: rgb(133, 133, 133);
                  &:hover {
                    color: rgb(182, 182, 182);
                  }
                }
              }
            }
            .hot {
              width: 100%;
              height: 50%;
              .hot-header {
                h2 {
                  margin-bottom: 18px;
                  i {
                    margin-right: 8px;
                  }
                }
              }
              .hot-tags {
                cursor: pointer;
                .tags {
                  color: rgb(133, 133, 133);
                  &:hover {
                    color: rgb(182, 182, 182);
                  }
                }
              }
            }
          }
        }
      }
    }
    .shadow {
      width: 100vw;
      height: 100vh;
      background-color: rgba(138, 138, 138, 0.2);
      position: fixed;
      top: 0;
      left: 0;
      z-index: 9999;
    }
    #logo {
      img {
        width: 200px;
        margin-top: 5.5px;
        cursor: pointer;
      }
    }
    #middle {
      position: absolute;
      right: 140px;
      height: 50px;
      line-height: 50px;
      // margin-left: 100px;
      span {
        line-height: 50px;
        margin-left: 30px;
        color: rgb(202, 202, 190);
      }
    }
    #right {
      height: 50px;
      line-height: 50px;
      position: absolute;
      right: 0px;
      margin-left: 20px;

      a {
        cursor: pointer;
        &:hover {
          color: rgb(235, 37, 37);
        }
      }
    }
    #right_login {
      display: flex;
      position: absolute;
      right: 0;
      height: 50px;
      line-height: 50px;
      cursor: pointer;
      user-select: none;
      #avatar {
        margin: 5px 0 0;
      }
      #userName {
        margin: 0 10px;
      }
      i {
        margin-top: 18px;
      }
    }
  }
}
</style>