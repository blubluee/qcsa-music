<template>
  <div class="wrapper">
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
                      type="info"
                      size="small"
                      class="tags">{{ 'text' }}
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
                      v-for="(item, index) in hotwordList"
                      :key="index"
                      style="margin: 0 10px 8px 0;">{{ item.first }}
              </el-tag>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      keyword: "",
    }
  },
  props: {
    hotwordList: {
      type: Array,
      require
    }
  },
  methods: {
    search() {
      this.$store.commit('music/SAVESEARCHHIS', this.keyword)
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  width: 55vw;
  height: 100vh;
  .main {
    // width: 50%;
    height: 65%;
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
</style>