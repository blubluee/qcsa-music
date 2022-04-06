<template>
  <div class="wrapper">
    <div class="nav">
      <div class="nav_left" @click="isShowDrawer=!isShowDrawer"><span>{{ currentCat }}</span><i class="el-icon-arrow-down"
           style="margin-left:10px"></i></div>
      <div class="nav_middle">
        <span @click="getSongListBytag('全部')">{{ initialCat }}</span>
        <span>热门标签：</span>
        <li v-for="(item, index) in hotTagList"
            :key="index">
          <a @click="getSongListBytag(item)">{{item}}</a>
        </li>
      </div>
      <div class="nav_right">
        <span id="hot"
              :class="{active:isHot}"
              @click="isHot=true;">热门</span>
        <span id="new"
              :class="{active:!isHot}"
              @click="isHot=false;">最新</span>
      </div>
    </div>
    <Songsheet :recommandList="playlists"></Songsheet>
    <div class="pagination">
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="offset"
                     :page-sizes="[32, 40, 56]"
                     :page-size="limit"
                     layout="jumper, prev, pager, next, ->, sizes, total"
                     :total="pageTotal">
      </el-pagination>
    </div>
    <div class="drawer" v-show="isShowDrawer">
      <div class="type"
           v-for="(item, index) in typeList"
           :key="index">
        <h2><i :class="item.icon" style="margin-right:4px"></i>
        <span>{{ item.tag }}</span></h2>
        <div class="tags">
          <span v-for="(tag, index) in item.tagList"
              :key="index"
              @click="getSongListBytag(tag)">{{ tag }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Songsheet from '@/components/songsheet'
export default {
  data () {
    return {
      // 热门歌单标签
      hotTagList: [],
      isHot: true,
      sortType: 'hot',
      currentCat: '全部',
      initialCat: '全部',
      offset: 0,
      limit: 40,
      pageTotal: 0,
      playlists: [],
      type: {},
      sub: [],
      typeList: {},
      isShowDrawer: false
    }
  },
  components: {
    Songsheet
  },
  mounted () {
    // 获取热门标签
    this.getSongListTag()
    // 获取全部歌单
    this.getSongList()
    // 获取歌单分类
    this.getSongsCat()
  },
  methods: {
    // 获取热门歌单标签
    async getSongListTag () {
      try {
        const result = await this.$API.songlist.reqHotList()
        if (result.code === 200) {
          this.hotTagList = result.tags.map((item) => {
            return item.name
          })
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 获取歌单（默认全部）
    async getSongList () {
      const params = {
        order: this.sortType,
        cat: this.currentCat,
        limit: this.limit,
        offset: this.offset
      }
      try {
        const result = await this.$API.songlist.reqSongList(params)
        if (result.code === 200) {
          this.playlists = result.playlists
          this.pageTotal = result.total
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 获取歌单分类
    async getSongsCat () {
      const result = await this.$API.songlist.reqSonglistCatogory()
      if (result.code === 200) {
        this.sub = result.sub
        this.type = result.categories
      }
    },
    getSongListBytag(tag) {
      this.currentCat = tag
      this.limit = 32
      this.offset = 0
      this.currentCat = tag
      this.isShowDrawer = false
      this.getSongList()
    },
    // 分页器处理函数
    handleSizeChange (val) {
      this.limit = val
      this.getSongList()
    },
    handleCurrentChange (val) {
      this.offset = val
      this.getSongList()
    }
  },
  watch: {
    type: {
      immediate: true,
      handler (newVal, oldVal) {
        // 整理数据
        newVal.icon0 = 'iconfont icon-yuyan'
        newVal.icon1 = 'iconfont icon-fenggepitchon'
        newVal.icon2 = 'iconfont icon-changjing'
        newVal.icon3 = 'iconfont icon-qingganganqing'
        newVal.icon4 = 'iconfont icon-zhuti'
        let arr = new Array()
        for (let i = 0; i < 5; i++) {
          arr[i] = new Array()
        }
        for (let item of this.sub) {
          arr[item.category].push(item.name)
        }
        this.type.typeList = arr
        for (let i = 0; i < 5; i++) {
          this.typeList[i] = {}
          this.typeList[i].tag = this.type[i]
          this.typeList[i].icon = this.type[`icon${i}`]
          this.typeList[i].tagList = this.type.typeList[i]
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  position: relative;
  .drawer {
    position: absolute;
    width: 680px;
    height: 400px;
    top: 48px;
    box-shadow: 0 0 40px 0px rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    background-color: #fff;
    z-index: 999;
    overflow: scroll;
    user-select: none;
    .type {
      padding: 16px;
      .tags {
        display: flex;
        // height: 100px;
        flex-wrap: wrap;
        span {
          display: inline-block;
          width: auto;
          height: auto;
          margin: 10px 20px 0px 0;
          padding: 8px 15px;
          border-radius: 16px;
          background-color: rgb(245, 245, 245);
          cursor: pointer;
          &:hover {
            background-color: rgb(104, 135, 236);
          }
        }
      }
    }
  }
  .pagination {
    max-width: 750px;
    margin: 0 auto;
  }
  .nav {
    display: flex;
    font-size: 16px;
    width: 100%;
    height: 38px;
    background-color: #fff;
    box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0.1);
    position: relative;
    border-radius: 5px;
    margin-bottom: 20px;
    .nav_left {
      width: 75px;
      height: 100%;
      line-height: 38px;
      color: rgb(250, 241, 241);
      background-color: red;
      text-align: center;
      border-radius: 5px;
      cursor: pointer;
      user-select: none;
    }
    .nav_middle {
      display: flex;
      height: 100%;
      line-height: 38px;
      margin-left: 25px;
      span:first-child {
        margin: 0 24px 0 10px;
        user-select: none;
        cursor: pointer;
        &:hover {
          color: rgb(218, 80, 80);
        }
      }
      span {
        margin-right: 7px;
        user-select: none;
      }
      a {
        margin-right: 15px;
        cursor: pointer;
        &:hover {
          color: rgb(218, 80, 80);
        }
      }
    }
    .nav_right {
      height: 100%;
      cursor: pointer;
      user-select: none;
      span:first-of-type {
        display: inline-block;
        position: absolute;
        top: 4px;
        right: 85px;
        width: 40px;
        height: 30px;
        line-height: 30px;
        background-color: rgb(243, 243, 243);
        border-radius: 5px;
        text-align: center;
      }
      span:last-of-type {
        display: inline-block;
        position: absolute;
        top: 4px;
        right: 30px;
        width: 40px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border-radius: 5px;
        background-color: rgb(243, 243, 243);
      }
      #hot.active {
        background-color: red;
        color: rgb(250, 241, 241);
      }
      #new.active {
        color: rgb(250, 241, 241);
        background-color: red;
      }
    }
  }
}
</style>