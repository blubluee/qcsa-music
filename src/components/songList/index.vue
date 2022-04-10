<template>
  <div class="wrapper">
    <div class="list">
      <div class="num">序号</div>
      <div class="song">歌曲</div>
      <div class="singer">歌手</div>
      <div class="cd">专辑</div>
      <div class="time">时长</div>
    </div>
    <div class="list"
         v-for="(item, index) in songs"
         :key="index">
      <div class="num">{{ index + 1 }}</div>
      <div class="song"><img :src="item.al && item.al.picUrl"><span>{{ item.name }}</span></div>
      <div class="singer">{{ item.ar[0].name }}</div>
      <div class="cd">{{ item.al && item.al.name }}</div>
      <div class="time">{{ item.dt }}</div>
    </div>
  </div>
</template>

<script>
import util from '@/util/util'
export default {
  props: {
    list: {
      Array,
      default: () => {}
    },
    songs: {
      Array,
      required:true
    }
  },
  watch: {
    songs(newValue) {
      newValue.map((item) => {
        item.dt = util.formatSecond(item.dt)
        return item
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100% !important;
  padding: 30px;
  // font-size: .9em;
  margin: 0 0 !important;
  box-sizing: border-box;
  .list {
    width: 100%;
    display: flex;
    align-items: center;
    height: 3em;
    &:nth-child(2n) {
      background-color: rgba(199, 199, 199, 0.1);
    }
    .num {
      width: 10%;
      text-align: center;
    }
    .song {
      width: 34%;
      display: flex;
      align-items: center;
      padding: 0 8px;
      img {
        width: 2.5em;
      }
      span {
        margin-left: 0.4em;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .singer {
      width: 24%;
      white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding: 0 4px;
    }
    .cd {
      width: 24%;
      padding: 0 8px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .time {
      width: 8%;
    }
  }
}
</style>