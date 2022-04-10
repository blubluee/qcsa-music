<template>
  <div class="wrapper">
    <div class="nav">
      <div class="nav_left"
           @click="isShowDrawer=!isShowDrawer"><span>全部分类</span><i class="el-icon-arrow-down"
           style="margin-left:10px"></i></div>
      <div class="nav_middle"><span>当前分类：</span></div>
      <div class="currentCat"><span>{{ currentCat }}</span></div>
    </div>
    <!-- <div class="nav">
      <span v-for="(item, index) in langs"
            :key="index"
            :class="{active:currentIndex1==index}"
            @click="handleTag(item.value, 'area', 'currentIndex1', index)">{{ item.label }}</span>
    </div> -->
    <div class="video">
          <Video :videoList="videoList"></Video>
    </div>
    <div class="pagination">
      <button :disabled="offset<=0" @click="changePage('prev')">上一页</button>
      <button @click="changePage('next')">下一页</button>
    </div>
    <div class="drawer"
         v-show="isShowDrawer">
      <span v-for="(item, index) in tagList"
            :key="index"
            @click="clickTag(item.name, item.id)">{{ item.name }}</span>
    </div>
  </div>
</template>

<script>
import Video from '@/components/video'
export default {
  data () {
    return {
      currentCat: '全部',
      isShowDrawer: false,
      videoList: [],
      tagList: [],
      // area: ['全部', '内地', '港台', '欧美', '日本', '韩国'],
      // type: ['全部', '官方', '原生', '现场', '网易出品'],
      // order: ['上升最快', '最热', '最新'],
      // limit: 30,
      offset: 0,
      videoId: 9104
    }
  },
  components: {
    Video
  },
  mounted () {
    try {
      this.getVideoTagList()
      this.getAllVideo()
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    // 获取视频标签列表
    async getVideoTagList () {
      const result = await this.$API.video.reqVideoTagList()
      if (result.code === 200) {
        this.tagList = result.data
        this.tagList.unshift({name:'全部'})
      }
    },
    // 获取标签下的视频
    async getViderByTag () {
      let param = {}
      param.id = this.videoId
      param.offset = this.offset
      const result = await this.$API.video.reqVideoByTagOrCat(param)
      if (result.code === 200) {
        this.videoList = result.datas
      }
    },
    // 获取全部视频列表
    async getAllVideo () {
      const result = await this.$API.video.reqAllVideoList()
      if (result.code === 200) {
        this.videoList = result.datas
      }
    },
    // 获取视频
    getVideo() {
      if (this.id === 9104) {
        this.getAllVideo()
      } else {
        this.getViderByTag()
      }
    },
    clickTag (tag, id) {
      if (id) {
        this.currentCat = tag
        this.videoId = id
        this.getViderByTag()
      } else {
        this.getAllVideo()
      }
      this.isShowDrawer = false
    },
    changePage(type) {
      if (type === 'prev') {
        if (this.offset <= 0) {
          return;
        }
        this.offset--
        this.getVideo()
      } else if(type === 'next') {
        this.offset++
        this.getVideo()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  position: relative;
  user-select: none;
  width: 65%;
  margin: 0 auto;
  .pagination {
    max-width: 300px;
    margin: 0 auto;
    text-align: center;
    button {
      // color: #fff;
      // background-color: rgb(138, 135, 135);
      border-radius: 5px;
      padding: 5px 8px;
    }
    button:first-of-type {
      margin-right: 30px;
    }
  }
  .nav {
    display: flex;
    font-size: 16px;
    width: 100%;
    height: 38px;
    line-height: 38px;
    background-color: #fff;
    box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0.1);
    position: relative;
    border-radius: 5px;
    margin-bottom: 20px;
    .nav_left {
      width: 100px;
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
      margin-left: 20px;
      margin-right: 4px;
    }
  }
  .drawer {
    position: absolute;
    display: flex;
    flex-wrap: wrap;
    width: 680px;
    height: 400px;
    top: 48px;
    box-shadow: 0 0 40px 0px rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    background-color: #fff;
    z-index: 999;
    overflow: scroll;
    user-select: none;
    span {
      display: inline-block;
      padding: 5px 10px;
      margin: 10px;
      border-radius: 10px;
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
      cursor: pointer;
      &:hover {
        color: rgb(49, 187, 187);
      }
    }
  }
  .video {
    width: 100%;
  }
}
</style>