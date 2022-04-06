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
            <i class="el-icon-plus"></i>
            <span>关注Ta</span>
          </div>
        </div>
        <div class="describe">
          <p>{{singerInfo.artist && singerInfo.artist.briefDesc}}</p>
        </div>
        <div class="info_footer">
          <li>
            <p>{{singerInfo.artist && singerInfo.artist.musicSize}}</p>
            <p>单曲数</p>
          </li>
          <li>
            <p>{{singerInfo.artist && singerInfo.artist.albumSize}}</p>
            <p>专辑数</p>
          </li>
          <li>
            <p>{{singerInfo.artist && singerInfo.artist.mvSize}}</p>
            <p>MV数</p>
          </li>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      singerInfo: {}
    }
  },
  mounted () {
    this.getInfo()
  },
  methods: {
    // 获取歌手信息
    async getInfo () {
      const result = await this.$API.singer.reqSingerInfo(this.$route.params.id)
      if (result.code === 200) {
        this.singerInfo = result.data
      }
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
    width: 100vw;
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
        }
        .subscribe {
          display: flex;
          justify-content: center;
        }
      }
      .describe {
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
  }
}
</style>