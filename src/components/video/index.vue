<template>
  <div class="video-wrapper">
    <div class="video"
         v-for="(item, index) in videoList"
         :key="index">
      <div class="image"><img :src="item.data.coverUrl">
        <i class="el-icon-video-play"
           ref="i"></i>
      </div>
      <p>{{ item.data.title }}</p>

    </div>
  </div>
</template>

<script>
export default {
  props: {
    videoList: {
      type: Array,
      require: true
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
$videoHeight: 195px;
$fontSize: 30px;
.video-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  user-select: none;
  .video {
    width: 23%;
    height: $videoHeight;
    margin-bottom: 20px;
    .image {
      position: relative;
      i {
        position: absolute;
        font-size: $fontSize;
        color: rgb(66, 189, 219);
        visibility: hidden;
        z-index: 99;
        top: 50%;
        left: 50%;
        // 元素向左和向上移动自身宽度和高度的一半, 刚好到了中间
        transform: translate(-50%, -50%);
        cursor: pointer;
        &:hover {
          visibility: visible;
        }
      }
      img {
        cursor: pointer;
      }
      img:hover {
        + i {
          visibility: visible;
        }
      }
    }
  }
}
</style>